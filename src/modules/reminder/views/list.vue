<template>
  <b-container fluid>
    <b-modal id="done_reminder" size="md" title="Reminder" hide-footer no-close-on-backdrop>
      <p class="font-size-18 text-black">Are you sure you want to close this Reminder? </p>
      <div class="d-flex justify-content-end">
        <b-button variant="danger" v-if="loadDoneReminder"><spinner-loading text = 'Loading' ></spinner-loading></b-button>
        <b-button v-else variant="danger" @click="deleteReminder()">Done</b-button>
      </div>
    </b-modal>
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
    <b-row>
      <b-col lg="12">
        <!-- Start Filter-->
          <div class="iq-card p-1">
            <div class="row">
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
                    clearable
                    @update="getReminders()"
                >
                </date-range-picker>
              </div>
              <div class="col-md-12 d-flex justify-content-start align-items-center" v-if="dateRange.endDate || dateRange.startDate">
                <span class="text-danger cursor-pointer" @click="resetFilter()">Clear All</span>
              </div>
            </div>
          </div>
        <!-- End Filter-->
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">Reminder</h4>
          </template>
          <template v-slot:body>
            <div v-if="loadTable" class="text-center">
              <spinner-loading text = 'Loading' />
            </div>
            <b-table v-else  striped responsive  class="mb-0 table-borderless"
                     :fields="field" :items="allReminders">
<!--              <template slot="top-row" slot-scope="{ fields }">
                <td v-for="field in fields" :key="field.key">
                  <span v-if="filters.hasOwnProperty(field.filter)">
                    <input v-if="field.type == 'text'" v-model="filters[field.filter]" :placeholder="field.label">
                      <v-select v-if="field.type == 'select'" single v-model="filters[field.filter]" label="title"></v-select>
                  </span>
                </td>
              </template>-->
              <template v-slot:cell(created_at)="data1">
                <p>{{timeConvert(data1.item.created_at)}}</p>
              </template>
              <template v-slot:cell(show_history)="data1">
                <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="showHistory(data1.item.lead.id)"
                          :class="'input_'+data1.item.lead.id"><i class="las la-history"></i> Show History</b-button>
              </template>
              <template v-slot:cell(lead.phone)="data1">
                <p class="holdSelection" v-if="data1.item.id==showPhone">{{data1.item.lead.phone}}</p>
                <b-button v-else variant=" iq-bg-success mr-1 mb-1" size="sm" :id="data1.item.id" @click="showPhone = data1.item.id" ><i class="las la-mobile"></i>Show Phone</b-button>
              </template>
              <template v-slot:cell(actions)="data1">
                <b-button variant=" iq-bg-success mr-1 mb-1"  size="sm" v-b-modal.addComments @click="leadId=data1.item.lead.lead_project.id">
                  <i class="las la-comment-dots m-0"></i></b-button>
                <b-button variant=" iq-bg-danger mr-1 mb-1" size="sm" v-b-modal.changeStatus   @click="selectedRow = [] ; selectedRow.push(data1.item.lead.lead_project.id)"><i class="las la-phone-volume m-0"></i></b-button>
                <b-button variant=" iq-bg-primary mr-1" size="sm"
                          @click="setReminderId(data1.item.id)">
                  <i class="las la-check m-0"></i>
                </b-button>
                <b-button variant=" iq-bg-info" size="sm"
                          @click="openReminderPopup(data1.item.lead.id)">
                  <i class="las la-stopwatch "></i>
                </b-button>
              </template>
            </b-table>
            <b-pagination v-model="pagination.currentPage"
                          class="mt-3"
                          :total-rows="pagination.total"
                          align="right"
                          :per-page="pagination.per_page"
                          aria-controls="my-table"
                          @input="getReminders"
            ></b-pagination>
          </template>
        </iq-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { core } from '@/config/pluginInit'
import reminderService from '../services/reminder'
import salesService from '../../sales/services/sales'
import leadService from '@/modules/leads/services/leads'
const statusHistory = () => import('../../../components/statusHistory/statusHistory')

