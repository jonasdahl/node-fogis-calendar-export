import express from 'express'
import { games } from './routes/games'
import { PORT } from './constants'

const app = express()

app.use(games())

app.listen(PORT, () => {
  console.log(`Express server started at port ${PORT}`)
})
