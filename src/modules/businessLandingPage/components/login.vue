<template>
  <div class="position-fixed top-0 left-0 bg-primary w-100 h-100 popupLogin p-5">
    <img :src="require('@/assets/images/businessLanding/header-right.png')" class="bg-hero-image top-20">
    <b-container fluid>
      <nav class="d-flex justify-content-between align-items-center">
        <img :src="require('@/assets/images/whiteLogo.png')" alt="coFlow" class='brandImage'>
        <span class="cursor-pointer"
              @click="$emit('close')"><i class="las la-times text-white font-weight-bold font-size-32"></i></span>
      </nav>
      <b-row>
      <b-col lg="4" md="8" class="m-auto">
        <h2 class="text-center my-5 text_color">Business Dashboard</h2>
          <b-form>
            <b-card class="px-4 py-5 iq-border-radius-20">
            <b-input-group class="d-flex align-items-center position-relative mb-4">
              <i class="las la-envelope text-secondary font-size-18 position-absolute" style="z-index: 50; left: 15px"
              ></i>
              <b-form-input placeholder="Email" class="input_with_icon"></b-form-input>
            </b-input-group>
            <b-input-group class="d-flex align-items-center position-relative mb-4">
              <i class="las la-lock text-secondary font-size-18 position-absolute" style="z-index: 50; left: 15px"
              ></i>
              <b-form-input placeholder="Password" class="input_with_icon"></b-form-input>
            </b-input-group>
            <div class="d-flex justify-content-between align-items-center mt-2 px-1">
              <b-form-radio>
                <span class="text-secondary font-size-12">Remember me</span>
              </b-form-radio>
              <span class="text-danger font-size-12">Forgot Password?</span>
            </div>
        </b-card>
            <div class="d-flex justify-content-center mt-5">
              <b-button type="submit" class="gradient-orange-button m-auto mt-4 w-50 py-3">Login</b-button>
            </div>
          </b-form>

      </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
export default {
  name: 'Login'
}
</script>
<style>
@import url("../../../assets/css/custom.css");
.popupLogin {
  z-index: 100000;
}
</style>
