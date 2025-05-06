const express = require('express');
const dotenv = require("dotenv");
const app = express();

dotenv.config();
app.use(express.json());

// Users
const userRoutes = require('./routes/users.routes');
app.use(userRoutes);

// Transactions
const transactionRoutes = require('./routes/transactions.routes');
app.use(transactionRoutes);

module.exports = app;