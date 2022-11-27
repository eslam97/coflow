<template>
  <div>
    <main-modal id="city" size="lg">
      <template v-slot:header>
        <h4 class="font-weight-bold"><span class="text-warning"> Add: </span>Governorate</h4>
      </template>
      <template v-slot:body>
        <city-form :requestLoading="requestLoading" @addCity="addCity"/>
      </template>
    </main-modal>
    <div class="d-flex justify-content-end mb-3">
      <b-button  variant="warning" v-b-modal:city class="add_button text-white"> Add Governorate
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
            </b-row>
          </iq-card>
        </b-col>
        <b-col cols="12">
          <main-table
              :custom-filter="filter"
              :fields="columns"
              class="mb-0 table-borderless"
              :list_url="'cities'"
              :reloadData="reloadTable"
          >
          </main-table>
        </b-col>
      </b-row>
  </div>
</template>
<script>
import { core } from '@/config/pluginInit'
import cityForm from '../components/cityForm'
import settingsService from '../services/settings.services'
export default {
  name: 'cities',
  components: {
    cityForm
  },
  data () {
    return {
      filter: {
        country_id: ''
      },
      reloadTable: false,
      requestLoading: false,
      allCountries: [],
      columns: [
        { label: 'Name', key: 'name', class: 'text-center' },
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
              titleHeader: 'Governorate',
              textContent: 'name',
              url: 'cities'
            }
          ]
        }
      ]
    }
  },
  methods: {
    getAllCountries () {
      settingsService.getAllCountries().then(res => {
        this.allCountries = res.data.data
      })
    },
    addCity (data) {
      this.requestLoading = true
      this.reloadTable = false
      settingsService.addNewCity(data).then(res => {
        core.showSnackbar('success', res.data.message)
        this.reloadTable = true
        this.$bvModal.hide('city')
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
