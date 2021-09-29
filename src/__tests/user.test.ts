import app from '../app'
import supertest from 'supertest'
import connection from '../database'

beforeAll(async () => {
  await connection.create()
})

// afterAll(async () => {
//   await connection.close()
// })

// this line erases all the lines in the database before runs the tests
beforeEach(async () => {
  await connection.clear()
})

describe('Test the user CRUD', () => {
  it('It should create a new user', async () => {
    const response = await supertest(app).post('/user').send({
      username: 'guilherme natal',
      email: 'guilhermenatal48@gmail.com',
      password: '12345678',
      passwordConfirmation: '12345678',
    })
    expect(response.statusCode).toBe(201)
  })
})
