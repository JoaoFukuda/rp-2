import path from 'path'
import multer, { StorageEngine } from 'multer'
import crypto from 'crypto'

const uploadsFolder = path.resolve(__dirname, '..', 'uploads')

interface UploadConfig {
  tmpFolder: string;
  uploadsFolder: string;

  multer: { storage: StorageEngine };
}

export default {
  uploadsFolder,

  multer: {
    storage: multer.diskStorage({
      destination: uploadsFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex')
        const fileName = `${fileHash}-${file.originalname}`

        return callback(null, fileName)
      },
    }),
  },
} as UploadConfig
