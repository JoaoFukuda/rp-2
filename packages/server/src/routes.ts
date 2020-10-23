import express from 'express'

import classesController from './controllers/ClassesController'
import UsersController from './controllers/UsersController'

const routes = express.Router()

routes.post('/classes', classesController.create)
routes.get('/classes', classesController.index)

routes.post('/users', UsersController.create)

export default routes
