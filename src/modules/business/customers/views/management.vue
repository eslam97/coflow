<template>
  <b-container fluid>
    <b-row>
      <b-col lg="12" class="mb-2 d-flex justify-content-between align-items-center">
        <h3>Management</h3>

        <div class="d-flex justify-content-between gap-20">
          <b-button variant="light" class="btn bg-white add_button">
            Export <i class="las la-print ml-3"></i>
          </b-button>
          <b-button @click="openPopup" variant="warning" class="add_button text-white">
            Add Customer <i class="las la-plus ml-3"></i>
            </b-button>
        </div>
      </b-col>

      <b-col lg="12" class="mb-2">
        <iq-card class="filter-card">
          <b-row>
            <b-col md="3" sm="6">
              <span>Name:</span>
              <b-form-input v-model="filter.name" placeholder="Search"></b-form-input>
            </b-col>
            <b-col md="3" sm="6">
              <span>Gender:</span>
              <main-select
                v-model="filter.gender"
                :options="genderFilterOptions"
                label="key"
                :reduce="data => data.value"
                placeholder="--Select--"
              />
            </b-col>
            <b-col md="3" sm="6">
              <span>Nationality:</span>
              <main-select
                v-model="filter.nationality"
                :options="nationalityFilterOptions"
                label="name"
                :reduce="data => data.name"
                placeholder="--Select--"
              />
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

    <main-modal id="AddManagementModal">
      <template v-slot:header>
        <h4 class="font-weight-bold">
          <span class="text-warning" >Add: </span> Customer
        </h4>
      </template>
      <template v-slot:body>
        <AddManagementForm
          @addManagement="addManagement"
          :requestLoading="requestLoading"
        />
      </template>
    </main-modal>
  </b-container>
</template>
<script>
import { core } from '@/config/pluginInit'
import { managementItems } from '../services/data'
// import managementServices from '../services/management.services'
import AddManagementForm from '../components/AddManagementForm.vue'
import settingsService from '@/modules/superAdmin/settings/services/settings.services'

export default {
  data () {
    return {
      reloadTable: false,
      requestLoading: false,
      items: managementItems,
      columns: [
        { label: '#', key: 'id', class: 'text-center', type: 'sort' },
        { label: 'Photo', key: 'image', class: 'text-left', type: 'image' },
        { label: 'Name', key: 'name', class: 'text-left text-bold' },
        { label: 'Age', key: 'age', class: 'text-left' },
        { label: 'Gender', key: 'gender', class: 'text-left' },
        { label: 'Nationality', key: 'nationality', class: 'text-left' },
        { label: 'Tickets', key: 'tickets', class: 'text-left' },
        { label: 'Promotions', key: 'promotions', class: 'text-left' },
        { label: 'Purchases', key: 'purchases', class: 'text-left' },
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
      filter: { name: '', nationality: '', gender: '' },
      genderFilterOptions: [
        { key: 'Male', value: 'male' },
        { key: 'Female', value: 'female' },
        { key: 'None', value: '' }
      ],
      nationalityFilterOptions: []
    }
  },
  components: { AddManagementForm },
  methods: {
    openPopup () {
      this.$bvModal.show('AddManagementModal')
    },
    getAllNationalities () {
      settingsService.getAllnationalities().then(res => {
        this.nationalityFilterOptions = res.data.data
      })
    },
    addManagement (payload) {
      console.log('addManagement: ', payload)
      this.requestLoading = true
      this.reloadTable = false
      // managementServices.addManagement(payload).then(res => {
      //   this.reloadTable = true
      //   core.showSnackbar('success', res.data.message)
      //   this.$bvModal.hide('AddManagementModal')
      // }).finally(() => {
      //   this.requestLoading = false
      // })
      setTimeout(() => {
        this.reloadTable = true
        core.showSnackbar('success', 'Added Successfully')
        this.$bvModal.hide('AddManagementModal')
        this.requestLoading = false
      }, 1000)
    }
  },
  created () {
    this.getAllNationalities()
  },
  mounted () {
    core.index()
  }
}
</script>
