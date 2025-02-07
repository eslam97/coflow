<template>
  <div>
    <validationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(addFlows)">
        <b-row>
          <b-col lg="6" class="mb-3">
            <b-row>
              <b-col md="12">
              <input-form
                v-model="flows.name"
                placeholder="Write flow name"
                :validate="'required|max:50'"
                name="Flow name"
                :label="'Flow Name'"
                :limit="50"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col md="6" class="mb-3">
              <main-select
                labelTitle='Tag'
                :validate="'required'"
                :name="`Tag`"
                placeholder="Select Tag"
                class=""
                label="name"
                :options="allTags"
                :reduce="(item) => item.id"
                v-model="flows.tag_id">
              </main-select>
            </b-col>
            <b-col md="6" class="mb-3">
              <main-select
                labelTitle='Folder'
                :validate="'required'"
                :name="`Folder`"
                placeholder="Select Folder"
                class=""
                label="name"
                v-model="flows.facility_folder_id"
                :reduce="(item) => item.id"
                :options="allFolders"
                >
              </main-select>
            </b-col>
          </b-row>
          </b-col>
          <b-col lg="6" class="mb-3">
            <Level @selectLevel="(event) => flows.level_id = event" :level="flows.level_id"/>

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
                    rows="2"
                    :class="[{ 'is-invalid': errors.length > 0 }]"
                ></b-form-textarea>
              </b-form-group>
            </validation-provider>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="12">
            <instructor @instructors="data => flows.instructors = data" :allInstructors="flows.instructors"/>
          </b-col>
        </b-row>

        <b-row class="mt-4">
          <b-col md="6">
            <validation-provider
            #default="{ errors }"
            :name="`Requirements`"
            :rules="'required'"
            class="flex-grow-1"
        >
          <b-form-group label="Requirements">
            <b-form-textarea
                v-model="flows.requirements"
                placeholder="Any required experience or equipment for the course"
                rows="1"
                :class="[{ 'is-invalid': errors.length > 0 }]"
            ></b-form-textarea>
          </b-form-group>
        </validation-provider>
          </b-col>
          <b-col md="6">
            <validation-provider
            #default="{ errors }"
            :name="`Conditions`"
            :rules="'required'"
            class="flex-grow-1"
        >
          <b-form-group label="Conditions">
            <b-form-textarea
                v-model="flows.conditions"
                placeholder="Any age, health, or weight requirements to participate"
                rows="1"
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
                type="flow_image"
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
import Instructor from '@/components/instructor'
import mainService from '@/services/main'
import { core } from '@/config/pluginInit'
import Level from '@/components/level'
import { tagMixin } from '@/mixins/tags'
import { folderMixin } from '@/mixins/folders'
export default {
  mixins: [tagMixin, folderMixin],
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
        type: 'flow',
        name: '',
        requirements: '',
        conditions: '',
        description: '',
        status: 'active',
        images: [],
        level_id: '',
        facility_folder_id: '',
        tag_id: '',
        instructors: [{
          first_name: '',
          last_name: ''
        }]
      },
      loadingGallery: 0,
      progressBar: 0,
      removeLoadingUi: false
    }
  },
  components: {
    // cropper
    Level,
    Instructor
  },
  methods: {
    addFlows () {
      if (this.typeOfModal === 'add') {
        this.$emit('addFlows', { ...this.flows, medias: this.flows.images.map(data => data.id) })
      } else {
        this.$emit('editFlows', { ...this.flows, medias: this.flows.images.map(data => data.id), _method: 'put' })
      }
    },
    cropperFile (file) {
      console.log('file', file)
    },
    saveGalleryImage (file) {
      this.removeLoadingUi = false
      this.requestLoading = true
      const formData = new FormData()
      formData.append('image', file.image)
      formData.append('type', 'image')
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
    }
  },
  watch: {},
  computed: {},
  created () {
    if (this.flowsDetails) {
      this.flows = this.flowsDetails
    }
  }
}
</script>
<style>
.add_position {
  text-align: right;
  right: 0;
  top: -10px;
}
</style>
