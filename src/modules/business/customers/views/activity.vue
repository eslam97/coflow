<template>
  <b-container fluid>
    <b-row>
      <b-col lg="12" class="mb-2 d-flex justify-content-between align-items-center">
        <h3>Activity</h3>

        <div class="d-flex justify-content-between gap-20">
          <b-button @click="openPopup" variant="light" class="btn bg-white add_button">
            Export <i class="las la-print ml-3"></i>
          </b-button>
        </div>
      </b-col>

      <b-col lg="12" class="mb-2">
        <iq-card class="filter-card">
          <b-row>
            <b-col md="3" sm="6">
              <span>Action:</span>
              <main-select
                v-model="filter.action"
                :options="actionFilterOptions"
                label="key"
                :reduce="data => data.value"
                placeholder="--Select--"
              />
            </b-col>
            <b-col md="3" sm="6">
              <span>Purchase:</span>
              <main-select
                v-model="filter.purchase"
                :options="purchaseFilterOptions"
                label="key"
                :reduce="data => data.value"
                placeholder="--Select--"
              />
            </b-col>
            <b-col md="3" sm="6">
              <span>Status:</span>
              <main-select
                v-model="filter.status"
                :options="statusFilterOptions"
                label="key"
                :reduce="data => data.value"
                placeholder="--Select--"
              />
            </b-col>

            <b-col md="3" sm="6">
              <span>Name:</span>
              <b-form-input v-model="filter.name" placeholder="Search by Admins/Customer/Purchases Name"></b-form-input>
            </b-col>
          </b-row>
        </iq-card>
      </b-col>

      <b-col lg="12">
        <main-table
          :fields="columns"
          class="mb-0 table-borderless"
          :items="items"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { core } from '@/config/pluginInit'
import { purchasessItems } from '../services/data'

export default {
  data () {
    return {
      items: purchasessItems,
      columns: [
        { label: '#', key: 'id', class: 'text-center', type: 'sort' },
        { label: 'Admin', key: 'admin', class: 'text-left' },
        { label: 'Date', key: 'date', class: 'text-left text-bold' },
        { label: 'Customer', key: 'customer', class: 'text-left' },
        { label: 'Action', key: 'action', class: 'text-left' },
        { label: 'Purchase', key: 'purchase', class: 'text-left' },
        { label: 'Name', key: 'name', class: 'text-left' },
        { label: 'Amount', key: 'amount', class: 'text-left', type: 'sort' },
        { label: 'Status', key: 'status', class: 'text-left' },
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
              icon: 'las la-folder-plus',
              color: 'warning',
              text: 'Edit',
              actionName: 'showActivityToEdit',
              actionParams: 'fullObj'
            },
            {
              icon: 'las la-flag',
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
      filter: { name: '', date: '', action: '', purchase: '', status: '' },
      actionFilterOptions: [
        { key: 'Purchase', value: 'Purchase' },
        { key: 'Refund', value: 'Refund' },
        { key: 'Expiration', value: 'Expiration' }
      ],
      purchaseFilterOptions: [
        { key: 'Package', value: 'Package' },
        { key: 'BuyGet', value: 'BuyGet' },
        { key: 'Ticket', value: 'Ticket' }
      ],
      statusFilterOptions: [
        { key: 'DOP', value: 'DOP' },
        { key: 'PAID', value: 'PAID' },
        { key: 'DUE', value: 'DUE' },
        { key: 'FOP', value: 'FOP' }
      ]
    }
  },
  components: {},
  methods: {},
  created () {},
  mounted () {
    core.index()
  }
}
</script>
