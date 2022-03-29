import whatsappSettingServices from '@/services/Whatsapp/whatsapp'

export default {
  addSettingWhatsapp (_, projectData) {
    return new Promise((resolve, reject) => {
      whatsappSettingServices.addSettingWhatsapp(projectData).then(res => {
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  getAllsettingWhatsapp (_, { pageNumber = 1 }) {
    return new Promise((resolve, reject) => {
      whatsappSettingServices.getAllsettingWhatsapp(pageNumber).then(res => {
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  editSettingWhatsapp (_, payload) {
    payload.newData.is_active ? payload.newData.is_active = 1 : payload.newData.is_active = 0
    return new Promise((resolve, reject) => {
      whatsappSettingServices.editSettingWhatsapp(payload.id, payload.newData).then(res => {
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  getSpacificSettingWhatsapp ({ commit }, id) {
    return new Promise((resolve, reject) => {
      whatsappSettingServices.getSpacificSettingWhatsapp(id).then(res => {
        commit('getSpacificWhatsapp', res.data.data)
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  changeStatusSettingWhatsapp (_, id) {
    return new Promise((resolve, reject) => {
      whatsappSettingServices.changeStatusSettingWhatsapp(id).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  showWhatsappLog (_, { projectId, pageNumber = 1, search = '', read = '' }) {
    return new Promise((resolve, reject) => {
      whatsappSettingServices.showWhatsappLog(projectId, pageNumber, search, read).then(res => {
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  showUserMessage (_, { id, pageNumber = 1 }) {
    return new Promise((resolve, reject) => {
      // console.log('id => ', id)
      whatsappSettingServices.showUserMessage(id, pageNumber).then(res => {
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  editRead (_, { id }) {
    return new Promise((resolve, reject) => {
      // console.log('id => ', id)
      whatsappSettingServices.editRead(id).then(res => {
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  sendMessage (_, data) {
    return new Promise((resolve, reject) => {
      // console.log('data', data.file)
      whatsappSettingServices.sendMessage(data).then(res => {
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  }
}
