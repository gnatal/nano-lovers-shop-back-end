import { getRepository } from 'typeorm'
import { Product } from '../../entity/Product'
import {
  errorContract,
  successContract,
} from '../../utils/serviceResponseContract'

export class listProductService {
  static execute = async () => {
    const repository = getRepository(Product)

    try {
      const products = await repository.find()

      return {
        status: 200,
        data: [...products],
      } as successContract
    } catch (e) {
      return {
        status: 400,
        message: 'Error listing the services',
      } as errorContract
    }
  }
}
