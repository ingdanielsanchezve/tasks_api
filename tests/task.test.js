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
  it('Should get all Tasks', async () => {
    const res = await request(app)
          .get('/api/tasks')
          .set('x-access-token', `${token}`)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('tasks')
  }),

  it('Should get Task with id 1', async () => {
    const res = await request(app)
          .get('/api/tasks/1')
          .set('x-access-token', `${token}`)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('task')
  }),

  it('Should create a new task', async () => {
    const res = await request(app)
          .post('/api/tasks')
          .set('x-access-token', `${token}`)
          .send({
            title: faker.lorem.sentence(5),
            userId: faker.mersenne.rand(1, 10)
          })

    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('success')
    expect(res.body).toHaveProperty('message')
    expect(res.body).toHaveProperty('data')
  }),

  it('Should get all tasks of user with id 1', async () => {
    const res = await request(app)
          .get('/api/users/1/tasks')
          .set('x-access-token', `${token}`)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('tasks')
  }),

  it('Should update a task', async () => {
    const res = await request(app)
          .put('/api/tasks/1/1')
          .set('x-access-token', `${token}`)
          .send({
            title: 'Hello world, now this task is updated'
          })

    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('success', true)
    expect(res.body).toHaveProperty('message', 'Task updated successfully')
    expect(res.body).toHaveProperty('data')
  }),

  it('Should delete a task', async () => {
    const res = await request(app)
          .del('/api/tasks/1/1')
          .set('x-access-token', `${token}`)

    expect(res.statusCode).toEqual(204)
  })

})