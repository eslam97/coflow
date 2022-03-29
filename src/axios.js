import axios from 'axios'
import router from './router/index'
import { core } from '../src/config/pluginInit'
export default () => {
  const apiClient = axios.create({
    baseURL: 'https://bked.lexeons.com/api',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token') ? localStorage.getItem('access_token') : null}`,
      Accept: 'application/json'
    }
  })
  apiClient.interceptors.response.use((response) => {
    return response
  }, (error) => {
    // eslint-disable-next-line eqeqeq
    if (error.response.data.message == 'system_shutdown' || error.response.data.message == 'not_allow_ip_address' || error.response.data.message == 'not_allow_ip_address' || error.response.data.message == 'Unauthenticated.') {
      // eslint-disable-next-line eqeqeq
      if (error.response.data.message == 'system_shutdown') {
        this.$router.push('/pages/maintenance')
      } else {
        router.push('/auth/sign-in1')
        localStorage.removeItem('access_token')
        localStorage.setItem('errorData', 'you are not in maxevia!')
        localStorage.setItem('errorPhone', 'not_allow_ip_address!')
      }

      // eslint-disable-next-line eqeqeq
    }
    if (error.response.data.errors) {
      // eslint-disable-next-line no-unused-vars
      for (const [key, value] of Object.entries(error.response.data.errors)) {
        core.showSnackbar('error', value)
      }
    } else if (error.response.data.error) {
      core.showSnackbar('error', error.response.data.error)
    }
    return Promise.reject(error)
  })
  return apiClient
}
