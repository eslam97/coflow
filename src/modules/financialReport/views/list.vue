<template>
  <b-row>
    <b-col lg='12'>
      <div class="iq-card p-1">
        <b-tabs content-class="" align="left">
          <b-tab title="Income" @click="type='income'">
          </b-tab>
          <b-tab title="Withdraw" @click="type='withdraw'">
          </b-tab>
          <b-tab title="Transfer" @click="type='transfer'">
          </b-tab>
          <b-tab title="Expense" @click="type='expense'">
          </b-tab>
          <b-tab title="Refund" @click="type='refund'">
          </b-tab>
        </b-tabs>
      </div>
    </b-col>
    <b-col>
      <div class="iq-card p-1">
        <div class="row">
          <div class="col-md-4 my-1">
            <select class="form-control" v-model="filter.project_id" @change="getFinancialReport">
              <option selected disabled value="">select Project...</option>
              <option v-for="(i, key) in projects" :key="key" :value="i.id">
                <span>{{i.en_title}}</span>
              </option>
            </select>
          </div>
          <div class="col-md-4 my-1">
            <select class="form-control" v-model="filter.category_id" @change="getFinancialReport">
              <option selected disabled value="">select Category...</option>
              <option v-for="(i, key) in allCategories" :key="key" :value="i.id">
                <span>{{i.title}}</span>
              </option>
            </select>
          </div>
          <div class="col-md-4 my-1">
            <select class="form-control" v-model="filter.safe_type" @change="getFinancialReport">
              <option selected disabled value="">select safe type...</option>
              <option value="branch">Branch</option>
              <option value="accountant">Accountant</option>
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
                :linkedCalendars=true
                customRangeLabel= 'Custom Range'
                v-model="dateRange"
                @update="getFinancialReport()"
            >
            </date-range-picker>
            <div class="col-md-1 d-flex justify-content-center align-items-center" v-if="filter.project_id || filter.safe_type || filter.category_id || dateRange.startDate|| dateRange.endDate ">
              <span class="text-danger cursor-pointer" @click="resetFilter()">Clear All</span>
            </div>
          </div>
        </div>
      </div>
    </b-col>
    <b-col lg='12'>
      <iq-card>
        <template v-slot:headerTitle>
          <h4 class="card-title">{{type}} Report</h4>
        </template>
        <template v-slot:headerAction>
          <h4> <b-badge pill :variant="'primary'">{{ totalRows }} L.E</b-badge></h4>
        </template>
        <template v-slot:body>
          <div v-if="loadTable" class="text-center">
            <b-spinner small type="grow"></b-spinner>
            Loading...
          </div>
          <b-table v-else striped responsive :fields="columns" :items="allReportData" class="mb-0 table-borderless">
            <template v-slot:cell(created_at)="data1">
              <p class="holdSelection">{{timeConvert(data1.item.created_at)}}</p>
            </template>
          </b-table>
          <b-pagination v-model="pagination.currentPage"
                        class="mt-3"
                        :total-rows="pagination.total"
                        align="right"
                        :per-page="pagination.per_page"
                        aria-controls="my-table"
                        @input="getFinancialReport"
          ></b-pagination>
        </template>
      </iq-card>
    </b-col>
  </b-row>
</template>
<script>
import { core } from '@/config/pluginInit'
import financialReport from '@/modules/financialReport/services/report'
export default {
  name: 'financialReport',
  data () {
    return {
      columns: [
        { label: 'User Name', key: 'user.name', class: 'text-left' },
        { label: 'Member Name', key: 'member.name', class: 'text-left' },
        { label: 'Project', key: 'project.en_title', class: 'text-left' },
        { label: 'Amount', key: 'amount', class: 'text-left' },
        { label: 'Method', key: 'method', class: 'text-left' },
        { label: 'Created At', key: 'created_at', class: 'text-left' },
        { label: 'category', key: 'category.title', class: 'text-left' }
      ],
      pagination: {
        currentPage: 1,
        per_page: 10,
        total: 6
      },
      type: 'income',
      totalRows: 0,
      allCategories: [],
      allReportData: [],
      loadTable: false,
      dateRange: {
        startDate: '',
        endDate: ''
      },
      projects: JSON.parse(localStorage.getItem('user_projects')),
      filter: {
        project_id: '',
        category_id: '',
        safe_type: ''
      }
    }
  },
  watch: {
    type () {
      this.getFinancialReport()
      this.showThirdLevel()
      this.resetFilter()
    }
  },
  computed: {
  },
  methods: {

    // Show Page Data
    getFinancialReport () {
      this.loadTable = true
      this.allReportData = []
      this.totalRows = 0
      financialReport.getFinancialReportDetails({
        type: this.type,
        page: this.pagination.currentPage,
        dateFrom: this.dateRange.startDate ? new Date(this.dateRange.startDate).toJSON().slice(0, 10) : '',
        dateTo: this.dateRange.endDate ? new Date(this.dateRange.endDate).toJSON().slice(0, 10) : '',
        projectId: this.filter.project_id,
        categoryId: this.filter.category_id,
        safeType: this.filter.safe_type
      }).then(res => {
        this.allReportData = res.data.data.data.data
        this.pagination.currentPage = res.data.data.data.current_page
        this.pagination.per_page = res.data.data.data.per_page
        this.pagination.total = res.data.data.data.total
        this.totalRows = res.data.data.total
      }).catch(err => {
        core.showSnackbar('error', err.response.data.error)
      }).finally(() => {
        this.loadTable = false
      })
    },

    // get Data
    showThirdLevel () {
      this.$store.dispatch('getThirdCategories', this.type).then(res => {
        this.allCategories = res.data.data
      })
    },

    // reset Filter
    resetFilter () {
      this.filter = {
        project_id: '',
        category_id: '',
        safe_type: ''
      }
      this.dateRange = {
        startDate: '',
        endDate: ''
      }
      this.getFinancialReport()
    }
  },
  components: {
  },
  created () {
    this.getFinancialReport()
    this.showThirdLevel()
  },
  mounted () {
    core.index()
  }
}
</script>
