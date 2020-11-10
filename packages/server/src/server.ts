import express from 'express'
import cors from 'cors'
import path from 'path'
import { port } from '@rp-2/dotenv'

import routes from './routes'

const app = express()

app.use(cors())
app.use(express.static(path.join(__dirname, 'uploads')))
app.use(express.json())
app.use(routes)

console.log(`Running on port ${port}`)
app.listen(port)
