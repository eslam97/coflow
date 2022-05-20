<template>
  <b-container fluid>
    <b-row>
      <b-col lg="12" class="mb-2 d-flex justify-content-between align-items-center">
        <h3>Profiles</h3>
        <div>
          <b-button  variant="warning" class="add_button text-white">Create
            Profile<i class="las la-plus ml-3"></i></b-button>
        </div>
      </b-col>
      <b-col lg="12">
        <main-table
            :fields="columns"
            class="mb-0 table-borderless"
            :list_url="'profile'"
            @sortChanged="sortChanged"
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
      columns: [
        { label: '#', key: 'id', class: 'text-left' },
        { label: 'Account Type', key: 'type', class: 'text-left', sortable: true },
        { label: 'Profile Type', key: 'profile_type', class: 'text-left' },
        { label: 'Governorate', key: 'governorate', class: 'text-left' },
        { label: 'Area', key: 'area', class: 'text-left' },
        { label: 'Facility Name', key: 'facility_name', class: 'text-left' },
        { label: 'Year', key: 'year', class: 'text-left' },
        { label: 'Status', key: 'status', class: 'text-left' },
        { label: 'Views', key: 'views', class: 'text-left' },
        { label: 'Unique Views', key: 'unique_views', class: 'text-left' },
        { label: 'Savers', key: 'savers', class: 'text-left' },
        { label: 'Trackers', key: 'trackers', class: 'text-left' },
        { label: 'User Status', key: 'user_status', class: 'text-left' },
        {
          label: 'Actions',
          key: 'actions',
          class: 'text-left wt-150',
          type: 'actions',
          actions: [
            {
              icon: 'las la-eye',
              color: 'success',
              text: 'Show'
            },
            {
              icon: 'las la-pen',
              color: 'cobalt-blue',
              text: 'Edit'
            },
            {
              icon: 'las la-times-circle',
              color: 'danger',
              text: 'Deactivate',
              showAlert: true,
              actionHeader: 'Deactivate',
              titleHeader: 'Profile',
              textContnet: 'facility_name',
              textDeleteButton: 'Deactivate'
            }
          ]
        }
      ],
      callData: [
        {
          id: '01',
          type: 'GO',
          profile_type: 'Sky Dive',
          governorate: 'Red Sea',
          area: 'Hurgada',
          facility_name: 'Fly Center',
          year: '2002',
          status: 'INVISIBLE',
          Invisible: '100',
          views: '200',
          unique_views: '20',
          savers: '15',
          trackers: '10',
          user_status: 'online'
        },
        {
          id: '02',
          type: 'GO',
          profile_type: 'Sky Dive',
          governorate: 'Red Sea',
          area: 'Hurgada',
          facility_name: 'Fly Center',
          year: '2002',
          status: 'INVISIBLE',
          Invisible: '100',
          views: '200',
          unique_views: '20',
          savers: '15',
          trackers: '10',
          user_status: 'online'
        },
        {
          id: '03',
          type: 'GO',
          profile_type: 'Sky Dive',
          governorate: 'Red Sea',
          area: 'Hurgada',
          facility_name: 'Fly Center',
          year: '2002',
          status: 'INVISIBLE',
          Invisible: '100',
          views: '200',
          unique_views: '20',
          savers: '15',
          trackers: '10',
          user_status: 'online'
        },
        {
          id: '04',
          type: 'GO',
          profile_type: 'Sky Dive',
          governorate: 'Red Sea',
          area: 'Hurgada',
          facility_name: 'Fly Center',
          year: '2002',
          status: 'INVISIBLE',
          Invisible: '100',
          views: '200',
          unique_views: '20',
          savers: '15',
          trackers: '10',
          user_status: 'online'
        },
        {
          id: '05',
          type: 'GO',
          profile_type: 'Sky Dive',
          governorate: 'Red Sea',
          area: 'Hurgada',
          facility_name: 'Fly Center',
          year: '2002',
          status: 'INVISIBLE',
          Invisible: '100',
          views: '200',
          unique_views: '20',
          savers: '15',
          trackers: '10',
          user_status: 'online'
        }
      ]
    }
  },
  methods: {
    sortChanged (key) {
      console.log(key)
    }
  },
  mounted () {
    core.index()
  }
}
</script>
