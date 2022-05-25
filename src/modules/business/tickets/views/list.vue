<template>
  <b-container fluid>
    <main-modal id="ticketsDetailsModal" size="lg">
      <template v-slot:header>
        <h4 class="font-weight-bold" v-if="typeOfModal == 'add'" ><span class="text-warning" >Add: </span> Ticket</h4>
        <h4 class="font-weight-bold" v-else-if="typeOfModal == 'view'" ><span class="text-success-light" >View: </span> Ticket</h4>
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
    <b-row>
      <b-col lg="12" class="mb-2 d-flex justify-content-between align-items-center">
        <h3>Tickets</h3>
        <div>
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
        >
        </main-table>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { core } from '@/config/pluginInit'
import ticketDetails from '@/modules/business/tickets/components/ticketDetails.vue'
import ticketServices from '@/modules/business/tickets/services/tickets.services.js'
export default {
  data () {
    return {
      reloadTable: false,
      requestLoading: false,
      columns: [
        { label: '#', key: 'id', class: 'text-left' },
        { label: 'Ticket Name', key: 'name', class: 'text-left' },
        { label: 'Details', key: 'details', class: 'text-left' },
        { label: 'Price EGP', key: 'price_egp', class: 'text-left' },
        { label: 'Discounted Price', key: 'discount_price_egp', class: 'text-left' },
        { label: 'Conditions', key: 'conditions', class: 'text-left' },
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
              actionParams: ['id']
            },
            {
              icon: 'las la-pen',
              color: 'info',
              text: 'Edit',
              actionName: 'showTicketToEdit',
              actionParams: ['id']
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
      ticketId: ''
    }
  },
  components: {
    ticketDetails
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
      ticketServices.addNewTicket(ticket).then(res => {
        this.reloadTable = true
        core.showSnackbar('success', res.data.message)
        this.$bvModal.hide('ticketsDetailsModal')
      }).finally(() => {
        this.requestLoading = false
        this.reloadTable = false
      })
    },
    editTicket (ticket) {
      this.requestLoading = true
      ticketServices.editTicket(this.ticketId, ticket).then(res => {
        this.reloadTable = true
        core.showSnackbar('sucess', res.data.message)
        this.$bvModal.hide('ticketsDetailsModal')
      }).finally(() => {
        this.requestLoading = false
      })
    },
    showDetails (obj) {
      this.ticketId = ''
      this.typeOfModal = 'view'
      ticketServices.getTicketDetails(obj.id).then(res => {
        console.log(res.data.data)
        this.ticketDetails = res.data.data
        this.$bvModal.show('ticketsDetailsModal')
      })
    },
    showTicketToEdit (obj) {
      this.typeOfModal = 'edit'
      this.ticketId = obj.id
      ticketServices.getTicketDetails(obj.id).then(res => {
        this.ticketDetails = res.data.data
        this.$bvModal.show('ticketsDetailsModal')
      })
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
