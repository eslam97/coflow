<template>
    <div>
        <!-- tabs -->
        <div class="mb-3 mt-0 d-flex justify-content-between align-items-center gap-2">
            <div  :class="['w-100 text-center promotion_button py-2 cursor-pointer', { 'active-tab' : tab =='tickets'}]" @click="tab = 'tickets'">
              Tickets
            </div>
            <div :class="['w-100 text-center promotion_button py-2 cursor-pointer', { 'active-tab' : tab == 'copouns'}]" @click="tab = 'copouns'">
              Copouns
            </div>
        </div>

        <div v-if="tab == 'tickets'">
            <validationObserver v-slot="{ handleSubmit }">
                <b-form @submit.prevent="handleSubmit(addPurchase)">
                  <b-row>
                    <b-col md="12">
                      <span>Purchase</span>
                      <main-select
                        @input="selectData"
                        v-model="purchase.purchase"
                        :options="purchaseOptions"
                        placeholder="--Select--"
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
                    </b-col>

                    <b-col md="12" class="quantity">
                      <span>Quantity</span>
                      <span class="btns">
                        <button @click.prevent="purchase.quantity--" :disabled="purchase.quantity == 1">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.33333 8H12.6667" stroke="#181836" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                        </button>
                        <span>{{ purchase.quantity }}</span>
                        <button @click.prevent="purchase.quantity++">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 3.3335V12.6668" stroke="#181836" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M3.33333 8H12.6667" stroke="#181836" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                        </button>
                      </span>
                    </b-col>

                    <b-col md="12">
                      <span>Add-Ons (optional)</span>
                      <main-select
                        v-model="purchase.addOns"
                        :options="addOnsOptions"
                        label="key"
                        multiple
                        placeholder="--Select--"
                      />
                    </b-col>

                  </b-row>
                  <!-- {{ purchaseOptions }} -->
                  <div v-if="purchase.purchase">
                    <h4>Purchase Invoice</h4>
                    <div class="purchase-invoice">
                      <div v-if="purchase.purchase" class="item">
                        <span>
                          <span class="number">{{ quantity }}</span>
                          {{ purchase.purchase.name }}
                        </span>
                        <!-- {{ purchase.purchase.discount_price }} -->
                        <span class="number">+{{ purchase.quantity * purchase.purchase.discount_price ? purchase.purchase.discount_price :purchase.purchase.price }} EGP</span>
                      </div>
                      <template v-if="purchase.addOns">
                        <div v-for="(item, index) in purchase.addOns" :key="index" class="item">
                          <span>
                            <span class="number">{{ quantity }}</span>
                            {{ item.name }}
                          </span>
                          <span class="number">+{{ purchase.quantity * item.price }} EGP</span>
                        </div>
                      </template>
                      <div v-if="purchase.coupon" class="item">
                        <span class="coupon-text">Coupon Discount</span>
                        <span class="number">-{{ couponAmount }} EGP</span>
                      </div>

                      <div class="item total">
                        <span>Total Amount</span>
                        <span class="number">{{ totalAmount - couponAmount }} EGP</span>
                      </div>
                    </div>
                  </div>

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
        <div v-else>

        </div>
    </div>
</template>
<script>
import ticketsServices from '@/modules/business/pricing/services/tickets.services'

export default {
  props: {
    requestLoading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      tab: 'tickets',
      purchase: {
        purchase: '',
        quantity: 1,
        addOns: [],
        coupon: '',
        user_id: this.$route.params.id,
        promotion_id: '',
        coupon_id: '',
        ticket_id: ''
      },
      purchaseOptions: [],
      addOnsOptions: []
    }
  },
  methods: {
    selectData (data) {
      this.purchase.ticket_id = data.id
    },
    getAllTicketsLimit () {
      this.requestLoading = true
      ticketsServices.getAllTicketsLimit().then(res => {
        this.purchaseOptions.push(...res.data.data.data)
      })
    },

    getPurchaseOptions () {
      this.purchaseOptions = []
      this.getAllTicketsLimit()
    },
    addPurchase () {
      this.$emit('addGift', this.purchase)
    }
  },
  watch: {
    'purchase.purchase': (val) => {
      console.log('val -> ', val.id)
      this.purchase.ticket_id = val.id
      this.addOnsOptions = val.addons || []
    }
  },
  computed: {
    quantity () {
      return this.purchase.quantity > 1 ? `${this.purchase.quantity}x ` : ''
    },
    totalAmount () {
      let total = 0
      if (this.purchase.purchase) {
        if (this.purchase.purchase.discount_price) {
          total += this.purchase.purchase.discount_price * this.purchase.quantity
        } else {
          total += this.purchase.purchase.price * this.purchase.quantity
        }
      }
      if (this.purchase.addOns) {
        total += this.purchase.addOns.reduce((accumulator, currentValue) => {
          return accumulator + (currentValue.price * this.purchase.quantity)
        }, 0)
      }
      // if (this.purchase.coupon) total -= total * this.purchase.coupon.coupon * 0.01
      return total
    },
    couponAmount () {
      return this.purchase.coupon.coupon ? this.totalAmount * this.purchase.coupon.coupon * 0.01 : 0
    }
  },
  created () {
    this.getPurchaseOptions()
  }
}
</script>
<style lang="scss">
</style>
