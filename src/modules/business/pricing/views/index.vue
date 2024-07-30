<template>
  <b-container fluid>
    <h3>Pricing</h3>

    <div class="my-2 d-flex justify-content-between align-items-center gap-2">
      <router-link :to="{ name: 'pricing.tickets' }" :class="['w-100 text-center promotion_button py-2', { 'activePromotion' : $route.name =='pricing.tickets'}]">
        Tickets
      </router-link>
      <router-link :to="{ name: 'pricing.promotions' }" :class="['w-100 text-center promotion_button py-2', { 'activePromotion' : $route.name =='pricing.promotions'}]">
        Promotions
      </router-link>
      <router-link :to="{ name: 'pricing.coupons' }" :class="['w-100 text-center promotion_button py-2', { 'activePromotion' : $route.name =='pricing.coupons'}]">
        Coupons
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
