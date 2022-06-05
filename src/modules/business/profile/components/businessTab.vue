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
            <b-form @submit.prevent="handleSubmit(saveChangesPhone)">
              <b-card class="mb-5">
                <b-card-header class="mb-4">
                  <h4>Facility Contacts and Location Details</h4>
                </b-card-header>
                <b-card-body>
                  <b-row v-if="typeOfLocation === 'based'" class="mb-4">
                    <b-col md="3">
                      {{ formattedBasedLocation }}
                    </b-col>
                    <b-col md="9">
                      {{ based.location }}
                    </b-col>
                    <b-col md="12">
                      <span class="text-warning cursor-pointer" @click="requestAddressChange">
                        Request to Edit or change Address</span>
                    </b-col>
                  </b-row>
                  <b-row v-else class="mb-4">
                    <b-col>
                      {{ formattedRemoteLocation }}
                    </b-col>
                  </b-row>
                  <b-row class="mb-4">
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
                              <b-dropdown-item v-for="(i, keyType) in contactTypes" :key="keyType"
                                               @click="item.type = i">
                                {{i}}
                              </b-dropdown-item>
                            </b-dropdown>
                          </template>
                        </b-input-group>
                      </b-form-group>
                    </b-col>
                    <b-col md="12" class="mb-3">
                      <span class="text-warning cursor-pointer" @click="addNewContactNumber">+ Add another Contact Number</span>
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
            <b-form @submit.prevent="handleSubmit(saveChangesOperatingDays)">
              <b-card class="mb-5">
                <b-card-header class="mb-4">
                  <h4>Facility Operating Days & Hours</h4>
                </b-card-header>
                <b-card-body>
                  <b-row class="mb-4">
                    <b-row class="mb-5">
                      <b-col md="12">
                        <label class="mb-3">Operation</label>
                        <div>
                          <b-form-radio class="custom-radio-color-checked mr-5" inline v-model="typeOfOperation" color="warning"
                                        name="typeOfOperation" value="24 hours" >
                            <span class="text-primary font-size-12">Open 24 Hours</span>
                          </b-form-radio>
                          <b-form-radio class="custom-radio-color-checked" inline v-model="typeOfOperation" color="warning"
                                        name="typeOfOperation" value="specify days" >
                            <span class="text-primary font-size-12">Specify Days(s) and Hours</span>
                          </b-form-radio>
                        </div>
                      </b-col>
                    </b-row>
                    <b-row v-if="typeOfOperation !== '24 hours'">
                      <b-col md="12" class="position-relative mb-3" v-for="(operation, operationKey) in allOperation"
                             :key="operationKey">
                        <b-row class="d-flex align-items-center">
                          <b-col class="mb-3" md="4" >
                            <main-select labelTitle='Operation Day (s)' :validate="'required'"
                                         :name="`Operation Day ${operationKey + 1}`"  placeholder="Choose" :options="allDays"
                                         :multiple="true"
                                         label="value"
                                         :reduce="data => data.key"
                                         v-model="operation.days"></main-select>
                          </b-col>
                          <b-col class="mb-3" md="4">
                            <input-form
                                placeholder="00:00 AM"
                                :validate="'required'"
                                :name="`From ${operationKey + 1}`"
                                :label="'From'"
                                v-model="operation.from"
                                type="time"
                            />
                          </b-col>
                          <b-col class="mb-3" md="4">
                            <input-form
                                placeholder="00:00 AM"
                                :validate="'required'"
                                :name="`To ${operationKey + 1}`"
                                :label="'To'"
                                v-model="operation.to"
                                type="time"
                            />
                          </b-col>
                        </b-row>
                        <span class="text-danger deleteLabelButton cursor-pointer"
                              @click="deleteOperationDay(operationKey)">Delete</span>
                      </b-col>
                      <b-col md="12" class="mb-3">
                  <span class="text-warning cursor-pointer" @click="addNewOperation">+ Add another Operation Day
                    (s)</span>
                      </b-col>
                      <b-col md="12">
                        <p class="text-gray">Note: Specify working days & hours only, any day unspecified will automatically be set as
                          “closed”.</p>
                      </b-col>
                    </b-row>
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
          <b-card :img-src="coverImage" img-top align="center">
            <b-card-img :src="logoImage" class="card-profile-img mb-5"></b-card-img>
            <h3 class="border-top border-bottom p-3 mb-3">Facility photos</h3>
            <b-card-body>
              <b-row class="row flex-nowrap mb-4">
                <div v-if="(images)">
                  <b-col md="3" v-for="(img, key) in images" :key="key" >
                    <b-img class="img-fluid" :src="img.image" alt="img.name"></b-img>
                  </b-col>
                </div>
                <div v-else>
                  <span>No images to show</span>
                </div>
              </b-row>
            </b-card-body>
            <b-card-text>
              <b-row class="border-top mb-2 pt-4">
                <b-col>
                  <span class="text-warning cursor-pointer"
                        @click="addNewLink">Upload photo</span>
                </b-col>
                <b-col>
                  <span class="text-secondry cursor-pointer"
                        @click="addNewLink">Remove</span>
                </b-col>
              </b-row>
            </b-card-text>
          </b-card>
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
      loading: '',
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
        ]
      },
      phones: [
        {
          type: '',
          number: ''
        }
      ],
      typeOfLocation: '',
      typeOfOperation: '',
      city: '',
      country: '',
      area: '',
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
      formattedBasedLocation: '',
      formattedRemoteLocation: ''
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
      this.phones.splice(key, 1)
    },
    addNewContactNumber () {
      this.phones.push({
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
    formatBasedLocation () {
      this.formattedBasedLocation = `${this.based.address},
                                      ${this.area},
                                      ${this.city},
                                      ${this.country}`
    },
    formatRemoteLocation () {},
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
        this.logoImage = this.oldProfile.logo ? this.oldProfile.logo : require('@/assets/images/user/default-user-image.png')
        this.coverImage = this.oldProfile.cover ? this.oldProfile.cover : require('@/assets/images/user/default-user-image.png')
        this.images = this.oldProfile.images
        this.phones = this.oldProfile.phones
        if (this.oldProfile.operation_type === '24 hours') {
          this.typeOfOperation = '24 hours'
        } else {
          this.typeOfOperation = 'specify days'
          this.allOperation = this.oldProfile.operations
        }
        if (this.oldProfile.location_type === 'address based') {
          this.typeOfLocation = 'based'
          this.based = this.oldProfile.address_based
          this.city = this.oldProfile.city.name
          this.country = this.oldProfile.country.name
          this.area = this.oldProfile.area.name
          this.formatBasedLocation()
        } else {
          this.typeOfLocation = 'remote'
          this.remote = this.oldProfile.remote
          this.formatRemoteLocation()
        }
        this.loading = false
      }
    },
    checkLoading () {
    },
    // save changes
    saveChangesInfo () {
      const newObj = {
        _method: 'post',
        ...this.info
      }
      this.$emit('updateFacilityInfo', newObj)
    },
    saveChangesPhone () {
      let location = {}
      if (this.typeOfLocation === 'based') {
        location = { phones: this.phones, ...this.based, location_type: 'address based' }
        console.log(location)
      } else {
        location = { phones: this.phones, ...this.remote, location_type: 'remote location' }
      }
      const newObj = {
        _method: 'post',
        ...location
      }
      this.$emit('updateFacilityPhones', this.typeOfLocation, newObj)
    },
    saveChangesOperatingDays () {
      let operation = {}
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
        ...operation,
        service_types: this.service_types
      }
      this.$emit('updateFacilityOperatingDays', newObj)
    },
    requestAddressChange () {}
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
  }
}
</script>
