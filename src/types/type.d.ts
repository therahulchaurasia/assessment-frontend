import { JwtPayload } from "jsonwebtoken"
import { User } from "./db"

export type loginData = {
  email: string
  password: string
}

export type registrationData = {
  name: string
  email: string
  password: string
}

export interface CustomError extends Error {
  response: {
    data: {
      message: string
    }
  }
}


export interface AuthToken extends JwtPayload, User {}
