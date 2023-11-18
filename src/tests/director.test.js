const request = require('supertest')
const app = require('../app')
let id

test('GET/directors', async () => {
    const res = await request(app).get('/directors')
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST/directors', async () => {
    const director ={
        firstName: "Bong",
        lastName: "Joon-ho",
        nationality: "Sur Corea",
        image: "https://bongjoonho.jpg",
        birthday: "1969-09-14"
    }
    const res = await request(app).post('/directors').send(director)
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(director.firstName);
    expect(res.body.id).toBeDefined();
});

test('PUT/directors/:id', async () => {
    const director = {
        firstName: "Bong updated"
    }
    const res = await request(app).put('/directors/'+id).send(director)
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(director.firstName);
});

test('DELETE/directors/:id', async () => {
    const res = await request(app).delete('/directors/'+id)
    expect(res.status).toBe(204);
});