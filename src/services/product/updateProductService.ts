import { getRepository } from 'typeorm'
import { Product } from '../../entity/Product'
import {
  errorContract,
  successContract,
} from '../../utils/serviceResponseContract'

export class updateProductService {
  static execute = async ({
    id,
    name,
    description,
    main_image,
    price,
    stock,
  }): Promise<successContract | errorContract> => {
    const repository = getRepository(Product)

    try {
      const product = await repository.findOneOrFail(id)
      product.name = name
      product.description = description
      product.price = price
      product.main_image = main_image
      product.stock = stock
      await repository.save(product)

      return {
        status: 200,
        data: { ...product },
      } as successContract
    } catch (e) {
      return {
        status: 400,
        message: 'Error updating the product',
      } as errorContract
    }
  }
}
