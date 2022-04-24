import getters from './getters'
import mutations from './mutations'

const state = {
  activeStepForm: 2
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
