<template>
  <div>
    <div class="border-bottom my-5">
      <b-container>
        <h4 class="py-4">Facility Information & Photos</h4>
      </b-container>
    </div>
    <b-container>
      <div class="w-100">
        <ValidationObserver v-slot="{ handleSubmit }">
        <b-form @submit.prevent="handleSubmit(saveFacilityInformation)">
          <b-row>
            <b-col md="2" class="mb-3">
              <main-select labelTitle='Activity Line' :validate="'required'"
                           :name="`Activity Line`" placeholder="Choose" :options="activity_line"
                           v-model="info.activity_line"></main-select>
            </b-col>
            <b-col class="mb-3" md="2">
              <main-select labelTitle='Activity Type' :validate="'required'"
                           :name="`Activity Type`"  placeholder="Choose" :options="activity_type"
                           v-model="info.activity_type"></main-select>
            </b-col>
            <b-col class="mb-3" md="2">
              <input-form
                  placeholder="Ex: 2022"
                  :validate="'required|numeric'"
                  :name="`Launch Year`"
                  :label="'Launch Year'"
                  v-model="info.launch_year"
              />
            </b-col>
            <b-col class="mb-3" md="6">
              <input-form
                  placeholder="Ex: Diving"
                  :validate="'required'"
                  :name="`Facility Name`"
                  :label="'Facility Name'"
                  v-model="info.facility_name"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col class="mb-3" md="6">
              <input-form
                  placeholder="Ex: The Yoga Studio"
                  :validate="'required'"
                  :name="`Facility Title`"
                  :label="'Facility Title'"
                  v-model="info.facility_title"
              />
            </b-col>
            <b-col class="mb-3" md="6">
              <main-select labelTitle='Team Languages' :validate="'required'"
                           :multiple="true"
                           :name="`Team Languages`" placeholder="Choose" :options="allLanguages"
                           v-model="info.team_languages"></main-select>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="mb-3" md="12">
              <main-select labelTitle='Facility Tags' :validate="'required'"
                           :taggable="true"
                           multiple v-model="info.facility_tags"
                           :name="`Facility Tags`" placeholder="Write Tags"
                           :numberOfSelect=3
                           >
              </main-select>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="mb-3" md="12">
              <b-form-group
                  label="Facility Bio"
                  label-for="Facility Bio"
              >
                <ValidationProvider name="Facility Bio" ref="Facility Bio" rules="required" v-slot="{ errors }">
                  <b-form-textarea
                      placeholder="Facility Bio..."
                      rows="2"
                      v-model="info.facility_bio"
                      :class="(errors.length >
                             0 ? ' is-invalid' : '')"
                  ></b-form-textarea>
                  <div class="invalid-feedback">
                    <span>{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </b-form-group>

            </b-col>
          </b-row>
          <b-row>
            <label class="w-100 pl-3 mb-2">Amenities</label>
            <b-col md="4" lg="2" class="mb-3" v-for="(amenity, key) in allAmenities" :key="key">
              <b-form-checkbox class="custom-checkbox-color-check" color="warning" v-model="amenity.value">
                <span class="text-primary font-size-12">{{ amenity.key }}</span>
              </b-form-checkbox>
            </b-col>
          </b-row>
          <b-row>
            <b-col  md="6" class="mb-1" v-for="(item, key) in info.links" :key="key">
              <b-form-group
                  :label="'URL Links'"
                  :label-for="'URL Links'"
                  class="position-relative"
              >
              <span class="text-danger deleteLabelButton cursor-pointer" v-if="key != 0" @click="deleteLink(key)">Delete
              </span>
                <b-input-group>
                  <validation-provider
                      #default="{ errors }"
                      :name="`URL Link ${key + 1}`"
                      :rules="'required'"
                      class="flex-grow-1"
                  >
                    <b-form-input
                        id="mm"
                        v-model="item.link"
                        :class="[{ 'is-invalid': errors.length > 0 }]"
                        :placeholder="'Ex: https://www.google.com'"
                        :disabled="!item.selectSocial"
                    />
                  </validation-provider>
                  <template #prepend>
                    <b-dropdown
                        :text="item.selectSocial ? item.selectSocial : 'Choose'"
                        class="selectWithInput"
                    >
                      <b-dropdown-item v-for="(i, keyLink) in filterLinks" :key="keyLink" @click="item.selectSocial = i">
                        {{i}}
                      </b-dropdown-item>
                    </b-dropdown>
                  </template>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col md="12" class="mb-3" v-if="allLinks.length !== info.links.length">
              <span class="text-warning cursor-pointer" @click="addNewLink">+ Add another Link</span>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12" class="mb-5">
              <cropper
                  :label="'Upload Logo'"
                  @cropper-file-selected="cropperFile"
                  @cropper-saved="saveLogoImage"
                  @remove-image="removeLogoImage"
              ></cropper>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12" class="mb-5">
              <cropper
                  :label="'Upload Cover'"
                  @cropper-file-selected="cropperFile"
                  @cropper-saved="saveCoverImage"
                  @remove-image="removeCoverImage"
              ></cropper>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12" class="mb-5">
              <cropper
                  :label="'Upload Facility Photos'"
                  :uploadServer="true"
                  :options="{
                    selectButtonLabel:'Add Photos'
                  }"
              ></cropper>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12" class="mt-3 mb-5 d-flex justify-content-between align-items-center">
              <span @click="goBack" class="cursor-pointer text-black d-flex justify-content-between align-items-center">
                 <i class="mr-2 las la-arrow-left font-size-18"></i>
                <span class="text-bold">Back</span>
              </span>
              <span>
                <spinner-loading class="container_button_blue" text="Saving" v-if="loadingFacilityInformation"/>
                <b-button class="container_button_blue slideNextArrow" type="submit" v-else>
                <span class="d-flex align-items-center">Next
                  <i class="ml-2 las la-arrow-right font-size-18"></i></span>
              </b-button>
              </span>
            </b-col>
          </b-row>
        </b-form>
      </ValidationObserver>
      </div>
    </b-container>
  </div>
