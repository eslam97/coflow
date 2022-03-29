<template>
  <div>
    <div class="iq-card p-1">
      <div class="row">
        <div class="col-md-12 my-1">
          <select class="form-control"  v-model="filter.project" @change="getContractsSalesReport">
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
              @update="getContractsSalesReport"
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
        <h4 class="card-title">Contracts</h4>
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
          <template v-slot:cell(member)="data1">
            <router-link :to="{name:'profile', params:{id:data1.item.member.id}}">{{data1.item.member.name}}</router-link>
          </template>
          <template v-slot:cell(project)="data">
            <span :style={color:data.item.project.color}>{{data.item.project.en_title}}</span>
          </template>
          <template v-slot:cell(created_at)="data">
            <span>{{data.item.created_at.substring(0, 10)}}</span>
          </template>
          <template v-slot:cell(ContractPackages)="data">
            <ul class="m-0 p-0">
              <li v-for="(i, key) in data.item.ContractPackages" :key="key">
                <span v-if="i.available" class="text-success"><i class="las la-check-circle"></i></span>
                <span v-else class="text-danger"><i class="las la-times-circle"></i></span>
                {{i.package_title}}
              </li>
            </ul>
          </template>
        </b-table>
        <b-pagination v-model="currentPage"
                      class="mt-3"
                      :total-rows="total"
                      align="right"
                      :per-page="per_page"
                      aria-controls="my-table"
                      @input="getContractsSalesReport()"
        ></b-pagination>
      </template>
    </iq-card>
  </div>
</template>
<script>
import { core } from '../../../../config/pluginInit'
import { mapGetters } from 'vuex'
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
export default {
  name: 'salesReportContract',
  data () {
    return {
      projects: [],
      salesReport: [],
      loadTable: true,
      currentPage: 1,
      per_page: 10,
      total: '',
      dateRange: {
        startDate: this.$route.query.startDate || '',
        endDate: this.$route.query.endDate || ''
      },
      filter: {
        project: this.$route.query.project || '',
        userId: ''
      },
      columns: [
        { label: 'Member', key: 'member' },
        { label: 'Code', key: 'lead.id' },
        { label: 'Sales', key: 'sales.name' },
        { label: 'Project', key: 'project' },
        { label: 'Package / Service', key: 'ContractPackages' },
        { label: 'Created At', key: 'created_at' }
      ]
    }
  },
  methods: {
    resetFilter () {
      this.filter = {
        project: '',
        userId: ''
      }
      this.getContractsSalesReport()
    },
    getContractsSalesReport () {
      if (this.$route.query.user) {
        this.loadTable = true
        this.$store.dispatch('getContractsSalesReport', { pageNumber: this.currentPage, userId: this.$route.query.user ? this.$route.query.user : '', projectId: this.filter.project, dateFrom: this.dateRange.startDate ? new Date(this.dateRange.startDate).toJSON().slice(0, 10) : '', dateTo: this.dateRange.endDate ? new Date(this.dateRange.endDate).toJSON().slice(0, 10) : '' }).then(res => {
          this.salesReport = res.data.data.leads.data
          this.currentPage = res.data.data.leads.current_page
          this.per_page = res.data.data.leads.per_page
          this.total = res.data.data.leads.total
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
      this.projects = res.data.data.projects
    })
    this.getContractsSalesReport()
  },
  components: {
    DateRangePicker
  }
}
</script>
<style>

</style>
