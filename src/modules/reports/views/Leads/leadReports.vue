<template>
  <div>
    <b-modal id="statusHistory" size="lg" title="History" show hide-footer no-close-on-backdrop>
      <statusHistory :allHistory="history" :historyId="historyId"/>
    </b-modal>
      <div class="iq-card p-1">
        <div class="row">
          <div class="col-md-3 my-1">
            <input type="text" v-model="filter.search" placeholder="search by name or phone" class="form-control" @input="getLeadReport">
          </div>
          <div class="col-md-3 my-1">
            <select class="form-control" v-model = "filter.category" @change="getLeadReport">
              <option selected disabled value="">select Category...</option>
              <option value="old">Old</option>
              <option value="new">New</option>
              <option value="challenge">challenge</option>
              <option value="expired">Expired</option>
            </select>
          </div>
          <div class="col-md-3 my-1">
            <select class="form-control"  v-model="filter.project" @change="getLeadReport">
              <option selected disabled value="">select Project...</option>
              <option v-for="(i, key) in projects" :key="key" :value="i.id">
                <span>{{i.en_title}}</span>
              </option>
            </select>
          </div>
          <div class="col-md-3 my-1">
            <select class="form-control"  v-model="filter.source" @change="getLeadReport">
              <option selected disabled value="">select Source...</option>
              <option v-for="(i, key) in source" :key="key" :value="i.id">
                <span>{{i.title}}</span>
              </option>
            </select>
          </div>
          <div class="col-md-3 my-1">
            <select class="form-control"  v-model="filter.from" @change="getLeadReport">
              <option selected disabled value="">select From...</option>
              <option v-for="(i, key) in from" :key="key" :value="i.id">
                <span>{{i.title}}</span>
              </option>
            </select>
          </div>
          <div class="col-md-3 my-1">
            <select class="form-control"  v-model="filter.inquiry" @change="getLeadReport">
              <option selected disabled value="">select Inquiry...</option>
              <option v-for="(i, key) in inquiry" :key="key" :value="i.id">
                <span>{{i.title}}</span>
              </option>
            </select>
          </div>
          <div class="col-md-3 my-1">
            <select class="form-control"  v-model="filter.callStatusId" @change="getLeadReport">
              <option selected disabled value="">select Call Status ...</option>
              <option v-for="(i, key) in call_Status" :key="key" :value="i.id">
                <span>{{i.title}}</span>
              </option>
            </select>
          </div>
          <div class="col-md-3 my-1">
            <v-select class="w-100" label="" :options="allUserTakenBy" v-model="filter.taken_id" :filterable="false" @search="onSearchTakenBy"
                      :reduce="option => option.id"
                      placeholder="Taken By">
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
          </div>
          <div class="col-md-3 my-1">
            <v-select class="w-100" label="" :options="allUserCreatedBy" v-model="filter.user_id" :filterable="false" @search="onSearchCreatedBy"
                      :reduce="option => option.id"
                      placeholder="Created By">
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
          </div>
          <div class="col-md-3 my-1">
            <b-form-checkbox v-model="filter.noHistory" @change="getLeadReport">No History</b-form-checkbox>
          </div>
          <div class="col-md-3 my-1" v-if="filter.project">
            <select class="form-control"  v-model="filter.type" @change="getLeadReport">
              <option selected disabled value="">select type...</option>
              <option value="lead">
                <span>Lead</span>
              </option>
              <option value="member">
                <span>Member</span>
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
                              @update="getLeadReport"
            >
            </date-range-picker>
          </div>
          <div class="col-md-1 d-flex justify-content-center align-items-center" v-if="filter.search || filter.inquiry || filter.project || filter.source || filter.from || filter.callStatusId || filter.userId || filter.ifNew || filter.category">
            <span class="text-danger cursor-pointer" @click="resetFilter()">Clear All</span>
          </div>

