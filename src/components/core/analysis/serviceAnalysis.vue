<template>
  <b-card class="statistics-views mb-4">
    <template v-slot:header>
      <div class="d-flex justify-content-between">
        <h5 class="font-weight-bold" v-if="type !== 'activity'">
          {{ type.charAt(0).toUpperCase() + type.slice(1) }}s: Total Number,
          Change & Frequency of Views
        </h5>
        <h5 class="font-weight-bold" v-else>
          Activities: Total Number, Change & Frequency of Views
        </h5>
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
            <main-select :inBody="true"
              v-if="itemsList.length > 0"
              :name="`${type} name`"
              :options="itemsList"
              label="name"
              :reduce="(data) => data.id"
              v-model="itemId"
            ></main-select>
            <div class="d-flex flex-column py-3 h-242px">
              <h6 class="text-black-50 font-size-12 font-weight-bold">
                TOTAL VIEWS
              </h6>
              <h3 class="font-weight-bold">
                {{ serviceAnalysis.total_views }}
              </h3>
            </div>
          </div>
        </b-col>
        <b-col md="2" class="border-right">
          <b-row>
            <b-col md="12" class="border-bottom">
              <div
                  class="
                  py-3
                  px-2
                  d-flex
                  justify-content-around
                  flex-column
                  h-100
                "
              >
                <div class="d-flex justify-content-between mb-4 mt-2">
                  <h5 class="text-black-50 font-weight-bold">
                    {{ serviceAnalysis.current_month }}
                  </h5>
                </div>
                <div>
                  <h6 class="text-black-50 font-size-12 font-weight-bold">
                    VIEWS
                  </h6>
                  <div class="d-flex justify-content-between mb-3">
                    <h4 class="font-weight-bold">
                      {{ serviceAnalysis.current_views }}
                    </h4>
                    <span class="text-success-light font-weight-bold"
                    ><i class="far fa-arrow-up-right"></i>
                      {{
                        monthStatsCalculation("last_views", "current_views")
                      }}</span
                    >
                  </div>
                </div>
              </div>
            </b-col>
            <b-col md="12" >
              <div
                class="
                  py-3
                  px-2
                  d-flex
                  justify-content-around
                  flex-column
                  h-100
                "
              >
                <div class="d-flex justify-content-between mb-4 mt-2">
                  <h5 class="text-black-50 font-weight-bold">
                    {{ serviceAnalysis.last_month }}
                  </h5>
                </div>
                <div>
                  <h6 class="text-black-50 font-size-12 font-weight-bold">
                    VIEWS
                  </h6>
                  <div class="d-flex justify-content-between mb-3">
                    <h4 class="font-weight-bold">
                      {{ serviceAnalysis.last_views }}
                    </h4>
                    <span class="text-success-light font-weight-bold"
                      ><i class="far fa-arrow-up-right"></i>
                      {{
                        monthStatsCalculation("lastLast_views", "last_views")
                      }}</span
                    >
                  </div>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-col>
        <b-col md="8" v-if="monthDaysOptions.xaxis.categories.length > 0">
          <div class="py-3">
            <div style="overflow-x: scroll">
              <spinner-loading v-if="loading" />
              <apex-chart
                v-else
                class="chart-flex"
                height="300px"
                :style="`width: ${
                  monthDaysOptions.xaxis.categories.length * 80 < 1000
                    ? 1000
                    : monthDaysOptions.xaxis.categories.length * 80
                }px;`"
                type="bar"
                :options="monthDaysOptions"
                :series="monthDaysSeries"
              ></apex-chart>
            </div>
          </div>
        </b-col>
        <b-col v-else md="8" class="text-center py-5">
          <h4 class="py-5 mt-2">
            No sevice analysis for {{ serviceFilterByDate }}
          </h4>
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
        product: 'products',
        ticket: 'tickets'
      },
      serviceAnalysis: {},
      serviceFilterByDate: moment(new Date()).format('MMM YYYY'),
      itemsList: [],
      itemId: '',
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
          height: 50,
          width: 10
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
            columnWidth: '15%',
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
        yaxis: {},
        fill: {
          opacity: 1
        }
      },
      monthDaysSeries: [
        {
          name: 'Views',
          data: []
        }
      ],
      loading: false
    }
  },
  methods: {
    getServiceAnalysis () {
      this.loading = true
      if (this.itemId) {
        dashboardServices
          .getServiceAnalysis(
            this.type,
            this.itemId,
            moment(this.serviceFilterByDate).format('YYYY-MM')
          )
          .then((res) => {
            this.serviceAnalysis = res.data.data
            this.serviceAnalysis.current_month = moment(
              this.serviceFilterByDate
            ).format('MMMM')
            this.serviceAnalysis.last_month = moment(this.serviceFilterByDate)
              .add(-1, 'M')
              .format('MMMM')

            const temp = this.serviceAnalysis.month_days.filter((month) => {
              if (month.views > 0) {
                return month
              }
            })
            setTimeout(() => {
              this.loading = false
            }, 0)
            this.monthDaysOptions.xaxis.categories = temp.map(
              (month) => month.date
            )
            // this.monthDaysOptions.plotOptions.bar.columnWidth = '4px'
            this.monthDaysSeries[0].data = temp.map((month) => month.views)
          })
      }
    },
    changeMonth (value) {
      this.serviceFilterByDate = moment(this.serviceFilterByDate)
        .add(value, 'M')
        .format('MMM YYYY')
      this.getServiceAnalysis()
    },
    monthStatsCalculation (y, x) {
      if (this.serviceAnalysis[y] !== 0) {
        const result = Math.trunc(
          ((this.serviceAnalysis[x] - this.serviceAnalysis[y]) /
            this.serviceAnalysis[y]) *
            100
        )
        if (result > 0) {
          return `+${result}%`
        } else {
          return `${result}%`
        }
      } else {
        const result = this.serviceAnalysis[x]
        return `+${result}%`
      }
    }
  },
  watch: {
    itemId () {
      this.getServiceAnalysis()
    }
  },
  created () {
    console.log(this.routeNameMap)
    console.log(this.type)
    dashboardServices.getAllItems(this.routeNameMap[this.type]).then((res) => {
      this.itemsList = res.data.data.data
      this.itemId = this.itemsList[0].id
      console.log(this.itemsList)
    })
    this.getServiceAnalysis()
  }
}
</script>
<style>
.h-242px {
  height: 242px;
}
</style>
