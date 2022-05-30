<template>
  <div>
    <validationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(addAccommodations)">
        <b-row>
          <b-col lg="6" class="mb-3">
            <b-row>
              <b-col md="6" class="mb-3">
                <input-form
                  v-model="accommodations.name"
                  placeholder="Write accommodation name"
                  :validate="'required'"
                  name="Accommodation name"
                  :label="'Accommodation Name'"
                />
              </b-col>
              <b-col md="6" class="mb-3">
                <main-select labelTitle='Type' :validate="'required'"
                      :name="`Accommodation type`" placeholder="Choose" :options="allAccommodationsTypes"
                      label="name"
                      :reduce="data => data.id"
                      v-model="accommodations.accommodation_type_id"></main-select>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="4" class="mb-3">
                <validation-provider
                    #default="{ errors }"
                    :name="`EGP price`"
                    :rules="'required|numeric'"
                    class="flex-grow-1"
                >
                  <b-form-group :label="'Price'"
                    ><b-input-group append="EGP">
                      <b-form-input
                        v-model="accommodations.price_egp"
                        placeholder="000.00"
                        :validate="'required'"
                        :class="[{ 'is-invalid': errors.length > 0 }]"
                      /> </b-input-group
                  ></b-form-group>
                </validation-provider>
              </b-col>
              <b-col md="4" class="mb-5 pt-4">
                <b-form-checkbox
                  type="checkbox"
                  v-model="selectedEGP"
                  class="custom-checkbox-color-check mb-2 mr-sm-2 mb-sm-0"
                  color="warning"
                  >
                    Discounted Price
                </b-form-checkbox>
              </b-col>
              <b-col md="4" class="mb-3">
                <validation-provider
                    #default="{ errors }"
                    :name="`Discounted EGP price`"
                    :rules="'required|numeric'"
                    class="flex-grow-1"
                >
                  <b-form-group :label="'Discounted Price'"
                    ><b-input-group append="EGP">
                      <b-form-input
                        v-model="accommodations.discount_price_egp"
                        placeholder="000.00"
                        :validate="'required'"
                        :disabled="!selectedEGP"
                        :class="[{ 'is-invalid': errors.length > 0 && selectedEGP   }]"
                      /> </b-input-group
                  ></b-form-group>
                </validation-provider>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="4" class="mb-3">
                <validation-provider
                    #default="{ errors }"
                    :name="`EURO price`"
                    :rules="'required|numeric'"
                    class="flex-grow-1"
                >
                  <b-form-group :label="'Foreigner Price'"
                    ><b-input-group append="EUR">
                      <b-form-input
                        v-model="accommodations.price_euro"
                        placeholder="000.00"
                        :class="[{ 'is-invalid': errors.length > 0 }]"
                      /> </b-input-group
                  ></b-form-group>
                </validation-provider>
              </b-col>
              <b-col md="4" class="mb-5 pt-4">
                <b-form-checkbox
                  type="checkbox"
                  v-model="selectedEUR"
                  class="custom-checkbox-color-check mb-2 mr-sm-2 mb-sm-0"
                  color="warning"
                  >
                    Discounted Price
                </b-form-checkbox>
              </b-col>
              <b-col md="4" class="mb-3">
                <validation-provider
                    #default="{ errors }"
                    :name="`Discounted EURO price`"
                    :rules="'required|numeric'"
                    class="flex-grow-1"
                >
                  <b-form-group :label="'Discounted Price'"
                  ><b-input-group append="EUR">
                    <b-form-input
                      v-model="accommodations.discount_price_euro"
                      placeholder="000.00"
                      :disabled="!selectedEUR"
                      :class="[{ 'is-invalid': errors.length > 0 && selectedEUR }]"
                    /> </b-input-group
                ></b-form-group>
                </validation-provider>
              </b-col>
            </b-row>
            <validation-provider
                #default="{ errors }"
                :name="`Conditions`"
                :rules="'required'"
                class="flex-grow-1"
            >
              <b-form-group label="Conditions">
                <b-form-textarea
                    v-model="accommodations.conditions"
                    placeholder="Any age, health, or weight requirements to participate"
                    rows="2"
                    :class="[{ 'is-invalid': errors.length > 0 }]"
                ></b-form-textarea>
              </b-form-group>
            </validation-provider>
          </b-col>
          <b-col lg="6" class="mb-3">
            <main-select labelTitle='Amenities' :validate="'required'"
                    :taggable="true"
                    multiple v-model="accommodations.amenities"
                    :name="`Amenities`" placeholder="Add multiple tags"
                    :numberOfSelect=3
            ></main-select>
            <validation-provider
                #default="{ errors }"
                :name="`Description`"
                :rules="'required'"
                class="flex-grow-1"
            >
              <b-form-group label="Description">
              <b-form-textarea
                  v-model="accommodations.description"
                  :label="'accommodations'"
                  placeholder="Write your description about this activity…."
                  rows="4"
                  :class="[{ 'is-invalid': errors.length > 0 }]"
              ></b-form-textarea>
            </b-form-group>
            </validation-provider>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12" class="mb-5">
            <cropper-images
                label="Upload Photos"
                @cropper-save="saveGalleryImage"
                @remove-image="removeGalleryImage"
                :removeLoadingUi="removeLoadingUi"
                :progressLoading="progressBar"
                :images="accommodations.images"
            ></cropper-images>
          </b-col>
        </b-row>
        <b-row v-if="typeOfModal != 'view'">
          <b-col md="12" class="mt-4">
            <div
              class="d-flex justify-content-center"
              v-if="typeOfModal == 'add'"
            >
              <b-button
                class="button-orange-modal"
                type="submit"
                v-if="!requestLoading"
              >
                <i class="las la-plus"></i>
              </b-button>
              <b-button class="button-orange-modal" v-else>
                <spinner-loading></spinner-loading>
              </b-button>
            </div>
            <div
              class="d-flex justify-content-center"
              v-if="typeOfModal == 'edit'"
            >
              <b-button
                class="button-blue-modal"
                type="submit"
                v-if="!requestLoading"
              >
                <i class="las la-pen"></i>
              </b-button>
              <b-button class="button-blue-modal" v-else>
                <spinner-loading></spinner-loading>
              </b-button>
            </div>
          </b-col>
        </b-row>
      </b-form>
    </validationObserver>
  </div>
