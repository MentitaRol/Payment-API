const { response } = require('express');
const jwt = require('jsonwebtoken');

module.exports = (request, response, next) => {
    // Authorization header from the request
    const authHeader = request.headers.authorization;

    // Check if the authorization header is missing or incorrect
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return response.status(401).json({ message: 'Token no proporcionado' });
    }

    // Extract the token from the authorization header
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded information to the request object
        request.user = decoded;
        
        next();
    } catch (error) {
        return response.status(401).json({ message: 'Token inválido' });
    }
}