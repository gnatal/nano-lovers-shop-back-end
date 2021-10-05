import { Response, Request } from 'express'
import { getRepository } from 'typeorm'
import { Order } from '../../entity/Order'

export default class orderController {
  static async index(req: Request, res: Response): Promise<void> {
    try {
      console.log('running order controller')
    } catch (e) {
      console.log(e)
    }
    res.status(200).send()
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
