<template>
  <div>
    <main-modal id="activityType" size="lg">
      <template v-slot:header>
        <h4 class="font-weight-bold"><span class="text-warning"> Add: </span>Activity Type</h4>
      </template>
      <template v-slot:body>
        <activity-type-form :requestLoading="requestLoading" @addActivityType="addActivityType"/>
      </template>
    </main-modal>
    <div class="d-flex justify-content-end">
      <b-button  variant="warning" v-b-modal:activityType class="add_button text-white"> Add Activity Type<i
          class="las la-plus ml-3"></i></b-button>
    </div>
    <main-table
        :fields="columns"
        class="mb-0 table-borderless"
        :list_url="'activityTypes'"
        :reloadData="reloadTable"
    >
    </main-table>
  </div>
</template>
<script>
import { core } from '@/config/pluginInit'
import activityTypeForm from '../components/activityTypeForm'
import settingsService from '../services/settings.services'
export default {
  name: 'activityType',
  components: {
    activityTypeForm
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
              titleHeader: 'Activity Type',
              textContnet: 'name'
            }
          ]
        }
      ]
    }
  },
  methods: {
    addActivityType (data) {
      this.requestLoading = true
      this.reloadTable = false
      settingsService.addNewActivityType(data).then(res => {
        core.showSnackbar('success', res.data.message)
        this.reloadTable = true
        this.$bvModal.hide('activityType')
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
