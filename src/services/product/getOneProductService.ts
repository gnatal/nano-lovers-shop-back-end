import { getRepository } from 'typeorm'
import { Product } from '../../entity/Product'
import {
  errorContract,
  successContract,
} from '../../utils/serviceResponseContract'

export class getOneProductService {
  static execute = async (
    id: string
  ): Promise<successContract | errorContract> => {
    const repository = getRepository(Product)

    try {
      const product = await repository.findOneOrFail(id)

      return {
        status: 200,
        data: { ...product },
      } as successContract
    } catch (e) {
      return {
        status: 400,
        message: 'Error listing the services',
      } as errorContract
    }
  }
}
