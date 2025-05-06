const db = require('../util/database');

module.exports = class User {

    // Consult info of a user
    static async fetchOne(email){
        const result = await db.query(`
            SELECT * 
            FROM users 
            WHERE email = $1`,
            [email]
        );
        return result.rows;
    }
    
    // Consult a user by the ID
    static async findByPk(userId) {
        const result = await db.query('SELECT * FROM users WHERE "userId" = $1', [userId]);
        return result.rows[0];
    }

    // Register a new user
    static async postUsers(name, email, password){
        const result  = await db.query(`
            INSERT INTO users (name, email, password) 
            VALUES ($1, $2, $3)
            RETURNING "userId", name, email`,
            [name, email, password]
        );
        return result.rows[0];
    }
};

