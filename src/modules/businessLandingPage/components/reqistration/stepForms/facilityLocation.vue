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
          <b-row class="mb-5">
            <b-col md="12">
              <label class="mb-3">Location</label>
              <div>
                <b-form-radio class="custom-radio-color-checked mr-5" inline v-model="location_type" color="warning"
                              name="color" value="address based" >
                  <span class="text-primary font-size-12">Address Based</span>
                </b-form-radio>
                <b-form-radio class="custom-radio-color-checked" inline v-model="location_type" color="warning"
                              name="color" value="remote location" >
                  <span class="text-primary font-size-12">Remote</span>
                </b-form-radio>
              </div>
              </b-col>
          </b-row>
          <b-row>
            <b-col  md="6" class="mb-1" v-for="(item, key) in phones" :key="key">
              <b-form-group
                  :label="`Contact Number ${key+1}`"
                  :label-for="`Contact Number ${key+1}`"
                  class="position-relative"
              >
              <span class="text-danger deleteLabelButton cursor-pointer" v-if="key != 0"
                    @click="deleteContact(key)">Delete
              </span>
                <b-input-group>
                  <validation-provider
                      #default="{ errors }"
                      :name="`Contact Number ${key + 1}`"
                      :rules="'required'"
                      class="flex-grow-1"
                  >
                    <b-form-input
                        id="mm"
                        v-model="item.number"
                        :class="[{ 'is-invalid': errors.length > 0 }]"
                        :placeholder="'Ex: 020454684'"
                        :disabled="!item.type"
                    />
                  </validation-provider>
                  <template #prepend>
                    <b-dropdown
                        :text="item.type ? item.type : 'Choose'"
                        class="selectWithInput"
                    >
                      <b-dropdown-item v-for="(i, keyType) in contactTypes" :key="keyType" @click="item.type = i">
                        {{i}}
                      </b-dropdown-item>
                    </b-dropdown>
                  </template>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col md="12" class="mb-4">
              <span class="text-warning cursor-pointer" @click="addNewContactNumber">+ Add another Contact Number</span>
            </b-col>
          </b-row>
            <b-row>
                <b-col md="12">
                    <main-select labelTitle='Reservation Link' :validate="'required'"
                                 :name="`reservation_contact`"  placeholder="Choose" :options="getAllReservationLinkWithoutYoutube"
                                 label="selectSocial"
                                 :reduce="data=> data"
                                 v-model="reservation_contact"></main-select>
                </b-col>
            </b-row>
          <div v-if="location_type === 'address based'">
            <b-row>
              <b-col class="mb-3" md="2">
                <main-select labelTitle='Country' :validate="'required'"
                             :name="`country_id`" placeholder="Choose" :options="allCountries"
                             label="name"
                             :reduce="data => data.id"
                             @change="getCityDependOnCountry(based.country_id)"
                             v-model="based.country_id"></main-select>
              </b-col>
              <b-col class="mb-3" md="2">
                <main-select labelTitle='Governorate'
                             :validate="'required'"
                             :name="`Governorate`"
                             placeholder="Choose"
                             :options="allGovernorates"
                             label="name"
                             :reduce="data => data.id"
                             @change="getAreasDependOnCity(based.city_id)"
                             v-model="based.city_id"></main-select>
              </b-col>
              <b-col class="mb-3" md="4">
                <main-select labelTitle='Area' :validate="'required'"
                             :name="`Area`"  placeholder="Choose" :options="allArea"
                             label="name"
                             :reduce="data => data.id"
                             v-model="based.area_id"></main-select>
              </b-col>
              <b-col class="mb-3" md="4">
                <input-form
                    placeholder="Ex: 105 name st."
                    :validate="'required'"
                    :name="`Address`"
                    :label="'Address'"
                    v-model="based.address"
                />
              </b-col>
            </b-row>
            <b-row>
              <b-col class="mb-3" md="12">
                <b-form-group
                    label="Location"
                    label-for="Location"
                >
                  <ValidationProvider name="Location" ref="Location" rules="required" v-slot="{ errors }">
                    <b-form-textarea
                        placeholder="Location..."
                        rows="2"
                        v-model="based.location"
                        :class="(errors.length >
                             0 ? ' is-invalid' : '')"
                    ></b-form-textarea>
                    <div class="invalid-feedback">
                      <span>{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>
                  <p class="mt-2">* Note: If location is not set up on Google Maps, you can drop a proximate pin near
                    the location
                    and click on the coordinates (ex: 29.978411, 30.996448). This will provide you with a shareable link to copy and paste here.</p>
                </b-form-group>
              </b-col>
            </b-row>
          </div>
          <div v-else>
            <b-row class="mb-5">
<!--              <b-col md="12" class="d-flex mb-3">
                <label class="mr-3">Available to:</label>
                <div>
                  <p class="font-weight-bold mb-1" v-for="(country , key) in allCountries" :key="key">
                    <b-form-checkbox class="custom-checkbox-color-check" color="warning">
                      <span class="font-size-12 text-primary">{{ country.name }} - All</span>
                    </b-form-checkbox>
                  </p>
                </div>
              </b-col>-->
              <b-col md="12" class="position-relative mb-3" v-for="(location, locationKey) in remote_locations"
                     :key="locationKey">
                <b-row class="d-flex align-items-center">
                  <b-col class="mb-2" md="3">
                    <main-select labelTitle='Country' :validate="'required'"
                                 :name="`Country ${locationKey + 1}`" placeholder="Choose" :options="allCountries"
                                 label="name" :reduce="data=> data.id"
                                 @change="location.city_id = ''; location.areas = []; getCityDependOnCountryRemote(location)"
                                 v-model="location.country_id"></main-select>
                  </b-col>
                  <b-col md="1">
                    <b-form-checkbox value="all country" v-model="location.availability_type" class="custom-checkbox-color-check"
                                     color="warning">
                      <span class="font-size-12 text-primary"> All </span>
                    </b-form-checkbox>
                  </b-col>
                  <b-col class="mb-2" md="3" v-if="location.availability_type !== 'all country'">
                    <main-select labelTitle='Governorate' :validate="'required'"
                                 :name="`Governorate ${locationKey + 1}`"  placeholder="Choose" :options="location.cityList"
                                 label="name" :reduce="data=> data.id"
                                 @change="location.areas = []; getAreasDependOnCityRemote(location)"
                                 v-model="location.city_id"></main-select>
                  </b-col>
                  <b-col md="1"  v-if="location.availability_type !== 'all country'">
                    <b-form-checkbox value="all city" v-model="location.availability_type" class="custom-checkbox-color-check"
                                     color="warning">
                      <span class="font-size-12 text-primary"> All </span>
                    </b-form-checkbox>
                  </b-col>
                  <b-col class="mb-2" md="4"
                         v-if="location.availability_type !== 'all country' && location.availability_type !== 'all city'">
                    <div>
                    <main-select labelTitle='Area' :validate="'required'"
                                 :name="`Area ${locationKey + 1}`"  placeholder="Choose" :options="location.areaList"
                                 :multiple="true" label="name" :reduce="data => data.id"
                                 v-model="location.areas"></main-select>
                    </div>
                  </b-col>
                </b-row>
                <span class="text-danger deleteLabelButton cursor-pointer" v-if="!locationKey == 0"
                      @click="deletezone(locationKey)">Delete
                  Zone
              </span>
              </b-col>
              <b-col md="12">
                <span class="text-warning cursor-pointer" @click="addNewzone">+ Add new zone</span>
              </b-col>
            </b-row>
          </div>
          <b-row>
            <b-col md="12" class="mt-3 mb-5 d-flex justify-content-between align-items-center">
              <span @click="goBack" class="cursor-pointer text-black d-flex justify-content-between align-items-center">
                 <i class="mr-2 las la-arrow-left font-size-18"></i>
                <span class="text-bold">Back</span>
              </span>
              <span>
                <spinner-loading class="gradient-orange-button" text="Saving" v-if="loadingFacilityLocation"/>
                <b-button class="gradient-orange-button slideNextArrow" type="submit" v-else>
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
    providerInfo: {
      required: false
    }
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
      phones: [
        {
          type: '',
          number: ''
        }
      ],
      remote_locations: [
        {
          availability_type: 'open',
          country_id: '',
          city_id: '',
          areas: [],
          cityList: [],
          areaList: []
        }
      ],
      allCountries: [],
      allGovernorates: [],
      allArea: [],
      // loading Steps
      loadingFacilityLocation: false,
      allLinks: JSON.parse(localStorage.getItem('allLinks')),
      reservation_contact: ''
    }
  },
  watch: {
    'reservation_contact' (val) {
      console.log(val)
    }
  },
  computed: {
    getAllReservationLinkWithoutYoutube () {
      var newLinksArr = [...this.allLinks]
      const ind = newLinksArr.findIndex(data => data.selectSocial === 'Youtube')
      if (ind > -1) {
        newLinksArr.splice(ind, 1)
      }
      return newLinksArr
    }
  },
  methods: {
    getAreasDependOnCity (id) {
      this.allArea = []
      this.based.area_id = ''
      settingsService.getCityArea(id).then(res => {
        this.allArea = res.data.data
      })
    },
    saveFacilityLocation () {
      // eslint-disable-next-line no-prototype-builtins
      if (this.reservation_contact.hasOwnProperty('selectSocial') && this.reservation_contact.selectSocial === 'Contact Number') {
        this.reservation_contact.link = this.phones[0].number
      }
      this.loadingFacilityLocation = true
      if (this.location_type === 'address based') {
        registrationServices.saveStepLocationBased({ ...this.based, phones: this.phones, reservation_contact: [this.reservation_contact] }).then(res => {
          core.showSnackbar('success', res.data.message)
          this.$store.commit('formSteps/setActiveStepForm', 4)
          localStorage.setItem('formStep', 4)
        }).catch((err) => {
          if (err.response.data.errors) {
            for (const [key, value] of Object.entries(err.response.data.errors)) {
              this.$refs[key].setErrors(value)
            }
          }
        }).finally(() => {
          this.loadingFacilityLocation = false
        })
      } else {
        this.remote_locations.forEach(location => {
          location.availability_type = !location.availability_type ? 'open' : location.availability_type
        })
        registrationServices.saveStepLocationRemote({ location: this.remote_locations, phones: this.phones }).then(res => {
          core.showSnackbar('success', res.data.message)
          this.$store.commit('formSteps/setActiveStepForm', 4)
          localStorage.setItem('formStep', 4)
        }).catch((err) => {
          if (err.response.data.errors) {
            for (const [key, value] of Object.entries(err.response.data.errors)) {
              this.$refs[key].setErrors(value)
            }
          }
        }).finally(() => {
          this.loadingFacilityLocation = false
        })
      }
    },
    goBack () {
      this.$store.commit('formSteps/setActiveStepForm', 2)
    },
    deleteContact (key) {
      this.phones.splice(key, 1)
    },
    addNewContactNumber () {
      this.phones.push({
        type: '',
        number: ''
      })
    },
    addNewzone () {
      this.remote_locations.push({
        availability_type: 'open',
        country_id: '',
        city_id: '',
        areas: [],
        cityList: [],
        areaList: []
      })
    },
    deletezone (key) {
      this.remote_locations.splice(key, 1)
    },
    getAllCountries () {
      settingsService.getAllCountries().then(res => {
        this.allCountries = res.data.data
      })
    },
    getCityDependOnCountry (id) {
      this.allGovernorates = []
      this.based.city_id = ''
      this.based.area_id = ''
      settingsService.getCountryCity(id).then(res => {
        this.allGovernorates = res.data.data
      })
    },
    getCityDependOnCountryRemote (location) {
      settingsService.getCountryCity(location.country_id).then(res => {
        location.cityList = res.data.data
      })
    },
    getAreasDependOnCityRemote (location) {
      if (location.city_id) {
        settingsService.getCityArea(location.city_id).then(res => {
          location.areaList = res.data.data
        })
      }
    },
    fillData () {
      if (this.providerInfo) {
        console.log('this.providerInfo.location_type => ', this.providerInfo.location_type)
        if (this.providerInfo.location_type === 'address based') {
          this.location_type = 'address based'
          this.based.city_id = this.providerInfo.city_id
          this.based.country_id = this.providerInfo.country_id
          this.based.area_id = this.providerInfo.area_id
          this.based.address = this.providerInfo.address_based.address
          this.based.location = this.providerInfo.address_based.location
          this.phones = this.providerInfo.phones
          settingsService.getCountryCity(this.providerInfo.country_id).then(res => {
            this.allGovernorates = res.data.data
          })
          settingsService.getCityArea(this.providerInfo.city_id).then(res => {
            this.allArea = res.data.data
          })
        } else {
          this.remote_locations = []
          this.providerInfo.remote_locations.forEach(location => {
            const obj = {
              availability_type: location.availability_type,
              country_id: location.country_id,
              city_id: location.city_id,
              areas: location.areas,
              cityList: [],
              areaList: []
            }
            this.getCityDependOnCountryRemote(obj)
            this.getAreasDependOnCityRemote(obj)
            this.remote_locations.push(obj)
          })
        }
      }
    }
  },
  created () {
    this.getAllCountries()
    this.fillData()
  }
}
</script>
