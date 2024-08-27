<template>
  <div>
    <div class="mb-2 d-flex justify-content-between align-items-center">
      <h3>Purchases</h3>

      <div class="d-flex justify-content-between gap-20">
        <b-button @click="openPopup" variant="warning" class="add_button text-white">
          Add Purchase <i class="las la-plus ml-3"></i>
        </b-button>
      </div>
    </div>

    <main-table
      :fields="columns"
      class="mb-0 table-borderless"
      :items="items"
    />

    <main-modal id="AddPurchaseModal">
      <template v-slot:header>
        <h4 class="font-weight-bold">
          <span class="text-warning" >Add: </span> Purchase
        </h4>
      </template>
      <template v-slot:body>
        <AddManagementPurchasesForm
          @addPurchase="addPurchase"
          :requestLoading="requestLoading"
        />
      </template>
    </main-modal>
  </div>
</template>
<script>
import { core } from '@/config/pluginInit'
import { managementPurchasesItems } from '../services/data'
import AddManagementPurchasesForm from '../components/AddManagementPurchasesForm.vue'

export default {
  data () {
    return {
      reloadTable: false,
      requestLoading: false,
      items: managementPurchasesItems,
      columns: [
        { label: '#', key: 'id', class: 'text-center', type: 'sort' },
        { label: 'Date', key: 'date', class: 'text-left text-bold', type: 'sort' },
        { label: 'Purchase', key: 'purchase', class: 'text-left' },
        { label: 'Name', key: 'name', class: 'text-left' },
        { label: 'Quantity', key: 'quantity', class: 'text-left' },
        { label: 'Amount', key: 'amount', class: 'text-left', type: 'sort' },
        { label: 'Status', key: 'status', class: 'text-left' },
        { label: 'Validity', key: 'validity', class: 'text-left' },
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
      ]
    }
  },
  components: { AddManagementPurchasesForm },
  methods: {
    openPopup () {
      this.$bvModal.show('AddPurchaseModal')
    },
    addPurchase (payload) {
      console.log('addPurchase: ', payload)
      this.requestLoading = true
      this.reloadTable = false
      setTimeout(() => {
        this.reloadTable = true
        core.showSnackbar('success', 'Added Successfully')
        this.$bvModal.hide('AddPurchaseModal')
        this.requestLoading = false
      }, 1000)
    }
  },
  created () {},
  mounted () {
    core.index()
  }
}
</script>
