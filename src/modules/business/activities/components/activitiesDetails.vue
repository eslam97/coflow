<template>
  <div>
    <validationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(addActivities)">
        <b-row>
          <b-col lg="6" class="mb-3">
            <b-row>
              <b-col md="6" class="mb-3">
                <input-form
                  v-model="activities.name"
                  placeholder="Write activity name"
                  :validate="'required'"
                  name="Activity name"
                  :label="'Activity Name'"
                />
              </b-col>
              <b-col md="6" class="mb-3">
                <label for="duration-group">Duration</label>
                <b-input-group id="duration-group">
                    <b-form-input
                        :label="'Duration'"
                        v-model="activities.duration"
                        :placeholder="'000'"
                    />
                    <template #append>
                      <b-dropdown
                          :text="type ? type : 'Pick duration type'"
                          class="selectWithInputAppend"
                      >
                        <b-dropdown-item v-for="(i, keyType) in allDurationList"
                                         :key="keyType"
                                         @click="activities.duration_list_id = i.id;
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
                    :rules="'required|numeric'"
                    class="flex-grow-1"
                >
                  <b-form-group :label="'Price'"
                    ><b-input-group append="EGP">
                      <b-form-input
                        v-model="activities.price_egp"
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
                    :rules="'numeric'"
                    class="flex-grow-1"
                >
                  <b-form-group :label="'Discounted Price'"
                    ><b-input-group append="EGP">
                      <b-form-input
                        v-model="activities.discount_price_egp"
                        placeholder="000.00"
                        :validate="selectedEGP ? 'required': ''"
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
                    :rules="'numeric'"
                    class="flex-grow-1"
                >
                  <b-form-group :label="'Foreigner Price'"
                    ><b-input-group append="EUR">
                      <b-form-input
                        v-model="activities.price_euro"
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
                    :rules="'numeric'"
                    class="flex-grow-1"
                >
                  <b-form-group :label="'Discounted Price'"
                  ><b-input-group append="EUR">
                    <b-form-input
                      v-model="activities.discount_price_euro"
                      placeholder="000.00"
                      :validate="selectedEUR ? 'required': ''"
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
                    v-model="activities.conditions"
                    placeholder="Any age, health, or weight requirements to participate"
                    rows="2"
                    :class="[{ 'is-invalid': errors.length > 0 }]"
                ></b-form-textarea>
              </b-form-group>
            </validation-provider>
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
                  v-model="activities.description"
                  :label="'activities'"
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
                :images="activities.images"
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
    activitiesDetails: {
      required: false
    }
  },
  data () {
    return {
      activities: {
        name: '',
        duration: '',
        duration_list_id: '',
        conditions: '',
        description: '',
        price_egp: '',
        price_euro: '',
        price_dollar: '',
        discount_price_egp: '',
        discount_price_euro: '',
        status: 'active',
        images: []
      },
      type: '',
      selectedEGP: '',
      selectedEUR: '',
      allDurationList: [],
      loadingGallery: 0,
      progressBar: 0,
      removeLoadingUi: false
    }
  },
  components: {},
  methods: {
    addActivities () {
      // if foreigner price is empty send 0 to server
      this.activities.price_euro = this.activities.price_euro ? this.activities.price_euro : 0
      // if discount isn't checked, discounted field should be emptied
      this.activities.discount_price_euro = this.selectedEUR ? this.activities.discount_price_euro : ''
      if (this.typeOfModal === 'add') {
        this.$emit('addActivity', { ...this.activities, images: this.activities.images.map(data => data.id) })
      } else {
        this.$emit('editActivity', { ...this.activities, images: this.activities.images.map(data => data.id), _method: 'put' })
      }
    },
    saveGalleryImage (file) {
      this.removeLoadingUi = false
      this.requestLoading = true
      const formData = new FormData()
      formData.append('image', file.image)
      formData.append('type', 'activity')
      formData.append('status', this.activitiesDetails ? 'exist' : 'new')
      formData.append('name', file.imageInfo.name)
      if (this.activitiesDetails) {
        formData.append('activity_id', this.activitiesDetails.id)
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
        this.activities.images.push(res.data.data)
        this.removeLoadingUi = true
        this.requestLoading = false
      })
    },
    removeGalleryImage (id) {
      mainService.removeImage(id, 'activity').then(res => {
        core.showSnackbar('success', res.data.message)
        const ind = this.activities.images.findIndex(image => image.id === id)
        this.activities.images.splice(ind, 1)
      })
    },
    getDurationList () {
      settingsService.getDurationList().then(res => {
        this.allDurationList = res.data.data
      })
    }
  },
  watch: {},
  computed: {},
  created () {
    this.getDurationList()
    if (this.activitiesDetails) {
      if (this.activitiesDetails.discount_price_egp) {
        this.selectedEGP = true
      }
      if (this.activitiesDetails.discount_price_euro) {
        this.selectedEUR = true
      }
      this.activities = {
        name: this.activitiesDetails.name,
        duration: this.activitiesDetails.duration,
        conditions: this.activitiesDetails.conditions,
        description: this.activitiesDetails.description,
        price_egp: this.activitiesDetails.price_egp,
        price_euro: this.activitiesDetails.price_euro ? this.activitiesDetails.price_euro : '',
        price_dollar: this.activitiesDetails.price_dollar ? this.activitiesDetails.price_dollar : '',
        discount_price_egp: this.activitiesDetails.discount_price_egp,
        discount_price_euro: this.activitiesDetails.discount_price_euro,
        status: this.activitiesDetails.status,
        images: this.activitiesDetails.images,
        duration_list_id: this.activitiesDetails.duration_list_id
      }
      console.log(this.activities)
    }
  }
}

</script>
