<template>
  <b-container fluid>
    <div v-if="!loadingPage">
      <!-- {{ userData }} -->
      <ManagementDetailsHeader :info="userData" />
      <router-view/>
    </div>
    <div v-else class="d-flex justify-content-center align-items-center w-100">
      <spinner-loading text="Loading"/>
    </div>
  </b-container>
</template>
<script>
// import { core } from '@/config/pluginInit'
import ManagementDetailsHeader from '../components/ManagementDetailsHeader'
import managementServices from '../services/management.services'
export default {
  data () {
    return {
      userData: {},
      loadingPage: false
    }
  },
  components: { ManagementDetailsHeader },
  methods: {
    getCustomerDetails () {
      this.loadingPage = true
      managementServices.getCustomerDetails(this.$route.params.id).then(res => {
        this.userData = res.data.data
      }).finally(() => {
        this.loadingPage = false
      })
    }
  },
  created () {
    this.getCustomerDetails()
  },
  mounted () {
    // core.index()
  }
}
</script>
