import { Request, Response } from 'express'

import db from '../database'

const index = async (req: Request, res: Response) => {
  const { id } = req.params

  const materials = await db('materials')
    .where('materials.userId', '=', `${id}`)
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
    file,
  } = req.body

  await db('materials').update(id, { title, author, subject, file })

  return res.status(204).json({ updated: true })
}

const destroy = async (req: Request, res: Response) => {
  const { id } = req.params
  console.log(id)
  await db('materials').where('id', id).del()

  return res.status(200).json({ deleted: true })
}

export default { index, search, create, update, destroy }
