# Payment REST API
REST API for handling users and payments, built with Node.js, Express and PostgreSQL. This project has been deployed using [Railway](https://railway.app/).

##  Features

 - User registration 
 - Creation of payment transactions 
 - Transaction authorization and validation 
 - User transaction history
 - PostgreSQL database
 - Automatic deployment with GitHub + Railway CI/CD

## Installation & Local Usage
**Clone the repository:**

	https://github.com/MentitaRol/Payment-API.git

**Install dependencies:**

	npm install
	
**Configure environment variables:**

	cp .env

**Edit the .env file with your settings:**

	DATABASE_HOST=localhost
	DATABASE_USER=your-user
	DATABASE_NAME=database-name
	DATABASE_PASSWORD=your-password
	DATABASE_PORT=5432
	DATABASE_URL=postgresql://postgres:mentitarol@localhost:5432/payments
	JWT_SECRET=your-password 
	JWT_EXPIRES_IN=1d

**Start the application:**

	node app.js

## Deployment (CI/CD)
This project uses 'Railway' for automatic deployment. On every push to `main`:

-   The app is rebuilt
-   App is deployed automatically if all checks pass

**API endpoint**: https://payment-api-production.up.railway.app/

## Endpoints
| Method | Route | Description |
|---|---|---|
| POST | /users/register | Register new user |
| POST | /transaction/create-new | Start a transaction |
| POST | /transaction/authorize-transaction/:transactionId | Authorize a transaction |
| POST | /transaction/process-transaction/:transactionId | Validate a transaction |
| GET | /users/history/:userId | View a user's history |

## Examples of use
 **Register new user**

    {
		  "name": "María García",
		  "email": "maria.garcia@ejemplo.com",
		  "password": "Contraseña123"
	}
Response

    {
	  "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxfSwiaWF0IjoxNjgzMTIzNDU2LCJleHAiOjE2ODMyMDk4NTZ9.a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6"
	}

Include this token in the `Authorization` header as:

    Authorization: Bearer <token>
  
**Start a transaction**

    {
	    "amount":  "10000.00",
		"description":  "New transaction",
		"status":  "pending",
		"paymentMethod":  "card"
	}

Response

    {
	    "transactionId": 2,
	    "userId": 10,
	    "amount": "10000.00",
	    "description": "New transaction",
	    "status": "pending",
	    "paymentMethod": "card",
	    "reference": "TX-1746543171431-d3ad912f",
	    "authorizationCode": null,
	    "authorizationDate": null,
	    "createdAt": "2025-05-06T14:52:51.431Z"
	}

**authorize a transaction**

    empty
    
  Response
  
    {
	    "transactionId": 2,
	    "userId": 10,
	    "amount": "10000.00",
	    "description": "New transaction",
	    "status": "authorized",
	    "paymentMethod": "card",
	    "reference": "TX-1746543171431-d3ad912f",
	    "authorizationCode": "256529-671",
	    "authorizationDate": "2025-05-06T14:54:16.529Z",
	    "createdAt": "2025-05-06T14:52:51.431Z"
	}
**process a transaction**

    empty

Result 

    {
	    "transactionId": 2,
	    "userId": 10,
	    "amount": "10000.00",
	    "description": "New transaction",
	    "status": "completed",
	    "paymentMethod": "card",
	    "reference": "TX-1746543171431-d3ad912f",
	    "authorizationCode": "256529-671",
	    "authorizationDate": "2025-05-06T14:54:16.529Z",
	    "createdAt": "2025-05-06T14:52:51.431Z"
	}

**View a user's history**

Response

    [
	    {
	        "transactionId": 2,
	        "userId": 10,
	        "amount": "10000.00",
	        "description": "New transaction",
	        "status": "completed",
	        "paymentMethod": "card",
	        "reference": "TX-1746543171431-d3ad912f",
	        "authorizationCode": "256529-671",
	        "authorizationDate": "2025-05-06T14:54:16.529Z",
	        "createdAt": "2025-05-06T14:52:51.431Z"
	    }
	]
    
## Tests

Run unit tests:

    npm test
