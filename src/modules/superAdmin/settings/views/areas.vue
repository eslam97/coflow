<template>
  <div>
    <main-modal id="area" size="lg">
      <template v-slot:header>
        <h4 class="font-weight-bold"><span class="text-warning"> Add: </span>Area</h4>
      </template>
      <template v-slot:body>
        <area-form :requestLoading="requestLoading" @addArea="addArea"/>
      </template>
    </main-modal>
    <div class="d-flex justify-content-end">
      <b-button  variant="warning" v-b-modal:area class="add_button text-white"> Add Area
        <i class="las la-plus ml-3"></i></b-button>
    </div>
    <main-table
        :fields="columns"
        class="mb-0 table-borderless"
        :list_url="'areas'"
        :reloadData="reloadTable"
    >
    </main-table>
  </div>
</template>
<script>
import { core } from '@/config/pluginInit'
import areaForm from '../components/areaForm'
import settingsService from '../services/settings.services'
export default {
  name: 'areas',
  components: {
    areaForm
  },
  data () {
    return {
      reloadTable: false,
      requestLoading: false,
      columns: [
        { label: 'Name', key: 'name', class: 'text-center' },
        { label: 'Governorate', key: 'city.name', class: 'text-center' },
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
              titleHeader: 'Area',
              textContent: 'name'
            }
          ]
        }
      ]
    }
  },
  methods: {
    addArea (data) {
      this.requestLoading = true
      this.reloadTable = false
      settingsService.addNewArea(data).then(res => {
        core.showSnackbar('success', res.data.message)
        this.reloadTable = true
        this.$bvModal.hide('area')
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
