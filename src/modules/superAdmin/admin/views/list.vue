<template>
  <b-container fluid>
    <main-modal id="adminDetails" size="lg">
      <template v-slot:header>
        <h4 class="font-weight-bold" v-if="typeOfModal == 'add'"><span class="text-warning" >Add: </span> Admin</h4>
        <h4 class="font-weight-bold" v-else><span class="text-info" >Edit: </span> Admin</h4>
      </template>
      <template v-slot:body>
        <admin-details
            :type-of-modal="typeOfModal"
            :requestLoading="requestLoading"
            :adminDetails="adminDetails"
            @saveAdmin="saveAdmin"
            @editAdmin="editAdmin"/>
      </template>
    </main-modal>
    <b-row>
      <b-col lg="12"
             class="mb-2 d-flex justify-content-between align-items-center">
        <h3>Admins</h3>
        <div>
          <router-link :to="{name: 'roles'}">
            <b-button variant="warning" class="add_button text-white">
              Go To Roles<i class="las la-arrow-right ml-3"></i></b-button>
          </router-link>
          <b-button variant="warning" class="ml-3 add_button text-white" @click="openAdminCreate">Create
            Admin<i class="las la-plus ml-3"></i></b-button>
        </div>
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
import AdminDetails from '../components/adminDetails'
import adminsServices from '../services/admins.services'
export default {
  components: { AdminDetails },
  data () {
    return {
      columns: [
        { label: 'Image', key: 'logo', class: 'text-left', type: 'image' },
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
          },
          {
            icon: 'las la-pen',
            color: 'info',
            text: 'Edit',
            actionName: 'showAdminInfo',
            actionParams: ['id']
          },
          {
            icon: 'las la-trash-alt',
            color: 'danger',
            text: 'Delete',
            showAlert: true,
            actionHeader: 'Delete',
            titleHeader: 'Admin',
            textContnet: 'name',
            url: 'admins'
          }
          ]
        }
      ],
      reloadTable: false,
      requestLoading: false,
      typeOfModal: 'add',
      adminDetails: {},
      adminId: ''
    }
  },
  methods: {
    openAdminCreate () {
      this.adminDetails = {}
      this.typeOfModal = 'add'
      this.$bvModal.show('adminDetails')
    },
    saveAdmin (data) {
      this.requestLoading = true
      adminsServices.saveAdmin(data).then(res => {
        core.showSnackbar('success', res.data.message)
        this.$bvModal.hide('adminDetails')
        this.reloadTable = true
      }).finally(() => {
        this.requestLoading = false
      })
    },
    editAdmin (data) {
      this.requestLoading = true
      adminsServices.editAdmin(this.adminId, data).then(res => {
        core.showSnackbar('success', res.data.message)
        this.$bvModal.hide('adminDetails')
        this.reloadTable = true
      }).finally(() => {
        this.requestLoading = false
      })
    },
    showAdminInfo (data) {
      this.adminId = data.id
      adminsServices.getAdminInfo(data.id).then(res => {
        this.adminDetails = res.data.data
        this.typeOfModal = 'edit'
        this.$bvModal.show('adminDetails')
      })
    }
  },
  mounted () {
    core.index()
  },
  beforeDestroy () {
    this.$root.$off('showAdminInfo')
  },
  created () {
    this.$root.$on('showAdminInfo', this.showAdminInfo)
  }
}
</script>
