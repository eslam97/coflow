<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(sendNotification)">
        <b-row>
          <b-col md="12" class="mb-3" >
            <label class="mb-3">Gender</label>
            <div>
              <b-form-radio class="custom-radio-color-checked mr-5"
                            inline
                            v-model="notification.gender"
                            color="warning"
                            name="typeOfOperation"
                            value="">
                <span class="text-primary font-size-12">All</span>
              </b-form-radio>
              <b-form-radio class="custom-radio-color-checked mr-5"
                            inline
                            v-model="notification.gender"
                            color="warning"
                            name="typeOfOperation"
                            value="male" >
                <span class="text-primary font-size-12">Male</span>
              </b-form-radio>
              <b-form-radio class="custom-radio-color-checked"
                            inline
                            v-model="notification.gender"
                            color="warning"
                            name="typeOfOperation"
                            value="female" >
                <span class="text-primary font-size-12">Female</span>
              </b-form-radio>
            </div>
          </b-col>
<!--          <b-col md="4" class="mb-3">
          </b-col>
          <b-col md="4" class="mb-3">
            <main-select labelTitle='Governorate'
                         :validate="''"
                         :name="`Governorate`"
                         placeholder="Choose"
                         :options="allGovernorates"
                         label="name"
                         :reduce="data => data.id"
                         @change="getAreasDependOnCity(notification.city_id)"
                         v-model="notification.city_id">
            </main-select>
          </b-col>
          <b-col md="4" class="mb-3">
            <main-select labelTitle='Area'
                         :validate="''"
                         :name="`Area`"
                         placeholder="Choose"
                         :options="allArea"
                         label="name"
                         :reduce="data => data.id"
                         v-model="notification.area_id">
            </main-select>
          </b-col>-->
<!--          <b-col md="6" class="mb-3">-->
<!--            <input-form-->
<!--                v-model="notification.start_age"-->
<!--                placeholder="Ex: 1997"-->
<!--                :validate="'required|numeric'"-->
<!--                name="start age"-->
<!--                :label="'Start Age'"-->
<!--            />-->
<!--          </b-col>-->
<!--          <b-col md="6" class="mb-3">-->
<!--            <input-form-->
<!--                v-model="notification.end_age"-->
<!--                placeholder="Ex: 2023"-->
<!--                :validate="'required|numeric'"-->
<!--                name="end age"-->
<!--                :label="'End Age'"-->
<!--            />-->
<!--          </b-col>-->
          <b-col md="6" class="mb-3">
            <main-select labelTitle='Nationality' :validate="''"
                         :name="'nationality'"
                         multiple
                         placeholder="Choose"
                         :options="allCountries"
                         label="name"
                         :reduce="data=> data.name"
                         v-model="notification.nationality">
            </main-select>
          </b-col>
          <b-col md="6" class="mb-3">
            <main-select labelTitle='Customer type' :validate="'required'"
                         :name="'Type'"
                         placeholder="Choose"
                         :options="['view', 'save', 'track']"
                         v-model="notification.type">
            </main-select>
          </b-col>
          <b-col md="12" class="mb-3">
            <input-form
                v-model="notification.title"
                placeholder="Ex: center"
                :validate="'required'"
                name="title"
                :label="'Title'"
            />
          </b-col>
          <b-col class="mb-3" md="12">
            <b-form-group
                label="Body"
                label-for="Body"
            >
              <ValidationProvider name="Body" ref="Body" rules="required" v-slot="{ errors }">
                <b-form-textarea
                    placeholder="Body..."
                    rows="2"
                    v-model="notification.body"
                    :class="(errors.length >
                             0 ? ' is-invalid' : '')"
                ></b-form-textarea>
                <div class="invalid-feedback">
                  <span>{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12" class="mt-4">
            <div class="d-flex justify-content-center">
              <b-button class="button-orange-modal" type="submit" v-if="!requestLoading">
                <i class="las la-plus"></i>
              </b-button>
              <b-button class="button-orange-modal" v-else>
                <spinner-loading ></spinner-loading>
              </b-button>
            </div>
          </b-col>
        </b-row>
      </b-form>
    </ValidationObserver>
  </div>
</template>
<script>
import settingsService from '@/modules/superAdmin/settings/services/settings.services'
export default {
  props: {
    requestLoading: {
      type: Boolean,
      default: false
    }
  },
  components: {
  },
  data () {
    return {
      notification: {
        title: '',
        body: '',
        nationality: '',
        gender: ''
      },
      ageOptions: [{ key: ' < 10 years', value: 0 },
        { key: '10 - 19 years', value: 1 },
        { key: '20 - 29 years', value: 2 },
        { key: '30 - 39 years', value: 3 },
        { key: '40 - 50 years', value: 4 },
        { key: '> 51 years', value: 5 }],
      allCountries: [],
      allGovernorates: [],
      allArea: []
    }
  },
  methods: {
    sendNotification () {
      this.$emit('addProviderNotification', this.notification)
    },
    // depend
    getAllCountries () {
      settingsService.getAllnationalities().then(res => {
        this.allCountries = res.data.data
      })
    },
    getCityDependOnCountry (id) {
      this.allGovernorates = []
      settingsService.getCountryCity(id).then(res => {
        this.allGovernorates = res.data.data
      })
    },
    getAreasDependOnCity (id) {
      this.allArea = []
      settingsService.getCityArea(id).then(res => {
        this.allArea = res.data.data
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
