const { request, response } = require('express');
const Transactions = require('../models/transactions.model');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/user.model');

// Controller to register a new transaction
exports.NewTransaction = async(request, response, next) => {
    // Destructure user info from request body
    const { amount, description, status, paymentMethod} = request.body;
    // Get the user id from the authenticated user
    const userId = request.user.id;

    try{
        // Check if the user exists
        const user = await User.findByPk(userId);

        if (!user) {
            throw new Error('User not found');
        }

        // Generate a unique transaction reference number
        const reference = `TX-${Date.now()}-${uuidv4().substring(0, 8)}`;

        // Create a new transaction
        const newTransaction = await Transactions.createTransaction(userId, amount, description, status, paymentMethod, reference);

        response.status(200).json(newTransaction);
    }catch(error){
        console.error('Error creating transaction', error);
        response.status(500).json({message: 'Internal error when creating new transaction'});
    }
};

// Controller to update a transaction and authorize it
exports.authorizeTransaction = async(request, response, next) => {
    try{
        // Check if the transaction exists
        const transaction = await Transactions.findByPk(request.params.transactionId);

        if (!transaction) {
            throw new Error('Transaction not found');
        }

        // Check if the transaction status is 'pending'
        if (transaction.status !== 'pending') {
            throw new Error(`The transaction cannot be authorized, current status: ${transaction.status}`);
        }

        // Create an authorization code
        const authorizationCode = `${Date.now().toString().substring(7)}-${Math.floor(Math.random() * 1000)}`;

        // Authorize the transaction
        const updateTransaction = await Transactions.authorizeTransaction(
            request.params.transactionId, 
            authorizationCode, 
            new Date()
        );

        response.status(200).json(updateTransaction);

    }catch(error){
        console.error('Error updating transaction', error);
        response.status(500).json({message: 'Internal error when updating a transaction'});
    }
};

// Controller to process a transaction that is authorized
exports.processTransaction = async(request, response, next) => {
    try{
        // Check if the transaction exist
        const transaction = await Transactions.findByPk(request.params.transactionId);

        if(!transaction){
            throw new Error('Transaction not found');
        }

        // Check if the transaction status is 'authorized'
        if (transaction.status !== 'authorized') {
            throw new Error(`The transaction cannot be processed, current status: ${transaction.status}`);
        }

        // Process the transaction
        const processTransaction = await Transactions.processTransaction(request.params.transactionId);
        response.status(200).json(processTransaction);

    }catch(error){
        console.error('Error processing a transaction', error);
        response.status(500).json({message: 'Internal error when processing a transaction'});
    }
}; 