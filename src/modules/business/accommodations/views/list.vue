<template>
  <b-container fluid>
    <main-modal id="accommodationsDetailsModal" size="xl">
      <template v-slot:header>
        <h4 class="font-weight-bold" v-if="typeOfModal == 'add'" ><span class="text-warning">Add: </span> Accommodation</h4>
        <h4 class="font-weight-bold" v-else-if="typeOfModal == 'view'" ><span class="text-success-light">View: </span> Accommodation</h4>
        <h4 class="font-weight-bold" v-else><span class="text-info" >Edit: </span> Accommodation</h4>
      </template>
      <template v-slot:body>
        <accommodations-details @addAccommodations="addAccommodations"
                      @editAccommodations="editAccommodations"
                      :requestLoading="requestLoading"
                      :accommodationsDetails="accommodationsDetails"
                      :typeOfModal="typeOfModal"/>
      </template>
    </main-modal>
    <b-row>
      <b-col lg="12" class="mb-2 d-flex justify-content-between align-items-center">
        <h3>Accommodations</h3>
        <div>
          <b-button @click="openPopup" variant="warning" class="add_button text-white">
          Add Accommodation<i class="las la-plus ml-3"></i></b-button>
        </div>
      </b-col>
      <b-col lg="12">
        <main-table
            :fields="columns"
            class="mb-0 table-borderless"
            @sortChanged="sortChanged"
            :list_url="'accommodations'"
            :reloadData="reloadTable"
        >
        </main-table>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { core } from '@/config/pluginInit'
import accommodationsDetails from '@/modules/business/accommodations/component/accommodationsDetails.vue'
import accommodationsServices from '@/modules/business/accommodations/services/accommodations.services.js'
export default {
  data () {
    return {
      reloadTable: false,
      requestLoading: false,
      columns: [
        { label: '#', key: 'id', class: 'text-left' },
        { label: 'Accommodation Name', key: 'name', class: 'text-left' },
        { label: 'Type', key: 'description', class: 'text-left' },
        { label: 'Description', key: 'description', class: 'text-left' },
        { label: 'Price EGP Price EUR', key: 'price_egp', class: 'text-left' },
        { label: 'Discounted Price', key: 'discounted_price_egp', class: 'text-left' },
        { label: 'Conditions', key: 'conditions', class: 'text-left' },
        { label: 'Amenities', key: 'amenities', class: 'text-left' },
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
              actionName: 'showAccommodations',
              actionParams: ['id']
            },
            {
              icon: 'las la-pen',
              color: 'info',
              text: 'Edit',
              actionName: 'showAccommodationsToEdit',
              actionParams: ['id']
            },
            {
              icon: 'las la-trash-alt',
              color: 'danger',
              text: 'Delete',
              showAlert: true,
              actionHeader: 'Delete',
              titleHeader: 'Accommodations',
              textContent: 'name',
              url: 'accommodations'
            }
          ]
        }
      ],
      typeOfModal: 'add',
      accommodationsDetails: {},
      accommodationsId: ''
    }
  },
  components: {
    accommodationsDetails
  },
  methods: {
    sortChanged (key) {
      console.log(key)
    },
    openPopup () {
      this.accommodationsId = ''
      this.typeOfModal = 'add'
      this.accommodationsDetails = false
      this.$bvModal.show('accommodationsDetailsModal')
    },
    addAccommodations (accommodations) {
      this.requestLoading = true
      accommodationsServices.addNewAccommodation(accommodations).then(res => {
        this.reloadTable = true
        core.showSnackbar('success', res.data.message)
        this.$bvModal.hide('accommodationsDetailsModal')
      }).finally(() => {
        this.requestLoading = false
      })
    },
    editAccommodations (accommodations) {
      this.requestLoading = true
      accommodationsServices.editAccommodation(this.accommodationsId, accommodations).then(res => {
        this.reloadTable = true
        core.showSnackbar('success', res.data.message)
        this.$bvModal.hide('accommodationsDetailsModal')
      }).finally(() => {
        this.requestLoading = false
      })
    },
    showDetails (obj) {
      this.accommodationsId = ''
      this.typeOfModal = 'view'
      accommodationsServices.getAccommodationsDetails(obj.id).then(res => {
        this.accommodationsDetails = res.data.data
        this.$bvModal.show('accommodationsDetailsModal')
      })
    },
    showAccommodationsToEdit (obj) {
      this.typeOfModal = 'edit'
      this.accommodationsId = obj.id
      console.log(this.accommodationsId)
      accommodationsServices.getaccommodationsDetails(obj.id).then(res => {
        this.accommodationsDetails = res.data.data
        this.$bvModal.show('accommodationsDetailsModal')
      })
    }
  },
  created () {
    this.$root.$on('showAccommodations', this.showDetails)
    this.$root.$on('showAccommodationsToEdit', this.showAccommodationsToEdit)
  },
  beforeDestroy () {
    this.$root.$off('showAccommodations')
    this.$root.$off('showAccommodationsToEdit')
  },
  mounted () {
    core.index()
  }
}
</script>
