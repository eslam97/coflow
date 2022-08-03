<template>
  <div>
    <b-card class="statistics-views mb-5">
      <template v-slot:header>
        <div class="">
          <h4 class="">Mission</h4>
        </div>
      </template>
<!--      <b-card-header class="mb-4">
        <p class="text-center"><span class="text-dark font-weight-bold font-size-20 mr-3">Mission</span></p>
      </b-card-header>-->
      <b-card-body>
        <b-row class="mb-3 d-flex justify-content-center">
          <b-col md="6" sm="12" class="mb-3">
            <b-table-simple responsive borderless class="text-center">
              <b-thead head-variant="light">
                <b-tr>
                  <b-th v-for="(key, ind) in Object.keys(dashboardHome.mission)" :key="ind">{{key}}</b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
                <b-tr>
                  <b-th v-for="(value, ind) in Object.values(dashboardHome.mission)" :key="ind">{{value}}</b-th>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>

    <b-card class="statistics-views mb-5">
      <template v-slot:header>
        <div class="">
          <h4 class="">Business Market</h4>
        </div>
      </template>
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

    <b-card class="statistics-views mb-5">
      <template v-slot:header>
        <div class="d-flex justify-content-between">
          <h4 class="">Market Customers - Demographics: Age, Gender, & Nationalities</h4>
          <main-select style="min-width: 120px" :options="['users', 'savers', 'trackers']"
                       v-model="userType" @change="updateUserTypeData"></main-select>
        </div>
      </template>
      <b-card-body>
        <b-row class="mb-4">
          <b-col md="4" sm="12" class="border-right">
            <div class="py-3">
                <ApexChart element="view-chart1"
                           :chartOption="agePie"/>
            </div>
          </b-col>
          <b-col md="2" sm="6" class="border-right">
            <div class="py-3">
                <ApexChart element="view-chart2"
                           :chartOption="malePie"/>
            </div>
          </b-col>
          <b-col md="2" sm="6" class="border-right">
            <div class="py-3">
              <ApexChart element="view-chart3"
                         :chartOption="femalePie"/>
            </div>
          </b-col>
          <b-col md="4" sm="12">
            <div class="py-3" style="overflow-y: scroll">
              <ApexChart element="view-chart4"
                         :chartOption="nationalityBar"/>
            </div>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>

    <b-card class="mb-5 mt-2">
      <b-card-header class="mb-4">
        <p class="text-center"><span class="text-dark font-weight-bold font-size-20 mr-3">Product</span></p>
      </b-card-header>
      <b-card-body>
        <b-row class="mb-4 d-flex justify-content-center">
          <b-col md="8" sm="12">
            <b-table-simple responsive borderless class="text-center">
              <colgroup><col v-for="i in Object.keys(dashboardHome.product.business)" :key="i"></colgroup>
              <colgroup><col v-for="i in Object.keys(dashboardHome.product.customers)" :key="i"></colgroup>
              <b-thead head-variant="light">
                <b-tr>
                  <b-th :colspan="Object.keys(dashboardHome.product.business).length">Business</b-th>
                  <b-th :colspan="Object.keys(dashboardHome.product.customers).length">Customers</b-th>
                </b-tr>
                <b-tr>
                  <b-th v-for="(key, ind) in Object.keys(dashboardHome.product.business)" :key="ind">{{key}}</b-th>
                  <b-th v-for="(key, ind) in Object.keys(dashboardHome.product.customers)" :key="ind">{{key}}</b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
                <b-tr>
                  <b-td v-for="(value, ind) in Object.values(dashboardHome.product.business)" :key="ind">{{value}}</b-td>
                  <b-td v-for="(value, ind) in Object.values(dashboardHome.product.customers)" :key="ind">{{value}}</b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-col>
