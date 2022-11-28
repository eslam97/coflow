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
                  :validate="'required|max:50'"
                  name="Accommodation name"
                  :label="'Accommodation Name'"
                  :limit="50"
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
                    :rules="{ required: true, regex: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/ }"
                    class="flex-grow-1"
                >
                  <b-form-group :label="'Price'"
                  ><b-input-group append="EGP">
                    <b-form-input
                        v-model="accommodations.price_egp"
                        placeholder="000.00"
                        :class="[{ 'is-invalid': errors.length > 0 }]"/>
                  </b-input-group>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </b-form-group>
                </validation-provider>
              </b-col>
              <b-col md="4" class="mb-5 pt-4 mt-3 text-center">
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
                    :rules="{ regex: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/, required: selectedEGP }"
                    class="flex-grow-1"
                >
                  <b-form-group :label="'Discounted Price'"
                  ><b-input-group append="EGP">
                    <b-form-input
                        v-model="accommodations.discount_price_egp"
                        placeholder="000.00"
                        :disabled="!selectedEGP"
                        :class="[{ 'is-invalid': errors.length > 0}]"
                    /></b-input-group>
                    <small class="text-danger" v-if="!accommodations.discount_price_egp">{{ errors[0] }}</small>
                    <small class="text-danger" v-if="Number(accommodations.discount_price_egp) > Number(accommodations.price_egp)">
                      More than price
                    </small>
                  </b-form-group>
                </validation-provider>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="4" class="mb-3">
                <main-select labelTitle='Foreigner Price' :options="['None', 'Euro', 'Dollar']"
                             v-model="foreignerPrice"></main-select>
              </b-col>
            </b-row>
            <b-row v-if="foreignerPrice === 'Euro'">
              <b-col md="4" class="mb-3">
                <validation-provider
                    #default="{ errors }"
                    :name="`EURO price`"
                    :rules="{ regex: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/ }"
                    class="flex-grow-1"
                >
                  <b-form-group :label="'Foreigner Price'"
                  ><b-input-group append="EUR">
                    <b-form-input
                        v-model="accommodations.price_euro"
                        placeholder="000.00"
                        :class="[{ 'is-invalid': errors.length > 0 }]"
                    /> </b-input-group>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </b-form-group>
                </validation-provider>
              </b-col>
              <b-col md="4" class="mb-5  pt-4 mt-3 text-center">
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
                    :rules="`${selectedEUR ? 'required': ''}|numeric|between:0,${accommodations.price_euro}`"
                    class="flex-grow-1"
                >
                  <b-form-group :label="'Discounted Price'"
                  ><b-input-group append="EUR">
                    <b-form-input
                        v-model="accommodations.discount_price_euro"
                        placeholder="000.00"
                        :disabled="!selectedEUR"
                        :class="[{ 'is-invalid': errors.length > 0 }]"
                    /> </b-input-group>
                    <small class="text-danger" v-if="!accommodations.discount_price_euro">{{ errors[0] }}</small>
                    <small class="text-danger"
                           v-if="Number(accommodations.discount_price_euro) > Number(accommodations.price_uro)">
                      More than price
                    </small>
                  </b-form-group>
                </validation-provider>
              </b-col>
            </b-row>
            <b-row v-else-if="foreignerPrice === 'Dollar'">
              <b-col md="4" class="mb-3">
                <validation-provider
                    #default="{ errors }"
                    :name="`Dollar price`"
                    :rules="{ regex: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/ }"
                    class="flex-grow-1"
                >
                  <b-form-group :label="'Foreigner Price'"
                  ><b-input-group append="$">
                    <b-form-input
                        v-model="accommodations.price_dollar"
                        placeholder="000.00"
                        :class="[{ 'is-invalid': errors.length > 0 }]"
                    /> </b-input-group>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </b-form-group>
                </validation-provider>
              </b-col>
              <b-col md="4" class="mb-5 pt-4 mt-3 text-center">
                <b-form-checkbox
                    type="checkbox"
                    v-model="selectedDollar"
                    class="custom-checkbox-color-check mb-2 mr-sm-2 mb-sm-0"
                    color="warning"
                >
                  Discounted Price
                </b-form-checkbox>
              </b-col>
              <b-col md="4" class="mb-3">
                <validation-provider
                    #default="{ errors }"
                    :name="`Discounted Dollar price`"
                    :rules="`${selectedDollar ? 'required': ''}|numeric|between:0,${accommodations.price_dollar}`"
                    class="flex-grow-1"
                >
                  <b-form-group :label="'Discounted Price'"
                  ><b-input-group append="$">
                    <b-form-input
                        v-model="accommodations.discount_price_dollar"
                        placeholder="000.00"
                        :disabled="!selectedDollar"
                        :class="[{ 'is-invalid': errors.length > 0}]"
                    /></b-input-group>
                    <small class="text-danger" v-if="!accommodations.discount_price_dollar">{{ errors[0] }}</small>
                    <small class="text-danger"
                           v-if="Number(accommodations.discount_price_dollar) > Number(accommodations.price_dollar)">
                      More than price
                    </small>
                  </b-form-group>
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
        requirements: '',
        conditions: '',
        description: '',
        price_egp: '',
        price_euro: '',
        price_dollar: '',
        discount_price_egp: null,
        discount_price_euro: null,
        discount_price_dollar: null,
        status: 'active',
        images: [],
        amenities: '',
        accommodation_type_id: ''
      },
      foreignerPrice: 'None',
      selectedEGP: false,
      selectedEUR: false,
      selectedDollar: false,
      allAccommodationsTypes: [],
      loadingGallery: 0,
      progressBar: 0,
      removeLoadingUi: false
    }
  },
  components: {},
  methods: {
    addAccommodations () {
      // if foreigner price is empty send 0 to server
      this.accommodations.price_euro = this.accommodations.price_euro ? this.accommodations.price_euro : 0
      this.accommodations.price_dollar = this.accommodations.price_dollar ? this.accommodations.price_dollar : 0
      // if discount isn't checked, discounted field should be emptied
      this.accommodations.discount_price_egp = this.selectedEGP ? this.accommodations.discount_price_egp : ''
      this.accommodations.discount_price_euro = this.selectedEUR ? this.accommodations.discount_price_euro : ''
      this.accommodations.discount_price_dollar = this.selectedDollar ? this.accommodations.discount_price_dollar : ''
      // empty non selected currency
      if (this.foreignerPrice === 'None') {
        this.accommodations.price_euro = 0
        this.accommodations.discount_price_euro = 0
        this.accommodations.price_dollar = 0
        this.accommodations.discount_price_dollar = 0
      } else if (this.foreignerPrice === 'Euro') {
        this.accommodations.price_dollar = 0
        this.accommodations.discount_price_dollar = 0
      } else if (this.foreignerPrice === 'Dollar') {
        this.accommodations.price_euro = 0
        this.accommodations.discount_price_euro = 0
      }
      if (this.typeOfModal === 'add') {
        this.$emit('addAccommodation', { ...this.accommodations, images: this.accommodations.images.map(data => data.id) })
      } else {
        console.log(this.accommodations)
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
      this.accommodations = {
        name: this.accommodationsDetails.name,
        requirements: this.accommodationsDetails.requirements,
        conditions: this.accommodationsDetails.conditions,
        description: this.accommodationsDetails.description,
        price_egp: this.accommodationsDetails.price_egp,
        price_euro: this.accommodationsDetails.price_euro ? this.accommodationsDetails.price_euro : '',
        price_dollar: this.accommodationsDetails.price_dollar ? this.accommodationsDetails.price_dollar : '',
        discount_price_egp: this.accommodationsDetails.discount_price_egp || '',
        discount_price_euro: this.accommodationsDetails.discount_price_euro || '',
        discount_price_dollar: this.accommodationsDetails.discount_price_dollar || '',
        status: this.accommodationsDetails.status,
        images: this.accommodationsDetails.images,
        amenities: this.accommodationsDetails.amenities,
        accommodation_type_id: this.accommodationsDetails.accommodation_type_id
      }
      if (this.accommodations.price_euro) {
        this.foreignerPrice = 'Euro'
      }
      if (this.accommodations.price_dollar) {
        this.foreignerPrice = 'Dollar'
      }
      if (this.accommodationsDetails.discount_price_egp) {
        this.selectedEGP = true
      }
      if (this.accommodationsDetails.discount_price_euro) {
        this.selectedEUR = true
      }
      if (this.accommodationsDetails.discount_price_dollar) {
        this.selectedDollar = true
      }
    }
  }
}

</script>
