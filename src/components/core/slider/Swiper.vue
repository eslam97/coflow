<template>
  <div :id="id">
    <slot name="nav" v-if="navTop" />
    <div class="swiper-container" v-if="tag == 'div'" :dir="rtl ? 'rtl' : ''">
      <!-- Additional required wrapper -->
      <div class="swiper-wrapper">
        <!-- Slides -->
        <slot />
      </div>
      <!-- If we need pagination -->
      <div class="swiper-pagination" v-if="pagination">
        <slot name="pagination" />
      </div>
      <!-- If we need scrollbar -->
      <div class="swiper-scrollbar" v-if="scrollbar">
        <slot name="scrollbar" />
      </div>
    </div>
    <ul class="swiper-container" v-else-if="tag == 'ul'" :dir="rtl ? 'rtl' : ''">
      <!-- Additional required wrapper -->
      <div class="swiper-wrapper">
        <!-- Slides -->
        <slot />
      </div>
      <!-- If we need pagination -->
      <div class="swiper-pagination" v-if="pagination">
        <slot name="pagination" />
      </div>
      <!-- If we need scrollbar -->
      <div class="swiper-scrollbar" v-if="scrollbar">
        <slot name="scrollbar" />
      </div>
    </ul>
    <slot name="nav" v-if="!navTop" />
  </div>
</template>

<script>
import Swiper, { Navigation, Pagination, Parallax, Autoplay } from 'swiper'
import { mapGetters } from 'vuex'
import 'swiper/swiper.scss'
import 'swiper/components/pagination/pagination.scss'
Swiper.use([Navigation, Pagination, Parallax, Autoplay])
let swiper
export default {
  name: 'Swiper',
  props: {
    className: { type: String, default: 'vue-swiper-class' },
    id: { type: String, default: 'vue-swiper-id' },
    options: {
      type: Object,
      default: () => {
      }
    },
    navTop: { type: Boolean, default: false },
    pagination: { type: Boolean, default: true },
    scrollbar: { type: Boolean, default: false },
    tag: { type: String, default: 'div' }
  },
  data () {
    return {
      swiper: {}
    }
  },
  computed: {
    ...mapGetters({
      rtl: 'Setting/rtlModeState'
    })
  },
  watch: {
    rtl: function (value) {
      this.reInit()
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      swiper = new Swiper('.swiper-container', this.options)
    },
    reInit () {
      swiper.destroy(true, true)
      setTimeout(() => {
        this.init()
      }, 500)
    }
  }
}
</script>

<style scoped>

    [dir="rtl"] .swiper-slide {
      text-align: right !important;
      /* Center slide text vertically */
      display: -webkit-box !important;
      display: -ms-flexbox !important;
      display: -webkit-flex !important;
      display: flex !important;
      -webkit-box-pack: right !important;
      -ms-flex-pack: right !important;
      -webkit-justify-content: right !important;
      justify-content: right !important;
      -webkit-box-align: right !important;
      -ms-flex-align: right !important;
      -webkit-align-items: right !important;
      align-items: right !important;
    }
</style>
