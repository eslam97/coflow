<template>
  <div>
    Hello CoFLow
  </div>
<!--  <b-container fluid>
      <date-range-picker v-if="hasPer('revenue')"
          ref="picker"
          opens=false
          :timePicker=false
          :timePicker24Hour=false
          :showWeekNumbers=true
          :showDropdowns=true
          format='mm/dd/yyyy'
          direction="center"
          :autoApply=true
          v-model="dateRange"
          :linkedCalendars=true
          customRangeLabel= 'Custom Range'
          @update="showData"
      >
  &lt;!&ndash;      <template v-slot:input="picker" style="max-width: 350px;">
          {{ picker.startDate }} - {{ picker.endDate }}
        </template>&ndash;&gt;
      </date-range-picker>
      <b-row>
        <b-col lg="12">
          <iq-card>
            <template v-slot:headerTitle>
              <h4 class="card-title">Global Revenue  <span class="ml-2 font-weight-bold cursor-pointer" @click="reload"><i class="las la-sync text-primary"></i></span> </h4>
            </template>
            <template v-slot:body>
              <div v-if="isBusy" class="text-center">
                <b-spinner small type="grow"></b-spinner>
                Loading...
              </div>
              <b-table striped responsive  class="mb-0 table-borderless" :items="getAllRevunue" :fields="fields" v-else>
                <template #cell(index)="data">
                  {{ data.item.branch }}
                </template>
                <template slot="FOOT_row" slot-scope="data">
                  <td>TOTAL<td>
                  <td>{{data}}<td/>
              </template>
              </b-table>
            </template>
          </iq-card>
        </b-col>
&lt;!&ndash;        <deskModule v-if="hasPer('account.category.daily')"/>&ndash;&gt;
        <b-col lg="12">
          <iq-card>
            <template v-slot:headerTitle>
              <h4 class="card-title">Daily Disk</h4>
            </template>
            <template v-slot:body>
              <div v-if="isBusyTable" class="text-center">
                <b-spinner small type="grow"></b-spinner>
                Loading...
              </div>
              <b-table striped responsive  class="mb-0 table-borderless" :items="dailyDisk" v-else>
              </b-table>
            </template>
          </iq-card>
        </b-col>
        <b-col lg="12">
          <iq-card>
            <template v-slot:headerTitle>
              <h4 class="card-title">Total</h4>
            </template>
            <template v-slot:body>
              <div v-if="loadTotalTable" class="text-center">
                <b-spinner small type="grow"></b-spinner>
                Loading...
              </div>
              <b-table striped responsive  class="mb-0 table-borderless" :items="allDetailsInAllProjects" v-else>
              </b-table>
            </template>
          </iq-card>
        </b-col>
        <b-col lg="3" md="6" v-for="(i,key) in Object.keys(allModeratorsWidget)" :key="key">
          <iq-card>
            <template v-slot:body>
              <div class="text-center"><span> {{ i }} </span></div>
              <div class="d-flex justify-content-between align-items-center">
                <div class="value-box">
                  <h2 class="mb-0"><Counter :value="allModeratorsWidget[i]" /></h2>
                </div>
                <div class="iq-iconbox iq-bg-primary">
                  <i class="ri-arrow-up-line" />
                </div>
              </div>
              <div class="iq-progress-bar-linear d-inline-block w-100  mt-5">
                <Progressbar value="80" color="primary" />
              </div>
            </template>
          </iq-card>
        </b-col>
        <b-col lg="3" md="6">
          <iq-card>
            <template v-slot:body>
              <div class="text-center"><span> Total </span></div>
              <div class="d-flex justify-content-between align-items-center">
                <div class="value-box">
                  <h2 class="mb-0">{{sumOfLeads}}</h2>
                </div>
                <div class="iq-iconbox iq-bg-danger">
                  <i class="ri-arrow-up-line" />
                </div>
              </div>
              <div class="iq-progress-bar-linear d-inline-block w-100  mt-5">
                <Progressbar :value="80" color="danger" />
              </div>
            </template>
          </iq-card>
        </b-col>
      </b-row>
    <date-picker v-model="time3" range></date-picker>
  </b-container>-->
