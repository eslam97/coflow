import Vue from 'vue'
import Vuex from 'vuex'
import Setting from './Setting/index'
import formSteps from './formSteps/index'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    Setting,
    formSteps
  },
  state: {

  },
  mutations: {
  },
  actions: {
  },
  getters: {
  },
  strict: debug
})
