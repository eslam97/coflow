<template>
  <div>
    <div>
      <h4 class="mb-1 pl-2 font-weight-bold">Purchase Information</h4>
      <div class="purchase-invoice">
        <div class="d-flex justify-content-between mb-1" v-if="details.type == 'ticket'">
          <p class="m-0">Ticket</p>
          <p class="text-black font-weight-bold m-0">{{ details.name }}</p>
        </div>
        <div class="d-flex justify-content-between mb-1">
          <p class="m-0">Add-Ons</p>
          <p class="text-black font-weight-bold m-0">Name 1 + Name 2</p>
        </div>
        <div class="d-flex justify-content-between mb-1">
          <p class="m-0">Access</p>
          <p class="text-black font-weight-bold m-0">Flow 1 + Flow 2</p>
        </div>
        <div class="d-flex justify-content-between mb-1">
          <p class="m-0">Expire Date</p>
          <p class="text-black font-weight-bold m-0">{{ details.expire_date }}</p>
        </div>
      </div>
    </div>

    <div class="mt-3">
      <div class="d-flex justify-content-between">
        <h4 class="mb-1 pl-2 font-weight-bold">Purchase Invoice</h4>
        <span>Date: {{ details.created_at.substring(0,10) }}</span>
      </div>
      <div class="purchase-invoice">
        <div class="item">
          <span class="d-flex gap-1 align-items-center">
            <span class="number">{{ details.quantity }}x </span>
            <span>{{ details.name }}</span>
          </span>
          <span class="number">+{{details.price}} EGP</span>
        </div>

        <div class="item">
          <span class="d-flex gap-1 align-items-center">
            <span class="number" v-if="details.addons_price">2x</span>
            <span>Add_On: Test One</span>
          </span>
            <span class="number">+{{ details.addons_price }} EGP</span>
        </div>

        <div class="item">
          <span class="coupon-text">Coupon Discount</span>
          <span class="number">-{{ details.discount_offer }} EGP</span>
        </div>

        <div class="item total">
          <span>Total Amount</span>
          <span class="number">{{ details.final_price }} EGP</span>
        </div>
        <div class="item" v-if="details.created_by">
          <!-- <span>Total Amount  <span> {{ details.payment_method.name }} </span></span> -->
          <span>Total Amount</span>
          <span></span>
          <span>Admin: {{ details.created_by.name }}</span>
          <span>{{ details.created_at.substring(0,10) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    details: {
      type: Object
    }
  },
  data () {
    return {}
  },
  methods: {},
  watch: {},
  created () {
  }
}
</script>

<style lang="scss" scoped>
</style>
