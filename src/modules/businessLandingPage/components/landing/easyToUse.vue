<template>
  <div class="bg-white easy-to-use position-relative py-5">
    <img :src="require('@/assets/images/businessLanding/easyToUse/S-right.png')" class="right-image">
    <img :src="require('@/assets/images/businessLanding/easyToUse/S-left.png')" class="left-image">
    <b-container>
      <div class="py-3">
        <div class="header">
          <h3 class="text-center text-primary mb-2">Simple, Specialized & Straight To The Point</h3>
          <p class="text-center text-secondary font-size-12 mb-4">Different Dashboards, Same Style & Core Functions</p>
        </div>
      </div>
      <b-row class="d-flex justify-content-center mb-5">
        <b-col md="7" sm="12" class="justify-content-center">
          <div>
      <b-carousel
          id="sliderImageOfDashboard"
          controls
          indicators
      >
        <b-carousel-slide :img-src="require('@/assets/images/businessLanding/1.png')"></b-carousel-slide>
        <b-carousel-slide :img-src="require('@/assets/images/businessLanding/2.png')"></b-carousel-slide>
        <b-carousel-slide :img-src="require('@/assets/images/businessLanding/3.png')"></b-carousel-slide>
        <b-carousel-slide :img-src="require('@/assets/images/businessLanding/4.png')"></b-carousel-slide>
        <b-carousel-slide :img-src="require('@/assets/images/businessLanding/5.png')"></b-carousel-slide>
      </b-carousel>
          </div>
        </b-col>
      </b-row>
<!--      <b-row class="d-flex justify-content-center">
        <b-col md="7" sm="12" class="justify-content-center">
          <div>
            <Swiper id="post-slider" :option="options" :pagination="true">
          <template v-slot:nav>
            <SwiperNav  v-if="false"/>
          </template>
          <SwiperSlide class="d-flex align-items-center">
            <img :src="require('@/assets/images/businessLanding/PicDashborad.png')" class="img-fluid rounded">
          </SwiperSlide>
            <SwiperSlide class="d-flex align-items-center">
              <img :src="require('@/assets/images/businessLanding/PicDashborad.png')" class="img-fluid rounded">
            </SwiperSlide>
            <SwiperSlide class="d-flex align-items-center">
              <img :src="require('@/assets/images/businessLanding/PicDashborad.png')" class="img-fluid rounded">
            </SwiperSlide>
            <SwiperSlide class="d-flex align-items-center">
              <img :src="require('@/assets/images/businessLanding/PicDashborad.png')" class="img-fluid rounded">
            </SwiperSlide>
        </Swiper>
          </div>
        </b-col>
      </b-row>-->
    </b-container>
  </div>
</template>

<style>
.left-image, .right-image{
  position: absolute;
  top: 35%;
  left: 0;
  width: 80px;
  z-index: 1;

}
.right-image{
  left: unset;
  right: 0;
}
#sliderImageOfDashboard {
  z-index: 2;
}
#sliderImageOfDashboard .carousel-indicators {
  bottom: -50px !important;
}
#sliderImageOfDashboard .carousel-indicators li {
  width: 10px !important;
  height: 10px !important;
  border-radius: 50% !important;
  background-color: var(--iq-primary) !important;
  margin-right: 6px !important;
  margin-left: 6px !important;
}
#sliderImageOfDashboard .carousel-control-prev ,
#sliderImageOfDashboard .carousel-control-next {
  display: none;
}
</style>
