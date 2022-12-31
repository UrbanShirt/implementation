const request = require('supertest');
const app = require('../server');
const jwt = require('jsonwebtoken');

const companyShirtModel = require('../models/company-shirt');
const communityShirtModel = require('../models/community-shirt');

beforeEach(async () => {
    // set up db for testing
    await companyShirtModel.insertMany([
            {name: 'maglietta bianca c-style', creationDate: "2022-12-27T08:52:42.207Z", image: 'https://github.com/UrbanShirt/implementation/blob/main/images/shirts/white-blank-shirt-company.png?raw=true', color: 'white', material: 'rayon'},
            {name: 'homepage-community-shirt', creationDate: new Date(), image: 'https://github.com/UrbanShirt/implementation/blob/main/images/shirts/homepage-community-shirt.png?raw=true'},
            {name: 'homepage-company-shirt', creationDate: new Date(), image: 'https://github.com/UrbanShirt/implementation/blob/main/images/shirts/homepage-company-shirt.png?raw=true'},
            {name: 'maglietta nera c-style', creationDate: new Date(), image: 'https://github.com/UrbanShirt/implementation/blob/main/images/shirts/black-blank-shirt-company.png?raw=true', color: 'black', material: 'polyester'},
            {name: 'maglietta blu c-style', creationDate: new Date(), image: 'https://github.com/UrbanShirt/implementation/blob/main/images/shirts/blue-blank-shirt-company.png?raw=true', color: 'blue', material: 'polyester'},
            {name: 'maglietta rossa c-style', creationDate: new Date(), image: 'https://github.com/UrbanShirt/implementation/blob/main/images/shirts/red-blank-shirt-company.png?raw=true', color: 'red', material: 'polyester'}
        ],
        function (err) {
            console.log("Restore DB: array of company shirts added");
        }
    );
    await communityShirtModel.insertMany([
            {name: 'maglietta nera RODOLFO', creationDate: new Date(), image: 'https://github.com/UrbanShirt/implementation/blob/main/images/shirts/black-blank-shirt-community.png?raw=true', creator: 'Rodolfo', color: 'black', material: 'polyester', isPublic: true},
            {name: 'maglietta bianca RODOLFO', creationDate: new Date(), image: 'https://github.com/UrbanShirt/implementation/blob/main/images/shirts/white-blank-shirt-community.png?raw=true', creator: 'Rodolfo', color: 'white', material: 'polyester', isPublic: true},
            {name: 'maglietta blu RODOLFO', creationDate: new Date(), image: 'https://github.com/UrbanShirt/implementation/blob/main/images/shirts/blue-blank-shirt-community.png?raw=true', creator: 'Rodolfo', color: 'blue', material: 'polyester', isPublic: true},
            {name: 'maglietta rossa RODOLFO', creationDate: new Date(), image: 'https://github.com/UrbanShirt/implementation/blob/main/images/shirts/red-blank-shirt-community.png?raw=true', creator: 'Rodolfo', color: 'red', material: 'polyester'},
            {name: 'maglietta swag quadrato rosso', creationDate: new Date(), image: 'https://github.com/UrbanShirt/implementation/blob/main/images/shirts/sample-weekly-shirt.png?raw=true', creator: 'Anselmo', color: 'white', material: 'cotton', likes: 2, voters: ['rodolfo', 'anselmo'], isPublic: true, isMostLiked: true}
        ],
        function (err) {
            console.log("Restore DB: array of community shirts added");
        }
    );
})


describe('GET /getCompanyShirts', () => {
    test('GET /getCompanyShirts should respond with an array of shirts', async () => {
        return await request(app)
        .get('/getCompanyShirts')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
            if(res.body) {
                expect(res.body.length).toEqual(6);
            }
        });
    });

    test('GET /getCompanyShirts with no shirts saved should respond with 404 Impossible to find shirts', async () => {
        // delete shirts from db
        await companyShirtModel.deleteMany({name: {$regex: '.*', $options: 'i'}}, () => {console.log("company shirts deleted for getCompanyShirts test");}).clone();

        return await request(app)
        .get('/getCompanyShirts')
        .expect('Content-Type', /json/)
        .expect(404)
        .then(async (res) => {
            if(res.body) {
                expect(res.body.error).toEqual('Impossible to find shirts');
            }
        });
    });
});


