<template>
  <b-container fluid>
    <main-modal id="profileDetalilsModal" size="lg">
      <template v-slot:header>
        <h4 class="font-weight-bold" v-if="typeOfModal == 'add'"><span class="text-warning" >Add: </span> Profile</h4>
        <h4 class="font-weight-bold" v-else-if="typeOfModal == 'view'"><span class="text-success-light" >view: </span>Profile</h4>
        <h4 class="font-weight-bold" v-else><span class="text-info" >Edit: </span> Profile</h4>
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
          <b-button  variant="warning" v-b-modal:profileDetalilsModal class="add_button text-white">Create
            Profile<i class="las la-plus ml-3"></i></b-button>
        </div>
      </b-col>
      <b-col lg="12">
        <main-table
            :fields="columns"
            class="mb-0 table-borderless"
            :list_url="'providers'"
            :reloadData="reloadTable"
            @sortChanged="sortChanged"
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
export default {
  data () {
    return {
      columns: [
        { label: 'Facility Name', key: 'name', class: 'text-left' },
        { label: 'Account Type', key: 'service_types', class: 'text-left' },
        { label: 'Profile Type', key: 'profile_type', class: 'text-left' },
        { label: 'Country', key: 'country.name', class: 'text-left' },
        { label: 'City', key: 'city.name', class: 'text-left' },
        { label: 'Area', key: 'area.name', class: 'text-left' },
        { label: 'Year', key: 'year', class: 'text-left' },
        { label: 'Status', key: 'status', class: 'text-left' },
        { label: 'Views', key: 'views', class: 'text-left' },
        { label: 'Unique Views', key: 'unique_views', class: 'text-left' },
        { label: 'Savers', key: 'saves', class: 'text-left' },
        { label: 'Trackers', key: 'tracks', class: 'text-left' },
        { label: 'User Status', key: 'status', class: 'text-left' },
        {
          label: 'Actions',
          key: 'actions',
          class: 'text-left wt-150',
          type: 'actions',
          actions: [
            {
              icon: 'las la-eye',
              color: 'success-light',
              text: 'View',
              actionName: 'viewProfile',
              actionParams: ['id']
            },
            {
              icon: 'las la-lock',
              color: 'primary',
              text: "Can't Login",
              showIf: (data) => data.can_login === false,
              showAlert: true,
              actionHeader: 'Alert',
              titleHeader: 'change login status',
              question: "Are You Sure You Want Change This Status To Can't login ?",
              textContent: 'name',
              textDeleteButton: 'Change Status',
              type: 'deactivate',
              iconClass: 'la la-lock-open',
              actionOnAlert: 'changeToActive'
            },
            {
              icon: 'la la-lock-open',
              color: 'cobalt-blue',
              text: 'Can Login',
              showIf: (data) => data.can_login === true,
              showAlert: true,
              actionHeader: 'Alert',
              titleHeader: 'change login status',
              question: 'Are You Sure You Want Change This Status To Can login ?',
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
      profileDetails: {},
      typeOfModal: 'add',
      requestLoading: false,
      reloadTable: false
    }
  },
  methods: {
    sortChanged (key) {
      console.log(key)
    },
    addProfile (data) {
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
    editProfile () {
      console.log('edit')
    },
    viewProfile (obj) {
      profilesServices.getActivationDetails(obj.id).then(res => {
        this.providerId = obj.id
        this.profileDetails = res.data.data
        this.$bvModal.show('profileDetalilsModal')
      })
    },
    changeToActiveStatus (id) {
      this.reloadTable = false
      profilesServices.changeProfileCanLogin(id, { can_login: 1, _method: 'put' }).then(res => {
        this.reloadTable = true
        core.showSnackbar('success', res.data.message)
        this.$bvModal.hide('deleteModal')
      })
    },
    changeToDisactive (id) {
      this.reloadTable = false
      profilesServices.changeProfileCanLogin(id, { can_login: 0, _method: 'put' }).then(res => {
        this.reloadTable = true
        core.showSnackbar('success', res.data.message)
        this.$bvModal.hide('deleteModal')
      })
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
    this.$root.$on('viewProfile', this.viewProfile)
    this.$root.$on('changeToDisactive', this.changeToDisactive)
    this.$root.$on('changeToActive', this.changeToActiveStatus)
  }
}
</script>
