<template>
  <div class="text-center">
    <p>Payment Collection</p>
    <p>DUE -> PAID</p>

    <b-button class="text-white d-flex gap-1 m-auto" variant="warning" @click="editPurchase" :disabled="requestLoading">
      <span>Confirm</span>
      <spinner-loading v-if="requestLoading"></spinner-loading>
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
    editPurchase () {
      this.$emit('editPurchase')
    }
  },
  watch: {},
  created () {
  }
}
</script>

<style lang="scss" scoped>
</style>
