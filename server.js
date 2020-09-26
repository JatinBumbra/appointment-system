const express = require('express');
const cors = require('cors');
const path = require('path');
// Init app
const app = express();
// Middleware
app.use(cors());
app.use(express.json());
// app.use(morgan('dev'));
// Set static folder and serve index.html
app.use(express.static('client/dist'));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/client/dist/index.html'))
);
// Routes
app.use(require('./routes/events'));

// Listen to port
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
