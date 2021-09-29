import { getRepository } from 'typeorm'
import { Product } from '../../entity/Product'
import {
  errorContract,
  successContract,
} from '../../utils/serviceResponseContract'

export class deleteProductService {
  static execute = async (
    id: string
  ): Promise<successContract | errorContract> => {
    const repository = getRepository(Product)

    try {
      const product = await repository.findOneOrFail(id)
      await repository.delete(product.id)

      return {
        status: 200,
        data: { ...product },
      } as successContract
    } catch (e) {
      return {
        status: 404,
        message: 'Error deleting the product, product not found',
      } as errorContract
    }
  }
}
