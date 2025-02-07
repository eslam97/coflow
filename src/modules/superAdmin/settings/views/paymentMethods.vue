<template>
    <div>
      <main-modal id="paymentMethod" size="lg">
        <template v-slot:header>
            <h4 class="font-weight-bold" v-if="typeOfModal == 'add'" ><span class="text-warning">Add: </span> Payment Methods</h4>
            <h4 class="font-weight-bold" v-else><span class="text-info" >Edit: </span> Payment Methods</h4>
        </template>
        <template v-slot:body>
          <payment-method-form :requestLoading="requestLoading" @addPaymentMethod="addPaymentMethod" @editPaymentMethod="editPaymentMethod" :typeOfModal="typeOfModal" :paymentDetails="paymentDetails"/>
        </template>
      </main-modal>
      <div class="d-flex justify-content-end">
        <b-button  variant="warning" @click="openPopup" class="add_button text-white"> Add Payment Methods
          <i class="las la-plus ml-3"></i></b-button>
      </div>
      <main-table
          :fields="columns"
          class="mb-0 table-borderless"
          :list_url="'paymentMethods'"
          :reloadData="reloadTable"
      >
      <template v-slot:color="data">
        <div class="d-flex justify-content-center">
          <div class="color-box" :style="{backgroundColor: data.data.color}"></div>
        </div>
      </template>
    </main-table>
    </div>
  </template>
<script>
import { core } from '@/config/pluginInit'
import paymentMethodForm from '../components/paymentMethodForm'
import settingsService from '../services/settings.services'
export default {
  name: 'paymentMethods',
  components: {
    paymentMethodForm
  },
  data () {
    return {
      reloadTable: false,
      requestLoading: false,
      columns: [
        { label: 'Name', key: 'name', class: 'text-center' },
        { label: 'Color', key: 'color', class: 'text-center', type: 'custom' },
        { label: 'status', key: 'status', class: 'text-center', type: 'status' },

        {
          label: 'Actions',
          key: 'actions',
          class: 'text-center',
          type: 'actions',
          actions: [
            {
              icon: 'las la-pen',
              color: 'success-light',
              text: 'Edit',
              actionName: 'viewPaymentMethod',
              actionParams: 'fullObj'
            },
            {
              icon: 'las la-trash-alt',
              color: 'danger',
              text: 'Delete',
              showAlert: true,
              actionHeader: 'Delete',
              titleHeader: 'Payment Method',
              textContent: 'name',
              url: 'paymentMethods'
            }
          ]
        }
      ],
      paymentId: '',
      paymentDetails: {},
      typeOfModal: 'add'
    }
  },
  methods: {
    openPopup () {
      this.typeOfModal = 'add'
      this.paymentId = ''
      this.paymentDetails = {}
      this.$bvModal.show('paymentMethod')
    },
    viewPaymentMethod (data) {
      this.typeOfModal = 'edit'
      this.paymentId = data.id
      this.paymentDetails = data
      this.$bvModal.show('paymentMethod')
    },
    addPaymentMethod (data) {
      this.requestLoading = true
      this.reloadTable = false
      settingsService.addNewPaymentMethod(data).then(res => {
        core.showSnackbar('success', res.data.message)
        this.reloadTable = true
        this.$bvModal.hide('paymentMethod')
      }).finally(() => {
        this.requestLoading = false
      })
    },
    editPaymentMethod (data) {
      this.requestLoading = true
      this.reloadTable = false
      settingsService.editPaymentMethod(this.paymentId, { ...data, _method: 'put' }).then(res => {
        core.showSnackbar('success', res.data.message)
        this.reloadTable = true
        this.$bvModal.hide('paymentMethod')
      }).finally(() => {
        this.requestLoading = false
      })
    }
  },
  mounted () {
    core.index()
  },

  created () {
    this.$root.$on('viewPaymentMethod', this.viewPaymentMethod)
  },
  beforeDestroy () {
    this.$root.$off('viewPaymentMethod')
  }
}
</script>
<style>
.color-box {
    width: 30px;
    height: 30px;
    border-radius: 50%;
}
</style>
