<template>
  <div class="text-center">
    <h5 class="mb-2">Monthly Package</h5>

    <p>Purchased on : 2023-10-21</p>

    <b-button class="button-modal m-auto" variant="danger" @click="refundPurchase" :disabled="requestLoading">
      <i v-if="!requestLoading" class="las la-undo-alt"></i>
      <spinner-loading v-else></spinner-loading>
    </b-button>
  </div>
</template>

<script>
export default {
  props: {
    requestLoading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  methods: {
    refundPurchase () {
      this.$emit('refundPurchase')
    }
  },
  watch: {},
  created () {
  }
}
</script>

<style lang="scss" scoped>
</style>
