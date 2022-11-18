<template>
  <section class="hero bg-primary">
    <img :src="require('@/assets/images/businessLanding/header-right.png')" class="bg-hero-image">
    <b-container>
    <b-row class="main_content align-items-center">
      <b-col md="6" class=" mb-md-0 mb-5">
        <div class="d-flex flex-column justify-content-center align-items-start">
        <h1 class="text-white font-size-26 mb-2 ">Studio & Center<br>Management Simplified</h1>
        <p class="w-75 text-secondary mb-5 font-size-14">Whether you’re a Kite Surfing or Scuba Diving Center,
          Fitness or Yoga Studio — we’ve developed tailored software just for you & your customers.</p>
        <b-button class="gradient-orange-button" @click="$emit('getStarted')">Get Started</b-button>
        </div>
      </b-col>
      <b-col md="6">
        <img :src="require('@/assets/images/businessLanding/PicDashborad.png')" class="w-100">
      </b-col>
    </b-row>
    </b-container>
  </section>
</template>
