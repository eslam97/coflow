<template>
  <div>
    <div class="border-bottom my-5">
      <b-container>
        <h4 class="py-4">Facility Operation Days and Hours</h4>
      </b-container>
    </div>
    <b-container>
      <ValidationObserver v-slot="{ handleSubmit }">
        <b-form @submit.prevent="handleSubmit(saveFacilityOperation)">
          <b-row>
            <b-col md="9" class="mt-3 d-flex justify-content-between align-items-center">
              <span @click="goBack">
                Back
              </span>
              <span>
                <spinner-loading class="gradient-orange-button" text="Saving" v-if="loadingFacilityOperation"/>
                <b-button class="gradient-orange-button" type="submit" v-else>
                <span class="d-flex align-items-center">Done</span>
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
      loadingFacilityOperation: false
    }
  },
  methods: {
    saveFacilityOperation () {
      this.loadingFacilityOperation = true
      this.$store.commit('formSteps/setActiveStepForm', 5)
      this.loadingFacilityOperation = false
    },
    goBack () {
      this.$store.commit('formSteps/setActiveStepForm', 3)
    }
  }
}
</script>
