import { getRepository } from 'typeorm'
import { Service } from '../../entity/Service'
import {
  errorContract,
  successContract,
} from '../../utils/serviceResponseContract'

export class updateService {
  static execute = async ({ id, name, description, main_image, price }) => {
    const repository = getRepository(Service)

    try {
      const service = await repository.findOneOrFail(id)
      service.name = name
      service.description = description
      service.price = price
      service.main_image = main_image
      await repository.save(service)

      return {
        status: 200,
        data: { ...service },
      } as successContract
    } catch (e) {
      return {
        status: 400,
        message: 'Error updating the service',
      } as errorContract
    }
  }
}