</template>
<script>
import mainService from '@/services/main'
import settingsService from '@/modules/superAdmin/settings/services/settings.services'
import { core } from '@/config/pluginInit'
export default {
  props: {
    requestLoading: {
      type: Boolean,
      default: false,
      required: false
    },
    typeOfModal: {
      type: String,
      default: 'add',
      required: false
    },
    accommodationsDetails: {
      required: false
    }
  },
  data () {
    return {
      accommodations: {
        name: '',
        requirments: '',
        conditions: '',
        description: '',
        price_egp: '',
        price_euro: 0,
        price_dollar: 0,
        discount_price_egp: '',
        discount_price_euro: '',
        status: 'active',
        images: [],
        amenities: '',
        accommodation_type_id: ''
      },
      selectedEGP: '',
      selectedEUR: '',
      allAccommodationsTypes: [],
      loadingGallery: 0,
      progressBar: 0,
      removeLoadingUi: false
    }
  },
  components: {},
  methods: {
    addAccommodations () {
      if (this.typeOfModal === 'add') {
        this.$emit('addAccommodation', { ...this.accommodations, images: this.accommodations.images.map(data => data.id) })
      } else {
        this.$emit('editAccommodation', { ...this.accommodations, images: this.accommodations.images.map(data => data.id), _method: 'put' })
      }
    },
    saveGalleryImage (file) {
      this.removeLoadingUi = false
      this.requestLoading = true
      const formData = new FormData()
      formData.append('image', file.image)
      formData.append('type', 'accommodation')
      formData.append('status', this.accommodationsDetails ? 'exist' : 'new')
      formData.append('name', file.imageInfo.name)
      if (this.accommodationsDetails) {
        formData.append('accommodation_id', this.accommodationsDetails.id)
      }
      const options = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent
          const percent = Math.floor((loaded * 100) / total)
          console.log(percent)
          this.progressBar = percent
        }
      }
      mainService.addImage(formData, options).then(res => {
        core.showSnackbar('success', res.data.message)
        this.accommodations.images.push(res.data.data)
        this.removeLoadingUi = true
        this.requestLoading = false
      })
    },
    removeGalleryImage (id) {
      mainService.removeImage(id, 'accommodation').then(res => {
        core.showSnackbar('success', res.data.message)
        const ind = this.accommodations.images.findIndex(image => image.id === id)
        this.accommodations.images.splice(ind, 1)
      })
    },
    getAllAccommodationsTypes () {
      settingsService.getAllAccommodationTypes().then(res => {
        this.allAccommodationsTypes = res.data.data
      })
    }
  },
  watch: {},
  computed: {},
  created () {
    this.getAllAccommodationsTypes()
    if (this.accommodationsDetails) {
      if (this.accommodationsDetails.discount_price_egp) {
        this.selectedEGP = true
      }
      if (this.accommodationsDetails.discount_price_euro) {
        this.selectedEUR = true
      }
      this.accommodations = {
        name: this.accommodationsDetails.name,
        requirments: this.accommodationsDetails.requirments,
        conditions: this.accommodationsDetails.conditions,
        description: this.accommodationsDetails.description,
        price_egp: this.accommodationsDetails.price_egp,
        price_euro: this.accommodationsDetails.price_euro,
        price_dollar: this.accommodationsDetails.price_dollar,
        discount_price_egp: this.accommodationsDetails.discount_price_egp,
        discount_price_euro: this.accommodationsDetails.discount_price_euro,
        status: this.accommodationsDetails.status,
        images: this.accommodationsDetails.images,
        amenities: this.accommodationsDetails.amenities,
        accommodation_type_id: this.accommodationsDetails.accommodation_type_id
      }
    }
  }
}

</script>
