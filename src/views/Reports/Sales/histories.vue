<template>
  <div>
    <div class="iq-card p-1">
      <div class="row">
        <div class="col-md-12 my-1">
          <select class="form-control"  v-model="filter.project" @change="getHistriesSalesReport">
            <option selected disabled value="">select Project...</option>
            <option v-for="(i, key) in projects" :key="key" :value="i.id">
              <span>{{i.en_title}}</span>
            </option>
          </select>
        </div>
        <div class="col-md-12 my-1">
          <select class="form-control"  v-model="filter.status_id" @change="getHistriesSalesReport">
            <option selected disabled value="">select Status...</option>
            <option v-for="(i, key) in call_Status" :key="key" :value="i.id">
              <span>{{i.title}}</span>
            </option>
          </select>
        </div>
        <div class="col-md-12 my-1">
          <date-range-picker
              class="w-100"
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
              @update="getHistriesSalesReport"
          >
          </date-range-picker>
        </div>
        <div class="col-md-1 d-flex justify-content-center align-items-center" v-if="filter.project || filter.project">
          <span class="text-danger cursor-pointer" @click="resetFilter()">Clear All</span>
        </div>
      </div>
    </div>
    <iq-card>
      <template v-slot:headerTitle>
        <h4 class="card-title">Histories</h4>
      </template>
      <template v-slot:headerAction>
        <h5>Total : {{total}}</h5>
      </template>
      <template v-slot:body>
        <div v-if="loadTable" class="text-center">
          <b-spinner small type="grow"></b-spinner>
          Loading...
        </div>
        <b-table v-else striped responsive :fields="columns" :items="salesReport" class="mb-0 table-borderless">
          <template v-slot:cell(lead)="data1">
            <router-link :to="{name:'leadProfile', params:{id:data1.item.lead_id}}">{{data1.item.lead.name}}</router-link>
          </template>
          <template v-slot:cell(date)="data">
            <span>{{data.item.date ? data.item.date.substring(0, 10) : 'ـــــــ'}}</span>
          </template>
          <template v-slot:cell(period)="data">
            <span>{{data.item.period ? data.item.period.substring(0, 10) : 'ـــــــ'}}</span>
          </template>
          <template v-slot:cell(hold)="data">
            <span>{{data.item.hold ? data.item.hold.substring(0, 10) : 'ـــــــ'}}</span>
          </template>
          <template v-slot:cell(return)="data">
            <span>{{data.item.return ? data.item.return.substring(0, 10) : 'ـــــــ'}}</span>
          </template>
          <template v-slot:cell(project)="data">
            <span :style={color:data.item.project.color}>{{data.item.project.en_title}}</span>
          </template>
          <template v-slot:cell(inquiry)="data">
            <span :style={color:data.item.inquiry.color}>{{data.item.inquiry.title}}</span>
          </template>
        </b-table>
        <b-pagination v-model="currentPage"
                      class="mt-3"
                      :total-rows="total"
                      align="right"
                      :per-page="per_page"
                      aria-controls="my-table"
                      @input="getHistriesSalesReport()"
        ></b-pagination>
      </template>
    </iq-card>
  </div>
</template>
<script>
import { core } from '../../../config/pluginInit'
import { mapGetters } from 'vuex'
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
export default {
  name: 'salesReportHistory',
  data () {
    return {
      projects: [],
      salesReport: [],
      call_Status: [],
      loadTable: true,
      currentPage: 1,
      per_page: 10,
      total: '',
      dateRange: {
        startDate: '',
        endDate: ''
      },
      filter: {
        project: '',
        userId: '',
        status_id: ''
      },
      columns: [
        { label: 'Lead', key: 'lead' },
        { label: 'Code', key: 'lead_id' },
        { label: 'Date', key: 'date' },
        { label: 'Period', key: 'period' },
        { label: 'Hold', key: 'hold' },
        { label: 'call_status', key: 'call_status.title' },
        { label: 'Return', key: 'return' },
        { label: 'Inquiry', key: 'inquiry' },
        { label: 'Period', key: 'period' },
        { label: 'Project', key: 'project' },
        { label: 'Source', key: 'source.title' },
        { label: 'Comment', key: 'comment' }
      ]
    }
  },
  methods: {
    resetFilter () {
      this.filter = {
        project: '',
        userId: '',
        call_Status: ''
      }
      this.getHistriesSalesReport()
    },
    getHistriesSalesReport () {
      if (this.$route.query.user) {
        this.loadTable = true
        this.$store.dispatch('getHistriesSalesReport', { pageNumber: this.currentPage, userId: this.$route.query.user ? this.$route.query.user : '', projectId: this.filter.project, dateFrom: this.dateRange.startDate ? new Date(this.dateRange.startDate).toJSON().slice(0, 10) : '', dateTo: this.dateRange.endDate ? new Date(this.dateRange.endDate).toJSON().slice(0, 10) : '', statusId: this.filter.status_id }).then(res => {
          this.salesReport = res.data.data.history.data
          this.currentPage = res.data.data.history.current_page
          this.per_page = res.data.data.history.per_page
          this.total = res.data.data.history.total
          this.loadTable = false
        })
      } else {
        this.$router.push({ name: 'salesReportDetails' })
      }
    }
  },
  computed: {
    ...mapGetters(['getUserProjects'])
  },
  mounted () {
    core.index()
  },
  created () {
    this.$store.dispatch('getInfoToCreateLead').then((res) => {
      this.call_Status = res.data.data.call_Status
      this.projects = res.data.data.projects
    })
    this.getHistriesSalesReport()
  },
  components: {
    DateRangePicker
  }
}
</script>
<style>

</style>
