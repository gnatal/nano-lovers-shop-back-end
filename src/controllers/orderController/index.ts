import { Response, Request } from 'express'
import { getRepository } from 'typeorm'
import { Order } from '../../entity/Order'

export class OrderController {
  static async index(req: Request, res: Response): Promise<void> {
    try {
      const orderRepository = getRepository(Order)
      const orders = orderRepository.find()
      res
        .json({ ...orders })
        .status(200)
        .send()
      return
    } catch (e) {
      console.log(e)
      return
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const order = new Order()
      const orderRepository = getRepository(Order)
      await orderRepository.save(order)
      res
        .json({ ...order })
        .status(201)
        .send()
    } catch (e) {
      res.status(400).send()
    }
  }
}