describe('GET /getFilteredCompanyShirts', () => {
    test('GET /getFilteredCompanyShirts/:filterName should respond with an array of shirts filtered by a searchword ', async () => {
        return await request(app)
        .get('/getFilteredCompanyShirts/blu')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
            if(res.body) {
                expect(res.body.length).toEqual(1);
            }
        });
    });

    test('GET /getFilteredCompanyShirts/:filterName searching fon non existing shirt should respond with 404 Impossible to find shirts ', async () => {
        return await request(app)
        .get('/getFilteredCompanyShirts/testpocogoliardico')
        .expect('Content-Type', /json/)
        .expect(404)
        .then((res) => {
            if(res.body) {
                expect(res.body.error).toEqual('Impossible to find shirts');
            }
        });
    });

    test('GET /getFilteredCompanyShirts/:filterName with no shirts saved should respond with 404 Impossible to find shirts ', async () => {
        // delete shirts from db
        await companyShirtModel.deleteMany({name: {$regex: '.*', $options: 'i'}}, () => {console.log("company shirts deleted for getFilteredCompanyShirts test");}).clone();

        return await request(app)
        .get('/getFilteredCompanyShirts/blu')
        .expect('Content-Type', /json/)
        .expect(404)
        .then(async (res) => {
            if(res.body) {
                expect(res.body.error).toEqual('Impossible to find shirts');
            }
        });
    });
});


describe('GET /getHomepageCompanyShirt', () => {
    test('GET /getHomepageCompanyShirt should respond with the homepage shirt for company section', async () => {
        return request(app)
        .get('/getHomepageCompanyShirt')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
            if(res.body) {
                expect(res.body).toEqual('https://github.com/UrbanShirt/implementation/blob/main/images/shirts/homepage-company-shirt.png?raw=true');
            }
        });
    });

    test('GET /getHomepageCompanyShirt with no shirt named homepage-company-shirt should respond with 404 Impossible to find homepage company Shirt', async () => {
        // delete shirt from db
        await companyShirtModel.deleteOne({name: "homepage-company-shirt"}, () => {console.log("homepage-company-shirt shirt deleted for getHomepageCompanyShirt test");}).clone();

        return request(app)
        .get('/getHomepageCompanyShirt')
        .expect('Content-Type', /json/)
        .expect(404)
        .then(async (res) => {
            if(res.body) {
                expect(res.body.error).toEqual('Impossible to find homepage company Shirt');
            }
        });
    });

    test('GET /getHomepageCompanyShirt with no shirts saved should respond with 404 Impossible to find homepage company Shirt', async () => {
        // delete shirts from db
        await companyShirtModel.deleteMany({name: {$regex: '.*', $options: 'i'}}, () => {console.log("company shirts deleted for getHomepageCompanyShirt test");}).clone();

        return request(app)
        .get('/getHomepageCompanyShirt')
        .expect('Content-Type', /json/)
        .expect(404)
        .then(async (res) => {
            if(res.body) {
                expect(res.body.error).toEqual('Impossible to find homepage company Shirt');
            }
        });
    });
});


describe('GET /getHomepageCommunityShirt', () => {
    test('GET /getHomepageCommunityShirt should respond with the homepage shirt for community section', async () => {
        return request(app)
        .get('/getHomepageCommunityShirt')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
            if(res.body) {
                expect(res.body).toEqual('https://github.com/UrbanShirt/implementation/blob/main/images/shirts/homepage-community-shirt.png?raw=true');
            }
        });
    });

    test('GET /getHomepageCommunityShirt with no shirt named homepage-company-shirt should respond with 404 Impossible to find homepage community Shirt', async () => {
        // delete shirt from db
        await companyShirtModel.deleteOne({name: "homepage-community-shirt"}, () => {console.log("homepage-company-shirt shirt deleted for getHomepageCommunityShirt test");}).clone();

        return request(app)
        .get('/getHomepageCommunityShirt')
        .expect('Content-Type', /json/)
        .expect(404)
        .then(async (res) => {
            if(res.body) {
                expect(res.body.error).toEqual('Impossible to find homepage community Shirt');
            }
        });
    });

    test('GET /getHomepageCommunityShirt with no shirts saved should respond with 404 Impossible to find homepage community Shirt ', async () => {
        // delete shirts from db
        await companyShirtModel.deleteMany({name: {$regex: '.*', $options: 'i'}}, () => {console.log("company shirts deleted for getHomepageCommunityShirt test");}).clone();

        return request(app)
        .get('/getHomepageCommunityShirt')
        .expect('Content-Type', /json/)
        .expect(404)
        .then(async (res) => {
            if(res.body) {
                expect(res.body.error).toEqual('Impossible to find homepage community Shirt');
            }
        });
    });
});


describe('GET /getCommunityShirts', () => {
    test('GET /getCommunityShirts should respond with an array with only public shirts', async () => {
        return request(app)
        .get('/getCommunityShirts')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
            if(res.body) {
                expect(res.body.length).toEqual(4);
            }
        });
    });

    test('GET /getCommunityShirts with no shirts saved should respond with 404 Impossible to find shirts', async () => {
        // delete shirts from db
        await communityShirtModel.deleteMany({name: {$regex: '.*', $options: 'i'}}, () => {console.log("community shirts deleted for getCommunityShirts test");}).clone();

        return await request(app)
        .get('/getCommunityShirts')
        .expect('Content-Type', /json/)
        .expect(404)
        .then(async (res) => {
            if(res.body) {
                expect(res.body.error).toEqual('Impossible to find shirts');
            }
        });
    });
});


