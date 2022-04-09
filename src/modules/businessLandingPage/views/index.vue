<template>
  <div class="landing">
    <transition name="router-anim" :enter-active-class="`animated ${animated.enter}`" mode="out-in" :leave-active-class="`animated ${animated.exit}`">
        <loginModal v-if="openPopupLogin" @close="openPopupLogin = false"/>
    </transition>
    <main-nav-bar @openPopup= "openPopupLogin = true"/>
    <hero />
  </div>
</template>
<script>
import loginModal from '../components/login'
import mainNavBar from '../components/navbar'
import hero from '../components/hero'
export default {
  data () {
    return {
      animated: { enter: 'zoomIn', exit: 'zoomOut' },
      openPopupLogin: false
    }
  },
  components: {
    loginModal,
    mainNavBar,
    hero
  },
  methods: {

  }
}
</script>
<style>
@import url("../../../assets/css/custom.css");
</style>
