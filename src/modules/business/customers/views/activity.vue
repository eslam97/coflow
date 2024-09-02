<template>
  <b-container fluid>
    <div lg="12" class="mb-2 d-flex justify-content-between align-items-center">
      <h3>Activity</h3>

      <div class="d-flex justify-content-between gap-20">
        <b-button @click="openPopup" variant="light" class="btn bg-white add_button">
          Export <i class="las la-print ml-3"></i>
        </b-button>
      </div>
    </div>

    <div class="mb-4">
      <div class="my-2 d-flex justify-content-between align-items-center gap-2">
        <router-link :to="{ name: 'customers.purchasess' }" :class="['w-100 text-center promotion_button py-2', { 'active-tab' : $route.name =='customers.purchasess'}]">
          Purchasess
        </router-link>
        <router-link :to="{ name: 'customers.gifts' }" :class="['w-100 text-center promotion_button py-2', { 'active-tab' : $route.name =='customers.gifts'}]">
          Gifts
        </router-link>
        <router-link :to="{ name: 'customers.collections' }" :class="['w-100 text-center promotion_button py-2', { 'active-tab' : $route.name =='customers.collections'}]">
          Collections
        </router-link>
      </div>
    </div>

    <router-view/>
  </b-container>
</template>

<script>
import { core } from '@/config/pluginInit'

export default {
  data () {
    return {}
  },
  components: {},
  methods: {},
  created () {},
  mounted () {
    core.index()
  }
}
</script>
