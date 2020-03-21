import crypto from 'crypto'
import { APP_KEY } from '../constants'

const algorithm = 'aes-256-cbc' as const
//const key = Buffer.from(APP_KEY)
const key = crypto.randomBytes(32)
const iv = crypto.randomBytes(16)

export function encrypt(text: string) {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv)
  const encrypted = cipher.update(text)
  const encryptedData = Buffer.concat([encrypted, cipher.final()])
  return { iv: iv.toString('hex'), encryptedData: encryptedData.toString('hex') }
}

export function decrypt(text: { iv: string; encryptedData: string }) {
  const iv = Buffer.from(text.iv, 'hex')
  const encryptedText = Buffer.from(text.encryptedData, 'hex')
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv)
  const decrypted = decipher.update(encryptedText)
  const decryptedData = Buffer.concat([decrypted, decipher.final()])
  return decryptedData.toString()
}
