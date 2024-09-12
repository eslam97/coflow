<template>
  <b-container fluid>
    <h3>Facility</h3>

    <div class="my-2 d-flex justify-content-between align-items-center gap-2">
      <router-link :to="{ name: 'facility.profile' }" :class="['w-100 text-center promotion_button py-2', { 'active-tab' : $route.name =='facility.profile'}]">
        Profile
      </router-link>
      <router-link :to="{ name: 'facility.faqs' }" :class="['w-100 text-center promotion_button py-2', { 'active-tab' : $route.name =='facility.faqs'}]">
        FAQs
      </router-link>
      <router-link :to="{ name: 'facility.payments' }" :class="['w-100 text-center promotion_button py-2', { 'active-tab' : $route.name =='facility.payments'}]">
        Payments
      </router-link>
    </div>

    <router-view/>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  components: {
  },
  methods: {
  },
  mounted () {
  },
  created () {
  }
}
</script>

<style>
</style>
