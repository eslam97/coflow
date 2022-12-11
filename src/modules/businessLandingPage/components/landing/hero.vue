<template>
  <section class="hero bg-primary">
    <img :src="require('@/assets/images/businessLanding/header-right.png')" class="bg-hero-image">
    <b-container>
    <b-row class="main_content align-items-center">
      <b-col md="6" class=" mb-md-0 mb-5">
        <div class="d-flex flex-column justify-content-center align-items-start pl-5">
          <h1 class="header_hero text-white mb-4">Studio & Center<br/>Management <br>Simplified</h1>
          <p class="p_hero font-size-14">Whether you’re a Kite Surfing or Scuba Diving<br/> Center,
          Fitness or Yoga Studio — we’ve developed <br/> tailored software just for you & your customers.</p>
        <b-button class="gradient-orange-button" @click="$emit('getStarted')">Join Now</b-button>
        </div>
      </b-col>
      <b-col md="6">
        <div class="pr-5">
          <img :src="require('@/assets/images/businessLanding/PicDashborad.png')" class="w-100">
        </div>
      </b-col>
    </b-row>
    </b-container>
  </section>
</template>
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
  line-height: 1.3 !important;
}
.p_hero {
  color: rgba(167, 169, 204, 0.6) !important;
  margin: 30px 0 !important;
  color: #fff9;
}
.white-section {
  padding-top: 18vh;
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
    width: 50%;
    left: 53vw;
    bottom: -25px;
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
  .mobile-section img {
    box-shadow: 0px 0px 20px #777777;
  }
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
  width: 75vh;
  position: absolute;
  bottom: 0;
  left: calc((100vw - 75vh)/2);
}
.FooterMobile {
  position: absolute;
  width: 263px;
  bottom: 0;
  left: calc((100vw - 263px)/2);
}
</style>
