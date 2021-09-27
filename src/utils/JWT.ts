import jwt from 'jsonwebtoken'
import config from '../config/config'

export const encode = (data) => {
  const token = jwt.sign(data, config.jwtSecret)
  return token
}

export const decode = (token: string): string | jwt.JwtPayload => {
  return jwt.verify(token, config.jwtSecret)
}
