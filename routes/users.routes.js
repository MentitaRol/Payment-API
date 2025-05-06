const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');

// Register new user
router.post('/users/register', controller.postUsers);

// User history
router.get('/users/history/:userId', controller.userHistory);

module.exports = router;