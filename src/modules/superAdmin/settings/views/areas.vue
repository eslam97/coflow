<template>
  <div>
    <main-modal id="area" size="lg">
      <template v-slot:header>
        <h4 class="font-weight-bold"><span class="text-warning"> Add: </span>Area</h4>
      </template>
      <template v-slot:body>
        <area-form :requestLoading="requestLoading" @addArea="addArea"/>
      </template>
    </main-modal>
    <div class="d-flex justify-content-end">
      <b-button  variant="warning" v-b-modal:area class="add_button text-white"> Add Area
        <i class="las la-plus ml-3"></i></b-button>
    </div>

    <b-row>
      <b-col md="12">
        <iq-card class="filter-card p-1">
          <b-row>
            <b-col md="3" sm="6">
              <span>Filter by governate:</span>
              <main-select v-model="filter.country_id" @change="reloadTable=true"
                           :options="allCountries" label="name" :reduce="data => data.id"
                           placeholder="--Select--">
              </main-select>
            </b-col>
            <b-col md="3" sm="6">
              <span>Filter by city:</span>
              <main-select v-model="filter.city_id" @change="reloadTable=true"
                           :options="cities" label="name" :reduce="data => data.id"
                           placeholder="--Select--">
              </main-select>
            </b-col>
          </b-row>
        </iq-card>
      </b-col>
      <b-col cols="12">
        <main-table
            :fields="columns"
            :custom-filter="filter"
            class="mb-0 table-borderless"
            :list_url="'areas'"
            :reloadData="reloadTable"
        >
        </main-table>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { core } from '@/config/pluginInit'
import areaForm from '../components/areaForm'
import settingsService from '../services/settings.services'
export default {
  name: 'areas',
  components: {
    areaForm
  },
  data () {
    return {
      reloadTable: false,
      requestLoading: false,
      cities: [],
      allCountries: [],
      filter: {
        city_id: '',
        country_id: ''
      },
      columns: [
        { label: 'Name', key: 'name', class: 'text-center' },
        { label: 'Governorate', key: 'city.name', class: 'text-center' },
        { label: 'Country', key: 'country.name', class: 'text-center' },
        {
          label: 'Actions',
          key: 'actions',
          class: 'text-center',
          type: 'actions',
          actions: [
            {
              icon: 'las la-trash-alt',
              color: 'danger',
              text: 'Delete',
              showAlert: true,
              actionHeader: 'Delete',
              titleHeader: 'Area',
              textContent: 'name',
              url: 'areas'
            }
          ]
        }
      ]
    }
  },
  watch: {
    'filter.country_id' (value) {
      this.getCityDependOnCountry(value)
    }
  },
  methods: {
    getAllCountries () {
      settingsService.getAllCountries().then(res => {
        this.allCountries = res.data.data
      })
    },
    getCityDependOnCountry (countryId) {
      settingsService.getCountryCity(countryId).then(res => {
        this.cities = res.data.data
      })
    },
    addArea (data) {
      this.requestLoading = true
      this.reloadTable = false
      settingsService.addNewArea(data).then(res => {
        core.showSnackbar('success', res.data.message)
        this.reloadTable = true
        this.$bvModal.hide('area')
      }).finally(() => {
        this.requestLoading = false
      })
    }
  },
  mounted () {
    core.index()
  },
  created () {
    this.getAllCountries()
  }
}
</script>
