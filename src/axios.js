import axios from 'axios'
/* import router from './router/index' */
import { core } from '@/config/pluginInit'
import router from './router/index'
export default () => {
  const apiClient = axios.create({
    baseURL: 'https://back.coflow.co/Coflow/apiWeb/apiProvider/',
    headers: {
      Authorization: `Bearer ${
        localStorage.getItem('userToken')
          ? localStorage.getItem('userToken')
          : null
      }`,
      Accept: 'application/json'
    }
  })
  apiClient.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (
        error.response.status === 401 ||
        error.response.data.message === 'Unauthenticated'
      ) {
        localStorage.removeItem('userToken')
        localStorage.removeItem('userInfo')
        localStorage.removeItem('formStep')
        localStorage.removeItem('permissions')
        router.push('/business')
      }
      if (error.response.data.errors) {
        // eslint-disable-next-line no-unused-vars
        for (const [key, value] of Object.entries(error.response.data.errors)) {
          core.showSnackbar('error', value)
        }
      } else if (error.response.data) {
        core.showSnackbar('error', error.response.data.message)
      }
      return Promise.reject(error)
    }
  )
  return apiClient
}
