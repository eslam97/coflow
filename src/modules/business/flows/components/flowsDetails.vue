<template>
  <div>
    <validationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(addFlows)">
        <b-row>
          <b-col lg="6" class="mb-3">
            <b-row><b-col md="12">
              <input-form
                v-model="flows.name"
                placeholder="Write flow name"
                :validate="'required'"
                name="Flow name"
                :label="'Flow Name'"
              />
            </b-col></b-row>
            <b-row><b-col md="12" class="mb-3">
              <input-form
                v-model="flows.requirements"
                placeholder="Any required experince or equipment for the flow"
                :validate="'required'"
                name="Flow requirements"
                :label="'Requirements'"
              />
            </b-col></b-row>
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
                            v-model="flows.price_egp"
                            placeholder="000.00"
                            :class="[{ 'is-invalid': errors.length > 0 }]"/>
                  </b-input-group
                  ></b-form-group>
                </validation-provider>
              </b-col>
              <b-col md="4" class="mb-5 pt-4">
                <b-form-checkbox
                  type="checkbox"
                  id="checkbox"
                  v-model="selected"
                  label="Discounted Price"
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
                        v-model="flows.discount_price_egp"
                        placeholder="000.00"
                        :disabled="!selected"
                        :validate="selected ? 'required': ''"
                        :class="[{ 'is-invalid': errors.length > 0}]"
                      /> </b-input-group
                  ></b-form-group>
                </validation-provider>
              </b-col>
            </b-row>
            <span class="d-flex"><span class="text-warning cursor-pointer ml-auto p-2" @click="addInstructor">+ Add another</span></span>
            <div v-for="(instructor, counter) in flows.instructors"
                :key="counter">
              <validation-provider
                  #default="{ errors }"
                  :name="`Instructor`"
                  :rules="'required'"
                  class="flex-grow-1"
              >
                <b-form-group inline :label="'Instructor'" :label-for="'Instructor'">
                  <b-form-row>
                    <b-col md="5" class="mb-3">
                      <b-form-input
                        v-model="instructor.first_name"
                        placeholder="First Name"
                        :name="`First name ${counter+1}`"
                        :class="[{ 'is-invalid': errors.length > 0 }]"
                      />
                    </b-col>
                    <b-col md="5" class="mb-3">
                      <b-form-input
                        v-model="instructor.last_name"
                        placeholder="Last Name"
                        :name="`Last name ${counter+1}`"
                        :class="[{ 'is-invalid': errors.length > 0 }]"
                      />
                    </b-col>
                    <b-col><span v-if="counter != 0" class="deleteLabelButton text-danger cursor-pointer" @click="deleteInstructor(counter)">Delete</span></b-col>
                  </b-form-row>
                </b-form-group>
              </validation-provider>
            </div>
          </b-col>
          <b-col lg="6" class="mb-3">
            <b-form-group label="Pick Level">
              <div class="d-flex flex-wrap mb-2 flex-grow-1 justify-content-around">
                <span v-for="(option, counter) in options" :key="counter">
                  <button
                      class="btn radio-btn"
                      :class="`radio-btn-${option.color} ${selectLevel(option.value) ? 'radio-btn-selected-'+option.color : ''}`"
                      @click.prevent="flows.level = option.value"
                  >
                      {{ option.text }}
                  </button>
                </span>
              </div>
            </b-form-group>
            <validation-provider
                #default="{ errors }"
                :name="`Description`"
                :rules="'required'"
                class="flex-grow-1"
            >
              <b-form-group label="Description">
                <b-form-textarea
                    v-model="flows.description"
                    :label="'Description'"
                    placeholder="Write your description about this flow…."
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
                :images="flows.images"
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
import { core } from '@/config/pluginInit'
// import cropper from '@/components/cropper'
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
    flowsDetails: {
      type: Object
    }
  },
  data () {
    return {
      flows: {
        name: '',
        requirements: '',
        conditions: '',
        description: '',
        price_egp: '',
        price_euro: 0,
        price_dollar: 0,
        discount_price_egp: '',
        status: 'active',
        images: [],
        instructors: [{
          first_name: '',
          last_name: ''
        }],
        level: 'all'
      },
      selected: '',
      options: [
        { text: 'ALL LEVELS', value: 'all', color: 'blue' },
        { text: 'BEGINNER', value: 'beginner', color: 'cyan' },
        { text: 'INTERMEDIATE', value: 'intermediate', color: 'orange' },
        { text: 'ADVANCED', value: 'advanced', color: 'red' }
      ],
      loadingGallery: 0,
      progressBar: 0,
      removeLoadingUi: false
    }
  },
  components: {
    // cropper
  },
  methods: {
    addFlows () {
      this.flows.discount_price_egp = this.selected ? this.flows.discount_price_egp : ''
      if (this.typeOfModal === 'add') {
        this.$emit('addFlows', { ...this.flows, images: this.flows.images.map(data => data.id) })
      } else {
        this.$emit('editFlows', { ...this.flows, images: this.flows.images.map(data => data.id), _method: 'put' })
      }
    },
    addInstructor () {
      this.flows.instructors.push({
        first_name: '',
        last_name: ''
      })
    },
    deleteInstructor (counter) {
      this.flows.instructors.splice(counter, 1)
    },
    cropperFile (file) {
      console.log('file', file)
    },
    saveGalleryImage (file) {
      this.removeLoadingUi = false
      this.requestLoading = true
      const formData = new FormData()
      formData.append('image', file.image)
      formData.append('type', 'flow')
      formData.append('status', this.flowsDetails ? 'exist' : 'new')
      formData.append('name', file.imageInfo.name)
      if (this.flowsDetails) {
        formData.append('flow_id', this.flowsDetails.id)
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
        this.flows.images.push(res.data.data)
        this.removeLoadingUi = true
        this.requestLoading = false
      })
    },
    removeGalleryImage (id) {
      mainService.removeImage(id, 'flow').then(res => {
        core.showSnackbar('success', res.data.message)
        const ind = this.flows.images.findIndex(image => image.id === id)
        this.flows.images.splice(ind, 1)
      })
    },
    selectLevel (value) {
      return this.flows.level === value
    }
  },
  watch: {},
  computed: {},
  created () {
    if (this.flowsDetails) {
      if (this.flowsDetails.discount_price_egp) {
        this.selected = true
      }
      this.flows = {
        name: this.flowsDetails.name,
        requirements: this.flowsDetails.requirements,
        conditions: this.flowsDetails.conditions,
        description: this.flowsDetails.description,
        price_egp: this.flowsDetails.price_egp,
        price_euro: this.flowsDetails.price_euro,
        price_dollar: this.flowsDetails.price_dollar,
        discount_price_egp: this.flowsDetails.discount_price_egp,
        status: this.flowsDetails.status,
        images: this.flowsDetails.images,
        instructors: this.flowsDetails.instructors,
        level: this.flowsDetails.level
      }
    }
  }
}
</script>
