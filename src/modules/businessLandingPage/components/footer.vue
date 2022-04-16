<template>
  <footer class="bg-primary text-secondary landingFooter">
    <b-container>
      <b-row>
      <b-col sm="4">
        <img :src="require('@/assets/images/whiteLogo.png')" alt="coFlow" class='brandImage'>
      </b-col>
      <b-col sm="4">
        <p class="font-size-12 text-center">© 2021 <span class="text-white">COFLOW</span>. All rights reserved.</p>
      </b-col>
      <b-col sm="4">
        <div class="d-flex justify-content-between">
          <i class="lab la-facebook-f"></i>
          <i class="lab la-twitter"></i>
          <i class="lab la-instagram"></i>
          <i class="lab la-google-plus"></i>
        </div>
      </b-col>
      </b-row>
    </b-container>
  </footer>
</template>
<style>
.landingFooter {
  padding: 20px 0;
  border-top: 1px solid rgba(160, 158, 158, 0.2);
}
</style>