</template>
<script>
import { core } from '../../config/pluginInit'
import { Arabic } from 'flatpickr/dist/l10n/ar'
import { english } from 'flatpickr/dist/l10n/default'
import { mapGetters } from 'vuex'
import Swiper from '../../components/core/slider/Swiper'
import SwiperNav from '../../components/core/slider/SwiperNav'
import SwiperSlide from '../../components/core/slider/SwiperSlide'
import Counter from '../../components/core/counter/Counter'
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import deskModule from '../../components/dashboard/desk'
import accountingService from '../../modules/accounting/services/accounting'

export default {

  name: 'Dashboard2',

  /* filters: {
    date(val) {
      return val ? val.toLocaleString() : ''
    }
  } */
  // eslint-disable-next-line vue/no-unused-components
  components: { Counter, Swiper, SwiperNav, SwiperSlide, DateRangePicker, deskModule },
  mounted () {
    core.index()
  },
  watch: {
    rtl: function (value) {
      this.options.rtl = this.rtl
    }
  },
  computed: {
    ...mapGetters({
      rtl: 'Setting/rtlModeState',
      lang: 'Setting/langState',
      getAllRevunue: 'getAllRevunue'
    }),
    // eslint-disable-next-line vue/return-in-computed-property
    sumOfLeads () {
      var total = 0
      for (var el in this.allModeratorsWidget) {
        total += parseInt(this.allModeratorsWidget[el])
      }
      return total
    }
  },
  methods: {
    getTotalDetailsInAllProjects () {
      accountingService.getTotalDetailsInAllProjects().then(res => {
        Object.entries(res.data.data).forEach(([key, value]) => {
          value = {
            branch: key,
            ...value,
            net_profit: (value.income - (value.expense + value.refund))
          }
          /* console.log('sssssss', value) */
          this.allDetailsInAllProjects.push(value)
        })
      }).finally(() => {
        this.loadTotalTable = false
      })
    },
    reload () {
      this.isBusy = true
      // console.log({ startDate: new Date(this.dateRange.startDate).toJSON().slice(0, 10), endDate: new Date(this.dateRange.startDate).toJSON().slice(0, 10) })
      this.$store.dispatch('getAllRevenue', { startDate: new Date(this.dateRange.startDate).toJSON().slice(0, 10), endDate: new Date(this.dateRange.startDate).toJSON().slice(0, 10) }).then(() => {
        this.isBusy = false
      })
    },
    dateFormat (classes, date) {
      if (!classes.disabled) {
        classes.disabled = date.getTime() < new Date()
      }
      return classes
    },
    fixDate (event) {
      // eslint-disable-next-line no-undef
      return moment(event).format('YYYY-MM-DD')
    },
    showData () {
      // console.log(this.dateRange.startDate)
      this.isBusy = true
      // console.log('heeeel')
      // console.log({ startDate: new Date(this.dateRange.startDate).toJSON().slice(0, 10), endDate: new Date(this.dateRange.endDate).toJSON().slice(0, 10) })
      this.$store.dispatch('getAllRevenue', { startDate: new Date(this.dateRange.startDate).toISOString().split('T')[0], endDate: new Date(this.dateRange.endDate).toJSON().slice(0, 10) }).then(() => {
        this.isBusy = false
      })
    },
    getModeratorsWidget () {
      this.$store.dispatch('getModeratorsWidget', this.typeOfFilterWidget).then(res => {
        this.allModeratorsWidget = res.data.data
      })
    }
    // eslint-disable-next-line camelcase
  },
  created () {
    this.getTotalDetailsInAllProjects()
    this.dailyDisk = []
    this.$store.dispatch('getDailyDisk').then(res => {
      this.isBusyTable = false
      this.dailyDisk = [{
        ...res.data.data,
        'Net Profit': res.data.data.income - (parseFloat(res.data.data.expense) +
            parseFloat(res.data.data.refund) + parseFloat(res.data.data.transfer) + parseFloat(res.data.data.withdraw))
      }]
      // console.log('this.dailyDisk', this.dailyDisk)
    })
    this.isBusy = true
    this.$store.dispatch('getAllRevenue', { startDate: new Date(this.dateRange.startDate).toJSON().slice(0, 10), endDate: new Date(this.dateRange.endDate).toJSON().slice(0, 10) }).then(() => {
      this.isBusy = false
    })
    this.$store.dispatch('getSettings').then(data => {
      this.allsettings = data.data.data
    })
    this.getModeratorsWidget()
  },
  data () {
    return {
      allDetailsInAllProjects: [],
      allsettings: [],
      dailyDisk: [],
      allModeratorsWidget: {},
      isBusy: true,
      isBusyTable: true,
      loadTotalTable: true,
      fields: [
        'index',
        { label: 'Income', key: 'income', class: 'text-center' },
        { label: 'Expense', key: 'expense', class: 'text-center' },
        { label: 'WithDraw', key: 'withdraw', class: 'text-center' },
        { label: 'Visa', key: 'visa', class: 'text-center' },
        { label: 'Cash', key: 'cash', class: 'text-center' },
        { label: 'NetProfit', key: 'netprofitwithdraw', class: 'text-center' }
      ],
      dateRange: {
        startDate: new Date(),
        endDate: new Date()
      },
      options: {
        centeredSlides: false,
        loop: true,
        slidesPerView: 1,
        autoplay: {
          delay: 4000
        },
        spaceBetween: 30,
        breakpoints: {
          320: {
            slidesPerView: 1
            // spaceBetween: 10
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 1
            // spaceBetween: 15
          },
          // when window width is >= 640px
          640: {
            slidesPerView: 1
            // spaceBetween: 20
          },
          768: {
            slidesPerView: 1
            // spaceBetween: 20
          },
          1024: {
            slidesPerView: 2
            // spaceBetween: 20
          }
        },
        pagination: {
          el: '.swiper-pagination'
        },

        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },

        // And if we need scrollbar
        scrollbar: {
          el: '.swiper-scrollbar'
        }
      },
      config: {
        dateFormat: 'Y-m-d',
        inline: true,
        locale: english
      },
      arConfig: {
        dateFormat: 'Y-m-d',
        inline: true,
        locale: Arabic
      },
      chart1: {
        chart: {
          height: 80,
          type: 'area',
          sparkline: {
            enabled: true
          },
          group: 'sparklines'

        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: 3,
          curve: 'smooth'
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.5,
            opacityTo: 0
          }
        },
        series: [{
          name: 'series1',
          data: [60, 15, 50, 30, 70]
        }],
        colors: ['#0084ff'],

        xaxis: {
          type: 'datetime',
          categories: ['2018-08-19T00:00:00', '2018-09-19T01:30:00', '2018-10-19T02:30:00', '2018-11-19T01:30:00',
            '2018-12-19T01:30:00'
          ]
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          }
        }
      },
      chart2: {
        chart: {
          height: 80,
          type: 'area',
          sparkline: {
            enabled: true
          },
          group: 'sparklines'

        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: 3,
          curve: 'smooth'
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.5,
            opacityTo: 0
          }
        },
        series: [{
          name: 'series1',
          data: [70, 40, 60, 30, 60]
        }],
        colors: ['#ffd400'],
        xaxis: {
          type: 'datetime',
          categories: ['2018-08-19T00:00:00', '2018-09-19T01:30:00', '2018-10-19T02:30:00', '2018-11-19T01:30:00',
            '2018-12-19T01:30:00'
          ]
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          }
        }
      },
      chart3: {
        chart: {
          height: 80,
          type: 'area',
          sparkline: {
            enabled: true
          },
          group: 'sparklines'

        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: 3,
          curve: 'smooth'
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.5,
            opacityTo: 0
          }
        },
        series: [{
          name: 'series1',
          data: [60, 40, 60, 40, 70]
        }],
        colors: ['#00ca00'],

        xaxis: {
          type: 'datetime',
          categories: ['2018-08-19T00:00:00', '2018-09-19T01:30:00', '2018-10-19T02:30:00', '2018-11-19T01:30:00',
            '2018-12-19T01:30:00'
          ]
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          }
        }
      },
      chart4: {
        chart: {
          height: 80,
          type: 'area',
          sparkline: {
            enabled: true
          },
          group: 'sparklines'

        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: 3,
          curve: 'smooth'
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.5,
            opacityTo: 0
          }
        },
        series: [{
          name: 'series1',
          data: [75, 30, 60, 35, 60]
        }],
        colors: ['#e64141'],
        xaxis: {
          type: 'datetime',
          categories: ['2018-08-19T00:00:00', '2018-09-19T01:30:00', '2018-10-19T02:30:00', '2018-11-19T01:30:00',
            '2018-12-19T01:30:00'
          ]
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          }
        }
      },
      chart5: {
        chart: {
          height: 200,
          type: 'line',
          sparkline: {
            enabled: true
          },
          stacked: false
        },
        stroke: {
          width: [2, 3],
          curve: 'smooth',
          dashArray: [0, 5]
        },
        plotOptions: {
          bar: {
            columnWidth: '50%'
          }
        },
        colors: ['#00ca00', '#007bff'],
        series: [{
          name: 'Vine',
          type: 'area',
          data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
        }, {
          name: 'Dribbble',
          type: 'line',
          data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
        }],
        fill: {
          opacity: [0.2, 1],
          gradient: {
            inverseColors: false,
            shade: 'light',
            type: 'vertical',
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100]
          }
        },
        labels: ['01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003', '05/01/2003', '06/01/2003', '07/01/2003',
          '08/01/2003', '09/01/2003', '10/01/2003', '11/01/2003'
        ],
        markers: {
          size: 0
        },
        xaxis: {
          type: 'datetime'
        },
        yaxis: {
          min: 0
        },
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            formatter: function (y) {
              if (typeof y !== 'undefined') {
                return y.toFixed(0) + ' views'
              }
              return y
            }
          }
        },
        legend: {
          labels: {
            useSeriesColors: true
          },
          markers: {
            customHTML: [
              function () {
                return ''
              },
              function () {
                return ''
              },
              function () {
                return ''
              }
            ]
          }
        }
      },
      chart6: {
        chart: {
          height: 400,
          type: 'bar',
          sparkline: {
            show: false
          },
          toolbar: {
            show: false
          }
        },
        colors: ['#0084ff', '#ffd400'],
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '30%',
            endingShape: 'rounded'
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: false,
          width: 5,
          colors: ['#ffffff']
        },
        series: [{
          name: 'Mobile',
          enabled: 'true',
          data: [44, 90, 90, 60, 115]
        }, {
          name: 'Desktop',
          data: [35, 80, 100, 70, 95]
        }],
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
      chart7: {
        chart: {
          height: 112,
          type: 'area',
          animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
              speed: 1000
            }
          },
          toolbar: {
            show: false
          },
          sparkline: {
            enabled: true
          },
          group: 'sparklines'
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
          width: 3
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.5,
            opacityTo: 0
          }
        },
        series: [{
          data: []
        }],
        colors: ['#0084ff'],
        markers: {
          size: 0
        },
        xaxis: {
          type: 'datetime',
          range: 777600000
        },
        yaxis: {
          labels: {
            minWidth: 34
          },
          max: 100
        },
        legend: {
          show: false
        }
      },
      chart8: {
        chart: {
          height: 112,
          type: 'area',
          animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
              speed: 1000
            }
          },
          toolbar: {
            show: false
          },
          sparkline: {
            enabled: true
          },
          group: 'sparklines'
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
          width: 3
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.5,
            opacityTo: 0
          }
        },
        series: [{
          data: []
        }],
        colors: ['#00ca00'],
        markers: {
          size: 0
        },
        xaxis: {
          type: 'datetime',
          range: 777600000
        },
        yaxis: {
          labels: {
            minWidth: 34
          },
          max: 100
        },
        legend: {
          show: false
        }
      },
      usersList: [{
        name: 'Anna Sthesia',
        role: 'Admin',
        image: require('../../assets/images/user/user-01.jpg'),
        link: '',
        isActive: true
      },
      {
        name: 'Paul Molive',
        role: 'User',
        image: require('../../assets/images/user/user-02.jpg'),
        link: '',
        isActive: false
      },
      {
        name: 'Bob Frapples',
        role: 'Auther',
        image: require('../../assets/images/user/user-03.jpg'),
        link: '',
        isActive: true
      },
      {
        name: 'Barb Ackue',
        role: 'Editor',
        image: require('../../assets/images/user/user-04.jpg'),
        link: '',
        isActive: true
      },
      {
        name: 'Greta Life',
        role: 'User',
        image: require('../../assets/images/user/user-05.jpg'),
        link: '',
        isActive: false
      },
      {
        name: 'Ira Membrit',
        role: 'User',
        image: require('../../assets/images/user/user-06.jpg'),
        link: '',
        isActive: true
      },
      {
        name: 'Pete Sariya',
        role: 'Editor',
        image: require('../../assets/images/user/user-07.jpg'),
        link: '',
        isActive: false
      },
      {
        name: 'Anna Sthesia',
        role: 'Editor',
        image: require('../../assets/images/user/user-08.jpg'),
        link: '',
        isActive: true
      },
      {
        name: 'Paul Molive',
        role: 'Author',
        image: require('../../assets/images/user/user-09.jpg'),
        link: '',
        isActive: false
      },
      {
        name: 'Bob Frapples',
        role: 'User',
        image: require('../../assets/images/user/user10.jpg'),
        link: '',
        isActive: true
      },
      {
        name: 'Anna Sthesia',
        role: 'Admin',
        image: require('../../assets/images/user/user-01.jpg'),
        link: '',
        isActive: true
      },
      {
        name: 'Paul Molive',
        role: 'User',
        image: require('../../assets/images/user/user-02.jpg'),
        link: '',
        isActive: false
      },
      {
        name: 'Bob Frapples',
        role: 'Auther',
        image: require('../../assets/images/user/user-03.jpg'),
        link: '',
        isActive: false
      },
      {
        name: 'Barb Ackue',
        role: 'Editor',
        image: require('../../assets/images/user/user-04.jpg'),
        link: '',
        isActive: true
      },
      {
        name: 'Greta Life',
        role: 'User',
        image: require('../../assets/images/user/user-05.jpg'),
        link: '',
        isActive: true
      }
      ],
      timelineItems: [{
        color: 'primary',
        title: 'Client Login',
        right: '24 November 2019',
        description: 'Bonbon macaroon jelly beans gummi bears jelly lollipop apple',
        child: {
          type: 'img',
          items: []
        }
      },
      {
        color: 'success',
        title: 'Scheduled Maintenance',
        right: '23 November 2019',
        description: 'Bonbon macaroon jelly beans gummi bears jelly lollipop apple',
        child: {
          type: 'img',
          items: []
        }
      },
      {
        color: 'danger',
        title: 'Dev Meetup',
        right: '20 November 2019',
        description: 'Bonbon macaroon jelly <a href="">beans gummi</a> bears jelly lollipop apple',
        child: {
          type: 'img',
          items: [
            require('../../assets/images/user/user-05.jpg'),
            require('../../assets/images/user/user-06.jpg'),
            require('../../assets/images/user/user-07.jpg'),
            require('../../assets/images/user/user-08.jpg'),
            require('../../assets/images/user/user-09.jpg'),
            require('../../assets/images/user/user10.jpg')
          ]
        }
      },
      {
        color: 'primary',
        title: 'Client Call',
        right: '19 November 2019',
        description: 'Bonbon macaroon jelly beans gummi bears jelly lollipop apple',
        child: {
          type: 'img',
          items: []
        }
      },
      {
        color: 'warning',
        title: 'Mega Event',
        right: '15 November 2019',
        description: 'Bonbon macaroon jelly beans gummi bears jelly lollipop apple',
        child: {
          type: 'img',
          items: []
        }
      }
      ],
      averageList: [
        {
          title: 'AVG Impressions',
          icons: { icon: 'ri-arrow-down-line', color: 'danger' },
          number: '2.648',
          percentage: '26.84'
        },
        {
          title: 'AVG Engagements Rate',
          icons: { icon: 'ri-arrow-up-line', color: 'info' },
          number: '89.6',
          percentage: '8.64'
        },
        {
          title: 'AVG Reach',
          icons: { icon: 'ri-arrow-up-line', color: 'success' },
          number: '826',
          percentage: '0.64'
        },
        {
          title: 'AVG Transport',
          icons: { icon: 'ri-arrow-up-line', color: 'primary' },
          number: '7.55',
          percentage: '25.5'
        }
      ]
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
