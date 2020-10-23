import { Request, Response } from 'express'

import db from '../database'

const index = async (req: Request, res: Response) => {
  const { subject } = req.query

  const classes = await db('classes')
    .where('classes.subject', 'LIKE', `%${subject}%`)
    .join('users', 'classes.userId', '=', 'users.id')
    .select(['classes.*', 'users.*'])

  if (!classes) return res.status(404).json({ errors: 'Nenhuma aula encontrada' })

  return res.json(classes)
}

const create = async (req: Request, res: Response) => {
  const {
    avatar,
    bio,
    material,
    name,
    phone,
    subject,
  } = req.body

  const transaction = await db.transaction()

  try {
    const insertedUserIds = await transaction('users').insert({ avatar, bio, name, phone }, 'id')
    const userId = insertedUserIds[0]

    await transaction('classes').insert({ material, subject, userId }, 'id')

    await transaction.commit()

    return res.sendStatus(201)
  } catch (err) {
    await transaction.rollback()

    return res.status(err.status || 400).json({
      error: err.message || 'Ocorreu um erro inesperado',
    })
  }
}

export default { index, create }