<!--          <div class="col-md-1 d-flex justify-content-center align-items-center" v-if="filter.title || filter.status">
            <span class="text-danger cursor-pointer" @click="resetFilter()">Clear All</span>
          </div>-->
        </div>
      </div>
      <iq-card>
        <template v-slot:headerTitle>
          <h4 class="card-title">Lead</h4>
        </template>
        <template v-slot:headerAction>
          <h5>Total : {{total}}</h5>
        </template>
        <template v-slot:body>
          <div v-if="loadTable" class="text-center">
            <b-spinner small type="grow"></b-spinner>
            Loading...
          </div>
          <b-table v-else striped responsive :fields="columns" :items="leadReport" class="mb-0 table-borderless">
            <template v-slot:cell(name)="data1">
              <router-link :to="{name:'leadProfile', params:{id:data1.item.id}}">{{data1.item.name}}</router-link>
            </template>
            <template v-slot:cell(phone)="data1">
              <p class="holdSelection" v-if="data1.item.id==showPhone">{{data1.item.lead.phone}}</p>
              <b-button v-else variant=" iq-bg-success mr-1 mb-1" size="sm" :id="data1.item.id" @click="showPhone = data1.item.id" ><i class="las la-mobile"></i>Show Phone</b-button>
            </template>
            <template v-slot:cell(project)="data">
              <span :style={color:data.item.project.color}>{{data.item.project.en_title}}</span>
            </template>
            <template v-slot:cell(inquiry)="data">
              <span :style={color:data.item.inquiry.color}>{{data.item.inquiry.title}}</span>
            </template>
            <template v-slot:cell(history)="data1">
              <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="showHistory(data1.item.lead.id)" ><i
                  class="las la-history"></i> Show History</b-button>
            </template>
            <template v-slot:cell(created_at)="data">
              <span>{{timeConvert(data.item.created_at)}}</span>
            </template>
          </b-table>
          <b-pagination v-model="currentPage"
                        class="mt-3"
                        :total-rows="total"
                        align="right"
                        :per-page="per_page"
                        aria-controls="my-table"
                        @input="getLeadReport()"
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
const statusHistory = () => import('../../../../components/statusHistory/statusHistory')
export default {
  name: 'laedReports',
  data () {
    return {
      history: [],
      historyId: '',
      leadReport: [],
      loadTable: true,
      showPhone: '',
      currentPage: 1,
      per_page: 10,
      total: '',
      dateRange: {
        startDate: '',
        endDate: ''
      },
      allUserTakenBy: [],
      allUserCreatedBy: [],
      columns: [
        { label: 'Name', key: 'lead.name', class: 'text-left' },
        { label: 'Code', key: 'lead.id', class: 'text-left' },
        { label: 'Type', key: 'type', class: 'text-left' },
        { label: 'Phone', key: 'phone', class: 'text-left' },
        { label: 'Category', key: 'category', class: 'text-left' },
        { label: 'Hold To', key: 'hold_to', class: 'text-left' },
        { label: 'Project', key: 'project', class: 'text-left' },
        { label: 'Source', key: 'source.title', class: 'text-left' },
        { label: 'From', key: 'from.title', class: 'text-left' },
        { label: 'Inquiry', key: 'inquiry', class: 'text-left' },
        { label: 'Call Status', key: 'call_status.title', class: 'text-left' },
        { label: 'Created By', key: 'user.name', class: 'text-left' },
        { label: 'Taken By', key: 'taken_by.name', class: 'text-left' },
        { label: 'Created At', key: 'created_at', class: 'text-left' },
        { label: 'History', key: 'history', class: 'text-left' }
      ],
      call_Status: [],
      from: [],
      inquiry: [],
      projects: [],
      source: [],
      filter: {
        type: '',
        search: '',
        project: '',
        userId: '',
        callStatusId: '',
        inquiry: '',
        source: '',
        from: '',
        ifNew: '',
        category: '',
        noHistory: '',
        taken_id: '',
        user_id: ''
      }
    }
  },
  methods: {
    onSearchCreatedBy (data, loading) {
      if (data.length) {
        loading(true)
        this.$store.dispatch('serachAboutUser', { user: data, permissions: ['sales.lead.create'] }).then(res => {
          this.allUserCreatedBy = res.data.data
          loading(false)
        }).catch(() => {
          loading(false)
        })
      }
    },
    onSearchTakenBy (data, loading) {
      if (data.length) {
        loading(true)
        this.$store.dispatch('serachAboutUser', { user: data, permissions: ['sales.lead.create'] }).then(res => {
          this.allUserTakenBy = res.data.data
          loading(false)
        }).catch(() => {
          loading(false)
        })
      }
    },
    showHistory (id) {
      // console.log(id)
      this.historyId = id
      this.$store.dispatch('gitHistory', { id: id, pageNumber: 1 }).then(res => {
        this.history = res.data.data.data
        this.$bvModal.show('statusHistory')
      })
    },
    resetFilter () {
      this.filter = {
        search: '',
        project: '',
        userId: '',
        callStatusId: '',
        inquiry: '',
        source: '',
        from: '',
        ifNew: '',
        category: ''
      }
      this.getLeadReport()
    },
    getLeadReport () {
      this.loadTable = true
      this.$store.dispatch('getLeadReport', {
        pageNumber: this.currentPage,
        search: this.filter.search,
        project: this.filter.project,
        userId: this.filter.userId,
        callStatusId: this.filter.callStatusId,
        inquiry: this.filter.inquiry,
        source: this.filter.source,
        from: this.filter.from,
        dateFrom: this.dateRange.startDate ? new Date(this.dateRange.startDate).toJSON().slice(0, 10) : '',
        dateTo: this.dateRange.endDate ? new Date(this.dateRange.endDate).toJSON().slice(0, 10) : '',
        ifNew: this.filter.noHistory ? 1 : 0,
        category: this.filter.category,
        noHistory: this.filter.noHistory ? 1 : 0,
        userid: this.filter.user_id,
        takenId: this.filter.taken_id,
        type: this.filter.type
      }).then(res => {
        this.leadReport = res.data.data.lead.data
        this.currentPage = res.data.data.lead.current_page
        this.per_page = res.data.data.lead.per_page
        this.total = res.data.data.lead.total
        this.loadTable = false
      })
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
      this.from = res.data.data.from
      this.inquiry = res.data.data.inquiry
      this.projects = res.data.data.projects
      this.source = res.data.data.source
    })
    this.getLeadReport()
  },
  watch: {
    'filter.user_id' () {
      this.getLeadReport()
    },
    'filter.taken_id' () {
      this.getLeadReport()
    }
  },
  components: {
    statusHistory,
    DateRangePicker
  }
}
</script>
<style>

</style>
