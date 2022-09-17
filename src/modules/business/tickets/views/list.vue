<template>
  <b-container fluid>
    <!--  Add and Edit Modal  -->
    <main-modal id="ticketsDetailsModal" size="lg">
      <template v-slot:header>
        <h4 class="font-weight-bold" v-if="typeOfModal == 'add'" ><span class="text-warning" >Add: </span> Ticket</h4>
        <h4 class="font-weight-bold" v-else><span class="text-info" >Edit: </span> Ticket</h4>
      </template>
      <template v-slot:body>
        <ticket-details @addTicket="addTicket"
                        @editTicket="editTicket"
                        :requestLoading="requestLoading"
                        :ticketDetails="ticketDetails"
                        :typeOfModal="typeOfModal"/>
      </template>
    </main-modal>
    <!--  View Modal  -->
    <main-modal id="ticketDetailsViewModal" size="lg">
      <template v-slot:header>
        <h4 class="font-weight-bold"><span class="text-success-light">View: </span> Ticket</h4>
      </template>
      <template v-slot:borderHeader>
        <p class="p-4 borderHeaderModal">
          {{ticketDetails.name}}
        </p>
      </template>
      <template v-slot:body>
        <ticket-view :ticketDetails="ticketDetails"/>
      </template>
    </main-modal>
    <b-row>
      <div v-if="arrangeMode" class="position-absolute arrange-overlay">
        <p class="position-absolute arrange-text text-warning">You are in arrange mode now, specify the order of the selected
          item</p></div>
      <b-col lg="12" class="mb-2 d-flex justify-content-between align-items-center">
        <h3>Tickets</h3>
        <div class="d-flex justify-content-between gap-20">
          <b-button @click="arrangeMode = !arrangeMode" variant="dark" class="add_button text-white">
            <span v-if="!arrangeMode">Arrange<i class="fas fa-arrow-down-arrow-up"></i></span>
            <span v-else>Save</span>
          </b-button>
          <b-button @click="openPopup" variant="warning" class="add_button text-white">
          Add Ticket<i class="las la-plus ml-3"></i></b-button>
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
import ticketDetails from '@/modules/business/tickets/components/ticketDetails.vue'
import ticketView from '@/modules/business/tickets/components/ticketView'
import ticketServices from '@/modules/business/tickets/services/tickets.services.js'
export default {
  data () {
    return {
      reloadTable: false,
      requestLoading: false,
      columns: [
        { label: '#', key: 'sort', class: 'text-left', type: 'sort' },
        { label: 'Ticket Name', key: 'name', class: 'text-left' },
        { label: 'Details', key: 'details', class: 'text-left' },
        { label: 'Price', key: 'price_egp,price_euro,price_dollar', class: 'text-left', type: 'multi-currency' },
        { label: 'Discounted Price', key: 'discount_price_egp,discount_price_euro,discount_price_dollar', class: 'text-left', type: 'multi-currency' },
        /*   { label: 'Conditions', key: 'conditions', class: 'text-left' }, */
        {
          label: 'Change Status',
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
              actionName: 'showTicket',
              actionParams: 'fullObj'
            },
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
  components: {
    ticketDetails,
    ticketView
  },
  methods: {
    sortChanged (key) {
      console.log(key)
    },
    openPopup () {
      this.ticketId = ''
      this.typeOfModal = 'add'
      this.ticketDetails = false
      this.$bvModal.show('ticketsDetailsModal')
    },
    addTicket (ticket) {
      this.requestLoading = true
      this.reloadTable = false
      ticketServices.addNewTicket(ticket).then(res => {
        this.reloadTable = true
        core.showSnackbar('success', res.data.message)
        this.$bvModal.hide('ticketsDetailsModal')
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
        this.$bvModal.hide('ticketsDetailsModal')
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
      this.$bvModal.show('ticketsDetailsModal')
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
