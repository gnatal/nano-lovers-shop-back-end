import { getRepository } from 'typeorm'
import { Product } from '../../entity/Product'
import {
  errorContract,
  successContract,
} from '../../utils/serviceResponseContract'
import { validate } from 'class-validator'

export class createProductService {
  static execute = async ({ name, description, main_image, price, stock }) => {
    const product = new Product()
    product.name = name
    product.description = description
    product.price = price
    product.main_image = main_image
    product.stock = stock

    const repository = getRepository(Product)

    const errors = await validate(product)
    if (errors.length > 0) {
      return {
        status: 400,
        message: 'validation errors',
        validationErrors: errors.map((error) => error.toString()),
      } as errorContract
    }

    try {
      await repository.save(product)

      return {
        status: 201,
        data: { ...product },
      } as successContract
    } catch (e) {
      return {
        status: 400,
        message: 'Error saving the product',
      } as errorContract
    }
  }
}
