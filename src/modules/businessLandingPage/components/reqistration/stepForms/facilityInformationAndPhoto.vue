<template>
  <div>
    <div class="border-bottom my-5">
      <b-container>
        <h4 class="py-4">Facility Information & Photos</h4>
      </b-container>
    </div>
    <b-container>
      <ValidationObserver v-slot="{ handleSubmit }">
        <b-form @submit.prevent="handleSubmit(saveFacilityInformation)">
          <b-row>
            <b-col md="2">
              <main-select labelTitle='Activity Line' :validate="'required'"
                           :name="`Activity Line`" placeholder="Choose" :options="activity_line"
                           v-model="info.activity_line"></main-select>
            </b-col>
            <b-col md="2">
              <main-select labelTitle='Activity Type' :validate="'required'"
                           :name="`Activity Type`"  placeholder="Choose" :options="activity_type"
                           v-model="info.activity_type"></main-select>
            </b-col>
            <b-col md="2">
              <input-form
                  placeholder="Ex: 2022"
                  :validate="'required|numeric'"
                  :name="`Launch Year`"
                  :label="'Launch Year'"
                  v-model="info.launch_year"
              />
            </b-col>
            <b-col md="3">
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
            <b-col md="9" class="mt-3 d-flex justify-content-between align-items-center">
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
    </b-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      test: '',
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
      activity_line: ['SKY', 'SEA', 'EARTH', 'ENERGY', 'EXPLORE'],
      activity_type: ['PARA', 'PAPA', 'RARA'],
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
    }
  }
}
</script>
