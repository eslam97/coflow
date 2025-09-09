<template>
  <div>
    <div class="border-bottom my-5">
      <b-container>
        <h4 class="py-4">Facility Location</h4>
      </b-container>
    </div>

    <b-container>
      <div class="w-75">
        <ValidationObserver v-slot="{ handleSubmit }">
          <b-form @submit.prevent="handleSubmit(saveFacilityLocation)">
            <!-- Location Type -->
            <b-row class="mb-5">
              <b-col md="12">
                <label class="mb-3">Location</label>
                <div>
                  <b-form-radio
                    class="custom-radio-color-checked mr-5"
                    inline
                    v-model="location_type"
                    name="location"
                    value="address based"
                    color="warning"
                  >
                    <span class="text-primary font-size-12">Address Based</span>
                  </b-form-radio>
                  <b-form-radio
                    class="custom-radio-color-checked"
                    inline
                    v-model="location_type"
                    name="location"
                    value="remote location"
                    color="warning"
                  >
                    <span class="text-primary font-size-12">Remote</span>
                  </b-form-radio>
                </div>
              </b-col>
            </b-row>

            <!-- Contact Numbers -->
            <b-row>
              <b-col
                v-for="(item, key) in phones"
                :key="key"
                md="6"
                class="mb-1"
              >
                <b-form-group
                  :label="`Contact Number ${key + 1}`"
                  :label-for="`Contact Number ${key + 1}`"
                  class="position-relative"
                >
                  <span
                    v-if="key !== 0"
                    class="text-danger deleteLabelButton cursor-pointer"
                    @click="deleteContact(key)"
                  >
                    Delete
                  </span>
                  <b-input-group>
                    <validation-provider
                      #default="{ errors }"
                      :name="`Contact Number ${key + 1}`"
                      rules="required|numeric"
                      class="flex-grow-1"
                    >
                      <b-form-input
                        v-model="item.phone"
                        :class="{ 'is-invalid': errors.length > 0 }"
                        placeholder="Ex: 020454684"
                        :disabled="!item.name"
                      />
                    </validation-provider>

                    <template #prepend>
                      <b-dropdown
                        :text="item.name || 'Choose'"
                        class="selectWithInput"
                      >
                        <b-dropdown-item
                          v-for="(type, typeIndex) in contactTypes"
                          :key="typeIndex"
                          @click="item.name = type"
                        >
                          {{ type }}
                        </b-dropdown-item>
                      </b-dropdown>
                    </template>
                  </b-input-group>
                </b-form-group>
              </b-col>

              <b-col md="12" class="mb-4">
                <span class="text-warning cursor-pointer" @click="addNewContactNumber">
                  + Add another Contact Number
                </span>
              </b-col>
            </b-row>

            <!-- Reservation Link -->
            <b-row>
              <b-col md="12">
                <main-select
                  labelTitle="Reservation Link"
                  :validate="'required'"
                  name="reservation_contact"
                  placeholder="Choose"
                  :options="getAllReservationLinkWithoutYoutube"
                  label="name"
                  :reduce="d => d"
                  v-model="reservation_contact"
                />
              </b-col>
            </b-row>

            <!-- Address Based Form -->
            <div v-if="location_type === 'address based'">
              <b-row>
                <b-col md="2" class="mb-3">
                  <main-select
                    labelTitle="Country"
                    :validate="'required'"
                    name="country_id"
                    placeholder="Choose"
                    :options="allCountries"
                    label="name"
                    :reduce="data => data.id"
                    v-model="based.country_id"
                  />
                </b-col>
                <b-col md="2" class="mb-3">
                  <main-select
                    labelTitle="Governorate"
                    :validate="'required'"
                    name="Governorate"
                    placeholder="Choose"
                    :options="allGovernorates"
                    label="name"
                    :reduce="data => data.id"
                    v-model="based.city_id"
                  />
                </b-col>
                <b-col md="4" class="mb-3">
                  <main-select
                    labelTitle="Area"
                    :validate="'required'"
                    name="Area"
                    placeholder="Choose"
                    :options="allArea"
                    label="name"
                    :reduce="data => data.id"
                    v-model="based.area_id"
                  />
                </b-col>
                <b-col md="4" class="mb-3">
                  <input-form
                    label="Address"
                    name="Address"
                    :validate="'required'"
                    placeholder="Ex: 105 name st."
                    v-model="based.address"
                  />
                </b-col>
              </b-row>

              <b-row>
                <b-col md="12" class="mb-3">
                  <b-form-group label="Location" label-for="Location">
                    <validation-provider
                      name="Location"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <b-form-textarea
                        rows="2"
                        v-model="based.location"
                        placeholder="Location..."
                        :class="errors.length ? 'is-invalid' : ''"
                      />
                      <div class="invalid-feedback">
                        <span>{{ errors[0] }}</span>
                      </div>
                    </validation-provider>
                    <p class="mt-2 text-muted">
                      * Note: If location is not set up on Google Maps, drop a nearby pin and paste the coordinates here.
                    </p>
                  </b-form-group>
                </b-col>
              </b-row>
            </div>

            <!-- Remote Location Form -->
            <div v-else>
              <b-row class="mb-5">
                <b-col
                  v-for="(location, i) in remote_locations"
                  :key="i"
                  md="12"
                  class="position-relative mb-3"
                >
                  <b-row class="align-items-center">
                    <b-col md="3" class="mb-2">
                      <main-select
                        labelTitle="Country"
                        :validate="'required'"
                        :name="`Country ${i + 1}`"
                        placeholder="Choose"
                        :options="allCountries"
                        label="name"
                        :reduce="d => d.id"
                        @change="(id) => onChangeRemoteCountry(id, location)"
                        v-model="location.country_id"
                      />
                    </b-col>
                    <b-col md="1">
                      <b-form-checkbox
                        value="all country"
                        v-model="location.availability_type"
                        class="custom-checkbox-color-check"
                        color="warning"
                      >
                        <span class="font-size-12 text-primary"> All </span>
                      </b-form-checkbox>
                    </b-col>
                    <b-col md="3" class="mb-2" v-if="location.availability_type !== 'all country'">
                      <main-select
                      labelTitle="Governorate"
                      :validate="'required'"
                      :name="`Governorate ${i + 1}`"
                      placeholder="Choose"
                      :options="location.cityList"
                      label="name"
                      :reduce="d => d.id"
                      @change="(id) => onChangeRemoteCity(id, location)"
                      v-model="location.city_id"
                      />
                    </b-col>
                    <b-col md="1" v-if="location.availability_type !== 'all country'">
                      <b-form-checkbox
                        value="all city"
                        v-model="location.availability_type"
                        class="custom-checkbox-color-check"
                        color="warning"
                      >
                        <span class="font-size-12 text-primary"> All </span>
                      </b-form-checkbox>
                    </b-col>
                    <b-col md="4" class="mb-2"
                      v-if="location.availability_type !== 'all country' && location.availability_type !== 'all city'">
                      <main-select
                        labelTitle="Area"
                        :validate="'required'"
                        :name="`Area ${i + 1}`"
                        placeholder="Choose"
                        :options="location.areaList"
                        :multiple="true"
                        label="name"
                        :reduce="d => d.id"
                        v-model="location.areas"
                      />
                    </b-col>
                  </b-row>
                  <span
                    v-if="i !== 0"
                    class="text-danger deleteLabelButton cursor-pointer"
                    @click="deletezone(i)"
                  >
                    Delete Zone
                  </span>
                </b-col>

                <b-col md="12">
                  <span class="text-warning cursor-pointer" @click="addNewzone">
                    + Add new zone
                  </span>
                </b-col>
              </b-row>
            </div>

            <!-- Form Footer -->
            <b-row>
              <b-col md="12" class="mt-3 mb-5 d-flex justify-content-between align-items-center">
                <span @click="goBack" class="cursor-pointer text-black d-flex align-items-center">
                  <i class="mr-2 las la-arrow-left font-size-18"></i>
                  <span class="text-bold">Back</span>
                </span>
                <span>
                  <spinner-loading v-if="loadingFacilityLocation" class="gradient-orange-button" text="Saving" />
                  <b-button v-else type="submit" class="gradient-orange-button slideNextArrow">
                    <span class="d-flex align-items-center">Next
                      <i class="ml-2 las la-arrow-right font-size-18"></i></span>
                  </b-button>
                </span>
              </b-col>
            </b-row>
          </b-form>
        </ValidationObserver>
      </div>
    </b-container>
  </div>
