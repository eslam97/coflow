<template>
  <div>
    <Loader />
<!--    <section class="sign-in-page">
      <b-container class="bg-white mt-5 p-0">
        <div class="row no-gutters">
          <div class="col-sm-6 align-self-center">
            <div class="sign-in-from">
              <router-view></router-view>
            </div>
          </div>
          <div class="col-sm-6 text-center">
            <div class="sign-in-detail text-white" :style="'background: url('+bgImageURL+') no-repeat 0 0; background-size: cover;'">
              <a class="sign-in-logo mb-5" href="#"><img :src="logo" class="img-fluid" alt="logo"></a>
              <Swiper :options="options">
                <SwiperSlide class="item">
                  <img :src="require('../../assets/images/login/login-1.png')" class="img-fluid mb-4" alt="logo">
                  <h4 class="mb-1 text-white">Manage your orders</h4>
                  <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                </SwiperSlide>
                <SwiperSlide class="item">
                  <img :src="require('../../assets/images/login/login-1.png')" class="img-fluid mb-4" alt="logo">
                  <h4 class="mb-1 text-white">Manage your orders</h4>
                  <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                </SwiperSlide>
                <SwiperSlide class="item">
                  <img :src="require('../../assets/images/login/login-1.png')" class="img-fluid mb-4" alt="logo">
                  <h4 class="mb-1 text-white">Manage your orders</h4>
                  <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </b-container>
    </section>-->
    <section class="sign-in-page d-flex justify-content-center align-items-center" style="height: 100vh">
      <b-container class="p-0">
        <div class="bg-white py-5 m-auto rounded" style="max-width: 700px">
          <img class="m-auto d-block" width="120px" :src="logo"/>
          <div class="row no-gutters mt-2">
            <div class="col-sm-12 align-self-center">
              <div class="sign-in-from">
                <router-view></router-view>
              </div>
            </div>
            <!--          <div class="col-sm-6 text-center">
                        <div class="sign-in-detail text-white">
                          <Swiper :options="options">
                            <SwiperSlide class="item">
                              <img :src="require('../../assets/images/login/WhatsApp Image 2021-09-13 at 6.27.17 AM.jpeg')" class="img-fluid mb-4" alt="logo">
                            </SwiperSlide>
                            <SwiperSlide class="item">
                              <img :src="require('../../assets/images/login/WhatsApp Image 2021-09-13 at 6.27.18 AM.jpeg')" class="img-fluid mb-4" alt="logo">
                            </SwiperSlide>
                          </Swiper>
                        </div>
                      </div>-->
          </div>
        </div>
      </b-container>
    </section>
  </div>
</template>
<script>
import Loader from '../../components/core/loader/Loader'
import logo from '../../assets/images/logo.png'
import { core } from '../../config/pluginInit'
import bgImage from '../../assets/images/login/login-2.jpg'
/* import Swiper from '../../components/core/slider/Swiper'
import SwiperSlide from '../../components/core/slider/SwiperSlide' */
export default {
  name: 'AuthLayout',
  components: {
    Loader
    /* Swiper,
    SwiperSlide */
  },
  mounted () {
    core.index()
  },
  data () {
    return {
      options: {
        slidesPerView: 1,
        loop: true
      },
      logo: logo,
      bgImageURL: bgImage
    }
  }
}
</script>
<style>
  @import url("../../assets/css/custom.css");
</style>
