<template>
  <div class="tailored py-5 d-flex align-items-center">
    <b-container>
      <div class="py-5 mt-5">
        <div class="header">
          <h3 class="text-center text-white mb-2 font-size-32">World Wide Community</h3>
          <b-row class="justify-content-center"><b-col md="5" cols="11">
          <p class="text-center text-secondary font-size-14 mb-4">
            Together we make the greatest offer of life changing experiences,
            bringing people around the world to, failing in love with our flow.</p>
          </b-col></b-row>
        </div>
      </div>
<!--      <section class="d-flex justify-content-between align-items-center feature-user flex-column flex-md-row flex-wrap">
        <div class="w-20-p mb-2">
          <div class="text-center">
            <img :src="require('@/assets/images/businessLanding/tailored/Ticket.png')" />
            <h4 class="text-white my-3">Tickets</h4>
          </div>
          <p class="text-secondary">
            Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur aliquet quam id dui posuere
            blandit. Nulla quis lorem ut liber.
          </p>
        </div>
        <div class="w-20-p mb-2">
          <div class="text-center">
            <img :src="require('@/assets/images/businessLanding/tailored/Activities.png')" />
            <h4 class="text-white my-3">Activities</h4>
          </div>
          <p class="text-secondary">
            Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur aliquet quam id dui posuere
            blandit. Nulla quis lorem ut liber.
          </p>
        </div>
        <div class="w-20-p mb-2">
          <div class="text-center">
            <img :src="require('@/assets/images/businessLanding/tailored/Courses.png')" />
            <h4 class="text-white my-3">Courses</h4>
          </div>
          <p class="text-secondary">
            Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur aliquet quam id dui posuere
            blandit. Nulla quis lorem ut liber.
          </p>
        </div>
        <div class="w-20-p mb-2">
          <div class="text-center">
            <img :src="require('@/assets/images/businessLanding/tailored/Flows.png')"  class="w-17"/>
            <h4 class="text-white my-3">Flows</h4>
          </div>
          <p class="text-secondary">
            Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur aliquet quam id dui posuere
            blandit. Nulla quis lorem ut liber.
          </p>
        </div>
        <div class="w-20-p mb-2">
          <div class="text-center">
            <img :src="require('@/assets/images/businessLanding/tailored/Products.png')" />
            <h4 class="text-white my-3">Products</h4>
          </div>
          <p class="text-secondary">
            Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur aliquet quam id dui posuere
            blandit. Nulla quis lorem ut liber.
          </p>
        </div>
      </section>-->
      <b-row class="feature-user justify-content-between pb-5">
        <b-col md="2" cols="6" class="mb-5">
          <div class="text-center">
            <img :src="require('@/assets/images/businessLanding/tailored/Ticket.png')" />
            <h4 class="text-white my-3">Tickets</h4>
            <h3 class="text-warning">1011</h3>
          </div>
        </b-col>
        <b-col md="2" cols="6" class="mb-5">
          <div class="text-center">
            <img :src="require('@/assets/images/businessLanding/tailored/Activities.png')" />
            <h4 class="text-white my-3">Activities</h4>
            <h3 class="text-success">1011</h3>
          </div>
        </b-col>
        <b-col md="2" cols="6" class="mb-5">
          <div class="text-center">
            <img :src="require('@/assets/images/businessLanding/tailored/Courses.png')" />
            <h4 class="text-white my-3">Courses</h4>
            <h3 class="text-info">1011</h3>
          </div>
        </b-col>
        <b-col md="2" cols="6" class="mb-5">
          <div class="text-center">
            <img :src="require('@/assets/images/businessLanding/tailored/Flows.png')" class="w-17"/>
            <h4 class="text-white my-3">Flows</h4>
            <h3 class="text-danger">1011</h3>
          </div>
        </b-col>
        <b-col md="2" cols="12" class="mb-5">
          <div class="text-center">
            <img :src="require('@/assets/images/businessLanding/tailored/Products.png')" />
            <h4 class="text-white my-3">Products</h4>
            <h3 class="text-secondary">1011</h3>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<style>
.tailored {
  background-image: url('../../../../assets/images/businessLanding/tailored/Background.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 900px;
}
.feature-user img{
  width: 35px;
}
.feature-user p {
  font-size: 10px;
}
.w-20-p {
  width: 200px;
}
.w-17 {
  width: 17px !important;
}
</style>
