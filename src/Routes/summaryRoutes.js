const express = require('express');
const router = express.Router();

const {
  getNotesSummary,
  getPdfSummary,
  getImagesSummary,
  getOverallSummary,
  getFilesByDate
} = require('../Controllers/getFileSummary');

const { verifyToken } = require("../Middlewares/authMiddleware");

// Notes summary
router.get('/notes-summary', verifyToken, getNotesSummary);

// PDF summary
router.get('/pdf-summary', verifyToken, getPdfSummary);

// Images summary
router.get('/images-summary', verifyToken, getImagesSummary);

// Overall summary
router.get('/overall-summary', verifyToken, getOverallSummary);

router.get('/files-by-date', verifyToken, getFilesByDate);


module.exports = router;
