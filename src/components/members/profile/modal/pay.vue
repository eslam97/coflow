<template>
  <b-container fluid>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)">
        <b-row>
          <b-form-group class="col-md-12" label="Amount:" label-for="value">
                        <ValidationProvider name="value" ref="value" :rules="'required|max_value:'+remainingAmount" v-slot="{ errors }">
                          <b-form-input v-model="value" type="text" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                          <div class="invalid-feedback">
                            <span>{{ errors[0] }}</span>
                          </div>
                        </ValidationProvider>
                      </b-form-group>
          <b-form-group class="col-md-12" label="Payment Type:" label-for="period">
                      <div class="periodNumbers">
                        <span :class="[{ 'shadow selectedNumber' : isSelected('cash')}]" @click="payment_method = 'cash'">
                          Cash
                        </span>
                        <span :class="[{ 'shadow selectedNumber' : isSelected('visa')}]" @click="payment_method = 'visa'">
                          Visa
                        </span>
                        <span :class="[{ 'shadow selectedNumber' : isSelected('vodafone_cash')}]" @click="payment_method = 'vodafone_cash'">
                          Vodafone Cash
                        </span>
                      </div>
                    </b-form-group>
        </b-row>
        <div class="d-flex align-items-center justify-content-end">
          <b-button variant="primary" type="submit" v-if="!loadingPay">pay</b-button>
          <b-button variant="primary" v-else><spinner-loading text="Loading" /> </b-button>
        </div>
      </form>
    </ValidationObserver>
  </b-container>
</template>

<script>
import { core } from '../../../../config/pluginInit'

export default {
  name: 'pay',
  props: ['remainingAmount'],
  data () {
    return {
      value: '',
      payment_method: 'cash',
      loadingPay: false
    }
  },
  mounted () {
    core.index()
  },
  methods: {
    isSelected (i) {
      // eslint-disable-next-line eqeqeq
      return i == this.payment_method
    },
    onSubmit () {
      this.loadingPay = true
      this.$emit('pay', { value: this.value, payment_method: this.payment_method })
    }
  }
}
</script>

<style scoped>

</style>
