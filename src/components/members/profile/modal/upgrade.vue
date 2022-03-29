<template>
  <b-container fluid>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)">
        <b-row>
          <b-form-group
                        class="col-md-12"
                        label="Select Package:"
                        label-for="Package"
          >
            <div>
              <select class="form-control" id="category" required  v-model="details.packageId">
                <option selected disabled>choose package</option>
                <option v-for="(i , key) in availablePackages" :key="key" :value="i.id">
                  {{ i.title }}
                </option>
              </select>
            </div>
          </b-form-group>
          <b-form-group class="col-md-6" label="Fees:" label-for="fees">
            <ValidationProvider name="fees" ref="fees" rules='required' v-slot="{ errors }" >
              <b-form-input type="number" v-model="details.fees" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
              <div class="invalid-feedback">
                <span>{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </b-form-group>
          <b-form-group class="col-md-6" label="Payment Type:" label-for="period">
            <div class="periodNumbers">
              <span :class="[{ 'shadow selectedNumber' : isSelected('cash')}]" @click="details.payment_method = 'cash'">
                Cash
              </span>
              <span :class="[{ 'shadow selectedNumber' : isSelected('visa')}]" @click="details.payment_method = 'visa'">
                Visa
              </span>
              <span :class="[{ 'shadow selectedNumber' : isSelected('vodafone_cash')}]" @click="details.payment_method = 'vodafone_cash'">
                Vodafone Cash
              </span>
            </div>
          </b-form-group>
        </b-row>
        <div>
          <b-row>
            <h4 class="col-12 mb-2 text-primary">Current Package: </h4>
          </b-row>
          <b-row class="px-2">
                <div class="col-lg-6 mb-2">
                  <b-row>
                    <b-col cols="5" class="text-black">Cost: </b-col>
                    <b-col cols="7">{{ parseFloat(packageInfoToUpgrade.cost) }} EGP</b-col>
                  </b-row>
                </div>
                <div class="col-lg-6 mb-2">
                  <b-row>
                    <b-col cols="5" class="text-black">Discount: </b-col>
                    <b-col cols="7">{{ parseFloat(packageInfoToUpgrade.discount) }} EGP</b-col>
                  </b-row>
                </div>
                <div class="col-lg-6 mb-2">
                  <b-row>
                    <b-col cols="5" class="text-black">After Discount: </b-col>
                    <b-col cols="7">{{ parseFloat(packageInfoToUpgrade.net) }} EGP</b-col>
                  </b-row>
                </div>
                <div class="col-lg-6 mb-2">
                  <b-row>
                    <b-col cols="5" class="text-black">Paid Amount: </b-col>
                    <b-col cols="7">{{ parseFloat(packageInfoToUpgrade.paid) }} EGP</b-col>
                  </b-row>
                </div>
                <div class="col-lg-6 mb-2">
                  <b-row>
                    <b-col cols="5" class="text-black">Remaining Amount: </b-col>
                    <b-col cols="7">{{ parseFloat(packageInfoToUpgrade.remaining) }} EGP</b-col>
                  </b-row>
                </div>
          </b-row>
        </div>
        <div v-if="newPackageUpgrade">
          <b-row>
            <h4 class="col-12 mb-2 text-primary">New Package: </h4>
          </b-row>
          <b-row class="px-2" >
            <div class="col-lg-6 mb-2">
              <b-row>
                <b-col cols="5" class="text-black">Cost: </b-col>
                <b-col cols="7">{{ parseFloat(newPackageUpgrade) }} EGP</b-col>
              </b-row>
            </div>
          </b-row>
        </div>
        <div v-if="newPackageUpgrade">
          <b-row>
            <h4 class="col-12 mb-2 text-primary">Total Due: <span class="font-weight-bold text-danger ml-2">{{ parseFloat(newPackageUpgrade) - parseFloat(packageInfoToUpgrade.paid) }} EGP</span></h4>
          </b-row>
        </div>
        <div class="d-flex align-items-center justify-content-end">
          <b-button v-if='loadingButton' class="btn btn-primary float-right" variant="primary" disabled>
            <b-spinner small type="grow"></b-spinner>
            loading...
          </b-button>
          <b-button v-else variant="primary" type="submit" >upgrade</b-button>
        </div>
      </form>
    </ValidationObserver>
  </b-container>
</template>

<script>
import { core } from '../../../../config/pluginInit'

export default {
  name: 'upgrade',
  props: {
    availablePackages: {
      type: Array
    },
    packageInfoToUpgrade: {
      type: Object
    }
  },
  watch: {
    'details.packageId' (value) {
      for (var x = 0; x < this.availablePackages.length - 1; x++) {
        if (this.availablePackages[x].id === value) {
          this.newPackageUpgrade = this.availablePackages[x].project[0].pivot.price
        }
      }
    }
  },
  data () {
    return {
      loadingButton: false,
      newPackageUpgrade: '',
      details: {
        fees: '',
        packageId: '',
        payment_method: 'cash'
      }
    }
  },
  mounted () {
    core.index()
  },
  methods: {
    isSelected (i) {
      // eslint-disable-next-line eqeqeq
      return i == this.details.payment_method
    },
    getFees (data) {
      this.newPackageUpgrade = data
    },
    onSubmit () {
      this.$emit('upgrade', { details: this.details }).then(() => {
        // console.log('upgraded')
      })
    }
  }
}
</script>

<style scoped>

</style>
