<template>
  <b-container fluid>
    <main-modal id="activitiesDetailsModal" size="xl">
      <template v-slot:header>
        <h4 class="font-weight-bold" v-if="typeOfModal == 'add'" ><span class="text-warning">Add: </span> Activity</h4>
        <h4 class="font-weight-bold" v-else-if="typeOfModal == 'view'" ><span class="text-success-light">View: </span> Activity</h4>
        <h4 class="font-weight-bold" v-else><span class="text-info" >Edit: </span> Activity</h4>
      </template>
      <template v-slot:body>
        <activities-details @addActivity="addActivity"
                                @editActivity="editActivity"
                                :requestLoading="requestLoading"
                                :activitiesDetails="activitiesDetails"
                                :typeOfModal="typeOfModal"/>
      </template>
    </main-modal>
    <b-row>
      <b-col lg="12" class="mb-2 d-flex justify-content-between align-items-center">
        <h3>Activities</h3>
        <div>
          <b-button @click="openPopup" variant="warning" class="add_button text-white">
            Add Activity<i class="las la-plus ml-3"></i></b-button>
        </div>
      </b-col>
      <b-col lg="12">
        <main-table
            :fields="columns"
            class="mb-0 table-borderless"
            @sortChanged="sortChanged"
            :list_url="'activities'"
            :reloadData="reloadTable"
        >
        </main-table>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { core } from '@/config/pluginInit'
import activitiesDetails from '@/modules/business/activities/components/activitiesDetails.vue'
import activitiesServices from '@/modules/business/activities/services/activities.services.js'
export default {
  data () {
    return {
      reloadTable: false,
      requestLoading: false,
      columns: [
        { label: '#', key: 'id', class: 'text-left' },
        { label: 'Activity Name', key: 'name', class: 'text-left' },
        { label: 'Description', key: 'description', class: 'text-left' },
        { label: 'Price EGP/EUR', key: 'price_egp,price_euro', class: 'text-left', type: 'multi-value', pre: 'EGP,EUR' },
        { label: 'Discounted Price', key: 'discount_price_egp,discount_price_euro', class: 'text-left', type: 'multi-value' },
        { label: 'Conditions', key: 'conditions', class: 'text-left' },
        { label: 'Duration', key: 'duration', class: 'text-left' },
        { label: 'Photos', key: 'images', class: 'text-left', type: 'multi_image' },
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
              actionName: 'showActivities',
              actionParams: ['id']
            },
            {
              icon: 'las la-pen',
              color: 'info',
              text: 'Edit',
              actionName: 'showActivitiesToEdit',
              actionParams: ['id']
            },
            {
              icon: 'las la-trash-alt',
              color: 'danger',
              text: 'Delete',
              showAlert: true,
              actionHeader: 'Delete',
              titleHeader: 'Activities',
              textContnet: 'name',
              url: 'activities'
            }
          ]
        }
      ],
      typeOfModal: 'add',
      activitiesDetails: {},
      activitiesId: ''
    }
  },
  components: {
    activitiesDetails
  },
  methods: {
    sortChanged (key) {
      console.log(key)
    },
    openPopup () {
      this.activitiesId = ''
      this.typeOfModal = 'add'
      this.activitiesDetails = false
      this.$bvModal.show('activitiesDetailsModal')
    },
    addActivity (activities) {
      this.requestLoading = true
      activitiesServices.addNewActivity(activities).then(res => {
        this.reloadTable = true
        core.showSnackbar('success', res.data.message)
        this.$bvModal.hide('activitiesDetailsModal')
      }).finally(() => {
        this.requestLoading = false
      })
    },
    editActivity (activities) {
      this.requestLoading = true
      activitiesServices.editActivity(this.activitiesId, activities).then(res => {
        this.reloadTable = true
        core.showSnackbar('success', res.data.message)
        this.$bvModal.hide('activitiesDetailsModal')
      }).finally(() => {
        this.requestLoading = false
      })
    },
    showDetails (obj) {
      this.activitiesId = ''
      this.typeOfModal = 'view'
      activitiesServices.getActivitiesDetails(obj.id).then(res => {
        this.activitiesDetails = res.data.data
        this.$bvModal.show('activitiesDetailsModal')
      })
    },
    showActivitiesToEdit (obj) {
      this.typeOfModal = 'edit'
      this.activitiesId = obj.id
      console.log(this.activitiesId)
      activitiesServices.getActivitiesDetails(obj.id).then(res => {
        this.activitiesDetails = res.data.data
        this.$bvModal.show('activitiesDetailsModal')
      })
    }
  },
  created () {
    this.$root.$on('showActivities', this.showDetails)
    this.$root.$on('showActivitiesToEdit', this.showActivitiesToEdit)
  },
  beforeDestroy () {
    this.$root.$off('showActivities')
    this.$root.$off('showActivitiesToEdit')
  },
  mounted () {
    core.index()
  }
}
</script>
