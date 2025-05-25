const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./Routes/authRoutes'));

app.get('/', (req, res) => {
  res.send('Storage Management System API Running');
});

module.exports = app;
