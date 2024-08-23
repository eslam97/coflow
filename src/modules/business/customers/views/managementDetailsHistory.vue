<template>
  <div>
    <div class="mb-2 d-flex justify-content-between align-items-center">
      <h3>History</h3>

      <div class="d-flex justify-content-between gap-20">
        <b-button variant="light" class="btn bg-white add_button">
          Export <i class="las la-print ml-3"></i>
        </b-button>
      </div>
    </div>

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
            <span>Item:</span>
            <main-select
              v-model="filter.item"
              :options="itemFilterOptions"
              label="key"
              :reduce="data => data.value"
              placeholder="--Select--"
            />
          </b-col>

          <b-col md="3" sm="6">
            <span>Name:</span>
            <b-form-input v-model="filter.name" placeholder="Search by Admins/Item Name"></b-form-input>
          </b-col>
        </b-row>
      </iq-card>

    <main-table
      :fields="columns"
      class="mb-0 table-borderless"
      :items="items"
    />
  </div>
</template>
<script>
import { core } from '@/config/pluginInit'
import { managementHistoryItems } from '../services/data'

export default {
  data () {
    return {
      items: managementHistoryItems,
      columns: [
        { label: '#', key: 'id', class: 'text-center', type: 'sort' },
        { label: 'Admin', key: 'admin', class: 'text-left' },
        { label: 'Date', key: 'date', class: 'text-left text-bold', type: 'sort' },
        { label: 'Action', key: 'action', class: 'text-left' },
        { label: 'Item', key: 'item', class: 'text-left', type: 'sort' },
        { label: 'Name', key: 'name', class: 'text-left' },
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
            }
          ]
        }
      ],
      filter: { name: '', date: '', action: '', item: '' },
      actionFilterOptions: [
        { key: 'Purchase', value: 'Purchase' },
        { key: 'Gift', value: 'Gift' },
        { key: 'Collection', value: 'Collection' },
        { key: 'Refund', value: 'Refund' },
        { key: 'Expiration', value: 'Expiration' },
        { key: 'Reservation', value: 'Reservation' }
      ],
      itemFilterOptions: [
        { key: 'Ticket', value: 'Ticket' },
        { key: 'Coupon', value: 'Coupon' },
        { key: 'Package', value: 'Package' },
        { key: 'Buy&Get', value: 'Buy&Get' },
        { key: 'Activity', value: 'Activity' },
        { key: 'Flow', value: 'Flow' }
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
