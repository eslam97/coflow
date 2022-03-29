<template>
  <b-container fluid>
    <!--Start All Modals -->
    <b-modal id="changeStatus" size="lg" title="Change Status" hide-footer no-close-on-backdrop>
      <b-row class="d-flex flex-wrap" >
        <b-col v-for="(status, key) in allStatus" :key="key" class="col-3 text-black text-center mb-3 cursor-pointer" >
           <span
               :class="[{ 'shadow bg-primary text-white' : isSelected(status.id)},'d-inline-block w-100 p-1 custom-rounded  primary-color ']" @click="selectedStatusId = status.id">
            <i  :class="[{ 'las la-check-square' : isSelected(status.id)}]"></i> {{status.title}}
          </span>
          <span  class="d-block w-100 h-10 bg-white"></span>
          <span :style="[{ backgroundColor:status.color }]" class="d-block w-100 h-10">
          </span>
        </b-col>
      </b-row>
      <div class="mt-2">
        <b-form-textarea
            id="textarea-rows"
            placeholder="Comments..."
            rows="2"
            v-model="comment"
        ></b-form-textarea>
      </div>
      <div class="d-flex justify-content-center mt-2">
        <b-button v-if='saveButton' class="btn btn-primary float-right" variant="primary" disabled>
          <spinner-loading text = 'Loading' />
        </b-button>
        <b-button variant="primary" v-else class="w-50" @click="saveEditStatus">Save</b-button>
      </div>
    </b-modal>
    <b-modal id="addComments"  size="lg"  centered title="Add Comment" hide-footer no-close-on-backdrop>
      <div class="mt-2">
        <b-form-textarea
            id="textarea-rows"
            placeholder="Comments..."
            rows="2"
            v-model="addcomment"
        ></b-form-textarea>
      </div>
      <div class="d-flex justify-content-center mt-2">
        <b-button v-if='saveButton' class="btn btn-primary float-right" variant="primary" disabled>
          <spinner-loading text = 'Loading' />
        </b-button>
        <b-button v-else variant="primary" class="w-25 ml-1" @click="saveComment()"> Save </b-button>
      </div>
    </b-modal>
    <b-modal id="statusHistory" size="lg" title="History" show hide-footer no-close-on-backdrop>
      <statusHistory :allHistory="history" :historyId="historyId"/>
    </b-modal>
    <b-modal id="addStatusAndComments"  size="lg" v-if="leadDetails&&leadDetails.data"  centered hide-header-close no-close-on-esc  no-close-on-backdrop  hide-footer>
      <div class="d-flex justify-content-between">
        <h5> {{leadDetails.data.lead.name }}</h5>
        <h6>{{ leadDetails.data.lead.phone }}</h6>
        <span :style="{'color': leadDetails.data.project.color}">{{ leadDetails.data.project.en_title }}</span>
        <span v-if="leadDetails.data.membership_status"> {{leadDetails.data.membership_status}}</span>
        <span v-else>-------</span>
      </div>
      <p v-if="leadDetails.data.comment"><span class="text-danger">Note: </span> <span>{{leadDetails.data.comment}}</span></p>
      <div class="border border-dark" style="padding: 10px;border: 1px solid #cbcbcb !important;margin-bottom: 16px;">
        <statusHistory :allHistory="history" :historyId="historyId"/>
      </div>
      <div class="d-flex px-3 row flex-wrap">
        <b-col  v-for="(status, key) in allStatus" :key="key" class="col-3 text-black text-center mb-3 cursor-pointer" >
          <span
              :class="[{ 'shadow bg-primary text-white' : isSelected(status.id)},'d-inline-block w-100 p-1 custom-rounded  primary-color ']" @click="selectedStatusId = status.id">
            <i  :class="[{ 'las la-check-square' : isSelected(status.id)}]"></i> {{status.title}}
          </span>
          <span  class="d-block w-100 h-10 bg-white"></span>
          <span :style="[{ backgroundColor:status.color }]" class="d-block w-100 h-10">
          </span>
        </b-col>
      </div>
      <div class="mt-2">
        <b-form-textarea
            id="textarea-rows"
            placeholder="Comments..."
            rows="2"
            v-model="comment"
        ></b-form-textarea>
      </div>
      <div class="d-flex justify-content-center mt-2">
        <b-button variant="danger" class="w-25 mr-1" @click="endCall()"> End Call </b-button>
        <b-button v-if='saveButton' class="btn btn-primary float-right" variant="primary" disabled>
          <spinner-loading text = 'Loading' />
        </b-button>
        <b-button v-else variant="primary" class="w-25 ml-1" @click="saveStatus(leadDetails.data.id)"> Save </b-button>
      </div>
    </b-modal>
    <b-modal id="addReminder"  size="lg"  centered title="Reminder" hide-footer no-close-on-backdrop>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(saveReminder)">
          <b-row>
            <b-form-group class="col-md-12" label="Data:" label-for="date">
              <ValidationProvider name="date" ref="date" :rules="'required'" v-slot="{ errors }">
                <b-form-input v-model="reminder.date" type="date" placeholder="date" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                <div class="invalid-feedback">
                  <span>{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
            </b-form-group>
            <b-form-group class="col-md-12" label="Time:" label-for="time">
              <ValidationProvider name="time" ref="time" :rules="'required'" v-slot="{ errors }">
                <b-form-input v-model="reminder.time" type="time" step="1"  placeholder="time" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                <div class="invalid-feedback">
                  <span>{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
            </b-form-group>
            <b-form-group  class="col-md-12">
              <b-form-textarea
                  id="textarea-rows"
                  placeholder="description..."
                  rows="2"
                  v-model="reminder.description"
              ></b-form-textarea>
            </b-form-group>
          </b-row>
          <div class="d-flex align-items-center justify-content-end">
            <b-button v-if='loadingReminder' class="btn btn-primary float-right" variant="primary" disabled>
              <spinner-loading text = 'Loading' />
            </b-button>
            <b-button v-else variant="primary" type="submit" >Save</b-button>
          </div>
        </form>
      </ValidationObserver>

    </b-modal>
    <b-modal size="lg" id="modalAddLeadWithStatus" hide-footer no-close-on-backdrop>
      <addLeadModelStatus :allStatus="allStatus" :allFeatures="allFeatures"  @refresh="refreshTable"/>
    </b-modal>
    <!--End All Modals -->

    <!--Start Content Page -->
    <b-row>
      <b-col lg="12">
        <iq-card class="mb-2" v-if="leadDetails&&leadDetails.data">
          <div class="row py-2">
            <div class="col-md-3 text-center align-items-center">
              <p class="text-black font-weight-bold m-0 mb-1">Name</p>
              <p class="m-0">{{ leadDetails.data.lead.name }}</p>
            </div>
            <div class="col-md-3 text-center">
              <p class="text-black font-weight-bold m-0 mb-1">Phone</p>
              <p class="m-0">{{ leadDetails.data.lead.phone }}</p>
            </div>
            <div class="col-md-3 text-center">
              <p class="text-black font-weight-bold m-0 mb-1">Project</p>
              <p class="m-0">{{ leadDetails.data.project.en_title }}</p>
            </div>
            <div class="col-md-3 text-center">
              <p class="text-black font-weight-bold m-0 mb-1">Membership</p>
              <p class="m-0">{{ leadDetails.data.membership_status ? leadDetails.data.membership_status : 'ــــــ' }}</p>
            </div>
          </div>
        </iq-card>
      </b-col>
      <b-col lg="9">
        <iq-card v-if="hasPer('sales.all')">
          <div class="row py-2 pl-4" v-if="getLoading">
            <div class="mr-2">
              <spinner-loading text = 'Loading' />
            </div>
          </div>
          <div class="row justify-content-between py-2 px-2 m-auto " v-else>
            <div class="w-25 px-2">
              <b-button class="w-100" variant="primary" @click="getNewUser('new')">
                Get New
              </b-button>
            </div>
            <div class="w-25 px-2">
              <b-button  class="w-100" variant="primary" @click="getNewUser('challenge')">
                Get Chalenge
              </b-button>
            </div>
            <div class="w-25 px-2">
              <b-button  class="w-100" variant="primary"  @click="getNewUser('old')">
                Get Old
              </b-button>
            </div>
            <div class="w-25 px-2">
              <b-button class="w-100" variant="primary"  @click="getNewUser('expired')">
                Get Expired
              </b-button>
            </div>
          </div>
        </iq-card>
      </b-col>
      <b-col lg="3">
        <iq-card v-if="hasPer('sales.all')">
          <div class="row py-2 px-4">
            <router-link class="w-100" :to="{name: 'reminder'}">
            <b-button class="w-100" variant="warning">
              <i class="las la-stopwatch mr-2 d-inline-block"></i>
              <span class="ml-2">Reminder</span>
            </b-button>
            </router-link>
          </div>
        </iq-card>
      </b-col>
      <b-col lg="12">
        <div class="iq-card p-1">
          <div class="row">
            <div class="col-md-3 my-1">
              <input type="text" v-model="filter.search" placeholder="search by name or phone" class="form-control" @input="getAllLeadInSales">
            </div>
            <div class="col-md-3 my-1">
              <select class="form-control" v-model = filter.category @change="getAllLeadInSales">
                <option selected disabled value="">select Category...</option>
                <option value="old">Old</option>
                <option value="new">New</option>
                <option value="challenge">challenge</option>
                <option value="expired">Expired</option>
              </select>
            </div>
            <div class="col-md-3 my-1">
              <select class="form-control"  v-model="filter.project" @change="getAllLeadInSales">
                <option selected disabled value="">select Project...</option>
                <option v-for="(i, key) in projects" :key="key" :value="i.id">
                  <span>{{i.en_title}}</span>
                </option>
              </select>
            </div>
            <div class="col-md-3 my-1">
              <select class="form-control"  v-model="filter.source" @change="getAllLeadInSales">
                <option selected disabled value="">select Source...</option>
                <option v-for="(i, key) in source" :key="key" :value="i.id">
                  <span>{{i.title}}</span>
                </option>
              </select>
            </div>
            <div class="col-md-3 my-1">
              <select class="form-control"  v-model="filter.from" @change="getAllLeadInSales">
                <option selected disabled value="">select From...</option>
                <option v-for="(i, key) in from" :key="key" :value="i.id">
                  <span>{{i.title}}</span>
                </option>
              </select>
            </div>
            <div class="col-md-3 my-1">
              <select class="form-control"  v-model="filter.inquiry" @change="getAllLeadInSales">
                <option selected disabled value="">select Inquiry...</option>
                <option v-for="(i, key) in inquiry" :key="key" :value="i.id">
                  <span>{{i.title}}</span>
                </option>
              </select>
            </div>
            <div class="col-md-3 my-1">
              <select class="form-control"  v-model="filter.callStatusId" @change="getAllLeadInSales">
                <option selected disabled value="">select Call Status ...</option>
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
                  @update="getAllLeadInSales"
              >
              </date-range-picker>
            </div>
            <div class="col-md-1 d-flex justify-content-center align-items-center" v-if="filter.search || filter.inquiry || filter.project || filter.source || filter.from || filter.callStatusId || filter.userId || filter.ifNew || filter.category">
              <span class="text-danger cursor-pointer" @click="resetFilter()">Clear All</span>
            </div>
          </div>
        </div>
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">{{ $t('dashboard2.leads')}} <b-badge variant="primary">{{allTotal}}</b-badge></h4>
          </template>
          <template v-slot:headerAction v-if="hasPer('sales.lead.create')">
            <b-button v-if="loadingOpenAdd"  variant="primary" disabled>
              <spinner-loading text = 'Openning' />
            </b-button>
            <b-button v-else v-b-modal.modalAddLeadWithStatus
                      variant="primary">Add My Lead</b-button>
          </template>
          <template v-slot:body>
            <div v-if="loadTable" class="text-center">
              <spinner-loading text = 'Loading' />
            </div>
            <b-table v-else striped responsive  :fields="columns" :items="callData" class="mb-0 table-borderless" :select-mode="selectMode" ref="selectableTable" sort-icon-left primary-key="phone"  id="table-transition-example" :tbody-transition-props="transProps">
              <template v-slot:cell(project)="data1">
                {{data1.item.project.en_title}}
              </template>
              <template v-slot:cell(call_status)="data2">
                <span class="p-1 iq-border-radius-5" v-if="data2.item.call_status && data2.item.call_status.color" :style="{ backgroundColor: data2.item.call_status.color }">{{data2.item.call_status.title}}</span>
                <span v-else>
                  <span class="p-1 iq-border-radius-5" style="background-color: #d6cdd3">Pending</span>
                </span>
              </template>
              <template v-slot:cell(lead.phone)="data1">
                <p class="holdSelection" v-if="data1.item.id==showPhone">{{data1.item.lead.phone}}</p>
                <b-button v-else variant=" iq-bg-success mr-1 mb-1" size="sm" :id="data1.item.id" @click="showPhone = data1.item.id" ><i class="las la-mobile"></i>Show Phone</b-button>
              </template>
              <template v-slot:cell(call_action)="data1">
                <i v-if="!data1.item.hold_to" class="las la-phone-volume text-success font-size-18 cursor-pointer" v-b-modal.changeStatus
                   @click="selectedRow = [] ; selectedRow.push(data1.item.id)"></i>
                <span v-else>
                  <span class="p-1 iq-border-radius-5 bg-danger">Hold</span>
                </span>
              </template>
              <template v-slot:cell(reminder)="data1">
                <i v-if="!data1.item.hold_to" class="las la-stopwatch text-success font-size-22  cursor-pointer"
                   @click="openReminderPopup(data1.item.lead.id)"></i>
                <span v-else>
                  <span class="p-1 iq-border-radius-5 bg-danger">Hold</span>
                </span>
              </template>
              <template v-slot:cell(period_to)="data1">
                <p v-if="data1.item.period_to">{{timeConvertBackEnd(data1.item.period_to)}}</p>
              </template>
              <template v-slot:cell(last_call_action)="data1">
                <p class="holdSelection">{{timeConvertBackEnd(data1.item.last_call_action)}}</p>
              </template>
              <template  v-slot:cell(add_comment)="data1">
                <i v-if="!data1.item.hold_to" class="las la-comment-dots text-success font-size-18 cursor-pointer" v-b-modal.addComments
                   @click="selectedRow = [] ; selectedRow.push(data1.item.id)"></i>
                <span v-else>___</span>
              </template>
              <template v-slot:cell(actions)="data1">
                <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="showHistory(data1.item.lead.id)"
                          :class="'input_'+data1.item.lead.id" ><i class="las la-history"></i> Show History</b-button>
              </template>
            </b-table>
            <b-pagination v-model="pagination.current_page"
                          class="mt-3"
                          :total-rows="pagination.total"
                          align="right"
                          :per-page="pagination.per_page"
                          aria-controls="my-table"
                          @input="getAllLeadInSales"
            ></b-pagination>
          </template>
        </iq-card>
      </b-col>
      <!-- Start Widget -->
      <b-col lg="4">
        <iq-card>
          <template v-slot:body>
            <ul class="d-flex justify-content-around cursor-pointer m-0 p-0">
              <li @click="(typeOfFilterWidget='daily'); getSalesWidget()" :class="[typeOfFilterWidget=='daily' ? 'activeButton':'','font-weight-bold font-size-16']"><span>Daily</span></li>
              <li @click="(typeOfFilterWidget='weekly'); getSalesWidget()" :class="[typeOfFilterWidget=='weekly' ? 'activeButton':'','font-weight-bold font-size-16']"><span>Weekly</span></li>
              <li @click="(typeOfFilterWidget='monthly'); getSalesWidget()" :class="[typeOfFilterWidget=='monthly' ? 'activeButton':'','font-weight-bold font-size-16']"><span>Monthly</span></li>
            </ul>
            <div class="m-0 p-0 d-flex flex-wrap align-items-center justify-content-between" v-if="!widgetLoading">
              <div class="col-md-12" v-for="(i,key) in Object.keys(allSalesWidget)" :key="key">
                <div class="d-flex align-items-center  mt-4">c
                  <div class="iq-scale-border mr-3 comment-block"></div>
                  <div class="iq-scale-content">
                    <h6>{{ allSalesWidget[i] }}</h6>
                    <p class="mb-0">
                      <router-link :to="{name: i, query:{user :userId}}">
                        {{ i }}
                      </router-link>
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="d-flex align-items-center mt-4">
                  <div class="iq-scale-border mr-3 repost-block"></div>
                  <div class="iq-scale-content">
                    <h6>{{ sumOfSales }}</h6>
                    <p class="mb-0">Total</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-center mt-3" v-else>
              <spinner-loading text="loading"/>
            </div>
          </template>
        </iq-card>
      </b-col>
      <!-- End Widget -->
    </b-row>
    <!--End Content Page -->
  </b-container>
</template>
<script>
import { core } from '@/config/pluginInit'
import DateRangePicker from 'vue2-daterange-picker'
import leadService from '@/modules/leads/services/leads'
import salesService from '../services/sales'
import reminderService from '@/modules/reminder/services/reminder'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
const addLeadModelStatus = () => import('@/modules/leads/components/leadsModalWithStatus')
const statusHistory = () => import('@/components/statusHistory/statusHistory')
export default {
  name: 'sales',
  data () {
    return {
      userId: JSON.parse(localStorage.getItem('user_info')).id,
      // All Status
      allStatus: [],
      selectedStatusId: '',

      // Table Data
      allTotal: '', // total Data
      callData: [],
      transProps: {
        name: 'flip-list'
      },
      selectMode: 'multi',
      pagination: {
        current_page: 1,
        per_page: 10,
        total: 6
      },
      selectedRow: [],
      showPhone: '', // to show phone number

      // filters
      filter: {
        search: '',
        project: '',
        userId: '',
        callStatusId: '',
        inquiry: '',
        source: '',
        from: '',
        ifNew: '',
        category: '',
        noHistory: ''
      },
      dateRange: {
        startDate: '',
        endDate: ''
      },

      // Widget
      typeOfFilterWidget: 'daily',
      allSalesWidget: {},

      // reminder
      reminder: {
        lead: '',
        date: '',
        time: '',
        description: ''
      },

      // Loading
      loadingOpenAdd: false,
      loadTable: true,
      getLoading: false,
      widgetLoading: false,
      saveButton: false,
      loadingReminder: false,

      // History
      history: [],
      historyId: '',

      // When Get New
      leadDetails: {},
      comment: '',

      // To Add Comment Only
      addcomment: '',

      // Helpers
      call_Status: [],
      from: [],
      inquiry: [],
      projects: [],
      source: [],
      allFeatures: {}
    }
  },
  computed: {
    sumOfSales () {
      var total = 0
      for (var el in this.allSalesWidget) {
        total += parseInt(this.allSalesWidget[el])
      }
      return total
    },
    columns () {
      const fields = [
        { label: 'ID', key: 'lead.id', class: 'text-left', sortable: true },
        { label: 'Name', key: 'lead.name', class: 'text-left', sortable: true },
        { label: 'Phone', key: 'lead.phone', class: 'text-left', sortable: true },
        { label: 'Category', key: 'category', class: 'text-left', sortable: true },
        { label: 'Project', key: 'project', class: 'text-left', sortable: true },
        { label: 'Type', key: 'type', class: 'text-left', sortable: true },
        { label: 'Last Call', key: 'last_call_action', class: 'text-left', sortable: true },
        { label: 'End Period', key: 'period_to', class: 'text-left', sortable: true },
        { label: 'Call Action', key: 'call_action', class: 'text-left', sortable: true },
        { label: 'Reminder', key: 'reminder', class: 'text-left', sortable: true },
        { label: 'Note', key: 'comment', class: 'text-left', sortable: true },
        { label: 'Last Action', key: 'call_status', class: 'text-left', sortable: true },
        { label: 'Add Comment', key: 'add_comment', class: 'text-left' }]
      if (this.hasPer('lead.history')) {
        fields.push({ label: 'History', key: 'actions', class: 'text-left' })
      }
      return fields
    }
  },
  methods: {

    // Show Page Data
    getAllLeadInSales () {
      this.loadTable = true
      salesService.getUserCallData({
        pageNumber: this.pagination.current_page,
        search: this.filter.search,
        project: this.filter.project,
        userId: this.filter.userId,
        callStatusId: this.filter.callStatusId,
        inquiry: this.filter.inquiry,
        source: this.filter.source,
        from: this.filter.from,
        dateFrom: this.dateRange.startDate ? new Date(this.dateRange.startDate).toJSON().slice(0, 10) : '',
        dateTo: this.dateRange.endDate ? new Date(this.dateRange.endDate).toJSON().slice(0, 10) : '',
        category: this.filter.category
      }).then(res => {
        this.callData = res.data.data.leads.data
        this.pagination.current_page = res.data.data.leads.current_page
        this.pagination.per_page = res.data.data.leads.per_page
        this.pagination.total = res.data.data.leads.total
        this.allTotal = res.data.data.leads.total
      }).catch(err => {
        core.showSnackbar('error', err.response.data.error)
      }).finally(() => {
        this.loadTable = false
      })
    },
    getSalesWidget () {
      this.widgetLoading = true
      salesService.getSalesWidget(this.typeOfFilterWidget).then(res => {
        this.allSalesWidget = res.data.data
      }).finally(() => {
        this.widgetLoading = false
      })
    },

    // Filter Table
    resetFilter () {
      this.filter = {
        search: '',
        project: '',
        userId: '',
        callStatusId: '',
        inquiry: '',
        source: '',
        from: '',
        ifNew: ''
      }
      this.getAllLeadInSales()
    },

    // when change any Data
    refreshTable () {
      this.getAllLeadInSales()
      this.getSalesWidget()
    },

    // get New, chalange, old, Expired
    getNewUser (type) {
      this.getLoading = true
      salesService.getNewUserCallData(type)
        .then(response => {
          this.leadDetails = response.data
          if (response.data.data) {
            leadService.gitHistory({ id: response.data.data.lead_id, pageNumber: 1 }).then(res => {
              this.historyId = response.data.data.id
              this.history = res.data.data.data
              this.refreshTable()
              // test
              this.$bvModal.show('addStatusAndComments')
            })
          }
          core.showSnackbar('error', response.data.message)
        }).catch(err => {
          core.showSnackbar('error', err.response.data.error)
        })
        .finally(() => {
          this.getLoading = false
        })
    },

    // Actions In table
    showHistory (id) {
      document.getElementsByClassName('input_' + id)[0].innerHTML = '<span class="spinner-grow spinner-grow-sm"></span> Loading...'
      this.historyId = id
      leadService.gitHistory({ id: id, pageNumber: 1 }).then(res => {
        this.history = res.data.data.data
        this.$bvModal.show('statusHistory')
      }).finally(() => {
        document.getElementsByClassName('input_' + id)[0].innerHTML = ' <i class="las la-history"></i> Show History'
      })
    },

    // when call
    saveStatus (userId) {
      if (this.selectedStatusId) {
        this.saveButton = true
        salesService.changeStatusCall({ status: this.selectedStatusId, leads_ids: [userId], comment: this.comment }).then(() => {
          this.$bvModal.hide('addStatusAndComments')
          this.leadDetails = {}
          this.selectedStatus = ''
          this.comment = ''
          core.showSnackbar('success', 'call Save Succesfully.')
          this.selectedRow = []
          this.saveButton = false
          this.refreshTable()
        }).catch(err => {
          // eslint-disable-next-line no-unused-vars
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            core.showSnackbar('error', value)
          }
        }).finally(() => {
          this.saveButton = false
        })
      } else {
        core.showSnackbar('error', 'Please Select Status')
      }
    },
    endCall () {
      this.selectedStatusId = ''
      this.$bvModal.hide('addStatusAndComments')
      this.leadDetails = {}
    },
    isSelected (id) {
      return id === this.selectedStatusId
    },

    // Submit Change Status (Call Action)
    saveEditStatus () {
      if (this.selectedStatusId) {
        this.saveButton = true
        salesService.changeStatusCall({
          status: this.selectedStatusId,
          leads_ids: this.selectedRow,
          comment: this.comment
        }).then((res) => {
          core.showSnackbar('success', res.data.message)
          this.$bvModal.hide('changeStatus')
          this.selectedStatusId = ''
          this.selectedRow = []
          this.saveButton = false
          this.comment = ''
          this.refreshTable()
        }).catch(err => {
          // eslint-disable-next-line no-unused-vars
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            core.showSnackbar('error', value)
          }
          this.saveButton = false
        }).finally(() => {
          this.saveButton = false
        })
      } else {
        core.showSnackbar('error', 'Please Select Status.')
      }
    },

    // Add Comment To Lead
    saveComment () {
      if (this.addcomment) {
        this.saveButton = true
        salesService.addComment({ comment: this.addcomment, lead: this.selectedRow[0] }).then((res) => {
          this.$bvModal.hide('addComments')
          this.addcomment = ''
          core.showSnackbar('success', res.data.message)
          this.selectedRow = []
          this.saveButton = false
        }).finally(() => {
          this.saveButton = false
        })
      } else {
        core.showSnackbar('error', 'Please Write your comment.')
      }
    },

    // Reminder
    openReminderPopup (id) {
      this.reminder.lead = id
      this.$bvModal.show('addReminder')
    },
    saveReminder () {
      this.loadingReminder = true
      reminderService.setSalesReminder(this.reminder).then(res => {
        core.showSnackbar('success', res.data.message)
        this.loadingReminder = false
        this.reminder = {
          lead: '',
          date: '',
          time: '',
          description: ''
        }
        this.$bvModal.hide('addReminder')
      }).finally(() => {
        this.loadingReminder = false
      })
    }
  },
  components: {
    addLeadModelStatus,
    statusHistory,
    DateRangePicker
  },
  mounted () {
    core.index()
    this.getAllLeadInSales()
    this.getSalesWidget()
    leadService.getInfoToCreateLead().then((res) => {
      this.allFeatures = res.data.data
      this.call_Status = res.data.data.call_Status
      this.from = res.data.data.from
      this.inquiry = res.data.data.inquiry
      this.projects = res.data.data.projects
      this.source = res.data.data.source
    })
  },
  beforeMount () {
    salesService.getAllStatus().then(res => {
      this.allStatus = res.data.data
    })
  }
}
</script>
<style scoped>
*{
  box-sizing: border-box !important;
}
.colorSpan{
  width: 20px;
  height: 20px;
  white-space: nowrap;
}
.table.b-table > tbody > .table-active, .table.b-table > tbody > .table-active > th, .table.b-table > tbody > .table-active > td {
  background-color: rgb(246 33 33 / 5%) !important;
}
.notAllowed {
  pointer-events: auto! important;
  cursor: not-allowed! important;
}
#addStatusAndComments___BV_modal_outer_ #addStatusAndComments .modal-dialog.modal-md.modal-dialog-centered  .modal-header .close {
  display:none !important;
}
.activeSelected{
  background-color: blue !important;
  color:#fff;
  position: relative;
}
.showSelected{
  display: block;
}
</style>
