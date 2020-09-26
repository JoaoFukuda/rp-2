import dotenv from 'dotenv'

dotenv.config({
  path: '../../.env',
})

export const nodeEnv = process.env.NODE_ENV
export const port = process.env.PORT
export const apiUrl = process.env.API_URL
export const dbName = process.env.DB_NAME
export const dbUser = process.env.DB_USER
export const dbPassword = process.env.DB_PASSWORD
