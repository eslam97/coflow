<template>
  <div>
    <div v-if="profileDetails">
      <b-alert show variant="warning" class="d-flex justify-content-around">
        <span><span class="text-bold">Email : </span> {{profileDetails.email}}</span>
        <span><span class="text-bold">Password : </span> {{profileDetails.admin.password_txt}}</span>
        <span><span class="text-bold">Date : </span>
          {{profileDetails.accept_reject_date || profileDetails.activation_date}}</span>
      </b-alert>
    </div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(saveProfile)">
        <!-- main info -->
        <div class="mb-5">
          <div class="border-bottom mb-2">
            <h5 class="pb-2">General Admin Information: Contacts</h5>
          </div>
          <b-row>
            <b-col md="6" class="mb-3" >
              <input-form
                  v-model="contact.name"
                  placeholder="Ex: Eslam Ashraf"
                  :validate="'required'"
                  :name="`Full Name`"
                  :label="'Full Name'"
              />
            </b-col>
            <b-col md="6" class="mb-3" >
              <input-form
                  v-model="contact.title"
                  placeholder="Ex: Owner"
                  :validate="'required'"
                  :name="`Title `"
                  :label="'Title'"
              />
            </b-col>
            <b-col md="6" class="mb-3 position-relative" >
              <input-form
                  v-model="contact.phone"
                  placeholder="Ex: 01095097908"
                  :validate="'required|numeric'"
                  :name="`Phone Number`"
                  :label="'Phone Number'"
              />
            </b-col>
            <b-col md="6" class="mb-3 position-relative" >
              <input-form
                  v-model="contact.email"
                  placeholder="Ex: email@gmail.com"
                  :validate="'required|email'"
                  :name="`Email`"
                  :label="'Email'"
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
                 <b-col md="4" class="mb-3">
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
                <b-col md="4" class="mb-3">
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
                <b-col
                  v-for="(location, i) in locations"
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
                      :rules="'required|numeric'"
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
        <b-row>
          <b-col md="12" class="mt-4">
            <div class="d-flex justify-content-center" v-if="typeOfModal == 'add'">
              <b-button class="button-orange-modal" type="submit" v-if="!requestLoading">
                <i class="las la-plus"></i>
              </b-button>
              <b-button class="button-orange-modal" v-else>
                <spinner-loading ></spinner-loading>
              </b-button>
            </div>
            <div class="d-flex justify-content-center" v-if="typeOfModal == 'edit'">
              <b-button class="button-blue-modal" type="submit" v-if="!requestLoading">
                <i class="las la-pen"></i>
              </b-button>
              <b-button class="button-blue-modal" v-else>
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
import registrationServices from '@/modules/businessLandingPage/services/registration.services'
import { core } from '@/config/pluginInit'
import settingsService from '@/modules/superAdmin/settings/services/settings.services'
export default {
  props: {
    profileDetails: {
    },
    requestLoading: {
      type: Boolean,
      default: false
    },
    typeOfModal: {
      type: String,
      default: 'add'
    }
  },
  data () {
    return {
      reservation_contact: {},
      teams: {
        name: '',
        title: '',
        bio: ''
      },
      allTags: [],
      facility_type: '',
      progressLogo: 0,
      progressCover: 0,
      providerId: '',
      contact: {
        name: '',
        email: '',
        phone: '',
        title: '',
        password: ''
      },
      info: {
        activity_line_id: '',
        year: '',
        name: '',
        title: '',
        email: '',
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
      settingsService.getAllTags(this.info.activity_line_id).then(res => {
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
      formData.append('facility', this.providerId)
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
        debugger
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
      if (this.profileDetails) {
        console.log('profileDetails -> ', this.profileDetails)
        this.providerId = this.profileDetails.id
        this.contact = {
          name: this.profileDetails.admin.name,
          email: this.profileDetails.admin.email,
          phone: this.profileDetails.phones[0].phone,
          title: this.profileDetails.title,
          password: this.profileDetails.password
        }
        this.info.name = this.profileDetails.name
        this.info.email = this.profileDetails.email
        this.info.title = this.profileDetails.title
        this.info.activity_line_id = this.profileDetails.activity_line_id
        this.info.year = this.profileDetails.year
        this.info.languages = this.profileDetails.languages.map(item => item.id)
        this.info.bio = this.profileDetails.bio
        this.info.tags = this.profileDetails.tags.map(item => item.id)
        this.info.amenities = this.profileDetails.amenities.map(item => item.id)
        this.info.links = this.profileDetails.links
        this.reservation_contact = this.profileDetails.reservation_contact[0]
        this.logoImage = this.profileDetails.logo
        this.coverImage = this.profileDetails.cover
        this.images = this.profileDetails.media_images
        this.phones = this.profileDetails.phones
        this.facility_type = this.profileDetails.facility_type
        if (this.profileDetails.operation_type === '24 hours') {
          this.typeOfOperation = '24 hours'
        } else {
          this.typeOfOperation = 'specify days'
          this.allOperation = this.profileDetails.operations
        }
        if (this.profileDetails.location_type === 'address based') {
          this.location_type = 'address based'
          this.based = {
            country_id: this.profileDetails.address.country_id,
            city_id: this.profileDetails.address.city_id,
            area_id: this.profileDetails.address.area_id,
            address: this.profileDetails.address.address,
            latitude: this.profileDetails.address.latitude,
            longitude: this.profileDetails.address.longitude,
            location: this.profileDetails.address.location
          }
          this.getCityDependOnCountry(this.profileDetails.address.country_id)
          this.getAreasDependOnCity(this.profileDetails.address.city_id)
        } else {
          this.location_type = 'remote location'
          this.locations = []
          this.profileDetails.locations.forEach(location => {
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
    saveProfile () {
      const action = this.typeOfModal === 'add' ? 'addProfile' : 'editProfile'
      const profile = {
        ...this.info
      }
      profile.contact = this.contact
      profile.teams = []
      profile.phones = this.phones
      profile.reservation_contact = this.reservation_contact

      if (this.typeOfModal === 'editProfile') {
        profile._method = 'put'
      }

      if (this.location_type === 'address based') {
        profile.address = this.based
        profile.location_type = 'address based'
      } else {
        profile.location = this.locations
        profile.location_type = 'remote location'
      }

      if (this.operation_type !== '24 hours') {
        profile.operation_type = 'specify days'
        profile.operation = this.allOperation
      } else {
        profile.operation_type = '24 hours'
      }

      this.$emit(action, this.profileDetails.id, profile)
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
      settingsService.getCityArea(cityId).then(res => {
        location.areaList = res.data.data
      })
    }
  },

  watch: {
    'info.activity_line_id' (val) {
      this.info.tags = []
      this.getAllTags()
    },
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
    // this.getAllTags()
  }
}
</script>
