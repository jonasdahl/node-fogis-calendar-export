import { Request, Response } from 'express'
import { decrypt } from '../helpers/encryption'
import { base64Decode } from '../helpers/hash'

export function authorization(req: Request, res: unknown, next: () => void) {
  const iv = req.query.index
  const data = req.query.token
  if (!data) {
    throw new Error('No data given.')
  }
  if (!iv) {
    throw new Error('No initialization vector given.')
  }
  const decrypted = decrypt({ iv, encryptedData: data })
  if (!decrypted) {
    throw new Error('Could not decrypt.')
  }
  const base64Decoded = base64Decode(decrypted)
  if (!base64Decoded) {
    throw new Error('Unable to decode string.')
  }
  console.log(base64Decoded)
  const matches = base64Decoded.match(/^(.*?):(.*)$/)
  if (!matches || !matches[1] || !matches[2]) {
    throw new Error('Could not parse data.')
  }

  req.principal = {
    username: matches[1],
    password: matches[2],
  }
  next()
}

declare global {
  namespace Express {
    export interface Request {
      principal?: {
        username: string
        password: string
      }
    }
  }
}
