<template>
  <div>
    <div class="iq-card p-2">
      <ul class="m-0 p-0 nav nav-tabs justify-content-start">
        <li class="nav-item">
            <router-link class="nav-link" :to="{name:'settingsinputs'}" exact>Leads</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name:'settingssources'}">Ad Source</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name:'settingscallStatus'}">Call Status</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name:'settingsinquiries'}">Inquiries</router-link>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import { core } from '../../../config/pluginInit'
export default {
  name: 'settingsinputs',
  mounted () {
    core.index()
  }
}
</script>
<style>
.nav-link.router-link-active{
  border-bottom: 2px solid var(--iq-primary) !important;
  color: var(--iq-primary) !important;
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
