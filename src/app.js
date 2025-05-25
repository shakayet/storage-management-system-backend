const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import routes
const authRoutes = require('./Routes/authRoutes');
const folderRoutes = require('./Routes/folderRoutes');
const fileRoutes = require('./Routes/fileRoutes');
const profileRoutes = require("./Routes/profileRoutes");
const secureFolderRoutes = require('./Routes/secureFolderRoutes');
const summaryRoutes = require('./routes/summaryRoutes');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/folders', folderRoutes);
app.use('/api/files', fileRoutes);
app.use("/api/profile", profileRoutes);
app.use('/api/secure-folder', secureFolderRoutes);
app.use('/api/summary', summaryRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.send('Storage Management System API Running');
});

module.exports = app;