<!--          <b-col md="6">
            <div>
            <b-table-simple hover small caption-top responsive>
              <caption>Items sold in August, grouped by Country and City:</caption>
              <colgroup><col><col></colgroup>
              <colgroup><col><col><col></colgroup>
              <colgroup><col><col></colgroup>
              <b-thead head-variant="dark">
                <b-tr>
                  <b-th colspan="2">Region</b-th>
                  <b-th colspan="3">Clothes</b-th>
                  <b-th colspan="2">Accessories</b-th>
                </b-tr>
                <b-tr>
                  <b-th>Country</b-th>
                  <b-th>City</b-th>
                  <b-th>Trousers</b-th>
                  <b-th>Skirts</b-th>
                  <b-th>Dresses</b-th>
                  <b-th>Bracelets</b-th>
                  <b-th>Rings</b-th>
                </b-tr> </b-thead>
              <b-tbody>
                <b-tr>
                  <b-th rowspan="3">Belgium</b-th>
                  <b-th class="text-right">Antwerp</b-th>
                  <b-td>56</b-td>
                  <b-td>22</b-td>
                  <b-td>43</b-td>
                  <b-td variant="success">72</b-td>
                  <b-td>23</b-td>
                </b-tr>
                <b-tr>
                  <b-th class="text-right">Gent</b-th>
                  <b-td>46</b-td>
                  <b-td variant="warning">18</b-td>
                  <b-td>50</b-td> <b-td>61</b-td>
                  <b-td variant="danger">15</b-td>
                </b-tr>
                <b-tr>
                  <b-th class="text-right">Brussels</b-th>
                  <b-td>51</b-td>
                  <b-td>27</b-td>
                  <b-td>38</b-td>
                  <b-td>69</b-td>
                  <b-td>28</b-td>
                </b-tr>
                <b-tr>
                  <b-th rowspan="2">The Netherlands</b-th>
                  <b-th class="text-right">Amsterdam</b-th>
                  <b-td variant="success">89</b-td>
                  <b-td>34</b-td>
                  <b-td>69</b-td>
                  <b-td>85</b-td>
                  <b-td>38</b-td>
                </b-tr>
                <b-tr>
                  <b-th class="text-right">Utrecht</b-th>
                  <b-td>80</b-td>
                  <b-td variant="danger">12</b-td>
                  <b-td>43</b-td>
                  <b-td>36</b-td>
                  <b-td variant="warning">19</b-td>
                </b-tr>
              </b-tbody>
              <b-tfoot>
                <b-tr>
                  <b-td colspan="7" variant="secondary" class="text-right"> Total Rows: <b>5</b>
                  </b-td>
                </b-tr>
              </b-tfoot>
            </b-table-simple>
          </div>
          </b-col>-->
        </b-row>
      </b-card-body>
    </b-card>

    <b-card class="statistics-views mb-5">
      <template v-slot:header>
        <div class="d-flex justify-content-between">
          <h4 class="">Analytics</h4>
          <date-range-picker
              :startDate="from"
              :endDate="to"
          ></date-range-picker>
        </div>
      </template>
      <b-card-body>
        <b-row class="mb-4">
          <b-col md="12" class="mb-3">
            <b-table-simple responsive borderless class="text-center">
              <b-thead head-variant="light">
                <b-tr>
                  <b-th></b-th>
                  <b-th>saved_business</b-th>
                  <b-th>tracked_business</b-th>
                  <b-th>tracked_energy</b-th>
                  <b-th>on_boarded_business</b-th>
                  <b-th>visible_business</b-th>
                  <b-th>invisible_business</b-th>
                  <b-th>temp_closed_business</b-th>
                  <b-th>on_boarded_customers</b-th>
                  <b-th>savers_customers</b-th>
                  <b-th>trackers_customers</b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(key, ind) in Object.keys(analytics)" :key="ind">
                  <b-th class="text-center">{{key}}</b-th>
                  <b-td v-for="(value, ind) in Object.keys(analytics[key])" :key="ind">{{analytics[key][value]}}</b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
  </div>
