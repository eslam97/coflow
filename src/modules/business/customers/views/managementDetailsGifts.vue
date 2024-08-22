<template>
  <div>
    <div class="mb-2 d-flex justify-content-between align-items-center">
      <h3>Gifts</h3>

      <div class="d-flex justify-content-between gap-20">
        <b-button @click="openPopup" variant="warning" class="add_button text-white">
          Add Gift <i class="las la-plus ml-3"></i>
        </b-button>
      </div>
    </div>

    <main-modal id="AddGiftModal">
      <template v-slot:header>
        <h4 class="font-weight-bold">
          <span class="text-warning" >Add: </span> Gift
        </h4>
      </template>
      <template v-slot:body>
        zzzzzzzzzz
      </template>
    </main-modal>
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
  methods: {
    openPopup () {
      this.$bvModal.show('AddGiftModal')
    }
  },
  created () {},
  mounted () {
    core.index()
  }
}
</script>
