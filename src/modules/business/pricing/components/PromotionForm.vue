<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(savePromotion)">
        <b-row>
          <b-col md="12">
            <input-form
              v-model="info.name"
              placeholder="Monthly Discount"
              :validate="'required|max:50'"
              name="Offer Name"
              :label="'Offer Name'"
              :limit="50"
            />
          </b-col>
          <b-col md="12">
            <b-form-group class="custom-radio-inline" label="Promotion Type" v-slot="{ ariaDescribedby }">
              <b-form-radio v-for="(i, index) in allPromotionTypes" :key="index" class="custom-radio-color-checked" v-model="info.type" :aria-describedby="ariaDescribedby" name="info.type" :value="i.value">{{ i.text }}</b-form-radio>
            </b-form-group>
          </b-col>

          <template v-if="info.type === 'discount'">
            <b-col md="3">
              <b-form-group
                :label="`Discount Percentage`"
                :label-for="`discount_ratio`"
                class="position-relative"
              >
                <validation-provider
                  #default="{ errors }"
                  :name="`discount_ratio`"
                  :rules="'required|numeric'"
                  class="flex-grow-1"
                >
                  <b-input-group append="%">
                    <b-form-input
                      id="mm"
                      v-model="discount.discount_ratio"
                      :class="[{ 'is-invalid': errors.length > 0 }]"
                      :placeholder="'Enter Number'"
                    />
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col md="9" class="d-flex align-items-end">
              <b-form-group class="custom-radio-inline" v-slot="{ ariaDescribedby }">
                <b-form-radio v-for="(i, index) in allDiscountFor" :key="index" class="custom-radio-color-checked" v-model="discount.discount_for" :aria-describedby="ariaDescribedby" name="discount.discount_for" :value="i.value">{{ i.text }}</b-form-radio>
              </b-form-group>
            </b-col>
          </template>

          <template v-if="info.type !== 'discount'">
            <b-col md="6" >
              <validation-provider
                #default="{ errors }"
                :name="`price`"
                :rules="{ required: true, regex: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/ }"
                class="flex-grow-1"
              >
                <b-form-group :label="'Price'">
                  <b-input-group>
                    <b-form-input
                      v-model="prices.price"
                      placeholder="Placeholder"
                      :class="[{ 'is-invalid': errors.length > 0 }]"
                    />
                    <b-input-group-append>
                      <b-form-select
                        class="h-100"
                        v-model="prices.currency"
                        :options="[{ value: 'EGP', text: 'EGP' }, { value: '$', text: '$' }]"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col md="3" class="d-flex align-items-center">
              <input-switch id="has_discount" name="has_discount" label="Discount" v-model="prices.has_discount" />
            </b-col>
            <b-col md="3" >
              <input-form
                :disabled="!prices.has_discount"
                v-model="prices.discount_price"
                placeholder="placeholder"
                :validate="{ regex: /^\d{1,10}(\.\d{1,10})?$/, required: prices.has_discount ? true : false }"
                name="discount_price"
                :label="'Discount Price'"
              />
            </b-col>
          </template>

          <template v-if="info.type === 'buy_get'">
            <b-col md="12">
              <b-form-group class="custom-radio-inline" label="GET" v-slot="{ ariaDescribedby }">
                <b-form-radio v-for="(i, index) in allBuyGetType" :key="index" class="custom-radio-color-checked" v-model="buyGet.buy_get_type" :aria-describedby="ariaDescribedby" name="buyGet.buy_get_type" :value="i.value">{{ i.text }}</b-form-radio>
              </b-form-group>
            </b-col>

            <b-col md="12" v-if="buyGet.buy_get_type == 'gift'">
              <input-form
                v-model="buyGet.gift"
                placeholder="placeholder"
                :validate="'required|max:50'"
                name="Gift Information"
                :label="'Gift Information'"
                :limit="50"
              />
            </b-col>
            <b-col md="12" v-if="buyGet.buy_get_type == 'coupon'">
              <main-select
                labelTitle='Coupon'
                :validate="'required'"
                :name="`coupon`"
                placeholder="Pick coupon"
                :options="allCoupons"
                label="name"
                :reduce="data => data.id"
                v-model="buyGet.get_coupons"
                :multiple="true"
              />
            </b-col>
            <b-col md="12" v-if="buyGet.buy_get_type == 'ticket'">
              <main-select
                labelTitle='Ticket'
                :validate="'required'"
                :name="`ticket`"
                placeholder="Pick ticket"
                :options="allTickets"
                label="name"
                :reduce="data => data.id"
                v-model="buyGet.get_tickets"
                :multiple="true"
              />
            </b-col>
          </template>

          <b-col md="6">
            <b-form-group label="Start date" label-for="Start date" >
              <flatPickr
                :config="{ minDate: 'today' }"
                :class="['form-control bg-white']"
                v-model="info.start_date"
                placeholder="Start date"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="End date" label-for="End date" >
              <flatPickr
                :config="{ minDate: info ? info.start_date : ''}"
                :class="['form-control bg-white']"
                v-model="info.end_date"
                placeholder="End date"
              />
            </b-form-group>
          </b-col>

          <b-col md="6">
            <validation-provider
              #default="{ errors }"
              :name="`Validity`"
              :rules="{ required: info.unlimited == 0 }"
              class="flex-grow-1"
            >
              <b-form-group>
                <label for="validity_days" class="d-flex justify-content-between">
                  <span>Validity</span>
                  <input-switch id="unlimited" name="unlimited" label="Unlimited" v-model="info.unlimited" />
                </label>
                <b-input-group append="Day(s)">
                  <b-form-input
                    id="validity_days"
                    :disabled="info.unlimited == true"
                    v-model="info.validity_days"
                    placeholder="Placeholder"
                    :class="[{ 'is-invalid': errors.length > 0}]"
                  />
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <b-col md="6">
            <validation-provider
              #default="{ errors }"
              :name="`Payment limit`"
              :rules="{ required: info.payment_unlimited == 0 }"
              class="flex-grow-1"
            >
              <b-form-group>
                <label for="payment_limit" class="d-flex justify-content-between">
                  <span>Payment limit</span>
                  <input-switch id="payment_unlimited" name="payment_unlimited" label="Payment Unlimited" v-model="info.payment_unlimited" />
                </label>
                <b-form-input
                  id="payment_limit"
                  :disabled="info.payment_unlimited == true"
                  v-model="info.payment_limit"
                  placeholder="Placeholder"
                  :class="[{ 'is-invalid': errors.length > 0}]"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>

          <b-col md="12">
            <b-form-group label="Description" label-for="Description" >
              <ValidationProvider name="Description" ref="Description" rules="required" v-slot="{ errors }">
                <b-form-textarea
                  placeholder="Description..."
                  rows="2"
                  v-model="info.description"
                  :class="(errors.length > 0 ? ' is-invalid' : '')"
                ></b-form-textarea>
                <div class="d-flex justify-content-between">
                  <small class="text-danger">{{ errors[0] }}</small>
                  <small :class="[{ 'text-danger': info.description.length > 200 }]">{{ (200 > info.description.length) ? 200 - info.description.length : 0 }} characters</small>
                </div>
              </ValidationProvider>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Conditions" label-for="Conditions" >
              <ValidationProvider name="Conditions" ref="Conditions" rules="required" v-slot="{ errors }">
                <b-form-textarea
                  placeholder="Conditions..."
                  rows="2"
                  v-model="info.conditions"
                  :class="(errors.length > 0 ? ' is-invalid' : '')"
                ></b-form-textarea>
                <div class="d-flex justify-content-between">
                  <small class="text-danger">{{ errors[0] }}</small>
                  <small :class="[{ 'text-danger': info.conditions.length > 200 }]">{{ (200 > info.conditions.length) ? 200 - info.conditions.length : 0 }} characters</small>
                </div>
              </ValidationProvider>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Requirements" label-for="Requirements" >
              <ValidationProvider name="Requirements" ref="Requirements" rules="required" v-slot="{ errors }">
                <b-form-textarea
                  placeholder="Requirements..."
                  rows="2"
                  v-model="info.requirements"
                  :class="(errors.length > 0 ? ' is-invalid' : '')"
                ></b-form-textarea>
                <div class="d-flex justify-content-between">
                  <small class="text-danger">{{ errors[0] }}</small>
                  <small :class="[{ 'text-danger': info.requirements.length > 200 }]">{{ (200 > info.requirements.length) ? 200 - info.requirements.length : 0 }} characters</small>
                </div>
              </ValidationProvider>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="12" class="mt-4">
            <div class="d-flex justify-content-center">
              <b-button class="button-orange-modal" type="submit" v-if="!requestLoading">
                <i class="las la-plus"></i>
              </b-button>
              <b-button class="button-orange-modal" v-else>
                <spinner-loading ></spinner-loading>
              </b-button>
            </div>
          </b-col>
        </b-row>
      </b-form>
    </ValidationObserver>
  </div>
