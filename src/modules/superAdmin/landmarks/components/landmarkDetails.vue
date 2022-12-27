<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(addLandmark)">
        <b-row>
          <b-col md="6" class="mb-3">
            <input-form
                v-model="landmark.name"
                placeholder="Ex: center"
                :validate="'required'"
                name="name"
                :label="'Landmark Name'"
            />
          </b-col>
          <b-col md="6" class="mb-3">
            <input-form
                v-model="landmark.title"
                placeholder="Ex: title"
                :validate="'required'"
                name="title"
                :label="'Title'"
            />
          </b-col>
          <b-col md="6" class="mb-3">
            <input-form
                v-model="landmark.year"
                placeholder="Ex: 2020"
                :validate="`required`"
                name="year"
                :label="'Year'"
            />
          </b-col>
          <b-col md="6" class="mb-3">
            <input-form
                v-model="landmark.activities"
                placeholder="Ex: text"
                :validate="'required'"
                name="activities"
                :label="'Activities'"
            />
          </b-col>
          <b-col md="6" class="mb-3">
            <input-form
                v-model="landmark.latitude"
                placeholder="Ex: 11.12345"
                :validate="'required'"
                name="latitude"
                :label="'Latitude'"
            />
          </b-col>
          <b-col md="6" class="mb-3">
            <input-form
                v-model="landmark.longitude"
                placeholder="Ex: 11.12345"
                :validate="'required'"
                name="longitude"
                :label="'Longitude'"
            />
          </b-col>
          <b-col md="6" class="mb-3">
            <input-form
                v-model="landmark.location"
                placeholder="Ex: google map link"
                :validate="'required'"
                name="location"
                :label="'Location'"
            />
          </b-col>
          <b-col md="6" class="mb-3">
            <main-select labelTitle='Country'
                         :validate="'required'"
                         :name="'Country'"
                         placeholder="Choose"
                         :options="allCountries"
                         label="name"
                         :reduce="data=> data.id"
                         @change="landmark.area_id = ''; landmark.city_id = ''; getCityDependOnCountry(landmark.country_id)"
                         v-model="landmark.country_id">
            </main-select>
          </b-col>
          <b-col md="6" class="mb-3">
            <main-select labelTitle='Governorate'
                         :validate="'required'"
                         :name="`Governorate`"
                         placeholder="Choose"
                         :options="allGovernorates"
                         label="name"
                         :reduce="data => data.id"
                         @change="landmark.area_id = ''; getAreasDependOnCity(landmark.city_id)"
                         v-model="landmark.city_id">
            </main-select>
          </b-col>
          <b-col md="6" class="mb-3">
            <main-select labelTitle='Area'
                         :validate="'required'"
                         :name="`Area`"
                         placeholder="Choose"
                         :options="allArea"
                         label="name"
                         :reduce="data => data.id"
                         v-model="landmark.area_id">
            </main-select>
          </b-col>
          <b-col md="12" class="mb-3" >
            <main-select labelTitle='Tags' :validate="'required'"
                         :taggable="true"
                         multiple v-model="landmark.tags"
                         :name="`tags`" placeholder="Write Tags"
                         :numberOfSelect=3
            >
            </main-select>
          </b-col>
          <b-col class="mb-3" md="12">
            <b-form-group
                label="Description"
                label-for="Description"
            >
              <ValidationProvider name="Description" ref="Description" rules="required" v-slot="{ errors }">
                <b-form-textarea
                    placeholder="Description..."
                    rows="2"
                    v-model="landmark.description"
                    :class="(errors.length >
                             0 ? ' is-invalid' : '')"
                ></b-form-textarea>
                <div class="invalid-feedback">
                  <span>{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
            </b-form-group>
          </b-col>
          <b-col md="12" class="mb-3">
            <cropper-images
                label="Upload Logo"
                nameOfImage="image.jpg"
                @cropper-save="saveLogoImageLand"
                :progressLoading="loadingLogo"
                :showProgress="false"
                :multi="false"
                :imageUrl="logoImage"
            />
          </b-col>
          <b-col md="12" class="mb-3">
            <cropper-images
                label="Upload Cover"
                nameOfImage="image.jpg"
                @cropper-save="saveCoverImageLand"
                :progressLoading="loadingCover"
                :showProgress="false"
                :multi="false"
                :imageUrl="coverImage"
            />
          </b-col>
          <b-col md="12" class="mb-3">
<!--            <cropper-images
                :allImages="allImages"
                :label="'Upload Images'"
                :progressLoading= "progressLogo"
                :uploadServer="true"
                @cropper-file-selected="cropperFile"
                @cropper-saved="saveLogoImage"
                type='landmark'
            >-->
            <cropper-images
                label="Upload Photos"
                @cropper-save="saveGalleryImage"
                @remove-image="removeGalleryImage"
                :removeLoadingUi="removeLoadingUi"
                :progressLoading="progressLogo"
                :images="landmark.images"
                :multi="true"
            ></cropper-images>
          </b-col>
        </b-row>
        <b-row v-if="typeOfModal != 'view'">
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
import settingsService from '@/modules/superAdmin/settings/services/settings.services'
import mainService from '@/services/main'
import { core } from '@/config/pluginInit'
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
    landmarkDetails: {
      type: Object
    }
  },
  components: {
  },
  data () {
    return {
      landmark: {
        name: '',
        title: '',
        year: '',
        tags: [],
        description: '',
        activities: '',
        location: '',
        longitude: '',
        latitude: '',
        status: 'active',
        country_id: '',
        city_id: '',
        area_id: '',
        images: []
      },
      logoImage: '',
      coverImage: '',
      formDataLogo: new FormData(),
      formDataCover: new FormData(),
      loadingCover: '',
      loadingLogo: '',
      allCountries: [],
      allGovernorates: [],
      allArea: [],
      progressLogo: 0,
      removeLoadingUi: false
    }
  },
  methods: {
    addLandmark () {
      if (this.landmark.images.length > 0) {
        if (this.landmarkDetails) {
          this.$emit('editLandmark', { ...this.landmark, images: this.landmark.images.map(data => data.id), _method: 'put' })
        } else {
          /* for (var key in this.landmark) {
            fd.append(key, this.landmark[key])
          }
          for (var key1 in this.landmark.images) {
            fd.append(`images[${key1}]`, this.landmark.images[key1])
          }
          for (var key2 in this.landmark.tags) {
            fd.append(`tags[${key2}]`, this.landmark.tags[key2])
          } */
          this.$emit('addLandmark', this.formDataLogo, this.formDataCover, this.landmark)
        }
      } else {
        core.showSnackbar('error', 'You Should Upload At Least One Image')
      }
    },
    saveGalleryImage (file) {
      this.removeLoadingUi = false
      this.requestLoading = true
      const formData = new FormData()
      formData.append('image', file.image)
      formData.append('type', 'landmark')
      formData.append('status', this.landmarkDetails ? 'exist' : 'new')
      formData.append('name', file.imageInfo.name)
      if (this.landmarkDetails) {
        formData.append('landmark_id', this.landmarkDetails.id)
      }
      const options = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent
          const percent = Math.floor((loaded * 100) / total)
          this.progressLogo = percent
        }
      }
      mainService.addImage(formData, options).then(res => {
        core.showSnackbar('success', res.data.message)
        this.landmark.images.push(res.data.data.id)
        this.removeLoadingUi = true
        this.requestLoading = false
      })
    },
    cropperFile (file) {
      console.log('file', file)
    },
    saveLogoImageLand (file) {
      // this.logoImage = file.image
      this.formDataLogo.append('type', 'logo')
      this.formDataLogo.append('image', file.image)
    },
    saveCoverImageLand (file) {
      // this.coverImage = file.image
      this.formDataCover.append('type', 'cover')
      this.formDataCover.append('image', file.image)
    },
    removeGalleryImage (id) {
      mainService.removeImage(id, 'landmark').then(res => {
        core.showSnackbar('success', res.data.message)
        const ind = this.landmark.images.findIndex(image => image.id === id)
        this.landmark.images.splice(ind, 1)
      })
    },
    // depend
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
    }
  },
  created () {
    this.getAllCountries()
    if (Object.getOwnPropertyNames(this.landmarkDetails).length >= 1) {
      // const allImagesIds = this.landmarkDetails.images.map(item => item.id)
      this.landmark = {
        name: this.landmarkDetails.name,
        title: this.landmarkDetails.title,
        year: this.landmarkDetails.year,
        tags: this.landmarkDetails.tags,
        description: this.landmarkDetails.description,
        activities: this.landmarkDetails.activities,
        location: this.landmarkDetails.location,
        longitude: this.landmarkDetails.longitude.toString(),
        latitude: this.landmarkDetails.latitude.toString(),
        status: this.landmarkDetails.status,
        country_id: this.landmarkDetails.country_id,
        city_id: this.landmarkDetails.city_id,
        area_id: this.landmarkDetails.area_id,
        images: this.landmarkDetails.images
      }
      this.logoImage = this.landmarkDetails.logo
      this.coverImage = this.landmarkDetails.cover
      this.getCityDependOnCountry(this.landmarkDetails.country_id)
      this.getAreasDependOnCity(this.landmarkDetails.city_id)
    }
  }
}
</script>
