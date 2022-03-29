/*
import store from '@/store'
*/
import Vue from 'vue'
Vue.prototype.$perHelper = function (permission) {
  // to check permission f  or authenticated user
  return true
  /* return store.getters.hasPermission(permission) */
}
