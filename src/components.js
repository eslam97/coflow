import Vue from 'vue'
import Multiselect from 'vue-multiselect'
import DatePicker from 'vue2-datepicker'
import spinnerLoading from '@/components/spinnerLoading'
import InfiniteLoading from 'vue-infinite-loading'
import vSelect from 'vue-select'
import welcomePage from '@/components/welcomePage'
import Swiper from '@/components/core/slider/Swiper'
import SwiperNav from '@/components/core/slider/SwiperNav'
import SwiperSlide from '@/components/core/slider/SwiperSlide'
import mainTable from '@/components/table/mainTable'
import deletePopup from '@/components/modal/deleteModal'
import DateRangePicker from 'vue2-daterange-picker'

// main modal
import mainModal from '@/components/modal/mainModal'
// form Elements
import inputForm from '@/components/formElements/InputForm'
import mainSelect from '@/components/formElements/VSelect'
Vue.component('multiselect', Multiselect)
Vue.component('DatePicker', DatePicker)
Vue.component('spinner-loading', spinnerLoading)
Vue.component('infinite-loading', InfiniteLoading)
Vue.component('v-select', vSelect)
Vue.component('welcome-page', welcomePage)
Vue.component('Swiper', Swiper)
Vue.component('SwiperNav', SwiperNav)
Vue.component('SwiperSlide', SwiperSlide)
Vue.component('DateRangePicker', DateRangePicker)
Vue.component('mainTable', mainTable)
Vue.component('deletePopup', deletePopup)
Vue.component('main-modal', mainModal)
Vue.component('input-form', inputForm)
Vue.component('main-select', mainSelect)
