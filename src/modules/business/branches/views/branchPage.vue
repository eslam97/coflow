<template>
  <b-container fluid>
    <b-row>
      <b-col md="12">
        <div class="d-flex gap-20">
          <b-button
            variant="outline-secondary"
            class="back-btn"
            @click="$router.push({ name: 'branches' })"
          >
            <span><BackIcon /></span>
          </b-button>
          <h1 class="heading-title"><span>Manage:</span> Main Branch</h1>
        </div>
      </b-col>
    </b-row>

    <payment-tab />
  </b-container>
</template>

<script>
import { core } from '@/config/pluginInit'
import BackIcon from '../components/icons/backIcon.vue'
import paymentTab from '../../profile/components/paymentTab.vue'

export default {
  components: {
    BackIcon,
    paymentTab
  },
  mounted () {
    core.index()
  }
}
</script>

<style></style>
