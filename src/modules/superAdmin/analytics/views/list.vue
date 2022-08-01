<template>
  <div>
    <b-card class="mb-5 mt-2">
      <b-card-header class="mb-4">
        <p class="text-center"><span class="text-dark font-weight-bold font-size-20 mr-3">Mission</span></p>
      </b-card-header>
      <b-card-body>
        <b-row class="mb-4">
          <b-col md="12" class="mb-3">
            <b-table></b-table>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>

    <b-card class="mb-5">
      <b-card-header class="mb-4">
        <p class="text-center"><span class="text-dark font-weight-bold font-size-20 mr-3">Market Business</span></p>
      </b-card-header>
      <b-card-body>
        <b-row class="mb-4">
          <b-col md="12" class="mb-3">
            <main-table :list_url="'market-business/1'"
                        :fields="marketFields"
                        class="mb-0 table-borderless"
                        :paginationFlag="false"
            ></main-table>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>

    <b-card class="mb-5">
      <b-card-header class="mb-4">
        <p class="text-center"><span class="text-dark font-weight-bold font-size-20 mr-3">Market Customers</span></p>
        <main-select :options="['users', 'savers', 'trackers']" v-model="userType"></main-select>
      </b-card-header>
      <b-card-body>
        <b-row class="mb-4">
          <b-col md="3" class="mb-3">
            <am-chart :option="dashboardHome.market_customers[userType].age" :element="'pie'"></am-chart>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
  </div>
</template>
<script>
import { core } from '@/config/pluginInit'
import AnalyticsServices from '@/modules/superAdmin/analytics/services/analytics.services'
import AmChart from '@/components/core/charts/AmChart'
export default {
  components: { AmChart },
  data () {
    return {
      dashboardHome: '',
      marketBusiness: '',
      analytics: '',
      marketFields: [
        { label: 'Area', key: 'name', class: 'text-left' },
        { label: 'Explore Landmarks', key: 'analysis.landmark', class: 'text-left' },
        { label: 'Explore Camps', key: 'analysis.Explore_Camp', class: 'text-left' },
        { label: 'Sky Dive', key: 'analysis.Sky_Dive', class: 'text-left' },
        { label: 'Sky Shop', key: 'analysis.Sky_Shop', class: 'text-left' },
        { label: 'Sky Para', key: 'analysis.Sky_Para', class: 'text-left' },
        { label: 'Sea Dive', key: 'analysis.Sea_Dive', class: 'text-left' },
        { label: 'Sea Surf', key: 'analysis.Sea_Surf', class: 'text-left' },
        { label: 'Sea Shop', key: 'analysis.Sea_Shop', class: 'text-left' },
        { label: 'Earth Ride', key: 'analysis.Earth_Ride', class: 'text-left' },
        { label: 'Earth Grib', key: 'analysis.Earth_Grib', class: 'text-left' },
        { label: 'Earth Shop', key: 'analysis.Earth_Shop', class: 'text-left' },
        { label: 'Energy Fit', key: 'analysis.Energy_Fit', class: 'text-left' },
        { label: 'Energy Flex', key: 'analysis.Energy_Flex', class: 'text-left' },
        { label: 'Energy Shop', key: 'analysis.Energy_Shop', class: 'text-left' },
        { label: 'Total', key: 'analysis.total', class: 'text-left' }
      ],
      userType: 'users'
    }
  },
  methods: {
    getDashboardData () {
      AnalyticsServices.getDashboardHome().then(res => {
        this.dashboardHome = res.data.data
      })
    },
    getMareketData () {
      AnalyticsServices.getMarketBusiness().then(res => {
        this.marketBusiness = res.data.data
      })
    }
  },
  created () {
    this.getDashboardData()
    this.getMareketData()
  },
  mounted () {
    core.index()
  }
}
</script>
