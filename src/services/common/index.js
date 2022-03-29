import Api from '@/axios'

export default {
  commonUploadFiles (payload) {
    const options = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    return Api().post('media/upload', payload, options)
  },
  deleteFiles (id) {
    return Api().delete(`media/upload/delete/${id}`)
  }
}
