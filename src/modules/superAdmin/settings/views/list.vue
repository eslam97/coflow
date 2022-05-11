<template>
  <b-container fluid>
    <div class="mb-5">
      <b-row>
        <b-col lg="12" class="mb-3">
          <h3>Settings</h3>
        </b-col>
      </b-row>
      <ul class="nav nav-tabs flex-nowrap">
        <li class="nav-item">
          <router-link class="nav-link" :to="{name:'profileSetting'}" exact>Profile</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name:'activityLines'}" exact>Activity Lines</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name:'activityTypes'}" exact>Activity Types</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name:'durationLists'}" exact>Duration List</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name:'nationalities'}" exact>Nationalities</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name:'amenities'}" exact>Amenities</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name:'accommodationTypes'}" exact>Accommodation Types</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name:'links'}" exact>Links</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name:'languages'}" exact>Languages</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name:'countries'}" exact>Countries</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name:'cities'}" exact>Cities</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name:'areas'}" exact>Areas</router-link>
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
