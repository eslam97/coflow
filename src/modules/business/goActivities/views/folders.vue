<template>
  <b-container fluid>
    <b-row>
      <div v-if="arrangeMode" class="position-absolute arrange-overlay">
        <p class="position-absolute arrange-text text-warning">You are in arrange mode now, specify the order of the selected
          item</p>
      </div>

      <b-col lg="12" class="mb-2 d-flex justify-content-between align-items-center">
        <h3>
          <router-link :to="{ name: 'goActivities' }" class="btn bg-white add_button" >
            <i class="fa fa-chevron-left"></i>
          </router-link>
          Folders
        </h3>
        <div class="d-flex justify-content-between gap-20">
          <b-button @click="arrangeMode = !arrangeMode" variant="dark" class="add_button text-white">
            <span v-if="!arrangeMode">Arrange<i class="fas fa-arrow-down-arrow-up"></i></span>
            <span v-else>Save</span>
          </b-button>
          <b-button @click="openPopup" variant="warning" class="add_button text-white">
          Add Folder<i class="las la-plus ml-3"></i></b-button>
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
import ticketServices from '@/modules/business/goActivities/services/goActivities.services.js'
export default {
  data () {
    return {
      reloadTable: false,
      requestLoading: false,
      columns: [
        { label: '#', key: 'sort', class: 'text-center', type: 'sort' },
        { label: 'Folder Name', key: 'name', class: 'text-left' },
        {
          label: 'Actions',
          key: 'actions',
          class: 'text-left',
          type: 'actions',
          actions: [
            {
              icon: 'las la-pen',
              color: 'info',
              text: 'Edit',
              actionName: 'showTicketToEdit',
              actionParams: 'fullObj'
            },
            {
              icon: 'las la-trash-alt',
              color: 'danger',
              text: 'Delete',
              showAlert: true,
              actionHeader: 'Delete',
              titleHeader: 'Ticket',
              textContent: 'name',
              url: 'tickets'
            }
          ]
        }
      ],
      typeOfModal: 'add',
      ticketDetails: {},
      ticketId: '',
      arrangeMode: false
    }
  },
  methods: {
    sortChanged (key) {
      console.log(key)
    },
    openPopup () {
      this.ticketId = ''
      this.typeOfModal = 'add'
      this.ticketDetails = false
      this.$bvModal.show('activitiesDetailsModal')
    },
    addTicket (ticket) {
      this.requestLoading = true
      this.reloadTable = false
      ticketServices.addNewTicket(ticket).then(res => {
        this.reloadTable = true
        core.showSnackbar('success', res.data.message)
        this.$bvModal.hide('activitiesDetailsModal')
      }).finally(() => {
        this.requestLoading = false
      })
    },
    editTicket (ticket) {
      this.requestLoading = true
      this.reloadTable = false
      ticketServices.editTicket(this.ticketId, ticket).then(res => {
        this.reloadTable = true
        core.showSnackbar('success', res.data.message)
        this.$bvModal.hide('activitiesDetailsModal')
      }).finally(() => {
        this.requestLoading = false
      })
    },
    showDetails (obj) {
      this.typeOfModal = 'view'
      this.ticketDetails = obj
      this.$bvModal.show('ticketDetailsViewModal')
    },
    showTicketToEdit (obj) {
      this.ticketId = obj.id
      this.typeOfModal = 'edit'
      this.ticketDetails = obj
      this.$bvModal.show('activitiesDetailsModal')
    }
  },
  created () {
    this.$root.$on('showTicket', this.showDetails)
    this.$root.$on('showTicketToEdit', this.showTicketToEdit)
  },
  beforeDestroy () {
    this.$root.$off('showTicket')
    this.$root.$off('showTicketToEdit')
  },
  mounted () {
    core.index()
  }
}
</script>
