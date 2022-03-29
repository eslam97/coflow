<template>
  <b-container fluid>
    <div class="iq-card p-2">
      <ul class="m-0 p-0 nav nav-tabs justify-content-start">
        <li  class="nav-item text-center">
          <router-link class="nav-link" :to="{name:'campaign'}" exact>Whatsapp</router-link>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </b-container>
</template>
<script>
import { core } from '@/config/pluginInit'
export default {
  name: 'campaign',
  mounted () {
    core.index()
  },
  data () {
    return {
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

  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
}
</style>
