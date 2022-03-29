import Api from '@/axios'

export default {
  createTargetAgent (userId, data) {
    return Api().post(`sales/targets/agents/${userId}`, data)
  },
  getAllAgents (name) {
    return Api().get(`sales/targets/agents/create?type=agent&name=${name}`)
  },
  getAllManagers (name) {
    return Api().get(`sales/targets/agents/create?type=manager&name=${name}`)
  },
  getDetailsOfTarget (userId, projectId) {
    return Api().get(`sales/targets/agents/${userId}?project_id=${projectId}`)
  },
  cloneUser (userTo, payload) {
    return Api().post(`sales/targets/agents/clone/${userTo}`, payload)
  },
  getAllAgentAndmanagesHaveTarget (type, name = '', page) {
    return Api().get(`sales/targets/agents?type=${type}&name=${name}&page=${page}`)
  }
}
