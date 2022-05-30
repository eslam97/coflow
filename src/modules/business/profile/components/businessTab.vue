<template>
  <div>
    <spinner-loading v-if=(loading) text="Loading" />
    <div v-else>
      <b-row>
        <b-col md="9">
          <validationObserver v-slot="{ handleSubmit }">
            <b-form @submit.prevent="handleSubmit(saveChangesInfo)">
              <b-card class="mb-5">
                <b-card-header class="mb-4">
                  <h4>Facility Information & Details</h4>
                </b-card-header>
                <b-card-body>
                  <b-row md="12">
                    <b-col md="2" class="mb-3">
                      <main-select labelTitle='Activity Line' :validate="'required'"
                                   :name="`activity_line_id`" placeholder="Choose" :options="allActivityLines"
                                   label="name"
                                   disabled
                                   :reduce="data=> data.id"
                                   v-model="info.activity_line_id"></main-select>
                    </b-col>
                    <b-col class="mb-3" md="2">
                      <main-select labelTitle='Activity Type' :validate="'required'"
                                   :name="`activity_type_id`"  placeholder="Choose" :options="allActivityTypes"
                                   label="name"
                                   disabled
                                   :reduce="data=> data.id"
                                   v-model="info.activity_type_id"></main-select>
                    </b-col>
                    <b-col class="mb-3" md="2">
                      <input-form
                          placeholder="Ex: 2022"
                          :validate="'required|numeric'"
                          :name="`year`"
                          disabled
                          :label="'Launch Year'"
                          v-model="info.year"
                      />
                    </b-col>
                    <b-col class="mb-3" md="6">
                      <input-form
                          placeholder="Ex: Diving"
                          :validate="'required'"
                          :name="`name`"
                          disabled
                          :label="'Facility Name'"
                          v-model="info.name"
                      />
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col class="mb-3" md="6">
                      <input-form
                          placeholder="Ex: The Yoga Studio"
                          :validate="'required'"
                          :name="`title`"
                          :label="'Facility Title'"
                          v-model="info.title"
                      />
                    </b-col>
                    <b-col class="mb-3" md="6">
                      <main-select labelTitle='Team Languages' :validate="'required'"
                                   :multiple="true"
                                   :name="`languages`" placeholder="Choose" :options="allLanguages"
                                   label="name"
                                   :reduce="data=> data.name"
                                   v-model="info.languages"></main-select>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col class="mb-3" md="12">
                      <main-select labelTitle='Facility Tags' :validate="'required'"
                                   :taggable="true"
                                   multiple v-model="info.tags"
                                   :name="`tags`" placeholder="Write Tags"
                                   :numberOfSelect=3
                      >
                      </main-select>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col class="mb-3" md="12">
                      <b-form-group
                          label="Facility Bio"
                          label-for="Facility Bio"
                      >
                        <ValidationProvider name="Facility Bio" ref="Facility Bio" rules="required" v-slot="{ errors }">
                          <b-form-textarea
                              placeholder="Facility Bio..."
                              rows="2"
                              v-model="info.bio"
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
                    <label class="w-100 pl-3 mb-2">Amenities</label>
                    <b-col md="4" lg="2" class="mb-3" v-for="(amenity, key) in allAmenities" :key="key">
                      <b-form-checkbox class="custom-checkbox-color-check" color="warning" v-model="info.amenities"
                                       :value="amenity.id">
                        <span class="text-primary font-size-12">{{ amenity.name }}</span>
                      </b-form-checkbox>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col  md="6" class="mb-1" v-for="(item, key) in info.links" :key="key">
                      <b-form-group
                          :label="'URL Links'"
                          :label-for="'URL Links'"
                          class="position-relative"
                      >
                        <span class="text-danger deleteLabelButton cursor-pointer"
                              @click="deleteLink(key)">Delete
                        </span>
                        <b-input-group>
                          <validation-provider
                              #default="{ errors }"
                              :name="`URL Link ${key + 1}`"
                              :rules="'required'"
                              class="flex-grow-1"
                          >
                            <b-form-input
                                id="mm"
                                v-model="item.link"
                                :class="[{ 'is-invalid': errors.length > 0 }]"
                                :placeholder="'Ex: https://www.google.com'"
                                :disabled="!item.selectSocial"
                            />
                          </validation-provider>
                          <template #prepend>
                            <b-dropdown
                                :text="item.selectSocial.name ? item.selectSocial.name : 'Choose'"
                                class="selectWithInput"
                            >
                              <b-dropdown-item v-for="(i, keyLink) in filterLinks" :key="keyLink"
                                               @click="item.selectSocial.name =i.name; item.selectSocial.id = i.id">
                                {{i.name}}
                              </b-dropdown-item>
                            </b-dropdown>
                          </template>
                        </b-input-group>
                      </b-form-group>
                    </b-col>
                    <b-col md="12" class="mb-3" v-if="allLinks.length !== info.links.length">
                      <span class="text-warning cursor-pointer" @click="addNewLink">+ Add another Link</span>
                    </b-col>
                  </b-row>
                  <button
                      class="btn radio-btn radio-btn-orange save-changes-btn"
                  >
                    Save changes
                  </button>
                </b-card-body>
              </b-card>
            </b-form>
          </validationObserver>
          <validationObserver v-slot="{ handleSubmit }">
            <b-form @submit.prevent="handleSubmit()">
              <b-card class="mb-5">
                <b-card-header class="mb-4">
                  <h4>Facility Contacts and Location Details</h4>
                </b-card-header>
                <b-card-body>
                  <b-row class="mb-4">
                  </b-row>
                  <button
                      class="btn radio-btn radio-btn-orange save-changes-btn"
                  >
                    Save changes
                  </button>
                </b-card-body>
              </b-card>
            </b-form>
          </validationObserver>
          <validationObserver v-slot="{ handleSubmit }">
            <b-form @submit.prevent="handleSubmit()">
              <b-card class="mb-5">
                <b-card-header class="mb-4">
                  <h4>Facility Operating Days & Hours</h4>
                </b-card-header>
                <b-card-body>
                  <b-row class="mb-4">
                  </b-row>
                  <button
                      class="btn radio-btn radio-btn-orange save-changes-btn"
                  >
                    Save changes
                  </button>
                </b-card-body>
              </b-card>
            </b-form>
          </validationObserver>
        </b-col>
        <b-col md="3">
          <b-card-img></b-card-img>
          <b-card-header><h4>Facility photo</h4></b-card-header>
          <b-card-body>
          </b-card-body>
          <b-card-footer></b-card-footer>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import registrationServices from '@/modules/businessLandingPage/services/registration.services'
