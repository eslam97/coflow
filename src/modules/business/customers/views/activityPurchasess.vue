<template>
  <div>
    <div class="mb-2">
      <iq-card class="filter-card">
        <b-row>
          <b-col md="3" sm="6">
            <span>Date:</span>
            <date-picker
              v-model="filter.date"
              type="date"
              range
              placeholder="Select date range"
              value-type="format"
              format="YYYY-MM-DD"
            />
          </b-col>
          <b-col md="2" sm="6">
            <span>Action:</span>
            <main-select
              v-model="filter.action"
              :options="actionFilterOptions"
              label="key"
              :reduce="data => data.value"
              placeholder="--Select--"
            />
          </b-col>
          <b-col md="2" sm="6">
            <span>Purchase:</span>
            <main-select
              v-model="filter.purchase"
              :options="purchaseFilterOptions"
              label="key"
              :reduce="data => data.value"
              placeholder="--Select--"
            />
          </b-col>
          <b-col md="2" sm="6">
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
    </div>

    <main-table
      :fields="columns"
      class="mb-0 table-borderless"
      :items="items"
    />
  </div>
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
