<template>
  <div>
    <main-modal id="language" size="lg">
      <template v-slot:header>
        <h4 class="font-weight-bold"><span class="text-warning"> Add: </span>Language</h4>
      </template>
      <template v-slot:body>
        <language-form :requestLoading="requestLoading" @addLanguage="addLanguage"/>
      </template>
    </main-modal>
    <div class="d-flex justify-content-end">
      <b-button  variant="warning" v-b-modal:language class="add_button text-white"> Add Language
        <i class="las la-plus ml-3"></i></b-button>
    </div>
    <main-table
        :fields="columns"
        class="mb-0 table-borderless"
        :list_url="'languages'"
        :reloadData="reloadTable"
    >
    </main-table>
  </div>
</template>
<script>
import { core } from '@/config/pluginInit'
import languageForm from '../components/languageForm'
import settingsService from '../services/settings.services'
export default {
  name: 'languages',
  components: {
    languageForm
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
              titleHeader: 'Language',
              textContent: 'name'
            }
          ]
        }
      ]
    }
  },
  methods: {
    addLanguage (data) {
      this.requestLoading = true
      this.reloadTable = false
      settingsService.addNewLanguage(data).then(res => {
        core.showSnackbar('success', res.data.message)
        this.reloadTable = true
        this.$bvModal.hide('language')
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
