<!--
<template>
  <div  class="bg-white easy-to-use">
    <b-container>
      <div class="py-5 mt-5">
        <div class="header">
          <h3 class="text-center text-primary mb-2">Simple, Tailored, & Easy to use</h3>
          <p class="text-center text-secondary font-size-12 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Ut <br/>pretium pretium tempor .</p>
        </div>
      </div>
      <div class="slider_swiper">
        <b-row class="d-flex justify-content-center position-relative">
          <b-col md="6" class="bg-danger overflow-hidden">
            <swiper class="swiper"  :slides-per-view="3"
                    :space-between="50">
              <swiper-slide>Slide 1</swiper-slide>
              <swiper-slide>Slide 2</swiper-slide>
              <swiper-slide>Slide 3</swiper-slide>
              <swiper-slide>Slide 4</swiper-slide>
              <swiper-slide>Slide 5</swiper-slide>
              <swiper-slide>Slide 6</swiper-slide>
              <swiper-slide>Slide 7</swiper-slide>
              <swiper-slide>Slide 8</swiper-slide>
              <swiper-slide>Slide 9</swiper-slide>
              <swiper-slide>Slide 10</swiper-slide>
            </swiper>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </div>
</template>
<script>
export default {
  components: {
  },
  methods: {
    onSwiper (swiper) {
      console.log(swiper)
    }
  }
}
</script>
<style scoped>
</style>
-->
<template>
  <swiper
      :slides-per-view="3"
      :space-between="50"
  >
    <p>sssssssssss</p>
    <p>sssssssssss</p>
    <p>sssssssssss</p>
    <p>sssssssssss</p>
    <p>sssssssssss</p>
  </swiper>
</template>
<script>
import SwiperCore, { Navigation, Parallax, Swiper } from 'swiper'
import 'swiper/swiper.scss'
SwiperCore.use([Navigation, Parallax])
export default {
  components: {
    Swiper
  },
  setup () {
    const onSwiper = (swiper) => {
      console.log(swiper)
    }
    const onSlideChange = () => {
      console.log('slide change')
    }
    return {
      onSwiper,
      onSlideChange
    }
  }
}
</script>
