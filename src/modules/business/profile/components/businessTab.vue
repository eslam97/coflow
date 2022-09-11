<template>
  <div>
    <!--  Photos edit modal  -->
    <main-modal id="modal-image" size="lg">
      <template v-slot:header class="p2">
        <h4 class="font-weight-bold"><span class="text-info">show: </span>image</h4>
      </template>
      <template v-slot:body>
        <img :src="selectedImage" class="w-100" />
      </template>
    </main-modal>
    <main-modal id="photosView" size="lg">
      <template v-slot:header class="p2">
        <h4 class="font-weight-bold"><span class="text-info">Edit: </span>{{ photoToEdit.type }}</h4>
      </template>
      <template v-slot:body>
        <photo-view :photoToEdit="photoToEdit"></photo-view>
      </template>
    </main-modal>
    <main-modal id="addPhoto" size="lg">
      <template v-slot:header class="p2">
        <h4 class="font-weight-bold"><span class="text-info">Add: </span>New Images</h4>
      </template>
      <template v-slot:body>
        <b-row>
          <b-col md="12" class="mb-5">
            <cropper-images
                ratio="2 / 2"
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
      </template>
    </main-modal>
    <spinner-loading v-if=(loading) text="Loading" />
    <div v-else>
      <b-row>
        <b-col md="9">
          <validationObserver v-slot="{ handleSubmit }">
            <b-form @submit.prevent="handleSubmit(saveChangesInfo)">
              <b-card class="mb-5">
                <b-card-header class="mb-4">
                  <p><span class="text-dark font-weight-bold font-size-20 mr-3">Facility Information & Details</span>
                    Use this section to update your business and facility inforamtion</p>
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
                                   :name="`languages`" placeholder="Search" :options="allLanguages"
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
                <b-card-header>
                  <p><span class="text-dark font-weight-bold font-size-20 mr-3">Facility Contacts and Location Details</span>
                    Use this section to update your contact and location information</p>
                </b-card-header>
                <b-card-body>
                  <b-row v-if="location_type === 'address based'">
                    <b-col>
                      <b-row>
                        <b-col md="3"><p>Facility Address</p></b-col>
                        <b-col md="9"><p>Location</p></b-col>
                      </b-row>
                      <b-row class="border mb-3">
                        <b-col md="3" class="p-0">
                          <div class="border-right p-4">
                            <h5 class="font-weight-bold">
                              {{based.address}},<br>
                              {{allAreas.find(area => area.id === based.area_id).name}},
                              {{allGovernorates.find(city => city.id === based.city_id).name}},<br>
                              {{allCountries.find(country => country.id === based.country_id).name}}
                            </h5>
                          </div>
                        </b-col>
                        <b-col md="9" class="p-0">
                          <div class="p-4">
                            <h6>
                              {{ based.location }}
                            </h6>
                          </div>
                        </b-col>
                      </b-row>
                    </b-col>
                  </b-row>
                  <b-row v-else class="mb-4">
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
                  </b-row>
                  <b-row class="mb-4" v-if="location_type === 'address based'">
                    <b-col md="12">
                      <span>Note: To edit Address/Location please contact coflow personnel</span>
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
                  <p><span class="text-dark font-weight-bold font-size-20 mr-3">Facility Operating Days & Hours</span>
                    Use this section to update your operating days and hours</p>
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
                        <span v-if="operationKey === 0" class="text-danger deleteLabelButton cursor-pointer"
                              @click="clearFirstDay(operationKey)">Clear</span>
                        <span v-else class="text-danger deleteLabelButton cursor-pointer"
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
          <b-card :img-src="coverImage" img-top class="p-0 mb-5" align="center"
                  @click.self="openPhotoView('cover')">
            <b-link>
              <b-card-img :style="`background-image: url(${logoImage})`" class="card-profile-img mb-5"></b-card-img>
            </b-link>
            <h5 class="border-top border-bottom p-3 pt-5 mb-3">Facility photos</h5>
            <b-card-body class="m-0">
              <div class="d-flex gap-2 justify-content-start mb-4 cursor-pointer" v-if="images">
                <div v-for="(img, key) in images" class="position-relative" :key="key">
                    <span class="position-absolute deleteImage" v-if="showDeletedImage"
                          @click="removeImage(img.id)"><i class="las la-trash-alt"></i></span>
                    <div :style="`background-image: url(${img.image})`" class="facilityImageInProfile" @click="showImage(img.image)"></div>
                  </div>
              </div>
              <div v-else>
              <span>No images to show</span>
            </div>
            </b-card-body>
            <b-card-text>
              <b-row class="border-top mb-2 pt-4">
                <b-col>
                  <p class="text-warning cursor-pointer text-center" @click="$bvModal.show('addPhoto')">Manage photos</p>
                </b-col>
