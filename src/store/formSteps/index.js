import getters from './getters'
import mutations from './mutations'

const state = {
  activeStepForm: localStorage.getItem('formStep') || ''
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
