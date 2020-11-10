import { Request, Response } from 'express'

import db from '../database'

const show = async (req: Request, res: Response) => {
  const { id } = req.params

  const material = await db('materials')
    .where('materials.id', '=', id)
    .select('materials.*')

  if (!material[0]) return res.status(404).json({ errors: 'Aula não encontrada' })

  return res.status(200).json(material[0])
}

const index = async (req: Request, res: Response) => {
  const { userId } = req.params

  const materials = await db('materials')
    .where('materials.userId', '=', `${userId}`)
    .select('materials.*')

  if (!materials) return res.status(404).json({ errors: 'Nenhuma aula encontrada' })

  return res.status(200).json(materials)
}

const search = async (req: Request, res: Response) => {
  const { query } = req.query

  const materials = await db('materials')
    .where('materials.subject', 'LIKE', `%${query}%`)
    .orWhere('materials.author', 'LIKE', `%${query}%`)
    .orWhere('materials.title', 'LIKE', `%${query}%`)
    .join('users', 'materials.userId', '=', 'users.id')
    .select(['materials.*', 'users.*'])

  if (!materials) return res.status(404).json({ errors: 'Nenhuma aula encontrada' })

  return res.status(200).json(materials)
}

const create = async (req: Request, res: Response) => {
  const {
    title,
    author,
    subject,
    userId,
  } = req.body

  const file = req.file

  await db('materials').insert(
    { title, author, subject, file: file.filename, userId },
  )

  return res.status(201).json({ created: true })
}

const update = async (req: Request, res: Response) => {
  const {
    id,
    title,
    author,
    subject,
  } = req.body

  const file = req.file

  await db('materials')
    .update({ title, author, subject, file: file.filename })
    .where('id', id)

  return res.status(204).json({ updated: true })
}

const destroy = async (req: Request, res: Response) => {
  const { id } = req.params

  await db('materials').where('id', id).del()

  return res.status(200).json({ deleted: true })
}

export default { show, index, search, create, update, destroy }
