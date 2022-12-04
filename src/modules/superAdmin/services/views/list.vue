<template>
  <b-container fluid>
    <div>
      <b-row>
        <b-col lg="12" class="mb-3">
          <h3>Services</h3>
        </b-col>
      </b-row>
      <ul class="nav nav-tabs flex-nowrap">
        <li v-if="hasPer('services.tickets')" class="nav-item">
          <router-link class="nav-link" :to="{name:'services'}" exact>All Tickets</router-link>
        </li>
        <li v-if="hasPer('services.flows')" class="nav-item">
          <router-link class="nav-link" :to="{name:'serviceFlows'}" exact>All Flows</router-link>
        </li>
        <li v-if="hasPer('services.activities')" class="nav-item">
          <router-link class="nav-link" :to="{name:'serviceActivities'}" exact>All Activities</router-link>
        </li>
        <li v-if="hasPer('services.courses')" class="nav-item">
          <router-link class="nav-link" :to="{name:'serviceCourses'}" exact>All Courses</router-link>
        </li>
        <li v-if="hasPer('services.products')" class="nav-item">
          <router-link class="nav-link" :to="{name:'serviceProducts'}" exact>All Products</router-link>
        </li>
        <li v-if="hasPer('services.accommodations')" class="nav-item">
          <router-link class="nav-link" :to="{name:'serviceAccommodations'}" exact>All Accommodations</router-link>
        </li>
      </ul>
    </div>
    <router-view ></router-view>
  </b-container>
</template>
<script>
import { core } from '@/config/pluginInit'
export default {
  mounted () {
    core.index()
  }
}
</script>
<style scoped>
.nav-link{
  white-space: nowrap !important;
}
</style>
