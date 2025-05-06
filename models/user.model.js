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

     // Register a new user
    static async postUsers(name, email, password){
        const result  = await db.query(`
            INSERT INTO users (name, email, password) 
            VALUES ($1, $2, $3) RETURNING userId, name, email`,
            [name, email, password]
        );
        return result.rows[0];
    }
};
