import express from 'express'

import classesController from './controllers/ClassesController'

const routes = express.Router()

routes.post('/classes', classesController.create)
routes.get('/classes', classesController.index)

export default routes
