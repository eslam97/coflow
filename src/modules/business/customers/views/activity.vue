<template>
  <b-container fluid>
    <div lg="12" class="mb-2 d-flex justify-content-between align-items-center">
      <h3>Activity</h3>

      <div class="d-flex justify-content-between gap-20">
        <b-button @click="openPopup" variant="light" class="btn bg-white add_button">
          Export <i class="las la-print ml-3"></i>
        </b-button>
      </div>
    </div>

    <div class="mb-4">
      <div class="my-2 d-flex justify-content-between align-items-center gap-2">
        <router-link :to="{ name: 'customers.purchasess' }" :class="['w-100 text-center promotion_button py-2', { 'active-tab' : $route.name =='customers.purchasess'}]">
          Purchasess
        </router-link>
        <router-link :to="{ name: 'customers.gifts' }" :class="['w-100 text-center promotion_button py-2', { 'active-tab' : $route.name =='customers.gifts'}]">
          Gifts
        </router-link>
        <router-link :to="{ name: 'customers.collections' }" :class="['w-100 text-center promotion_button py-2', { 'active-tab' : $route.name =='customers.collections'}]">
          Collections
        </router-link>
      </div>
    </div>

    <router-view/>
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
