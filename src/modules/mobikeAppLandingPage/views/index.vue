<template>
  <div>
    <b-container>
      <div class="d-flex justify-content-between align-items-center py-3">
        <b-navbar-brand href="#">
          <img :src="require('@/assets/images/LogoBlack.png')" alt="coFlow" class='brandImage'>
        </b-navbar-brand>
          <b-button variant="primary" class="businessButton" @click="$router.push({name: 'businessLandingPage'})">
            <span>Business</span>
          </b-button>
      </div>
    </b-container>

    <!-- hero Section -->
    <div class="d-flex justify-content-between align-items-center flex-lg-row flex-column">
      <div class="w-65 h-100 pl-5">
        <b-container>
          <div class="d-flex align-items-start flex-column">
            <h1 class="header_hero">Directory to all fun <br> activities you can do</h1>
            <p class="p_hero">Lorem ipsum dolor sit amet, consectetur <br>
              adipiscing elit. Ut pretium pretium tempor.</p>
            <div class="d-flex mobile-section ">
              <img :src="require('@/assets/images/mobilaAppLanding/Apple-badge.png')" alt="ios" class="ios">
              <img :src="require('@/assets/images/mobilaAppLanding/Google_play-badge.png')" alt="android" class="android">
            </div>
          </div>
        </b-container>
      </div>
      <div class="hero w-35 h-100 bg-primary d-flex align-items-center blue_section">
        <img :src="require('@/assets/images/mobilaAppLanding/Header-Logo.png')" alt="Header-Logo" class="circleLogo">
        <img :src="require('@/assets/images/mobilaAppLanding/phone.png')" alt="mobileApp" class="mobileImage">
      </div>
    </div>

    <!--Features-->
    <div class="features">
      <div class="py-5">
        <div class="header">
          <p class="text-center text-secondary font-size-12">Features</p>
          <h2 class="text-center text-primary mb-2 font-weight-bold mb-5">Save. Track. Go.</h2>
          <b-container>
            <b-row class="d-flex justify-content-between mb-4">
              <b-col md="3" class="mb-2 d-flex justify-content-center">
                <div class="w-75">
                  <img :src="require('@/assets/images/mobilaAppLanding/Explore@4x.png')" alt="Explore" class='Explore'>
                  <h5 class="mb-2 text-primary font-weight-bold">Discover</h5>
                  <p class="">Find out the who, what, when & where with our detailed facility profiles. The why is yours.</p>
                </div>
              </b-col>
              <b-col md="3" class="mb-2 d-flex justify-content-center">
                <div class="w-75">
                  <img :src="require('@/assets/images/mobilaAppLanding/Save@2x.png')" alt="Save" class='Explore'>
                  <h5 class="mb-2 text-primary font-weight-bold">Save</h5>
                  <p class="">Save whatever catches your interest in your account for later, on the Go.</p>
                </div>
              </b-col>
              <b-col md="3" class="mb-2 d-flex justify-content-center">
                <div class="w-75">
                  <img :src="require('@/assets/images/mobilaAppLanding/Track@2x.png')" alt="Track" class='Explore'>
                  <h5 class="mb-2 text-primary font-weight-bold">Track</h5>
                  <p class="">Track any profile & you’ll be the first to know, if they update their schedule, services or
                    promotions.</p>
                </div>
              </b-col>
              <b-col md="3" class="mb-2 d-flex justify-content-center">
                <div class="w-75">
                  <img :src="require('@/assets/images/mobilaAppLanding/Go@3X.png')" alt="Go" class='Explore'>
                  <h5 class="mb-2 text-primary font-weight-bold">Go</h5>
                  <p class="">Let go & Just Go. Give it a try. Money always comes & goes, but experiences last a life time.</p>
                </div>
              </b-col>
            </b-row>
            <h2 class="text-center text-primary mb-2 font-weight-bold mb-5">Explore & Shop</h2>
            <b-row class="d-flex justify-content-center">
              <b-col md="3" class="mb-2 d-flex justify-content-center">
                <div class="w-75">
                  <img :src="require('@/assets/images/mobilaAppLanding/Explore@4x.png')" alt="Explore" class='Explore'>
                  <h5 class="mb-2 text-primary font-weight-bold">Explore</h5>
                  <p class="">Go to the source; to mountains, caves, camps & all of nature's landmarks to understand the why</p>
                </div>
              </b-col>
              <b-col md="3" class="mb-2 d-flex justify-content-center">
                <div class="w-75">
                  <img :src="require('@/assets/images/mobilaAppLanding/Products@2x.png')" alt="Shop" class='Explore'>
                  <h5 class="mb-2 text-primary font-weight-bold">Shop</h5>
                  <p class="">Go to the source; to mountains, caves, camps & all of nature's landmarks to understand the why</p>
                </div>
              </b-col>
            </b-row>
          </b-container>
        </div>
      </div>
    </div>

    <!--Categories-->
    <div class="Categories">
      <div class="py-5">
        <div class="header">
          <p class="text-center text-secondary font-size-12">Categories</p>
          <h2 class="text-center text-primary mb-2 font-weight-bold mb-5">Sky Was Never The Limit<br>
            It Was Always Our Playground</h2>
            <b-row class="m-0 p-0 align-items-center mb-5">
              <b-col md="5" class="p-0 mb-2">
                <img class="w-100" :src="require('@/assets/images/mobilaAppLanding/sky.png')" alt="Explore">
               </b-col>
              <b-col md="2"></b-col>
              <b-col md="5" class="mb-2">
                <div class="d-flex flex-column">
                  <div class="d-flex align-items-center">
                  <img :src="require('@/assets/images/mobilaAppLanding/skyFrame.png')" alt="Explore" class="frame-image">
                  <h2 class="mb-2 text-primary ml-4">Sky</h2>
                  </div>
                  <p class="w-75 mt-4">Donec facilisis tortor ut augue lacinia, at viverra est semper. Sed sapien
                    metus, scelerisque nec pharetra id, tempor a tortor. Donec facilisis tortor ut augue lacinia, at viverra est semper. </p>
                  <div class="d-flex activities_item">
                    <div
                        :style="`background: url(${require('../../../assets/images/mobilaAppLanding/Dive.png')})`"
                        class="text-white">
                      Dive
                    </div>
                    <div
                        :style="`background: url(${require('../../../assets/images/mobilaAppLanding/Dive.png')})`"
                        class="text-white">
                    Para</div>
                  </div>
                </div>
              </b-col>
            </b-row>
            <b-row class="m-0 p-0 align-items-center mb-5">
              <b-col md="2"></b-col>
            <b-col md="5" class="mb-2">
                <div class="d-flex flex-column">
                  <div class="d-flex align-items-center">
                    <img :src="require('@/assets/images/mobilaAppLanding/Sea (framed).png')" alt="Explore" class="frame-image">
                    <h2 class="mb-2 text-primary ml-4">Sea</h2>
                  </div>
                  <p class="w-75 mt-4">Donec facilisis tortor ut augue lacinia, at viverra est semper. Sed sapien
                    metus, scelerisque nec pharetra id, tempor a tortor. Donec facilisis tortor ut augue lacinia, at viverra est semper. </p>
                  <div class="d-flex activities_item">
                    <div
                        :style="`background: url(${require('../../../assets/images/mobilaAppLanding/Dive@2x.png')})`"
                        class="text-white">
                      Dive
                    </div>
                    <div
                        :style="`background: url(${require('../../../assets/images/mobilaAppLanding/Surf@2x.png')})`"
                        class="text-white">
                      Surf</div>
                  </div>
                </div>
              </b-col>
            <b-col md="5" class="p-0 mb-2">
                <img class="w-100" :src="require('@/assets/images/mobilaAppLanding/sea.png')" alt="sea">
              </b-col>
          </b-row>
            <b-row class="m-0 p-0 align-items-center mb-5">
              <b-col md="5" class="p-0 mb-2">
                <img class="w-100" :src="require('@/assets/images/mobilaAppLanding/earth.png')" alt="Explore">
               </b-col>
              <b-col md="2"></b-col>
              <b-col md="5" class="mb-2">
                <div class="d-flex flex-column">
                  <div class="d-flex align-items-center">
                  <img :src="require('@/assets/images/mobilaAppLanding/Earth (framed).png')" alt="Explore" class="frame-image">
                  <h2 class="mb-2 text-primary ml-4">Earth</h2>
                  </div>
                  <p class="w-75 mt-4">Donec facilisis tortor ut augue lacinia, at viverra est semper. Sed sapien
                    metus, scelerisque nec pharetra id, tempor a tortor. Donec facilisis tortor ut augue lacinia, at viverra est semper. </p>
                  <div class="d-flex activities_item">
                    <div
                        :style="`background: url(${require('../../../assets/images/mobilaAppLanding/Ride@2x.png')})`"
                        class="text-white">
                      Ride
                    </div>
                    <div
                        :style="`background: url(${require('../../../assets/images/mobilaAppLanding/Grip@2x.png')})`"
                        class="text-white">
                    Grip</div>
                  </div>
                </div>
              </b-col>
            </b-row>
            <b-row class="m-0 p-0 align-items-center mb-5">
              <b-col md="2"></b-col>
            <b-col md="5" class="p-0 mb-2">
                <div class="d-flex flex-column">
                  <div class="d-flex align-items-center">
                    <img :src="require('@/assets/images/mobilaAppLanding/Energy (framed).png')" alt="Energy"
                         class="frame-image">
                    <h2 class="mb-2 text-primary ml-4">Energy</h2>
                  </div>
                  <p class="w-75 mt-4">Donec facilisis tortor ut augue lacinia, at viverra est semper. Sed sapien
                    metus, scelerisque nec pharetra id, tempor a tortor. Donec facilisis tortor ut augue lacinia, at viverra est semper. </p>
                  <div class="d-flex activities_item">
                    <div
                        :style="`background: url(${require('../../../assets/images/mobilaAppLanding/Flex@2x.png')})`"
                        class="text-white">
                      Flex
                    </div>
                    <div
                        :style="`background: url(${require('../../../assets/images/mobilaAppLanding/Fit@2x.png')})`"
                        class="text-white">
                      Fit
                    </div>
                  </div>
                </div>
              </b-col>
            <b-col md="5" class="mb-2">
                <img class="w-100" :src="require('@/assets/images/mobilaAppLanding/energy.png')" alt="sea">
              </b-col>
          </b-row>
        </div>
      </div>
    </div>

    <!-- Get the app -->
    <div class="bg-primary pt-5 text-center download-last-section">
      <p class="p_hero text-white mb-0">What are you waiting for?</p>
      <h1 class="header_hero text-white mt-1 mb-5">Get the app</h1>
      <div class="download-last-section-images d-flex justify-content-center gap-20 mt-2">
        <img :src="require('@/assets/images/mobilaAppLanding/googlestore@2x.png')" alt="googlestore">
        <img :src="require('@/assets/images/mobilaAppLanding/appstore@2x.png')" alt="appstore">
      </div>
      <div class="position-relative mt-5">
        <img :src="require('@/assets/images/mobilaAppLanding/FooterLogoCircle.png')" alt="Logo" class="FooterLogoCircle">
        <img :src="require('@/assets/images/mobilaAppLanding/FooterMobile.png')" alt="Mobile" class="FooterMobile">
      </div>
    </div>
    <landing-footer />
  </div>
