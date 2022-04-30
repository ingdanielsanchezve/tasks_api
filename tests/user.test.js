const { faker } = require('@faker-js/faker')
const request = require('supertest')
const app = require('../app')

let token
beforeAll((done) => {
  request(app)
    .post('/api/login')
    .send({
      email: 'demo@demo.com',
      password: '$321pass!'
    })
    .end((err, resp) => {
      token = resp.body.token
      done()
    })
})

describe('User API', () => {
  it('Should create a new user', async () => {
    const res = await request(app)
        .post('/api/signup')
        .send({
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          email: faker.internet.email(),
          password: faker.internet.password(8)
        })

    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('success', true)
    expect(res.body).toHaveProperty('message', 'User created successfully')
    expect(res.body).toHaveProperty('data')
    expect(res.body).toHaveProperty('token')
  }),

  it ('Should login a user', async () => {
    const res = await request(app)
          .post('/api/login')
          .send({
            email: 'demo@demo.com',
            password: '$321pass!'
          })

    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('success', true)
    expect(res.body).toHaveProperty('user')
    expect(res.body).toHaveProperty('token')
  })

  it('Should require authorization token', async () => {
    const res = await request(app)
          .get('/api/users/1')

    expect(res.statusCode).toEqual(403)
  })

  it('Should get user data', async () => {
    const res = await request(app)
          .get('/api/users/1')
          .set('x-access-token', `${token}`)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('user')
  })
})