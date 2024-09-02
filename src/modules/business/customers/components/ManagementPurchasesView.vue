<template>
  <div>
    <validationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(addPurchase)">
        <b-row>
          <b-col md="12">
            <span>Purchase</span>
            <main-select
              v-model="purchase.purchase"
              :options="purchaseOptions"
              label="key"
              placeholder="--Select--"
            />
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
          <b-col md="12">
            <span>Coupon (optional)</span>
            <main-select
              v-model="purchase.coupon"
              :options="couponOptions"
              label="key"
              :clearable="true"
              placeholder="--Select--"
            />
          </b-col>
        </b-row>

        <div v-if="purchase.purchase">
          <h3>Purchase Invoice</h3>
          <div class="purchase-invoice">
            <div v-if="purchase.purchase" class="item">
              <span>
                <span class="number">{{ quantity }}</span>
                {{ purchase.purchase.name }}
              </span>
              <span class="number">+{{ purchase.quantity * purchase.purchase.price }} EGP</span>
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
      purchase: {
        purchase: '',
        quantity: 1,
        addOns: '',
        coupon: ''
      },
      purchaseOptions: [
        { value: 1, key: 'Silver Ticket (400EGP)', name: 'Silver Ticket', price: 400 },
        { value: 2, key: 'GOLD Ticket (500EGP)', name: 'GOLD Ticket', price: 500 },
        { value: 3, key: 'Platinum Ticket (600EGP)', name: 'Platinum Ticket', price: 600 }
      ],
      addOnsOptions: [
        { value: 1, key: 'Name1 (20EGP)', name: 'Name1', price: 20 },
        { value: 2, key: 'Name2 (40EGP)', name: 'Name2', price: 40 },
        { value: 3, key: 'Name3 (50EGP)', name: 'Name3', price: 50 }
      ],
      couponOptions: [
        { value: 1, key: 'Coupon 1 - 10%', coupon: 10 },
        { value: 2, key: 'Coupon 2 - 20%', coupon: 20 },
        { value: 3, key: 'Coupon 3 - 25%', coupon: 25 }
      ]
    }
  },
  methods: {
    addPurchase () {
      this.$emit('addPurchase', { phoneNumber: this.phoneNumber })
    }
  },
  watch: {},
  computed: {
    quantity () {
      return this.purchase.quantity > 1 ? `${this.purchase.quantity}x ` : ''
    },
    totalAmount () {
      let total = 0
      if (this.purchase.purchase) total += this.purchase.purchase.price * this.purchase.quantity
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
  }
}
</script>

<style lang="scss" scoped>
.quantity {
  display: flex;
  justify-content: space-between;
  color: #181836;
  .btns {
    border: 1px solid #E3E4E8;
    border-radius: 6px;
    overflow: hidden;
    button {
      background-color: #F4B860;
      border: none;
      padding: 6px 12px;
    }
    span {
      padding: 6px 12px;
    }
  }
}
.purchase-invoice {
  background-color: #F0F0F0;
  border-radius: 16px;
  padding: 16px;
  .item {
    display: flex;
    justify-content: space-between;
    &.total {
      border-top: 1px solid #e0e0e0;
      padding-top: 4px;
      margin-top: 4px;
    }

    span {
      color: #181935;
    }
    .coupon-text {
      color: #74798C;
    }
    .number {
      color: #FE9E12;
    }
  }
}
</style>
