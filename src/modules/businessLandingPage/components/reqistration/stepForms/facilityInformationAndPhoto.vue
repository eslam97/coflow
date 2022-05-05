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
            <b-col md="12">
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
                  v-if="test"
                  :options="{
               aspectRatio: 1,
               closeOnSave: true,
               cropArea: 'box',
               croppedHeight: 400,
               croppedWidth: 400,
               cropperHeight: false,
               dropareaMessage:`You can also drop your files here.`,
               frameLineDash: [5,3],
               frameStrokeColor: '#e3e4e8',
               handleFillColor: '#e3e4e8',
               handleHoverFillColor: '#e3e4e8',
               handleHoverStrokeColor: '#e3e4e8',
               handleSize: 10,
               handleStrokeColor: '#e3e4e8',
               layoutBreakpoint: 850,
               maxCropperHeight: 768,
               maxFileSize: 8000000,
               overlayFill: 'rgba(0, 0, 0, 0.5)',
               previewOnDrag: false,
               previewQuality: 0.65,
               resultQuality: 0.8,
               resultMimeType: 'image/jpeg',
               selectButtonLabel: '+ Add Photo',
               showPreview: false,
               skin: 'light',
               uploadData: {},
               uploadTo: false}"
                  @cropper-file-selected="cropperFile"
                  @cropper-saved="saveFile"
              ></cropper>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12" class="mt-3 d-flex justify-content-between align-items-center">
              <span @click="goBack">
                Back
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
        links: []
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
    }
  },
  mounted () {
    document.querySelector('.ankaCropper__selectButton').addEventListener('click', function (event) {
      event.preventDefault()
    }, false)
  }
}
</script>