describe('GET /getFilteredCommunityShirts', () => {
    test('GET /getFilteredCommunityShirts/:filterName should respond with an array with only public shirts filtered by a searchword ', async () => {
        return request(app)
        .get('/getFilteredCommunityShirts/blu')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
            if(res.body) {
                expect(res.body.length).toEqual(1);
            }
        });
    });

    test('GET /getFilteredCommunityShirts/:filterName searching fon non existing shirt should respond with 404 Impossible to find shirts ', async () => {
        return await request(app)
        .get('/getFilteredCommunityShirts/testpocogoliardico')
        .expect('Content-Type', /json/)
        .expect(404)
        .then((res) => {
            if(res.body) {
                expect(res.body.error).toEqual('Impossible to find shirts');
            }
        });
    });

    test('GET /getFilteredCommunityShirts/:filterName with no shirts saved should respond with 404 Impossible to find shirts ', async () => {
        // delete shirts from db
        await communityShirtModel.deleteMany({name: {$regex: '.*', $options: 'i'}}, () => {console.log("community shirts deleted for getFilteredCommunityShirts test");}).clone();

        return await request(app)
        .get('/getFilteredCommunityShirts/blu')
        .expect('Content-Type', /json/)
        .expect(404)
        .then(async (res) => {
            if(res.body) {
                expect(res.body.error).toEqual('Impossible to find shirts');
            }
        });
    });
});


describe('GET /getWeeklyShirt', () => {
    test('GET /getWeeklyShirt should respond with the weekly shirt, the one with the attribute isMostLiked true', async () => {
        return request(app)
        .get('/getWeeklyShirt')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
            if(res.body) {
                expect(res.body.isMostLiked).toEqual(true);
            }
        });
    });

    test('GET /getWeeklyShirt with no weekly shirt should respond with 404 Impossible to find Weekly Shirt', async () => {
        // delete shirt from db
        await communityShirtModel.deleteOne({isMostLiked: true}, () => {console.log("weekly-shirt shirt deleted for getWeeklyShirt test");}).clone();

        return request(app)
        .get('/getWeeklyShirt')
        .expect('Content-Type', /json/)
        .expect(404)
        .then(async (res) => {
            if(res.body) {
                expect(res.body.error).toEqual('Impossible to find Weekly Shirt');
            }
        });
    });

    test('GET /getWeeklyShirt with no shirts saved should respond with 404 Impossible to find Weekly Shirt ', async () => {
        // delete shirts from db
        await communityShirtModel.deleteMany({name: {$regex: '.*', $options: 'i'}}, () => {console.log("community shirts deleted for getWeeklyShirt test");}).clone();

        return request(app)
        .get('/getWeeklyShirt')
        .expect('Content-Type', /json/)
        .expect(404)
        .then(async (res) => {
            if(res.body) {
                expect(res.body.error).toEqual('Impossible to find Weekly Shirt');
            }
        });
    });
});


describe('POST /likeCommunityShirt', () => {
    test('POST /likeCommunityShirt should respond with a message saying that the like was added', async () => {
        var payload = {username: 'rodolfo', email: 'a@b.c', address: 'Via del capitano, 2', time: Date()};
        var token = jwt.sign(payload, process.env.SUEG_SECRET);

        var userShirtLike = {
            name: 'maglietta bianca RODOLFO',
            username: 'rodolfo',
            token: token
        }

        return await request(app)
        .post('/likeCommunityShirt')
        .send(userShirtLike)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
            if(res.body) {
                expect(res.body.message).toEqual('Like added');
            }
        });
    });

    test('POST /likeCommunityShirt liking a non exisisting shirt should respond with 404 Impossible to find shirt to like', async () => {
        var payload = {username: 'rodolfo', email: 'a@b.c', address: 'Via del capitano, 2', time: Date()};
        var token = jwt.sign(payload, process.env.SUEG_SECRET);

        var userShirtLike = {
            name: 'maglietta che non esiste',
            username: 'rodolfo',
            token: token
        }

        return await request(app)
        .post('/likeCommunityShirt')
        .send(userShirtLike)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)
        .then((res) => {
            if(res.body) {
                expect(res.body.error).toEqual('Impossible to find shirt to like');
            }
        });
    });

    test('POST /likeCommunityShirt liking and already liked shirt should respond with 400 You already liked this shirt', async () => {
        var payload = {username: 'rodolfo', email: 'a@b.c', address: 'Via del capitano, 2', time: Date()};
        var token = jwt.sign(payload, process.env.SUEG_SECRET);

        var userShirtLike = {
            name: 'maglietta swag quadrato rosso',
            username: 'rodolfo',
            token: token
        }

        return await request(app)
        .post('/likeCommunityShirt')
        .send(userShirtLike)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then((res) => {
            if(res.body) {
                expect(res.body.error).toEqual('You already liked this shirt');
            }
        });
    });
})

