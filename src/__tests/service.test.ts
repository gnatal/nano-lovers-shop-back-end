import app from '../app'
import supertest from 'supertest'
import connection from '../database'

beforeAll(async () => {
  await connection.create()
})

// afterAll(async () => {
//   await connection.close()
// })

//this line erases all the lines in the database before runs the tests
// beforeEach(async () => {
//   await connection.clear()
// })

describe('Test the product CRUD', () => {
  it('It should response the POST method', async () => {
    const response = await supertest(app).post('/service').send({
      name: 'A nano phone fix',
      description: 'I fix your phone',
      price: 10,
      main_image: 'images/phone',
    })
    expect(response.statusCode).toBe(201)
  })

  it('getting products', async () => {
    const response = await supertest(app).get('/service').send()
    expect(response.statusCode).toBe(200)
  })
})
