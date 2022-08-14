<template>
    <b-row>
      <b-col lg="12" class="mb-2">
        <b-card>
          <b-card-body class="p-0">
            <b-row>
              <b-col md="3" sm="6">
                <span>Filter by name:</span>
                <b-form-input v-model="filter.name" @keyup="reloadTable=true"
                              placeholder="Search">
                </b-form-input>
              </b-col>
              <b-col md="3" sm="6">
                <span>Filter by provider:</span>
                <b-form-input v-model="filter.facility_name" @keyup="reloadTable=true"
                              placeholder="Search">
                </b-form-input>
              </b-col>
              <b-col md="3" sm="6">
                <span>Filter by profile type:</span>
                <main-select v-model="filter.profile_type" @change="reloadTable=true"
                             :options="profileTypeFilterOptions" label="key" :reduce="data => data.value"
                             placeholder="--Select--">
                </main-select>
              </b-col>
              <b-col md="3" sm="6">
                <span>Filter by city:</span>
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
          </b-card-body>
        </b-card>
      </b-col>
      <b-col lg="12">
        <main-table
            :fields="columns"
            class="mb-0 table-borderless"
            :list_url="'all-tickets'"
            :reloadData="reloadTable"
            :custom-filter="filter"
        >
        </main-table>
      </b-col>
    </b-row>
</template>
<script>
import { core } from '@/config/pluginInit'
import settingsService from '@/modules/superAdmin/settings/services/settings.services'
export default {
  data () {
    return {
      columns: [
        { label: 'Name', key: 'name', class: 'text-left' },
        { label: 'Provider Name', key: 'provider.name', class: 'text-left' },
        { label: 'Profile Type', key: 'provider.profile_type', class: 'text-left' },
        { label: 'City', key: 'provider.city.name', class: 'text-left' },
        { label: 'Area', key: 'provider.area.name', class: 'text-left' },
        { label: 'Price', key: 'price_egp,price_euro,price_dollar', class: 'text-left', type: 'multi-currency' },
        { label: 'Discounted Price', key: 'discount_price_egp,discount_price_euro,discount_price_dollar', class: 'text-left', type: 'multi-currency' },
        { label: 'Status', key: 'status', class: 'text-left', type: 'status' },
        { label: 'Views', key: 'views', class: 'text-left', sortable: true },
        { label: 'Unique Views', key: 'unique_views', class: 'text-left', sortable: true }
      ],
      reloadTable: false,
      filter:
          {
            city_id: '',
            area_id: '',
            facility_name: '',
            profile_type: '',
            name: '',
            status: '',
            sort: '',
            sort_type: ''
          },
      profileTypeFilterOptions: [
        { key: 'Sky', value: 'sky_' },
        { key: 'Sea', value: 'sea_' },
        { key: 'Earth', value: 'earth_' },
        { key: 'Energy', value: 'energy_' },
        { key: 'None', value: '' }
      ],
      statusFilterOptions: [
        { key: 'Active', value: 'active' },
        { key: 'Inactive', value: 'inactive' },
        { key: 'None', value: '' }
      ],
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
    }
  },
  created () {
    this.getAllAreas()
    this.getAllCities()
  },
  mounted () {
    core.index()
  }
}
</script>
