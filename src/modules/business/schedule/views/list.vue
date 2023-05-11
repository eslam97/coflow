<template>
  <b-container fluid>
    <main-modal id="scheduleDetailsModal" size="lg">
      <template v-slot:header>
        <h4 class="font-weight-bold" v-if="typeOfModal == 'add'">
          <span class="text-warning">Add: </span> Flow Slots</h4>
        <h4 class="font-weight-bold" v-else><span class="text-info">Edit: </span> Slot</h4>
      </template>
      <template v-slot:actions v-if="typeOfModal == 'edit'">
        <div class="d-flex">
          <div class="modal-embed-actions cursor-pointer" @click="deleteSlot">
            <i class="las la-trash-alt text-danger font-size-20"></i>
          </div>
          <div class="modal-embed-actions">
            <div class="d-flex justify-content-between">
              <span class="text-info font-weight-bold font-size-12 mr-3">Active</span>
              <div
                  class="custom-control custom-switch custom-switch-text custom-control-inline custom-switch-color mr-0">
                <div class="custom-switch-inner">
                  <input type="checkbox" class="custom-control-input bg-info" :id="'status'"
                         @change="changeStatus(scheduleDetails.id, scheduleDetails.status_traker)"
                         v-model="scheduleDetails.status_traker">
                  <label class="custom-control-label" :for="'status'">
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:body>
        <schedule-details @addSlots="addSlots"
                          @editSlot="editSlot"
                          :requestLoading="requestLoading"
                          :scheduleDetails="scheduleDetails"
                          :allFlows="allFlows"
                          :typeOfModal="typeOfModal"/>
      </template>
    </main-modal>
      <section class="mb-4 d-flex justify-content-between align-items-center flex-wrap">
          <div><h3>Schedule</h3></div>
          <div>
              <ul class="levels-list m-0 p-0 justify-content-center">
                  <li class="p-1" v-for="(level, key) in levels" :key="key">
                      <i class="fas fa-circle ml-3 mr-2" :class="`circle-${level.color}`"></i>
                      <span class="font-size-12">{{ level.text }}</span>
                  </li>
              </ul>
          </div>
          <div>
              <div class="d-flex justify-content-md-end justify-content-center gap-20">
                  <b-button @click="clearSchedule" variant="dark" class="add_button text-white">
                      <span>Clear Schedule<i class="fas fa-trash-alt ml-3"></i></span>
                  </b-button>
                  <b-button @click="openPopup" variant="warning" class="add_button text-white">
                      Add Flow Slots<i class="fas fa-calendar-alt ml-3"></i></b-button>
              </div>
          </div>
      </section>
    <b-row>
      <spinner-loading v-if="requestLoading"></spinner-loading>
      <b-col lg="12" v-if="allSlots.length > 0">
        <b-card class="overflow-auto text-center schedule-card">
          <b-row class="flex-nowrap m-0">
            <b-col class="schedule-col px-0" v-for="(day, key) in days" :key="key">
              <h6 class="mb-3 pt-3 schedule-header">{{ day.key }}</h6>
              <div v-for="(slot, slotKey) in allSlots.filter((ele) => { return ele.day === day.value })"
                   :key="slotKey"
                   class="p-2 d-flex justify-content-center align-items-center cursor-pointer slot-box"
                   :class="(slot.status === 'active' || slot.status === true)?
                     `slot-box-${levels.find(l => l.value === slot.flow.level).color}` : 'slot-box-grey'"
                   @click="showScheduleToEdit(slot)">
                <ul class="pl-0">
                  <li v-if="(slot.ladies_only)" class="ladies-only-tag">LADIES ONLY</li>
                  <li>{{ formatTime(slot.from) }} - {{ formatTime(slot.to) }}</li>
                  <li>{{ slot.flow.name }}</li>
                  <li>{{ slot.instructor }}</li>
                </ul>
              </div>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col v-else-if="!requestLoading" md="12" class="text-center text-black">
        <b-card> No Available slots</b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { core } from '@/config/pluginInit'
import scheduleDetails from '@/modules/business/schedule/components/scheduleDetails'
import scheduleServices from '@/modules/business/schedule/services/schedule.sevices'
import flowsServices from '@/modules/business/flows/services/flows.services'
import mainService from '@/services/main'
import EventBus from '@/eventBus'

