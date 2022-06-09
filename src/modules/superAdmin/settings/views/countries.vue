<template>
  <div>
    <main-modal id="country" size="lg">
      <template v-slot:header>
        <h4 class="font-weight-bold"><span class="text-warning"> Add: </span>Country</h4>
      </template>
      <template v-slot:body>
        <country-form :requestLoading="requestLoading" @addCountry="addCountry"/>
      </template>
    </main-modal>
    <div class="d-flex justify-content-end">
      <b-button  variant="warning" v-b-modal:country class="add_button text-white"> Add Country
        <i class="las la-plus ml-3"></i></b-button>
    </div>
    <main-table
        :fields="columns"
        class="mb-0 table-borderless"
        :list_url="'countries'"
        :reloadData="reloadTable"
    >
    </main-table>
  </div>
</template>
<script>
import { core } from '@/config/pluginInit'
import countryForm from '../components/countryForm'
import settingsService from '../services/settings.services'
export default {
  name: 'countries',
  components: {
    countryForm
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
              titleHeader: 'Country',
              textContent: 'name'
            }
          ]
        }
      ]
    }
  },
  methods: {
    addCountry (data) {
      this.requestLoading = true
      this.reloadTable = false
      settingsService.addNewCountry(data).then(res => {
        core.showSnackbar('success', res.data.message)
        this.reloadTable = true
        this.$bvModal.hide('country')
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
