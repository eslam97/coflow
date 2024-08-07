import Vue from 'vue'

// plugins
import '@babel/polyfill'
import 'mutationobserver-shim'
import Raphael from 'raphael/raphael'
import AlgoliaComponents from 'vue-instantsearch'
import InfiniteLoading from 'vue-infinite-loading'
import _ from 'lodash'
import excel from 'vue-excel-export'

// style
import 'vue-select/dist/vue-select.css'
import 'vue-select/src/scss/vue-select.scss'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import 'vue2-datepicker/index.css'

// custom
import './Utils/fliter'
import './config/firebase'
import './plugins'
import './registerServiceWorker'
import './directives'
import './Helpers/permisiionHelper'
import './Helpers/dateHelper'
import authPermissions from './mixins/auth-permission'
import datePermissions from './mixins/mainFunctionDate'

// Import Swiper styles
Object.defineProperty(Vue.prototype, '$_', { value: _ })
Vue.use(InfiniteLoading, { /* options */ })
global.Raphael = Raphael
Vue.use(AlgoliaComponents)
Vue.use(excel)
Vue.mixin(authPermissions)
Vue.mixin(datePermissions)
