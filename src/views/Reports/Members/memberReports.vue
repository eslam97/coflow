<template>
  <div>
    <div class="iq-card p-2">
      <ul class="m-0 p-0 nav nav-tabs justify-content-start">
        <li class="nav-item">
          <router-link  class="nav-link"  :to="{name:'allMemberReports'}" exact>All Members</router-link>
        </li>
        <li class="nav-item">
          <router-link  class="nav-link"  :to="{name:'memberReportVisits'}">Visits</router-link>
        </li>
        <li class="nav-item">
          <router-link  class="nav-link"  :to="{name:'memberReportInvitations'}">Invitations</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name:'memberReportFreeze'}">Freeze</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name:'memberReportPayments'}">Payments</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name:'memberReportDiscounts'}">Discounts</router-link>
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

export default {
  name: 'reports',
  data () {
    return {
      animated: { enter: 'fadeInUp', exit: 'fadeOut' }
    }
  },
  mounted () {
    core.index()
  }
}
</script>
<style>
.nav-link.router-link-exact-active.router-link-active, .nav-link.router-link-active{
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
