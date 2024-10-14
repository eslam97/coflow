<template>
  <div>
    <validationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(submitForm)">
        <b-row>
          <b-col md="12">
            <input-form
              v-model="coupon.discount"
              placeholder="Enter Discount"
              validate="required|numeric"
              name="discount"
              label="Discount"
            />
          </b-col>

          <b-col md="12">
            <span class="d-flex gap-1">
              Applies On
              <b-form-checkbox
                type="checkbox"
                v-model="appliesOnAllTickets"
                class="custom-checkbox-color-check mb-2 mr-sm-2 mb-sm-0"
                color="warning"
              >
                All Tickets
              </b-form-checkbox>
              <b-form-checkbox
                type="checkbox"
                v-model="appliesOnAllPromotions"
                class="custom-checkbox-color-check mb-2 mr-sm-2 mb-sm-0"
                color="warning"
              >
                All Promotions
              </b-form-checkbox>
              <b-form-checkbox
                type="checkbox"
                v-model="appliesOnAllPurchases"
                class="custom-checkbox-color-check mb-2 mr-sm-2 mb-sm-0"
                color="warning"
              >
                All Purchases
              </b-form-checkbox>
            </span>
            <main-select
              v-model="coupon.appliesOn"
              :options="appliesOnOptions"
              label="key"
              placeholder="--Select--"
            />
          </b-col>
        </b-row>

        <b-row>
          <b-col md="12" class="mt-4">
            <div class="d-flex justify-content-center">
              <b-button class="button-orange-modal" type="submit" v-if="!requestLoading">
                <i class="las la-plus"></i>
              </b-button>
              <b-button class="button-orange-modal" v-else>
                <spinner-loading></spinner-loading>
              </b-button>
            </div>
          </b-col>
        </b-row>
      </b-form>
    </validationObserver>
  </div>
</template>
<script>

export default {
  props: {
    requestLoading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      coupon: {
        purchase: '',
        appliesOn: '',
        appliesOnAllTickets: false,
        appliesOnAllPromotions: false,
        appliesOnAllPurchases: false,
        addOns: '',
        coupon: ''
      },
      appliesOnOptions: [
        { value: 1, key: 'Ticket Name1' },
        { value: 2, key: 'Ticket Name2' },
        { value: 3, key: 'Offer Name1' },
        { value: 4, key: 'Offer Name2' }
      ]
    }
  },
  methods: {
    submitForm () {
      this.$emit('submitForm', this.coupon)
    }
  },
  watch: {},
  computed: {},
  created () {
  }
}
</script>

<style lang="scss" scoped>
</style>
