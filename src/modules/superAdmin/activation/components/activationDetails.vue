<template>
    <div>
      <div v-if="activationDetails">
        <b-alert show variant="warning" class="d-flex justify-content-around">
          <span><span class="text-bold">Email : </span> {{activationDetails.email}}</span>
          <span><span class="text-bold">Password : </span> {{activationDetails.password_text}}</span>
          <span v-if="activationDetails.accept_reject_date">
            <span class="text-bold">Date : </span> {{activationDetails.accept_reject_date}}</span>
        </b-alert>
      </div>
      <ValidationObserver v-slot="{ handleSubmit }">
        <b-form @submit.prevent="handleSubmit(saveChanges)">
          <div class="mb-5">
            <div class="border-bottom mb-2">
              <h5 class="pb-2">General Admin Information: Contacts</h5>
            </div>
            <b-row v-for="(info, key) in adminInformation" :key="key">
              <b-col md="4" class="mb-3" >
                <input-form
                    v-model="info.name"
                    placeholder="Ex: Eslam Ashraf"
                    :validate="'required'"
                    :name="`Full Name ${key + 1}`"
                    :label="'Full Name'"
                />
              </b-col>
              <b-col md="4" class="mb-3" >
                <input-form
                    v-model="info.job"
                    placeholder="Ex: Owner"
                    :validate="'required'"
                    :name="`Role or Job ${key + 1}`"
                    :label="'Role or Job'"
                />
              </b-col>
              <b-col md="4" class="mb-3 position-relative" >
                <input-form
                    v-model="info.phone"
                    placeholder="Ex: 01095097908"
                    :validate="'required|numeric'"
                    :name="`Phone Number ${key + 1}`"
                    :label="'Phone Number'"
                />
                <span class="text-danger deleteLabelButtonAdmin cursor-pointer" v-if="key != 0"
                      @click="deleteGeneralAdminInformation(key)">Delete Contact
              </span>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="12">
              <span class="text-warning cursor-pointer" @click="addNewGeneralAdminInformation">+ Add another
                Contact</span>
              </b-col>
            </b-row>
          </div>
          <div class="mb-5">
            <div class="border-bottom my-2">
              <h5 class="pb-2">Facility Information & Photos</h5>
            </div>
            <b-row>
              <b-col md="2" class="mb-3">
                <main-select labelTitle='Activity Line' :validate="'required'"
                             :name="`activity_line_id`" placeholder="Choose" :options="allActivityLines"
                             label="name"
                             :reduce="data=> data.id"
                             v-model="info.activity_line_id"></main-select>
              </b-col>
              <b-col class="mb-3" md="2">
                <main-select labelTitle='Activity Type' :validate="'required'"
                             :name="`activity_type_id`"  placeholder="Choose" :options="allActivityTypes"
                             label="name"
                             :reduce="data=> data.id"
                             v-model="info.activity_type_id"></main-select>
              </b-col>
              <b-col class="mb-3" md="2">
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
                          v-model="item.link"
                          :class="[{ 'is-invalid': errors.length > 0 }]"
                          :placeholder="'Ex: https://www.google.com'"
                          :disabled="!item.selectSocial"
                      />
                    </validation-provider>
                    <template #prepend>
                      <b-dropdown
                          :text="item.selectSocial ? item.selectSocial : 'Choose'"
                          class="selectWithInput"
                      >
                        <b-dropdown-item v-for="(i, keyLink) in filterLinks" :key="keyLink"
                                         @click="item.selectSocial = i.name">
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
            <b-row>
              <b-col md="12" class="mb-5">
                <cropper-images
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
              <b-col md="12" class="mb-3">
                <span class="text-warning cursor-pointer" @click="addNewContactNumber">+ Add another Contact Number</span>
              </b-col>
            </b-row>
          </div>
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
                         :options="['Go', 'Flow', 'Pro', 'Shop', 'Camp']"
                         v-model="service_types"></main-select>
          </div>
          <b-row>
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
      service_types: '',
      progressLogo: 0,
      progressCover: 0,
      providerId: '',
      adminInformation: [
        {
          name: '',
          job: '',
          phone: ''
        }
      ],
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
            selectSocial: '',
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
      phones: [
        {
          type: '',
          number: ''
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
      if (this.activationDetails) {
        console.log('this.activationDetails', this.activationDetails)
        this.providerId = this.activationDetails.id
        this.adminInformation = this.activationDetails.contacts
        this.info.activity_line_id = this.activationDetails.activity_line_id
        this.info.activity_type_id = this.activationDetails.activity_type_id
        this.info.year = this.activationDetails.year
        this.info.name = this.activationDetails.name
        this.info.title = this.activationDetails.title
        this.info.languages = this.activationDetails.languages
        this.info.bio = this.activationDetails.bio
        this.info.amenities = this.activationDetails.amenities.map(item => item.id)
        this.info.links = this.activationDetails.links
        this.info.tags = this.activationDetails.tags
        this.service_types = this.activationDetails.service_types
        this.logoImage = this.activationDetails.logo
        this.coverImage = this.activationDetails.cover
        this.images = this.activationDetails.images
        this.phones = this.activationDetails.phones
        if (this.activationDetails.operation_type === '24 hours') {
          this.typeOfOperation = '24 hours'
        } else {
          this.typeOfOperation = 'specify days'
          this.allOperation = this.activationDetails.operations
        }
        if (this.activationDetails.location_type === 'address based') {
          this.location_type = 'address based'
          this.based = this.activationDetails.address_based
          console.log(this.based)
          this.getCityDependOnCountry(this.activationDetails.address_based.country_id)
          this.getAreasDependOnCity(this.activationDetails.address_based.city_id)
        } else {
          this.location_type = 'remote location'
          this.remote_locations = []
          this.activationDetails.remote_locations.forEach(location => {
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
    },
    // save change
    saveChanges () {
      // eslint-disable-next-line
      if ((this.loadingLogo == 100) && (this.loadingCover == 100)) {
        if (this.images.length > 0) {
          let location = {}
          let operation = {}
          if (this.location_type === 'remote location') {
            this.remote_locations.forEach((location) => {
              location.availability_type = location.availability_type ? location.availability_type : 'open'
            })
            location = { location: this.remote_locations }
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
            address: { ...this.based },
            ...operation,
            phones: this.phones,
            location_type: this.location_type,
            service_types: this.service_types
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
    this.getAllActivityType()
    this.getAllLanguages()
    this.getAllLinks()
    this.getAllAmenities()
    this.getAllCountries()
  }
}
</script>
