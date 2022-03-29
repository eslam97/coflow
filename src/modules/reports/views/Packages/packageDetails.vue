<template>
  <div>
    <b-row>
<!--      <b-container fluid class="filter">
        <div class="iq-card p-1">
          <div class="row">
            <div class="col-md-3 my-1">
              <input type="text" placeholder="search by member name" class="form-control" v-model="filter.name" @input="fillTable" >
            </div>
            <div class="col-md-3 my-1">
              <select class="form-control" v-model="filter.type" @change="fillTable">
                <option selected disabled value="">select Type...</option>
                <option value="guest">guest</option>
                <option value="member">member</option>
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
                  @update="fillTable"
              >
              </date-range-picker>
            </div>
            <div class="col-md-1 d-flex justify-content-center align-items-center" v-if="filter.name || filter.type || dateRange.startDate || dateRange.endDate">
              <span class="text-danger cursor-pointer" @click="resetFilter()">Clear All</span>
            </div>
          </div>
        </div>
      </b-container>-->
      <b-col lg="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">Packages</h4>
          </template>
          <template v-slot:body>
            <div v-if="loadTable" class="text-center">
              <b-spinner small type="grow"></b-spinner>
              Loading...
            </div>
            <b-table v-else sort-icon-left primary-key="name" striped responsive :fields="columns" :items="allPackages" class="mb-0 table-borderless "  id="table-transition-example" :tbody-transition-props="transProps">
            </b-table>
            <b-pagination v-model="currentPage"
                          class="mt-3"
                          :total-rows="total"
                          align="right"
                          :per-page="per_page"
                          aria-controls="my-table"
                          @input="fillTable"
            ></b-pagination>
          </template>
        </iq-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { core } from '../../../../config/pluginInit'
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
export default {
  name: 'allPackages',
  data () {
    return {
      showPhone: '',
      transProps: {
        // Transition name
        name: 'flip-list'
      },
      filter: {
        name: '',
        type: ''
      },
      dateRange: {
        startDate: '',
        endDate: ''
      },
      currentPage: 1,
      per_page: 10,
      total: 6,
      loadTable: true,
      columns: [
        { label: 'Title', key: 'title', class: 'text-left', sortable: true },
        { label: 'Period', key: 'period', class: 'text-left', sortable: true },
        { label: 'Purchases', key: 'purchases', class: 'text-left', sortable: true },
        { label: 'Active Purchases', key: 'active_purchases', class: 'text-left', sortable: true },
        { label: 'Expire Purchases', key: 'expire_purchases', class: 'text-left', sortable: true },
        { label: 'Membership_id', key: 'membership_id', class: 'text-left', sortable: true },
        { label: 'Default Service', key: 'default_service', class: 'text-left', sortable: true },
        { label: 'Remaining', key: 'remaining', class: 'text-left', sortable: true }
      ],
      allPackages: []
    }
  },
  computed: {
  },
  methods: {
    resetFilter () {
      this.filter = {
        name: '',
        type: ''
      }
      this.filterTable()
    },
    fillTable () {
      this.loadTable = true
      this.$store.dispatch('getPackageReports', { pageNumber: this.currentPage, name: this.filter.name, type: this.filter.type, dateFrom: this.dateRange.startDate ? new Date(this.dateRange.startDate).toJSON().slice(0, 10) : '', dateTo: this.dateRange.endDate ? new Date(this.dateRange.endDate).toJSON().slice(0, 10) : '' }).then(res => {
        this.allPackages = res.data.data
        this.currentPage = res.data.meta.current_page
        this.per_page = res.data.meta.per_page
        this.total = res.data.meta.total
        this.loadTable = false
      })
    }
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    DateRangePicker
  },
  mounted () {
    core.index()
  },
  created () {
    this.fillTable()
  }
}
</script>
<style>
.nav-link.router-link-exact-active.router-link-active{
  background: var(--iq-primary) !important;
  color: #fff !important;
}
.colorSpan{
  width: 20px;
  height: 20px;
}
[dir=ltr][mode=light] .nav-tabs {
  background: #fff !important;
  border-radius: 10px !important;

  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
}
th{
  white-space: pre !important;
  vertical-align: middle !important;
}
td{
  white-space: pre !important;
  vertical-align: middle !important;
}
</style>
