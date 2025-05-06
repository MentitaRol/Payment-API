const request = require('supertest');
const app = require('../app');

let token;
let transactionId;

beforeAll(async () => {
    const user = await request(app).post('/users/register')
    .send({
        name: 'Fatima Figueroa',
        email: 'fatima@gmail.com',
        password: 'pasword789'
    });

    token = user.body.token;

    const transaction = await request(app).post('/transaction/create-new')
    .set('Authorization', `Bearer ${token}`)
    .send({
        amount: '500.00',
        description: 'New transaction',
        status: 'pending',
        paymentMethod: 'cash'
    });

    transactionId = transaction.body.transactionId;

    await request(app)
    .post(`/transaction/authorize-transaction/${transactionId}`)
    .set('Authorization', `Bearer ${token}`);
});

describe('POST /transaction/process-transaction/:transactionId', () => {
    it('Should process a transaction', async () => {
        const response = await request(app).post(`/transaction/process-transaction/${transactionId}`)
        .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe('completed');
    });
});