<template>
    <div>
      <div v-if="activationDetails">
        <b-alert show variant="warning" class="d-flex justify-content-around">
          <span><span class="text-bold">Email : </span> {{activationDetails.email}}</span>
          <span><span class="text-bold">Password : </span> {{activationDetails.admin.password_txt}}</span>
          <span><span class="text-bold">Date : </span>
            {{activationDetails.accept_reject_date || activationDetails.activation_date}}</span>
        </b-alert>
      </div>
      <ValidationObserver v-slot="{ handleSubmit }">
        <b-form @submit.prevent="handleSubmit(saveChanges)">
          <!-- main info -->
          <div class="mb-5">
            <div class="border-bottom mb-2">
              <h5 class="pb-2">General Admin Information: Contacts</h5>
            </div>
            <b-row>
              <b-col md="4" class="mb-3" >
                <input-form
                    v-model="adminInformation.name"
                    placeholder="Ex: Eslam Ashraf"
                    :validate="'required'"
                    :name="`Full Name`"
                    :label="'Full Name'"
                />
              </b-col>
              <b-col md="4" class="mb-3" >
                <input-form
                    v-model="adminInformation.title"
                    placeholder="Ex: Owner"
                    :validate="'required'"
                    :name="`Role or Job `"
                    :label="'Role or Job'"
                />
              </b-col>
              <b-col md="4" class="mb-3 position-relative" >
                <input-form
                    v-model="adminInformation.phone"
                    placeholder="Ex: 01095097908"
                    :validate="'required|numeric'"
                    :name="`Phone Number`"
                    :label="'Phone Number'"
                />
              </b-col>
            </b-row>
          </div>

          <!-- Facility Information & Photos -->
          <div class="mb-5">
            <div class="border-bottom my-2">
              <h5 class="pb-2">Facility Information & Photos</h5>
            </div>
            <b-row>
              <b-col md="3" class="mb-3">
                <main-select labelTitle='Activity Line' :validate="'required'"
                             :name="`activity_line_id`" placeholder="Choose" :options="allActivityLines"
                             label="name"
                             :reduce="data=> data.id"
                             v-model="info.activity_line_id"></main-select>
              </b-col>

              <b-col class="mb-3" md="3">
                <input-form
                    placeholder="Ex: 2022"
                    :validate="`required|numeric|digits:4|between:1900,${new Date().getFullYear()}`"
                    :name="`year`"
                    :label="'Launch Year'"
                    v-model="info.year"
                />
              </b-col>

              <b-col class="mb-3" md="6">
                <input-form
                    placeholder="Ex: Diving"
                    :validate="'required|max:20'"
                    :name="`name`"
                    :label="'Facility Name'"
                    v-model="info.name"
                    :limit="20"
                />
              </b-col>
            </b-row>
            <b-row>
              <b-col class="mb-3" md="6">
                <input-form
                    placeholder="Ex: The Yoga Studio"
                    :validate="'required|max:35'"
                    :name="`title`"
                    :label="'Facility Title'"
                    v-model="info.title"
                    :limit="35"
                />
              </b-col>
              <b-col class="mb-3" md="6">
                <main-select labelTitle='Team Languages' :validate="'required'"
                             :multiple="true"
                             :name="`languages`" placeholder="Choose" :options="allLanguages"
                             label="name"
                             :reduce="data=> data.id"
                             v-model="info.languages"></main-select>
              </b-col>
            </b-row>
            <b-row>
              <b-col class="mb-3" md="12">
                <main-select labelTitle='Choose Tags' :validate="'required'"
              :multiple="true"
              :name="`tags`" placeholder="Search" :options="allTags"
              label="name"
              :reduce="data=> data.id"
              v-model="info.tags"></main-select>
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
            <span class="text-danger deleteLabelButton cursor-pointer" v-if="key != 0" @click="deleteLink(key)">Delete
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
                          v-model="item.url"
                          :class="[{ 'is-invalid': errors.length > 0 }]"
                          :placeholder="'Ex: https://www.google.com'"
                          :disabled="!item.name"
                      />
                    </validation-provider>
                    <template #prepend>
                      <b-dropdown
                          :text="item.name ? item.name : 'Choose'"
                          class="selectWithInput"
                      >
                        <b-dropdown-item v-for="(i, keyLink) in filterLinks" :key="keyLink"
                                         @click="item.name = i.name">
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
                <b-col md="12">
                    <main-select labelTitle='Reservation Link' :validate="'required'"
                                 :name="`reservation_contact`"  placeholder="Choose" :options="[...getAllReservationLinkWithoutYoutube]"
                                 label="name"
                                 :reduce="data=> data"
                                 v-model="reservation_contact"></main-select>
                </b-col>
            </b-row>
            <b-row>
              <b-col md="12" class="mb-5">
                <cropper-images
                    :ratio= "1/1"
                    label="Upload Logo"
                    nameOfImage="logo.jpg"
                    @cropper-save="savelogoImage"
                    :progressLoading="loadingLogo"
                    :multi="false"
                    :imageUrl="logoImage"
                />
              </b-col>
            </b-row>
            <b-row>
              <b-col md="12" class="mb-5">
                <cropper-images
                    :ratio= "1/2"
                    label="Upload Cover"
                    nameOfImage="cover.jpg"
                    @cropper-save="saveCoverImage"
                    :progressLoading="loadingCover"
                    :multi="false"
                    :imageUrl="coverImage"
                ></cropper-images>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="12" class="mb-5">
                <cropper-images
                    label="Upload Facility Photos"
                    @cropper-save="saveGalleryImage"
                    @remove-image="removeGalleryImage"
                    :progressLoading="loadingGallery"
                    :removeLoadingUi="removeLoadingUi"
                    :images="images"
                ></cropper-images>
              </b-col>
            </b-row>
          </div>

          <!-- Facility Location -->
          <div class="mb-5">
            <div class="border-bottom mb-2">
              <h5 class="pb-2">Facility Location</h5>
            </div>
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
            <div v-if="location_type === 'address based'">
              <b-row>
                <b-col class="mb-3" md="4">
                  <main-select labelTitle='Country' :validate="'required'"
                               :name="`country_id`" placeholder="Choose" :options="allCountries"
                               label="name"
                               :reduce="data => data.id"
                               @change="based.city_id = ''; based.area_id = ''; getCityDependOnCountry(based.country_id)"
                               v-model="based.country_id"></main-select>
                </b-col>
                <b-col class="mb-3" md="4">
                  <main-select labelTitle='Governorate'
                               :validate="'required'"
                               :name="`Governorate`"
                               placeholder="Choose"
                               :options="allGovernorates"
                               label="name"
                               :reduce="data => data.id"
                               @change="based.area_id = ''; getAreasDependOnCity(based.city_id)"
                               v-model="based.city_id"></main-select>
                </b-col>
                <b-col class="mb-3" md="4">
                  <main-select labelTitle='Area' :validate="'required'"
                               :name="`Area`"  placeholder="Choose" :options="allArea"
                               label="name"
                               :reduce="data => data.id"
                               v-model="based.area_id"></main-select>
                </b-col>
                <b-col class="mb-3" md="12">
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
                <b-col md="6" class="mb-4">
                  <input-form
                      v-model="based.latitude"
                      placeholder="Ex: 11.12345"
                      :validate="'required'"
                      name="latitude"
                      :label="'Latitude'"
                      type="text"
                  />
                </b-col>
                <b-col md="6" class="mb-4">
                  <input-form
                      v-model="based.longitude"
                      placeholder="Ex: 11.12345"
                      :validate="'required'"
                      name="longitude"
                      :label="'Longitude'"
                      type="text"
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
            <div v-else-if="location_type === 'remote location'">
              <b-row class="mb-5">
                <b-col md="12" class="position-relative mb-3" v-for="(location, locationKey) in locations"
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
                                     :multiple="true" label="name" :reduce="data=> data.id"
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
                          v-model="item.phone"
                          :class="[{ 'is-invalid': errors.length > 0 }]"
                          :placeholder="'Ex: 020454684'"
                          :disabled="!item.name"
                      />
                    </validation-provider>
                    <template #prepend>
                      <b-dropdown
                          :text="item.name ? item.name : 'Choose'"
                          class="selectWithInput"
                      >
                        <b-dropdown-item v-for="(i, keyType) in contactTypes" :key="keyType" @click="item.name = i">
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
          </div>

          <!-- facility operation-->
          <div class="mb-5">
            <div class="border-bottom mb-2">
              <h5 class="pb-2">Facility Operation Days and Hours</h5>
            </div>
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
                <span class="text-danger deleteLabelButton cursor-pointer" @click="deleteOperationDay(operationKey)">Delete
            </span>
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
          </div>
          <div>
            <main-select labelTitle='Account Type'
                         :validate="'required'"
                         :name="`account_type`"
                         placeholder="Choose"
                         :options="['GO','FLOW','PRO','SHOP','CAMP']"
                         v-model="facility_type"></main-select>
          </div>
          <b-row v-if="hasPer('activation.activate')">
            <b-col md="12" class="mt-3 d-flex justify-content-center">
              <b-button class="container_button_blue slideNextArrow" type="submit" v-if="loadingActivation = true">
                Activate
              </b-button>
              <b-button class="container_button_blue slideNextArrow"  v-else>
                <spinner-loading text="Saving" />
              </b-button>
            </b-col>
          </b-row>
        </b-form>
      </ValidationObserver>
    </div>
