import { getRepository } from 'typeorm'
import { Service } from '../../entity/Service'
import {
  errorContract,
  successContract,
} from '../../utils/serviceResponseContract'

export class listService {
  static execute = async (): Promise<successContract | errorContract> => {
    const repository = getRepository(Service)

    try {
      const services = await repository.find()

      return {
        status: 200,
        data: [...services],
      } as successContract
    } catch (e) {
      return {
        status: 400,
        message: 'Error listing the services',
      } as errorContract
    }
  }
}
