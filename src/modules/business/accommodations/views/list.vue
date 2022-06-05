<template>
  <b-container fluid>
    <main-modal id="accommodationsDetailsModal" size="xl">
      <template v-slot:header>
        <h4 class="font-weight-bold" v-if="typeOfModal == 'add'" ><span class="text-warning">Add: </span> Accommodation</h4>
        <h4 class="font-weight-bold" v-else-if="typeOfModal == 'view'" ><span class="text-success-light">View: </span> Accommodation</h4>
        <h4 class="font-weight-bold" v-else><span class="text-info" >Edit: </span> Accommodation</h4>
      </template>
      <template v-slot:body>
        <accommodations-details @addAccommodation="addAccommodation"
                      @editAccommodation="editAccommodation"
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
import accommodationsDetails from '@/modules/business/accommodations/components/accommodationsDetails.vue'
import accommodationsServices from '@/modules/business/accommodations/services/accommodations.services.js'
export default {
  data () {
    return {
      reloadTable: false,
      requestLoading: false,
      columns: [
        { label: '#', key: 'id', class: 'text-left' },
        { label: 'Accommodation Name', key: 'name', class: 'text-left' },
        { label: 'Type', key: 'accommodation_type.name', class: 'text-left' },
        { label: 'Description', key: 'description', class: 'text-left' },
        { label: 'Price EGP/EUR', key: 'price_egp,price_euro', class: 'text-left', type: 'multi-value', pre: 'EGP,EUR' },
        { label: 'Discounted Price', key: 'discount_price_egp,discount_price_euro', class: 'text-left', type: 'multi-value' },
        { label: 'Conditions', key: 'conditions', class: 'text-left' },
        { label: 'Amenities', key: 'amenities', class: 'text-left', type: 'array' },
        { label: 'Photos', key: 'images', class: 'text-left', type: 'multi_image' },
        {
          label: 'Change Status',
          key: 'change_status',
          type: 'switch',
          tableType: 'accommodation',
          idKey: 'accommodation_id',
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
    addAccommodation (accommodations) {
      this.requestLoading = true
      accommodationsServices.addNewAccommodation(accommodations).then(res => {
        this.reloadTable = true
        core.showSnackbar('success', res.data.message)
        this.$bvModal.hide('accommodationsDetailsModal')
      }).finally(() => {
        this.requestLoading = false
      })
    },
    editAccommodation (accommodations) {
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
      accommodationsServices.getAccommodationsDetails(obj.id).then(res => {
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
