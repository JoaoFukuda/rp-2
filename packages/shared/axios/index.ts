import axios from 'axios'
import { apiUrl } from '@rp-2/dotenv'

const api = axios.create({
  baseURL: apiUrl || 'http://localhost:8080',
})

export default api
