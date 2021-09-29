import { Request, Response } from 'express'
import { createService } from '../services/service/createService'
import { deleteService } from '../services/service/deleteService'
import { getOneService } from '../services/service/getOneService'
import { listService } from '../services/service/listService'
import { updateService } from '../services/service/updateService'
// import { validate } from 'class-validator'

export class serviceController {
  static index = async (req: Request, res: Response): Promise<void> => {
    const result = await listService.execute()
    res
      .status(result.status)
      .json({ ...result })
      .send()

    return
  }

  static newService = async (req: Request, res: Response): Promise<void> => {
    const { name, description, main_image, price } = req.body
    const result = await createService.execute({
      name,
      description,
      main_image,
      price,
    })
    res
      .status(result.status)
      .json({ ...result })
      .send()

    return
  }

  static getOne = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params
      const result = await getOneService.execute(id)
      res
        .status(result.status)
        .json({ ...result })
        .send()
    } catch (e) {
      console.log('error at getting one', e)
    }
    return
  }

  static update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params
      const { name, description, main_image, price } = req.body
      const result = await updateService.execute({
        id,
        name,
        description,
        main_image,
        price,
      })
      res
        .status(result.status)
        .json({ ...result })
        .send()
    } catch (e) {
      console.log('error at updating', e)
    }
    return
  }
  static delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params
      const result = await deleteService.execute(id)
      res
        .status(result.status)
        .json({ ...result })
        .send()
    } catch (e) {
      console.log('error at deleting', e)
    }
    return
  }
}
