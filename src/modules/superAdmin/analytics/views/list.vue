<template>
  <div>
    <div class="mb-3">
      <b-row>
        <b-col md="5" sm="12" class="text-center"><h3>Mission</h3></b-col>
        <b-col md="7" sm="12" class="text-center"><h3>Product</h3></b-col>
      </b-row>
      <b-row class="mb-3 d-flex justify-content-center">
        <b-col md="5" sm="12" class="mb-3">
          <b-table-simple responsive borderless class="text-center">
            <b-thead head-variant="light">
              <b-tr>
                <b-th>Saved business</b-th>
                <b-th>Tracked business</b-th>
                <b-th>Tracked energy</b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr>
                <b-th v-for="(value, ind) in Object.values(dashboardHome.mission)" :key="ind">{{value}}</b-th>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </b-col>
        <b-col md="7" sm="12">
          <b-table-simple responsive borderless class="text-center">
            <b-thead head-variant="light">
              <b-tr>
                <b-th :colspan="4">BUSINESS</b-th>
                <b-th :colspan="3">CUSTOMER</b-th>
              </b-tr>
              <b-tr>
                <b-th v-for="(field, ind) in businessProductFields" :key="'business'+ind">{{field.value}}</b-th>
                <b-th v-for="(field, ind2) in customersProductFields" :key="'customer'+ind2">{{field.value}}</b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr>
                <b-td v-for="(field, ind) in businessProductFields" :key="'business'+ind">{{dashboardHome.product.business[field.key]}}</b-td>
                <b-td v-for="(field, ind2) in customersProductFields" :key="'customer'+ind2">{{dashboardHome.product.customers[field.key]}}</b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </b-col>
      </b-row>
    </div>

    <div class="mb-3">
      <b-row>
        <b-col lg="12" class="mb-2 d-flex justify-content-between align-items-center">
          <h3>Business Market</h3>
        </b-col>
      </b-row>
      <b-row class="mb-4">
        <b-col md="12" class="mb-3">
          <main-table :list_url="'market-business/1'"
                      :fields="marketFields"
                      class="mb-0 table-borderless" headVariant="light"
                      :paginationFlag="false"
          ></main-table>
        </b-col>
      </b-row>
    </div>

    <div class="mb-3">
      <b-row>
        <b-col lg="12" class="mb-2 d-flex justify-content-between align-items-center">
          <h3>Analytics</h3>
          <div class="d-flex justify-content-between gap-20">
            <date-picker v-model="analyticsDate" type="date" @change="getAnalyticsData"
                         range placeholder="Select date range" value-type="format" format="YYYY-MM-DD"></date-picker>
            <export-excel
                :name="`coflow-analytics-${analyticsDate}.xls`"
                type="xls"
                worksheet="Analytics"
                :fields="analyticsFieldsForExport"
                :data="analyticsForExport">
              <b-button variant="warning" class="add_button text-white">
                Extract analytics
              </b-button>
            </export-excel>
          </div>
        </b-col>
      </b-row>
      <b-row class="mb-4">
        <b-col md="12" class="mb-3">
          <b-table-simple responsive borderless class="text-center" style="max-height: 600px">
            <b-thead head-variant="light">
              <b-tr>
                <b-th>Date</b-th>
                <b-th>Saved Business</b-th>
                <b-th>Tracked Business</b-th>
                <b-th>Tracked Energy</b-th>
                <b-th>Onboarded Business</b-th>
                <b-th>Visible Business</b-th>
                <b-th>Promoting</b-th>
                <b-th>Temp Closed Business</b-th>
                <b-th>Onboarded Customers</b-th>
                <b-th>Savers Customers</b-th>
                <b-th>Trackers Customers</b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr v-for="(key, ind) in Object.keys(analytics)" :key="ind">
                <b-th class="text-center">{{key}}</b-th>
                <b-td v-for="(value, ind2) in Object.keys(analytics[key])" :key="ind2">{{analytics[key][value]}}</b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </b-col>
      </b-row>
    </div>

    <b-card class="statistics-views mb-5">
      <template v-slot:header>
        <div class="d-flex justify-content-between align-items-center">
          <h4 class="">Market Customers - Demographics: Age, Gender, & Nationalities</h4>
          <main-select style="min-width: 120px" :options="['users', 'savers', 'trackers']"
                       v-model="userType" @change="updateUserTypeData"></main-select>
        </div>
      </template>
      <b-card-body>
        <b-row v-if="dashboardHome.market_customers[userType].nationality.length > 0" class="mb-4">
          <b-col md="4" sm="12" class="border-right">
            <div class="py-3">
              <apex-chart class="chart-flex" width="500" type="donut" :options="agePie" :series="ageSeries"></apex-chart>
            </div>
          </b-col>

          <b-col md="4" sm="12" class="border-right">
            <apex-chart class="chart-flex" width="400" type="pie" :options="genderPie" :series="genderSeries"></apex-chart>
          </b-col>

          <b-col md="4" sm="12" class="">
            <div class="p-5" style="overflow-y: scroll; height: 300px">
              <div v-for="(nation, key) in dashboardHome.market_customers[userType].nationality" :key="key"
                   class="mb-3"
              >
                <h4 class="d-flex justify-content-between mb-2">
                  <span>{{nation.nationality}}</span>
                  <span>{{nation.views}} user(s)</span>
                </h4>
                <section class="w-100" style="bottom: -9px;">
                  <b-progress :value="nation.views" :max="totalViews"
                              :variant="colors[key%4]" style="height: 0.25rem !important;"></b-progress>
                </section>
              </div>
              </div>
          </b-col>
        </b-row>
        <b-row v-else>
          <b-col md="12" class="text-center py-4">
            <h4 class="py-5">No {{ this.userType }} analysis</h4>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
  </div>
