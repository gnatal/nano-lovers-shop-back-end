import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { validate } from 'class-validator'
import createUserService from '../services/createUserService'
import {
  errorContract,
  successContract,
  isErrorContractContract,
  isSuccessContract,
} from '../utils/serviceResponseContract'
import { encode } from '../utils/JWT'

import { User } from '../entity/User'

class UserController {
  static listAll = async (req: Request, res: Response) => {
    //Get users from database
    const userRepository = getRepository(User)
    const users = await userRepository.find({
      select: ['id', 'username', 'email'],
    })

    //Send the users object
    res.send(users)
  }

  static getOneById = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id: number | string = req.params.id

    //Get the user from database
    const userRepository = getRepository(User)
    try {
      const user = await userRepository.findOneOrFail(id, {
        select: ['id', 'username', 'email'],
      })
    } catch (error) {
      res.status(404).send('User not found')
    }
  }

  static newUser = async (req: Request, res: Response) => {
    const { username, password, email, passwordConfirmation } = req.body

    if (password != passwordConfirmation) {
      res.json('Password mismatch').status(400).send()
      return
    }

    const userService = new createUserService()
    const result = await userService.execute({ username, password, email })
    if (isSuccessContract(result)) {
      const authToken = encode({
        userId: (result as successContract).data.id,
        username: (result as successContract).data.username,
      })
      res.status(result.status).json({ authToken }).send()
      return
    }
    res.status(result.status).json({ result }).send()
  }

  static editUser = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id

    //Get values from the body
    const { username, role } = req.body

    //Try to find user on database
    const userRepository = getRepository(User)
    let user
    try {
      user = await userRepository.findOneOrFail(id)
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send('User not found')
      return
    }

    //Validate the new values on model
    user.username = username
    user.role = role
    const errors = await validate(user)
    if (errors.length > 0) {
      res.status(400).send(errors)
      return
    }

    //Try to safe, if fails, that means username already in use
    try {
      await userRepository.save(user)
    } catch (e) {
      res.status(409).send('username already in use')
      return
    }
    //After all send a 204 (no content, but accepted) response
    res.status(204).send()
  }

  static deleteUser = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id

    const userRepository = getRepository(User)
    let user: User
    try {
      user = await userRepository.findOneOrFail(id)
    } catch (error) {
      res.status(404).send('User not found')
      return
    }
    userRepository.delete(id)

    //After all send a 204 (no content, but accepted) response
    res.status(204).send()
  }
}

export default UserController
