<template>
  <div class="text-center">
    <h5 class="mb-2">Payment Collection</h5>

    <div class="d-flex justify-content-center gap-1 mb-4">
      <mainstatus status="DUE" />
      <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.5 12.5H19.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12.5 5.5L19.5 12.5L12.5 19.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <mainstatus status="PAID" />
    </div>

    <b-button class="text-white d-flex gap-1 m-auto" variant="warning" @click="editPurchase" :disabled="requestLoading">
      <span>Confirm</span>
      <spinner-loading v-if="requestLoading"></spinner-loading>
    </b-button>
  </div>
</template>

<script>
import mainstatus from '@/components/table/status'

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
  components: { mainstatus },
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
