<template>
  <b-container fluid>
      <div class="iq-card p-2">
        <ul class="m-0 p-0 nav nav-tabs justify-content-start packageSelected">
          <li class="nav-item" v-if="hasPer('membership.package.list')">
            <router-link  class="nav-link" :to="{name:'package'}"  exact>Package/Service</router-link>
          </li>
        </ul>
      </div>
    <keep-alive>
      <transition name="router-anim" :enter-active-class="`animated ${animated.enter}`" mode="out-in"
                  :leave-active-class="`animated ${animated.exit}`">
        <router-view/>
      </transition>
    </keep-alive>
  </b-container>
</template>
<script>
import { core } from '../../../config/pluginInit'
export default {
  name: 'package',
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
.nav-link.router-link-exact-active.router-link-active{
  background: var(--iq-primary) !important;
  color: #fff !important;
}
.colorSpan{
  width: 20px;
  height: 20px;
}
</style>
