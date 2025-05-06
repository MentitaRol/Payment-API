const db = require('./database');

async function runMigrations() {
try {
    // Create users table
    await db.query(`
        CREATE TABLE IF NOT EXISTS users (
            "userId" SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL,
            "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Create transactions table
    await db.query(`
        CREATE TABLE IF NOT EXISTS transactions (
            "transactionId" SERIAL PRIMARY KEY,
            "userId" INTEGER REFERENCES users("userId"),
            amount DECIMAL(10, 2) NOT NULL,
            description TEXT,
            status VARCHAR(50) NOT NULL,
            "paymentMethod" VARCHAR(100) NOT NULL,
            reference VARCHAR(100) UNIQUE NOT NULL,
            "authorizationCode" VARCHAR(100),
            "authorizationDate" TIMESTAMP,
            "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);

    console.log('Migrations executed successfully');
    } catch (error) {
        console.error('Error running migrations:', error);
        throw error;
    }
}

if (require.main === module) {
    runMigrations();
}

module.exports = { runMigrations };