</template>
<script>
import flatPickr from 'vue-flatpickr-component'

export default {
  props: {
    requestLoading: { type: Boolean, default: false },
    allCoupons: { type: Array, default: () => [] },
    allTickets: { type: Array, default: () => [] }
  },
  components: {
    flatPickr
  },
  data () {
    return {
      allPromotionTypes: [
        { text: 'Discount', value: 'discount' },
        { text: 'Package', value: 'package' },
        { text: 'Buy & Get', value: 'buy_get' }
      ],
      allDiscountFor: [
        { text: 'All Tickets', value: 'tickets' },
        { text: 'All Promotions ', value: 'promotions' },
        { text: 'All Purchases', value: 'purchases' }
      ],
      allBuyGetType: [
        { text: 'Gift', value: 'gift' },
        { text: 'Coupon', value: 'coupon' },
        { text: 'Ticket', value: 'ticket' }
      ],
      info: {
        type: 'discount',
        offer_title: '',
        start_date: '',
        end_date: '',
        description: '',
        conditions: '',
        requirements: '',
        unlimited: 0,
        payment_unlimited: 0,
        validity_days: 0,
        payment_limit: 0
      },
      discount: {
        discount_ratio: '',
        discount_for: ''
      },
      prices: {
        price: '',
        has_discount: 0,
        discount_price: '',
        currency: 'EGP'
      },
      packages: {
        package: '',
        package_price_egp: '',
        price_euro: '',
        price_dollar: '',
        discount_price_egp: '',
        discount_price_dollar: '',
        discount_price_euro: ''
      },
      buyGet: {
        buy_get_type: '',
        gift: '',
        get_tickets: [],
        get_coupons: []
      }
    }
  },
  methods: {
    savePromotion () {
      let obj = {}
      this.info.unlimited = this.info.unlimited === true ? 1 : 0
      this.info.payment_unlimited = this.info.payment_unlimited === true ? 1 : 0

      if (this.info.type === 'discount') {
        obj = { ...this.info, ...this.discount }
      } else if (this.info.type === 'package') {
        obj = { ...this.info, ...this.prices }
      } else {
        obj = { ...this.info, ...this.prices, ...this.buyGet }
      }
      this.$emit('savePromotion', obj)
    }
  },
  computed: {
  },
  created () {
  }
}
</script>
<style lang="scss" scoped>
.input-group .input-group-text {
  background: transparent !important;
  border: 1px solid #d7dbda !important;
}
</style>
