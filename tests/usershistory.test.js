const request = require('supertest');
const app = require('../app');

let token;
let userId;

beforeAll(async () => {
    const user = await request(app).post('/users/register')
    .send({
        name: 'Eduardo Juarez',
        email: 'Edu@gmail.com',
        password: 'pasword109'
    });

    token = user.body.token;
    userId = user.body.user.userId;

    await request(app).post('/transaction/create-new')
    .set('Authorization', `Bearer ${token}`)
    .send({
        amount: '10.00',
        description: 'New transaction',
        status: 'pending',
        paymentMethod: 'cash'
    });

});

describe('GET /users/history/:userId', () => {
    it('Should get a users history', async () => {
        const response = await request(app).get(`/users/history/${userId}`)
        .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toEqual(200);
        expect(response.body).toBeInstanceOf(Array);
    });
});