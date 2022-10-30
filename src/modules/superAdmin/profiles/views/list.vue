<template>
  <b-container fluid>
    <main-modal id="profileDetalilsModal" size="lg">
      <template v-slot:header>
        <h4 class="font-weight-bold" v-if="typeOfModal == 'add'"><span class="text-warning" >Add: </span> Profile</h4>
        <h4 class="font-weight-bold" v-else-if="typeOfModal == 'edit'"><span class="text-success-light" >Edit: </span>Profile</h4>
<!--        <h4 class="font-weight-bold" v-else><span class="text-info" >Edit: </span> Profile</h4>-->
      </template>
      <template v-slot:body>
        <profile-details
            @addProfile="addProfile"
            @editProfile="editProfile"
            :requestLoading="requestLoading"
            :profileDetails="profileDetails"
            :typeOfModal="typeOfModal"/>
      </template>
    </main-modal>
    <b-row>
      <b-col lg="12" class="mb-2 d-flex justify-content-between align-items-center">
        <h3>Profiles</h3>
        <div>
          <b-button  variant="warning" @click="openAddModal" class="add_button text-white">Create
            Profile<i class="las la-plus ml-3"></i></b-button>
        </div>
      </b-col>
      <b-col lg="12" class="mb-2">
        <iq-card class="filter-card">
          <b-row>
            <b-col md="3" sm="6">
              <span>Filter by name:</span>
              <b-form-input v-model="filter.name" @keyup="reloadTable=true"
                            placeholder="Search">
              </b-form-input>
            </b-col>
            <b-col md="3" sm="6">
              <span>Filter by account type:</span>
              <main-select v-model="filter.service_types" @change="reloadTable=true"
                           :options="accTypeFilterOptions" label="key" :reduce="data => data.value"
                           placeholder="--Select--">
              </main-select>
            </b-col>
<!--            <b-col md="3" sm="6">
              <span>Filter by profile type:</span>
              <main-select v-model="filter.profile_type" @change="reloadTable=true"
                           :options="profileTypeFilterOptions" label="key" :reduce="data => data.value"
                           placeholder="&#45;&#45;Select&#45;&#45;">
              </main-select>
            </b-col>-->
<!--            <b-col md="3" sm="6">
              <span>Filter by city:</span>
              <main-select v-model="filter.city_id" @change="reloadTable=true"
                           :options="allGovernorates" label="name" :reduce="data => data.id"
                           placeholder="&#45;&#45;Select&#45;&#45;">
              </main-select>
            </b-col>-->
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
            <b-col md="3">
              <span>Have a promotion:</span>
              <main-select v-model="filter.promotions" @change="reloadTable=true"
                           :options="promotion"
                           label="key"
                           :reduce="data => data.value"
                           placeholder="--Select--">
              </main-select>
            </b-col>
            <b-col md="3">
              <span>Activity Line:</span>
              <main-select v-model="filter.activity_line_id" @change="reloadTable=true"
                           :options="allActivityLines"
                           label="name"
                           :reduce="data => data.id"
                           placeholder="--Select--">
              </main-select>
            </b-col>
            <b-col md="3">
              <span>Activity Type:</span>
              <main-select v-model="filter.activity_type_id" @change="reloadTable=true"
                           :options="allActivityTypes"
                           label="name"
                           :reduce="data => data.id"
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
            :list_url="'providers'"
            :reloadData="reloadTable"
            @sortChanged="sortChanged"
            :custom-filter="filter"
        >
        </main-table>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { core } from '@/config/pluginInit'
