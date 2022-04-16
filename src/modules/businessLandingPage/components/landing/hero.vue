<template>
  <section class="hero bg-primary">
    <img :src="require('@/assets/images/businessLanding/header-right.png')" class="bg-hero-image">
    <b-container>
    <b-row class="main_content align-items-center">
      <b-col md="6" class=" mb-md-0 mb-5">
        <div class="d-flex flex-column justify-content-center align-items-start">
        <h1 class="text-white font-size-26 mb-2 ">Get things done,<br/> quick and easy</h1>
        <p class="w-50 text-secondary mb-5 font-size-14">Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Ut pretium pretium tempor.</p>
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