import { core } from '@/config/pluginInit'
import settingsService from '@/modules/superAdmin/settings/services/settings.services'

export default {
  props: {
    oldProfile: {
      type: Object
    }
  },
  data () {
    return {
      loading: true,
      info: {
        activity_line_id: '',
        activity_type_id: '',
        year: '',
        name: '',
        title: '',
        languages: [],
        bio: '',
        tags: [],
        amenities: [],
        links: [
          {
            selectSocial: { id: '', name: '' },
            link: ''
          }
        ]
      },
      based: {
        country_id: '',
        city_id: '',
        area_id: '',
        address: '',
        latitude: '',
        longitude: '',
        phones: [
          {
            type: '',
            number: ''
          }
        ],
        location: ''
      },
      contactTypes: ['Landline', 'Mobile'],
      remote: {
        location: [
          {
            availability_type: null,
            country_id: null,
            city_id: null,
            areas: []
          }
        ],
        phones: [
          {
            type: '',
            number: ''
          }
        ]
      },
      typeOfLocation: '',
      typeOfOperation: '',
      images: [],
      logoImage: '',
      coverImage: '',
      allDays: [
        {
          key: 'Sat',
          value: 'Saturday'
        }, {
          key: 'Sun',
          value: 'Sunday'
        }, {
          key: 'Mon',
          value: 'Monday'
        }, {
          key: 'Tue',
          value: 'Tuesday'
        }, {
          key: 'Wed',
          value: 'Wednesday'
        }, {
          key: 'Thu',
          value: 'Thursday'
        }, {
          key: 'Fri',
          value: 'Friday'
        }],
      allOperation: [
        {
          days: [],
          from: '',
          to: ''
        }
      ],
      allActivityLines: [],
      allActivityTypes: [],
      allLanguages: [],
      allLinks: [],
      allAmenities: [],
      allCountries: [],
      allGovernorates: [],
      allArea: []
    }
  },
  computed: {
    filterLinks () {
      const newLinksArr = [...this.allLinks]
      this.info.links.forEach(e => {
        if (newLinksArr.includes(e.selectSocial)) {
          const socialIndex = newLinksArr.findIndex(social => social === e.selectSocial)
          newLinksArr.splice(socialIndex, 1)
        }
      })
      return newLinksArr
    }
  },
  methods: {
    addNewGeneralAdminInformation () {
      this.adminInformation.push({
        name: '',
        job: '',
        phone: ''
      })
    },
    deleteGeneralAdminInformation (key) {
      this.adminInformation.splice(key, 1)
    },
    savelogoImage (data) {
      const formData = new FormData()
      console.log(data)
      formData.append('image', data.image)
      formData.append('name', data.imageInfo.name)
      formData.append('type', 'logo')
      formData.append('provider_id', this.providerId)
      const options = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent
          const percent = Math.floor((loaded * 100) / total)
          this.loadingLogo = percent
        }
      }
      registrationServices.uploadProviderImage(formData, options).then(res => {
        core.showSnackbar('success', res.data.message)
        this.logoImage = ''
      })
    },
    saveCoverImage (data) {
      const formData = new FormData()
      console.log(data)
      formData.append('image', data.image)
      formData.append('name', data.imageInfo.name)
      formData.append('type', 'cover')
      formData.append('provider_id', this.providerId)
      const options = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent
          const percent = Math.floor((loaded * 100) / total)
          this.loadingCover = percent
        }
      }
      registrationServices.uploadProviderImage(formData, options).then(res => {
        core.showSnackbar('success', res.data.message)
        this.coverImage = ''
      })
    },
    saveGalleryImage (data) {
      this.removeLoadingUi = false
      const formData = new FormData()
      formData.append('image', data.image)
      formData.append('name', data.imageInfo.name)
      formData.append('type', 'gallery')
      formData.append('provider_id', this.providerId)
      const options = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent
          const percent = Math.floor((loaded * 100) / total)
          this.loadingGallery = percent
        }
      }
      registrationServices.uploadProviderImage(formData, options).then(res => {
        core.showSnackbar('success', res.data.message)
        this.images.push(res.data.data)
        this.removeLoadingUi = true
      })
    },
    removeGalleryImage (id) {
      registrationServices.removeProviderImage(id).then(res => {
        core.showSnackbar('success', res.data.message)
        const ind = this.images.findIndex(image => image.id === id)
        this.images.splice(ind, 1)
      })
    },
    cropperFile (file) {
      console.log('file', file)
    },
    addNewLink () {
      this.info.links.push({
        selectSocial: { id: '', name: '' },
        link: ''
      })
    },
    deleteLink (key) {
      this.info.links.splice(key, 1)
    },
    deleteContact (key) {
      this.based.phones.splice(key, 1)
    },
    deleteRemoteContact (key) {
      this.remote.phones.splice(key, 1)
    },
    addNewContactNumber () {
      this.based.phones.push({
        type: '',
        number: ''
      })
    },
    addNewRemoteContactNumber () {
      this.remote.phones.push({
        type: '',
        number: ''
      })
    },
    addNewzone () {
      this.remote.location.push({
        availability_type: null,
        country_id: null,
        city_id: null,
        areas: []
      })
    },
    deletezone (key) {
      this.remote.location.splice(key, 1)
    },
    addNewOperation () {
      this.allOperation.push({
        days: [],
        from: '',
        to: ''
      })
    },
    deleteOperationDay (key) {
      this.allOperation.splice(key, 1)
    },
    getAllCountries () {
      settingsService.getAllCountries().then(res => {
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
    },
    getAllActivityLine () {
      settingsService.getAllActivityLine().then(res => {
        this.allActivityLines = res.data.data
      })
    },
    getAllActivityType () {
      settingsService.getAllActivityType().then(res => {
        this.allActivityTypes = res.data.data
      })
    },
    getAllLanguages () {
      settingsService.getAllLanguages().then(res => {
        this.allLanguages = res.data.data
      })
    },
    getAllLinks () {
      settingsService.getAllLinks().then(res => {
        this.allLinks = res.data.data
      })
    },
    getAllAmenities () {
      settingsService.getAllAmenities().then(res => {
        this.allAmenities = res.data.data
      })
    },
    fillData () {
      if (this.oldProfile) {
        this.providerId = this.oldProfile.id
        this.adminInformation = this.oldProfile.contacts
        this.info.activity_line_id = this.oldProfile.activity_line_id
        this.info.activity_type_id = this.oldProfile.activity_type_id
        this.info.year = this.oldProfile.year
        this.info.name = this.oldProfile.name
        this.info.title = this.oldProfile.title
        this.info.languages = this.oldProfile.languages
        this.info.bio = this.oldProfile.bio
        this.info.amenities = this.oldProfile.amenities.map(item => item.id)
        this.info.links = this.oldProfile.links
        this.info.tags = this.oldProfile.tags
        this.service_types = this.oldProfile.service_types
        this.logoImage = this.oldProfile.logo
        this.coverImage = this.oldProfile.cover
        this.images = this.oldProfile.images
        if (this.oldProfile.operation_type === '24 hours') {
          this.typeOfOperation = '24 hours'
        } else {
          this.typeOfOperation = 'specify days'
          this.allOperation = this.oldProfile.operations
        }
        if (this.oldProfile.location_type === 'address based') {
          this.typeOfLocation = 'based'
          this.based = this.oldProfile.address_based
          this.getCityDependOnCountry(this.oldProfile.address_based.country_id)
          this.getAreasDependOnCity(this.oldProfile.address_based.city_id)
        } else {
          this.typeOfLocation = 'specify days'
          this.allOperation = this.oldProfile.operations
        }
        this.loading = false
      }
    },
    // save changes
    saveChangesInfo () {
      if (this.info === this.oldProfile.info) {
        console.log('no change')
      } else {
        const newObj = {
          _method: 'post',
          ...this.info
        }
        this.$emit('updateFacilityInfo', newObj)
      }
    },
    saveChangesBased () {
      let location = {}
      let operation = {}
      if (this.typeOfLocation === 'based') {
        location = { phones: this.based.phones, address: this.based, location_type: 'address based' }
      } else {
        location = { ...this.remote, location_type: 'remote location' }
      }
      if (this.typeOfOperation === '24 hours') {
        operation = { operation_type: '24 hours' }
      } else {
        operation = {
          operation_type: 'specify days',
          operation: this.allOperation
        }
      }
      const newObj = {
        _method: 'put',
        contact: this.adminInformation,
        ...this.info,
        ...location,
        ...operation,
        service_types: this.service_types
      }
      this.$emit('activation-provider', newObj)
    }
  },
  mounted () {
    this.fillData()
  },
  created () {
    this.getAllActivityLine()
    this.getAllActivityType()
    this.getAllLanguages()
    this.getAllLinks()
    this.getAllAmenities()
    this.getAllCountries()
  }
}
</script>
