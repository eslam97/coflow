<template>
  <footer class="bg-primary text-secondary landingFooter">
    <b-container>
      <b-row class="align-items-center">
      <b-col sm="2">
        <img :src="require('@/assets/images/whiteLogo.png')" alt="coFlow" class='brandImage'>
      </b-col>
      <b-col sm="8">
        <p class="font-size-12 text-center mb-0">© 2021 <span class="text-white">COFLOW</span>. All rights reserved.</p>
      </b-col>
      <b-col sm="2">
        <div class="d-flex justify-content-start gap-20">
          <a href="https://www.google.com" class="text-white"><i class="lab la-facebook-f"></i></a>
<!--          <a href="https://www.google.com" class="text-white"> <i class="lab la-twitter"></i></a>-->
          <a href="https://www.google.com" class="text-white"> <i class="lab la-instagram"></i></a>
          <a href="https://www.google.com" class="text-white"><i class="lab la-google-plus"></i></a>
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
