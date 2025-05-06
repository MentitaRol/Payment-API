const request = require('supertest');
const app = require('../app');

let token;
let transactionId;

beforeAll(async () => {
    const user = await request(app).post('/users/register')
    .send({
        name: 'David Pasaye',
        email: 'pasaye@gmail.com',
        password: 'pasword456'
    });

    token = user.body.token;

    const transaction = await request(app).post('/transaction/create-new')
    .set('Authorization', `Bearer ${token}`)
    .send({
        amount: '2000.00',
        description: 'New transaction',
        status: 'pending',
        paymentMethod: 'cash'
    });
    transactionId = transaction.body.transactionId;
});

describe('POST /transaction/authorize-transaction/:transactionId', () => {
    it('Should authorize a transaction', async () => {
        const response = await request(app).post(`/transaction/authorize-transaction/${transactionId}`)
        .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('authorizationCode');
        expect(response.body.status).toBe('authorized');
    });
});