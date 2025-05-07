<template>
  <div>
    <validationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(submitForm)">
        <b-row>
          <b-col md="12">
            <input-form
              v-model="coupon.discount"
              placeholder="Enter Discount"
              validate="required|numeric|between:0,100"
              name="discount"
              label="Discount"
            />
          </b-col>

          <b-col md="12">

            <span class="d-flex gap-1 mb-2">
              Applies On

              <b-form-radio
                name="appliesOn"
                value="tickets"
                v-model="coupon.appliesOn"
                class="custom-checkbox-color-check mb-2 mr-sm-2 mb-sm-0"
                color="warning"
              >
                All Tickets
              </b-form-radio>

              <b-form-radio
                name="appliesOn"
                value="promotions"
                v-model="coupon.appliesOn"
                class="custom-checkbox-color-check mb-2 mr-sm-2 mb-sm-0"
                color="warning"
              >
                All Promotions
              </b-form-radio>

              <b-form-radio
                name="appliesOn"
                value="purchases"
                v-model="coupon.appliesOn"
                class="custom-checkbox-color-check mb-2 mr-sm-2 mb-sm-0"
                color="warning"
              >
                All Purchases
              </b-form-radio>
            </span>
            <main-select
              v-if="coupon.appliesOn !== 'purchases'"
              v-model="coupon.appliesOnGroup"
              :options="appliesOnOptions"
              multiple
              label="key"
              placeholder="--Select--"
            />
          </b-col>

          <b-col md="12">
            <validation-provider
              #default="{ errors }"
              :name="`Validity`"
              :rules="{ required: coupon.unlimited == 0 }"
              class="flex-grow-1"
            >
              <b-form-group>
                <label for="validity_days" class="d-flex justify-content-between">
                  <span>Validity</span>
                  <input-switch id="unlimited" name="unlimited" label="Unlimited" v-model="coupon.unlimited" />
                </label>
                <b-input-group append="Day(s)">
                  <b-form-input
                    id="validity_days"
                    :disabled="+coupon.unlimited == 1"
                    v-model="coupon.validity_days"
                    placeholder="Placeholder"
                    :class="[{ 'is-invalid': errors.length > 0}]"
                  />
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
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
import promotionsServices from '../services/promotions.services'
import ticketsServices from '../services/tickets.services'
export default {
  props: {
    requestLoading: {
      type: Boolean,
      default: false
    },
    details: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      coupon: {
        unlimited: 0,
        validity_days: '',
        purchase: '',
        appliesOn: '',
        appliesOnGroup: [],
        discount: ''
      },
      allTickets: [],
      allPurchases: [],
      allPromotions: []
    }
  },
  watch: {
    'coupon.appliesOn' (newValue) {
      if (newValue === 'purchases') {
        this.coupon.appliesOnGroup = []
      } else if (newValue === 'promotions') {
        this.coupon.appliesOnGroup = this.coupon.appliesOn.filter(item => item.type !== 'promotions')
      } else if (newValue === 'tickets') {
        this.coupon.appliesOnGroup = this.coupon.appliesOn.filter(item => item.type !== 'tickets')
      }
    }
  },
  methods: {
    submitForm () {
      // console.log('submitForm', this.coupon)
      this.$emit('submitForm', this.coupon)
    }
  },
  computed: {
    appliesOnOptions () {
      const { appliesOn } = this.coupon

      if (appliesOn === 'tickets') {
        return [...this.allPromotions, ...this.allPurchases]
      }
      if (appliesOn === 'promotions') {
        return [...this.allTickets, ...this.allPurchases]
      }
      if (appliesOn === 'purchases') {
        return [...this.allTickets, ...this.allPromotions]
      }
      return [...this.allTickets, ...this.allPromotions, ...this.allPurchases]
    }
  },
  created () {
    ticketsServices.getAllTicketsLimit().then((response) => {
      this.allTickets = response.data.data.data.map((ticket) => {
        return { value: ticket.id, key: ticket.name, type: 'tickets' }
      })
    })

    promotionsServices.getAllPromotions().then((response) => {
      this.allPromotions = response.data.data.current.data.map((promotion) => {
        return { value: promotion.id, key: promotion.name, type: 'promotions' }
      })
    })

    if (this.details) {
      this.coupon.discount = this.details.discount_ratio
      // this.coupon.unlimited = this.details.unlimited
      this.coupon.validity_days = this.details.validity_days
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
