import { Request, Response } from 'express'
import { makeRequest } from '../helper/cloudConvert'
import { removeMarkdown } from '../helper/removeMarkdown'
import { processTTS } from '../helper/textToSpeech'
import fs from 'fs'
import path from 'path'

import db from '../database'

const show = async (req: Request, res: Response) => {
  const { filename } = req.params

  const fileText = fs.readFileSync(path.join(__dirname, '..', 'uploads', filename), { encoding: 'utf8' })

  const removedMd = removeMarkdown(fileText)

  if (!removedMd) return res.status(404).json({ errors: 'Aula não encontrada' })

  return res.status(200).json(removedMd)
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
    .where('materials.subject', 'iLIKE', `%${query}%`)
    .orWhere('materials.author', 'iLIKE', `%${query}%`)
    .orWhere('materials.title', 'iLIKE', `%${query}%`)
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

  const { file } = req

  if (!/\.tex$/.test(file.path)) {
    return res.status(422).json({ created: false })
  }

  const fullPath = await makeRequest(file.path) as string

  const fullPathTxt = fullPath.replace('tex', 'txt')
  const txtFilename = file.filename.replace('tex', 'txt')

  console.log('full', fullPathTxt, txtFilename)
  processTTS(fullPathTxt, txtFilename)

  const splittedPath = fullPath.split('\\')

  const filename = splittedPath[splittedPath.length - 1]

  await db('materials').insert(
    { title, author, subject, file: filename, userId },
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

  const updatePayload = { title, author, subject }

  if (file) {
    Object.assign(updatePayload, { file: file.filename })

    await makeRequest(file.path)
  }

  await db('materials')
    .update(updatePayload)
    .where('id', id)

  return res.status(204).json({ updated: true })
}

const destroy = async (req: Request, res: Response) => {
  const { id } = req.params

  await db('materials').where('id', id).del()

  return res.status(200).json({ deleted: true })
}

export default { show, index, search, create, update, destroy }
