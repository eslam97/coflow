<template>
<div class="profile-info">
  <navProgress title="Information Required"/>
  <b-container>
  <section class="d-flex align-items-center customHight">
    <div>
      <h2 class="text-white mb-4">Profile Builder</h2>
      <p class="w-50 text-white mb-4">To activate your account, we need to build your facility’s profile using information
        such as
        address,
        operating
        hours, photos, etc. It may help to gather as much of this info as you can before getting started, to get through the steps all in one go. </p>
      <b-button class="container_button_blue mt-4 px-5 py-3" @click="$router.push({name: 'profileSteps'})">
        <span>Get Started</span>
      </b-button>
    </div>
  </section>
  </b-container>
</div>
</template>
<script>
import navProgress from '@/modules/businessLandingPage/components/reqistration/navWithProgress'
export default {
  name: 'profileInfo',
  components: {
    navProgress
  },
  beforeDestroy () {
    document.body.style.backgroundColor = ''
  },
  mounted () {
    document.body.style.backgroundColor = '#181935FF'
  }
}
</script>
