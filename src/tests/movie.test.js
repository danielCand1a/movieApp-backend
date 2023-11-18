const request = require('supertest')
const app = require('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');
require('../models')
let id
test('GET/movies', async () => {
    const res = await request(app).get('/movies')
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST/movies', async () => {
    const movie = {
        name: "Parásitos",
        image: "https://parasitos.jpg",
        synopsis: "Tanto Gi Taek como su familia están sin trabajo. Cuando su hijo mayor, Gi Woo, empieza a impartir clases particulares en la adinerada casa de los Park, las dos familias, que tienen mucho en común pese a pertenecer a dos mundos totalmente distintos, entablan una relación de resultados imprevisibles.",
        releaseYear: 2019
    }
    const res = await request(app).post('/movies').send(movie)
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(movie.name);
    expect(res.body.id).toBeDefined();
});

test('POST/movies/:id/actors', async () => {
    const actor = await Actor.create({
        firstName: "Jared",
        lastName: "Leto",
        nationality: "Estados Unidos",
        image: "https://jaredleto.jpg",
        birthday: "1971-12-26"
    })
    const res = await request(app)
        .post(`/movies/${id}/actors`)
        .send([actor.id])
    await actor.destroy()
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('POST/movies/:id/directors', async () => {
    const director = await Director.create({
        firstName: "Mary",
        lastName: "Harron",
        nationality: "Canadá",
        image: "https://maryharron.jpg",
        birthday: "1953-01-12",
    })
    const res = await request(app)
        .post(`/movies/${id}/directors`)
        .send([director.id])
    await director.destroy()
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('POST/movies/:id/genres', async () => {
    const genre = await Genre.create({
        name: "Aventura"
    })
    const res = await request(app)
        .post(`/movies/${id}/genres`)
        .send([genre.id])
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('PUT/movies/:id', async () => {
    const movie = {
        name: "Parasites update"
    }
    const res = await request(app).put('/movies/'+id).send(movie)
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(movie.name);
});

test('DELETE/movies/:id', async () => {
    const res = await request(app).delete('/movies/'+id)
    expect(res.status).toBe(204);
});