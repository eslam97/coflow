<template>
  <div class="about-info m-0 p-0">
    <b-row>
      <b-col cols="4" class="text-primary">Title: </b-col>
      <b-col cols="8" class="text-black">{{packageInfo.title}}</b-col>
    </b-row>
    <b-row class="mb-2">
      <b-col cols="4" class="text-primary">Count: </b-col>
      <b-col cols="8" class="text-black">{{packageInfo.count}}</b-col>
    </b-row>
    <b-row class="mb-2">
      <b-col cols="4" class="text-primary">Invitation:</b-col>
      <b-col cols="8" class="text-black">{{packageInfo.invitation}}</b-col>
    </b-row>
    <b-row class="mb-2">
      <b-col cols="4" class="text-primary">Freezing:</b-col>
      <b-col cols="8" class="text-black">{{packageInfo.freezing}}</b-col>
    </b-row>
    <b-row class="mb-2">
      <b-col cols="4" class="text-primary">Auto Start After:</b-col>
      <b-col cols="8" class="text-black">{{packageInfo.auto_start_after}}</b-col>
    </b-row>
    <b-row class="mb-2">
      <b-col cols="4" class="text-primary">Services: </b-col>
      <b-col cols="8" class="text-black">
        <ul style="margin: 0 !important; padding: 0 !important;">
        <li v-for="(i, key) in packageInfo.service" :key="key" class="d-flex justify-content-between align-items-center mb-2">
          {{i.title }}
          <b-badge variant="primary" pill>{{i.pivot.count}}</b-badge>
        </li>
      </ul>
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  props: ['packageInfo']
}
</script>
