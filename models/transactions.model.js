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
};