import getters from './getters'
import mutations from './mutations'

const state = {
  activeStepForm: 3
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
