const request = require('supertest');
const app = require('../app');

let token;
beforeAll(async () => {
    const response = await request(app).post('/users/register')
    .send({
        name: 'Fer Valdez',
        email: 'fer@gmail.com',
        password: 'password123'
    });
    token = response.body.token;
});

describe('POST /transaction/create-new', () => {
    it('should register a new transaction', async () => {
        const response = await request(app).post('/transaction/create-new')
        .set('Authorization', `Bearer ${token}`)
        .send({
            amount: '10000.00',
            description: 'New transaction',
            status: 'pending',
            paymentMethod: 'card'
        });

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('amount', '10000.00');
        expect(response.body).toHaveProperty('description', 'New transaction');
        expect(response.body).toHaveProperty('status', 'pending');
        expect(response.body).toHaveProperty('paymentMethod', 'card');
    });

});