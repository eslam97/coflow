<template>
  <div>
    <b-row class="mb-4">
      <b-col md="4">
        <b-card>
          <div class="d-flex d-flex align-items-start justify-content-between">
            <div>
              <p class="statistics-text m-0">USERS: VIEWED</p>
              <h2 class="font-weight-bold">{{ section1.users_views }}</h2>
            </div>
            <div>
              <p class="statistics-text m-0">UNIQUE VIEWS</p>
              <h3 class="font-weight-bold text-info">{{ section1.unique_views }}</h3>
            </div>
            <div class="rounded-full-circle iq-card-icon  dark-icon-light iq-bg-info ">
              <i class="ri-user-line font-size-24"></i>
            </div>
          </div>
        </b-card>
      </b-col>
      <b-col md="4">
        <b-card>
          <div class="d-flex d-flex align-items-start justify-content-between">
            <div>
              <p class="statistics-text m-0">USERS: SAVED</p>
              <h2 class="font-weight-bold">{{ section1.users_saves }}</h2>
            </div>
            <div>
              <p class="statistics-text m-0">CURRENT SAVERS</p>
              <h3 class="text-light-green font-weight-bold">{{ section1.current_saves }}</h3>
            </div>
            <div class="rounded-full-circle iq-card-icon  dark-icon-light bg-light-green ">
              <img class="icon-circle-saver" :src="require('@/assets/images/dashboard/Savers@4x.png')" />
            </div>
          </div>
        </b-card>
      </b-col>
      <b-col md="4">
        <b-card>
          <div class="d-flex d-flex align-items-start justify-content-between">
            <div>
              <p class="statistics-text p-0 m-0">USERS: TRACKED</p>
              <h2 class="font-weight-bold">{{ section1.tracks }}</h2>
            </div>
            <div>
              <p class="statistics-text m-0">CURRENT TRACKERS</p>
              <h3 class="font-weight-bold text-warning">{{ section1.current_tracks }}</h3>
            </div>
            <div class="rounded-full-circle iq-card-icon  dark-icon-light iq-bg-warning ">
              <img class="icon-circle" :src="require('@/assets/images/dashboard/Trackers@4x.png')" />
            </div>
          </div>
        </b-card>
      </b-col>
    </b-row>
    <b-card class="statistics-views mb-4">
      <template v-slot:header>
        <div class="d-flex justify-content-between">
          <h5 class="font-weight-bold">Daily Frequency of Views, Saves & Tracks</h5>
          <div class="d-flex justify-content-between gap-20">
            <div class="cursor-pointer" @click="changeMonth(-1)">
              <i class="las la-arrow-left mr-2"></i>
              <span>PREV</span>
            </div>
            <div class="text-black font-weight-bold">
              {{ filterByDate }}
            </div>
            <div class="cursor-pointer" @click="changeMonth(1)">
              <span>NEXT</span>
              <i class="las la-arrow-right ml-2"></i>
            </div>
          </div>
        </div>
      </template>
      <b-row>
        <b-col class="pl-4" md="2">
          <div class="py-3 px-2 d-flex mt-2 flex-column h-100">
            <div class="d-flex justify-content-between mt-2" style="margin-bottom: 39px !important;" v-if="analysisByDate != null">
              <h5 class="text-black-50 font-weight-bold">{{ analysisByDate.last.month ? analysisByDate.last.month  : '' }}</h5>
            </div>
            <div>
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h6 class="text-black-50 font-size-12 font-weight-bold">TOTAL VIEWS</h6>
                <h4 class="text-info font-weight-bold">{{ analysisByDate.last.views }}</h4>
              </div>
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h6 class="text-black-50 font-size-12 font-weight-bold">TOTAL SAVES</h6>
                <h4 class="text-light-green font-weight-bold">{{ analysisByDate.last.saves }}</h4>
              </div>
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h6 class="text-black-50 font-size-12 font-weight-bold ">TOTAL TRACKS</h6>
                <h4 class="text-warning font-weight-bold">{{ analysisByDate.last.tracks }}</h4>
              </div>
            </div>
