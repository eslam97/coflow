<template>
  <div>
    <div class="iq-card p-1">
      <div class="row">
<!--        <v-select @change="serachAboutUser"
            :options="allDetailsPackage" v-model="selectPackage" label="package_title" required
                  :selectable="option => !allDetailsPackage.includes(option.id)"
                  @option:selecting="getUserInfo"></v-select> -->
        <v-select class="col-md-12 my-1" label="" :options="allUsers" v-model="filter.user" :filterable="false" @search="onSearch"
                  :reduce="option => option.id">
          <template slot="no-options">
            type to search about users...
          </template>
          <template slot="option" slot-scope="option">
            <div class="d-center">
              {{ option.name }}
            </div>
          </template>
          <template slot="selected-option" slot-scope="option">
            <div class="selected d-center">
              {{ option.name }}
            </div>
          </template>
        </v-select>
        <div class="col-md-12 my-1">
          <select class="form-control"  v-model="filter.project" @change="getSalesReport">
            <option selected disabled value="">select Project...</option>
            <option v-for="(i, key) in projects" :key="key" :value="i.id">
              <span>{{i.en_title}}</span>
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
              @update="getSalesReport"
          >
          </date-range-picker>
        </div>
        <div class="col-md-1 d-flex justify-content-center align-items-center" v-if="filter.project || filter.project || filter.user ">
          <span class="text-danger cursor-pointer" @click="resetFilter()">Clear All</span>
        </div>
      </div>
    </div>
    <iq-card>
      <template v-slot:headerTitle>
        <h4 class="card-title">Sales</h4>
      </template>
      <template v-slot:headerAction>
        <h5>Total : {{total}}</h5>
      </template>
      <template v-slot:body>
        <div v-if="loadTable" class="text-center">
          <b-spinner small type="grow"></b-spinner>
          Loading...
        </div>
        <b-table v-else striped responsive   :fields="columns" :items="salesReport" class="mb-0 table-borderless" select-mode="single" ref="selectableTable" sort-icon-left primary-key="name"  id="table-transition-example" :tbody-transition-props="transProps">
          <template v-slot:cell(is_online)="data">
            <b-badge pill :variant="data.item.is_online?'success':'secondary'">{{ data.item.is_online?'online':'offline' }}</b-badge>
          </template>
