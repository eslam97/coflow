<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(saveProfile)">
        <div>
          <b-alert show variant="warning" v-if="profileDetails">
            <span class="text-bold">Password : </span> {{profileDetails.password_text}}
          </b-alert>
          <b-row>
            <b-col md="6" class="mb-4">
              <input-form
                  v-model="profile.email"
                  placeholder="Ex: email@coflow.com"
                  :validate="'required|email'"
                  name="email"
                  :label="'Email'"
              />
            </b-col>
            <b-col md="6" class="mb-4">
              <input-form
                  v-model="profile.password"
                  placeholder="**********"
                  :validate="'required'"
                  type="password"
                  name="Password"
                  :label="'Password'"
              />
            </b-col>
          </b-row>
        </div>
        <div >
          <b-row v-for="(info, key) in profile.contact" :key="key">
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
            <b-col md="12" class="mb-4">
                <span class="text-warning cursor-pointer" @click="addNewGeneralAdminInformation">+ Add another
                  Contact</span>
            </b-col>
          </b-row>
        </div>
        <div>
          <b-row>
            <b-col md="2" class="mb-3">
              <main-select labelTitle='Activity Line' :validate="'required'"
                           :name="`activity_line_id`" placeholder="Choose" :options="allActivityLines"
                           label="name"
                           :reduce="data=> data.id"
                           v-model="profile.activity_line_id"></main-select>
            </b-col>
            <b-col class="mb-3" md="2">
              <main-select labelTitle='Activity Type' :validate="'required'"
                           :name="`activity_type_id`"  placeholder="Choose" :options="allActivityTypes"
                           label="name"
                           :reduce="data=> data.id"
                           v-model="profile.activity_type_id"></main-select>
            </b-col>
            <b-col class="mb-3" md="2">
              <input-form
                  placeholder="Ex: 2022"
                  :validate="`required|numeric|between:0,${new Date().getFullYear()}`"
                  :name="`year`"
                  :label="'Launch Year'"
                  v-model="profile.year"
              />
            </b-col>
            <b-col class="mb-3" md="6">
              <input-form
                  placeholder="Ex: Diving"
                  :validate="'required'"
                  :name="`name`"
                  :label="'Facility Name'"
                  v-model="profile.name"
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
                  v-model="profile.title"
              />
            </b-col>
            <b-col class="mb-3" md="6">
              <main-select labelTitle='Team Languages' :validate="'required'"
                           :multiple="true"
                           :name="`languages`" placeholder="Choose" :options="allLanguages"
                           label="name"
                           :reduce="data=> data.name"
                           v-model="profile.languages"></main-select>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="mb-3" md="12">
              <main-select labelTitle='Facility Tags' :validate="'required'"
                           :taggable="true"
                           multiple v-model="profile.tags"
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
                      v-model="profile.bio"
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
              <b-form-checkbox class="custom-checkbox-color-check" color="warning" v-model="profile.amenities"
                               :value="amenity.id">
                <span class="text-primary font-size-12">{{ amenity.name }}</span>
              </b-form-checkbox>
            </b-col>
          </b-row>
          <b-row>
            <b-col  md="6" class="mb-1" v-for="(item, key) in profile.links" :key="key">
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
            <b-col md="12" class="mb-3" v-if="allLinks.length !== profile.links.length">
              <span class="text-warning cursor-pointer" @click="addNewLink">+ Add another Link</span>
            </b-col>
          </b-row>
