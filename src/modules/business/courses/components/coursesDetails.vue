<template>
  <div>
    <validationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(addCourses)">
        <b-row>
          <b-col lg="6" class="mb-3">
            <b-row>
              <b-col md="6" class="mb-3">
                <input-form
                    v-model="courses.name"
                    placeholder="Write course name"
                    :validate="'required|max:50'"
                    name="Course name"
                    :label="'Course Name'"
                    :limit="50"
                />
              </b-col>
              <b-col md="6" class="mb-3">
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
                          :text="type ? type : 'Pick duration type'"
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
                        v-model="courses.price_egp"
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
                        v-model="courses.discount_price_egp"
                        placeholder="000.00"
                        :disabled="!selectedEGP"
                        :class="[{ 'is-invalid': errors.length > 0}]"
                    /> </b-input-group>
                    <small class="text-danger" v-if="!courses.discount_price_egp">{{ errors[0] }}</small>
                    <small class="text-danger" v-if="Number(courses.discount_price_egp) > Number(courses.price_egp)">
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
                        v-model="courses.price_euro"
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
                    :rules="`${selectedEUR ? 'required': ''}|numeric|between:0,${courses.price_euro}`"
                    class="flex-grow-1"
                >
                  <b-form-group :label="'Discounted Price'"
                  ><b-input-group append="EUR">
                    <b-form-input
                        v-model="courses.discount_price_euro"
                        placeholder="000.00"
                        :disabled="!selectedEUR"
                        :class="[{ 'is-invalid': errors.length > 0 }]"
                    /> </b-input-group>
                    <small class="text-danger" v-if="!courses.discount_price_euro">{{ errors[0] }}</small>
                    <small class="text-danger" v-if="Number(courses.discount_price_euro) > Number(courses.price_euro)">
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
                        v-model="courses.price_dollar"
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
                    :rules="`${selectedDollar ? 'required': ''}|numeric|between:0,${courses.price_dollar}`"
                    class="flex-grow-1"
                >
                  <b-form-group :label="'Discounted Price'"
                  ><b-input-group append="$">
                    <b-form-input
                        v-model="courses.discount_price_dollar"
                        placeholder="000.00"
                        :disabled="!selectedDollar"
                        :class="[{ 'is-invalid': errors.length > 0}]"
                    /> </b-input-group>
                    <small class="text-danger" v-if="!courses.discount_price_dollar">{{ errors[0] }}</small>
                    <small class="text-danger" v-if="Number(courses.discount_price_dollar) > Number(courses.price_dollar)">
                      More than price
                    </small>
                  </b-form-group>
                </validation-provider>
              </b-col>
            </b-row>
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
          <b-col lg="6" class="mb-3">
            <b-form-group label="Pick Level">
              <div class="d-flex flex-wrap mb-2 flex-grow-1 justify-content-around">
                <span v-for="(option, counter) in options" :key="counter">
                  <button
                      class="btn radio-btn"
                      :class="`radio-btn-${option.color} ${selectLevel(option.value) ? 'radio-btn-selected-'+option.color : ''}`"
                      @click.prevent="courses.level = option.value"
                  >
                      {{ option.text }}
                  </button>
                </span>
              </div>
            </b-form-group>
            <main-select labelTitle='Location' :validate="'required'"
                         :taggable="true"
                         multiple v-model="courses.location"
                         :name="`Locations`" placeholder="Add multiple location tags"
            ></main-select>
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
                :images="courses.images"
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
    coursesDetails: {
      required: false
    }
  },
  data () {
    return {
      courses: {
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
        duration: '',
        status: 'active',
        images: [],
        location: '',
        duration_list_id: '',
        level: 'all'
      },
      type: '',
      foreignerPrice: 'None',
      selectedEGP: false,
      selectedEUR: false,
      selectedDollar: false,
      options: [
        { text: 'ALL LEVELS', value: 'all', color: 'blue' },
        { text: 'BEGINNER', value: 'beginner', color: 'cyan' },
        { text: 'INTERMEDIATE', value: 'intermediate', color: 'orange' },
        { text: 'ADVANCED', value: 'advanced', color: 'red' }
      ],
      allDurationList: [],
      loadingGallery: 0,
      progressBar: 0,
      removeLoadingUi: false
    }
  },
  components: {},
  methods: {
    addCourses () {
      // if foreigner price is empty send 0 to server
      this.courses.price_euro = this.courses.price_euro ? this.courses.price_euro : 0
      this.courses.price_dollar = this.courses.price_dollar ? this.courses.price_dollar : 0
      // if discount isn't checked, discounted field should be emptied
      this.courses.discount_price_egp = this.selectedEGP ? this.courses.discount_price_egp : ''
      this.courses.discount_price_euro = this.selectedEUR ? this.courses.discount_price_euro : ''
      this.courses.discount_price_dollar = this.selectedDollar ? this.courses.discount_price_dollar : ''
      // empty non selected currency
      if (this.foreignerPrice === 'None') {
        this.courses.price_euro = 0
        this.courses.discount_price_euro = 0
        this.courses.price_dollar = 0
        this.courses.discount_price_dollar = 0
      } else if (this.foreignerPrice === 'Euro') {
        this.courses.price_dollar = 0
        this.courses.discount_price_dollar = 0
      } else if (this.foreignerPrice === 'Dollar') {
        this.courses.price_euro = 0
        this.courses.discount_price_euro = 0
      }
      if (this.typeOfModal === 'add') {
        this.$emit('addCourses', { ...this.courses, images: this.courses.images.map(data => data.id) })
      } else {
        this.$emit('editCourses', { ...this.courses, images: this.courses.images.map(data => data.id), _method: 'put' })
      }
    },
    saveGalleryImage (file) {
      this.removeLoadingUi = false
      this.requestLoading = true
      const formData = new FormData()
      formData.append('image', file.image)
      formData.append('type', 'course')
      formData.append('status', this.coursesDetails ? 'exist' : 'new')
      formData.append('name', file.imageInfo.name)
      if (this.coursesDetails) {
        formData.append('course_id', this.coursesDetails.id)
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
    },
    selectLevel (value) {
      return this.courses.level === value
    }
  },
  watch: {},
  computed: {},
  created () {
    this.getDurationList()
    if (this.coursesDetails) {
      this.courses = {
        name: this.coursesDetails.name,
        requirements: this.coursesDetails.requirements,
        conditions: this.coursesDetails.conditions,
        description: this.coursesDetails.description,
        price_egp: this.coursesDetails.price_egp,
        price_euro: this.coursesDetails.price_euro ? this.coursesDetails.price_euro : '',
        price_dollar: this.coursesDetails.price_dollar ? this.coursesDetails.price_dollar : '',
        discount_price_egp: this.coursesDetails.discount_price_egp || '',
        discount_price_euro: this.coursesDetails.discount_price_euro || '',
        discount_price_dollar: this.coursesDetails.discount_price_dollar || '',
        status: this.coursesDetails.status,
        images: this.coursesDetails.images,
        location: this.coursesDetails.location,
        duration_list_id: this.coursesDetails.duration_list_id,
        level: this.coursesDetails.level,
        duration: this.coursesDetails.duration
      }
      if (this.courses.price_euro) {
        this.foreignerPrice = 'Euro'
      }
      if (this.courses.price_dollar) {
        this.foreignerPrice = 'Dollar'
      }
      if (this.coursesDetails.discount_price_egp) {
        this.selectedEGP = true
      }
      if (this.coursesDetails.discount_price_euro) {
        this.selectedEUR = true
      }
      if (this.coursesDetails.discount_price_dollar) {
        this.selectedDollar = true
      }
    }
  }
}

</script>
