const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');

// Register new user
router.post('/users/register', controller.postUsers);

module.exports = router;