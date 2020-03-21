import express from 'express'
import bodyParser from 'body-parser'
import { encrypt } from '../helpers/encryption'
import { base64Encode } from '../helpers/hash'

export function index({ url }: { url: string }) {
  const router = express.Router()

  router.get('/', async (req, res) => {
    res.send(`
        <html>
            <body>
                <form action="." method="POST">
                    <fieldset>
                        <legend>Fogis login:</legend>
                        <label for="username">Username:</label>
                        <input type="text" id="username" name="username" />
                        <label for="password">Password:</label>
                        <input type="password" id="password" name="password" />
                        <input type="submit" value="Submit">
                    </fieldset>
                </form>
            </body>
        </html>
    `)
  })

  router.post('/', bodyParser.urlencoded({ extended: true }), async (req, res) => {
    // TODO Try login to verify credentials
    const { encryptedData, iv } = encrypt(
      base64Encode(`${req.body.username}:${req.body.password}`)!,
    )
    const href = `${url}/games?token=${encryptedData}&index=${iv}`
    res.send(`
        <html>
            <body>
                
                <a href="${href}">${href}</a>
            </body>
        </html>
    `)
  })

  return router
}