<!--          <b-row>
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
          </b-row>-->
        </div>
        <div>
          <b-row class="mb-5">
            <b-col md="12">
              <label class="mb-3">Location</label>
              <div>
                <b-form-radio class="custom-radio-color-checked mr-5" inline v-model="profile.location_type"
                              color="warning"
                              name="color" value="address based" >
                  <span class="text-primary font-size-12">Address Based</span>
                </b-form-radio>
                <b-form-radio class="custom-radio-color-checked" inline v-model="profile.location_type" color="warning"
                              name="color" value="remote location" >
                  <span class="text-primary font-size-12">Remote</span>
                </b-form-radio>
              </div>
            </b-col>
          </b-row>
          <div v-if="profile.location_type === 'address based'">
            <b-row>
              <b-col class="mb-3" md="4">
                <main-select labelTitle='Country' :validate="'required'"
                             :name="`country_id`" placeholder="Choose"
                             :options="allCountries"
                             label="name"
                             :reduce="data => data.id"
                             @change="profile.address.city_id = ''; profile.address.area_id = '';
                             getCityDependOnCountry(profile.address.country_id)"
                             v-model="profile.address.country_id"></main-select>
              </b-col>
              <b-col class="mb-3" md="4">
                <main-select labelTitle='Governorate'
                             :validate="'required'"
                             :name="`Governorate`"
                             placeholder="Choose"
                             :options="allGovernorates"
                             label="name"
                             :reduce="data => data.id"
                             @change="profile.address.area_id = ''; getAreasDependOnCity(profile.address.city_id)"
                             v-model="profile.address.city_id"></main-select>
              </b-col>
              <b-col class="mb-3" md="4">
                <main-select labelTitle='Area' :validate="'required'"
                             :name="`Area`"  placeholder="Choose" :options="allArea"
                             label="name"
                             :reduce="data => data.id"
                             v-model="profile.address.area_id"></main-select>
              </b-col>
              <b-col class="mb-3" md="12">
                <input-form
                    placeholder="Ex: 105 name st."
                    :validate="'required'"
                    :name="`Address`"
                    :label="'Address'"
                    v-model="profile.address.address"
                />
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6" class="mb-4">
                <input-form
                    v-model="profile.address.latitude"
                    placeholder="Ex: 11.12345"
                    :validate="'required'"
                    name="latitude"
                    :label="'Latitude'"
                />
              </b-col>
              <b-col md="6" class="mb-4">
                <input-form
                    v-model="profile.address.longitude"
                    placeholder="Ex: 11.12345"
                    :validate="'required'"
                    name="longitude"
                    :label="'Longitude'"
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
                        v-model="profile.address.location"
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
              <b-col md="12" class="position-relative mb-3" v-for="(location, locationKey) in profile.location"
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
                    <b-form-checkbox value="all city" v-model="location.availability_type" class="custom-checkbox-color-check" color="warning">
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
            <b-col  md="6" class="mb-1" v-for="(item, key) in profile.phones" :key="key">
              <b-form-group
                  :label="`Contact Number ${key+1}`"
                  :label-for="`Contact Number ${key+1}`"
                  class="position-relative"
              >
              <span class="text-danger deleteLabelButton cursor-pointer" v-if="key != 0"
                    @click="deleteRemoteContact(key)">Delete
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
          <b-row class="mb-5">
            <b-col md="12">
              <label class="mb-3">Operation</label>
              <div>
                <b-form-radio class="custom-radio-color-checked mr-5" inline v-model="profile.operation_type"
                              color="warning"
                              name="operation_type" value="24 hours" >
                  <span class="text-primary font-size-12">Open 24 Hours</span>
                </b-form-radio>
                <b-form-radio class="custom-radio-color-checked" inline v-model="profile.operation_type"
                              color="warning"
                              name="operation_type" value="specify days" >
                  <span class="text-primary font-size-12">Specify Days(s) and Hours</span>
                </b-form-radio>
              </div>
            </b-col>
          </b-row>
          <b-row v-if="profile.operation_type === 'specify days'">
            <b-col md="12" class="position-relative mb-3" v-for="(operation, operationKey) in profile.operation"
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
                       v-model="profile.service_types"></main-select>
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
// import { core } from '@/config/pluginInit'
/*
import { core } from '@/config/pluginInit'
*/
import settingsService from '@/modules/superAdmin/settings/services/settings.services'
export default {
  props: {
    requestLoading: {
      type: Boolean,
      default: false
    },
    typeOfModal: {
      type: String,
      default: 'add'
    },
    profileDetails: {
      type: Object
    }
  },
  data () {
    return {
      profile: {
        email: '',
        password: '',
        contact: [
          {
            name: '',
            job: '',
            phone: ''
          }
        ],
        activity_line_id: '',
        activity_type_id: '',
        year: '',
        name: '',
        title: '',
        languages: [],
        tags: [],
        links: [
          {
            selectSocial: '',
            link: ''
          }
        ],
        bio: '',
        amenities: [],
        operation_type: '24 hours',
        operation: [
          {
            days: [],
            from: '',
            to: ''
          }
        ],
        service_types: '',
        location_type: 'address based',
        phones: [
          {
            type: '',
            number: ''
          }
        ],
        location: [
          {
            availability_type: 'open',
            country_id: '',
            city_id: '',
            areas: [],
            cityList: [],
            areaList: []
          }
        ],
        address: {
          country_id: '',
          city_id: '',
          area_id: '',
          address: '',
          longitude: '',
          latitude: ''
        }
      },
      contactTypes: ['Landline', 'Mobile'],
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
      var newLinksArr = [...this.allLinks]
      this.profile.links.forEach(e => {
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
      this.profile.contact.push({
        name: '',
        job: '',
        phone: ''
      })
    },
    deleteGeneralAdminInformation (key) {
      this.profile.contact.splice(key, 1)
    },
    addNewLink () {
      this.profile.links.push({
        selectSocial: '',
        link: ''
      })
    },
    deleteLink (key) {
      this.profile.links.splice(key, 1)
    },
    deleteContact (key) {
      this.profile.phones.splice(key, 1)
    },
    addNewContactNumber () {
      this.profile.phones.push({
        type: '',
        number: ''
      })
    },
    addNewzone () {
      this.profile.location.push({
        availability_type: 'open',
        country_id: '',
        city_id: '',
        areas: [],
        cityList: [],
        areaList: []
      })
    },
    deletezone (key) {
      this.profile.location.splice(key, 1)
    },
    addNewOperation () {
      this.profile.operation.push({
        days: [],
        from: '',
        to: ''
      })
    },
    deleteOperationDay (key) {
      this.profile.operation.splice(key, 1)
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
      settingsService.getCityArea(location.city_id).then(res => {
        location.areaList = res.data.data
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
      if (this.profileDetails) {
        this.profile.email = this.profileDetails.email
        this.profile.password = this.profileDetails.password_text
        this.profile.contact = this.profileDetails.contacts
        this.profile.activity_line_id = this.profileDetails.activity_line_id
        this.profile.activity_type_id = this.profileDetails.activity_type_id
        this.profile.year = this.profileDetails.year
        this.profile.name = this.profileDetails.name
        this.profile.title = this.profileDetails.title
        this.profile.languages = this.profileDetails.languages
        this.profile.tags = this.profileDetails.tags
        this.profile.links = this.profileDetails.links
        this.profile.bio = this.profileDetails.bio
        this.profile.service_types = this.profileDetails.service_types
        this.profile.amenities = this.profileDetails.amenities.map(data => data.id)
        this.profile.phones = this.profileDetails.phones
        if (this.profileDetails.operation_type === '24 hours') {
          this.profile.operation_type = '24 hours'
        } else {
          this.profile.operation_type = 'specify days'
          this.profile.operation = this.profileDetails.operations
        }
        this.profile.location_type = this.profileDetails.location_type
        if (this.profile.location_type === 'address based') {
          this.profile.address = this.profileDetails.address_based
          this.getCityDependOnCountry(this.profileDetails.country_id)
          this.getAreasDependOnCity(this.profileDetails.city_id)
        } else {
          this.profile.location = []
          this.profileDetails.remote_locations.forEach(location => {
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
            this.profile.location.push(obj)
          })
        }
      }
    },
    /*    savelogoImage (data) {
      const formData = new FormData()
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
    }, */
    // save change
    saveProfile () {
      if (!this.profile.location.availability_type) {
        this.profile.location.availability_type = 'open'
      }
      if (this.profile.location_type === 'address based' && this.profile.operation_type === '24 hours') {
        this.$emit('addProfile', this.$_.omit(this.profile, ['location', 'operation']))
      } else if (this.profile.location_type === 'address based' && this.profile.operation_type !== '24 hours') {
        this.$emit('addProfile', this.$_.omit(this.profile, ['location']))
      } else if (this.profile.location_type !== 'address based' && this.profile.operation_type === '24 hours') {
        this.$emit('addProfile', this.$_.omit(this.profile, ['address', 'operation']))
      } else if (this.profile.location_type !== 'address based' && this.profile.operation_type !== '24 hours') {
        this.$emit('addProfile', this.$_.omit(this.profile, ['address']))
      }
    }
  },
  mounted () {
  },
  created () {
    this.getAllActivityLine()
    this.getAllActivityType()
    this.getAllLanguages()
    this.getAllLinks()
    this.getAllAmenities()
    this.getAllCountries()
    this.fillData()
  }
}
</script>
