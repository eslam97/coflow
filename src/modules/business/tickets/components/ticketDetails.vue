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
                name="name"
                :label="'Ticket Name'"
            />
          </b-col>
          <b-col md="8" class="mb-3">
            <input-form
                v-model="ticket.details"
                placeholder="Write a breif description"
                :validate="'required'"
                name="details"
                :label="'Details'"
            />
          </b-col>
          <b-col md="5" class="mb-3">
            <div class="input-group">
              <input-form
                  v-model="ticket.price_egp"
                  placeholder="000.00"
                  :validate="'required|^[0-9]*\.[0-9]{2}$'"
                  name="price_egp"
                  :label="'Price'"
              />
              <div class="input-group-append mb-5 pt-4"><span class="input-group-text">EGP</span></div>
            </div>
          </b-col>
          <b-col md="3" class="mb-5 pt-4">
            <input
                type="checkbox"
                id="checkbox"
                v-model="selected"
                label="Discounted Price"
                class="form-check-input"
            />
            <label class="form-check-label" for="checkbox">Discounted Price</label>
          </b-col>
          <b-col md="4" class="mb-3">
            <input-form
                v-model="ticket.discount_price_egp"
                placeholder="000.00"
                :disabled="!selected"
                :validate="required"
                name="discount_price_egp"
                :label="'Discounted Price'"
            />
          </b-col>
          <b-col md="12" class="mb-3">
            <b-form-textarea
                v-model="ticket.conditions"
                placeholder="Write your conditions in bullet points"
                :validate="'required'"
                rows="1"
                name="condition"
                :label="'Conditions'"
            />
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
/* import settingsService from '@/modules/superAdmin/settings/services/settings.services'
import mainService from '@/services/main'
import { core } from '@/config/pluginInit' */
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
        status: 'active',
        image: '',
        level: '',
        provider: ''
      },
      selected: '',
      required: ''
    }
  },
  methods: {
    addTicket () {
      console.log(this.ticket)
      this.$emit('addTicket', this.ticket)
    }
  },
  watch: {
    selected (newSelected) {
      this.required = newSelected ? 'required' : ''
    }
  },
  computed: {},
  created () {
    if (Object.getOwnPropertyNames(this.ticketDetails).length >= 1) {
      this.landmark = {
        name: this.ticketDetails.name,
        details: this.ticketDetails.details,
        price_egp: this.ticketDetails.price_egp
      }
    }
  }

}
</script>
