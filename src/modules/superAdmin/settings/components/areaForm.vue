<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(submit)">
        <b-row>
          <b-col md="12" class="mb-3">
            <input-form
                v-model="area.name"
                placeholder=""
                :validate="'required'"
                name="Area"
                :label="'Area'"
            />
          </b-col>
          <b-col md="12" class="mb-3">
            <main-select
                labelTitle='Country'
                :validate="'required'"
                :name="`Country`"
                label="name"
                placeholder="Choose" :options="allCountries"
                v-model="area.country_id"
                :reduce="data=> data.id"
                @change="getCityDependOnCountry"
            ></main-select>
          </b-col>
          <b-col md="12" class="mb-3">
            <main-select
                labelTitle='City'
                :validate="'required'"
                :name="`City`"
                label="name"
                placeholder="Choose" :options="allCities"
                v-model="area.city_id"
                :reduce="data=> data.id"
                @change="getCityDependOnCountry"
            ></main-select>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12" class="mt-4">
            <p v-if="requestLoading" class="text-center">
              <b-button class="container_button_blue ml-2">
                <spinner-loading  text="Loading" />
              </b-button>
            </p>
            <div class="d-flex justify-content-center" v-else>
              <b-button class="container_button_blue ml-2" type="submit">
                <span>Save</span>
              </b-button>
            </div>
          </b-col>
        </b-row>
      </b-form>
    </ValidationObserver>
  </div>
</template>
<script>
import settingsService from '../services/settings.services'
export default {
  name: 'cityForm',
  props: {
    requestLoading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      area: {
        name: '',
        country_id: '',
        city_id: ''
      },
      allCountries: [],
      allCities: []
    }
  },
  methods: {
    submit () {
      this.$emit('addArea', this.area)
    },
    getAllCountries () {
      settingsService.getAllCountries().then(res => {
        this.allCountries = res.data.data
      })
    },
    getCityDependOnCountry () {
      this.allCities = []
      settingsService.getCountryCity(this.area.country_id).then(res => {
        this.allCities = res.data.data
      })
    }
  },
  watch: {
  },
  computed: {
  },
  created () {
    this.getAllCountries()
  }
}
</script>
