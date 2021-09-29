import { validate } from 'class-validator'
import { getRepository } from 'typeorm'
import { User } from '../../entity/User'
import {
  errorContract,
  successContract,
} from '../../utils/serviceResponseContract'

export default class createUserService {
  execute = async ({
    username,
    password,
    email,
  }): Promise<errorContract | successContract> => {
    const user = new User()
    user.username = username
    user.password = password
    user.email = email
    const errors = await validate(user)
    if (errors.length > 0) {
      return {
        status: 401,
        message: 'validation errors',
        validationErrors: errors.map((error) => error.toString()),
      } as errorContract
    }

    user.hashPassword()

    const userRepository = getRepository(User)

    try {
      await userRepository.save(user)
      return {
        status: 201,
        data: { ...user },
      } as successContract
    } catch (e) {
      return {
        status: 401,
        message: 'validation errors',
        validationErrors: errors.map((error) => error.toString()),
      } as errorContract
    }
  }
}