</template>
<script>
import registrationServices from '@/modules/businessLandingPage/services/registration.services'
import { core } from '@/config/pluginInit'
import settingsService from '@/modules/superAdmin/settings/services/settings.services'
export default {
  props: {
    activationDetails: {
      type: Object
    },
    loadingActivation: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      reservation_contact: {},
      allTags: [],
      facility_type: '',
      progressLogo: 0,
      progressCover: 0,
      providerId: '',
      adminInformation: {
        name: '',
        title: '',
        phone: ''
      },
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
            name: '',
            url: ''
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
      locations: [
        {
          availability_type: 'open',
          country_id: '',
          city_id: '',
          areas: [],
          cityList: [],
          areaList: []
        }
      ],
      phones: [
        {
          name: '',
          phone: ''
        }
      ],
      location_type: 'address based',
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
      allArea: [],
      loadingLogo: 0,
      loadingCover: 0,
      loadingGallery: 0,
      removeLoadingUi: false
    }
  },
  computed: {
    filterLinks () {
      var newLinksArr = [...this.allLinks]
      this.info.links.forEach(e => {
        newLinksArr.forEach(arr => {
          if (arr.name === e.selectSocial) {
            var socialIndex = newLinksArr.findIndex(item => item === arr)
            newLinksArr.splice(socialIndex, 1)
          }
        })
      })
      return newLinksArr
    },
    getAllReservationLinkWithoutYoutube () {
      var newLinksArr = [...this.info.links]
      const ind = newLinksArr.findIndex(data => data.name === 'Youtube')
      if (ind > -1) {
        newLinksArr.splice(ind, 1)
      }
      if (this.reservation_contact.name !== 'Contact Number') {
        newLinksArr.push({
          name: 'Contact Number',
          url: 'contact_number'
        })
      }
      return newLinksArr
    }
  },
  methods: {
    getAllTags () {
      this.allTags = []
      settingsService.getAllTags().then(res => {
        this.allTags = res.data.data
      })
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
        this.logoImage = data.imageInfo.src
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
        this.coverImage = data.imageInfo.src
      })
    },
    saveGalleryImage (data) {
      this.removeLoadingUi = false
      const formData = new FormData()
      formData.append('image', data.image)
      formData.append('name', data.imageInfo.name)
      formData.append('type', 'image')
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
        selectSocial: '',
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
        name: '',
        phone: ''
      })
    },
    addNewzone () {
      this.locations.push({
        availability_type: 'open',
        country_id: '',
        city_id: '',
        areas: [],
        cityList: [],
        areaList: []
      })
    },
    deletezone (key) {
      this.locations.splice(key, 1)
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
    getAllActivityLine () {
      settingsService.getAllActivityLine().then(res => {
        this.allActivityLines = res.data.data
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
      if (this.activationDetails) {
        console.log('activationDetails -> ', this.activationDetails)
        this.providerId = this.activationDetails.id
        this.adminInformation = {
          name: this.activationDetails.name,
          title: this.activationDetails.title,
          phone: this.activationDetails.phones[0].phone
        }
        this.info.activity_line_id = this.activationDetails.activity_line_id
        this.info.year = this.activationDetails.year
        this.info.languages = this.activationDetails.languages.map(item => item.id)
        this.info.bio = this.activationDetails.bio
        this.info.tags = this.activationDetails.tags.map(item => item.id)
        this.info.amenities = this.activationDetails.amenities.map(item => item.id)
        this.info.links = this.activationDetails.links
        this.reservation_contact = this.activationDetails.reservation_contact[0]
        this.logoImage = this.activationDetails.logo
        this.coverImage = this.activationDetails.cover
        this.images = this.activationDetails.media_images
        this.phones = this.activationDetails.phones
        if (this.activationDetails.operation_type === '24 hours') {
          this.typeOfOperation = '24 hours'
        } else {
          this.typeOfOperation = 'specify days'
          this.allOperation = this.activationDetails.operations
        }
        if (this.activationDetails.location_type === 'address based') {
          this.location_type = 'address based'
          this.based = {
            country_id: this.activationDetails.address.country_id,
            city_id: this.activationDetails.address.city_id,
            area_id: this.activationDetails.address.area_id,
            address: this.activationDetails.address.address,
            latitude: this.activationDetails.address.latitude,
            longitude: this.activationDetails.address.longitude,
            location: this.activationDetails.address.location
          }
          this.getCityDependOnCountry(this.activationDetails.address.country_id)
          this.getAreasDependOnCity(this.activationDetails.address.city_id)
        } else {
          this.location_type = 'remote location'
          this.locations = []
          this.activationDetails.locations.forEach(location => {
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
            this.locations.push(obj)
          })
        }
      }
    },
    // save change
    saveChanges () {
      // eslint-disable-next-line no-prototype-builtins
      if (this.reservation_contact.hasOwnProperty('selectSocial') && this.reservation_contact.selectSocial === 'Contact Number') {
        this.reservation_contact.link = this.phones
      }
      // eslint-disable-next-line
      if ((this.logoImage || (this.loadingLogo == 100)) && (this.coverImage || (this.loadingCover == 100))) {
        if (this.images.length > 0) {
          let location = {}
          let operation = {}
          let newObj = {}
          if (this.typeOfOperation === '24 hours') {
            operation = { operation_type: '24 hours' }
          } else {
            operation = {
              operation_type: 'specify days',
              operation: this.allOperation
            }
          }

          if (this.location_type === 'remote location') {
            this.locations.forEach((location) => {
              location.availability_type = location.availability_type ? location.availability_type : 'open'
            })
            location = { location: this.locations }
            newObj = {
              _method: 'put',
              contact: this.adminInformation,
              ...this.info,
              ...location,
              ...operation,
              phones: this.phones,
              location_type: this.location_type,
              facility_type: this.facility_type,
              reservation_contact: [this.reservation_contact]
            }
          } else {
            newObj = {
              _method: 'put',
              contact: this.adminInformation,
              ...this.info,
              ...location,
              address: { ...this.based },
              ...operation,
              phones: this.phones,
              location_type: this.location_type,
              facility_type: this.facility_type,
              reservation_contact: [this.reservation_contact]
            }
          }
          this.$emit('activation-provider', newObj)
        } else {
          core.showSnackbar('error', 'You Should Upload At Least One Image')
        }
      } else {
        core.showSnackbar('error', 'You should upload logo and cover images')
      }
    }
  },
  mounted () {
    this.fillData()
  },
  created () {
    this.getAllActivityLine()
    // this.getAllActivityType()
    this.getAllLanguages()
    this.getAllLinks()
    this.getAllAmenities()
    this.getAllCountries()
    this.getAllTags()
  }
}
</script>