export default {

  name: 'reminder',
  computed: {
    /*    filtered () {
      const filtered = this.allReminders.filter(item => {
        // console.log('sssssssss', item)
        return Object.keys(this.filters).every(key =>
          String(item[key]).includes(this.filters[key]))
      })
      return filtered.length > 0 ? filtered : [{
        title: '',
        name: '',
        created_at: ''
      }]
    } */
  },
  mounted () {
    core.index()
  },
  created () {
    this.getReminders()
    salesService.getAllStatus().then(res => {
      this.allStatus = res.data.data
    })
  },
  components: {
    statusHistory
  },
  data () {
    return {
      /* filters: {
        name: '',
        title: '',
        created_at: ''
      }, */
      dateRange: {
        startDate: '',
        endDate: ''
      },
      showPhone: '',
      allStatus: [],
      selectedRow: [],
      selectedStatusId: '',
      saveButton: false,
      addcomment: '',
      leadId: '',
      comment: '',
      loadTable: false,
      allReminders: [],
      reminderId: '',
      loadDoneReminder: false,
      field: [
        { label: 'ID', key: 'lead_id', class: 'text-left' },
        { label: 'Name', key: 'lead.name', class: 'text-left', filter: 'name', type: 'text' },
        { label: 'Phone Number', key: 'lead.phone', class: 'text-left', filter: 'name', type: 'text' },
        { label: 'Title', key: 'title', class: 'text-left', filter: 'title', type: 'select' },
        { label: 'Date', key: 'date', class: 'text-left' },
        { label: 'Time', key: 'time', class: 'text-left' },
        { label: 'Project', key: 'project.en_title', class: 'text-left' },
        { label: 'Created At', key: 'created_at', class: 'text-left', filter: 'created_at', type: 'text' },
        { label: 'Show History', key: 'show_history', class: 'text-left' },
        { label: 'Actions', key: 'actions', class: 'text-left' }
      ],
      // reminder
      reminder: {
        lead: '',
        date: '',
        time: '',
        description: ''
      },
      pagination: {
        currentPage: 1,
        per_page: 10,
        total: 6
      },
      history: [],
      historyId: ''
    }
  },
  methods: {
    resetFilter () {
      // eslint-disable-next-line no-unused-expressions
      this.dateRange = {
        startDate: '',
        endDate: ''
      }
      this.getAllLeads()
    },
    getReminders () {
      this.loadTable = true
      reminderService.getAllReminder({
        pageNumber: this.pagination.currentPage,
        dateFrom: this.dateRange.startDate ? new Date(this.dateRange.startDate).toJSON().slice(0, 10) : '',
        dateTo: this.dateRange.endDate ? new Date(this.dateRange.endDate).toJSON().slice(0, 10) : ''
      }).then(res => {
        this.allReminders = res.data.data
        this.pagination.currentPage = res.data.meta.current_page
        this.pagination.per_page = res.data.meta.per_page
        this.pagination.total = res.data.meta.total
        this.loadTable = false
      })
    },

    // setReminderId
    setReminderId (reminderId) {
      this.reminderId = reminderId
      this.$bvModal.show('done_reminder')
    },
    // delete Reminder
    deleteReminder () {
      this.loadDoneReminder = true
      reminderService.deleteReminder(this.reminderId).then(res => {
        core.showSnackbar('success', res.data.message)
        this.$bvModal.hide('done_reminder')
        this.getReminders()
      }).finally(() => {
        this.loadDoneReminder = false
      })
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

    // showHistory
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
    // Add Comment To Lead
    saveComment () {
      if (this.addcomment) {
        this.saveButton = true
        salesService.addComment({ comment: this.addcomment, lead: this.leadId }).then((res) => {
          this.$bvModal.hide('addComments')
          this.addcomment = ''
          core.showSnackbar('success', res.data.message)
          this.saveButton = false
        }).finally(() => {
          this.saveButton = false
        })
      } else {
        core.showSnackbar('error', 'Please Write your comment.')
      }
    },
    isSelected (id) {
      return id === this.selectedStatusId
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
        this.getReminders()
      }).finally(() => {
        this.loadingReminder = false
      })
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
