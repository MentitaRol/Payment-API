const express = require('express');
const dotenv = require("dotenv");
const app = express();
const { runMigrations } = require('./util/migration');

dotenv.config();
app.use(express.json());

const PORT = process.env.PORT || 3002;

// Users
const userRoutes = require('./routes/users.routes');
app.use(userRoutes);

// Transactions
const transactionRoutes = require('./routes/transactions.routes');
app.use(transactionRoutes);

async function startServer() {
    try{
        await runMigrations();

        app.listen(PORT, () => {
            console.log(`Server running on ${PORT}`);
        });
    }catch(error){
        console.error('Error starting server:', error);
        process.exit(1);    
    }
}
if (require.main === module) {
    startServer();
} else {
    module.exports = app;
}