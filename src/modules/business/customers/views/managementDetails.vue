<template>
  <b-container fluid>
    <ManagementDetailsHeader />
  </b-container>
</template>
<script>
import { core } from '@/config/pluginInit'
import ManagementDetailsHeader from '../components/ManagementDetailsHeader'

export default {
  data () {
    return {
    }
  },
  components: { ManagementDetailsHeader },
  methods: {},
  created () {},
  mounted () {
    core.index()
  }
}
</script>
