import '@babel/polyfill'
import Vue from 'vue'
import 'mutationobserver-shim'
import './Utils/fliter'
import './config/firebase'
import App from './App.vue'
import router from './router'
import store from './store'
import Raphael from 'raphael/raphael'
import './plugins'
import './registerServiceWorker'
import AlgoliaComponents from 'vue-instantsearch'
import i18n from './i18n'
import './directives'

import Multiselect from 'vue-multiselect'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import 'vue-select/src/scss/vue-select.scss'
import './Helpers/permisiionHelper'
import './Helpers/dateHelper'
import authPermissions from './mixins/auth-permission'
import datePermissions from './mixins/mainFunctionDate'
import memberMenu from './components/members/memberMenu'
import InfiniteLoading from 'vue-infinite-loading'
import welcomePage from './components/welcomePage'
import Swiper from './components/core/slider/Swiper'
import SwiperNav from './components/core/slider/SwiperNav'
import SwiperSlide from './components/core/slider/SwiperSlide'
import VueTree from './tree/vue-tree'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import DateRangePicker from 'vue2-daterange-picker'
import spinnerLoading from '@/components/spinnerLoading'
/*
import VueRecord from '@codekraft-studio/vue-record'
*/
import AudioRecorder from 'vue-audio-recorder'
import _ from 'lodash'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

Vue.use(AudioRecorder)
Object.defineProperty(Vue.prototype, '$_', { value: _ })
/*
Vue.use(VueRecord)
*/
Vue.use(InfiniteLoading, { /* options */ })

global.Raphael = Raphael
Vue.use(AlgoliaComponents)
Vue.component('multiselect', Multiselect)
Vue.component('DatePicker', DatePicker)
Vue.component('spinner-loading', spinnerLoading)
Vue.component('infinite-loading', InfiniteLoading)
Vue.component('v-select', vSelect)
Vue.component('member-menu', memberMenu)
Vue.component('welcome-page', welcomePage)
Vue.component('Swiper', Swiper)
Vue.component('SwiperNav', SwiperNav)
Vue.component('SwiperSlide', SwiperSlide)
Vue.component('DateRangePicker', DateRangePicker)
Vue.mixin(authPermissions)
Vue.mixin(datePermissions)
Vue.config.productionTip = false
Vue.component('vue-tree', VueTree)

const vm = new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

window.vm = vm
