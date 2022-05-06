<template>
  <div>
    <div class="border-bottom my-5">
      <b-container>
        <h4 class="py-4">Facility Information & Photos</h4>
      </b-container>
    </div>
    <b-container>
      <div class="w-75">
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
              <label class="mb-2">Upload Logo</label>
              <div class="mb-3 d-flex justify-content-between align-items-center">
                <section>
                  <img :src="fileInfo.image" class="img-fluid avatar-60 rounded" />
                  <span class="text-dark ml-3 font-weight-bold">{{fileInfo.name}}</span>
                </section>
                <section>
                  Uploading %50
                </section>
              </div>
              <cropper
                  @cropper-file-selected="cropperFile"
                  @cropper-saved="saveFile"
              ></cropper>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12" class="mb-5">
              <label class="mb-2">Upload Cover</label>
              <div class="mb-3 d-flex justify-content-between align-items-center">
                <section>
                  <img :src="fileInfo.image" class="img-fluid avatar-60 rounded" />
                  <span class="text-dark ml-3 font-weight-bold">{{fileInfo.name}}</span>
                </section>
                <section>
                  Uploading %50
                </section>
              </div>
              <cropper
                  @cropper-file-selected="cropperFile"
                  @cropper-saved="saveFile"
              ></cropper>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12" class="mb-5">
              <label class="mb-2">Upload Facility Photos</label>
              <div class="mb-3 d-flex justify-content-between align-items-center">
                <section>
                  <img :src="fileInfo.image" class="img-fluid avatar-60 rounded" />
                  <span class="text-dark ml-3 font-weight-bold">{{fileInfo.name}}</span>
                </section>
                <section>
                  Uploading %50
                </section>
              </div>
              <cropper
                  @cropper-file-selected="cropperFile"
                  @cropper-saved="saveFile"
              ></cropper>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12" class="mt-3 mb-5 d-flex justify-content-between align-items-center">
              <span @click="goBack" class="cursor-pointer text-black d-flex justify-content-between align-items-center">
                 <i class="mr-2 las la-arrow-left font-size-18"></i>
<!--                <i class="mr-2 fa-solid fa-arrow-left font-size-18"></i>-->
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
      fileInfo: {
        name: '',
        size: '',
        image: ''
      },
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
    saveFile (file) {
      this.fileInfo.image = file.croppedImageURI
      this.fileInfo.name = file.originalFile.name
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
