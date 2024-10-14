<template>
  <div class="text-center">
    <h5 class="mb-2">Monthly Package</h5>

    <p>Purchased on : 2023-10-21</p>

    <b-button class="button-modal m-auto" variant="danger" @click="cancelPurchase" :disabled="requestLoading">
      <i v-if="!requestLoading" class="las la-times"></i>
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
    cancelPurchase () {
      this.$emit('cancelPurchase')
    }
  },
  watch: {},
  created () {
  }
}
</script>

<style lang="scss" scoped>
</style>
