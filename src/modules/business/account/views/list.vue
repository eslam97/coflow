<template>
  <b-container fluid>
    <adminTab  :oldProfile="oldProfile"/>
  </b-container>
</template>

<script>
import { core } from '@/config/pluginInit'
import adminTab from '@/modules/business/profile/components/adminTab'
import profileServices from '@/modules/business/profile/services/profile.services'
export default {
  components: {
    adminTab
  },
  data () {
    return {
      oldProfile: {}
    }
  },
  methods: {
    getInfo () {
      profileServices.getProfileData().then(res => {
        this.oldProfile = res.data.data
      })
    }
  },
  mounted () {
    this.getInfo()
    core.index()
  }
}
</script>
