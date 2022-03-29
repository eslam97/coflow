import Vue from 'vue'
export default {
  methods: {
    hasPer: name => Vue.prototype.$perHelper(name)
  }
}
