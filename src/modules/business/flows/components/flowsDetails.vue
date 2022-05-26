<template>
  <div>
    <validationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(addFlows)">
        <b-row>
          <b-col md="6" class="mb-3">
            <b-row><b-col md="12">
              <input-form
                v-model="flows.name"
                placeholder="Write flow name"
                :validate="'required'"
                name="name"
                :label="'Flow Name'"
              />
            </b-col></b-row>
            <b-row><b-col md="12" class="mb-3">
              <input-form
                v-model="flows.requirements"
                placeholder="Any required experince or equipment for the flow"
                :validate="'required'"
                name="requirements"
                :label="'Requirements'"
              />
            </b-col></b-row>
            <b-row>
              <b-col md="4" class="mb-3">
                <b-form-group :label="'Price'"
                  ><b-input-group append="EGP">
                    <b-form-input
                      v-model="flows.name"
                      placeholder="000.00"
                      :validate="'required'"
                      name="price_egp"
                    /> </b-input-group
                ></b-form-group>
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
                <b-form-group :label="'Discounted Price'"
                  ><b-input-group append="EGP">
                    <b-form-input
                      v-model="flows.name"
                      placeholder="000.00"
                      :validate="required"
                      :disabled="!selected"
                      name="price_egp"
                    /> </b-input-group
                ></b-form-group>
              </b-col>
            </b-row>
            <span class="float-right text-warning cursor-pointer" @click="addInstructor">+ Add another</span>
            <div v-for="(instructor, counter) in flows.instructors"
                :key="counter">
              <b-form-group inline :label="'Instructor'" :label-for="Instructor">
                <b-form-row>
                  <b-col md="5" class="mb-3">
                    <b-form-input
                      v-model="instructor.firstName"
                      placeholder="First Name"
                      :validate="'required'"
                      name="instructor.firstName"
                    />
                  </b-col>
                  <b-col md="5" class="mb-3">
                    <b-form-input
                      v-model="instructor.lastName"
                      placeholder="Last Name"
                      :validate="'required'"
                      name="instructor.lastName"
                    />
                  </b-col>
                  <b-col><span v-if="counter != 0" class="deleteLabelButton text-danger cursor-pointer" @click="deleteInstructor(counter)">Delete</span></b-col>
                </b-form-row>
              </b-form-group>
            </div>
          </b-col>
          <b-col md="6" class="mb-3">
            <b-form-group label="Pick Level">
              <div v-for="(option, counter) in options" :key="counter">
              <!-- <b-form-radio-group
                v-model="flows.level"
                button-variant="outline-primary"
                :options="options"
                </b-form-radio-group>
              > -->
              <!-- <b-form-radio
                button inline
                class="btn-primary"
                name="level"
                v-modal="flows.level"
                value="option.value"
              >
                {{ option.text }}
              </b-form-radio> -->
              </div>
            </b-form-group>
              <b-form-group label="Description">
                <b-form-textarea
                    v-model="flows.description"
                    :label="'Description'"
                    placeholder="Write your description about this flow…."
                    rows="4"
                ></b-form-textarea>
              </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12" class="mb-5">
            <cropper-images
                label="Upload Photos"
                :prograssLoading="progressLogo"
                @cropper-save="saveGalleryImage"
                @remove-image="removeGalleryImage"
                :progressLoading="loadingGallery"
                :removeLoadingUi="removeLoadingUi"
                :images="images"
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
        requirments: '',
        conditions: '',
        description: '',
        price_egp: '',
        price_euro: '',
        price_dollar: '',
        images: [],
        instructors: [{
          firstName: '',
          lastName: ''
        }],
        level: ''
      },
      selected: '',
      required: '',
      options: [
        { text: 'ALL LEVEVLS', value: 'all', variant: 'outline-primary' },
        { text: 'BEGINNER', value: 'beginner', variant: 'outline-danger' },
        { text: 'INTERMEDIATE', value: 'intermediate', variant: 'outline-primary' },
        { text: 'ADVANCED', value: 'advanced', variant: 'outline-primary' }
      ]
    }
  },
  components: {
    // cropper
  },
  methods: {
    addFlows () {
      if (this.typeOfModal === 'add') {
        this.$emit('addFlows', this.flows)
      } else {
        this.$emit('editFlows', { ...this.flows, _method: 'put' })
      }
    },
    addInstructor () {
      this.flows.instructors.push({
        firstName: '',
        lastName: ''
      })
    },
    deleteInstructor (counter) {
      this.flows.instructors.splice(counter, 1)
    },
    cropperFile (file) {
      console.log('file', file)
    },
    saveGalleryImage (file) {
      const formData = new FormData()
      formData.append('image', file.croppedFile)
      formData.append('type', 'flow')
      formData.append('status', this.flowsDetails ? 'exist' : 'new')
      if (this.flowsDetails) {
        formData.append('flow_id', this.flowsDetails.id)
      }
      // const options = {
      //   onUploadProgress: (progressEvent) => {
      //     const { loaded, total } = progressEvent
      //     const percent = Math.floor((loaded * 100) / total)
      //     this.progressLogo = percent
      //   }
      // }
      mainService.addImage(formData).then(res => {
        core.showSnackbar('success', res.data.message)
        this.flows.images.push(res.data.data.id)
        // this.allImages.push(res.data.data)
      })
    },
    removeGalleryImage () {

    }
  },
  watch: {},
  computed: {},
  created () {
    if (this.flowsDetails) {
      this.flows = {
        name: this.flowsDetails.name
      }
    }
  }
}
</script>
