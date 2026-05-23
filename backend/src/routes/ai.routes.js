const express = require('express');
const router = express.Router();
const { getReview } = require('../controllers/ai.controller');

// POST /ai/get-review
router.post('/get-review', getReview);

module.exports = router;
