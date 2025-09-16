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
                  :validate="'required|max:50'"
                  name="Activity name"
                  :label="'Activity Name'"
                  :limit="50"
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
                      :text="type ? type : 'type'"
                      class="selectWithInputAppend"
                    >
                      <b-dropdown-item
                        v-for="(i, keyType) in allDurationList"
                        :key="keyType"
                        @click="activity.duration_list_id = i.id;
                        type = i.name"
                      >
                          {{i.name}}
                      </b-dropdown-item>
                    </b-dropdown>
                  </template>
                </b-input-group>
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
                  v-model="activity.tag_id">
                </main-select>
              </b-col>
              <b-col md="6" class="mb-3">
                <main-select
                  labelTitle='Folder'
                  :validate="''"
                  :name="`Folder`"
                  placeholder="Select Folder"
                  class=""
                  label="name"
                  v-model="activity.facility_folder_id"
                  :reduce="(item) => item.id"
                  :options="allFolders"
                  >
                </main-select>
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
                  v-model="activity.description"
                  placeholder="Write a brief description"
                  rows="4"
                  :class="[{ 'is-invalid': errors.length > 0 }]"
                ></b-form-textarea>
              </b-form-group>
            </validation-provider>
          </b-col>

          <b-col lg="12">
            <facility-location @locations="data => activity.locations = data" :allLocations="activity.locations" @facility_location="data => activity.facility_location = data"/>
          </b-col>

          <b-col lg="12">
            <instructor @instructors="data => activity.instructors = data" :allInstructors="activity.instructors"/>
          </b-col>

          <b-col lg="6" class="mb-3">
            <validation-provider
              #default="{ errors }"
              :name="`Conditions`"
              :rules="''"
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
                </div>
              </b-form-group>
            </validation-provider>
          </b-col>

          <b-col lg="6" class="mb-3">
            <validation-provider
              #default="{ errors }"
              :name="`Requirements`"
              :rules="''"
              class="flex-grow-1"
            >
              <b-form-group label="Requirements">
                <b-form-textarea
                  @focus="activity.requirements = activity.requirements === '' ? '• ' : activity.requirements"
                  @keyup.enter="activity.requirements += '• '"
                  v-model="activity.requirements"
                  placeholder="Autosize height based on content lines"
                  rows="2"
                  :class="[{ 'is-invalid': errors.length > 0 }]"
                />
                <div class="d-flex justify-content-between">
                    <small class="text-danger">{{ errors[0] }}</small>
                </div>
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
              :images="activity.medias"
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
import Instructor from '@/components/instructor'
import { folderMixin } from '@/mixins/folders'
import mainService from '@/services/main'
import { core } from '@/config/pluginInit'
import settingsService from '@/modules/superAdmin/settings/services/settings.services'
import commonServices from '@/modules/business/commonServices'
import facilityLocation from '@/components/facilityLocation.vue'
export default {
  mixins: [folderMixin],
  components: { facilityLocation, Instructor },
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
        instructors: [{
          first_name: '',
          last_name: ''
        }],
        type: 'activity',
        name: '',
        description: '',
        tag_id: '',
        facility_folder_id: '',
        conditions: '',
        requirements: '',
        medias: [],
        status: 'active',
        locations: [{ name: '', link: '' }],
        duration_list_id: '',
        facility_location: false
      },
      removeLoadingUi: false,
      progressBar: 0,
      type: '',
      allDurationList: [],
      allTags: []
    }
  },
  methods: {
    saveGalleryImage (file) {
      this.removeLoadingUi = false
      this.requestLoading = true
      const formData = new FormData()
      formData.append('image', file.image)
      formData.append('type', 'image')
      formData.append('status', this.activityDetails ? 'exist' : 'new')
      formData.append('name', file.imageInfo.name)
      if (this.activityDetails) {
        formData.append('service_id', this.activityDetails.id)
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
        console.log(res.data)
        core.showSnackbar('success', res.data.message)
        this.activity.medias.push(res.data.data)
        this.removeLoadingUi = true
        this.requestLoading = false
      })
    },
    removeGalleryImage (id) {
      mainService.removeImage(id, 'activity').then(res => {
        core.showSnackbar('success', res.data.message)
        const ind = this.activity.medias.findIndex(image => image.id === id)
        this.activity.medias.splice(ind, 1)
      })
    },
    addActivity () {
      if (this.typeOfModal === 'add') {
        this.$emit('addActivity', {
          ...this.activity,
          medias: this.activity.medias.map(data => data.id)
        })
      } else {
        this.$emit('editActivity', { ...this.activity, _method: 'put', medias: this.activity.medias.map(data => data.id) })
      }
    },
    getDurationList () {
      settingsService.getDurationList().then(res => {
        this.allDurationList = res.data.data
        this.type = this.allDurationList.find((item) => item.id === this.activityDetails.duration_list_id).name
      })
    },
    getAllTags () {
      commonServices.getFacilityTags().then(res => {
        this.allTags = res.data.data
      })
    }
  },
  watch: {},
  computed: {},
  created () {
    this.getAllTags()
    this.getDurationList()
    if (this.activityDetails) {
      this.activity = this.activityDetails
    }
  }
}
</script>
