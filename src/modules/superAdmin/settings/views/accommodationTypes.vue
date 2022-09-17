<template>
  <div>
    <main-modal id="accommodationTypes" size="lg">
      <template v-slot:header>
        <h4 class="font-weight-bold"><span class="text-warning"> Add: </span>Accommodation Types</h4>
      </template>
      <template v-slot:body>
        <accommodation-type-form :requestLoading="requestLoading" @addAccommodationType="addAccommodationType"/>
      </template>
    </main-modal>
    <div class="d-flex justify-content-end">
      <b-button  variant="warning" v-b-modal:accommodationTypes class="add_button text-white">
          Add Accommodation Types
        <i class="las la-plus ml-3"></i></b-button>
    </div>
    <main-table
        :fields="columns"
        class="mb-0 table-borderless"
        :list_url="'accommodationTypes'"
        :reloadData="reloadTable"
    >
    </main-table>
  </div>
</template>
<script>
import { core } from '@/config/pluginInit'
import accommodationTypeForm from '../components/accommodationTypeForm'
import settingsService from '../services/settings.services'
export default {
  name: 'accommodation Type',
  components: {
    accommodationTypeForm
  },
  data () {
    return {
      reloadTable: false,
      requestLoading: false,
      columns: [
        { label: 'Name', key: 'name', class: 'text-center' },
        {
          label: 'Actions',
          key: 'actions',
          class: 'text-center',
          type: 'actions',
          actions: [
            {
              icon: 'las la-trash-alt',
              color: 'danger',
              text: 'Delete',
              showAlert: true,
              actionHeader: 'Delete',
              titleHeader: 'Accommodation Type',
              textContent: 'name',
              url: 'accommodationTypes'
            }
          ]
        }
      ]
    }
  },
  methods: {
    addAccommodationType (data) {
      this.requestLoading = true
      this.reloadTable = false
      settingsService.addNewAccommodationType(data).then(res => {
        core.showSnackbar('success', res.data.message)
        this.reloadTable = true
        this.$bvModal.hide('accommodationTypes')
      }).finally(() => {
        this.requestLoading = false
      })
    }
  },
  mounted () {
    core.index()
  },
  created () {
  }
}
</script>
