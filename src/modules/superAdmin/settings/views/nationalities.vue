<template>
  <div>
    <main-modal id="nationality" size="lg">
      <template v-slot:header>
        <h4 class="font-weight-bold"><span class="text-warning"> Add: </span>Nationality</h4>
      </template>
      <template v-slot:body>
        <nationality-form :requestLoading="requestLoading" @addNationality="addNationality"/>
      </template>
    </main-modal>
    <div class="d-flex justify-content-end">
      <b-button  variant="warning" v-b-modal:nationality class="add_button text-white"> Add Nationality<i
          class="las la-plus ml-3"></i></b-button>
    </div>
    <main-table
        :fields="columns"
        class="mb-0 table-borderless"
        :list_url="'nationalities'"
        :reloadData="reloadTable"
    >
    </main-table>
  </div>
</template>
<script>
import { core } from '@/config/pluginInit'
import nationalityForm from '../components/nationalityForm'
import settingsService from '../services/settings.services'
export default {
  name: 'nationalities',
  components: {
    nationalityForm
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
              titleHeader: 'Nationality',
              textContnet: 'name'
            }
          ]
        }
      ]
    }
  },
  methods: {
    addNationality (data) {
      this.requestLoading = true
      this.reloadTable = false
      settingsService.addNewNationality(data).then(res => {
        core.showSnackbar('success', res.data.message)
        this.reloadTable = true
        this.$bvModal.hide('nationality')
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
