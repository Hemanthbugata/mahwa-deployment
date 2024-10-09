
# Manhwa Web App

This is a simple web application for displaying a list of manhwa titles, genres, descriptions, and cover images. The data is stored in a MySQL database hosted on AWS RDS, and the web application is deployed on an AWS EC2 instance. The images are hosted on an S3 bucket.

## Project Overview

The project uses:
- **AWS RDS** for the MySQL database
- **AWS S3** for image hosting
- **AWS EC2** for deploying the Node.js application
- **MySQL** client to interact with the database
- **Node.js** to build the server-side application

---

## Setup Instructions

### Prerequisites

Before starting, make sure you have the following:
- An AWS account
- SSH access to an EC2 instance (Amazon Linux 2)
- Proper IAM roles and security group settings for EC2, S3, and RDS
- Node.js installed on your EC2 instance

---

### 1. Launching an EC2 Instance

1. Log into the AWS Management Console.
2. Go to the **EC2** dashboard and click **Launch Instance**.
3. Select **Amazon Linux 2** as the AMI.
4. Choose **t2.micro** as the instance type.
5. Create or select an existing key pair to SSH into the instance.
6. Configure security group rules to allow **SSH (port 22)** and **HTTP (port 80)**.
7. Once the instance is running, SSH into it:
   ```bash
   ssh -i "your-key.pem" ec2-user@your-ec2-public-ip
2. Installing Dependencies on EC2
Update your instance:

bash
Copy code
sudo yum update -y
Install Node.js:

...
curl -sL https://rpm.nodesource.com/setup_14.x | sudo bash -
sudo yum install -y nodejs
...
Install MySQL client (for connecting to the RDS instance):

...
sudo yum install mysql -y
...
Clone your application code or create your project directory:

...
mkdir manhwa-webapp
cd manhwa-webapp
...

3. Setting Up RDS (MySQL)
Go to the RDS dashboard on AWS.
Click Create Database and select MySQL.
Choose Free tier settings with db.t2.micro.
Set the Master username and password.
Enable Public accessibility and set the security group to allow access from your EC2 instance's IP.
Once the RDS instance is available, note the Endpoint.
4. Connecting to the MySQL Database
SSH into your EC2 instance and connect to the RDS instance:

...
mysql -h your-rds-endpoint -u admin -p
...
Create a database and table:

sql
...
CREATE DATABASE manhwaDB;
USE manhwaDB;

CREATE TABLE manhwa (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  genre VARCHAR(100),
  description TEXT,
  image_url VARCHAR(255)
);

Insert some sample data:

sql
INSERT INTO manhwa (title, genre, description, image_url)
VALUES 
('Absolute Regression', 'Manhwa', 'After regressing, a hero tries to change his fate.', 'https://manhwa-cover-images.s3.amazonaws.com/1+anime.webp'),
('Chronicles of the Demon Faction', 'Manhwa', 'A gripping tale of conflict and revenge.', 'https://manhwa-cover-images.s3.amazonaws.com/2+anime.webp');
...

5. Hosting Images on S3
Go to S3 in the AWS console and create a new bucket (e.g., manhwa-cover-images).

Upload your manhwa cover images into the bucket.

Configure the bucket policy to allow public access to the images:
...

json
Copy code
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::manhwa-cover-images/*"
    }
  ]
}

...

Get the S3 URLs for the images and store them in the MySQL database.

6. Deploying the Node.js Application
Initialize the project in your manhwa-webapp directory:
...
npm init -y
Install necessary packages:


npm install express mysql
...

...
Create the app.js file:

javascript
Copy code
const express = require('express');
const mysql = require('mysql');
const path = require('path');
const app = express();

// Database connection configuration
const db = mysql.createConnection({
  host: 'your-rds-endpoint', // RDS endpoint
  user: 'admin',
  password: 'your-password',
  database: 'manhwaDB'
});

db.connect(err => {
  if (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  } else {
    console.log('Connected to the MySQL database');
  }
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/manhwa', (req, res) => {
  db.query('SELECT * FROM manhwa', (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving data');
    } else {
      res.json(results);
    }
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
...

Start the Node.js server:
...
node app.js
...

Access the application at http://<your-ec2-public-ip>:3000/manhwa to see the list of manhwa with their cover images from S3 and data from the MySQL RDS instance.

7. Security and Cleanup
Restrict security group access to your RDS instance by limiting incoming connections to your EC2 instance's IP.
Terminate resources when you're done with testing to avoid unexpected charges.
License
This project is for educational purposes and is licensed under the MIT License.


output file : 


![output](https://github.com/user-attachments/assets/3f0970dd-67ce-4cc3-8501-5d3e4f0c40f1)



