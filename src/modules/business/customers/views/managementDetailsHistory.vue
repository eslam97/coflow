<template>
  <div>
    <div class="mb-2 d-flex justify-content-between align-items-center">
      <h3>History</h3>

      <div class="d-flex justify-content-between gap-20">
        <b-button variant="light" class="btn bg-white add_button">
          Export <i class="las la-print ml-3"></i>
        </b-button>
      </div>
    </div>
  </div>
</template>
<script>
import { core } from '@/config/pluginInit'

export default {
  data () {
    return {
    }
  },
  components: {},
  methods: {},
  created () {},
  mounted () {
    core.index()
  }
}
</script>
