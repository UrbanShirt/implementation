const request = require('supertest');
const app = require('../server');
const jwt = require('jsonwebtoken');

const userModel = require('../models/user');


describe('GET /getUserData', () => {
    test('GET /getUserData should respond with the used found by username', async () => {
        return await request(app)
        .get('/getUserData/rodolfo')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
            if(res.body) {
                expect(res.body.username).toEqual('rodolfo');
            }
        });
    });

    test('GET /getUserData if it cannot find the it should respond with 404 Impossible to find User', async () => {
        return await request(app)
        .get('/getUserData/utentechenonesiste')
        .expect('Content-Type', /json/)
        .expect(404)
        .then(async (res) => {
            if(res.body) {
                expect(res.body.error).toEqual('Impossible to find User');
            }
        });
    });
});


describe('POST /registerUser', () => {
    test('POST /registerUser should respond with the created user', async () => {
        var user = {
            username: "testuser",
            email: "a@b.c",
            firstName: "forstname",
            lastName: "lastname",
            address: "test",
            birthDate: "2022-12-30T21:39:49.647+00:00",
            password: "TestBello!100"
        }

        return await request(app)
        .post('/registerUser')
        .send(user)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(async (res) => {
            if(res.body) {
                expect(res.body.username).toEqual('testuser');
            }

            await userModel.deleteOne({username: "testuser"}, () => {console.log("user deleted after registration test");}).clone();
        });
    });

    test('POST /registerUser creating a user with and already existing username should respond with 400 User already exists', async () => {
        var user = {
            username: "rodolfo",
            email: "a@b.c",
            firstName: "forstname",
            lastName: "lastname",
            address: "test",
            birthDate: "2022-12-30T21:39:49.647+00:00",
            password: "TestBello!100"
        }

        return await request(app)
        .post('/registerUser')
        .send(user)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then(async (res) => {
            if(res.body) {
                expect(res.body.error).toEqual('User already exists');
            }
        });
    });


    test('POST /registerUser creating a user with a non acceptable password should respond with 400 The password is not 8 characters long, containing a lowercase and an uppercase letter, a number and a special character', async () => {
        var user = {
            username: "testuser",
            email: "a@b.c",
            firstName: "forstname",
            lastName: "lastname",
            address: "test",
            birthDate: "2022-12-30T21:39:49.647+00:00",
            password: "abc"
        }

        return await request(app)
        .post('/registerUser')
        .send(user)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then(async (res) => {
            if(res.body) {
                expect(res.body.error).toEqual('The password is not 8 characters long, containing a lowercase and an uppercase letter, a number and a special character');
            }
        });
    });
});



describe('POST /login', () => {
    test('POST /login should respond with 200 Logged in successfully, username and a valid token', async () => {
        var credentials = {
            username: 'rodolfo',
            password: 'TestBello2!'
        }

        return await request(app)
        .post('/login')
        .send(credentials)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(async (res) => {
            if(res.body) {
                expect(res.body.username).toEqual('rodolfo');
                expect(res.body.message).toEqual('Logged in successfully');
            }
        });
    });

    test('POST /login using wrong credentials should respond with 400 Bad credentials', async () => {
        var credentials = {
            username: 'usernamesbagliato',
            password: 'passwordrandom!'
        }

        return await request(app)
        .post('/login')
        .send(credentials)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then(async (res) => {
            if(res.body) {
                expect(res.body.error).toEqual('Bad credentials');
            }
        });
    });
});
