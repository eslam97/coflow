<template>
  <div>
    <h5 class="mb-2 text-center">{{ info.name }}</h5>

    <validationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(refundPurchase)">
        <b-row>
          <b-col md="12" class="mb-3 position-relative">
            <div class="d-flex align-items-center position-absolute" style="top: 0; right: 18px;">
              <label class="m-0 text-black">Full Amount</label>
              <changeStatus
              class="ml-1"
              :id="'amount'"
              :status="fullAmount"
              :statusKeyId="'amount'"
               @changeStatus="changeStatus"
              />
            </div>

            <validation-provider
            #default="{ errors }"
            :name="`Amount`"
            :rules="{ required: !fullAmount, regex: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/ }"
            class="flex-grow-1">

          <b-form-group :label="'Amount'"
          ><b-input-group append="EGP">
            <b-form-input
                v-model="amount"
                placeholder="Enter The Amount"
                :class="[{ 'is-invalid': errors.length > 0 }]"/>
          </b-input-group>
            <small class="text-danger">{{ errors[0] }}</small>
          </b-form-group>
        </validation-provider>
          </b-col>
        </b-row>
        <b-button class="button-modal m-auto" variant="danger" type="submit" :disabled="requestLoading">
          <i v-if="!requestLoading" class="las la-undo-alt"></i>
          <spinner-loading v-else></spinner-loading>
        </b-button>
      </b-form>
    </validationObserver>

  </div>
</template>

<script>
import changeStatus from '@/components/table/changeStatus.vue'
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
  components: {
    changeStatus
  },
  data () {
    return {
      amount: null,
      fullAmount: false
    }
  },
  methods: {
    changeStatus (data) {
      this.fullAmount = data.payload.status === 'active'
    },
    refundPurchase () {
      this.$emit('refundPurchase', this.fullAmount ? this.info.final_price : this.amount)
    }
  },
  watch: {},
  created () {
  }
}
</script>

<style lang="scss" scoped>
</style>
