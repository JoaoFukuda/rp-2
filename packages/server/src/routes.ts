import express from 'express'
import multer from 'multer'
import uploadConfig from './config/upload'

import materialsController from './controllers/MaterialsController'
import usersController from './controllers/UsersController'

const upload = multer(uploadConfig.multer)

const routes = express.Router()

routes.get('/material/:filename', materialsController.show)
routes.get('/materials/:userId', materialsController.index)
routes.get('/materials', materialsController.search)
routes.post('/materials', upload.single('file'), materialsController.create)
routes.put('/materials', upload.single('file'), materialsController.update)
routes.delete('/materials/:id', materialsController.destroy)

routes.post('/signin', usersController.signin)
routes.post('/signup', usersController.signup)

export default routes
