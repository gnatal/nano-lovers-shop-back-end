import { createConnection, getConnection } from 'typeorm'

createConnection()

//this connection const is used to run the tests
const connection = {
  async create() {
    try {
      await createConnection({
        name: 'default',
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'nano_lovers_test',
        synchronize: false,
        entities: ['src/entity/**/*.ts'],
        migrations: ['src/migration/**/*.ts'],
        subscribers: ['src/subscriber/**/*.ts'],
      })
    } catch (e) {
      console.log(e)
    }
  },

  async close() {
    await getConnection().close()
  },

  async clear() {
    try {
      const connection = getConnection()
      const entities = connection.entityMetadatas

      //clear the database
      entities.forEach(async (entity) => {
        const repository = connection.getRepository(entity.name)
        await repository.query(`DELETE FROM ${entity.tableName}`)
      })
    } catch (e) {
      console.log(e)
    }
  },
}
export default connection
