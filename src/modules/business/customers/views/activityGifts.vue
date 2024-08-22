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
          <b-col md="3" sm="6">
            <span>Gift:</span>
            <main-select
              v-model="filter.gift"
              :options="giftFilterOptions"
              label="key"
              :reduce="data => data.value"
              placeholder="--Select--"
            />
          </b-col>

          <b-col md="3" sm="6">
            <span>Name:</span>
            <b-form-input v-model="filter.name" placeholder="Search by Admins/Customer/Gift Name"></b-form-input>
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
import { giftsItems } from '../services/data'

export default {
  data () {
    return {
      items: giftsItems,
      columns: [
        { label: '#', key: 'id', class: 'text-center', type: 'sort' },
        { label: 'Admin', key: 'admin', class: 'text-left' },
        { label: 'Date', key: 'date', class: 'text-left text-bold' },
        { label: 'Customer', key: 'customer', class: 'text-left' },
        { label: 'Gift', key: 'gift', class: 'text-left' },
        { label: 'Name', key: 'name', class: 'text-left' },
        { label: 'Quantity', key: 'quantity', class: 'text-left', type: 'sort' },
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
      filter: { name: '', date: '', gift: '' },
      giftFilterOptions: [
        { key: 'Ticket', value: 'Ticket' },
        { key: 'Coupon', value: 'Coupon' }
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
