<template>
  <b-container fluid>
    <main-modal id="scheduleDetailsModal" size="lg">
      <template v-slot:header>
        <h4 class="font-weight-bold" v-if="typeOfModal == 'add'" >
          <span class="text-warning">Set: </span> Flow Slots</h4>
        <h4 class="font-weight-bold" v-else-if="typeOfModal == 'view'" >
          <span class="text-success-light">View: </span> Flow Slots</h4>
        <h4 class="font-weight-bold" v-else><span class="text-info" >Manage: </span> FlowSlots</h4>
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
    <b-row>
      <b-col lg="12" class="mb-5 d-flex justify-content-between align-items-center">
        <h3>Schedule</h3>
        <ul class="levels-list">
          <li class="p-1" v-for="(level, key) in levels" :key="key">
            <i class="fas fa-circle ml-3 mr-1" :class="`circle-${level.color}`" ></i>{{ level.text }}
          </li>
        </ul>
        <div>
          <b-button @click="openPopup" variant="warning" class="add_button text-white">
            Manage Schedule<i class="las la-cog ml-3"></i></b-button>
        </div>
      </b-col>
      <b-col lg="12">
        <b-card class="mb-3 overflow-auto text-center">
          <b-row class="flex-nowrap">
            <b-col class="schedule-col px-0" v-for="(day, key) in days" :key="key">
              <h5 class="mb-3">{{ day.key }}</h5>
              <div v-for="(slot, slotKey) in allSlots.filter((ele) => { return ele.day === day.value })"
                   :key="slotKey" class="slot-box-red mb-1 p-2 d-flex justify-content-center align-items-end">
                <ul class="pl-0">
                  <li>{{ slot.from }} - {{ slot.to }}</li>
                  <li>{{ slot.flow.name }}</li>
                  <li>{{ slot.instructor }}</li>
                </ul>
              </div>
            </b-col>

          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { core } from '@/config/pluginInit'
import scheduleDetails from '@/modules/business/schedule/components/scheduleDetails'
import scheduleServices from '@/modules/business/schedule/services/schedule.sevices'
import flowsServices from '@/modules/business/flows/services/flows.services'

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
        { text: 'ALL LEVELS', value: 'all', color: 'blue' },
        { text: 'BEGINNER', value: 'beginner', color: 'cyan' },
        { text: 'INTERMEDIATE', value: 'intermediate', color: 'orange' },
        { text: 'ADVANCED', value: 'advanced', color: 'red' },
        { text: 'LADIES ONLY', color: 'pink' }
      ],
      days: [
        {
          key: 'Sun',
          value: 'sunday'
        }, {
          key: 'Mon',
          value: 'monday'
        }, {
          key: 'Tue',
          value: 'tuesday'
        }, {
          key: 'Wed',
          value: 'wednesday'
        }, {
          key: 'Thu',
          value: 'thursday'
        }, {
          key: 'Fri',
          value: 'friday'
        }, {
          key: 'Sat',
          value: 'saturday'
        }
      ]
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
        this.reloadTable = true
        core.showSnackbar('success', res.data.message)
        this.$bvModal.hide('scheduleDetailsModal')
      }).finally(() => {
        this.requestLoading = false
      })
    },
    editSlot (schedule) {
      this.requestLoading = true
      scheduleServices.editSchedule(this.scheduleId, schedule).then(res => {
        this.reloadTable = true
        core.showSnackbar('sucess', res.data.message)
        this.$bvModal.hide('scheduleDetailsModal')
      }).finally(() => {
        this.requestLoading = false
      })
    },
    showDetails (obj) {
      this.scheduleId = ''
      this.typeOfModal = 'view'
      scheduleServices.getScheduleDetails(obj.id).then(res => {
        console.log(res.data.data)
        this.scheduleDetails = res.data.data
        this.$bvModal.show('scheduleDetailsModal')
      })
    },
    showScheduleToEdit (obj) {
      this.typeOfModal = 'edit'
      this.scheduleId = obj.id
      scheduleServices.getScheduleDetails(obj.id).then(res => {
        this.scheduleDetails = res.data.data
        this.$bvModal.show('scheduleDetailsModal')
      })
    },
    getAllFlows () {
      this.requestLoading = true
      flowsServices.getAllFlows().then(res => {
        this.allFlows = res.data.data.data
        console.log(this.allFlows)
        this.requestLoading = false
      })
    },
    getSchedule () {
      this.requestLoading = true
      scheduleServices.getAllSlots().then(res => {
        this.allSlots = res.data.data.data
        this.requestLoading = false
        console.log(this.allSlots.filter((ele) => { return ele.day === 'sunday' }))
      })
    }
  },
  created () {
    this.getSchedule()
    this.getAllFlows()
    this.$root.$on('showSchedule', this.showDetails)
    this.$root.$on('showScheduleToEdit', this.showScheduleToEdit)
  },
  beforeDestroy () {
    this.$root.$off('showSchedule')
    this.$root.$off('showScheduleToEdit')
  },
  mounted () {
    core.index()
  }
}
</script>
