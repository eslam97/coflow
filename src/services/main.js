import Api from '@/axios'

export default {
  listDataTabl (url, filter) {
    return Api().get(url, {
      params: { ...filter }
    })
  }
}
