<template>
  <div class="container-fluid">
    <div class="iq-card p-2">
      <ul class="m-0 p-0 nav nav-tabs justify-content-start packageSelected">
        <li class="nav-item" v-if="hasPer('accountant')">
          <router-link class="nav-link" :to="{name:'accountingBalance'}">Balance</router-link>
        </li>
        <li class="nav-item" v-if="hasPer('membership.discount.list')">
          <router-link  class="nav-link" :to="{name:'accounting'}" exact>Discounts</router-link>
        </li>
        <li class="nav-item" v-if="hasPer('memberships.refund.list')">
          <router-link class="nav-link" :to="{name:'accountingRefund'}">Refund</router-link>
        </li>
        <li class="nav-item" v-if="hasPer('memberships.transfers.list')">
          <router-link class="nav-link" :to="{name:'accountingTransfer'}">Transfer</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name:'accountingDynamic'}">Safe</router-link>
        </li>

      </ul>
    </div>
    <transition name="router-anim" :enter-active-class="`animated ${animated.enter}`" mode="out-in"
                :leave-active-class="`animated ${animated.exit}`">
      <router-view/>
    </transition>
  </div>
</template>
<script>
import { core } from '../../config/pluginInit'

export default {
  name: 'accounting',
  mounted () {
    core.index()
  },
  data () {
    return {
      animated: { enter: 'fadeInUp', exit: 'fadeOut' }
    }
  },
  created () {
  },
  methods: {
  }
}
</script>
<style>
.nav-link.router-link-exact-active.router-link-active{
  background: var(--iq-primary) !important;
  color: #fff !important;
}
</style>
