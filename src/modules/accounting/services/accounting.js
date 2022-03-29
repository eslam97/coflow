import Api from '@/axios'

export default {
  getTotalDetailsInAllProjects () {
    return Api().get('accounts/categories/daily/projects/disk')
  }
}
