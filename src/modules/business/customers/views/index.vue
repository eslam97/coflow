<template>
  <b-container fluid>
    <h3>Customers</h3>

    <div class="my-2 d-flex justify-content-between align-items-center gap-2">
      <router-link :to="{ name: 'customers.management' }" :class="['w-100 text-center promotion_button py-2', { 'active-tab' : $route.name =='customers.management'}]">
        Management
      </router-link>
      <router-link :to="{ name: 'customers.activity' }" :class="['w-100 text-center promotion_button py-2', { 'active-tab' : $route.name =='customers.activity'}]">
        Activity
      </router-link>
    </div>

    <router-view/>
  </b-container>
</template>

<script>
export default {
  data () {
    return {}
  },
  components: {
  },
  methods: {
  },
  mounted () {
  },
  created () {
  }
}
</script>

<style>
</style>
