<template>
  <div>
    <div class="d-flex justify-content-end">
      <b-button  variant="warning" class="add_button text-white"> Add New
        Activity Line<i class="las la-plus ml-3"></i></b-button>
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
/* import settingsService from '../services/settings.services' */
export default {
  name: 'profileSetting',
  data () {
    return {
      reloadTable: false,
      columns: [
        { label: 'Name', key: 'name', class: 'text-center' },
        {
          label: 'Actions',
          key: 'actions',
          class: 'text-center',
          type: 'actions',
          actions: [{
            icon: 'las la-eye',
            color: 'success',
            text: 'View',
            actionName: 'viewActivityLine',
            actionParams: ['id']
          }
          ]
        }
      ]
    }
  },
  methods: {
  },
  mounted () {
    core.index()
  },
  created () {
  }
}
</script>
