<template>
  <div class="profile-info">
    <navProgress title="Information Received" :progressBarGradient="true"/>
    <b-container>
      <section class="d-flex align-items-center customHight">
        <div>
          <h2 class="text-warning mb-4">Completed</h2>
          <p class="w-50 text-white mb-4">
            We appreciate your effort in helping us build a clear & detailed profile for your customers.
          </p>
          <p class="w-50 text-white mb-4">Our team will review all your information as soon as possible, to get your account up and running right away. Once your account is activated, you’ll be able to add all your activities’ descriptions & more for all customers to view on the mobile app.
          </p>
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
  beforeCreate () {
    document.body.style.backgroundColor = '#181935FF'
  },
  beforeDestroy () {
    document.body.style.backgroundColor = ''
  }
}
</script>
