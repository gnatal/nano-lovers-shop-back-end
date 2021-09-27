import 'dotenv/config'
import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import './database'
import routes from './routes'

const app = express()
app.use(express.json())
app.use(cors())
app.disable('x-powered-by')
app.use('/', routes)

app.listen(process.env.PORT, () => {
  console.log('server is running')
})
