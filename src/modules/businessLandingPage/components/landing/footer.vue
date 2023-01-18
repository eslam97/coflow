<template>
  <footer class="bg-primary text-secondary landingFooter">
    <b-container>
      <b-row class="d-flex align-items-center">
      <b-col sm="2" class="d-flex justify-content-center mb-2 mb-md-0">
        <img :src="require('@/assets/images/whiteLogo.png')" alt="coFlow" class='brandImage-footer'>
      </b-col>
      <b-col sm="8" class="d-flex justify-content-center mb-2 mb-md-0">
        <p class="font-size-10 text-center mb-0">© {{ new Date().getFullYear() }} <span class="text-white">COFLOW</span>. All rights reserved.</p>
      </b-col>
      <b-col sm="2" class="d-flex justify-content-center mb-2 mb-md-0">
        <div class="d-flex justify-content-start gap-20">
          <a href="https://www.facebook.com/www.coflow.co" target="_blank" class="text-white"><i class="lab la-facebook-f"></i></a>
          <a href="https://www.instagram.com/coflow.co" target="_blank"  class="text-white"> <i class="lab la-instagram"></i></a>
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
