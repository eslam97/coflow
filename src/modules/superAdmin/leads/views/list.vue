<template>
  <div>
    Leads
  </div>
</template>
<script>
import { core } from '@/config/pluginInit'
export default {
  mounted () {
    core.index()
  }
}
</script>
