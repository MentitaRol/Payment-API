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

app.listen(3002, () => {
    console.log("Server running at http://localhost:3002");
})