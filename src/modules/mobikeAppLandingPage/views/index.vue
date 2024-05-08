<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="" class="p-3 px-5 position-sticky top-0" id="nav-bar-business">
      <b-container fluid>
        <b-navbar-brand class="d-flex justify-content-between align-items-center w-100">
          <router-link to="/">
            <img :src="require('@/assets/images/LogoBlack.png')" alt="coFlow" class='brandImage'>
          </router-link>
          <b-button variant="primary" class="businessButton" @click="$router.push({name: 'businessLandingPage'})">
            <span>Business</span>
          </b-button>
        </b-navbar-brand>
      </b-container>
    </b-navbar>
<!--    <b-container>-->
<!--      <div class="d-flex justify-content-between align-items-center py-3 mt-2">-->
<!--        <b-navbar-brand href="#">-->
<!--          <img :src="require('@/assets/images/LogoBlack.png')" alt="coFlow" class='brandImage'>-->
<!--        </b-navbar-brand>-->
<!--          <b-button variant="primary" class="businessButton" @click="$router.push({name: 'businessLandingPage'})">-->
<!--            <span>Business</span>-->
<!--          </b-button>-->
<!--      </div>-->
<!--    </b-container>-->

    <!-- hero Section -->
    <div class="d-flex justify-content-between align-items-center flex-lg-row flex-column position-relative">
      <div class="white-section">
        <b-container>
          <div class="d-flex align-items-start flex-column">
            <h1 class="header_hero">Adventure Sports & <br>Wellness Activities</h1>
            <p class="p_hero font-weight-bold-500"> Connect with the version of yourself that makes <br/>  you feel alive today, for a better tomorrow.</p>
            <b-row class="mobile-section ">
              <b-col md="5" cols="12"><a href="https://play.google.com/store/apps/details?id=com.redgits.coflow" target="_blank">
                <img :src="require('@/assets/images/mobilaAppLanding/Google_play-badge.png')" alt="android" class="android"></a></b-col>
              <b-col md="5" cols="12"><a href="https://apps.apple.com/nz/app/coflow/id1640503180" target="_blank">
                <img :src="require('@/assets/images/mobilaAppLanding/Apple-badge.png')" alt="ios" class="ios"></a></b-col>
            </b-row>
          </div>
        </b-container>
      </div>
      <div class="hero h-100 bg-primary d-flex align-items-center blue_section">
        <img :src="require('@/assets/images/mobilaAppLanding/Header-Logo.png')" alt="Header-Logo" class="circleLogo">
        <img :src="require('@/assets/images/mobilaAppLanding/mobile.png')" alt="mobileApp" class="mobileImage">
      </div>
    </div>

    <!--Categories-->
    <div class="Categories">
      <div class="">
        <div class="header">
          <p class="text-center text-secondary font-size-12">Categories</p>
          <h2 class="text-center text-primary font-weight-bold mb-main">Sky Was Never The Limit<br>
            It Was Always Our Playground</h2>
            <b-row class="m-0 p-0 align-items-center mb-main">
              <b-col md="5" class="p-0 mb-2">
                <img class="w-100" :src="require('@/assets/images/mobilaAppLanding/sky.png')" alt="Explore">
               </b-col>
              <b-col md="2"></b-col>
              <b-col md="5" class="mb-2">
                <div class="d-flex flex-column">
                  <div class="d-flex align-items-center">
                  <img :src="require('@/assets/images/mobilaAppLanding/skyFrame.png')" alt="Explore" class="frame-image">
                  <h2 class="mb-2 text-primary ml-4"><b>Sky</b></h2>
                  </div>
                  <h4 class="mt-4 mb-0"><b>Fly Over the Horizon</b></h4>
                  <p class="font-weight-bold-500">Paramotor with the Planes, Paraglide with the Birds,<br>
                    Skydive with the Eagles & Parachute with the View.</p>
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
            <b-row class="m-0 p-0 align-items-center mb-main d-flex flex-column-reverse flex-md-row">
              <b-col md="2"></b-col>
            <b-col md="5" class="mb-2">
                <div class="d-flex flex-column">
                  <div class="d-flex align-items-center">
                    <img :src="require('@/assets/images/mobilaAppLanding/Sea (framed).png')" alt="Explore" class="frame-image">
                    <h2 class="mb-2 text-primary ml-4"><b>Sea</b></h2>
                  </div>
                  <h4 class="mt-4 mb-0"><b>Fall Into The Deep</b></h4>
                  <p class="font-weight-bold-500">Surf with the Waves, Kite with the Wind, Snorkel<br>
                    with the Dolphins & Scuba Dive with the Sharks.</p>
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
            <b-row class="m-0 p-0 align-items-center mb-main">
              <b-col md="5" class="p-0 mb-2">
                <img class="w-100" :src="require('@/assets/images/mobilaAppLanding/earth.png')" alt="Explore">
               </b-col>
              <b-col md="2"></b-col>
              <b-col md="5" class="mb-2">
                <div class="d-flex flex-column">
                  <div class="d-flex align-items-center">
                  <img :src="require('@/assets/images/mobilaAppLanding/Earth (framed).png')" alt="Explore" class="frame-image">
                  <h2 class="mb-2 text-primary ml-4"><b>Earth</b></h2>
                  </div>
                  <h4 class="mt-4 mb-0"><b>Fight With The Gravity</b></h4>
                  <p class="font-weight-bold-500">Ride into the Wind, Slide over the Surface,<br>
                    Grip over the Edge & Climb up the Mountain.</p>
                  <div class="d-flex activities_item">
                    <div
                        :style="`background: url(${require('../../../assets/images/mobilaAppLanding/ride@3x.png')});
                        background-size:cover!important`"
                        class="text-white">Ride
                    </div>
                    <div
                        :style="`background: url(${require('../../../assets/images/mobilaAppLanding/Grip@2x.png')})`"
                        class="text-white">
                    Grip</div>
                  </div>
                </div>
              </b-col>
            </b-row>
            <b-row class="m-0 p-0 align-items-center mb-2 d-flex flex-column-reverse flex-md-row">
              <b-col md="2"></b-col>
              <b-col md="5" class="mb-2">
                  <div class="d-flex flex-column">
                    <div class="d-flex align-items-center">
                      <img :src="require('@/assets/images/mobilaAppLanding/Energy (framed).png')" alt="Energy"
                           class="frame-image">
                      <h2 class="mb-2 text-primary ml-4"><b>Energy</b></h2>
                    </div>
                    <h4 class="mt-4 mb-0"><b>Flow With The Elements</b></h4>
                    <p class="font-weight-bold-500">Enhance your Fitness, Increase your Flexibility,<br>
                      Tighten your Core & Elevate your Balance.</p>
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
              <b-col md="5" class="mb-2 p-0">
                <img class="w-100" :src="require('@/assets/images/mobilaAppLanding/energy.png')" alt="energy">
              </b-col>
            </b-row>
        </div>
      </div>
    </div>

    <!--Features-->
    <div class="features">
      <div class="">
        <div class="header">
          <p class="text-center text-secondary font-size-12">Features</p>
          <h2 class="text-center text-primary mb-2 font-weight-bold mb-5">Save. Track. Go.</h2>
          <b-container>
            <div class="d-flex justify-content-around align-items-start pl-md-0 pl-3 mb-4 flex-column flex-md-row">
              <div class="mb-2 d-flex justify-content-center">
                <div>
                  <img :src="require('@/assets/images/mobilaAppLanding/Explore@4x.png')" alt="Explore" class='Explore'>
                  <h5 class="mb-2 text-primary font-weight-bold">Discover</h5>
                  <p class="font-weight-bold-500" style="text-align: justify">
                    Find out the who, what, when <br/>& where with our detailed facility <br/> profiles. The why is yours.</p>
                </div>
              </div>
              <div class="mb-2 d-flex justify-content-center">
                <div>
                  <img :src="require('@/assets/images/mobilaAppLanding/Save@2x.png')" alt="Save" class='Explore'>
                  <h5 class="mb-2 text-primary font-weight-bold">Save</h5>
                  <p class="font-weight-bold-500" style="text-align: justify">
                    Save whatever catches your<br/> interest in your account for <br/> later, on the Go.</p>
                </div>
              </div>
              <div class="mb-2 d-flex justify-content-center">
                <div>
                  <img :src="require('@/assets/images/mobilaAppLanding/Track@2x.png')" alt="Track" class='Explore'>
                  <h5 class="mb-2 text-primary font-weight-bold">Track</h5>
                  <p class="font-weight-bold-500" style="text-align: start">
                    Track any profile & you’ll be the <br/> first to know, if they update
                    their    <br/> schedule, services or
                    promotions.</p>
                </div>
              </div>
              <div class="mb-2 d-flex justify-content-center">
                <div>
                  <img :src="require('@/assets/images/mobilaAppLanding/Go@3XC.png')" alt="Go" class='Explore'>
                  <h5 class="mb-2 text-primary font-weight-bold">Go</h5>
                  <p class="font-weight-bold-500" style="text-align: justify">
                    Let go & Just Go. Give it a try. <br> Money always comes & goes, <br/> but experiences last a life time.</p>
                </div>
              </div>
            </div>
            <!--            <h2 class="text-center text-primary mb-2 font-weight-bold mb-5">Explore & Shop</h2>-->
            <!--            <b-row class="d-flex justify-content-center">-->
            <!--              <b-col md="3" class="mb-2 d-flex justify-content-center">-->
            <!--                <div class="w-75">-->
            <!--                  <img :src="require('@/assets/images/mobilaAppLanding/Explore@4x.png')" alt="Explore" class='Explore'>-->
            <!--                  <h5 class="mb-2 text-primary font-weight-bold">Explore</h5>-->
            <!--                  <p class="" style="text-align: justify">-->
            <!--                    Go to the source; to mountains, caves, camps & all of nature's landmarks to understand the why</p>-->
            <!--                </div>-->
            <!--              </b-col>-->
            <!--              <b-col md="3" class="mb-2 d-flex justify-content-center">-->
            <!--                <div class="w-75">-->
            <!--                  <img :src="require('@/assets/images/mobilaAppLanding/Products@2x.png')" alt="Shop" class='Explore'>-->
            <!--                  <h5 class="mb-2 text-primary font-weight-bold">Shop</h5>-->
            <!--                  <p class="" style="text-align: justify">-->
            <!--                    Go to the source; to mountains, caves, camps & all of nature's landmarks to understand the why</p>-->
            <!--                </div>-->
            <!--              </b-col>-->
            <!--            </b-row>-->
          </b-container>
        </div>
      </div>
    </div>

    <!-- Get the app -->
    <div class="bg-primary pt-5 text-center download-last-section position-relative">
      <p class="p_hero text-white mb-0">What are you waiting for?</p>
      <h1 class="header_hero text-white mt-1 mb-5">Get the app</h1>
      <div class="download-last-section-images d-flex justify-content-center gap-20 mt-2">
        <a href="https://play.google.com/store/apps/details?id=com.redgits.coflow" target="_blank">
          <img :src="require('@/assets/images/mobilaAppLanding/googlestore@2x.png')" alt="googlestore"></a>
          <a href="https://apps.apple.com/nz/app/coflow/id1640503180" target="_blank">
            <img :src="require('@/assets/images/mobilaAppLanding/appstore@2x.png')" alt="appstore"></a>
      </div>
<!--      <div class="position-relative mt-5">-->
        <img :src="require('@/assets/images/mobilaAppLanding/FooterLogoCircle.png')" alt="Logo" class="FooterLogoCircle">
        <img :src="require('@/assets/images/mobilaAppLanding/FooterMobile1.png')" alt="Mobile" class="FooterMobile">
<!--      </div>-->
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
.white-section {
  padding-top: 22vh;
  padding-left: 10vw;
  height: 90vh;
  width: 65%;
}
.blue_section {
  position: absolute !important;
  top: 0px;
  right: 0px;
  width: 35%;
  border-bottom-left-radius: 63px;
  z-index: -1;
}
.blue_section img {
  position: absolute;
}
.mobileImage {
  width: 50%;
  left: -10%;
}
.circleLogo {
  width: 100%;
  left: -34%;
}
.mobile-section {
  gap: 20px;
}
.mobile-section img {
  width: 180px !important;
}
@media screen and (max-width: 960px) {
  .white-section {
    width: 100%;
    padding-top: 10vh;
    padding-left: 2vw;
  }
  .blue_section {
    width: 100% !important;
    overflow: hidden;
  }
  .mobileImage {
    width: 35%;
    left: 50vw;
    bottom: -15px;
  }
  .circleLogo {
    width: 80%;
    left: 30%;
    bottom: -70px;
  }
  .header_hero {
    color: #c1c1c1 !important;
    font-size: 35px !important;
  }
  .p_hero {
    color: #bababa !important;
    font-size: 16px !important;
  }
}
.features {
  padding: 100px 0;
}
.Categories {
  padding-top: 100px;
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
  overflow: hidden;
  height: 75vh;
  border-top-left-radius: 63px;
  border-top-right-radius: 63px;
}
.download-last-section-images img {
  width: 120px;
}
.FooterLogoCircle {
  width: 90vh;
  position: absolute;
  bottom: -50px;
  left: calc((100vw - 90vh)/2);
}
.FooterMobile {
  position: absolute;
  width: 540px;
  bottom: 0;
  left: calc((100vw - 540px)/2);
}
@media screen and (max-width: 960px) {
  .FooterLogoCircle {
    width: 80vh;
    position: absolute;
    bottom: -50px;
    left: calc((100vw - 80vh)/2);
  }
  .FooterMobile {
    position: absolute;
    width: 600px;
    bottom: 0;
    left: calc((100vw - 600px)/2);
  }
}
</style>
<style>
@import url("../../../assets/css/custom.css");
</style>
