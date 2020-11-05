import { Request, Response } from 'express'

import db from '../database'

const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const users = await db('users')
    .where('users.email', '=', `${email}`)
    .where('users.password', '=', `${password}`)
    .select('users.*')

  if (!users) return res.status(404).json({ errors: 'Email ou senha incorretos' })

  return res.json(users[0])
}

const signup = async (req: Request, res: Response) => {
  const {
    email,
    password,
    name,
    phone,
  } = req.body

  const insertedIds = await db('users').insert(
    { email, password, name, phone },
    'id',
  )

  const id = insertedIds[0]

  return res.status(201).json({ id })
}

export default { signup, signin }
