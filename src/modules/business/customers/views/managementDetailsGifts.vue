<template>
  <div>
    <div class="mb-2 d-flex justify-content-between align-items-center">
      <h3>Gifts</h3>

      <div class="d-flex justify-content-between gap-20">
        <b-button @click="openPopup" variant="warning" class="add_button text-white">
          Add Gift <i class="las la-plus ml-3"></i>
        </b-button>
      </div>
    </div>

    <main-table
      :fields="columns"
      class="mb-0 table-borderless"
      :list_url="'gifts'"
    />

    <main-modal id="AddGiftModal">
      <template v-slot:header>
        <h4 class="font-weight-bold">
          <span class="text-warning" >Add: </span> Gift
        </h4>
      </template>
      <template v-slot:body>
        <ManagementGiftForm @addGift="addNewGift" :requestLoading="requestLoading"/>
      </template>
    </main-modal>
  </div>
</template>
<script>
import { core } from '@/config/pluginInit'
import { managementGiftsItems } from '../services/data'
import ManagementGiftForm from '../components/ManagementGiftForm.vue'
import managementServices from '../services/management.services'

export default {
  data () {
    return {
      items: managementGiftsItems,
      columns: [
        { label: '#', key: 'id', class: 'text-center', type: 'sort' },
        { label: 'Date', key: 'created_at', class: 'text-left text-bold', type: 'date' },
        { label: 'Gift', key: 'gift', class: 'text-left' },
        { label: 'Name', key: 'name', class: 'text-left' },
        { label: 'Quantity', key: 'quantity', class: 'text-left' },
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
      ],
      requestLoading: false,
      reloadTable: false
    }
  },
  components: {
    ManagementGiftForm
  },
  methods: {
    openPopup () {
      this.$bvModal.show('AddGiftModal')
    },
    addNewGift (payload) {
      this.requestLoading = true
      this.reloadTable = false
      managementServices.addNewGift(payload).then((res) => {
        this.reloadTable = true
        core.showSnackbar('success', res.data.message)
        this.$bvModal.hide('AddGiftModal')
        this.requestLoading = false
      }).finally(() => {
        this.requestLoading = false
      })
    }
  },
  created () {},
  mounted () {
    core.index()
  }
}
</script>
