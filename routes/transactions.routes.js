const express = require('express');
const router = express.Router();
const controller = require('../controllers/transactions.controller');
const auth = require('../middleware/auth');

// Create a new transaction
router.post('/transaction/create-new', auth, controller.NewTransaction);

// Authorize a transaction
router.post('/transaction/authorize-transaction/:transactionId', controller.authorizeTransaction);

// Process a transaction
router.post('/transaction/process-transaction/:transactionId', controller.processTransaction);

module.exports = router;