</template>
<script>
import landingFooter from '@/modules/businessLandingPage/components/landing/footer'
export default {
  components: {
    landingFooter
  }
}
</script>
<style>
.w-35 {
  width: 35% !important;
}
.w-65 {
  width: 65% !important;
}
.businessButton {
  border-radius: 32px !important;
  padding: 9px 25px !important;
}
.businessButton::focus{
  background-color: var(--iq-primary);
  border-color: var(--iq-primary);
}
.header_hero {
  font-weight: bold !important;
  color: var(--iq-primary) !important;
  line-height: 1 !important;
}
.p_hero {
  color: #14152f99 !important;
  margin: 30px 0 !important;
  font-size: 18px !important;
}
.blue_section {
  border-bottom-left-radius: 63px;
}
.blue_section img {
  position: absolute;
}
.mobileImage {
  width: 55%;
  left: -64px;
}
.circleLogo {
width: 100%;
  left: -34%;
}
.mobile-section {
  gap: 20px;
}
.mobile-section img {
  width: 180px;
}
.features img {
  width: 55px;
  margin-bottom: 15px;
}
.features p {
  color: #14152f99 !important;
}
.frame-image {
  width: 65px;
}
.activities_item {
  gap: 20px;
}
.activities_item div {
  padding: 9px 54px;
  background-size: contain !important;
  background-repeat: no-repeat !important;
}
.download-last-section {
  border-top-left-radius: 63px;
  border-top-right-radius: 63px;
}
.download-last-section-images img {
  width: 120px;
}
.FooterLogoCircle {
  width: 36%;
}
.FooterMobile {
  position: absolute;
  width: 387px;
  bottom: 0;
  left: 41%;
}
</style>
<style>
@import url("../../../assets/css/custom.css");
</style>