<!--            <div class="statisticsLowOrHight">-->
<!--              <h6 class="text-black-50 mb-3 font-size-12 font-weight-bold text-center ">TOTAL CHANGE</h6>-->
<!--              <div class="d-flex justify-content-between">-->
<!--                <div class="d-flex align-items-center flex-column">-->
<!--                  <span>V</span>-->
<!--                  <span class="text-info font-weight-bold">-->
<!--                    {{ monthStatsCalculation('last', 'current', 'views') }}-->
<!--                  </span>-->
<!--                </div>-->
<!--                <div class="d-flex align-items-center flex-column">-->
<!--                  <span>S</span>-->
<!--                  <span class="text-light-green font-weight-bold">-->
<!--                    {{ monthStatsCalculation('last', 'current', 'saves') }}-->
<!--                  </span>-->
<!--                </div>-->
<!--                <div class="d-flex align-items-center flex-column">-->
<!--                  <span>T</span>-->
<!--                  <span class="text-warning font-weight-bold">-->
<!--                    {{ monthStatsCalculation('last', 'current', 'tracks') }}-->
<!--                  </span>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
          </div>
        </b-col>
        <b-col md="8" class="border-right border-left" v-if="monthDaysOptions.xaxis.categories.length > 0">
          <div class="py-3">
            <div style="overflow-x: scroll;overflow-y: hidden;">
              <spinner-loading v-if=(loading) />
              <apex-chart v-else class="chart-flex" height="300px"
                          :style="`max-width: ${monthDaysOptions.xaxis.categories.length*80 < 1000? 1000 :
                          monthDaysOptions.xaxis.categories.length*80}px;`"
                          type="bar" :options="monthDaysOptions" :series="monthDaysSeries"></apex-chart>
            </div>
          </div>
        </b-col>
        <b-col v-else md="8" class="text-center py-5">
          <h4 class="py-5 mt-2">No user analysis for {{ filterByDate }}</h4>
        </b-col>
        <b-col class="pr-4" md="2">
          <div class="py-3 px-2 d-flex justify-content-around flex-column h-100">
            <div class="d-flex justify-content-between mb-4 mt-2" v-if="analysisByDate != null">
              <h5 class="text-black-50 font-weight-bold">{{ analysisByDate.current.month }}</h5>
            </div>
            <div>
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h6 class="text-black-50 font-size-12 font-weight-bold">TOTAL VIEWS</h6>
                <h4 class="text-info font-weight-bold">{{ analysisByDate.current.views }}</h4>
              </div>
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h6 class="text-black-50 font-size-12 font-weight-bold">TOTAL SAVES</h6>
                <h4 class="text-light-green font-weight-bold">{{ analysisByDate.current.saves }}</h4>
              </div>
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h6 class="text-black-50 font-size-12 font-weight-bold">TOTAL TRACKS</h6>
                <h4 class="text-warning font-weight-bold">{{ analysisByDate.current.tracks }}</h4>
              </div>
            </div>
            <div class="statisticsLowOrHight">
              <h6 class="text-black-50 mb-3 font-size-12 font-weight-bold text-center ">TOTAL CHANGE</h6>
              <div class="d-flex justify-content-between">
                <div class="d-flex align-items-center flex-column">
                  <span>V</span>
                  <span class="text-info font-weight-bold">
                    {{ monthStatsCalculation('last', 'current', 'views') }}
                  </span>
                </div>
                <div class="d-flex align-items-center flex-column">
                  <span>S</span>
                  <span class="text-light-green font-weight-bold">
                    {{ monthStatsCalculation('last', 'current', 'saves') }}
                  </span>
                </div>
                <div class="d-flex align-items-center flex-column">
                  <span>T</span>
                  <span class="text-warning font-weight-bold">
                    {{ monthStatsCalculation('last', 'current', 'tracks') }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-card>
    <b-card class="statistics-views mb-0 pb-0">
      <template v-slot:header>
        <div class="d-flex justify-content-between align-items-center">
          <h5 class="font-weight-bold">Demographics: Age, Gender & Nationalities</h5>
          <main-select class="m-0 text-capitalize" style="min-width: 130px" :options="['viewers', 'savers', 'trackers']"
                       v-model="userType" @change="updateUserTypeData"></main-select>
        </div>
      </template>
      <b-card-body body-class="pb-0 mb-0">
        <b-row v-if="section2[userType].nationality.length > 0" class="mb-0">
          <b-col md="4" sm="12" class="border-right">
            <div class="py-3 d-flex justify-content-center align-items-center w-100 h-100">
              <apex-chart class="chart-flex" width="400" type="donut" :options="agePie" :series="ageSeries"></apex-chart>
            </div>
          </b-col>

          <b-col md="4" sm="12" class="border-right">
            <div class="py-3 d-flex justify-content-center align-items-center w-100 h-100">
            <apex-chart class="chart-flex" width="380" type="pie" :options="genderPie" :series="genderSeries"></apex-chart>
            </div>
          </b-col>

          <b-col md="4" sm="12" class="">
            <div class="p-5" style="overflow-y: scroll; height: 300px">
              <div v-for="(nation, key) in section2[userType].nationality ? section2[userType].nationality : []" :key="key"
                   class="mb-3"
              >
                <h4 class="d-flex justify-content-between mb-2">
                  <span>{{nation.nationality ? nation.nationality : ''}}</span>
                  <span>{{nation.views ? nation.views : 0}} user(s)</span>
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
    {{ type }}
    <service-analysis class="mt-4" v-for="(type, key) in serviceTypes" :key="key" :type="type"/>
  </div>
</template>
<script>
import { core } from '@/config/pluginInit'
import ApexChart from 'vue-apexcharts'
import moment from 'moment'
import dashboardServices from '@/modules/business/dashboard/services/dashboard.services'
export default {
  components: { ApexChart },
  data () {
    return {
      monthDaysOptions: {
        zoom: {
          enabled: true,
          type: 'x',
          resetIcon: {
            offsetY: 0,
            fillColor: '#fff',
            strokeColor: '#37474F'
          },
          selection: {
            background: '#90CAF9',
            border: '#0D47A1'
          }
        },
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
        colors: ['#2f9be8', '#1bdbc2', '#fe9e12'],
        plotOptions: {
          bar: {
            grid: {
              padding: {
                left: 30,
                right: 30
              }
            },
            horizontal: false,
            columnWidth: '40%',
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
        }, {
          name: 'Saves',
          data: []
        },
        {
          name: 'Tracks',
          data: []
        }
      ],

      section1: {},
      section2: {},

      colors: ['info', 'success', 'warning', 'danger'],
      totalViews: 0,
      userType: 'viewers',

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
          width: 380,
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
            offsetY: 0,
            formatter: function (val) {
              return val
            }
          }
        },
        colors: ['#000', '#2f9be8', '#2fdac2', '#fe9e12', '#da302b', '#74798c'],
        // legend: {
        //   position: 'right',
        //   offsetY: 50,
        //   offsetX: -20,
        //   height: 170,
        //   fontSize: '18px'
        // }
        legend: {
          position: 'right',
          offsetY: 50,
          offsetX: 0
        }
      },
      ageSeries: [],

      genderSeries: [],
      genderPie: {
        chart: {
          width: 280,
          height: 280,
          type: 'pie'
        },
        labels: ['Male', 'Female'],
        colors: ['#2f9be8', '#FD6C9E'],
        // legend: {
        //   position: 'right',
        //   offsetY: 50,
        //   offsetX: -20,
        //   height: 170,
        //   fontSize: '18px'
        // },
        legend: {
          position: 'right',
          offsetY: 50,
          offsetX: 0
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 380
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },

      filterByDate: moment(new Date()).format('MMM YYYY'),
      analysisByDate: {
        last: {
          month: ''
        },
        current: {
          month: ''
        },
        month_days: []
      },

      serviceAccess: {
        FLOW: ['flow'],
        PRO: ['activity', 'course'],
        SHOP: ['product'],
        CAMP: ['accommodation'],
        GO: ['ticket']
      },
      serviceTypes: [],

      loading: false
    }
  },
  methods: {
    getHomeData () {
      dashboardServices.getHomeData().then(res => {
        this.section1 = res.data.data.section1
        this.section2 = res.data.data.section2
        const userData = this.section2[this.userType]
        this.totalViews = userData.nationality ? userData.nationality.map((nation) => nation.views).reduce((prev, curr) => prev + curr, 0) : []

        Object.keys(userData.age).sort().forEach(i => {
          this.ageSeries.push(userData.age[i])
        })

        this.genderSeries.push(userData.gender.male)
        this.genderSeries.push(userData.gender.female)
      })
    },
    updateUserTypeData () {
      this.ageSeries = []
      const userData = this.section2[this.userType]
      this.totalViews = userData.nationality ? userData.nationality.map((nation) => nation.views).reduce((prev, curr) => prev + curr, 0) : []
      Object.keys(userData.age).sort().forEach(i => {
        this.ageSeries.push(userData.age[i])
      })
      this.genderSeries = []
      this.genderSeries.push(userData.gender.male)
      this.genderSeries.push(userData.gender.female)
    },
    changeMonth (value) {
      this.filterByDate = moment(this.filterByDate).add(value, 'M').format('MMM YYYY')
      this.getAnalysisByDate()
    },
    getAnalysisByDate () {
      this.loading = true
      dashboardServices.getAnalysisByDate(moment(this.filterByDate).format('YYYY-MM')).then(res => {
        this.analysisByDate = res.data.data
        this.analysisByDate.last.month = moment(this.filterByDate).add(-1, 'M').format('MMMM')
        this.analysisByDate.current.month = moment(this.filterByDate).format('MMMM')

        const temp = this.analysisByDate.month_days.filter((month) => {
          if ((month.saves + month.tracks + month.views) > 0) {
            return month
          }
        })
        this.monthDaysOptions.xaxis.categories = temp.map((month) => month.date)
        setTimeout(() => { this.loading = false }, 0)
        this.monthDaysSeries[0].data = temp.map((month) => month.views)
        this.monthDaysSeries[1].data = temp.map((month) => month.saves)
        this.monthDaysSeries[2].data = temp.map((month) => month.tracks)
      })
    },
    monthStatsCalculation (y, x, term) {
      if (this.analysisByDate[y][term] !== 0) {
        const result = Math.trunc(((this.analysisByDate[x][term] - this.analysisByDate[y][term]) / this.analysisByDate[y][term]) * 100)
        if (result > 0) {
          return `+${result}%`
        } else {
          return `${result}%`
        }
      } else {
        const result = this.analysisByDate[x][term]
        return `+${result}%`
      }
    }
  },
  created () {
    this.serviceTypes = this.serviceAccess[JSON.parse(localStorage.getItem('userInfo')).service_types]
    this.getHomeData()
    this.getAnalysisByDate()
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
.chart-flex > dev,
.chart-flex{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.statistics-text {
  font-size: 12px;
  font-weight: bold;
}
.font-weight-bold-medium {
  font-weight: 500 !important;
}
.apexcharts-legend-series {
  display: flex;
  justify-content: start;
  gap:2px;
  align-items: center;
}
</style>
