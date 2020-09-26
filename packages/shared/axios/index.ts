import axios from 'axios'
import { apiUrl } from '@rp-2/dotenv'

const api = axios.create({
  baseURL: apiUrl,
})

export default api
