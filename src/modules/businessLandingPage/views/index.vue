<template>
  <div class="landing">
    <transition name="router-anim" :enter-active-class="`animated ${animated.enter}`" mode="out-in" :leave-active-class="`animated ${animated.exit}`">
        <loginModal v-if="openPopupLogin" @close="openPopupLogin = false" :loginLoading="loginLoading" @login="login"/>
    </transition>
    <main-modal id="businessRequestModal" size="lg">
      <template v-slot:header>
        Business Request
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

// import service
import registrationService from '../services/auth.services'
export default {
  data () {
    return {
      animated: { enter: 'zoomIn', exit: 'zoomOut' },
      openPopupLogin: false,
      requestLoading: false,
      loginLoading: false
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
        console.log(res)
        this.$bvModal.hide('businessRequestModal')
      }).finally(() => {
        this.requestLoading = false
      })
    },
    login (payload) {
      this.loginLoading = true
      registrationService.login(payload).then(res => {
        console.log(res)
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
