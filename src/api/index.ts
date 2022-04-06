import axios from 'axios'

const config = {
  baseURL: 'https://reqres.in/api',
  headers: { Accept: 'application/json' }
}
const call = axios.create(config)
export default call
