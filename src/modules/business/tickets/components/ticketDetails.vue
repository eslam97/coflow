<template>
  <div>
    <validationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(addTicket)">
        <b-row>
          <b-col>
            <b-row>
              <b-col md="4" class="mb-3">
                <input-form
                    v-model="ticket.name"
                    placeholder="Ticket Name"
                    :validate="'required|max:20'"
                    name="Ticket name"
                    :label="'Ticket Name'"
                    :limit="20"
                />
              </b-col>
              <b-col md="8" class="mb-3">
                <input-form
                    v-model="ticket.details"
                    placeholder="Write a brief description"
                    :validate="'required|max:40'"
                    name="Ticket details"
                    :label="'Details'"
                    :limit="40"
                />
              </b-col>
            </b-row>
            <b-row>
              <b-col md="4" class="mb-3">
                <validation-provider
                    #default="{ errors }"
                    :name="`EGP price`"
                    :rules="'required|numeric'"
                    class="flex-grow-1"
                >
                  <b-form-group :label="'Price'"
                  ><b-input-group append="EGP">
                    <b-form-input
                        v-model="ticket.price_egp"
                        placeholder="000.00"
                        :class="[{ 'is-invalid': errors.length > 0 }]"/>
                  </b-input-group>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </b-form-group>
                </validation-provider>
              </b-col>
              <b-col md="4" class="mb-5 pt-4 mt-3 text-center">
                <b-form-checkbox
                    type="checkbox"
                    v-model="selectedEGP"
                    class="custom-checkbox-color-check mb-2 mr-sm-2 mb-sm-0"
                    color="warning"
                >
                  Discounted Price
                </b-form-checkbox>
              </b-col>
              <b-col md="4" class="mb-3">
                <validation-provider
                    #default="{ errors }"
                    :name="`Discounted EGP price`"
                    :rules="`${selectedEGP ? 'required': ''}|numeric|between:0,${ticket.price_egp}`"
                    class="flex-grow-1"
                >
                  <b-form-group :label="'Discounted Price'"
                  ><b-input-group append="EGP">
                    <b-form-input
                        v-model="ticket.discount_price_egp"
                        placeholder="000.00"
                        :disabled="!selectedEGP"
                        :class="[{ 'is-invalid': errors.length > 0}]"
                    /></b-input-group>
                    <small class="text-danger" v-if="!ticket.discount_price_egp">{{ errors[0] }}</small>
                    <small class="text-danger" v-if="Number(ticket.discount_price_egp) > Number(ticket.price_egp)">
                      More than price
                    </small>
                  </b-form-group>
                </validation-provider>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="12" class="mb-3">
                <main-select labelTitle='Foreigner Price' :options="['None', 'Euro', 'Dollar']"
                             v-model="foreignerPrice"></main-select>
              </b-col>
            </b-row>
            <b-row v-if="foreignerPrice === 'Euro'">
              <b-col md="4" class="mb-3">
                <validation-provider
                    #default="{ errors }"
                    :name="`EURO price`"
                    :rules="'numeric'"
                    class="flex-grow-1"
                >
                  <b-form-group :label="'Foreigner Price'"
                  ><b-input-group append="EUR">
                    <b-form-input
                        v-model="ticket.price_euro"
                        placeholder="000.00"
                        :class="[{ 'is-invalid': errors.length > 0 }]"
                    /> </b-input-group>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </b-form-group>
                </validation-provider>
              </b-col>
              <b-col md="4" class="mb-5  pt-4 mt-3 text-center">
                <b-form-checkbox
                    type="checkbox"
                    v-model="selectedEUR"
                    class="custom-checkbox-color-check mb-2 mr-sm-2 mb-sm-0"
                    color="warning"
                >
                  Discounted Price
                </b-form-checkbox>
              </b-col>
              <b-col md="4" class="mb-3">
                <validation-provider
                    #default="{ errors }"
                    :name="`Discounted EURO price`"
                    :rules="`${selectedEUR ? 'required': ''}|numeric|between:0,${ticket.price_euro}`"
                    class="flex-grow-1"
                >
                  <b-form-group :label="'Discounted Price'"
                  ><b-input-group append="EUR">
                    <b-form-input
                        v-model="ticket.discount_price_euro"
                        placeholder="000.00"
                        :disabled="!selectedEUR"
                        :class="[{ 'is-invalid': errors.length > 0 }]"
                    /></b-input-group>
                    <small class="text-danger" v-if="!ticket.discount_price_euro">{{ errors[0] }}</small>
                    <small class="text-danger" v-if="Number(ticket.discount_price_euro) > Number(ticket.price_euro)">
                      More than price
                    </small>
                  </b-form-group>
                </validation-provider>
              </b-col>
            </b-row>
            <b-row v-else-if="foreignerPrice === 'Dollar'">
              <b-col md="4" class="mb-3">
                <validation-provider
                    #default="{ errors }"
                    :name="`Dollar price`"
                    :rules="'numeric'"
                    class="flex-grow-1"
                >
                  <b-form-group :label="'Foreigner Price'"
                  ><b-input-group append="$">
                    <b-form-input
                        v-model="ticket.price_dollar"
                        placeholder="000.00"
                        :class="[{ 'is-invalid': errors.length > 0 }]"
                    /> </b-input-group>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </b-form-group>
                </validation-provider>
              </b-col>
              <b-col md="4" class="mb-5 pt-4 mt-3 text-center">
                <b-form-checkbox
                    type="checkbox"
                    v-model="selectedDollar"
                    class="custom-checkbox-color-check mb-2 mr-sm-2 mb-sm-0"
                    color="warning"
                >
                  Discounted Price
                </b-form-checkbox>
              </b-col>
              <b-col md="4" class="mb-3">
                <validation-provider
                    #default="{ errors }"
                    :name="`Discounted Dollar price`"
                    :rules="`${selectedDollar ? 'required': ''}|numeric|between:0,${ticket.price_dollar}`"
                    class="flex-grow-1"
                >
                  <b-form-group :label="'Discounted Price'"
                  ><b-input-group append="$">
                    <b-form-input
                        v-model="ticket.discount_price_dollar"
                        placeholder="000.00"
                        :disabled="!selectedDollar"
                        :class="[{ 'is-invalid': errors.length > 0}]"
                    /></b-input-group>
                    <small class="text-danger" v-if="!ticket.discount_price_dollar">{{ errors[0] }}</small>
                    <small class="text-danger" v-if="Number(ticket.discount_price_dollar) > Number(ticket.price_dollar)">
                      More than price
                    </small>
                  </b-form-group>
                </validation-provider>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="12" class="mb-3">
                <validation-provider
                    #default="{ errors }"
                    :name="`Conditions`"
                    :rules="'required|max:88'"
                    class="flex-grow-1"
                >
                  <b-form-group label="Conditions">
                    <b-form-textarea
                        @focus="ticket.conditions = ticket.conditions === '' ? '• ' : ticket.conditions"
                        @keyup.enter="ticket.conditions += '• '"
                        v-model="ticket.conditions"
                        placeholder="Write your conditions in bullet points"
                        rows="3"
                        :class="[{ 'is-invalid': errors.length > 0 }]"
                    />
                    <div class="d-flex justify-content-between">
                      <small class="text-danger">{{ errors[0] }}</small>
                      <small :class="[{ 'text-danger': ticket.conditions.length > 88 }]">
                        {{ (88 > ticket.conditions.length) ? 88 - ticket.conditions.length : 0 }} characters</small>
                    </div>
                  </b-form-group>
                </validation-provider>
              </b-col>
            </b-row>
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
      foreignerPrice: 'None',
      selectedEGP: '',
      selectedEUR: '',
      selectedDollar: ''
    }
  },
  methods: {
    addTicket () {
      // if foreigner price is empty send 0 to server
      this.ticket.price_euro = this.ticket.price_euro ? this.ticket.price_euro : 0
      this.ticket.price_dollar = this.ticket.price_dollar ? this.ticket.price_dollar : 0
      // if discount isn't checked, discounted field should be emptied
      this.ticket.discount_price_egp = this.selectedEGP ? this.ticket.discount_price_egp : ''
      this.ticket.discount_price_euro = this.selectedEUR ? this.ticket.discount_price_euro : ''
      this.ticket.discount_price_dollar = this.selectedDollar ? this.ticket.discount_price_dollar : ''
      // empty non selected currency
      if (this.foreignerPrice === 'None') {
        this.ticket.price_euro = 0
        this.ticket.discount_price_euro = 0
        this.ticket.price_dollar = 0
        this.ticket.discount_price_dollar = 0
      } else if (this.foreignerPrice === 'Euro') {
        this.ticket.price_dollar = 0
        this.ticket.discount_price_dollar = 0
      } else if (this.foreignerPrice === 'Dollar') {
        this.ticket.price_euro = 0
        this.ticket.discount_price_euro = 0
      }
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
        price_euro: this.ticketDetails.price_euro ? this.ticketDetails.price_euro : '',
        price_dollar: this.ticketDetails.price_dollar ? this.ticketDetails.price_dollar : '',
        discount_price_egp: this.ticketDetails.discount_price_egp,
        discount_price_euro: this.ticketDetails.discount_price_euro,
        discount_price_dollar: this.ticketDetails.discount_price_dollar,
        conditions: this.ticketDetails.conditions,
        status: this.ticketDetails.status
      }
      if (this.ticket.price_euro) {
        this.foreignerPrice = 'Euro'
      }
      if (this.ticket.price_dollar) {
        this.foreignerPrice = 'Dollar'
      }
      if (this.ticketDetails.discount_price_egp) {
        this.selectedEGP = true
      }
      if (this.ticketDetails.discount_price_euro) {
        this.selectedEUR = true
      }
      if (this.ticketDetails.discount_price_dollar) {
        this.selectedDollar = true
      }
    }
  }
}
</script>
