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
<!--    <eeasy-to-use/>-->
  </div>
</template>
<script>
import loginModal from '../components/login'
import mainNavBar from '../components/navbar'
import hero from '../components/hero'
import userExperience from '../components/userExperience'
/*
import eeasyToUse from '../components/easyToUse'
*/
import businessRequestModal from '../components/businessRequestModal'
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
    userExperience
    /* eeasyToUse */
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
