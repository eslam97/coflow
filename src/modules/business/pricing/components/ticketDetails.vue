<template>
  <div>
    <validationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(submitForm)">
        <b-row>
          <b-col md="6">
            <input-form
              v-model="ticket.name"
              placeholder="Ticket Name"
              :validate="'required|max:50'"
              name="Ticket name"
              :label="'Ticket Name'"
              :limit="50"
            />
          </b-col>
          <b-col md="6">
            <validation-provider
                #default="{ errors }"
                :name="`Validity`"
                :rules="{ integer: true, required: ticket.unlimited == 0 }"
                class="flex-grow-1"
            >
              <b-form-group>
                <label for="validity_days" class="d-flex justify-content-between">
                  <span>Validity</span>
                  <div class="d-flex justify-content-between">
                    <span class="font-weight-bold font-size-12 mr-3">Unlimited</span>
                    <div class="custom-control custom-switch custom-switch-text custom-control-inline custom-switch-color mr-0" >
                      <div class="custom-switch-inner">
                        <input
                          type="checkbox"
                          class="custom-control-input bg-info"
                          :id="'unlimited'"
                          :value="ticket.unlimited"
                          @change="ticket.unlimited = ticket.unlimited == 0 ? 1 : 0"
                        />
                        <label class="custom-control-label" :for="'unlimited'"></label>
                      </div>
                    </div>
                  </div>
                </label>
                <b-input-group append="Day(s)">
                  <b-form-input
                    id="validity_days"
                    v-model="ticket.validity_days"
                    placeholder="Placeholder"
                    :class="[{ 'is-invalid': errors.length > 0}]"
                  />
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>

          <b-col md="4">
            <validation-provider
                #default="{ errors }"
                :name="`price`"
                :rules="{ required: true, regex: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/ }"
                class="flex-grow-1"
            >
              <b-form-group :label="'Price'">
                <b-input-group>
                  <b-form-input
                    v-model="ticket.price"
                    placeholder="Placeholder"
                    :class="[{ 'is-invalid': errors.length > 0 }]"
                  />
                  <b-input-group-append>
                    <b-form-select
                      class="h-100"
                      v-model="ticket.currency"
                      :options="[{ value: 'EGP', text: 'EGP' }, { value: '$', text: '$' }]"
                    />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <b-col md="4" class="mb-5 pt-4 mt-3 text-center">
            <b-form-checkbox
              type="checkbox"
              v-model="ticket.has_discount"
              class="custom-checkbox-color-check mb-2 mr-sm-2 mb-sm-0"
              color="warning"
            >
              Discount Price
            </b-form-checkbox>
          </b-col>
          <b-col md="4">
            <validation-provider
              #default="{ errors }"
              :name="`Discount Price`"
              :rules="{ regex: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/, required: ticket.has_discount }"
              class="flex-grow-1"
            >
              <b-form-group :label="'Discount Price'">
                <b-input-group :append="ticket.currency">
                  <b-form-input
                    v-model="ticket.discount_price"
                    placeholder="Placeholder"
                    :disabled="!ticket.has_discount"
                    :class="[{ 'is-invalid': errors.length > 0}]"
                  />
                </b-input-group>
                <small class="text-danger" v-if="!ticket.has_discount">{{ errors[0] }}</small>
                <small class="text-danger" v-if="Number(ticket.has_discount) > Number(ticket.price)">
                  More than price
                </small>
              </b-form-group>
            </validation-provider>
          </b-col>

          <b-col md="12">
            <main-select
              labelTitle="Access"
              :validate="'required'"
              :multiple="true"
              :name="`services`"
              placeholder="Search"
              :options="servicesList"
              label="name"
              :reduce="(data) => data.id"
              v-model="ticket.services"
            ></main-select>
          </b-col>

          <b-col md="6">
            <validation-provider
              #default="{ errors }"
              :name="`Conditions`"
              :rules="'required'"
              class="flex-grow-1"
            >
              <b-form-group label="Conditions (optional)">
                <b-form-textarea
                  @focus="ticket.conditions = ticket.conditions === '' ? '• ' : ticket.conditions"
                  @keyup.enter="ticket.conditions += '• '"
                  v-model="ticket.conditions"
                  placeholder="Write your conditions in bullet points"
                  rows="2"
                  :class="[{ 'is-invalid': errors.length > 0 }]"
                />
                <div class="d-flex justify-content-between">
                  <small class="text-danger">{{ errors[0] }}</small>
                </div>
              </b-form-group>
            </validation-provider>
          </b-col>
          <b-col md="6">
            <validation-provider
              #default="{ errors }"
              :name="`Requirements`"
              :rules="'required'"
              class="flex-grow-1"
            >
              <b-form-group label="Requirements (optional)">
                <b-form-textarea
                  @focus="ticket.requirements = ticket.requirements === '' ? '• ' : ticket.requirements"
                  @keyup.enter="ticket.requirements += '• '"
                  v-model="ticket.requirements"
                  placeholder="Write your requirements in bullet points"
                  rows="2"
                  :class="[{ 'is-invalid': errors.length > 0 }]"
                />
                <div class="d-flex justify-content-between">
                  <small class="text-danger">{{ errors[0] }}</small>
                </div>
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
import settingsService from '@/modules/superAdmin/settings/services/settings.services'

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
        unlimited: 0,
        validity_days: '',
        price: '',
        has_discount: 0,
        discount_price: 0,
        currency: 'EGP',
        conditions: '',
        requirements: '',
        addons: [],
        services: []
      },
      removeLoadingUi: false,
      progressBar: 0,
      type: '',
      servicesList: []
    }
  },
  methods: {
    submitForm () {
      if (this.typeOfModal === 'add') {
        this.$emit('createTicket', { ...this.ticket })
      } else {
        this.$emit('updateTicket', { ...this.ticket, _method: 'patch' })
      }
    },
    getAllServices () {
      settingsService.getAllServices().then(res => {
        this.servicesList = res.data.data.data
      })
    }
  },
  watch: {},
  computed: {},
  created () {
    this.getAllServices()
    if (this.ticketDetails) {
      this.ticket = {
        name: this.ticketDetails.name,
        unlimited: this.ticketDetails.unlimited,
        validity_days: this.ticketDetails.validity_days,
        price: this.ticketDetails.price,
        has_discount: this.ticketDetails.has_discount,
        discount_price: this.ticketDetails.discount_price,
        currency: this.ticketDetails.currency,
        conditions: this.ticketDetails.conditions,
        requirements: this.ticketDetails.requirements,
        addons: this.ticketDetails.addons,
        services: this.ticketDetails.services
      }
    }
  }
}
</script>