</template>
<script>
import { core } from '@/config/pluginInit'
import AnalyticsServices from '@/modules/superAdmin/analytics/services/analytics.services'
import ApexChart from 'vue-apexcharts'
import moment from 'moment'
export default {
  components: { ApexChart },
  data () {
    return {
      isLive: false,
      dashboardHome: '',
      marketBusiness: '',
      analytics: {},
      analyticsForExport: [],
      analyticsFieldsForExport: {
        Date: 'date',
        'Saved Business': 'saved_business',
        'Tracked Business': 'tracked_business',
        'Tracked Energy': 'tracked_energy',
        'Onboarded Business': 'on_boarded_business',
        'Visible Business': 'visible_business',
        Promoting: 'invisible_business',
        'Temp Closed Business': 'temp_closed_business',
        'Onboarded Customers': 'on_boarded_customers',
        'Savers Customers': 'savers_customers',
        'Trackers Customers': 'trackers_customers'
      },
      analyticsDate: [moment(new Date()).format('YYYY-MM-DD'), moment(new Date()).format('YYYY-MM-DD')],
      locale: {
        direction: 'ltr',
        format: 'DD-MM-YYYY',
        separator: ' - ',
        applyLabel: 'Apply',
        cancelLabel: 'Cancel',
        weekLabel: 'W',
        customRangeLabel: 'Custom Range',
        // daysOfWeek: moment.weekdaysMin(),
        // monthNames: moment.monthsShort(),
        firstDay: 1
      },

      marketFields: [
        { label: 'Area', key: 'name', class: 'text-center' },
        { label: 'Explore Landmarks', key: 'analysis.landmark', class: 'text-center' },
        { label: 'Explore Camps', key: 'analysis.Explore_Camp', class: 'text-center' },
        { label: 'Sky Dive', key: 'analysis.Sky_Dive', class: 'text-center' },
        { label: 'Sky Shop', key: 'analysis.Sky_Shop', class: 'text-center' },
        { label: 'Sky Para', key: 'analysis.Sky_Para', class: 'text-center' },
        { label: 'Sea Dive', key: 'analysis.Sea_Dive', class: 'text-center' },
        { label: 'Sea Surf', key: 'analysis.Sea_Surf', class: 'text-center' },
        { label: 'Sea Shop', key: 'analysis.Sea_Shop', class: 'text-center' },
        { label: 'Earth Ride', key: 'analysis.Earth_Ride', class: 'text-center' },
        { label: 'Earth Grib', key: 'analysis.Earth_Grib', class: 'text-center' },
        { label: 'Earth Shop', key: 'analysis.Earth_Shop', class: 'text-center' },
        { label: 'Energy Fit', key: 'analysis.Energy_Fit', class: 'text-center' },
        { label: 'Energy Flex', key: 'analysis.Energy_Flex', class: 'text-center' },
        { label: 'Energy Shop', key: 'analysis.Energy_Shop', class: 'text-center' },
        { label: 'Total', key: 'analysis.total', class: 'text-center' }
      ],
      businessProductFields: [
        {
          key: 'on_boarded',
          value: 'ONBOARDED'
        },
        {
          key: 'visible',
          value: 'VISIBLE'
        },
        {
          key: 'invisible',
          value: 'PROMOTING'
        },
        {
          key: 'temp_closed',
          value: 'TEMPORARILY CLOSED'
        }
      ],
      customersProductFields: [
        {
          key: 'on_boarded',
          value: 'ONBOARDED'
        },
        {
          key: 'savers',
          value: 'SAVERS'
        },
        {
          key: 'trackers',
          value: 'TRACKERS'
        }
      ],

      colors: ['info', 'success', 'warning', 'danger'],
      totalViews: 0,

      userType: 'users',
      agePie: {
        total: {
          show: true,
          showAlways: true,
          label: 'Total',
          fontSize: '22px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 600,
          color: '#10acda'
        },
        labels: [' < 10 years', '10 - 19 years', '20 - 29 years', '30 - 39 years', '40 - 50 years', '> 51 years'],
        chart: {
          id: 'age-char',
          foreColor: '#8c91b6',
          type: 'donut',
          height: 300
        },
        plotOptions: {
          pie: {
            size: 200
          }
        },
        dataLabels: {
          enabled: false,
          show: false,
          name: {
            show: true,
            fontSize: '22px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 600,
            color: undefined,
            offsetY: -10,
            formatter: function (val) {
              return val
            }
          }
        },
        colors: ['#000', '#2f9be8', '#2fdac2', '#fe9e12', '#da302b', '#74798c'],
        legend: {
          position: 'right',
          offsetY: 50,
          offsetX: -20,
          height: 170,
          fontSize: '18px'
        }
      },
      ageSeries: [],

      genderSeries: [],
      genderPie: {
        chart: {
          width: 380,
          type: 'pie'
        },
        labels: ['Male', 'Female'],
        colors: ['#2f9be8', '#FD6C9E'],
        legend: {
          position: 'right',
          offsetY: 50,
          offsetX: -20,
          height: 170,
          fontSize: '18px'
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      }
    }
  },
  methods: {
    getDashboardData () {
      AnalyticsServices.getDashboardHome().then(res => {
        this.dashboardHome = res.data.data
        const userData = this.dashboardHome.market_customers[this.userType]
        this.totalViews = userData.nationality.map((nation) => nation.views).reduce((prev, curr) => prev + curr, 0)
        Object.keys(userData.age).sort().forEach(i => {
          this.ageSeries.push(userData.age[i])
        })
        this.genderSeries.push(userData.gender.male)
        this.genderSeries.push(userData.gender.female)
      })
    },
    updateUserTypeData () {
      const userData = this.dashboardHome.market_customers[this.userType]
      this.totalViews = userData.nationality.map((nation) => nation.views).reduce((prev, curr) => prev + curr, 0)
      this.ageSeries = Object.values(userData.age)
      this.genderSeries = []
      this.genderSeries.push(userData.gender.male)
      this.genderSeries.push(userData.gender.female)
    },
    getMareketData () {
      AnalyticsServices.getMarketBusiness().then(res => {
        this.marketBusiness = res.data.data
      })
    },
    getAnalyticsData () {
      this.analyticsForExport = []
      AnalyticsServices.getAnalytics(this.analyticsDate[0], this.analyticsDate[1]).then(res => {
        this.analytics = res.data.data
        const tableKeys = Object.keys(this.analytics)
        tableKeys.forEach(key => {
          const obj = { ...this.analytics[key] }
          obj.date = key
          this.analyticsForExport.push(obj)
        })
      })
    }
  },
  created () {
    this.getDashboardData()
    this.getMareketData()
    this.getAnalyticsData()
  },
  mounted () {
    core.index()
  }
}
</script>
<style>
.statistics-views .card-body{
  padding: 0 !important;
}

.chart-flex > dev,
.chart-flex{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

</style>
