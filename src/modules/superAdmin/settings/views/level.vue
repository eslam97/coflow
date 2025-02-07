<template>
    <div>
      <main-modal id="level" size="lg">
        <template v-slot:header>
            <h4 class="font-weight-bold" v-if="typeOfModal == 'add'" ><span class="text-warning">Add: </span> Level</h4>
            <h4 class="font-weight-bold" v-else><span class="text-info" >Edit: </span> Level</h4>
        </template>
        <template v-slot:body>
          <level-form :requestLoading="requestLoading" @addLevel="addLevel" @editLevel="editLevel" :typeOfModal="typeOfModal" :levelDetails="levelDetails"/>
        </template>
      </main-modal>
      <div class="d-flex justify-content-end">
        <b-button @click="openPopup"  variant="warning" class="add_button text-white"> Add level
          <i class="las la-plus ml-3"></i></b-button>
      </div>
      <main-table
          :fields="columns"
          class="mb-0 table-borderless"
          :list_url="'levels'"
          :reloadData="reloadTable"
      >
      <template v-slot:color="data">
        <div class="d-flex justify-content-center">
          <div class="color-box" :style="{backgroundColor: data.data.color}"></div>
        </div>
      </template>
    </main-table>
    </div>
  </template>
<script>
import { core } from '@/config/pluginInit'
import levelForm from '../components/levelForm'
import settingsService from '../services/settings.services'
export default {
  name: 'level',
  components: {
    levelForm
  },
  data () {
    return {
      reloadTable: false,
      requestLoading: false,
      columns: [
        { label: 'Name', key: 'name', class: 'text-center' },
        { label: 'Color', key: 'color', class: 'text-center', type: 'custom' },
        {
          label: 'Actions',
          key: 'actions',
          class: 'text-center',
          type: 'actions',
          actions: [
            {
              icon: 'las la-pen',
              color: 'success-light',
              text: 'Edit',
              actionName: 'viewLevel',
              actionParams: 'fullObj'
            },
            {
              icon: 'las la-trash-alt',
              color: 'danger',
              text: 'Delete',
              showAlert: true,
              actionHeader: 'Delete',
              titleHeader: 'Level',
              textContent: 'name',
              url: 'levels'
            }
          ]
        }
      ],
      levelId: '',
      levelDetails: {},
      typeOfModal: 'add'
    }
  },
  methods: {
    openPopup () {
      this.typeOfModal = 'add'
      this.levelDetails = {}
      this.levelId = ''
      this.$bvModal.show('level')
    },
    viewLevel (data) {
      this.typeOfModal = 'edit'
      this.levelId = data.id
      this.levelDetails = data
      this.$bvModal.show('level')
    },
    addLevel (data) {
      this.requestLoading = true
      this.reloadTable = false
      settingsService.addNewLevel(data).then(res => {
        core.showSnackbar('success', res.data.message)
        this.reloadTable = true
        this.$bvModal.hide('level')
      }).finally(() => {
        this.requestLoading = false
      })
    },
    editLevel (data) {
      this.requestLoading = true
      this.reloadTable = false
      settingsService.editLevel(this.levelId, { ...data, _method: 'put' }).then(res => {
        core.showSnackbar('success', res.data.message)
        this.reloadTable = true
        this.$bvModal.hide('level')
      }).finally(() => {
        this.requestLoading = false
      })
    }
  },
  mounted () {
    core.index()
  },

  created () {
    this.$root.$on('viewLevel', this.viewLevel)
  },
  beforeDestroy () {
    this.$root.$off('viewLevel')
  }
}
</script>
<style>
.color-box {
    width: 30px;
    height: 30px;
    border-radius: 50%;
}
</style>
