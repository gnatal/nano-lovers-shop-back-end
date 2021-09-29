import { Request, Response } from 'express'
import { Product } from '../entity/Product'
import { createProductService } from '../services/product/createProductService'
import { listProductService } from '../services/product/listProductService'

export class ProductController {
  static index = async (req: Request, res: Response) => {
    try {
      const result = await listProductService.execute()
      res
        .status(result.status)
        .json({ ...result })
        .send()
    } catch (e) {
      console.log('error at listing products', e)
    }

    return
  }

  static getOne = (req: Request, res: Response) => {
    return true
  }
  static create = async (req: Request, res: Response) => {
    const { name, description, main_image, price, stock } = req.body
    const result = await createProductService.execute({
      name,
      description,
      main_image,
      price,
      stock,
    })
    res
      .status(result.status)
      .json({ ...result })
      .send()

    return
  }
  static update = (req: Request, res: Response) => {
    return true
  }
  static delete = (req: Request, res: Response) => {
    return true
  }
}
