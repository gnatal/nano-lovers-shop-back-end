import app from '../app'
import supertest from 'supertest'
import connection from '../database'

beforeAll(async () => {
  await connection.create()
})

afterAll(async () => {
  await connection.close()
})

//this line erases all the lines in the database before runs the tests
beforeEach(async () => {
  await connection.clear()
})

describe('Test the root user path', () => {
  test('It should response the POST method', async () => {
    const response = await supertest(app).post('/user').send({
      username: 'guilherme nalinee',
      role: 'user',
      password: '12354678',
    })
    expect(response.statusCode).toBe(201)
  })
})
