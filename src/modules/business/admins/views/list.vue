<template>
  <b-container fluid>
    <main-modal id="addUserAdminModal" size="lg">
      <template v-slot:header class="p-2">
        <h4 class="font-weight-bolder">
          <span class="text-warning">Create: </span> Admin
        </h4>
      </template>
      <template v-slot:body>
        <admin-details />
      </template>
    </main-modal>
    <b-row>
      <b-col
        lg="12"
        class="mb-2 d-flex justify-content-between align-items-center"
      >
        <h3>Admins</h3>
        <div>
          <b-button variant="dark" class="add_button text-white">
            Access
          </b-button>
          <b-button
            variant="warning"
            class="ml-3 add_button text-white"
            @click="openCreateAdmin"
          >
            Create Admin<i class="las la-plus ml-3"></i
          ></b-button>
        </div>
      </b-col>
      <b-col lg="12">
        <main-table
          :fields="columns"
          class="mb-0 table-borderless"
          :reloadData="reloadTable"
        >
        </main-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { core } from '@/config/pluginInit'
import adminDetails from '../components/adminDetails.vue'

export default {
  components: {
    adminDetails
  },
  data () {
    return {
      columns: [
        '#',
        { label: 'Name', key: 'name', class: 'text-left' },
        { label: 'Email', key: 'email', class: 'text-left' },
        {
          label: 'Title',
          key: 'title',
          class: 'text-left'
        },
        { label: 'Access', key: 'access', class: 'text-left' },
        { label: 'Branches', key: 'branches', class: 'text-left' },
        {
          label: 'Actions',
          key: 'actions',
          class: 'text-left',
          type: 'actions',
          actions: [
            {
              icon: 'las la-pen',
              color: 'info',
              text: 'Edit'
            },
            {
              icon: 'las la-trash-alt',
              color: 'danger',
              text: 'Delete'
              // showIf: () => this.hasPer('admin.delete'),
              // showAlert: true,
              // actionHeader: 'Delete',
              // titleHeader: 'Admin',
              // textContent: 'name',
              // url: 'admins'
            }
          ]
        }
      ]
    }
  },
  methods: {
    openCreateAdmin () {
      this.$bvModal.show('addUserAdminModal')
    }
  },
  mounted () {
    core.index()
  }
}
</script>
