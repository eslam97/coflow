<template>
  <div class="profile-information">
    <navSteps />
    <keep-alive>
      <component :is="activeForm" />
    </keep-alive>
  </div>
</template>
<script>
import navSteps from '../components/reqistration/navWithsteps'
import generalAdminInformation from '../components/reqistration/stepForms/generalAdminInformation'
import facilityInformationAndPhoto from '../components/reqistration/stepForms/facilityInformationAndPhoto'
import facilityLocation from '../components/reqistration/stepForms/facilityLocation'
import facilityOperation from '../components/reqistration/stepForms/facilityOperation'
export default {
  name: 'profileSteps',
  components: {
    navSteps,
    step1: generalAdminInformation,
    step2: facilityInformationAndPhoto,
    step3: facilityLocation,
    step4: facilityOperation
  },
  computed: {
    activeForm () {
      return `step${this.$store.getters['formSteps/getActiveStepForm']}`
    }
  }
}
</script>
<style scoped>
@import url("../../../assets/css/custom.css");

body{
background: #fff !important;
}
</style>
