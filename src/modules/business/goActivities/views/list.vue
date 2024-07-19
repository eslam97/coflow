<template>
  <b-container fluid>
    <!--  Add and Edit Modal  -->
    <main-modal id="activitiesDetailsModal" size="xl">
      <template v-slot:header>
        <h4 class="font-weight-bold" v-if="typeOfModal == 'add'" ><span class="text-warning" >Add: </span> Activity</h4>
        <h4 class="font-weight-bold" v-else><span class="text-info" >Edit: </span> Activity</h4>
      </template>
      <template v-slot:body>
        <activity-details @addActivity="addActivity"
                        @editActivity="editActivity"
                        :requestLoading="requestLoading"
                        :activityDetails="activityDetails"
                        :typeOfModal="typeOfModal"/>
      </template>
    </main-modal>
    <!--  View Modal  -->
    <main-modal id="activityDetailsViewModal" size="xl">
      <template v-slot:header>
        <h4 class="font-weight-bold"><span class="text-success-light">View: </span> Activity</h4>
      </template>
      <template v-slot:borderHeader>
        <p class="p-4 px-5 borderHeaderModal">
          {{activityDetails.name}}
        </p>
      </template>
      <template v-slot:body>
        <activity-view :activityDetails="activityDetails"/>
      </template>
    </main-modal>
    <b-row>
      <div v-if="arrangeMode" class="position-absolute arrange-overlay">
        <p class="position-absolute arrange-text text-warning">You are in arrange mode now, specify the order of the selected
          item</p></div>
      <b-col lg="12" class="mb-2 d-flex justify-content-between align-items-center">
        <h3>Activities</h3>
        <div class="d-flex justify-content-between gap-20">
          <b-button @click="arrangeMode = !arrangeMode" variant="dark" class="add_button text-white">
            <span v-if="!arrangeMode">Arrange<i class="fas fa-arrow-down-arrow-up"></i></span>
            <span v-else>Save</span>
          </b-button>
          <router-link :to="{ name: 'goActivitiesFolders' }" class="btn bg-white add_button" >
            Folders
            <i class="far fa-folder ml-3"></i>
          </router-link>
          <b-button @click="openPopup" variant="warning" class="add_button text-white">
          Add Activity<i class="las la-plus ml-3"></i></b-button>
        </div>
      </b-col>
      <b-col lg="12">
        <main-table
            :fields="columns"
            class="mb-0 table-borderless"
            @sortChanged="sortChanged"
            :list_url="'tickets'"
            :reloadData="reloadTable"
            :service_type="'ticket'"
            :arrangeMode="arrangeMode"
        >
        </main-table>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { core } from '@/config/pluginInit'
import activityDetails from '@/modules/business/goActivities/components/activityDetails.vue'
import activityView from '@/modules/business/goActivities/components/activityView'
import activityServices from '@/modules/business/goActivities/services/goActivities.services.js'
export default {
  data () {
    return {
      reloadTable: false,
      requestLoading: false,
      columns: [
        { label: '#', key: 'sort', class: 'text-center', type: 'sort' },
        { label: 'Activity Name', key: 'name', class: 'text-left text-bold' },
        { label: 'Tag', key: 'price_egp', class: 'text-left' },
        { label: 'Folder', key: 'discount_price_egp', class: 'text-left' },
        { label: 'Duration', key: 'duration,duration_list.name', class: 'text-left', type: 'multi-text' },
        { label: 'Photos', key: 'images', class: 'text-left', type: 'multi_image' },
        { label: 'Reservations', key: 'reservations', class: 'text-left' },
        { label: 'Rating', key: 'rate', class: 'text-left' },
        {
          label: 'Status',
          key: 'change_status',
          type: 'switch',
          tableType: 'ticket',
          idKey: 'ticket_id',
          class: 'text-left'
        },
        {
          label: 'Actions',
          key: 'actions',
          class: 'text-left',
          type: 'actions',
          actions: [
            {
              icon: 'las la-eye',
              color: 'success-light',
              text: 'View',
              actionName: 'showActivity',
              actionParams: 'fullObj'
            },
            {
              icon: 'las la-pen',
              color: 'info',
              text: 'Edit',
              actionName: 'showActivityToEdit',
              actionParams: 'fullObj'
            },
            {
              icon: 'las la-trash-alt',
              color: 'danger',
              text: 'Delete',
              showAlert: true,
              actionHeader: 'Delete',
              titleHeader: 'Activity',
              textContent: 'name',
              url: 'tickets'
            }
          ]
        }
      ],
      typeOfModal: 'add',
      activityDetails: {},
      activityId: '',
      arrangeMode: false
    }
  },
  components: {
    activityDetails,
    activityView
  },
  methods: {
    sortChanged (key) {
      console.log(key)
    },
    openPopup () {
      this.activityId = ''
      this.typeOfModal = 'add'
      this.activityDetails = false
      this.$bvModal.show('activitiesDetailsModal')
    },
    addActivity (activity) {
      this.requestLoading = true
      this.reloadTable = false
      activityServices.addNewActivity(activity).then(res => {
        this.reloadTable = true
        core.showSnackbar('success', res.data.message)
        this.$bvModal.hide('activitiesDetailsModal')
      }).finally(() => {
        this.requestLoading = false
      })
    },
    editActivity (activity) {
      this.requestLoading = true
      this.reloadTable = false
      activityServices.editActivity(this.activityId, activity).then(res => {
        this.reloadTable = true
        core.showSnackbar('success', res.data.message)
        this.$bvModal.hide('activitiesDetailsModal')
      }).finally(() => {
        this.requestLoading = false
      })
    },
    showDetails (obj) {
      this.typeOfModal = 'view'
      this.activityDetails = obj
      this.$bvModal.show('activityDetailsViewModal')
    },
    showActivityToEdit (obj) {
      this.activityId = obj.id
      this.typeOfModal = 'edit'
      this.activityDetails = obj
      this.$bvModal.show('activitiesDetailsModal')
    }
  },
  created () {
    this.$root.$on('showActivity', this.showDetails)
    this.$root.$on('showActivityToEdit', this.showActivityToEdit)
  },
  beforeDestroy () {
    this.$root.$off('showActivity')
    this.$root.$off('showActivityToEdit')
  },
  mounted () {
    core.index()
  }
}
</script>
