import Api from '@/axios'

export default {
  addFeedBacks (payload) {
    return Api().post('feedbacks', payload)
  }
}
