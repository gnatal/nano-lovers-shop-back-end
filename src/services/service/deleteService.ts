import { getRepository } from 'typeorm'
import { Service } from '../../entity/Service'
import {
  errorContract,
  successContract,
} from '../../utils/serviceResponseContract'

export class deleteService {
  static execute = async (
    id: string
  ): Promise<successContract | errorContract> => {
    const repository = getRepository(Service)

    try {
      const service = await repository.findOneOrFail(id)
      await repository.delete(service.id)
      return {
        status: 200,
        data: { ...service },
      } as successContract
    } catch (e) {
      return {
        status: 404,
        message: 'Error getting the service',
      } as errorContract
    }
  }
}
