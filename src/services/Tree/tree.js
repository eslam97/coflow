import Api from '@/axios'

export default {
  getTree () {
    return Api().get('enterprises/tree')
  }
}
