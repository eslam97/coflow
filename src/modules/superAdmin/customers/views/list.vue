<template>
  <b-container fluid>
    <b-row>
      <b-col lg="12"
             class="mb-2 align-items-start">
        <h3>Customers</h3>
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
              <span>Filter by gender:</span>
              <main-select v-model="filter.gender" @change="reloadTable=true"
                           :options="genderFilterOptions" label="key" :reduce="data => data.value"
                           placeholder="--Select--">
              </main-select>
            </b-col>
            <b-col md="3" sm="6">
              <span>Filter by nationality:</span>
              <main-select v-model="filter.nationality" @change="reloadTable=true"
                           :options="nationalityFilterOptions" label="name" :reduce="data => data.name"
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
            :list_url="'users'"
            :reloadData="reloadTable"
            :custom-filter="filter"
        >
        </main-table>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { core } from '@/config/pluginInit'
import settingsService from '@/modules/superAdmin/settings/services/settings.services'
export default {
  data () {
    return {
      columns: [
        '#',
        { label: 'User Name', key: 'name', class: 'text-left' },
        { label: 'Age', key: 'birthdate', class: 'text-left', type: 'birthDate', sortable: true },
        { label: 'Gender', key: 'gender', class: 'text-left' },
        { label: 'Nationality', key: 'nationality', class: 'text-left' },
        { label: 'Views', key: 'views', class: 'text-left', sortable: true },
        { label: 'Unique view', key: 'unique_views', class: 'text-left', sortable: true },
        { label: 'Saves', key: 'saves', class: 'text-left', sortable: true },
        { label: 'Tracks', key: 'tracks', class: 'text-left', sortable: true },
        {
          label: 'Actions',
          key: 'actions',
          class: 'text-left',
          type: 'actions',
          actions: [
            {
              showIf: () => this.hasPer('customers.delete'),
              icon: 'las la-trash-alt',
              color: 'danger',
              text: 'Delete',
              showAlert: true,
              actionHeader: 'Delete',
              titleHeader: 'Customer',
              textContent: 'name',
              url: 'users'
            }
          ]
        }
      ],
      reloadTable: false,
      filter:
          {
            name: '',
            nationality: '',
            gender: '',
            sort: '',
            sort_type: ''
          },
      genderFilterOptions: [
        { key: 'Male', value: 'male' },
        { key: 'Female', value: 'female' },
        { key: 'None', value: '' }
      ],
      nationalityFilterOptions: []
    }
  },
  components: {
  },
  methods: {
    sortChanged (key) {
      this.reloadTable = false
      this.filter.sort = key.sortBy
      this.filter.sort_type = key.sortDesc ? 'desc' : 'asc'
      this.reloadTable = true
    },
    getAllNationalities () {
      settingsService.getAllnationalities().then(res => {
        this.nationalityFilterOptions = res.data.data
      })
    }
  },
  created () {
    this.getAllNationalities()
  },
  beforeDestroy () {
  },
  mounted () {
    core.index()
  }
}
</script>
