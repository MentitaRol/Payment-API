const db = require('../util/database');

module.exports =  class Transaction {

    // Create a new transaction
    static async createTransaction(user_id, amount, description, status, payment_method, reference){
        const result = await db.query(`
            INSERT INTO transactions (user_id, amount, description, status, payment_method, reference)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`,
            [user_id, amount, description, status, payment_method, reference]
        );
        return result.rows[0];
    }

    // Consult a transaction by the ID
    static async findByPk(transaction_id) {
        const result = await db.query(`
            SELECT * 
            FROM transactions 
            WHERE transaction_id = $1`, 
            [transaction_id]
        );
        return result.rows[0];
    }

    // Authorize a transaction
    static async authorizeTransaction(transaction_id, authorization_code, authorization_date){
        const result = await db.query(`
            UPDATE transactions 
            SET authorization_code = $1, 
            authorization_date = $2,
            status = $3
            WHERE transaction_id = $4
            RETURNING *`,
            [authorization_code, authorization_date, 'authorized', transaction_id]
        );
        return result.rows[0];
    }
};