const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
// Init app
const app = express();
// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
// Routes
app.use(require('./routes/events'));

// Listen to port
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