import profileDetails from '../components/profileDetails'
import profilesServices from '@/modules/superAdmin/profiles/services/profiles.services'
import settingsService from '@/modules/superAdmin/settings/services/settings.services'
export default {
  data () {
    return {
      columns: [
        '#',
        { label: 'Facility Name', key: 'name', class: 'text-left' },
        { label: 'Account Type', key: 'service_types', class: 'text-left' },
        { label: 'Profile Type', key: 'profile_type', class: 'text-left' },
        { label: 'City', key: 'city.name', class: 'text-left' },
        { label: 'Area', key: 'area.name', class: 'text-left' },
        { label: 'Year', key: 'year', class: 'text-left', sortable: true },
        { label: 'Status', key: 'status', class: 'text-left' },
        { label: 'Promo', key: 'promotions_count', class: 'text-left', type: 'promo' },
        { label: 'Views', key: 'views', class: 'text-left', sortable: true },
        { label: 'Unique Views', key: 'unique_views', class: 'text-left', sortable: true },
        { label: 'Savers', key: 'saves', class: 'text-left', sortable: true },
        { label: 'Trackers', key: 'tracks', class: 'text-left', sortable: true },
        { label: 'User Status', key: 'status', class: 'text-left' },
        {
          label: 'Actions',
          key: 'actions',
          class: 'text-left wt-150',
          type: 'actions',
          actions: [
            {
              icon: 'las la-pen',
              color: 'success-light',
              text: 'Edit',
              actionName: 'viewProfile',
              actionParams: ['id']
            },
            {
              icon: 'las la-lock',
              color: 'primary',
              text: 'Can Login',
              showIf: (data) => data.can_login === false,
              showAlert: true,
              actionHeader: 'Alert',
              titleHeader: 'change login status',
              question: 'Are You Sure You Want Change This Status To Can login ?',
              textContent: 'name',
              textDeleteButton: 'Change Status',
              type: 'deactivate',
              iconClass: 'la la-lock-open',
              actionOnAlert: 'changeToActive'
            },
            {
              icon: 'la la-lock-open',
              color: 'cobalt-blue',
              text: "Can't Login",
              showIf: (data) => data.can_login === true,
              showAlert: true,
              actionHeader: 'Alert',
              titleHeader: 'change login status',
              question: "Are You Sure You Want Change This Status To Can't login ?",
              textContent: 'name',
              textDeleteButton: 'Change Status',
              type: 'deactivate',
              iconClass: 'las la-lock',
              actionOnAlert: 'changeToDisactive'
            },
            {
              icon: 'las la-trash-alt',
              color: 'danger',
              text: 'Delete',
              showAlert: true,
              actionHeader: 'Delete',
              titleHeader: 'Profile',
              textContent: 'name',
              url: 'providers'
            }
          ]
        }
      ],
      profileDetails: false,
      typeOfModal: 'add',
      requestLoading: false,
      reloadTable: false,
      filter:
      {
        service_types: '',
        profile_type: '',
        city_id: '',
        area_id: '',
        name: '',
        status: '',
        sort: '',
        sort_type: '',
        promotions: '',
        activity_type_id: '',
        activity_line_id: ''
      },
      profileTypeFilterOptions: [
        { key: 'Sky', value: 'sky_' },
        { key: 'Sea', value: 'sea_' },
        { key: 'Earth', value: 'earth_' },
        { key: 'Energy', value: 'energy_' },
        { key: 'None', value: '' }
      ],
      accTypeFilterOptions: [
        { key: 'GO', value: 'go' },
        { key: 'FLOW', value: 'flow' },
        { key: 'PRO', value: 'pro' },
        { key: 'CAMP', value: 'camp' },
        { key: 'SHOP', value: 'shop' },
        { key: 'None', value: '' }
      ],
      statusFilterOptions: [
        { key: 'Invisible', value: 'invisible' },
        { key: 'Visible', value: 'visible' },
        { key: 'Temp closed', value: 'temp_closed' },
        { key: 'None', value: '' }
      ],
      promotion: [
        { key: 'Yes', value: 'yes' },
        { key: 'No', value: 'no' },
        { key: 'None', value: '' }
      ],
      allActivityLines: [],
      allActivityTypes: [],
      allGovernorates: [],
      allAreas: []
    }
  },
  methods: {
    sortChanged (key) {
      this.reloadTable = false
      this.filter.sort = key.sortBy
      this.filter.sort_type = key.sortDesc ? 'desc' : 'asc'
      this.reloadTable = true
    },
    openAddModal () {
      this.profileDetails = false
      this.typeOfModal = 'add'
      this.$bvModal.show('profileDetalilsModal')
    },
    addProfile (id, data) {
      this.requestLoading = true
      profilesServices.addNewProfile(data).then(res => {
        this.reloadTable = true
        core.showSnackbar('success', res.data.message)
        this.$bvModal.hide('profileDetalilsModal')
      }).catch((err) => {
        if (err.response.data.errors) {
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            this.$refs[key].setErrors(value)
          }
        }
      }).finally(() => {
        this.requestLoading = false
      })
    },
    editProfile (id, data) {
      console.log(id)
      console.log(data)
      this.requestLoading = true
      profilesServices.editProfile(id, { ...data, _method: 'put' }).then(res => {
        this.reloadTable = true
        core.showSnackbar('success', res.data.message)
        this.$bvModal.hide('profileDetalilsModal')
      }).catch((err) => {
        if (err.response.data.errors) {
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            this.$refs[key].setErrors(value)
          }
        }
      }).finally(() => {
        this.requestLoading = false
      })
    },
    viewProfile (obj) {
      this.typeOfModal = 'edit'
      profilesServices.getActivationDetails(obj.id).then(res => {
        this.providerId = obj.id
        this.profileDetails = res.data.data
        this.$bvModal.show('profileDetalilsModal')
      })
    },
    changeToActiveStatus (id) {
      this.reloadTable = false
      profilesServices.changeProfileCanLogin(id, { can_login: 1, _method: 'post' }).then(res => {
        this.reloadTable = true
        core.showSnackbar('success', res.data.message)
        this.$bvModal.hide('deleteModal')
      })
    },
    changeToDisactive (id) {
      this.reloadTable = false
      profilesServices.changeProfileCanLogin(id, { can_login: 0, _method: 'post' }).then(res => {
        this.reloadTable = true
        core.showSnackbar('success', res.data.message)
        this.$bvModal.hide('deleteModal')
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
    getAllActivityLine () {
      settingsService.getAllActivityLine().then(res => {
        this.allActivityLines = res.data.data
      })
    },
    getActivityTypesDependOnActivityLine (id) {
      this.allActivityTypes = []
      settingsService.getActivityTypesDependOnActivityLine(id).then(res => {
        this.allActivityTypes = res.data.data
      })
    }
  },
  watch: {
    'filter.activity_line_id' (value) {
      this.filter.activity_type_id = ''
      this.getActivityTypesDependOnActivityLine(value)
    }
  },
  mounted () {
    core.index()
  },
  components: {
    profileDetails
  },
  beforeDestroy () {
    this.$root.$off('viewProfile', this.viewProfile)
    this.$root.$on('changeToDisactive', this.changeToDisactive)
    this.$root.$on('changeToActive', this.changeToActiveStatus)
  },
  created () {
    this.getAllCities()
    this.getAllAreas()
    this.getAllActivityLine()
    this.$root.$on('viewProfile', this.viewProfile)
    this.$root.$on('changeToDisactive', this.changeToDisactive)
    this.$root.$on('changeToActive', this.changeToActiveStatus)
  }
}
</script>
