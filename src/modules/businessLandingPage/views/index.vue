<template>
  <div class="landing">
    <transition name="router-anim" :enter-active-class="`animated ${animated.enter}`" mode="out-in" :leave-active-class="`animated ${animated.exit}`">
        <loginModal v-if="openPopupLogin" @close="openPopupLogin = false" :loginLoading="loginLoading" @login="login"/>
    </transition>
    <transition name="router-anim" :enter-active-class="`animated ${animated.enter}`" mode="out-in" :leave-active-class="`animated ${animated.exit}`">
      <main-modal id="successModalMessage" size="md">
        <template v-slot:header>
          <h4 class="font-weight-bold" >Business Request</h4>
        </template>
        <template v-slot:body>
          <h2 class="gradient-blue-text text-center">Received</h2>
          <p class="text-center text-primary p-4">{{successBusinessRequest}}</p>
          <div class="d-flex justify-content-center">
            <b-button class="container_button_blue m-auto" @click="$bvModal.hide('successModalMessage')">
              <span>Done</span>
            </b-button>
          </div>
        </template>
      </main-modal>
    </transition>
    <main-modal id="businessRequestModal" size="lg">
      <template v-slot:header>
        <h4 class="font-weight-bold">Business Request</h4>
      </template>
      <template v-slot:body>
        <business-request-modal @makeBusinessRequest="makeBusinessRequest" :requestLoading="requestLoading"/>
      </template>
    </main-modal>
    <main-nav-bar @openPopup= "openPopupLogin = true" @businessRequest="openPopUpBusinessRequest"/>
    <hero @getStarted="openPopUpBusinessRequest"/>
    <user-experience/>
    <easy-to-use/>
    <tailored />
    <testimonials />
    <get-in-touch />
    <landing-footer />
  </div>
</template>
<script>
import loginModal from '../components/landing/login'
import businessRequestModal from '../components/landing/businessRequestModal'
import mainNavBar from '../components/landing/navbar'
import hero from '../components/landing/hero'
import userExperience from '../components/landing/userExperience'
import easyToUse from '../components/landing/easyToUse'
import tailored from '../components/landing/tailored'
import testimonials from '../components/landing/testimonials'
import getInTouch from '../components/landing/getInTouch'
import landingFooter from '../components/landing/footer'
import { core } from '@/config/pluginInit'
// import service
import registrationService from '../services/auth.services'
import adminsServices from '@/modules/superAdmin/admin/services/admins.services'
export default {
  data () {
    return {
      animated: { enter: 'zoomIn', exit: 'zoomOut' },
      openPopupLogin: false,
      requestLoading: false,
      loginLoading: false,
      successBusinessRequest: ''
    }
  },
  components: {
    loginModal,
    businessRequestModal,
    mainNavBar,
    hero,
    userExperience,
    easyToUse,
    tailored,
    testimonials,
    getInTouch,
    landingFooter
  },
  methods: {
    openPopUpBusinessRequest () {
      this.$bvModal.show('businessRequestModal')
    },
    makeBusinessRequest (payload) {
      this.requestLoading = true
      registrationService.makeBusinessRequest(payload).then(res => {
        this.successBusinessRequest = 'Thank you for your interest in coflow, our team will contact you as soon as possible. '
        this.$bvModal.hide('businessRequestModal')
        this.$bvModal.show('successModalMessage')
      }).finally(() => {
        this.requestLoading = false
      })
    },
    login (payload) {
      this.loginLoading = true
      registrationService.login(payload).then(res => {
        console.log(res)
        core.showSnackbar('success', 'Welcome ' + res.data.data.name)
        localStorage.setItem('userInfo', JSON.stringify(res.data.data))
        if (res.data.data.status === 'accepted' || res.data.data.status === 'active lead') {
          this.$router.push({ name: 'profileInfo' })
          switch (res.data.data.profile_step) {
            case 'admin':
              this.$store.commit('formSteps/setActiveStepForm', 1)
              localStorage.setItem('formStep', 1)
              this.$router.push({ name: 'profileInfo' })
              break
            case 'facility':
              this.$store.commit('formSteps/setActiveStepForm', 2)
              this.$router.push({ name: 'profileSteps' })
              localStorage.setItem('formStep', 2)
              break
            case 'location':
              this.$store.commit('formSteps/setActiveStepForm', 3)
              this.$router.push({ name: 'profileSteps' })
              localStorage.setItem('formStep', 3)
              break
            case 'operation':
              this.$store.commit('formSteps/setActiveStepForm', 4)
              this.$router.push({ name: 'profileSteps' })
              localStorage.setItem('formStep', 4)
              break
            case 'completed':
              this.$store.commit('formSteps/setActiveStepForm', 'completed')
              this.$router.push({ name: 'profileComplete' })
              localStorage.setItem('formStep', 'completed')
              break
          }
        } else if (res.data.data.status === 'pending activation') {
          this.$store.commit('formSteps/setActiveStepForm', 'completed')
          this.$router.push({ name: 'profileComplete' })
          localStorage.setItem('formStep', 'completed')
        } else {
          if (res.data.data.type === 'admin') {
            adminsServices.getRoleDetails(res.data.data.role_id).then(response => {
              localStorage.setItem('permissions', JSON.stringify(response.data.data.map(item => item.name)))
              this.$router.push({ name: 'leads' })
            })
          } else this.$router.push({ name: 'dashboard' })
        }
        localStorage.setItem('userToken', res.data.data.token)
        this.openPopupLogin = false
      }).finally(() => {
        this.loginLoading = false
      })
    }
  }
}
</script>
<style>
@import url("../../../assets/css/custom.css");
</style>
