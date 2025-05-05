const { request, response } = require('express');
const Transactions = require('../models/transactions.model');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/user.model');

// Controller to handle POST request to register a new transaction
exports.postNewTransaction = async(request, response, next) => {
    // Destructure user info from request body
    const { amount, description, status, payment_method} = request.body;
    // Get the user id from the authenticated user
    const user_id = request.user.id;

    try{
        // Check if the user exists
        const user = await User.findByPk(user_id);

        if (!user) {
            throw new Error('User not found');
        }

        // Generate a unique transaction reference number
        const reference = `TX-${Date.now()}-${uuidv4().substring(0, 8)}`;

        // Create a new transaction
        const newTransaction = await Transactions.createTransaction(user_id, amount, description, status, payment_method, reference);

        response.status(200).json(newTransaction);
    }catch(error){
        console.error('Error creating transaction', error);
        response.status(500).json({message: 'Internal error when creating new transaction'});
    }
};