</template>

<script>
import settingsService from '@/modules/superAdmin/settings/services/settings.services'
import registrationServices from '@/modules/businessLandingPage/services/registration.services'
import { core } from '@/config/pluginInit'

export default {
  props: {
    providerInfo: Object,
    profileInfo: Object
  },
  data () {
    return {
      location_type: 'address based',
      based: {
        country_id: '',
        city_id: '',
        area_id: '',
        address: '',
        location: ''
      },
      contactTypes: ['Landline', 'Mobile'],
      phones: [{ name: '', phone: '' }],
      remote_locations: [this.createEmptyRemote()],
      allCountries: [],
      allGovernorates: [],
      allArea: [],
      loadingFacilityLocation: false,
      allLinks: JSON.parse(localStorage.getItem('allLinks')),
      reservation_contact: {}
    }
  },
  computed: {
    getAllReservationLinkWithoutYoutube () {
      return this.allLinks.filter(link => link.name !== 'Youtube')
    }
  },
  watch: {
    'based.country_id' (newVal) {
      if (newVal) {
        this.getCityDependOnCountry(newVal)
      }
    },
    'based.city_id' (newVal) {
      if (newVal) {
        this.getAreasDependOnCity(newVal)
      }
    }
  },
  methods: {
    createEmptyRemote () {
      return {
        availability_type: 'open',
        country_id: '',
        city_id: '',
        areas: [],
        cityList: [],
        areaList: []
      }
    },
    deleteContact (index) {
      this.phones.splice(index, 1)
    },
    addNewContactNumber () {
      this.phones.push({ name: '', phone: '' })
    },
    addNewzone () {
      this.remote_locations.push(this.createEmptyRemote())
    },
    deletezone (index) {
      this.remote_locations.splice(index, 1)
    },
    goBack () {
      this.$store.commit('formSteps/setActiveStepForm', 2)
    },
    saveFacilityLocation () {
      this.loadingFacilityLocation = true

      const payload = {
        phones: this.phones,
        reservation_contact: [this.reservation_contact]
      }

      const promise = this.location_type === 'address based'
        ? registrationServices.saveStepLocationBased({ ...this.based, ...payload })
        : registrationServices.saveStepLocationRemote({ location: this.remote_locations, ...payload })

      promise
        .then(res => {
          core.showSnackbar('success', res.data.message)
          this.$store.commit('formSteps/setActiveStepForm', 4)
          localStorage.setItem('formStep', 4)
        })
        .catch(err => {
          if (err?.response?.data?.errors) {
            for (const [key, value] of Object.entries(err.response.data.errors)) {
              // eslint-disable-next-line no-unused-expressions
              this.$refs[key]?.setErrors(value)
            }
          }
        })
        // eslint-disable-next-line no-return-assign
        .finally(() => this.loadingFacilityLocation = false)
    },
    getCityDependOnCountry (id) {
      console.log('getCityDependOnCountry -> ', id)
      this.allGovernorates = []
      this.based.city_id = ''
      this.based.area_id = ''
      settingsService.getCountryCity(id).then(res => {
        this.allGovernorates = res.data.data
      })
    },
    getAreasDependOnCity (id) {
      this.allArea = []
      this.based.area_id = ''
      settingsService.getCityArea(id).then(res => {
        this.allArea = res.data.data
      })
    },
    onChangeRemoteCountry (countryId, location) {
      location.country_id = countryId
      location.city_id = ''
      location.areas = []
      settingsService.getCountryCity(countryId).then(res => {
        location.cityList = res.data.data
      })
    },
    onChangeRemoteCity (cityId, location) {
      location.city_id = cityId
      location.areas = []
      console.log('cityId -> ', cityId)
      settingsService.getCityArea(cityId).then(res => {
        location.areaList = res.data.data
      })
    },
    fillData () {
      if (this.profileInfo) {
        this.reservation_contact = this.profileInfo.reservation_contact[0] || {}
        this.phones = this.profileInfo.phones || []

        if (this.profileInfo.location_type) {
          this.location_type = this.profileInfo.location_type
        } else {
          this.location_type = 'address based'
        }

        if (this.profileInfo.location_type === 'address based') {
          Object.assign(this.based, {
            country_id: this.providerInfo.country_id,
            city_id: this.providerInfo.city_id,
            area_id: this.providerInfo.area_id,
            address: this.providerInfo.address_based.address,
            location: this.providerInfo.address_based.location
          })
          this.getCityDependOnCountry(this.providerInfo.country_id)
          this.getAreasDependOnCity(this.providerInfo.city_id)
        } else {
          this.remote_locations = []
          this.profileInfo.locations.forEach(loc => {
            const remote = this.createEmptyRemote()
            Object.assign(remote, {
              availability_type: loc.availability_type,
              country_id: loc.country_id,
              city_id: loc.city_id,
              areas: loc.areas
            })
            this.remote_locations.push(remote)
          })
        }
      }
    },
    getAllCountries () {
      settingsService.getAllCountries().then(res => {
        this.allCountries = res.data.data
      })
    }
  },
  created () {
    this.getAllCountries()
    this.fillData()
  }
}
</script>
