<template>
  <div class="landing">
    <transition name="router-anim" :enter-active-class="`animated ${animated.enter}`" mode="out-in" :leave-active-class="`animated ${animated.exit}`">
        <loginModal v-if="openPopupLogin" @close="openPopupLogin = false"/>
    </transition>
    <main-modal id="businessRequestModal" size="lg">
      <template v-slot:header>
        Business Request
      </template>
      <template v-slot:body>
        <business-request-modal />
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
export default {
  data () {
    return {
      animated: { enter: 'zoomIn', exit: 'zoomOut' },
      openPopupLogin: false
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
    }
  }
}
</script>
<style>
@import url("../../../assets/css/custom.css");
</style>
