import { getRepository } from 'typeorm'
import { Service } from '../../entity/Service'
import {
  errorContract,
  successContract,
} from '../../utils/serviceResponseContract'
import { validate } from 'class-validator'

export class createService {
  static execute = async ({ name, description, main_image, price }) => {
    const service = new Service()
    service.name = name
    service.description = description
    service.price = price
    service.main_image = main_image

    const repository = getRepository(Service)

    const errors = await validate(service)
    if (errors.length > 0) {
      return {
        status: 400,
        message: 'validation errors',
        validationErrors: errors.map((error) => error.toString()),
      } as errorContract
    }

    try {
      await repository.save(service)

      return {
        status: 201,
        data: { ...service },
      } as successContract
    } catch (e) {
      return {
        status: 400,
        message: 'Error saving the service',
      } as errorContract
    }
  }
}
