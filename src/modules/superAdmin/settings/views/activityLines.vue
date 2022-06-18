<template>
  <div>
    <main-modal id="activityLine" size="lg">
      <template v-slot:header>
        <h4 class="font-weight-bold"><span class="text-warning"> Add: </span> Activity Line</h4>
      </template>
      <template v-slot:body>
        <activity-line-form :requestLoading="requestLoading" @addActivityLine="addActivityLine"/>
      </template>
    </main-modal>
    <div class="d-flex justify-content-end">
      <b-button  variant="warning" v-b-modal:activityLine class="add_button text-white"> Add  Activity Line<i
          class="las la-plus ml-3"></i></b-button>
    </div>
    <main-table
        :fields="columns"
        class="mb-0 table-borderless"
        :list_url="'activityLines'"
        :reloadData="reloadTable"
    >
    </main-table>
  </div>
</template>
<script>
import { core } from '@/config/pluginInit'
import activityLineForm from '../components/activityLineForm'
import settingsService from '../services/settings.services'
export default {
  name: 'activityLine',
  components: {
    activityLineForm
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
              titleHeader: 'Activity Line',
              textContent: 'name'
            }
          ]
        }
      ]
    }
  },
  methods: {
    addActivityLine (data) {
      this.requestLoading = true
      this.reloadTable = false
      settingsService.addNewActivityLine(data).then(res => {
        core.showSnackbar('success', res.data.message)
        this.reloadTable = true
        this.$bvModal.hide('activityLine')
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
