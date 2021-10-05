import { Request, Response } from 'express'
import { createProductService } from '../../services/product/createProductService'
import { deleteProductService } from '../../services/product/deleteProductService'
import { getOneProductService } from '../../services/product/getOneProductService'
import { listProductService } from '../../services/product/listProductService'
import { updateProductService } from '../../services/product/updateProductService'

export class ProductController {
  static index = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await listProductService.execute()
      res
        .status(result.status)
        .json({ ...result })
        .send()
    } catch (e) {
      console.log('error at listing products', e)
    }
  }

  static getOne = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    try {
      const result = await getOneProductService.execute(id)
      res
        .status(result.status)
        .json({ ...result })
        .send()
    } catch (e) {
      console.log('error at getting one product', e)
    }
  }

  static create = async (req: Request, res: Response): Promise<void> => {
    try {
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
    } catch (e) {
      res.status(400).send()
    }
  }

  static update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, description, main_image, price, stock } = req.body
      const { id } = req.params
      const result = await updateProductService.execute({
        id,
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
    } catch (e) {
      res.status(400).send()
    }
  }
  static delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params
      const result = await deleteProductService.execute(id)
      res
        .status(result.status)
        .json({ ...result })
        .send()
    } catch (e) {
      res.status(400).send()
    }
  }
}
