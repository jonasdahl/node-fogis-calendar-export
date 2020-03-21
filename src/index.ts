import express from 'express'
import { games } from './routes/games'
import { index } from './routes/index'
import morgan from 'morgan'

const app = express()
const logger = morgan('common')
const port = process.env.PORT ?? 4001
const url = process.env.URL ?? `http://localhost:${port}`

app.use(logger)
app.use(index({ url }))
app.use(games())

app.listen(port, () => {
  console.log(`Express server started at port ${port}`)
  console.log('The configured self-referencing URL is', url)
})
