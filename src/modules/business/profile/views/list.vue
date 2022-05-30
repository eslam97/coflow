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
import stepAdmin from '@/modules/businessLandingPage/services/registration.services'
// get contact and business info
import adminService from '@/modules/superAdmin/activation/services/activations.services'
// get login credential info

export default {
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
    // Admin tab
    getOldAdminInfo () {
      this.id = JSON.parse(localStorage.getItem('userInfo')).id
      adminService.getActivationDetails(this.id).then(res => {
        this.oldProfile = res.data.data
        core.showSnackbar('success', res.data.message)
        this.loading = false
      })
    },
    updateLoginCredential () {},
    updateContactInfo (contact) {
      stepAdmin.saveStepAdmin(contact).then(res => {
        core.showSnackbar('success', res.data.message)
      })
    },
    // Business tab
    updateFacilityInfo (info) {
      console.log(info)
      stepAdmin.saveStepFacility(info).then(res => {
        core.showSnackbar('success', res.data.message)
      })
    }
  },
  created () {
    this.getOldAdminInfo()
  }
}
</script>
