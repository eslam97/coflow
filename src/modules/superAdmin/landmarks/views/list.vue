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
      <div v-if="arrangeMode" class="position-absolute arrange-overlay">
        <p class="position-absolute arrange-text text-warning">You are in arrange mode now, specify the order of the selected
          item</p></div>
      <b-col lg="12"
             class="mb-2 d-flex justify-content-between align-items-center">
        <h3>Landmarks</h3>
        <div class="d-flex justify-content-between gap-20">
          <b-button @click="arrangeMode = !arrangeMode; resize()" variant="dark" class="add_button text-white">
            <span v-if="!arrangeMode">Arrange<i class="fas fa-arrow-down-arrow-up"></i></span>
            <span v-else>Save</span>
          </b-button>
          <b-button v-if="hasPer('landmark.create')" @click="openPopup" variant="warning"
                    class="add_button text-white">Create Landmark<i class="las la-plus ml-3"></i></b-button>
        </div>
      </b-col>
      <b-col lg="12" class="mb-2">
        <iq-card class="filter-card">
          <b-row>
            <b-col md="3" sm="6">
              <span>Filter by name:</span>
              <b-form-input v-model="filter.name" @keyup="reloadTable=true;reloadTable=true"
                            placeholder="Search">
              </b-form-input>
            </b-col>
            <b-col md="3" sm="6">
              <span>Filter by governorate:</span>
              <main-select v-model="filter.city_id" @change="reloadTable=true"
                           :options="allGovernorates" label="name" :reduce="data => data.id"
                           placeholder="--Select--">
              </main-select>
            </b-col>
            <b-col md="3" sm="6">
              <span>Filter by area:</span>
              <main-select v-model="filter.area_id" @change="reloadTable=true"
                           :options="allAreas" label="name" :reduce="data => data.id"
                           placeholder="--Select--">
              </main-select>
            </b-col>
            <b-col md="3">
              <span>Filter by status:</span>
              <main-select v-model="filter.status" @change="reloadTable=true"
                           :options="statusFilterOptions"
                           label="key"
                           :reduce="data => data.value"
                           placeholder="--Select--">
              </main-select>
            </b-col>
          </b-row>
        </iq-card>
      </b-col>
      <b-col lg="12">
        <main-table
            :fields="columns"
            class="mb-0 table-borderless"
            @sortChanged="sortChanged"
            :list_url="'landmarks'"
            :reloadData="reloadTable"
            :custom-filter="filter"
            :service_type="'landmark'"
            :arrangeMode="arrangeMode"
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
import settingsService from '@/modules/superAdmin/settings/services/settings.services'
export default {
  data () {
    return {
      reloadTable: false,
      requestLoading: false,
      columns: [
        '#',
        { label: 'Governorate', key: 'city.name', class: 'text-left' },
        { label: 'Area', key: 'area.name', class: 'text-left' },
        { label: 'Landmark Name', key: 'name', class: 'text-left' },
        { label: 'Status', key: 'status', class: 'text-left', type: 'status' },
        { label: 'Views', key: 'views', class: 'text-left', sortable: true },
        { label: 'Unique Views', key: 'unique_views', class: 'text-left', sortable: true },
        {
          label: 'Change Status',
          key: 'change_status',
          type: 'switch',
          showIf: () => this.hasPer('landmark.edit'),
          tableType: 'landmark',
          idKey: 'landmark_id',
          class: 'text-left'
        },
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
              showIf: () => this.hasPer('landmark.edit'),
              actionName: 'showLandmarkToEdit',
              actionParams: ['id']
            },
            {
              icon: 'las la-trash-alt',
              color: 'danger',
              text: 'Delete',
              showIf: () => this.hasPer('landmark.delete'),
              showAlert: true,
              actionHeader: 'Delete',
              titleHeader: 'Landmark',
              textContent: 'name',
              url: 'landmarks'
            }
          ]
        }
      ],
      typeOfModal: 'add',
      landmarkDetails: {},
      landMarkId: '',
      filter:
      {
        city_id: '',
        area_id: '',
        name: '',
        status: '',
        sort: '',
        sort_type: ''
      },
      statusFilterOptions: [
        { key: 'Active', value: 'active' },
        { key: 'Inactive', value: 'inactive' },
        { key: 'None', value: '' }
      ],
      allGovernorates: [],
      allAreas: [],
      arrangeMode: false
    }
  },
  components: {
    landmarkDetails
  },
  methods: {
    sortChanged (key) {
      this.reloadTable = false
      this.filter.sort = key.sortBy
      this.filter.sort_type = key.sortDesc ? 'desc' : 'asc'
      this.reloadTable = true
    },
    openPopup () {
      this.landMarkId = ''
      this.typeOfModal = 'add'
      this.landmarkDetails = false
      this.$bvModal.show('landMarksDetails')
    },
    addLandmark (logo, cover, landmark) {
      console.log('landmark => ', landmark)
      let id = ''
      this.requestLoading = true
      landmarksServices.addNewLandMark(landmark).then(res => {
        id = res.data.data.id
        logo.append('landmark_id', id)
        landmarksServices.addCoverLogo(logo).then(res => {
          cover.append('landmark_id', id)
          landmarksServices.addCoverLogo(cover).then(res => {
            this.reloadTable = true
            core.showSnackbar('success', res.data.message)
            this.$bvModal.hide('landMarksDetails')
          })
        })
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
    },
    getAllCities () {
      settingsService.getAllCities().then(res => {
        this.allGovernorates = res.data.data.data
        this.allGovernorates.push({ name: 'None', id: '' })
      })
    },
    getAllAreas () {
      settingsService.getAllAreas().then(res => {
        this.allAreas = res.data.data.data
        this.allAreas.push({ name: 'None', id: '' })
      })
    },
    resize () {
      setTimeout(() => {
        document.getElementsByClassName('arrange-overlay')[0].style.height = document.body.scrollHeight + 'px'
      }, 10)
    }
  },
  created () {
    this.getAllAreas()
    this.getAllCities()
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
