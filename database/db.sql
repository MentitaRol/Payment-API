CREATE TABLE users (
    userId SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE transactionStatus AS ENUM ('pending', 'authorized', 'completed', 'rejected', 'canceled');
CREATE TYPE paymentMethod AS ENUM ('cash', 'card', 'transfer');

CREATE TABLE transactions (
    transactionId SERIAL PRIMARY KEY,
    userId INTEGER REFERENCES users(userId),
    amount DECIMAL(10, 2) NOT NULL,
    description TEXT,
    status transactionStatus NOT NULL DEFAULT 'pending',
    paymentMethod paymentMethod NOT NULL DEFAULT 'cash',
    reference VARCHAR(255) UNIQUE NOT NULL,
    authorizationCode VARCHAR(255),
    authorizationDate DATE NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
