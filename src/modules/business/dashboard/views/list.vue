<template>
  <div>
    <b-row class="mb-4">
      <b-col md="4">
        <b-card>
          <div class="d-flex d-flex align-items-center justify-content-between">
            <div>
              <p class="fontsize-sm m-0">Users: Viewed</p>
              <h2 class="font-weight-bold">13.405</h2>
            </div>
            <div>
              <p class="fontsize-sm m-0">Unique views</p>
              <h3 class="font-weight-bold text-info">352</h3>
            </div>
            <div class="rounded-full-circle iq-card-icon  dark-icon-light iq-bg-info ">
              <i class="ri-user-line font-size-24"></i>
            </div>
          </div>
        </b-card>
      </b-col>
      <b-col md="4">
        <b-card>
          <div class="d-flex d-flex align-items-center justify-content-between">
            <div>
              <p class="fontsize-sm m-0">Invoice Sent</p>
              <h2 class="font-weight-bold">352</h2>
            </div>
            <div>
              <p class="fontsize-sm m-0">Invoice Sent</p>
              <h3 class="text-light-green font-weight-bold">352</h3>
            </div>
            <div class="rounded-full-circle iq-card-icon  dark-icon-light bg-light-green ">
              <img class="icon-circle-saver" :src="require('@/assets/images/dashboard/Savers@4x.png')" />
            </div>
          </div>
        </b-card>
      </b-col>
      <b-col md="4">
        <b-card>
          <div class="d-flex d-flex align-items-center justify-content-between">
            <div>
              <p class="fontsize-sm m-0">USERS: TRACKED</p>
              <h2 class="font-weight-bold">13.405</h2>
            </div>
            <div>
              <p class="fontsize-sm m-0">Current trackers</p>
              <h3 class="font-weight-bold text-warning">352</h3>
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
          <h5 class="">Daily Frequency of Views, Saves & Tracks</h5>
          <div class="d-flex justify-content-between gap-20">
            <div class="cursor-pointer">
              <i class="las la-arrow-left mr-2"></i>
              <span>PREV</span>
            </div>
            <div class="text-black font-weight-bold">
              FEB,2021
            </div>
            <div class="cursor-pointer">
              <span>NEXT</span>
              <i class="las la-arrow-right ml-2"></i>
            </div>
          </div>
        </div>
      </template>
      <b-row>
        <b-col md="2">
          <div class="py-3 px-2 d-flex justify-content-around flex-column h-100">
            <div class="d-flex justify-content-between mb-4 mt-2">
              <h5 class="text-black-50 font-weight-bold">JANUARY</h5>
            </div>
            <div>
              <div class="d-flex justify-content-between mb-3">
                <h6 class="text-black-50">TOTAL VIEWS</h6>
                <h4 class="text-info font-weight-bold">87,805</h4>
              </div>
              <div class="d-flex justify-content-between mb-3">
                <h6 class="text-black-50">TOTAL SAVES</h6>
                <h4 class="text-light-green font-weight-bold">87,805</h4>
              </div>
              <div class="d-flex justify-content-between mb-3">
                <h6 class="text-black-50">TOTAL TRACKS</h6>
                <h4 class="text-warning font-weight-bold">87,805</h4>
              </div>
            </div>
            <div class="statisticsLowOrHight">
              <h6 class="text-black-50 mb-3">TOTAL CHANGE</h6>
              <div class="d-flex justify-content-between">
                <div class="d-flex align-items-center flex-column">
                  <span>V</span>
                  <span class="text-info font-weight-bold">+ 2.2%</span>
                </div>
                <div class="d-flex align-items-center flex-column">
                  <span>S</span>
                  <span class="text-light-green font-weight-bold">+ 2.2%</span>
                </div>
                <div class="d-flex align-items-center flex-column">
                  <span>T</span>
                  <span class="text-warning font-weight-bold">+ 2.2%</span>
                </div>
              </div>
            </div>
          </div>
        </b-col>
        <b-col md="8" class="border-right border-left">
          <div class="py-3">
            <div style="overflow-x: scroll">
              <ApexChart element="view-chart"
                         :chartOption="chart1"
                         style="max-height: 150px; width: 2500px;"
              />
            </div>
          </div>
        </b-col>
        <b-col md="2">
          <div class="py-3 px-2 d-flex justify-content-around flex-column h-100">
            <div class="d-flex justify-content-between mb-4 mt-2">
              <h5 class="text-black-50 font-weight-bold">JANUARY</h5>
            </div>
            <div>
              <div class="d-flex justify-content-between mb-3">
                <h6 class="text-black-50">TOTAL VIEWS</h6>
                <h4 class="text-info font-weight-bold">87,805</h4>
              </div>
              <div class="d-flex justify-content-between mb-3">
                <h6 class="text-black-50">TOTAL SAVES</h6>
                <h4 class="text-light-green font-weight-bold">87,805</h4>
              </div>
              <div class="d-flex justify-content-between mb-3">
                <h6 class="text-black-50">TOTAL TRACKS</h6>
                <h4 class="text-warning font-weight-bold">87,805</h4>
              </div>
            </div>
            <div class="statisticsLowOrHight">
              <h6 class="text-black-50 mb-3">TOTAL CHANGE</h6>
              <div class="d-flex justify-content-between">
                <div class="d-flex align-items-center flex-column">
                  <span>V</span>
                  <span class="text-info font-weight-bold">+ 2.2%</span>
                </div>
                <div class="d-flex align-items-center flex-column">
                  <span>S</span>
                  <span class="text-light-green font-weight-bold">+ 2.2%</span>
                </div>
                <div class="d-flex align-items-center flex-column">
                  <span>T</span>
                  <span class="text-warning font-weight-bold">+ 2.2%</span>
                </div>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-card>
    <b-card class="statistics-views mb-4">
      <template v-slot:header>
        <div class="d-flex justify-content-between">
          <h5 class="">Demographics: Age, Gender, & Nationalities</h5>
          <div class="d-flex justify-content-between gap-20">
            <div class="cursor-pointer">
              <i class="las la-arrow-left mr-2"></i>
              <span>PREV</span>
            </div>
            <div class="text-black font-weight-bold">
              FEB,2021
            </div>
            <div class="cursor-pointer">
              <span>NEXT</span>
              <i class="las la-arrow-right ml-2"></i>
            </div>
          </div>
        </div>
      </template>
      <b-row>
        <b-col md="4">
          <div class="py-3">
            <div>
              <ApexChart element="view-chart2"
                         :chartOption="test"
              />
            </div>
          </div>
        </b-col>
        <b-col md="2"></b-col>
        <b-col md="2"></b-col>
        <b-col md="4">
          <div class="py-3 px-2 d-flex justify-content-around flex-column h-100">
            <div class="d-flex justify-content-between mb-4 mt-2">
              <h5 class="text-black-50 font-weight-bold">JANUARY</h5>
            </div>
            <div>
              <div class="d-flex justify-content-between mb-3">
                <h6 class="text-black-50">TOTAL VIEWS</h6>
                <h4 class="text-info font-weight-bold">87,805</h4>
              </div>
              <div class="d-flex justify-content-between mb-3">
                <h6 class="text-black-50">TOTAL SAVES</h6>
                <h4 class="text-light-green font-weight-bold">87,805</h4>
              </div>
              <div class="d-flex justify-content-between mb-3">
                <h6 class="text-black-50">TOTAL TRACKS</h6>
                <h4 class="text-warning font-weight-bold">87,805</h4>
              </div>
            </div>
            <div class="statisticsLowOrHight">
              <h6 class="text-black-50 mb-3">TOTAL CHANGE</h6>
              <div class="d-flex justify-content-between">
                <div class="d-flex align-items-center flex-column">
                  <span>V</span>
                  <span class="text-info font-weight-bold">+ 2.2%</span>
                </div>
                <div class="d-flex align-items-center flex-column">
                  <span>S</span>
                  <span class="text-light-green font-weight-bold">+ 2.2%</span>
                </div>
                <div class="d-flex align-items-center flex-column">
                  <span>T</span>
                  <span class="text-warning font-weight-bold">+ 2.2%</span>
                </div>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>
