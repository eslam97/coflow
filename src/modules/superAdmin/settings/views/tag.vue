<template>
    <div>
      <main-modal id="tag" size="lg">
        <template v-slot:header>
            <h4 class="font-weight-bold" v-if="typeOfModal == 'add'" ><span class="text-warning">Add: </span> Tag</h4>
            <h4 class="font-weight-bold" v-else><span class="text-info" >Edit: </span> Tag</h4>
        </template>
        <template v-slot:body>
          <tag-form :requestLoading="requestLoading" @addTag="addTag" @editTag="editTag" :typeOfModal="typeOfModal" :tagDetails="tagDetails"/>
        </template>
      </main-modal>
      <div class="d-flex justify-content-end">
        <b-button @click="openPopup"  variant="warning" class="add_button text-white"> Add Tag
          <i class="las la-plus ml-3"></i></b-button>
      </div>
      <main-table
          :fields="columns"
          class="mb-0 table-borderless"
          :list_url="'tags'"
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
import tagForm from '../components/tagForm'
import settingsService from '../services/settings.services'
export default {
  name: 'tag',
  components: {
    tagForm
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
              icon: 'las la-pen',
              color: 'success-light',
              text: 'Edit',
              actionName: 'viewTag',
              actionParams: 'fullObj'
            },
            {
              icon: 'las la-trash-alt',
              color: 'danger',
              text: 'Delete',
              showAlert: true,
              actionHeader: 'Delete',
              titleHeader: 'Tag',
              textContent: 'name',
              url: 'tags'
            }
          ]
        }
      ],
      tagId: '',
      tagDetails: {},
      typeOfModal: 'add'
    }
  },
  methods: {
    openPopup () {
      this.typeOfModal = 'add'
      this.tagDetails = {}
      this.tagId = ''
      this.$bvModal.show('tag')
    },
    viewTag (data) {
      this.typeOfModal = 'edit'
      this.tagId = data.id
      this.tagDetails = data
      this.$bvModal.show('tag')
    },
    addTag (data) {
      this.requestLoading = true
      this.reloadTable = false
      settingsService.addNewTag(data).then(res => {
        core.showSnackbar('success', res.data.message)
        this.reloadTable = true
        this.$bvModal.hide('tag')
      }).finally(() => {
        this.requestLoading = false
      })
    },
    editTag (data) {
      this.requestLoading = true
      this.reloadTable = false
      settingsService.editTag(this.tagId, { ...data, _method: 'put' }).then(res => {
        core.showSnackbar('success', res.data.message)
        this.reloadTable = true
        this.$bvModal.hide('tag')
      }).finally(() => {
        this.requestLoading = false
      })
    }
  },
  mounted () {
    core.index()
  },

  created () {
    this.$root.$on('viewTag', this.viewTag)
  },
  beforeDestroy () {
    this.$root.$off('viewTag')
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
