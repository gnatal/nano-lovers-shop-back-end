import { createConnection, getConnection } from 'typeorm'

createConnection()

//this connection const is used to run the tests
const connection = {
  async create() {
    await createConnection()
  },

  async close() {
    await getConnection().close()
  },

  async clear() {
    const connection = getConnection()
    const entities = connection.entityMetadatas

    //clear the database
    entities.forEach(async (entity) => {
      const repository = connection.getRepository(entity.name)
      await repository.query(`DELETE FROM ${entity.tableName}`)
    })
  },
}
export default connection
