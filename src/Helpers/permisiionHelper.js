/*
import store from '@/store'
*/
import Vue from 'vue'
Vue.prototype.$perHelper = function (permission) {
  // return (this.localStorage.getItem('userInfo').indexOf(permission) > -1)
  return true
}
