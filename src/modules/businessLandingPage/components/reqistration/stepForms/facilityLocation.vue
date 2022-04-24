<template>
  <div>
    <div class="border-bottom my-5">
      <b-container>
        <h4 class="py-4">Facility Location</h4>
      </b-container>
    </div>
    <b-container>
      <ValidationObserver v-slot="{ handleSubmit }">
        <b-form @submit.prevent="handleSubmit(saveFacilityLocation)">
          <b-row>
            <b-col md="9" class="mt-3 d-flex justify-content-between align-items-center">
              <span @click="goBack">
                Back
              </span>
              <span>
                <spinner-loading class="gradient-orange-button" text="Saving" v-if="loadingFacilityLocation"/>
                <b-button class="gradient-orange-button slideNextArrow" type="submit" v-else>
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
      step: 1,
      // loading Steps
      loadingFacilityLocation: false
    }
  },
  methods: {
    saveFacilityLocation () {
      this.loadingFacilityLocation = true
      this.$store.commit('formSteps/setActiveStepForm', 4)
      this.loadingFacilityLocation = false
    },
    goBack () {
      this.$store.commit('formSteps/setActiveStepForm', 2)
    }
  }
}
</script>