<!--          <template v-slot:cell(call_amount)="data">
            <router-link class="linkedReport"
                         :to="{
                                name: 'salesReportHistories',
                                query:
                                     {
                                       user : data.item.id,
                                       project: filter.project,
                                       startDate: new Date(dateRange.startDate).toJSON().slice(0, 10),
                                       endDate: new Date(dateRange.endDate).toJSON().slice(0, 10)
                                     }
                         }"
            >
              <b-badge variant="info">{{ data.item.call_amount}}</b-badge>
            </router-link>
          </template>
          <template v-slot:cell(contract_amount)="data">
            <router-link class="linkedReport" :to="{name: 'salesReportContracts', query:{
                                       user : data.item.id,
                                       project: filter.project,
                                       startDate: new Date(dateRange.startDate).toJSON().slice(0, 10),
                                       endDate: new Date(dateRange.endDate).toJSON().slice(0, 10)
                                     }}"><b-badge variant="pink">{{ data.item.contract_amount}}</b-badge></router-link>
          </template>
          <template v-slot:cell(payable_amount)="data">
            <router-link class="linkedReport" :to="{name: 'salesReportPayable', query:{
                                       user : data.item.id,
                                       project: filter.project,
                                       startDate: new Date(dateRange.startDate).toJSON().slice(0, 10),
                                       endDate: new Date(dateRange.endDate).toJSON().slice(0, 10)
                                     }}"><b-badge variant="amber">{{ data.item.payable_amount}}</b-badge></router-link>
          </template>
          <template v-slot:cell(leads_reserved)="data">
            <router-link class="linkedReport" :to="{name: 'salesLeadsReserved', query:{
                                       user : data.item.id,
                                       project: filter.project,
                                       startDate: new Date(dateRange.startDate).toJSON().slice(0, 10),
                                       endDate: new Date(dateRange.endDate).toJSON().slice(0, 10)
                                     }}"><b-badge variant="amber">{{ data.item.leads_reserved}}</b-badge></router-link>
          </template>
          <template v-slot:cell(achieved_amount)="data">
            <router-link class="linkedReport" :to="{name: 'salesReportAchieved', query:{
                                       user : data.item.id,
                                       project: filter.project,
                                       startDate: new Date(dateRange.startDate).toJSON().slice(0, 10),
                                       endDate: new Date(dateRange.endDate).toJSON().slice(0, 10)
                                     }}">
              <b-badge variant="danger">{{ data.item.achieved_amount}}</b-badge>
            </router-link>
          </template>-->
        </b-table>
        <b-pagination v-model="currentPage"
                      class="mt-3"
                      :total-rows="total"
                      align="right"
                      :per-page="per_page"
                      aria-controls="my-table"
                      @input="getSalesReport()"
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
  name: 'salesReportDetails',
  data () {
    return {
      transProps: {
        name: 'flip-list'
      },
      selectedRow: '',
      projects: [],
      salesReport: [],
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
        user: ''
      },
      allUsers: [],
      columns: [
        { label: 'Name', key: 'name', sortable: true },
        { label: 'Call Amount', key: 'call_amount', sortable: true },
        { label: 'Contract Amount', key: 'contract_amount', sortable: true },
        { label: 'Is Online', key: 'is_online', sortable: true },
        { label: 'Leads Reserved', key: 'leads_reserved', sortable: true },
        { label: 'Payable Amount', key: 'payable_amount', sortable: true },
        { label: 'Achieved Amount', key: 'achieved_amount', sortable: true },
        { label: 'Classification', key: 'commission_on.sales_details.appreciation', class: 'text-center' },
        { label: 'Commission', key: 'commission_on.sales_details.commission', class: 'text-center' },
        { label: 'Financial Dues', key: 'commission_on.sales_details.financial_dues', class: 'text-center' }
      ]
    }
  },
  watch: {
    selectedRow (id) {
      this.$store.commit('setUserIdInSalesReport', id)
    },
    'filter.user' (value) {
      this.getSalesReport()
    }
  },
  methods: {
    onSearch (data, loading) {
      if (data.length) {
        loading(true)
        this.$store.dispatch('serachAboutUser', { user: data, permissions: ['sales.lead.create'] }).then(res => {
          this.allUsers = res.data.data
          loading(false)
        }).catch(() => {
          loading(false)
        })
      }
    },
    resetFilter () {
      this.filter = {
        project: '',
        userId: '',
        user: ''
      }
      this.getSalesReport()
    },
    getSalesReport () {
      this.loadTable = true
      this.$store.dispatch('getSalesReport', { user: this.filter.user, pageNumber: this.currentPage, userId: this.filter.userId, projectId: this.filter.project, dateFrom: this.dateRange.startDate ? new Date(this.dateRange.startDate).toJSON().slice(0, 10) : '', dateTo: this.dateRange.endDate ? new Date(this.dateRange.endDate).toJSON().slice(0, 10) : '' }).then(res => {
        this.salesReport = res.data.data.sales.data
        this.currentPage = res.data.data.sales.current_page
        this.per_page = res.data.data.sales.per_page
        this.total = res.data.data.sales.total
        this.loadTable = false
      })
    },
    onRowSelected (items) {
      this.selectedRow = items[0].id
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
      this.projects = res.data.data.projects
    })
    this.$store.commit('setUserIdInSalesReport', false)
    this.getSalesReport()
  },
  components: {
    DateRangePicker
  }
}
</script>
<style>
.linkedReport {
  text-decoration: underline !important;
  cursor: pointer !important
}
</style>
