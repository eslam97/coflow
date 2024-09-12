<template>
  <b-container fluid>
    <div class="d-flex justify-content-between align-items-center gap-2">
      <h3>Facility</h3>

      <div class="temporarily-close">
        Temporarily Close
        <div class="custom-control custom-switch custom-switch-text custom-control-inline custom-switch-color mr-0" >
          <div class="custom-switch-inner">
            <input type="checkbox" class="custom-control-input bg-info" id="temporarilyClose" v-model="temporarilyClose">
            <label class="custom-control-label" for="temporarilyClose"></label>
          </div>
        </div>
      </div>
    </div>

    <div class="facility-tabs my-3">
      <router-link :to="{ name: 'facility.profile' }" :class="['text-center py-2', { 'active-facility-tab' : $route.name =='facility.profile'}]">
        Profile
      </router-link>
      <router-link :to="{ name: 'facility.faqs' }" :class="['text-center py-2', { 'active-facility-tab' : $route.name =='facility.faqs'}]">
        FAQs
      </router-link>
      <router-link :to="{ name: 'facility.payments' }" :class="['text-center py-2', { 'active-facility-tab' : $route.name =='facility.payments'}]">
        Payments
      </router-link>
    </div>

    <router-view/>
  </b-container>
</template>

<script>
import { core } from '@/config/pluginInit'

export default {
  data () {
    return {
      temporarilyClose: false
    }
  },
  components: {
  },
  methods: {
  },
  created () {
  },
  mounted () {
    core.index()
  }
}
</script>

<style lang="scss" scoped>
.temporarily-close {
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: #fff;
  padding: 0.5rem 1rem;
}
.facility-tabs {
  display: flex;
  a {
    padding: 0.5rem 5rem;
    &:hover {
      color: var(--iq-primary);
    }
    &.active-facility-tab {
      border-bottom: 2px solid #FE9E12;
      color: var(--iq-primary);
      font-weight: 700;
    }
  }
}
</style>
