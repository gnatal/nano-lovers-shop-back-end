import { getRepository } from 'typeorm'
import { Service } from '../../entity/Service'
import {
  errorContract,
  successContract,
} from '../../utils/serviceResponseContract'

export class listService {
  static execute = async () => {
    const repository = getRepository(Service)

    try {
      const services = await repository.find()

      return {
        status: 201,
        data: [...services],
      } as successContract
    } catch (e) {
      return {
        status: 201,
        message: 'Error listing the services',
      } as errorContract
    }
  }
}
