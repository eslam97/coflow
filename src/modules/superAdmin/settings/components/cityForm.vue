<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(submit)">
        <b-row>
          <b-col md="12" class="mb-3">
            <input-form
                v-model="city.name"
                placeholder=""
                :validate="'required'"
                name="City"
                :label="'Governorate'"
            />
          </b-col>
          <b-col md="12" class="mb-3">
            <main-select
                labelTitle='Country'
                :validate="'required'"
                :name="`Country`"
                label="name"
                placeholder="Choose" :options="allCountries"
                v-model="city.country_id"
                :reduce="data=> data.id"
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
      city: {
        name: '',
        country_id: ''
      },
      allCountries: []
    }
  },
  methods: {
    submit () {
      this.$emit('addCity', this.city)
    },
    getAllCountries () {
      settingsService.getAllCountries().then(res => {
        this.allCountries = res.data.data
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
