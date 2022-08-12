<template>
  <b-container fluid>
    <!--  Add and Edit Modal  -->
    <main-modal id="activitiesDetailsModal" size="xl">
      <template v-slot:header>
        <h4 class="font-weight-bold" v-if="typeOfModal == 'add'" ><span class="text-warning">Add: </span> Activity</h4>
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
    <!--  View Modal  -->
    <main-modal id="activitiesDetailsViewModal" size="lg" border="true">
      <template v-slot:header>
        <h4 class="font-weight-bold"><span class="text-success-light">View: </span> Activity</h4>
      </template>
      <template v-slot:borderHeader class="flex-nowrap">
        <p class="p-4 borderHeaderModal m-0">
          {{activitiesViewData.name}}
          <button class="ml-4 p-2 pr-4 pl-4 btn radio-btn" :class="`radio-btn-cyan`" active>
            {{ activitiesViewData.duration }} {{ activitiesViewData.durationType }}
          </button>
        </p>
      </template>
      <template v-slot:body>
        <activities-view :activitiesDetails="activitiesDetails"/>
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
import activitiesView from '@/modules/business/activities/components/activitiesView.vue'
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
        { label: 'Price', key: 'price_egp,price_euro,price_dollar', class: 'text-left', type: 'multi-currency' },
        { label: 'Discounted Price', key: 'discount_price_egp,discount_price_euro,discount_price_dollar', class: 'text-left', type: 'multi-currency' },
        { label: 'Conditions', key: 'conditions', class: 'text-left' },
        { label: 'Duration', key: 'duration,duration_list.name', class: 'text-left', type: 'multi-text' },
        { label: 'Photos', key: 'images', class: 'text-left', type: 'multi_image' },
        {
          label: 'Change Status',
          key: 'change_status',
          type: 'switch',
          tableType: 'activity',
          idKey: 'activity_id',
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
              actionName: 'showActivities',
              actionParams: 'fullObj'
            },
            {
              icon: 'las la-pen',
              color: 'info',
              text: 'Edit',
              actionName: 'showActivitiesToEdit',
              actionParams: 'fullObj'
            },
            {
              icon: 'las la-trash-alt',
              color: 'danger',
              text: 'Delete',
              showAlert: true,
              actionHeader: 'Delete',
              titleHeader: 'Activities',
              textContent: 'name',
              url: 'activities'
            }
          ]
        }
      ],
      typeOfModal: 'add',
      activitiesDetails: {},
      activitiesViewData: {},
      activitiesId: ''
    }
  },
  components: {
    activitiesDetails,
    activitiesView
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
      this.reloadTable = false
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
      this.reloadTable = false
      activitiesServices.editActivity(this.activitiesId, activities).then(res => {
        this.reloadTable = true
        core.showSnackbar('success', res.data.message)
        this.$bvModal.hide('activitiesDetailsModal')
      }).finally(() => {
        this.requestLoading = false
      })
    },
    showDetails (obj) {
      this.activitiesViewData.name = obj.name
      this.activitiesViewData.duration = obj.duration
      this.activitiesViewData.durationType = obj.duration_list.name
      this.activitiesDetails = obj
      this.typeOfModal = 'view'
      this.$bvModal.show('activitiesDetailsViewModal')
    },
    showActivitiesToEdit (obj) {
      this.typeOfModal = 'edit'
      this.activitiesId = obj.id
      this.activitiesDetails = obj
      this.$bvModal.show('activitiesDetailsModal')
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
