const { request, response } = require("express");
const Users = require('../models/user.model');

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
        response.status(200).json(registerUser);
    }catch(error){
        console.error('Error inserting users', error);
        response.status(500).json({message: 'Internal error when inserting users'});
    }
};