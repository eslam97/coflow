<template>
  <b-container fluid>
    <!--  Add and Edit Modal  -->
    <main-modal id="accommodationsDetailsModal" size="xl">
      <template v-slot:header>
        <h4 class="font-weight-bold" v-if="typeOfModal == 'add'" ><span class="text-warning">Add: </span> Accommodation</h4>
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
    <!--  View Modal  -->
    <main-modal id="accommodationDetailsViewModal" size="lg" border="true">
      <template v-slot:header>
        <h4 class="font-weight-bold"><span class="text-success-light">View: </span> Accommodation</h4>
      </template>
      <template v-slot:borderHeader class="flex-nowrap">
        <span class="p-4 borderHeaderModal m-0" v-if="accommodationsDetails">
          {{accommodationsViewData.name}}, {{accommodationsViewData.type}}
        </span>
      </template>
      <template v-slot:body>
        <accommodations-view :accommodationsDetails="accommodationsDetails"/>
      </template>
    </main-modal>
    <b-row>
      <div v-if="arrangeMode" class="position-absolute arrange-overlay">
        <p class="position-absolute arrange-text text-warning">You are in arrange mode now, specify the order of the selected
          item</p></div>
      <b-col lg="12" class="mb-2 d-flex justify-content-between align-items-center">
        <h3>Accommodations</h3>
        <div class="d-flex justify-content-between gap-20">
          <b-button @click="arrangeMode = !arrangeMode" variant="dark" class="add_button text-white">
            <span v-if="!arrangeMode">Arrange<i class="fas fa-arrow-down-arrow-up"></i></span>
            <span v-else>Save</span>
          </b-button>
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
            :service_type="'accommodation'"
            :arrangeMode="arrangeMode"
        >
        </main-table>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { core } from '@/config/pluginInit'
import accommodationsDetails from '@/modules/business/accommodations/components/accommodationsDetails.vue'
import accommodationsView from '@/modules/business/accommodations/components/accommodationsView'
import accommodationsServices from '@/modules/business/accommodations/services/accommodations.services.js'
export default {
  data () {
    return {
      reloadTable: false,
      requestLoading: false,
      columns: [
        { label: '#', key: 'sort', class: 'text-left', type: 'sort' },
        { label: 'Accommodation Name', key: 'name', class: 'text-left' },
        { label: 'Type', key: 'accommodation_type.name', class: 'text-left' },
        /* { label: 'Description', key: 'description', class: 'text-left' }, */
        { label: 'Price', key: 'price_egp,price_euro,price_dollar', class: 'text-left', type: 'multi-currency' },
        { label: 'Discounted Price', key: 'discount_price_egp,discount_price_euro,discount_price_dollar', class: 'text-left', type: 'multi-currency' },
        /* { label: 'Conditions', key: 'conditions', class: 'text-left' }, */
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
              actionParams: 'fullObj'
            },
            {
              icon: 'las la-pen',
              color: 'info',
              text: 'Edit',
              actionName: 'showAccommodationsToEdit',
              actionParams: 'fullObj'
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
      accommodationsViewData: {},
      accommodationsId: '',
      arrangeMode: false
    }
  },
  components: {
    accommodationsDetails,
    accommodationsView
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
      this.reloadTable = false
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
      this.reloadTable = false
      accommodationsServices.editAccommodation(this.accommodationsId, accommodations).then(res => {
        this.reloadTable = true
        core.showSnackbar('success', res.data.message)
        this.$bvModal.hide('accommodationsDetailsModal')
      }).finally(() => {
        this.requestLoading = false
      })
    },
    showDetails (obj) {
      this.accommodationsViewData.name = obj.name
      this.accommodationsViewData.type = obj.accommodation_type.name
      this.accommodationsDetails = obj
      this.accommodationsId = ''
      this.typeOfModal = 'view'
      this.$bvModal.show('accommodationDetailsViewModal')
    },
    showAccommodationsToEdit (obj) {
      this.typeOfModal = 'edit'
      this.accommodationsId = obj.id
      this.accommodationsDetails = obj
      this.$bvModal.show('accommodationsDetailsModal')
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
