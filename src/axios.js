import axios from 'axios'
/* import router from './router/index' */
import { core } from '@/config/pluginInit'
import router from './router/index'
export default () => {
  const apiClient = axios.create({
    // baseURL: 'https://cashflow.redgits.com/CoFlow/apiProvider/',
    baseURL: 'https://back.coflow.co/CoFlow/apiProvider/',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('userToken') ? localStorage.getItem('userToken') : null}`,
      Accept: 'application/json'
    }
  })
  apiClient.interceptors.response.use((response) => {
    return response
  }, (error) => {
    if (error.response.status === 401 || error.response.data.message === 'Unauthenticated') {
      localStorage.removeItem('userToken')
      localStorage.removeItem('userInfo')
      localStorage.removeItem('formStep')
      localStorage.removeItem('permissions')
      router.push('/business')
    }
    // eslint-disable-next-line
    /*
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
*/
    if (error.response.data.errors) {
      // eslint-disable-next-line no-unused-vars
      for (const [key, value] of Object.entries(error.response.data.errors)) {
        core.showSnackbar('error', value)
      }
    } else if (error.response.data) {
      core.showSnackbar('error', error.response.data.message)
    }
    return Promise.reject(error)
  })
  return apiClient
}
