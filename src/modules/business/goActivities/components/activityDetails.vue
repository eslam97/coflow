<template>
  <div>
    <validationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(addActivity)">
        <b-row>
            <b-col lg="6">
            <b-row>
              <b-col md="6" class="mb-3">
                <input-form
                    v-model="activity.name"
                    placeholder="Activity Name"
                    :validate="'required|max:30'"
                    name="Activity name"
                    :label="'Activity Name'"
                    :limit="30"
                />
              </b-col>
              <b-col md="6" class="mb-3">
                  <label for="duration-group">Duration</label>
                  <b-input-group id="duration-group">
                      <b-form-input
                              :label="'Duration'"
                              v-model="activity.duration"
                              :placeholder="'duration'"
                              :validate="'required'"
                              name="duration"
                      />
                      <template #append>
                          <b-dropdown
                                  :text="type ? type : 'Pick duration type'"
                                  class="selectWithInputAppend"
                          >
                              <b-dropdown-item v-for="(i, keyType) in allDurationList"
                                               :key="keyType"
                                               @click="activity.duration_list_id = i.id;
                                         type = i.name">
                                  {{i.name}}
                              </b-dropdown-item>
                          </b-dropdown>
                      </template>
                  </b-input-group>
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
                        v-model="activity.price_egp"
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
<!--              between: (0, activity.price_egp)-->
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
                        v-model="activity.discount_price_egp"
                        placeholder="000.00"
                        :disabled="!selectedEGP"
                        :class="[{ 'is-invalid': errors.length > 0}]"
                    /></b-input-group>
                    <small class="text-danger" v-if="!activity.discount_price_egp">{{ errors[0] }}</small>
                    <small class="text-danger" v-if="Number(activity.discount_price_egp) > Number(activity.price_egp)">
                      More than price
                    </small>
                  </b-form-group>
                </validation-provider>
              </b-col>
                <b-col md="12" class="mb-3">
                    <validation-provider
                            #default="{ errors }"
                            :name="`Conditions`"
                            :rules="'required'"
                            class="flex-grow-1"
                    >
                        <b-form-group label="Conditions">
                            <b-form-textarea
                                    @focus="activity.conditions = activity.conditions === '' ? '• ' : activity.conditions"
                                    @keyup.enter="activity.conditions += '• '"
                                    v-model="activity.conditions"
                                    placeholder="Write your conditions in bullet points"
                                    rows="2"
                                    :class="[{ 'is-invalid': errors.length > 0 }]"
                            />
                            <div class="d-flex justify-content-between">
                                <small class="text-danger">{{ errors[0] }}</small>
                                <!--                      <small :class="[{ 'text-danger': activity.conditions.length > 88 }]">
                                                        {{ (88 > activity.conditions.length) ? 88 - activity.conditions.length : 0 }} characters</small>-->
                            </div>
                        </b-form-group>
                    </validation-provider>
                </b-col>
            </b-row>
          </b-col>
            <b-col lg="6" class="mb-3">
                <validation-provider
                        #default="{ errors }"
                        :name="`Description`"
                        :rules="'required'"
                        class="flex-grow-1"
                >
                    <b-form-group label="Description">
                        <b-form-textarea
                                v-model="activity.details"
                                placeholder="Write a brief description"
                                rows="4"
                                :class="[{ 'is-invalid': errors.length > 0 }]"
                        ></b-form-textarea>
                    </b-form-group>
                </validation-provider>
            </b-col>
        </b-row>
          <b-row>
              <b-col class="mb-5">
                  <cropper-images
                          label="Upload Photos"
                          @cropper-save="saveGalleryImage"
                          @remove-image="removeGalleryImage"
                          :removeLoadingUi="removeLoadingUi"
                          :progressLoading="progressBar"
                          :images="activity.images"
                          type="activity_image"
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
                <spinner-loading></spinner-loading>
              </b-button>
            </div>
            <div class="d-flex justify-content-center" v-if="typeOfModal == 'edit'">
              <b-button class="button-blue-modal" type="submit" v-if="!requestLoading">
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
import { core } from '@/config/pluginInit'
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
    activityDetails: {
      type: Object
    }
  },
  data () {
    return {
      activity: {
        name: '',
        details: '',
        price_egp: '',
        price_euro: '',
        price_dollar: '',
        discount_price_egp: null,
        discount_price_euro: null,
        discount_price_dollar: null,
        conditions: '',
        images: [],
        status: 'active',
        duration: '',
        duration_list_id: ''
      },
      foreignerPrice: 'None',
      selectedEGP: false,
      selectedEUR: false,
      selectedDollar: false,
      removeLoadingUi: false,
      progressBar: 0,
      type: '',
      allDurationList: []
    }
  },
  methods: {
    saveGalleryImage (file) {
      this.removeLoadingUi = false
      this.requestLoading = true
      const formData = new FormData()
      formData.append('image', file.image)
      formData.append('type', 'activity')
      formData.append('status', this.activityDetails ? 'exist' : 'new')
      formData.append('name', file.imageInfo.name)
      if (this.activityDetails) {
        formData.append('activity_id', this.activityDetails.id)
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
        this.activity.images.push(res.data.data)
        this.removeLoadingUi = true
        this.requestLoading = false
      })
    },
    removeGalleryImage (id) {
      mainService.removeImage(id, 'activity').then(res => {
        core.showSnackbar('success', res.data.message)
        const ind = this.activity.images.findIndex(image => image.id === id)
        this.activity.images.splice(ind, 1)
      })
    },
    addActivity () {
      // if foreigner price is empty send 0 to server
      this.activity.price_euro = this.activity.price_euro ? this.activity.price_euro : 0
      this.activity.price_dollar = this.activity.price_dollar ? this.activity.price_dollar : 0
      // if discount isn't checked, discounted field should be emptied
      this.activity.discount_price_egp = this.selectedEGP ? this.activity.discount_price_egp : ''
      this.activity.discount_price_euro = this.selectedEUR ? this.activity.discount_price_euro : ''
      this.activity.discount_price_dollar = this.selectedDollar ? this.activity.discount_price_dollar : ''
      // empty non selected currency
      if (this.foreignerPrice === 'None') {
        this.activity.price_euro = 0
        this.activity.discount_price_euro = 0
        this.activity.price_dollar = 0
        this.activity.discount_price_dollar = 0
      } else if (this.foreignerPrice === 'Euro') {
        this.activity.price_dollar = 0
        this.activity.discount_price_dollar = 0
      } else if (this.foreignerPrice === 'Dollar') {
        this.activity.price_euro = 0
        this.activity.discount_price_euro = 0
      }
      if (this.typeOfModal === 'add') {
        this.$emit('addActivity', {
          ...this.activity,
          images: this.activity.images.map(data => data.id)
        })
      } else {
        this.$emit('editActivity', { ...this.activity, _method: 'put', images: this.activity.images.map(data => data.id) })
      }
    },
    getDurationList () {
      settingsService.getDurationList().then(res => {
        this.allDurationList = res.data.data
        this.type = this.allDurationList.find((item) => item.id === this.activityDetails.duration_list_id).name
      })
    }
  },
  watch: {},
  computed: {},
  created () {
    this.getDurationList()
    if (this.activityDetails) {
      this.activity = {
        name: this.activityDetails.name,
        details: this.activityDetails.details,
        price_egp: this.activityDetails.price_egp,
        price_euro: this.activityDetails.price_euro ? this.activityDetails.price_euro : '',
        price_dollar: this.activityDetails.price_dollar ? this.activityDetails.price_dollar : '',
        discount_price_egp: this.activityDetails.discount_price_egp || '',
        discount_price_euro: this.activityDetails.discount_price_euro || '',
        discount_price_dollar: this.activityDetails.discount_price_dollar || '',
        conditions: this.activityDetails.conditions,
        status: this.activityDetails.status,
        images: this.activityDetails.images,
        duration_list_id: this.activityDetails.duration_list_id,
        duration: this.activityDetails.duration
      }
      if (this.activity.price_euro) {
        this.foreignerPrice = 'Euro'
      }
      if (this.activity.price_dollar) {
        this.foreignerPrice = 'Dollar'
      }
      if (this.activityDetails.discount_price_egp) {
        this.selectedEGP = true
      }
      if (this.activityDetails.discount_price_euro) {
        this.selectedEUR = true
      }
      if (this.activityDetails.discount_price_dollar) {
        this.selectedDollar = true
      }
    }
  }
}
</script>
