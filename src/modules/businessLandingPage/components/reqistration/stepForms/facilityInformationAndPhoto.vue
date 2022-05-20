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
        <b-form @submit.prevent="handleSubmit(saveFacilityInformation)">
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
                  :validate="'required|numeric'"
                  :name="`year`"
                  :label="'Launch Year'"
                  v-model="info.year"
              />
            </b-col>
            <b-col class="mb-3" md="6">
              <input-form
                  placeholder="Ex: Diving"
                  :validate="'required'"
                  :name="`name`"
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
          <b-row>
            <b-col md="12" class="mb-5">
              <cropper
                  :label="'Upload Logo'"
                  :progressLoading= "progressLogo"
                  :uploadServer="true"
                  @cropper-file-selected="cropperFile"
                  @cropper-saved="saveLogoImage"
                  @remove-image="removeLogoImage"
              ></cropper>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12" class="mb-5">
              <cropper
                  :label="'Upload Cover'"
                  :progressLoading= "progressCover"
                  :uploadServer="true"
                  @cropper-file-selected="cropperFile"
                  @cropper-saved="saveCoverImage"
                  @remove-image="removeCoverImage"
              ></cropper>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12" class="mb-5">
              <cropper
                  :label="'Upload Facility Photos'"
                  :uploadServer="true"
                  :options="{
                    selectButtonLabel:'Add Photos'
                  }"
              ></cropper>
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
import cropper from '@/components/cropper'
import settingsService from '@/modules/superAdmin/settings/services/settings.services'
export default {
  components: {
    cropper
  },
  data () {
    return {
      test: true,
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
      providerId: JSON.parse(localStorage.getItem('userInfo')).id,
      progressLogo: 0,
      progressCover: 0,
      fileInfo: {},
      allActivityLines: [],
      allActivityTypes: [],
      allLanguages: [],
      allLinks: [],
      allAmenities: [],
      // loading Steps
      loadingFacilityInformation: false
    }
  },
  methods: {
    saveFacilityInformation () {
      this.loadingFacilityInformation = true
      registrationServices.saveStepFacility(this.info).then(res => {
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
    },
    goBack () {
      this.$store.commit('formSteps/setActiveStepForm', 1)
    },
    cropperFile (file) {
      console.log('file', file)
    },
    saveLogoImage (file) {
      const formData = new FormData()
      formData.append('image', file.croppedFile)
      formData.append('type', 'logo')
      formData.append('provider_id', this.providerId)
      const options = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent
          const percent = Math.floor((loaded * 100) / total)
          this.progressLogo = percent
        }
      }
      registrationServices.uploadProviderImage(formData, options).then(res => {
        core.showSnackbar('success', res.data.message)
      })
    },
    saveCoverImage (file) {
      const formData = new FormData()
      formData.append('image', file.croppedFile)
      formData.append('type', 'cover')
      formData.append('provider_id', this.providerId)
      const options = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent
          const percent = Math.floor((loaded * 100) / total)
          this.progressCover = percent
        }
      }
      registrationServices.uploadProviderImage(formData, options).then(res => {
        core.showSnackbar('success', res.data.message)
      })
    },
    removeLogoImage () {
      this.fileInfo = {
      }
    },
    removeCoverImage () {
      this.fileInfo = {
      }
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
    }
  },
  computed: {
    filterLinks () {
      var newLinksArr = [...this.allLinks]
      this.info.links.forEach(e => {
        if (newLinksArr.includes(e.selectSocial)) {
          var socialIndex = newLinksArr.findIndex(social => social === e.selectSocial)
          newLinksArr.splice(socialIndex, 1)
        }
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
    this.getAllActivityType()
    this.getAllLanguages()
    this.getAllLinks()
    this.getAllAmenities()
  }
}
</script>
<style>
@import "~@fortawesome/fontawesome-free/css/all.min.css";
</style>
