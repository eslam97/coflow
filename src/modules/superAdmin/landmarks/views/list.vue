<template>
  <b-container fluid>
    <main-modal id="landMarksDetails" size="lg">
      <template v-slot:header>
        <h4 class="font-weight-bold" v-if="typeOfModal == 'add'"><span class="text-warning" >Add: </span> Landmarks</h4>
        <h4 class="font-weight-bold" v-else-if="typeOfModal == 'view'"><span class="text-success-light" >view: </span>Landmarks</h4>
        <h4 class="font-weight-bold" v-else><span class="text-info" >Edit: </span> Landmarks</h4>
      </template>
      <template v-slot:body>
        <landmark-details @addLandmark="addLandmark"
                          @editLandmark="editLandmark"
                          :requestLoading="requestLoading"
                          :landmarkDetails="landmarkDetails"
                          :typeOfModal="typeOfModal"/>
      </template>
    </main-modal>
    <b-row>
      <b-col lg="12"
             class="mb-2 d-flex justify-content-between align-items-center">
        <h3>Landmarks</h3>
        <div>
          <b-button @click="openPopup" variant="warning" class="add_button text-white">Create
            Landmark<i class="las la-plus ml-3"></i></b-button>
        </div>
      </b-col>
      <b-col lg="12">
        <main-table
            :fields="columns"
            class="mb-0 table-borderless"
            @sortChanged="sortChanged"
            :list_url="'landmarks'"
            :reloadData="reloadTable"
        >
        </main-table>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { core } from '@/config/pluginInit'
import landmarkDetails from '@/modules/superAdmin/landmarks/components/landmarkDetails'
import landmarksServices from '@/modules/superAdmin/landmarks/services/landmarks.services'
export default {
  data () {
    return {
      reloadTable: false,
      requestLoading: false,
      columns: [
        { label: '#', key: 'id', class: 'text-left' },
        { label: 'Country', key: 'country.name', class: 'text-left' },
        { label: 'Governorate', key: 'city.name', class: 'text-left' },
        { label: 'Area', key: 'area.id', class: 'text-left' },
        { label: 'Landmark Name', key: 'name', class: 'text-left' },
        { label: 'Status', key: 'status', class: 'text-left', type: 'status' },
        { label: 'Views', key: 'views', class: 'text-left' },
        { label: 'Unique Views', key: 'unique_views', class: 'text-left' },
        {
          label: 'Actions',
          key: 'actions',
          class: 'text-left',
          type: 'actions',
          actions: [
            {
              icon: 'las la-eye',
              color: 'success-light',
              text: 'View',
              actionName: 'showLandmark',
              actionParams: ['id']
            },
            {
              icon: 'las la-pen',
              color: 'info',
              text: 'Edit',
              actionName: 'showLandmarkToEdit',
              actionParams: ['id']
            },
            {
              icon: 'las la-trash-alt',
              color: 'danger',
              text: 'Delete',
              showAlert: true,
              actionHeader: 'Delete',
              titleHeader: 'Landmark',
              textContnet: 'name',
              url: 'landmarks'
            }
          ]
        }
      ],
      typeOfModal: 'add',
      landmarkDetails: {},
      landMarkId: ''
    }
  },
  components: {
    landmarkDetails
  },
  methods: {
    sortChanged (key) {
      console.log(key)
    },
    openPopup () {
      this.landMarkId = ''
      this.typeOfModal = 'add'
      this.landmarkDetails = {}
      this.$bvModal.show('landMarksDetails')
    },
    addLandmark (landmark) {
      this.requestLoading = true
      landmarksServices.addNewLandMark(landmark).then(res => {
        this.reloadTable = true
        core.showSnackbar('success', res.data.message)
        this.$bvModal.hide('landMarksDetails')
      }).finally(() => {
        this.requestLoading = false
      })
    },
    editLandmark (landmark) {
      this.requestLoading = true
      landmarksServices.editLandmark(this.landMarkId, landmark).then(res => {
        this.reloadTable = true
        core.showSnackbar('success', res.data.message)
        this.$bvModal.hide('landMarksDetails')
      }).finally(() => {
        this.requestLoading = false
      })
    },
    showDetails (obj) {
      this.landMarkId = ''
      this.typeOfModal = 'view'
      landmarksServices.getLandmarkDetails(obj.id).then(res => {
        this.landmarkDetails = res.data.data
        this.$bvModal.show('landMarksDetails')
      })
    },
    showLandmarkToEdit (obj) {
      this.typeOfModal = 'edit'
      this.landMarkId = obj.id
      landmarksServices.getLandmarkDetails(obj.id).then(res => {
        this.landmarkDetails = res.data.data
        this.$bvModal.show('landMarksDetails')
      })
    }
  },
  created () {
    this.$root.$on('showLandmark', this.showDetails)
    this.$root.$on('showLandmarkToEdit', this.showLandmarkToEdit)
  },
  beforeDestroy () {
    this.$root.$off('showLandmark')
    this.$root.$off('showLandmarkToEdit')
  },
  mounted () {
    core.index()
  }
}
</script>
