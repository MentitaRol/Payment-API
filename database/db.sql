CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE transaction_status AS ENUM ('pending', 'authorized', 'completed', 'rejected', 'canceled');
CREATE TYPE payment_method AS ENUM ('cash', 'card', 'transfer');

CREATE TABLE transactions (
    transaction_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    amount DECIMAL(10, 2) NOT NULL,
    description TEXT,
    status transaction_status NOT NULL DEFAULT 'pending',
    payment_method payment_method NOT NULL DEFAULT 'cash',
    reference VARCHAR(255) UNIQUE NOT NULL,
    authorization_code VARCHAR(255),
    authorization_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
