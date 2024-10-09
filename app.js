const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Serve static files from the 'public' directory (for CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Serve the mock manhwa data from the JSON file
app.get('/manhwa', (req, res) => {
  const filePath = path.join(__dirname, 'data.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading data');
    } else {
      res.json(JSON.parse(data));  // Serve JSON for API consumption
    }
  });
});

// Serve the home page with images
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

