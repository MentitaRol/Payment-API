const db = require('../util/database');

module.exports =  class Transaction {

    // Create a new transaction
    static async createTransaction(userId, amount, description, status, paymentMethod, reference){
        const result = await db.query(`
            INSERT INTO transactions (userId, amount, description, status, paymentMethod, reference)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`,
            [userId, amount, description, status, paymentMethod, reference]
        );
        return result.rows[0];
    }

    // Consult a transaction by the ID
    static async findByPk(transactionId) {
        const result = await db.query(`
            SELECT * 
            FROM transactions 
            WHERE transactionId = $1`, 
            [transactionId]
        );
        return result.rows[0];
    }

    // Authorize a transaction
    static async authorizeTransaction(transactionId, authorizationCode, authorizationDate){
        const result = await db.query(`
            UPDATE transactions 
            SET authorizationCode = $1, 
            authorizationDate = $2,
            status = $3
            WHERE transactionId = $4
            RETURNING *`,
            [authorizationCode, authorizationDate, 'authorized', transactionId]
        );
        return result.rows[0];
    }
};