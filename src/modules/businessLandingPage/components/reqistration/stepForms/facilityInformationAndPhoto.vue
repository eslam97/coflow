<template>
  <div>
    <div class="border-bottom my-5">
      <b-container>
        <h4 class="py-4">Facility Information & Photos</h4>
      </b-container>
    </div>
    <b-container>
      <div class="w-75">
        <ValidationObserver v-slot="{ handleSubmit }">
        <b-form @submit.prevent="handleSubmit(saveFacilityInformation($event))">
          <b-row>
            <b-col md="2" class="mb-3">
              <main-select labelTitle='Activity Line' :validate="'required'"
                           @change="getChangeActivityTypesDependOnActivityLine()"
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
                  :validate="`required|numeric|between:10,${new Date().getFullYear()}`"
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
                        :validate="'required'"
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
            <b-col md="12">
              <main-select labelTitle='Reservation Link' :validate="'required'"
                           :name="`reservation_contact`"  placeholder="Choose" :options="[...info.links, {
                              selectSocial: 'Contact Number',
                              link: 'contact_number'
                            }]"
                           label="selectSocial"
                           :reduce="data=> data"
                           v-model="info.reservation_contact"></main-select>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="10" class="mb-5">
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
            <b-col md="10" class="mb-5">
              <cropper-images
                  :ratio= "1/1.5"
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
            <b-col md="10" class="mb-5">
              <cropper-images
                  label="Upload Facility Photos"
                  @cropper-save="saveGalleryImage"
                  @remove-image="removeGalleryImage"
                  :progressLoading="loadingGallery"
                  :removeLoadingUi="removeLoadingUi"
                  :images="allImages"
              ></cropper-images>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12" class="mt-3 mb-5 d-flex justify-content-between align-items-center">
              <span @click="goBack" class="cursor-pointer text-black d-flex justify-content-between align-items-center">
                 <i class="mr-2 las la-arrow-left font-size-18"></i>
                <span class="text-bold">Back</span>
              </span>
              <span>
                <spinner-loading class="container_button_blue" text="Saving" v-if="loadingFacilityInformation"/>
                <b-button class="container_button_blue slideNextArrow" type="submit" v-else>
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
import registrationServices from '../../../services/registration.services'
import { core } from '@/config/pluginInit'
import settingsService from '@/modules/superAdmin/settings/services/settings.services'
export default {
  props: {
    providerInfo: {
      required: false
    }
  },
  data () {
    return {
      test: true,
      info: {
        reservation_contact: '',
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
      providerId: JSON.parse(localStorage.getItem('userInfo')).id,
      progressCover: 0,
      fileInfo: {},
      allActivityLines: [],
      allActivityTypes: [],
      allLanguages: [],
      allLinks: [],
      allAmenities: [],
      // loading Steps
      loadingFacilityInformation: false,
      loadingLogo: 0,
      loadingCover: 0,
      loadingGallery: 0,
      removeLoadingUi: false,
      logoImage: '',
      coverImage: '',
      logoFlag: false,
      coverFlag: false,
      allImages: []
    }
  },
  methods: {
    getChangeActivityTypesDependOnActivityLine () {
      this.allActivityTypes = []
      this.info.activity_type_id = ''
      settingsService.getActivityTypesDependOnActivityLine(this.info.activity_line_id).then(res => {
        this.allActivityTypes = res.data.data
      })
    },
    saveFacilityInformation (e) {
      console.log(this.allImages)
      if (this.coverFlag && this.logoFlag && this.allImages.length > 0) {
        this.loadingFacilityInformation = true
        registrationServices.saveStepFacility({ ...this.info, reservation_contact: [this.info.reservation_contact] }).then(res => {
          core.showSnackbar('success', res.data.message)
          this.$store.commit('formSteps/setActiveStepForm', 3)
          localStorage.setItem('formStep', 3)
        }).catch((err) => {
          if (err.response.data.errors) {
            for (const [key, value] of Object.entries(err.response.data.errors)) {
              this.$refs[key].setErrors(value)
            }
          }
        }).finally(() => {
          this.loadingFacilityInformation = false
        })
      } else {
        core.showSnackbar('error', 'You should upload logo, cover and at least 1 image')
      }
    },
    goBack () {
      this.$store.commit('formSteps/setActiveStepForm', 1)
    },
    cropperFile (file) {
      console.log('file', file)
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
      registrationServices.uploadProviderImage(formData, options).then(res => {
        core.showSnackbar('success', res.data.message)
        this.logoFlag = true
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
        this.coverFlag = true
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
        this.allImages.push(res.data.data)
        this.removeLoadingUi = true
      })
    },
    removeGalleryImage (id) {
      registrationServices.removeProviderImage(id).then(res => {
        core.showSnackbar('success', res.data.message)
        const ind = this.allImages.findIndex(image => image.id === id)
        this.allImages.splice(ind, 1)
      })
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
    getAllActivityLine () {
      settingsService.getAllActivityLine().then(res => {
        this.allActivityLines = res.data.data
      })
    },
    /*    getAllActivityType () {
      settingsService.getAllActivityType().then(res => {
        this.allActivityTypes = res.data.data
      })
    }, */
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
    getActivityTypesDependOnActivityLine (id) {
      this.allActivityTypes = []
      settingsService.getActivityTypesDependOnActivityLine(id).then(res => {
        this.allActivityTypes = res.data.data
      })
    }
  },
  watch: {

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
  mounted () {
    document.querySelector('.ankaCropper__selectButton').addEventListener('click', function (event) {
      event.preventDefault()
    }, false)
  },
  created () {
    this.getAllActivityLine()
    /*    this.getAllActivityType() */
    this.getAllLanguages()
    this.getAllLinks()
    this.getAllAmenities()
    if (this.providerInfo) {
      settingsService.getActivityTypesDependOnActivityLine(this.providerInfo.activity_line_id).then(res => {
        this.allActivityTypes = res.data.data
      })
      // console.log(this.providerInfo.activity_type_id)
      this.logoImage = this.providerInfo.logo
      this.coverImage = this.providerInfo.cover
      console.log('this.providerInfo.images', this.providerInfo.images)
      this.allImages = this.providerInfo.images
      this.info = {
        activity_line_id: this.providerInfo.activity_line_id,
        activity_type_id: this.providerInfo.activity_type_id,
        year: this.providerInfo.year,
        name: this.providerInfo.name,
        title: this.providerInfo.title,
        languages: this.providerInfo.languages,
        bio: this.providerInfo.bio,
        tags: this.providerInfo.tags,
        amenities: this.providerInfo.amenities.map(ameny => ameny.id),
        links: this.providerInfo.links
      }
      if (this.logoImage) {
        this.loadingLogo = 100
        this.logoFlag = true
      }
      if (this.coverImage) {
        this.loadingCover = 100
        this.coverFlag = true
      }
    }
  }
}
</script>
<style>
@import "~@fortawesome/fontawesome-free/css/all.min.css";
</style>
