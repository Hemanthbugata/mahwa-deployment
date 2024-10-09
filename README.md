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
