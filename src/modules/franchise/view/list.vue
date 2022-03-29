<template>
  <b-container fluid>
    <b-row>
      <b-col lg="12">
        <iq-card v-if="hasPer('franchise.tab')">
          <template v-slot:headerTitle>
            <h4 class="card-title">Franchise</h4>
          </template>
          <template v-slot:body>
            <div v-if="loadTable" class="text-center">
              <spinner-loading text = 'Loading' />
            </div>
            <b-table v-else striped responsive  class="mb-0 table-borderless" :fields="field" :items="allFranchisers">
            </b-table>
          </template>
        </iq-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { core } from '@/config/pluginInit'
import axios from 'axios'
export default {

  name: 'franchies',
  mounted () {
    core.index()
  },
  created () {
    this.loadTable = true
    axios.get('https://max-gym.herokuapp.com/api/investor').then(res => {
      // console.log(res.data)
      this.allFranchisers = res.data
      this.loadTable = false
    })
  },
  data () {
    return {
      loadTable: false,
      allFranchisers: [],
      field: [
        { label: 'User Name', key: 'user_name', class: 'text-left', sortable: true },
        { label: 'Job', key: 'job', class: 'text-left', sortable: true },
        { label: 'Place Address', key: 'place_address', class: 'text-left', sortable: true },
        { label: 'Email', key: 'email', class: 'text-left', sortable: true },
        { label: 'Mobile Number', key: 'mobile_number', class: 'text-left', sortable: true },
        { label: 'Venue', key: 'venue', class: 'text-left', sortable: true },
        { label: 'Place To Invest', key: 'place_to_invest', class: 'text-left', sortable: true },
        { label: 'Activity Type', key: 'activity_type', class: 'text-left', sortable: true },
        { label: 'Building Type', key: 'building_type', class: 'text-left', sortable: true },
        { label: 'Franchised Before', key: 'franchised_before', class: 'text-left', sortable: true },
        { label: 'Covernate', key: 'covernate', class: 'text-left', sortable: true },
        { label: 'Details', key: 'details', class: 'text-left' }]
    }
  }
}
</script>
<style>
.vue-daterange-picker{
  display: block !important;
}
.form-control.reportrange-text {
  border: 1px solid var(--iq-primary) !important;
  border-radius: 10px !important;
  color: var(--iq-primary) !important;
  margin: 10px 0 !important;
  height: auto !important;
  line-height: 30px !important;
  background: #fff !important;
}
</style>
