import Api from '@/axios'

export default {
  getFaqList () {
    return Api().get('admin-FAQ')
  },
  filterNotification () {
    return Api().get('all-notifications')
  }
}
