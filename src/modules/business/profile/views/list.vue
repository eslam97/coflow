<template>
  <b-container fluid>
    <!--  Temporary close modal  -->
    <main-modal id="tempCloseModal" size="md" @unsavedMsg="unsavedMsg">
      <template v-slot:header class="p-2">
        <h4 class="font-weight-bold"><span class="text-danger">Temporary close: </span> Account</h4>
      </template>
      <template v-slot:body>
        <temp-msg-modal @setMsg="setTempCloseMsg"
                        :statusDetails="statusDetails"/>
      </template>
    </main-modal>
    <b-row>
      <b-col md="12" class="mb-2 d-flex justify-content-between align-items-center mb-4">
        <h3>Profile</h3>
          <b-card v-if="!loading">
            <span class="text-dark font-weight-bold font-size-14 mr-3">
              {{ statusDetails.status === 'visible'? 'Temporary close account' : 'Temporarily closed account' }}
            </span>
            <div
                class="custom-control custom-switch custom-switch-text custom-control-inline custom-switch-color mr-0" >
              <div class="custom-switch-inner">
                <input type="checkbox" class="custom-control-input bg-danger" :id="'status'"
                       @change="changeStatus()" v-model="switchStatus">
                <label class="custom-control-label" :for="'status'">
                </label>
              </div>
            </div>
          </b-card>
<!--          <b-form-radio class="custom-radio-color-checked mr-4" inline v-model="oldProfile.status" color="warning"-->
<!--                        name="status" value="visible" @change="changeStatus(0)">-->
<!--            <span class="text-primary font-size-14">Visible</span>-->
<!--          </b-form-radio>-->
<!--          <b-form-radio class="custom-radio-color-checked mr-4" inline v-model="oldProfile.status" color="warning"-->
<!--                        name="status" value="invisible" @change="changeStatus(0)">-->
<!--            <span class="text-primary font-size-14">Invisible</span>-->
<!--          </b-form-radio>-->
<!--          <b-form-radio class="custom-radio-color-checked mr-4" inline v-model="oldProfile.status" color="warning"-->
<!--                        name="status" value="temp_closed" @change="changeStatus(1)">-->
<!--            <span class="text-primary font-size-14">Temporary closed</span>-->
<!--          </b-form-radio>-->
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
import tempMsgModal from '@/modules/business/profile/components/tempMsgModal'
import profileServices from '@/modules/business/profile/services/profile.services'
import facilityInfoService from '@/modules/businessLandingPage/services/registration.services'

export default {
  data () {
    return {
      loading: true,
      oldProfile: '',
      id: '',
      statusDetails: {
        status: '',
        status_msg: ''
      },
      switchStatus: ''
    }
  },
  components: {
    tempMsgModal,
    adminTab,
    businessTab
  },
  methods: {
    changeStatus () {
      console.log(this.switchStatus)
      this.switchStatus ? this.$bvModal.show('tempCloseModal') : this.setStatus()
    },
    setStatus () {
      profileServices.changeStatus({ status: 'visible' }).then(res => {
        this.statusDetails.status = 'visible'
        core.showSnackbar('success', res.data.message)
      })
    },
    setTempCloseMsg (obj) {
      profileServices.changeStatus(obj).then(res => {
        this.statusDetails.status = 'temp_closed'
        this.$bvModal.hide('tempCloseModal')
        core.showSnackbar('success', res.data.message)
      })
    },
    unsavedMsg () {
      this.oldProfile.status = this.statusDetails.status
    },
    // Get data
    getOldAdminInfo () {
      this.id = JSON.parse(localStorage.getItem('userInfo')).id
      profileServices.getProfileData(this.id).then(res => {
        this.oldProfile = res.data.data
        this.statusDetails = { status: this.oldProfile.status, status_msg: this.oldProfile.status_msg }
        this.switchStatus = !(this.statusDetails.status === 'visible' || this.statusDetails.status === 'invisible')
        this.loading = false
      })
    },
    // Admin tab
    updateLoginCredential (credential) {
      console.log('credential', credential)
      profileServices.changePassword(credential).then(res => {
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
      console.log(typeOfLocation)
      console.log(location)
      if (typeOfLocation === 'address based') {
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
        core.showSnackbar('success', 'Data updated successfully')
      })
    }
  },
  created () {
    this.getOldAdminInfo()
  },
  mounted () {
    core.index()
  }
}
</script>
<style>
.temp-btn {
  background-color: white;
  padding: 12px 20px;
}
</style>
