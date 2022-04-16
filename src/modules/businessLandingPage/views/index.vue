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
import loginModal from '../components/login'
import businessRequestModal from '../components/businessRequestModal'
import mainNavBar from '../components/navbar'
import hero from '../components/hero'
import userExperience from '../components/userExperience'
import easyToUse from '../components/easyToUse'
import tailored from '../components/tailored'
import testimonials from '../components/testimonials'
import getInTouch from '../components/getInTouch'
import landingFooter from '../components/footer'
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
