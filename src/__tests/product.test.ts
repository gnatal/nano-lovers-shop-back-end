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
    const response = await supertest(app).post('/product').send({
      name: 'Nano phone',
      description: "A phone that doesn't spy you",
      price: 10,
      main_image: 'images/phone',
      stock: '10',
    })
    expect(response.statusCode).toBe(201)
  })

  it('getting products', async () => {
    const response = await supertest(app).get('/product').send()
    expect(response.statusCode).toBe(200)
  })
})
