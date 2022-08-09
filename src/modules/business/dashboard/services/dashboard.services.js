import Api from '@/axios'

export default {
  getHomeData () {
    return Api().get('home')
  },
  getAnalysisByDate (date) {
    return Api().get(`analysis/${date}`)
  },
  getServiceAnalysis (type, id, date) {
    return Api().get(`${type}-analysis/${id}/${date}`)
  }
}
