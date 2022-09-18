<template>
  <b-container fluid>
    <main-modal id="permissions" size="md">
      <template v-slot:header>
        <h4 class="font-weight-bold"><span class="text-success-light" >view: </span>Permission</h4>
      </template>
      <template v-slot:body>
        <b-list-group class="m-0 p-0">
          <b-list-group-item v-for="(permission, key) in permissions" :key="key"
                             class="text-primary border-0 font-size-18">
            {{key+1}}- {{permission.name}}</b-list-group-item>
        </b-list-group>
      </template>
    </main-modal>
    <main-modal id="roleDetails" size="lg">
      <template v-slot:header>
        <h4 class="font-weight-bold" v-if="typeOfModal == 'add'"><span class="text-warning" >Add: </span> Role</h4>
        <h4 class="font-weight-bold" v-else><span class="text-info" >Edit: </span> Role</h4>
      </template>
      <template v-slot:body>
        <roleDetails
            :roleDetails="roleDetails"
            :type-of-modal="typeOfModal"
            :requestLoading="requestLoading"
            @saveRole="saveRole"
            @editRole="editRole"
        />
      </template>
    </main-modal>
    <b-row>
      <b-col lg="12"
             class="mb-2 d-flex justify-content-between align-items-center">
        <h3>Roles</h3>
        <div>
          <router-link :to="{name: 'admin'}">
            <b-button variant="warning" class="add_button text-white">
              <i class="las la-arrow-left mr-3"></i> Go To Admin</b-button>
          </router-link>
          <b-button variant="warning" class="ml-3 add_button text-white" @click="openCreateModal">Create
            Role<i class="las la-plus ml-3"></i></b-button>
        </div>
      </b-col>
      <b-col lg="12">
        <main-table
            :fields="columns"
            class="mb-0 table-borderless"
            :list_url="'roles'"
            :reloadData="reloadTable"
        >
        </main-table>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { core } from '@/config/pluginInit'
import adminsServices from '../services/admins.services'
import roleDetails from '../components/roleDetails'
export default {
  components: { roleDetails },
  data () {
    return {
      columns: [
        { label: 'Name', key: 'name', class: 'text-left' },
        { label: 'Type', key: 'type', class: 'text-left' },
        {
          label: 'Actions',
          key: 'actions',
          class: 'text-left',
          type: 'actions',
          actions: [{
            icon: 'las la-eye',
            color: 'success',
            text: 'View',
            actionName: 'viewPermissions',
            actionParams: ['id']
          },
          {
            icon: 'las la-pen',
            color: 'info',
            text: 'Edit',
            actionName: 'showRoleInfo',
            actionParams: ['id', 'name']
          },
          {
            icon: 'las la-trash-alt',
            color: 'danger',
            text: 'Delete',
            showAlert: true,
            actionHeader: 'Delete',
            titleHeader: 'Role',
            textContent: 'name',
            url: 'roles'
          }
          ]
        }
      ],
      reloadTable: false,
      requestLoading: false,
      permissions: [],
      typeOfModal: 'add',
      roleId: '',
      roleDetails: {}
    }
  },
  methods: {
    viewPermissions (obj) {
      adminsServices.getRoleDetails(obj.id).then(res => {
        this.permissions = res.data.data
        this.$bvModal.show('permissions')
      })
    },
    openCreateModal () {
      this.roleDetails = false
      this.typeOfModal = 'add'
      this.$bvModal.show('roleDetails')
    },
    saveRole (data) {
      this.requestLoading = true
      this.reloadTable = false
      adminsServices.saveRole(data).then(res => {
        this.reloadTable = true
        core.showSnackbar('success', res.data.data)
        this.$bvModal.hide('roleDetails')
      }).finally(() => {
        this.requestLoading = false
      })
    },
    editRole (data) {
      this.requestLoading = true
      this.reloadTable = false
      adminsServices.editRole(this.roleId, data).then(res => {
        this.reloadTable = true
        core.showSnackbar('success', res.data.data)
        this.$bvModal.hide('roleDetails')
      }).finally(() => {
        this.requestLoading = false
      })
    },
    showRoleInfo (data) {
      this.roleId = data.id
      adminsServices.getRoleDetails(data.id).then(res => {
        const newObj = { ...data, permissions: res.data.data }
        this.roleDetails = newObj
        this.typeOfModal = 'edit'
        this.$bvModal.show('roleDetails')
      })
    }
  },
  mounted () {
    core.index()
  },
  created () {
    this.$root.$on('viewPermissions', this.viewPermissions)
    this.$root.$on('showRoleInfo', this.showRoleInfo)
  },
  beforeDestroy () {
    this.$root.$off('viewPermissions')
    this.$root.$off('showRoleInfo')
  }
}
</script>
