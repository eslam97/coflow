<template>
  <div>
    <validationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(addTicket)">
        <b-row>
          <b-col md="4" class="mb-3">
            <input-form
                v-model="ticket.name"
                placeholder="Ticket Name"
                :validate="'required'"
                name="Ticket name"
                :label="'Ticket Name'"
            />
          </b-col>
          <b-col md="8" class="mb-3">
            <input-form
                v-model="ticket.details"
                placeholder="Write a brief description"
                :validate="'required'"
                name="Ticket details"
                :label="'Details'"
            />
          </b-col>
          <b-col md="4" class="mb-3">
            <validation-provider
                #default="{ errors }"
                :name="`EGP price`"
                :rules="'required|numeric'"
                class="flex-grow-1"
            >
              <b-form-group :label="'Price'"><b-input-group append="EGP">
                <b-form-input
                    v-model="ticket.price_egp"
                    placeholder="000.00"
                    :class="[{ 'is-invalid': errors.length > 0 }]"
                />
              </b-input-group></b-form-group>
            </validation-provider>
          </b-col>
          <b-col md="4" class="mb-5 pt-4">
            <b-form-checkbox
                type="checkbox"
                id="checkbox"
                v-model="selected"
                label="Discounted Price"
                class="custom-checkbox-color-check" color="warning"
            ><span class="font-size-12 text-primary"> Discounted Price </span>
            </b-form-checkbox>
          </b-col>
          <b-col md="4" class="mb-3">
            <input-form
                v-model="ticket.discount_price_egp"
                placeholder="000.00"
                :disabled="!selected"
                :validate="selected ? 'required': ''"
                name="Discounted EGP price"
                :label="'Discounted Price'"
            />
          </b-col>
          <b-col md="12" class="mb-3">
            <validation-provider
                #default="{ errors }"
                :name="`Conditions`"
                :rules="'required'"
                class="flex-grow-1"
            >
              <b-form-group label="Conditions">
                <b-form-textarea
                    v-model="ticket.conditions"
                    placeholder="Write your conditions in bullet points"
                    :validate="'required'"
                    rows="1"
                    :class="[{ 'is-invalid': errors.length > 0 }]"
                />
              </b-form-group>
            </validation-provider>
          </b-col>
        </b-row>
        <b-row v-if="typeOfModal != 'view'">
          <b-col md="12" class="mt-4">
            <div class="d-flex justify-content-center" v-if="typeOfModal == 'add'">
              <b-button class="button-orange-modal" type="submit" v-if="!requestLoading">
                <i class="las la-plus"></i>
              </b-button>
              <b-button class="button-orange-modal" v-else>
                <spinner-loading></spinner-loading>
              </b-button>
            </div>
            <div class="d-flex justify-content-center" v-if="typeOfModal == 'edit'">
              <b-button class="button-blue-modal" type="submit" v-if="!requestLoading">
                <i class="las la-pen"></i>
              </b-button>
              <b-button class="button-blue-modal" v-else>
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
    },
    typeOfModal: {
      type: String,
      default: 'add'
    },
    ticketDetails: {
      type: Object
    }
  },
  data () {
    return {
      ticket: {
        name: '',
        details: '',
        price_egp: '',
        price_euro: '0',
        price_dollar: '0',
        discount_price_egp: null,
        discount_price_euro: null,
        discount_price_dollar: null,
        conditions: '',
        status: 'active'
      },
      selected: ''
    }
  },
  methods: {
    addTicket () {
      if (this.typeOfModal === 'add') {
        this.$emit('addTicket', this.ticket)
      } else {
        this.$emit('editTicket', { ...this.ticket, _method: 'put' })
      }
    }
  },
  watch: {},
  computed: {},
  created () {
    if (this.ticketDetails) {
      this.ticket = {
        name: this.ticketDetails.name,
        details: this.ticketDetails.details,
        price_egp: this.ticketDetails.price_egp,
        price_euro: this.ticketDetails.price_euro,
        price_dollar: this.ticketDetails.price_dollar,
        discount_price_egp: this.ticketDetails.discount_price_egp,
        discount_price_euro: this.ticketDetails.discount_price_euro,
        discount_price_dollar: this.ticketDetails.discount_price_dollar,
        conditions: this.ticketDetails.conditions,
        status: this.ticketDetails.status
      }
    }
  }
}
</script>