</template>
<script>
import { core } from '@/config/pluginInit'
import AnalyticsServices from '@/modules/superAdmin/analytics/services/analytics.services'
import ApexChart from '@/components/core/charts/ApexChart'
import DateRangePicker from 'vue2-daterange-picker'
export default {
  components: { ApexChart, DateRangePicker },
  data () {
    return {
      dashboardHome: '',
      marketBusiness: '',
      analytics: {},
      from: '2022-06-26',
      to: '2022-06-29',
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
        series: [],
        labels: [' < 10 years', '10 - 19 years', '20 - 29 years', '30 - 39 years', '40 - 50 years', '> 51 years'],
        chart: {
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
          offsetX: 20,
          height: 170,
          fontSize: '18px'
        }
      },
      malePie: {
        series: [],
        labels: ['Males'],
        chart: {
          foreColor: '#8c91b6',
          type: 'radialBar',
          height: 250
        },
        plotOptions: {
          pie: {
            size: 200
          }
        },
        colors: ['#2f9be8'],
        legend: {
          position: 'down',
          offsetY: 0,
          offsetX: 0,
          height: 20,
          fontSize: '18px'
        }
      },
      femalePie: {
        series: [],
        labels: ['Females'],
        chart: {
          foreColor: '#8c91b6',
          type: 'radialBar',
          height: 250
        },
        plotOptions: {
          pie: {
            size: 200
          }
        },
        colors: ['#FD6C9E'],
        legend: {
          position: 'down',
          offsetY: 0,
          offsetX: 0,
          height: 20,
          fontSize: '18px'
        }
      },
      nationalityBar: {
        chart: {
          type: 'bar',
          height: 300
        },
        plotOptions: {
          bar: {
            horizontal: true,
            height: 18
          }
        },
        series: [{ data: [] }],
        xaxis: {
          categories: []
        },
        // colors: ['#2f9be8', '#2fdac2', '#fe9e12', '#da302b'],
        legend: {
          show: false
        }
      }
    }
  },
  methods: {
    getDashboardData () {
      AnalyticsServices.getDashboardHome().then(res => {
        this.dashboardHome = res.data.data
        const userData = this.dashboardHome.market_customers[this.userType]

        const allUsers = userData.gender.male + userData.gender.female
        this.agePie.series = Object.values(userData.age)
        this.malePie.series.push((userData.gender.male / allUsers) * 100)
        this.femalePie.series.push((userData.gender.female / allUsers) * 100)

        userData.nationality.forEach(nation => {
          // this.nationalityBar.series.push({ name: nation.nationality, data: [nation.views] })
          this.nationalityBar.series[0].data.push(nation.views)
          this.nationalityBar.xaxis.categories.push(nation.nationality)
        })
        userData.nationality.forEach(nation => {
          // this.nationalityBar.series.push({ name: nation.nationality, data: [nation.views] })
          this.nationalityBar.series[0].data.push(nation.views)
          this.nationalityBar.xaxis.categories.push(nation.nationality)
        })
        userData.nationality.forEach(nation => {
          // this.nationalityBar.series.push({ name: nation.nationality, data: [nation.views] })
          this.nationalityBar.series[0].data.push(nation.views)
          this.nationalityBar.xaxis.categories.push(nation.nationality)
        })
        userData.nationality.forEach(nation => {
          // this.nationalityBar.series.push({ name: nation.nationality, data: [nation.views] })
          this.nationalityBar.series[0].data.push(nation.views)
          this.nationalityBar.xaxis.categories.push(nation.nationality)
        })
        console.log(this.nationalityBar)
      })
    },
    updateUserTypeData () {
      this.agePie.series = Object.values(this.dashboardHome.market_customers[this.userType].age)
    },
    getMareketData () {
      AnalyticsServices.getMarketBusiness().then(res => {
        this.marketBusiness = res.data.data
      })
    },
    getAnalyticsData () {
      AnalyticsServices.getAnalytics(this.from, this.to).then(res => {
        this.analytics = res.data.data
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
.bg-light-green {
  background-color: rgba(0, 226, 194, 0.12);
}
.text-light-green{
  color: #1bdbc2 !important;
}
.rounded-full-circle {
  border-radius: 50%;
}
.icon-circle {
  width: 35px;
}
.icon-circle-saver{
  width: 20px;
}
</style>
