import leadServices from '@/services/Leads/leads'

export default {
  createNewLead ({ dispatch }, leadData) {
    return new Promise((resolve, reject) => {
      leadServices.addLeads(leadData).then(res => {
        dispatch('getAllLead', { pageNumber: 1 })
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  createNewLeadWithStatus ({ dispatch }, leadData) {
    return new Promise((resolve, reject) => {
      leadServices.addLeadsWithStatus(leadData).then(res => {
        dispatch('getAllLead', { pageNumber: 1 })
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getAllLead ({ commit }, { pageNumber = 1, name = '', dateTo = '', dateFrom = '' }) {
    return new Promise((resolve, reject) => {
      leadServices.getAllLeads(pageNumber, name, dateTo, dateFrom).then(res => {
        commit('getAllLeads', res.data.data)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  deleteLead ({ dispatch }, leadId) {
    return new Promise((resolve, reject) => {
      leadServices.deleteLead(leadId).then(res => {
        dispatch('getAllLead')
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  editLead ({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      leadServices.editLead(payload.leadId, payload.newData).then(res => {
        dispatch('getAllLeads')
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  GetSpacificLead ({ commit }, leadId) {
    return new Promise((resolve, reject) => {
      leadServices.getSpacificLeads(leadId).then(res => {
        commit('getSpacificLead', res.data.data)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getLeadFrom ({ commit }, { pageNumber = 1, filterTitle = '', filterStatus = '' }) {
    return new Promise((resolve, reject) => {
      leadServices.getLeadFrom(pageNumber, filterTitle, filterStatus).then(res => {
        commit('getLeadFrom', res.data.data)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getSpacificFrom ({ commit }, formId) {
    return new Promise((resolve, reject) => {
      leadServices.getSpacificFrom(formId).then(res => {
        commit('getSpacificFrom', res.data.data)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  createNewLeadFrom ({ dispatch }, data) {
    return new Promise((resolve, reject) => {
      leadServices.createNewLeadFrom(data).then(res => {
        dispatch('getLeadFrom', { pageNumber: 1 })
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  editLeadFrom ({ dispatch }, payload) {
    payload.newData.is_active ? payload.newData.is_active = 1 : payload.newData.is_active = 0
    return new Promise((resolve, reject) => {
      leadServices.editLeadFrom(payload.leadId, payload.newData).then(res => {
        dispatch('getLeadFrom', { pageNumber: 1 })
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  deleteSpacificLeadFrom ({ dispatch }, leadId) {
    return new Promise((resolve, reject) => {
      leadServices.deleteSpacificLeadFrom(leadId).then(res => {
        dispatch('getLeadFrom', { pageNumber: 1 })
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  changeStatusFrom (_, fromId) {
    return new Promise((resolve, reject) => {
      leadServices.changeStatusFrom(fromId).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getInfoToCreateLead ({ commit }) {
    return new Promise((resolve, reject) => {
      leadServices.getInfoToCreateLead().then(res => {
        commit('getInfoToCreateLead', res.data.data)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getDataByPhoneNumber (_, phoneNumber) {
    return new Promise((resolve, reject) => {
      leadServices.getDataByPhoneNumber(phoneNumber).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  gitHistory (_, { id, pageNumber = 1 }) {
    return new Promise((resolve, reject) => {
      leadServices.gitHistory(id, pageNumber).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getModeratorsWidget (_, filter = 'daily') {
    return new Promise((resolve, reject) => {
      leadServices.getModeratorsWidget(filter).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getSalesWidget (_, filter = 'daily') {
    return new Promise((resolve, reject) => {
      leadServices.getSalesWidget(filter).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
