<template>
  <div>
    <main-modal id="city" size="lg">
      <template v-slot:header>
        <h4 class="font-weight-bold"><span class="text-warning"> Add: </span>City</h4>
      </template>
      <template v-slot:body>
        <city-form :requestLoading="requestLoading" @addCity="addCity"/>
      </template>
    </main-modal>
    <div class="d-flex justify-content-end">
      <b-button  variant="warning" v-b-modal:city class="add_button text-white"> Add City
        <i class="las la-plus ml-3"></i></b-button>
    </div>
    <main-table
        :fields="columns"
        class="mb-0 table-borderless"
        :list_url="'cities'"
        :reloadData="reloadTable"
    >
    </main-table>
  </div>
</template>
<script>
import { core } from '@/config/pluginInit'
import cityForm from '../components/cityForm'
import settingsService from '../services/settings.services'
export default {
  name: 'cities',
  components: {
    cityForm
  },
  data () {
    return {
      reloadTable: false,
      requestLoading: false,
      columns: [
        { label: 'Name', key: 'name', class: 'text-center' },
        { label: 'Country', key: 'country.name', class: 'text-center' },
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
              titleHeader: 'City',
              textContent: 'name'
            }
          ]
        }
      ]
    }
  },
  methods: {
    addCity (data) {
      this.requestLoading = true
      this.reloadTable = false
      settingsService.addNewCity(data).then(res => {
        core.showSnackbar('success', res.data.message)
        this.reloadTable = true
        this.$bvModal.hide('city')
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