</template>
<script>
import cropper from '@/components/cropper'
export default {
  components: {
    cropper
  },
  data () {
    return {
      test: true,
      info: {
        activity_line: '',
        activity_type: '',
        launch_year: '',
        facility_name: '',
        facility_title: '',
        team_languages: [],
        facility_bio: '',
        facility_tags: [],
        amenities: [],
        links: [
          {
            selectSocial: '',
            link: ''
          }
        ]
      },
      fileInfo: {},
      activity_line: ['SKY', 'SEA', 'EARTH', 'ENERGY', 'EXPLORE'],
      activity_type: ['PARA', 'PAPA', 'RARA'],
      allLanguages: ['Arabic', 'English', 'Arpabic', 'Engolish', 'Arhabic', 'Enbglish', 'Arabivc', 'Englisha', 'Arabidc',
        'Englishs'],
      allLinks: [
        'Website',
        'Facebook',
        'Twitter',
        'Instagram'
      ],
      allAmenities: [
        {
          value: '',
          key: 'WC'
        },
        {
          value: '',
          key: 'Showers'
        },
        {
          value: '',
          key: 'Supplements'
        },
        {
          value: '',
          key: 'Jacuzzi'
        },
        {
          value: '',
          key: 'Beverages'
        },
        {
          value: '',
          key: 'WC'
        },
        {
          value: '',
          key: 'Showers'
        },
        {
          value: '',
          key: 'Supplements'
        },
        {
          value: '',
          key: 'Jacuzzi'
        },
        {
          value: '',
          key: 'Beverages'
        },
        {
          value: '',
          key: 'WC'
        },
        {
          value: '',
          key: 'Showers'
        },
        {
          value: '',
          key: 'Supplements'
        },
        {
          value: '',
          key: 'Jacuzzi'
        },
        {
          value: '',
          key: 'Beverages'
        },
        {
          value: '',
          key: 'WC'
        },
        {
          value: '',
          key: 'Showers'
        },
        {
          value: '',
          key: 'Supplements'
        },
        {
          value: '',
          key: 'Jacuzzi'
        },
        {
          value: '',
          key: 'Beverages'
        }
      ],
      // loading Steps
      loadingFacilityInformation: false
    }
  },
  methods: {
    saveFacilityInformation () {
      this.loadingFacilityInformation = true
      this.$store.commit('formSteps/setActiveStepForm', 3)
      this.loadingFacilityInformation = false
    },
    goBack () {
      this.$store.commit('formSteps/setActiveStepForm', 1)
    },
    cropperFile (file) {
      console.log(file)
    },
    saveLogoImage (file) {
      this.fileInfo = file
    },
    saveCoverImage (file) {
      console.log(file)
    },
    removeLogoImage () {
      this.fileInfo = {
      }
    },
    removeCoverImage () {
      this.fileInfo = {
      }
    },
    addNewLink () {
      this.info.links.push({
        selectSocial: '',
        link: ''
      })
    },
    deleteLink (key) {
      this.info.links.splice(key, 1)
    }
  },
  computed: {
    filterLinks () {
      var newLinksArr = [...this.allLinks]
      this.info.links.forEach(e => {
        if (newLinksArr.includes(e.selectSocial)) {
          var socialIndex = newLinksArr.findIndex(social => social === e.selectSocial)
          console.log(socialIndex)
          newLinksArr.splice(socialIndex, 1)
        }
      })
      return newLinksArr
    }
  },
  mounted () {
    document.querySelector('.ankaCropper__selectButton').addEventListener('click', function (event) {
      event.preventDefault()
    }, false)
  }
}
</script>
<style>
@import "~@fortawesome/fontawesome-free/css/all.min.css";
</style>
