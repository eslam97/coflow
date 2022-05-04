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
        <ValidationObserver v-slot="{ handleSubmit }">
          <b-form @submit.prevent="handleSubmit(login)">
            <b-card class="px-4 py-5 iq-border-radius-20">
              <b-form-group class="mb-4">
                <ValidationProvider name="Email" ref="email" rules="required|email" v-slot="{ errors }">
                  <div class="d-flex align-items-center position-relative">
                  <i :class="['las la-envelope text-secondary font-size-18 position-absolute',errors.length > 0 ?
                  ' text-danger' : '']" style="z-index: 50;left:15px"></i>
                  <b-form-input v-model="user.email" type="text" placeholder="Email" :class="[(errors.length > 0 ?
                  ' is-invalid' : ''),'input_with_icon']"></b-form-input>
                  </div>
                  <div class="invalid-feedback d-block">
                    <div>{{ errors[0] }}</div>
                  </div>
                </ValidationProvider>
              </b-form-group>
              <b-form-group class="mb-4">
                <ValidationProvider name="Password" ref="password" rules="required" v-slot="{ errors }">
                  <div class="d-flex align-items-center position-relative">
                    <i :class="['las la-lock text-secondary font-size-18 position-absolute',errors.length > 0 ?
                  ' text-danger' : '']" style="z-index: 50;left:15px"></i>
                    <b-form-input v-model="user.password" type="password" placeholder="Password"
                                  :class="[(errors.length > 0 ?
                  ' is-invalid' : ''),'input_with_icon']"></b-form-input>
                  </div>
                  <div class="invalid-feedback d-block">
                    <div>{{ errors[0] }}</div>
                  </div>
                </ValidationProvider>
              </b-form-group>
              <div class="d-flex justify-content-between align-items-center mt-2 px-1">
              <b-form-checkbox v-model="user.remember">
                <span class="text-secondary font-size-12">Remember me</span>
              </b-form-checkbox>
              <span class="text-danger font-size-12">Forgot Password?</span>
            </div>
        </b-card>
            <div class="d-flex justify-content-center mt-5">
              <spinner-loading class="gradient-orange-button m-auto mt-4 w-50 py-3" text="Checking" v-if="loginLoading"/>
              <b-button type="submit" v-else class="gradient-orange-button m-auto mt-4 w-50 py-3">Login</b-button>
            </div>
          </b-form>
        </ValidationObserver>
      </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
export default {
  name: 'Login',
  props: {
    loginLoading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      user: {
        email: '',
        password: '',
        remember: false
      }
    }
  },
  methods: {
    login () {
      this.$emit('login', this.user)
    }
  }
}
</script>
<style lang="scss">
@import url("../../../../assets/css/custom.css");
.popupLogin {
  z-index: 100000;
}
</style>
