<template>
  <b-container fluid>
    <b-row>
      <b-col lg="12" class="mb-2">
        <h3>Admins</h3>
      </b-col>
      <b-col lg="12">
        <main-table
            :fields="columns"
            class="mb-0 table-borderless"
            :list_url="'admins'"
            :reloadData="reloadTable"
        >
        </main-table>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { core } from '@/config/pluginInit'
export default {
  components: { },
  data () {
    return {
      columns: [
        { label: 'Name', key: 'name', class: 'text-left' },
        { label: 'Email', key: 'email', class: 'text-left' },
        { label: 'Role', key: 'role.name', class: 'text-left' },
        {
          label: 'Actions',
          key: 'actions',
          class: 'text-left',
          type: 'actions',
          actions: [{
            icon: 'las la-eye',
            color: 'success',
            text: 'View',
            actionName: 'viewLead',
            actionParams: ['id']
          }
            /* {
              icon: 'las la-pen',
              color: 'cobalt-blue',
              text: 'Edit'
            },
            {
              icon: 'las la-trash-alt',
              color: 'danger',
              text: 'Delete',
              showAlert: true,
              actionHeader: 'Delete',
              titleHeader: 'Lead',
              textContnet: 'name'
            } */
          ]
        }
      ],
      reloadTable: false
    }
  },
  methods: {
  },
  mounted () {
    core.index()
  },
  beforeDestroy () {
  },
  created () {
  }
}
</script>
