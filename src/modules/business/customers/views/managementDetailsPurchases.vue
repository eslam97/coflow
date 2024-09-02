<template>
  <div>
    <div class="mb-2 d-flex justify-content-between align-items-center">
      <h3>Purchases</h3>

      <div class="d-flex justify-content-between gap-20">
        <b-button @click="showAddPurchaseModal" variant="warning" class="add_button text-white">
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
        <ManagementPurchasesAdd
          @addPurchase="addPurchase"
          :requestLoading="requestLoading"
        />
      </template>
    </main-modal>
    <main-modal id="ViewPurchaseModal">
      <template v-slot:header>
        <h4 class="font-weight-bold">
          <span class="text-success" >View: </span> Purchase
        </h4>
      </template>
      <template v-slot:body>
        <ManagementPurchasesView />
      </template>
    </main-modal>
    <main-modal id="EditPurchaseModal">
      <template v-slot:header>
        <h4 class="font-weight-bold">
          <span class="text-info" >Edit: </span> Purchase
        </h4>
      </template>
      <template v-slot:body>
        <ManagementPurchasesEdit
          @editPurchase="editPurchase"
          :requestLoading="requestLoading"
        />
      </template>
    </main-modal>

    <main-modal id="CollectPurchaseModal">
      <template v-slot:header>
        <h4 class="font-weight-bold">
          <span class="text-warning" >Collect: </span> Purchase
        </h4>
      </template>
      <template v-slot:body>
        <ManagementPurchasesCollect />
      </template>
    </main-modal>
    <main-modal id="RefundPurchaseModal">
      <template v-slot:header>
        <h4 class="font-weight-bold">
          <span class="text-danger" >Refund: </span> Purchase
        </h4>
      </template>
      <template v-slot:body>
        <ManagementPurchasesRefund />
      </template>
    </main-modal>
    <main-modal id="CancelPurchaseModal">
      <template v-slot:header>
        <h4 class="font-weight-bold">
          <span class="text-danger" >Cancel: </span> Purchase
        </h4>
      </template>
      <template v-slot:body>
        <ManagementPurchasesCancel />
      </template>
    </main-modal>
  </div>
</template>
<script>
import { core } from '@/config/pluginInit'
import { managementPurchasesItems } from '../services/data'
import ManagementPurchasesAdd from '../components/ManagementPurchasesAdd.vue'
import ManagementPurchasesView from '../components/ManagementPurchasesView.vue'
import ManagementPurchasesEdit from '../components/ManagementPurchasesEdit.vue'
import ManagementPurchasesCollect from '../components/ManagementPurchasesCollect.vue'
import ManagementPurchasesRefund from '../components/ManagementPurchasesRefund.vue'
import ManagementPurchasesCancel from '../components/ManagementPurchasesCancel.vue'

export default {
  data () {
    return {
      reloadTable: false,
      requestLoading: false,
      purchaseDetails: {},
      items: managementPurchasesItems,
      columns: [
        { label: '#', key: 'id', class: 'text-center', type: 'sort' },
        { label: 'Date', key: 'date', class: 'text-left text-bold', type: 'sort' },
        { label: 'Purchase', key: 'purchase', class: 'text-left' },
        { label: 'Name', key: 'name', class: 'text-left' },
        { label: 'Quantity', key: 'quantity', class: 'text-left' },
        { label: 'Amount', key: 'amount', class: 'text-left', type: 'sort' },
        { label: 'Status', key: 'status', class: 'text-left', type: 'status' },
        { label: 'Validity', key: 'validity', class: 'text-left' },
        {
          label: 'Actions',
          key: 'actions',
          class: 'text-left',
          type: 'actions',
          actions: [
            {
              showIf: (data) => (data.status !== '--'),
              icon: 'las la-eye',
              color: 'success-light',
              text: 'View',
              actionName: 'showViewPurchaseModal',
              actionParams: 'fullObj'
            },
            {
              showIf: (data) => (data.status === 'DUE' || data.status === 'DOP'),
              icon: 'las la-pen',
              color: 'info',
              text: 'Edit',
              actionName: 'showEditPurchaseModal',
              actionParams: 'fullObj'
            },
            {
              icon: 'las la-coins',
              color: 'warning',
              text: 'Collect',
              actionName: 'showCollectPurchaseModal',
              actionParams: 'fullObj'
            },
            {
              showIf: (data) => (data.status === 'FOP' || data.status === 'PAID' || data.status === 'DOP'),
              icon: 'las la-undo-alt',
              color: 'danger',
              text: 'Refund',
              actionName: 'showRefundPurchaseModal',
              actionParams: 'fullObj'
            },
            {
              showIf: (data) => (data.status === 'DUE'),
              icon: 'las la-times',
              color: 'danger',
              text: 'Cancel',
              actionName: 'showCancelPurchaseModal',
              actionParams: 'fullObj'
            }
          ]
        }
      ]
    }
  },
  components: {
    ManagementPurchasesAdd,
    ManagementPurchasesView,
    ManagementPurchasesEdit,
    ManagementPurchasesCollect,
    ManagementPurchasesRefund,
    ManagementPurchasesCancel
  },
  methods: {
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
    },
    editPurchase () {
      console.log('editPurchase: ')
      this.requestLoading = true
      this.reloadTable = false
      setTimeout(() => {
        this.reloadTable = true
        core.showSnackbar('success', 'Successfull')
        this.$bvModal.hide('EditPurchaseModal')
        this.requestLoading = false
      }, 1000)
    },

    showAddPurchaseModal () {
      this.$bvModal.show('AddPurchaseModal')
    },
    showViewPurchaseModal (obj) {
      this.purchaseDetails = obj
      this.$bvModal.show('ViewPurchaseModal')
    },
    showEditPurchaseModal (obj) {
      this.purchaseDetails = obj
      this.$bvModal.show('EditPurchaseModal')
    },
    showCollectPurchaseModal (obj) {
      this.purchaseDetails = obj
      this.$bvModal.show('CollectPurchaseModal')
    },
    showRefundPurchaseModal (obj) {
      this.purchaseDetails = obj
      this.$bvModal.show('RefundPurchaseModal')
    },
    showCancelPurchaseModal (obj) {
      this.purchaseDetails = obj
      this.$bvModal.show('CancelPurchaseModal')
    }
  },
  created () {
    this.$root.$on('showViewPurchaseModal', this.showViewPurchaseModal)
    this.$root.$on('showEditPurchaseModal', this.showEditPurchaseModal)
    this.$root.$on('showCollectPurchaseModal', this.showCollectPurchaseModal)
    this.$root.$on('showRefundPurchaseModal', this.showRefundPurchaseModal)
    this.$root.$on('showCancelPurchaseModal', this.showCancelPurchaseModal)
  },
  beforeDestroy () {
    this.$root.$off('showViewPurchaseModal')
    this.$root.$off('showEditPurchaseModal')
    this.$root.$off('showCollectPurchaseModal')
    this.$root.$off('showRefundPurchaseModal')
    this.$root.$off('showCancelPurchaseModal')
  },
  mounted () {
    core.index()
  }
}
</script>
