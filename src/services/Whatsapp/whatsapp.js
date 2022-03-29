import Api from '@/axios'

export default {
  addSettingWhatsapp (data) {
    return Api().post('projects/settings/whatsapp/store', data)
  },
  getAllsettingWhatsapp (pageNumber) {
    return Api().get(`/projects/settings/whatsapp?page=${pageNumber}`)
  },
  getSpacificSettingWhatsapp (id) {
    return Api().get(`projects/settings/whatsapp/${id}`)
  },
  editSettingWhatsapp (id, newData) {
    return Api().post(`projects/settings/whatsapp/${id}`, newData)
  },
  changeStatusSettingWhatsapp (projectId) {
    return Api().patch(`projects/settings/whatsapp/status/${projectId}`)
  },
  showWhatsappLog (projectId, pageNumber, search, read) {
    return Api().get(`projects/whatsapp/logs?project_id=${projectId}&page=${pageNumber}&search=${search}&read=${read}`)
  },
  showUserMessage (id, pageNumber) {
    return Api().get(`projects/whatsapp/logs/${id}?page=${pageNumber}`)
  },
  editRead (id) {
    return Api().patch(`projects/whatsapp/logs/${id}`)
  },
  sendMessage (data) {
    const options = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    return Api().post('projects/whatsapp/logs/send', data, options)
  }
}
