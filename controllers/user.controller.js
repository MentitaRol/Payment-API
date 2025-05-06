const { request, response } = require('express');
const Users = require('../models/user.model');
const jwt = require('jsonwebtoken');

// Generate token
const generateToken = (user) => {
    console.log('JWT_EXPIRES_IN:', process.env.JWT_EXPIRES_IN);
    return jwt.sign(
        { id: user.userId, email: user.email }, 
        process.env.JWT_SECRET, 
        {expiresIn: process.env.JWT_EXPIRES_IN}
    );
};

// Controller to handle POST request to register a new user
exports.postUsers = async(request, response, next) => {
    // Destructure user info from request body
    const { name, email, password } = request.body;

    try{
        // Verify if the user already exist
        const userCheck = await Users.fetchOne(email);

        if(userCheck.length > 0) {
            return response.status(400).json({ msg: 'The user already exists' });
        }

        // Register new user
        const registerUser = await Users.postUsers(name, email, password);
        const token = generateToken(registerUser);

        response.status(200).json({ user: registerUser, token });
    }catch(error){
        console.error('Error inserting users', error);
        response.status(500).json({message: 'Internal error when inserting users'});
    }
};

// Controller to consult a user history
exports.userHistory = async(request, response, next) => {
    const userId = request.params.userId;

    try{
        // Check if the user exists
        const user = await Users.findByPk(userId);

        if (!user) {
            throw new Error('User not found');
        }

        // Get a user history
        const userHistory = await Users.userHistoty(userId);

        response.status(200).json(userHistory);

    }catch(error){
        console.error('Error getting a user history', error);
        response.status(500).json({message: 'Internal error when getting a user history'});
    }
}