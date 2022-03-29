<template>
  <div>
    <div v-if="services.length > 0">
      <b-list-group-item class="border-active border-1  my-1 d-flex d-flex w-100 justify-content-between" v-for="(i, key) in services" :key="key">
        <span> {{ i.service_title }} ({{i.available}})</span>
      </b-list-group-item>
    </div>
    <div v-else>
      <div class="text-center">
        <img :src="require('../../../../assets/images/error/search.png')" class="avatar-200" />
        <p class="font-size-18 pb-2">Oops!... no service found</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    services: {
      type: Array
    }
  }
}
</script>