<!--                <b-col>
                  <span class="text-warning cursor-pointer" @click="$bvModal.show('addPhoto')">Upload photo</span>
                </b-col>
                <b-col>
                  <span class="text-secondry cursor-pointer" @click="showDeletedImage = !showDeletedImage">{{!showDeletedImage?
                      'Remove' : 'Done'}}</span>
                </b-col>-->
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
import mainService from '@/services/main'
import photoView from '@/modules/business/profile/components/photoView'

export default {
  props: {
    oldProfile: {
      type: Object
    }
  },
  components: {
    photoView
  },
  data () {
    return {
      selectedImage: '',
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
      location_type: '',
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
      allCountries: [],
      allGovernorates: [],
      allAreas: [],
      formattedLocation: '',
      photoToEdit: {},
      showDeletedImage: false,
      loadingLogo: 0,
      loadingCover: 0,
      loadingGallery: 0,
      removeLoadingUi: false
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
    showImage (image) {
      this.selectedImage = image
      this.$bvModal.show('modal-image')
    },
    removeImage (imageId) {
      mainService.removeImage(imageId, JSON.parse(localStorage.getItem('userInfo')).service_types.toLowerCase()).then(res => {
        core.showSnackbar('success', res.data.message)
        const ind = this.images.findIndex(image => image.id === imageId)
        this.images.splice(ind, 1)
      })
    },
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
      this.logoImage = ''
      registrationServices.uploadProviderImage(formData, options).then(res => {
        core.showSnackbar('success', res.data.message)
        console.log(res.data)
        this.logoImage = data.imageInfo.src // response
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
        this.coverImage = data.imageInfo.src
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
    getAllCountries () {
      settingsService.getAllCountries().then(res => {
        this.allCountries = res.data.data
        settingsService.getAllCities().then(res => {
          this.allGovernorates = res.data.data.data
          settingsService.getAllAreas().then(res => {
            this.allAreas = res.data.data.data
          })
        })
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
    formatLocation () {
      // if (this.location_type === 'address based') {
      //   return ``
      // } else {
      //   return `${this.remote_locations.forEach(location => {
      //     this.allAreas.filter(area => area.id === this.area)
      //     this.allGovernorates.filter(city => city.id === this.city)
      //     this.allCountries.filter(country => country.id === this.country)
      //   })}`
      // }
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
          this.location_type = 'address based'
          this.based = this.oldProfile.address_based
          this.city = this.oldProfile.city
          this.country = this.oldProfile.country
          this.area = this.oldProfile.area
        } else {
          this.location_type = 'remote location'
          this.remote_locations = []
          this.oldProfile.remote_locations.forEach(location => {
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
        this.loading = false
      }
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
      if (this.location_type === 'address based') {
        location = { phones: this.phones, ...this.based, location_type: this.location_type }
        console.log(location)
      } else {
        location = { phones: this.phones, location: this.remote_locations, location_type: this.location_type }
      }
      const newObj = {
        _method: 'post',
        ...location
      }
      this.$emit('updateFacilityPhones', this.location_type, newObj)
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
        _method: 'post',
        ...operation,
        service_types: this.service_types
      }
      this.$emit('updateFacilityOperatingDays', newObj)
    },
    clearFirstDay (ind) {
      this.allOperation[0].days = []
      this.allOperation[0].from = ''
      this.allOperation[0].to = ''
    },
    // photos handlers
    openPhotoView (type) {
      this.photoToEdit.type = type
      if (type === 'cover') {
        this.photoToEdit.image = this.coverImage
      } else if (type === 'logo') {
        this.photoToEdit.image = this.logoImage
      } else {
        this.photoToEdit.image = this.images
      }
      this.$bvModal.show('photosView')
    }
  },
  mounted () {
  },
  created () {
    this.getAllCountries()
    this.getAllActivityLine()
    this.getAllActivityType()
    this.getAllLanguages()
    this.getAllLinks()
    this.getAllAmenities()
    this.fillData()
  }
}
</script>
<style>
.card.p-0.text-center .card-body{
  padding: 0 !important;
}
.facilityImageInProfile {
  width: 60px;
  height: 60px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  background-color: black;
}
.gap-2{
  gap: 1rem;
}
.deleteImage{
  position: absolute;
  /* width: 20px; */
  /* height: 20px; */
  background: red;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  cursor: pointer;
  right: -8px;
  border-radius: 50%;
  top: -10px;
  padding: 3px;
  font-size: 17px;
}
.card-img-top {
  height: 140px !important;
}
</style>
