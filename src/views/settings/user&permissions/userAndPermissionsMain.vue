<template>
  <div class="container-fluid">
    <div class="iq-card p-2">
      <ul class="m-0 p-0 nav nav-tabs justify-content-start">
        <li class="nav-item">
          <router-link :to="{name:'userandpermissions'}"  v-if="hasPer('user.list')" class="nav-link"  exact>Users</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name:'roles'}" v-if="hasPer('role.list')">Roles</router-link>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import { core } from '../../../config/pluginInit'
export default {
  name: 'userandpermissions',
  mounted () {
    core.index()
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
