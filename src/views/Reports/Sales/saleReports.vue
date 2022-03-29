<template>
  <div>
    <div class="iq-card p-2" v-if="getUserIdInSalesReport">
      <ul class="m-0 p-0 nav nav-tabs justify-content-start">
        <li class="nav-item">
          <router-link  class="nav-link"  :to="{name:'salesReportHistories'}">Histories</router-link>
        </li>
        <li class="nav-item">
          <router-link  class="nav-link"  :to="{name:'salesReportLeads'}">Leads</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name:'salesReportAchieved'}">Achieved</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name:'salesReportPayable'}">Payable</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name:'contract_amount'}">Contracts</router-link>
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
import { core } from '../../../config/pluginInit'
import { mapGetters } from 'vuex'

export default {
  name: 'salesReports',
  mounted () {
    core.index()
  },
  data () {
    return {
      animated: { enter: 'fadeInUp', exit: 'fadeOut' }
    }
  },
  computed: {
    ...mapGetters(['getUserIdInSalesReport'])
  },
  created () {
  }
}
</script>
<style>
.nav-link.router-link-active{
  background: var(--iq-primary) !important;
  color: #fff !important;
}
.colorSpan{
  width: 20px;
  height: 20px;
}
[dir=ltr][mode=light] .nav-tabs {
  background: #fff !important;
  border-radius: 10px !important;
}
</style>
