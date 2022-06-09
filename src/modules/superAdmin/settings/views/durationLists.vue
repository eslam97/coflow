<template>
  <div>
    <main-modal id="durationList" size="lg">
      <template v-slot:header>
        <h4 class="font-weight-bold"><span class="text-warning"> Add: </span>Duration List</h4>
      </template>
      <template v-slot:body>
        <duration-list-form :requestLoading="requestLoading" @addDurationList="addDurationList"/>
      </template>
    </main-modal>
    <div class="d-flex justify-content-end">
      <b-button  variant="warning" v-b-modal:durationList class="add_button text-white"> Add Duration<i
          class="las la-plus ml-3"></i></b-button>
    </div>
    <main-table
        :fields="columns"
        class="mb-0 table-borderless"
        :list_url="'durationLists'"
        :reloadData="reloadTable"
    >
    </main-table>
  </div>
</template>
<script>
import { core } from '@/config/pluginInit'
import durationListForm from '../components/durationListForm'
import settingsService from '../services/settings.services'
export default {
  name: 'profileSetting',
  components: {
    durationListForm
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
              titleHeader: 'duration List',
              textContent: 'name'
            }
          ]
        }
      ]
    }
  },
  methods: {
    addDurationList (data) {
      this.requestLoading = true
      this.reloadTable = false
      settingsService.addNewDurationList(data).then(res => {
        core.showSnackbar('success', res.data.message)
        this.reloadTable = true
        this.$bvModal.hide('durationList')
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
