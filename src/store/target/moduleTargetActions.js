import target from '@/services/Target/target'

export default {
  createTargetAgent (_, { userId, data }) {
    return new Promise((resolve, reject) => {
      target.createTargetAgent(userId, data).then(res => {
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  getAllManagers (_, name) {
    return new Promise((resolve, reject) => {
      target.getAllManagers(name).then(res => {
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  getAllAgents (_, name) {
    return new Promise((resolve, reject) => {
      target.getAllAgents(name).then(res => {
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  getDetailsOfTarget (_, { userId, projectId }) {
    return new Promise((resolve, reject) => {
      target.getDetailsOfTarget(userId, projectId).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getAllAgentAndmanagesHaveTarget (_, { name, type, page = 1 }) {
    return new Promise((resolve, reject) => {
      target.getAllAgentAndmanagesHaveTarget(type, name, page).then(res => {
        resolve(res)
      }).catch(error => {
        // console.log(error.response)
        reject(error)
      })
    })
  },
  cloneUser (_, { userTo, payload }) {
    return new Promise((resolve, reject) => {
      target.cloneUser(userTo, payload).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
