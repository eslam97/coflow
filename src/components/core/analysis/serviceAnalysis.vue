<template>
  <b-card class="statistics-views mb-4">
    <template v-slot:header>
      <div class="d-flex justify-content-between">
        <h5 class="">Flows: Total Number, Change & Frequency of Views</h5>
        <div class="d-flex justify-content-between gap-20">
          <div class="cursor-pointer" @click="changeMonth(-1)">
            <i class="las la-arrow-left mr-2"></i>
            <span>PREV</span>
          </div>
          <div class="text-black font-weight-bold">
            {{ serviceFilterByDate }}
          </div>
          <div class="cursor-pointer" @click="changeMonth(1)">
            <span>NEXT</span>
            <i class="las la-arrow-right ml-2"></i>
          </div>
        </div>
      </div>
    </template>
    <b-card-body>
      <b-row>
        <b-col md="2" class="border-right p-4">
          <div class="">
            <main-select v-if="itemsList.length > 0" :name="`${type} name`" :options="itemsList"
                         label="name" :reduce="data => data.id"
                         v-model="itemId"></main-select>
            <div>
              <p class="fontsize-sm m-0">TOTAL NUMBER</p>
              <h2 class="font-weight-bold">{{ serviceAnalysis.total_views }}</h2>
            </div>
          </div>
        </b-col>
        <b-col md="2" class="border-right">
          <b-row>
            <b-col md="12" class="border-bottom">
              <div class="py-3 px-2 d-flex justify-content-around flex-column h-100">
                <div class="d-flex justify-content-between mb-4 mt-2">
                  <h5 class="text-black-50 font-weight-bold">{{ serviceAnalysis.last_month }}</h5>
                </div>
                <div>
                  <h6 class="text-black-50">TOTAL VIEWS</h6>
                  <div class="d-flex justify-content-between mb-3">
                    <h4 class=" font-weight-bold">{{ serviceAnalysis.last_views }}</h4>
                    <span class="text-success-light font-weight-bold"><i class="far fa-arrow-up-right"></i> 2.2%</span>
                  </div>
                </div>
              </div>
            </b-col>
            <b-col md="12">
              <div class="py-3 px-2 d-flex justify-content-around flex-column h-100">
                <div class="d-flex justify-content-between mb-4 mt-2">
                  <h5 class="text-black-50 font-weight-bold">{{ serviceAnalysis.current_month }}</h5>
                </div>
                <div>
                  <h6 class="text-black-50">TOTAL VIEWS</h6>
                  <div class="d-flex justify-content-between mb-3">
                    <h4 class=" font-weight-bold">{{ serviceAnalysis.current_views }}</h4>
                    <span class="text-success-light font-weight-bold"><i class="far fa-arrow-up-right"></i> 2.2%</span>
                  </div>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-col>
        <b-col md="8">
          <div class="py-3">
            <div style="overflow-x: scroll">
              <apex-chart class="chart-flex" height="300px" style="width: 2500px;"
                          type="bar" :options="monthDaysOptions" :series="monthDaysSeries"></apex-chart>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-card-body>
  </b-card>
</template>

<script>
import moment from 'moment'
import ApexChart from 'vue-apexcharts'
import dashboardServices from '@/modules/business/dashboard/services/dashboard.services'

export default {
  components: { ApexChart },
  props: {
    type: { type: String }
  },
  data () {
    return {
      routeNameMap: {
        flow: 'flows',
        accommodation: 'accommodations',
        activity: 'activities',
        course: 'courses',
        product: 'products'
      },
      serviceAnalysis: {},
      serviceFilterByDate: moment(new Date()).format('MMM YYYY'),
      itemsList: [],
      itemId: 1,

      monthDaysOptions: {
        legend: {
          show: false
        },
        grid: {
          show: true,
          borderColor: '#90A4AE',
          strokeDashArray: 0,
          position: 'back',
          xaxis: {
            lines: {
              show: false
            }
          },
          yaxis: {
            lines: {
              show: false
            }
          },
          row: {
            colors: undefined,
            opacity: 0.5
          },
          column: {
            colors: undefined,
            opacity: 0.5
          },
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        },
        chart: {
          type: 'bar',
          height: 50
        },
        colors: ['#fe9e12'],
        plotOptions: {
          bar: {
            grid: {
              padding: {
                left: 30,
                right: 30
              }
            },
            horizontal: false,
            columnWidth: '50%',
            borderRadius: 5,
            endingShape: 'rounded'
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: []
        },
        yaxis: {
        },
        fill: {
          opacity: 1
        }
      },
      monthDaysSeries: [
        {
          name: 'Views',
          data: []
        },
        {
          name: 'Viewss',
          data: []
        }
      ]
    }
  },
  methods: {
    getServiceAnalysis () {
      dashboardServices.getServiceAnalysis(this.type, this.itemId, moment(this.serviceFilterByDate).format('YYYY-MM')).then(res => {
        this.serviceAnalysis = res.data.data
        this.serviceAnalysis.current_month = moment(this.serviceFilterByDate).format('MMMM')
        this.serviceAnalysis.last_month = moment(this.serviceFilterByDate).add(-1, 'M').format('MMMM')

        this.monthDaysOptions.xaxis.categories = this.serviceAnalysis.month_days.map((month) => month.date)
        // this.monthDaysSeries[0].data = this.serviceAnalysis.month_days.map((month) => month.views)
        this.monthDaysSeries[0].data = [...Array(31).keys()]
        this.monthDaysSeries[1].data = [...Array(31).keys()]
      })
    },
    changeMonth (value) {
      this.serviceFilterByDate = moment(this.serviceFilterByDate).add(value, 'M').format('MMM YYYY')
      this.getServiceAnalysis()
    },
    selectItem () {
    }
  },
  created () {
    dashboardServices.getAllItems(this.routeNameMap[this.type]).then(res => {
      this.itemsList = res.data.data.data
      console.log(this.itemsList)
    })
    this.getServiceAnalysis()
  }
}
</script>