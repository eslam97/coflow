<template>
  <b-container fluid>
    <main-modal id="folderDetailsModal" size="xl">
      <template v-slot:header>
        <h4 class="font-weight-bold" v-if="typeOfModal == 'add'" ><span class="text-warning" >Add: </span> Folder</h4>
        <h4 class="font-weight-bold" v-else><span class="text-info" >Edit: </span> Folder</h4>
      </template>
      <template v-slot:body>
        <p>zzzzzz</p>
      </template>
    </main-modal>

    <b-row>
      <div v-if="arrangeMode" class="position-absolute arrange-overlay">
        <p class="position-absolute arrange-text text-warning">You are in arrange mode now, specify the order of the selected
          item</p>
      </div>

      <b-col lg="12" class="mb-2 d-flex justify-content-between align-items-center">
        <h3>
          <router-link :to="{ name: 'flows' }" class="btn bg-white add_button" >
            <i class="fa fa-chevron-left"></i>
          </router-link>
          Folders
        </h3>
        <div class="d-flex justify-content-between gap-20">
          <b-button @click="arrangeMode = !arrangeMode" variant="dark" class="add_button text-white">
            <span v-if="!arrangeMode">Arrange<i class="fas fa-arrow-down-arrow-up"></i></span>
            <span v-else>Save</span>
          </b-button>
          <b-button @click="openPopup" variant="warning" class="add_button text-white">
          Add Folder<i class="las la-plus ml-3"></i></b-button>
        </div>
      </b-col>

      <b-col lg="12">
        <main-table
            :fields="columns"
            class="mb-0 table-borderless"
            @sortChanged="sortChanged"
            :list_url="'tickets'"
            :reloadData="reloadTable"
            :service_type="'ticket'"
            :arrangeMode="arrangeMode"
        >
        </main-table>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { core } from '@/config/pluginInit'
export default {
  data () {
    return {
      reloadTable: false,
      requestLoading: false,
      columns: [
        { label: '#', key: 'sort', class: 'text-center', type: 'sort' },
        { label: 'Folder Name', key: 'name', class: 'text-left' },
        {
          label: 'Actions',
          key: 'actions',
          class: 'text-left',
          type: 'actions',
          actions: [
            {
              icon: 'las la-pen',
              color: 'info',
              text: 'Edit',
              actionName: 'showFolderToEdit',
              actionParams: 'fullObj'
            },
            {
              icon: 'las la-trash-alt',
              color: 'danger',
              text: 'Delete',
              showAlert: true,
              actionHeader: 'Delete',
              titleHeader: 'Folder',
              textContent: 'name',
              url: 'tickets'
            }
          ]
        }
      ],
      typeOfModal: 'add',
      folderDetails: {},
      folderId: '',
      arrangeMode: false
    }
  },
  methods: {
    sortChanged (key) {
      console.log(key)
    },
    openPopup () {
      this.folderId = ''
      this.typeOfModal = 'add'
      this.folderDetails = false
      this.$bvModal.show('folderDetailsModal')
    },
    showFolderToEdit (obj) {
      this.folderId = obj.id
      this.typeOfModal = 'edit'
      this.folderDetails = obj
      this.$bvModal.show('folderDetailsModal')
    }
  },
  created () {
    this.$root.$on('showFolderToEdit', this.showFolderToEdit)
  },
  beforeDestroy () {
    this.$root.$off('showFolderToEdit')
  },
  mounted () {
    core.index()
  }
}
</script>
