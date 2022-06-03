<template>
  <b-container fluid>
    <b-row>
      <b-col md="12" class="mb-2 d-flex justify-content-between align-items-center mb-4">
        <h3>Profile</h3>
        <div>
          <b-button variant="warning" class="add_button text-white">
            Temporary close account</b-button>
        </div>
      </b-col>
      <b-col md="12">
        <tab-nav :tabs="true" id="myTab-1">
          <tab-nav-items :active="true" id="admin-tab" ariaControls="adminInfo"
                         role="tab" :ariaSelected="true" title="Admin information" />
          <tab-nav-items :active="false" id="business-tab" ariaControls="businessInfo"
                         role="tab" :ariaSelected="false" title="Business information" />
        </tab-nav>
        <tab-content id="myTabContent">
          <tab-content-item :active="true" id="adminInfo" aria-labelled-by="admin-tab">
            <spinner-loading v-if=(loading) text="Loading" />
            <admin-tab v-else
                       @updateLoginCredential="updateLoginCredential"
                       @updateContactInfo="updateContactInfo"
                       :oldProfile="oldProfile"
            ></admin-tab>
          </tab-content-item>
          <tab-content-item :active="false" id="businessInfo" aria-labelled-by="business-tab">
            <spinner-loading v-if=(loading) text="Loading" />
            <business-tab v-else
                          @updateFacilityInfo="updateFacilityInfo"
                          @updateFacilityPhones="updateFacilityPhones"
                          @updateFacilityOperatingDays="updateFacilityOperatingDays"
                          :oldProfile="oldProfile"
            ></business-tab>
          </tab-content-item>
        </tab-content>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

import { core } from '@/config/pluginInit'
import adminTab from '@/modules/business/profile/components/adminTab'
import businessTab from '@/modules/business/profile/components/businessTab'
// save contact info
import adminInfoService from '@/modules/superAdmin/admin/services/admins.services'
// get contact and business info
import activationService from '@/modules/superAdmin/activation/services/activations.services'
// save facility info
import facilityInfoService from '@/modules/businessLandingPage/services/registration.services'

export default {
  mounted () {
    core.index()
  },
  data () {
    return {
      loading: true,
      oldProfile: '',
      id: ''
    }
  },
  components: {
    adminTab,
    businessTab
  },
  methods: {
    handleClick (newTab) {
      this.currentTab = newTab
    },
    // Get data
    getOldAdminInfo () {
      this.id = JSON.parse(localStorage.getItem('userInfo')).id
      activationService.getActivationDetails(this.id).then(res => {
        this.oldProfile = res.data.data
        /* core.showSnackbar('success', res.data.message) */
        this.loading = false
      })
    },
    // Admin tab
    updateLoginCredential (credential) {
      adminInfoService.saveAdmin(credential).then(res => {
        core.showSnackbar('success', res.data.message)
      })
    },
    updateContactInfo (contact) {
      facilityInfoService.saveStepAdmin(contact).then(res => {
        core.showSnackbar('success', res.data.message)
      })
    },
    // Business tab
    updateFacilityInfo (info) {
      facilityInfoService.saveStepFacility(info).then(res => {
        core.showSnackbar('success', res.data.message)
      })
    },
    updateFacilityPhones (typeOfLocation, location) {
      if (this.typeOfLocation === 'based') {
        facilityInfoService.saveStepLocationBased(location).then(res => {
          core.showSnackbar('success', res.data.message)
        })
      } else {
        facilityInfoService.saveStepLocationRemote(location).then(res => {
          core.showSnackbar('success', res.data.message)
        })
      }
    },
    updateFacilityOperatingDays (days) {
      facilityInfoService.saveStepOperation(days).then(res => {
        core.showSnackbar('success', res.data.message)
      })
    }
  },
  created () {
    this.getOldAdminInfo()
  }
}
</script>
