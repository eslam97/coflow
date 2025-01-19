<template>
  <div>
    <h5 class="mb-2 text-center" v-if="info.name">{{ info.name }}</h5>

    <validationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(collectPurchase)">
        <b-row>
          <b-col lg="12" class="mb-3">
            <main-select labelTitle='Service'
                    :validate="'required'"
                    :name="`service`"
                    :reduce="(data) => data.id"
                    v-model="service_id"
                    label="name"
                    placeholder="Select Services"
                    :options="allServices"
            ></main-select>
          </b-col>
        </b-row>

        <b-button class="button-modal m-auto" variant="warning" type="submit" :disabled="requestLoading">
          <i v-if="!requestLoading" class="las la-coins"></i>
          <spinner-loading v-else />
        </b-button>
      </b-form>
    </validationObserver>
  </div>
</template>

<script>
import mainServices from '@/services/main.js'
export default {
  props: {
    requestLoading: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      allServices: [],
      service_id: null
    }
  },
  methods: {
    collectPurchase () {
      this.$emit('collectPurchase', this.service_id)
    }
  },
  watch: {},
  created () {
    mainServices.getAllServices().then(response => {
      this.allServices = response.data.data.data
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
