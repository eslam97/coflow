<template>
  <b-container fluid>
    <div class="iq-card p-2">
      <ul class="m-0 p-0 nav nav-tabs justify-content-start">
        <li class="nav-item">
          <router-link  class="nav-link"  :to="{name:'allMemberReports'}">Members</router-link>
        </li>
        <li class="nav-item">
          <router-link  class="nav-link" :to="{name:'leadReports'}">Leads</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name:'salesReportDetails'}">Sales</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name:'packageReports'}">Packages</router-link>
        </li>
      </ul>
    </div>
    <transition name="router-anim" :enter-active-class="`animated ${animated.enter}`" mode="out-in"
                :leave-active-class="`animated ${animated.exit}`">
      <router-view/>
    </transition>
  </b-container>
</template>
<script>
import { core } from '../../../config/pluginInit'
export default {
  name: 'reports',
  mounted () {
    core.index()
  },
  data () {
    return {
      animated: { enter: 'fadeInUp', exit: 'fadeOut' }
    }
  }
}
</script>
<style>
.nav-link.router-link-exact-active.router-link-active{
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
