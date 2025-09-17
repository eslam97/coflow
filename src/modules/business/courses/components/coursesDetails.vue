<template>
  <div>
    <validationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(addCourses)">
        <b-row>
          <b-col lg="6" class="">
            <b-row>
              <b-col md="6">
                <input-form
                    v-model="courses.name"
                    placeholder="Write course name"
                    :validate="'required|max:50'"
                    name="Course name"
                    :label="'Course Name'"
                    :limit="50"
                />
              </b-col>
              <b-col md="6">
                <label for="duration-group">Duration</label>
                <validation-provider
                    #default="{ errors }"
                    :validate="'required'"
                >
                  <b-input-group id="duration-group">
                    <b-form-input
                        labelTitle='Duration'
                        :label="'Duration'"
                        v-model="courses.duration"
                        :placeholder="'000'"
                    />
                    <template #append>
                      <b-dropdown
                          :text="type ? type : 'type'"
                          class="selectWithInputAppend"
                      >
                        <b-dropdown-item v-for="(i, keyType) in allDurationList"
                                         :key="keyType"
                                         @click="courses.duration_list_id = i.id;
                                           type = i.name">
                          {{i.name}}
                        </b-dropdown-item>
                      </b-dropdown>
                    </template>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </b-input-group>
                </validation-provider>
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
                  v-model="courses.tag_id">
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
                  v-model="courses.facility_folder_id"
                  :reduce="(item) => item.id"
                  :options="allFolders"
                  >
                </main-select>
              </b-col>
            </b-row>

          </b-col>

          <b-col lg="6">
            <Level @selectLevel="(event) => courses.level_id = event" :level="courses.level_id"/>

            <validation-provider
                #default="{ errors }"
                :name="`Description`"
                :rules="'required'"
                class="flex-grow-1"
            >
              <b-form-group label="Description">
                <b-form-textarea
                    v-model="courses.description"
                    :label="'courses'"
                    placeholder="Write your description about this activity…."
                    rows="2"
                    :class="[{ 'is-invalid': errors.length > 0 }]"
                ></b-form-textarea>
              </b-form-group>
            </validation-provider>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="6">
            <instructor @instructors="data => courses.instructors = data" :allInstructors="courses.instructors"/>
          </b-col>
          <b-col md="6">
            <facility-location @locations="data => courses.locations = data" :allLocations="courses.locations" @facility_location="data => courses.facility_location = data"/>
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
                v-model="courses.requirements"
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
                v-model="courses.conditions"
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
                :images="courses.images"
                type="course_image"
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
import Level from '@/components/level'
import Instructor from '@/components/instructor'
import facilityLocation from '@/components/facilityLocation'
import mainService from '@/services/main'
import settingsService from '@/modules/superAdmin/settings/services/settings.services'
import { core } from '@/config/pluginInit'
import { tagMixin } from '@/mixins/tags'
import { folderMixin } from '@/mixins/folders'
export default {
  mixins: [tagMixin, folderMixin],
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
    coursesDetails: {
      required: false
    }
  },
  data () {
    return {
      courses: {
        name: '',
        type: 'course',
        requirements: '',
        conditions: '',
        description: '',
        status: 'active',
        images: [],
        duration: '',
        duration_list_id: '',
        facility_folder_id: '',
        tag_id: '',
        level_id: '',
        instructors: [{
          first_name: '',
          last_name: ''
        }],
        facility_location: '',
        locations: [{
          name: '',
          link: ''
        }]
      },
      type: '',
      allDurationList: [],
      loadingGallery: 0,
      progressBar: 0,
      removeLoadingUi: false
    }
  },
  components: {
    Level,
    Instructor,
    facilityLocation
  },
  methods: {
    addCourses () {
      if (!this.courses.images || !this.courses.images.length) {
        return core.showSnackbar('error', 'Please upload at least one image')
      }
      if (this.typeOfModal === 'add') {
        this.$emit('addCourses', { ...this.courses, medias: this.courses.images.map(data => data.id) })
      } else {
        this.$emit('editCourses', { ...this.courses, medias: this.courses.images.map(data => data.id), _method: 'put' })
      }
    },
    saveGalleryImage (file) {
      this.removeLoadingUi = false
      this.requestLoading = true
      const formData = new FormData()
      formData.append('image', file.image)
      formData.append('type', 'image')
      formData.append('status', this.coursesDetails ? 'exist' : 'new')
      formData.append('name', file.imageInfo.name)
      if (this.coursesDetails) {
        formData.append('service_id', this.coursesDetails.id)
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
        this.courses.images.push(res.data.data)
        this.removeLoadingUi = true
        this.requestLoading = false
      })
    },
    removeGalleryImage (id) {
      mainService.removeImage(id, 'course').then(res => {
        core.showSnackbar('success', res.data.message)
        const ind = this.courses.images.findIndex(image => image.id === id)
        this.courses.images.splice(ind, 1)
      })
    },
    getDurationList () {
      settingsService.getDurationList().then(res => {
        this.allDurationList = res.data.data
        this.type = this.allDurationList.find((item) => item.id === this.coursesDetails.duration_list_id).name
      })
    }
  },
  watch: {},
  computed: {},
  created () {
    this.getDurationList()
    if (this.coursesDetails) {
      this.courses = this.coursesDetails
    }
  }
}

</script>
