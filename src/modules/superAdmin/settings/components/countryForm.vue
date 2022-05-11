<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(submit)">
        <b-row>
          <b-col md="12" class="mb-3">
            <input-form
                v-model="country.name"
                placeholder=""
                :validate="'required'"
                name="Country"
                :label="'Country'"
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12" class="mt-4">
            <div v-if="requestLoading" class="text-center">
              <b-button class="container_button_blue ml-2">
                <spinner-loading  text="Loading" />
              </b-button>
            </div>
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
export default {
  name: 'countryForm',
  props: {
    requestLoading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      country: {
        name: ''
      }
    }
  },
  methods: {
    submit () {
      this.$emit('addCountry', this.country)
    }
  },
  watch: {
  },
  computed: {
  },
  created () {
  }
}
</script>
