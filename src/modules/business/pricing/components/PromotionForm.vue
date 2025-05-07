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
              <b-form-radio v-for="(i, index) in allPromotionTypes" :key="index" class="custom-radio-color-checked" v-model="info.type" :aria-describedby="ariaDescribedby" name="allPromotionTypes" :value="i.value">
                {{ i.text }}
              </b-form-radio>
            </b-form-group>
          </b-col>

          <template v-if="info.type === 'discount'">
            <b-col md="4">
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

            <b-col md="8">
              <b-form-group class="custom-radio-inline" label="Promotion Type" v-slot="{ ariaDescribedby }">
                <b-form-radio class="custom-radio-color-checked" v-model="discount.discount_for" :aria-describedby="ariaDescribedby" name="discount_for" :value="'tickets'">All Tickets</b-form-radio>
                <b-form-radio class="custom-radio-color-checked" v-model="discount.discount_for" :aria-describedby="ariaDescribedby" name="discount_for" :value="'promotions'">All Promotions</b-form-radio>
                <b-form-radio class="custom-radio-color-checked" v-model="discount.discount_for" :aria-describedby="ariaDescribedby" name="discount_for" :value="'purchases'">All Purchases</b-form-radio>
              </b-form-group>
            </b-col>

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
            <b-col md="6">
              <b-form-group label="Description" label-for="Description" >
                <ValidationProvider name="Description" ref="Description" rules="required" v-slot="{ errors }">
                  <b-form-textarea
                    placeholder="Description..."
                    rows="1"
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
          </template>

          <template v-if="info.type !== 'discount'">

            <b-col md="12">
              <div class="w-100 d-flex justify-content-between align-items-center mb-2" style="gap: 8px" v-for="(ticket, key) in tickets" :key="key">
                <div style="flex:1">
                  <div class="d-flex align-items-center" style="gap:8px">
                    <div class="quantity">
                      <span class="btns">
                        <button  @click.prevent="ticket.count--" :disabled="ticket.count == 1">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.33333 8H12.6667" stroke="#181836" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                        </button>
                        <span>{{ ticket.count }}</span>
                        <button @click.prevent="ticket.count++">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 3.3335V12.6668" stroke="#181836" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M3.33333 8H12.6667" stroke="#181836" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                        </button>
                      </span>
                    </div>
                    <input-switch :id="`status-${key}`" :name="`status-${key}`" label="Unlimited" v-model="ticket.unlimited" />
                  <main-select
                    style="flex:1; margin:0 "
                    @input="selectData"
                    v-model="ticket.ticket_id"
                    :options="allTickets"
                    :reduce="(data) => data.id"
                    placeholder="--Select Ticket--"
                  >
                    <template #data="{data}">
                      <span class="d-flex gap-2 m-0 p-0 justify-content-between">
                        <span>{{ data.name }}</span>
                        <span class="d-flex gap-1">
                          <span v-if="data.discount_price">({{  data.discount_price }}{{ data.currency }})</span>
                          <span :class="`${data.discount_price ? 'text-decoration-line-through' : ''}`">({{  data.price }}{{ data.currency }})</span>
                        </span>
                      </span>
                    </template>
                    <template #selected-option="{data}">
                      <span>
                        {{ data.name }} - <span v-if="data.discount_price">({{  data.discount_price }}{{ data.currency }})  </span>
                        <span :class="`${data.discount_price ? 'text-decoration-line-through' : ''}`">({{  data.price }}{{ data.currency }})</span>
                      </span>
                    </template>
                  </main-select>
                  </div>
                </div>
                <div style="cursor: pointer" @click="removeTicket(key)" v-if="key !== 0">
                  <span>
                    <i class="las la-trash-alt font-size-22 text-danger"></i>
                  </span>
                </div>
              </div>
              <div class="d-flex justify-content-end">
               <span @click="addAnotherTicket" class="text-warning cursor-pointer"> + Add Another Ticket </span>
              </div>
            </b-col>

            <b-col md="12">
              <b-row class="d-flex align-item-center">
                <b-col md="6">
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
                <b-col md="2" class="d-flex align-items-center">
                  <input-switch id="has_discount" name="has_discount" label="Discount" v-model="prices.has_discount" />
                </b-col>
                <b-col md="4" >
                  <input-form
                    class="w-100"
                    :disabled="!prices.has_discount"
                    v-model="prices.discount_price"
                    placeholder="placeholder"
                    :validate="{ regex: /^\d{1,10}(\.\d{1,10})?$/, required: prices.has_discount ? true : false }"
                    name="discount_price"
                    :label="'Discount Price'"
                  />
                </b-col>
              </b-row>
            </b-col>

            <b-col md="3">
              <b-form-group label="Start date" label-for="Start date" >
                <flatPickr
                  :config="{ minDate: 'today' }"
                  :class="['form-control bg-white']"
                  v-model="info.start_date"
                  placeholder="Start date"
                />
              </b-form-group>
            </b-col>

            <b-col md="3">
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
              <b-form-group label="Description" label-for="Description" >
                <ValidationProvider name="Description" ref="Description" rules="required" v-slot="{ errors }">
                  <b-form-textarea
                    placeholder="Description..."
                    rows="1"
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

            <b-col md="12" v-if="info.type == 'buy_get'">
              <b-form-group class="custom-radio-inline" label="Get" v-slot="{ ariaDescribedby }">
                <b-form-radio class="custom-radio-color-checked" v-model="buyGet.buy_get_type" :aria-describedby="ariaDescribedby" name="buy_get_type" :value="'gift'">Gift</b-form-radio>
                <b-form-radio class="custom-radio-color-checked" v-model="buyGet.buy_get_type" :aria-describedby="ariaDescribedby" name="buy_get_type" :value="'ticket'">Ticket</b-form-radio>
                <b-form-radio class="custom-radio-color-checked" v-model="buyGet.buy_get_type" :aria-describedby="ariaDescribedby" name="buy_get_type" :value="'coupon'">Coupon</b-form-radio>
              </b-form-group>

              <input-form
                v-if="buyGet.buy_get_type == 'gift'"
                v-model="buyGet.gift"
                placeholder="ex: gift"
                :validate="'required|max:50'"
                name="Gift Name"
                :label="'Gift Name'"
                :limit="50"
              />

              <main-select
                v-if="buyGet.buy_get_type == 'ticket'"
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

             <main-select
              v-if="buyGet.buy_get_type == 'coupon'"
                labelTitle='Coupon'
                :validate="'required'"
                :name="`coupon`"
                placeholder="Pick coupon"
                :options="buyGet.allCoupons"
                label="name"
                :reduce="data => data.id"
                v-model="buyGet.get_coupons"
                :multiple="true"
              />
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

          </template>
        </b-row>

        <b-row>
          <b-col md="12" class="mt-4">
            <div class="d-flex justify-content-center">
              <b-button :class="`button-${typeOfModal == 'add' ? 'orange' : 'blue'}-modal`" type="submit">
                <i v-if="!requestLoading" :class="`las la-${typeOfModal == 'add' ? 'plus' : 'pen'}`"></i>
                <spinner-loading v-else></spinner-loading>
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
    typeOfModal: { type: String, default: 'add' },
    promotionDetails: { type: Object, default: () => {} },
    allCoupons: { type: Array, default: () => [] },
    allTickets: { type: Array, default: () => [] }
  },
  components: {
    flatPickr
  },
  data () {
    return {
      tickets: [{
        ticket_id: '',
        unlimited: 0,
        count: 1
      }],
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
      info: {
        all: '',
        id: null,
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
      buyGet: {
        buy_get_type: '',
        gift: '',
        get_tickets: [],
        get_coupons: []
      }
    }
  },
  methods: {
    removeTicket (key) {
      this.tickets.splice(key, 1)
    },
    savePromotion () {
      let obj = {}
      if (this.info.type === 'discount') {
        obj = {
          ...this.info,
          ...this.discount
        }
      } else {
        obj = {
          name: this.info.name,
          type: this.info.type,
          offer_title: this.info.offer_title,
          start_date: this.info.start_date,
          end_date: this.info.end_date,
          description: this.info.description,
          conditions: this.info.conditions,
          requirements: this.info.requirements,
          unlimited: this.info.unlimited,
          payment_unlimited: this.info.payment_unlimited,
          ...this.prices,
          tickets: this.tickets
        }
        if (!this.info.payment_unlimited) {
          obj.payment_limit = this.info.payment_limit
        }

        if (!this.info.unlimited) {
          obj.validity_days = this.info.validity_days
        }

        if (this.info.type === 'buy_get') {
          obj.buy_get_type = this.buyGet.buy_get_type
          // eslint-disable-next-line eqeqeq
          if (this.buyGet.buy_get_type == 'gift') {
            obj.gift = this.buyGet.gift
          // eslint-disable-next-line eqeqeq
          } else if (this.buyGet.buy_get_type == 'tickets') {
            obj.get_tickets = this.buyGet.get_tickets
          } else {
            obj.get_coupons = this.buyGet.get_coupons
          }
        }
      }

      if (this.typeOfModal === 'add') {
        this.$emit('addPromotion', { ...obj })
      } else if (this.typeOfModal === 'edit') {
        this.$emit('editPromotion', { ...obj, _method: 'patch', id: this.info.id })
      }
    },
    addAnotherTicket () {
      this.tickets.push({
        ticket_id: '',
        unlimited: 0,
        count: 1
      })
    },
    fillData () {
      if (Object.keys(this.promotionDetails).length !== 0) {
        this.info = {
          id: this.promotionDetails.id,
          type: this.promotionDetails.type,
          offer_title: this.promotionDetails.name,
          start_date: this.promotionDetails.start_date,
          end_date: this.promotionDetails.end_date,
          description: this.promotionDetails.description,
          conditions: this.promotionDetails.conditions,
          requirements: this.promotionDetails.requirements,
          unlimited: this.promotionDetails.unlimited,
          payment_unlimited: this.promotionDetails.payment_unlimited,
          validity_days: this.promotionDetails.validity_days,
          payment_limit: this.promotionDetails.payment_limit
        }
        this.discount = {
          discount_ratio: this.promotionDetails.discount_ratio,
          discount_for: this.promotionDetails.discount_for
        }
        this.prices = {
          price: this.promotionDetails.price,
          has_discount: this.promotionDetails.has_discount,
          discount_price: this.promotionDetails.discount_price,
          currency: this.promotionDetails.currency
        }
        this.buyGet = {
          buy_get_type: this.promotionDetails.buy_get_type,
          gift: this.promotionDetails.gift,
          get_tickets: this.promotionDetails.tickets || [],
          get_coupons: []
        }
      }
    }
  },
  watch: {
    promotionDetails () {
      this.fillData()
    }
  },
  created () {
    this.fillData()
  }
}
</script>
<style lang="scss" scoped>
.input-group .input-group-text {
  background: transparent !important;
  border: 1px solid #d7dbda !important;
}
</style>
