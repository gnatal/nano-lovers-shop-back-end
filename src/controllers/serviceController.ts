import { Request, Response } from 'express'
import { createService } from '../services/service/createService'
import { listService } from '../services/service/listService'
// import { validate } from 'class-validator'

export class serviceController {
  static index = async (req: Request, res: Response) => {
    const result = await listService.execute()
    res
      .status(result.status)
      .json({ ...result })
      .send()

    return
  }

  static newService = async (req: Request, res: Response) => {
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
}
