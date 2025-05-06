const request = require('supertest');
const app = require('../app');

describe('POST /users/register', () => {
    it('Should register a new user', async () => {
        const response = await request(app).post('/users/register')
        .send({
            name: 'Juan Perez',
            email: `juanPerez@gmail.com`,
            password: 'password123'
        });

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('user');

        expect(response.body.user).toHaveProperty('userId');
        expect(response.body.user).toHaveProperty('name', 'Juan Perez');
        expect(response.body.user).toHaveProperty('email', 'juanPerez@gmail.com');
    });
});