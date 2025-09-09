<template>
  <div class="profile-information">
    <navSteps />
    <keep-alive>
      <component :is="activeForm" :providerInfo="providerInfo" :profileInfo="profileInfo"/>
    </keep-alive>
  </div>
</template>
<script>
import profileServices from '@/modules/business/profile/services/profile.services'
import navSteps from '../components/reqistration/navWithsteps'
import generalAdminInformation from '../components/reqistration/stepForms/generalAdminInformation'
import facilityInformationAndPhoto from '../components/reqistration/stepForms/facilityInformationAndPhoto'
import facilityLocation from '../components/reqistration/stepForms/facilityLocation'
import facilityOperation from '../components/reqistration/stepForms/facilityOperation'
// import registrationServices from '../services/registration.services'
export default {
  name: 'profileSteps',
  data () {
    return {
      providerInfo: JSON.parse(localStorage.getItem('userInfo')) || {},
      profileInfo: null
    }
  },
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
  },
  beforeCreate () {
    document.body.style.backgroundColor = '#ffffff'
  },
  beforeDestroy () {
    document.body.style.backgroundColor = ''
  },
  created () {
    profileServices.getProfileData().then((res) => {
      this.profileInfo = res.data.data
    })
    // this.providerInfo = res.data.data
    // registrationServices.getProfileDetails(JSON.parse(localStorage.getItem('userInfo')).id).then(res => {
    //   this.providerInfo = res.data.data
    // })
  }
}
</script>
<style scoped>
@import url("../../../assets/css/custom.css");

body{
background: #fff !important;
}
</style>