<script>
import { core } from '@/config/pluginInit'
import ApexChart from '@/components/core/charts/ApexChart'
export default {
  components: { ApexChart },
  data () {
    return {
      chart1: {
        zoom: {
          enabled: true,
          type: 'x',
          resetIcon: {
            offsetX: -10,
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
        series: [{
          name: 'Net Profit',
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 76, 85, 90, 50, 89, 15, 51, 18, 98, 76, 85, 101, 98, 87, 105, 91, 114, 94]
        }, {
          name: 'Revenue',
          data: [76, 85, 90, 50, 89, 15, 51, 18, 98, 76, 85, 101, 98, 87, 105, 91, 114, 94, 44, 55, 57, 56, 61, 58, 63, 60, 66]
        },
        {
          name: 'test',
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 44, 55, 57, 56, 61, 58, 63, 60, 66, 76, 85, 90, 50, 89, 15, 51, 18, 98]
        }],
        chart: {
          type: 'bar',
          height: 350
        },
        colors: ['#2f9be8', '#1bdbc2', '#fe9e12'],
        plotOptions: {
          bar: {
            grid: {
              padding: {
                left: 30, // or whatever value that works
                right: 30 // or whatever value that works
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
          categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
            'Aug', 'Sep', 'Oct', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']
        },
        yaxis: {
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return '$ ' + val + ' thousands'
            }
          }
        }
      },
      test: {
        total: {
          show: true,
          showAlways: true,
          label: 'Total',
          fontSize: '22px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 600,
          color: '#10acda'
        },
        series: [10, 20, 30, 10, 10, 10],
        labels: [' > 10 years', '10 - 19 years', '20 - 29 years', '30 - 39 years', '40 - 50 years', '< 51 years'],
        chart: {
          foreColor: '#8c91b6',
          type: 'donut'
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
          height: 150
        }
      },
      demographics: {
        chart: {
          height: 320,
          type: 'donut'
          /* stroke: {
            show: true,
            curve: 'smooth',
            lineCap: 'butt',
            colors: undefined,
            width: 3,
            dashArray: 0
          } */
        },
        plotOptions: {
          labels: {
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
            },
            value: {
              show: true,
              fontSize: '16px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 400,
              color: undefined,
              offsetY: 16,
              formatter: function (val) {
                return val
              }
            },
            total: {
              show: false,
              showAlways: false,
              label: 'Total',
              fontSize: '22px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 600,
              color: '#10acda'
            }
          },
          pie: {
            startAngle: 0,
            endAngle: 360,
            expandOnClick: true,
            offsetX: 0,
            offsetY: 0,
            customScale: 1,
            dataLabels: {
              offset: 0,
              minAngleToShowLabel: 10
            },
            donut: {
              size: '65%',
              background: 'transparent',
              labels: {
                show: false,
                name: {
                  show: true,
                  fontSize: '22px',
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  fontWeight: 600,
                  color: '#000',
                  offsetY: -10,
                  formatter: function (val) {
                    return val
                  }
                },
                value: {
                  show: true,
                  fontSize: '16px',
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  fontWeight: 400,
                  color: undefined,
                  offsetY: 16,
                  formatter: function (val) {
                    return val
                  }
                },
                total: {
                  show: false,
                  showAlways: false,
                  label: 'Total',
                  fontSize: '22px',
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  fontWeight: 600,
                  color: '#10acda'
                }
              }
            }
          }
        },
        colors: ['#000', '#2f9be8', '#2fdac2', '#fe9e12', '#da302b', '#74798c'],
        series: [10, 20, 30, 10, 10, 10],
        stroke: {
          lineCap: 'round'
        },
        labels: [' > 10 years', '10 - 19 years', '20 - 29 years', '30 - 39 years', '40 - 50 years', '< 51 years']
      }
    }
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