export default {
  data () {
    return {
      requestLoading: false,
      typeOfModal: 'add',
      scheduleDetails: {},
      scheduleId: '',
      allFlows: [],
      allSlots: [],
      levels: [
        {
          text: 'ALL LEVELS',
          value: 'all',
          color: 'blue'
        },
        {
          text: 'BEGINNER',
          value: 'beginner',
          color: 'cyan'
        },
        {
          text: 'INTERMEDIATE',
          value: 'intermediate',
          color: 'orange'
        },
        {
          text: 'ADVANCED',
          value: 'advanced',
          color: 'red'
        },
        {
          text: 'LADIES ONLY',
          color: 'pink'
        }
      ],
      days: [
        {
          key: 'SUN',
          value: 'sunday'
        }, {
          key: 'MON',
          value: 'monday'
        }, {
          key: 'TUE',
          value: 'tuesday'
        }, {
          key: 'WED',
          value: 'wednesday'
        }, {
          key: 'THU',
          value: 'thursday'
        }, {
          key: 'FRI',
          value: 'friday'
        }, {
          key: 'SAT',
          value: 'saturday'
        }
      ],
      scheduleDetailsFront: {}
    }
  },
  components: {
    scheduleDetails
  },
  methods: {
    openPopup () {
      this.scheduleId = ''
      this.typeOfModal = 'add'
      this.scheduleDetails = false
      this.$bvModal.show('scheduleDetailsModal')
    },
    addSlots (schedule) {
      this.requestLoading = true
      scheduleServices.setNewSlot(schedule).then(res => {
        core.showSnackbar('success', res.data.message)
        this.getSchedule()
        this.$bvModal.hide('scheduleDetailsModal')
      }).finally(() => {
        this.requestLoading = false
      })
    },
    editSlot (slotId, schedule) {
      this.requestLoading = true
      scheduleServices.editSchedule(slotId, schedule).then(res => {
        core.showSnackbar('success', res.data.message)
        this.getSchedule()
        this.$bvModal.hide('scheduleDetailsModal')
      }).finally(() => {
        this.requestLoading = false
      })
    },
    showScheduleToEdit (obj) {
      this.typeOfModal = 'edit'
      this.scheduleDetailsFront = obj
      scheduleServices.getScheduleDetails(obj.id).then(res => {
        this.scheduleDetails = res.data.data
        this.scheduleDetails.status_traker = this.scheduleDetails.status === 'active'
        this.scheduleDetails.slotId = obj.id
        this.$bvModal.show('scheduleDetailsModal')
      })
    },
    getAllFlows () {
      this.requestLoading = true
      flowsServices.getAllFlowsLimit().then(res => {
        this.allFlows = res.data.data.data
        this.requestLoading = false
      })
    },
    getSchedule () {
      this.requestLoading = true
      scheduleServices.getAllSlots().then(res => {
        this.allSlots = res.data.data.data
        this.requestLoading = false
      })
    },
    deleteSlot () {
      EventBus.$emit('openDeleteModal', {
        actionHeader: 'Clear',
        titleHeader: 'Slot',
        textContent: `${this.scheduleDetailsFront.flow.name} in ${this.scheduleDetailsFront.day} `,
        question: 'Are you want to delete all the slots in the schedule?',
        textDeleteButton: 'YES, Clear',
        textCancelButton: 'NO, CANCEL',
        icon: 'las la-trash-alt',
        type: 'delete',
        actionOnAlert: '',
        text: 'Clear',
        url: 'schedules',
        rowId: this.scheduleDetailsFront.id
      })
    },
    clearSchedule () {
      EventBus.$emit('openDeleteModal', {
        actionHeader: 'Delete',
        titleHeader: 'Schedule',
        textContent: 'Are you want to delete all the slots in the schedule?',
        question: '',
        textDeleteButton: 'YES, Delete',
        textCancelButton: 'NO, CANCEL',
        icon: 'las la-trash-alt',
        type: 'delete',
        actionOnAlert: '',
        text: 'Delete',
        url: 'destroy-all-schedule',
        method: 'get',
        rowId: this.scheduleDetailsFront.id
      })
    },
    changeStatus (id, status) {
      const obj = {
        schedule_id: id,
        status: status ? 'active' : 'inactive',
        type: 'schedule'
      }
      mainService.changeStatus(obj).then(res => {
        this.scheduleDetails.status = obj.status
        this.getSchedule()
        core.showSnackbar('success', res.data.message)
      }).catch(() => {
        this.scheduleDetails.status = !status
      })
    },
    formatTime (time) {
      time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time]
      time.splice(4)
      if (time.length > 1) {
        time = time.slice(1)
        time[5] = +time[0] < 12 ? ' AM' : ' PM'
        time[0] = +time[0] % 12 || 12
      }
      return time.join('')
    }
  },
  created () {
    this.getSchedule()
    this.getAllFlows()
    EventBus.$on('reloadTableAfterDelete', ifReload => {
      this.$bvModal.hide('scheduleDetailsModal')
      this.getSchedule()
      core.showSnackbar('success', 'Data deleted successfully')
    })
  },
  beforeDestroy () {
  },
  mounted () {
    core.index()
  }
}
</script>
