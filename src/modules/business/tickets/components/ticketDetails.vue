<template>
  <div>
    <validationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(addTicket)">
        <b-row>
            <b-col lg="6">
            <b-row>
              <b-col md="6" class="mb-3">
                <input-form
                    v-model="ticket.name"
                    placeholder="Ticket Name"
                    :validate="'required|max:30'"
                    name="Ticket name"
                    :label="'Ticket Name'"
                    :limit="30"
                />
              </b-col>
              <b-col md="6" class="mb-3">
                  <label for="duration-group">Duration</label>
                  <b-input-group id="duration-group">
                      <b-form-input
                              :label="'Duration'"
                              v-model="ticket.duration"
                              :placeholder="'duration'"
                              :validate="'required'"
                              name="duration"
                      />
                      <template #append>
                          <b-dropdown
                                  :text="type ? type : 'Pick duration type'"
                                  class="selectWithInputAppend"
                          >
                              <b-dropdown-item v-for="(i, keyType) in allDurationList"
                                               :key="keyType"
                                               @click="ticket.duration_list_id = i.id;
                                         type = i.name">
                                  {{i.name}}
                              </b-dropdown-item>
                          </b-dropdown>
                      </template>
                  </b-input-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="4" class="mb-3">
                <validation-provider
                    #default="{ errors }"
                    :name="`EGP price`"
                    :rules="{ required: true, regex: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/ }"
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
<!--              between: (0, ticket.price_egp)-->
              <b-col md="4" class="mb-3">
                <validation-provider
                    #default="{ errors }"
                    :name="`Discounted EGP price`"
                    :rules="{ regex: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/, required: selectedEGP }"
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
                <b-col md="12" class="mb-3">
                    <validation-provider
                            #default="{ errors }"
                            :name="`Conditions`"
                            :rules="'required'"
                            class="flex-grow-1"
                    >
                        <b-form-group label="Conditions">
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
                                <!--                      <small :class="[{ 'text-danger': ticket.conditions.length > 88 }]">
                                                        {{ (88 > ticket.conditions.length) ? 88 - ticket.conditions.length : 0 }} characters</small>-->
                            </div>
                        </b-form-group>
                    </validation-provider>
                </b-col>
            </b-row>
          </b-col>
            <b-col lg="6" class="mb-3">
                <validation-provider
                        #default="{ errors }"
                        :name="`Description`"
                        :rules="'required'"
                        class="flex-grow-1"
                >
                    <b-form-group label="Description">
                        <b-form-textarea
                                v-model="ticket.details"
                                placeholder="Write a brief description"
                                rows="4"
                                :class="[{ 'is-invalid': errors.length > 0 }]"
                        ></b-form-textarea>
                    </b-form-group>
                </validation-provider>
            </b-col>
        </b-row>
          <b-row>
              <b-col class="mb-5">
                  <cropper-images
                          label="Upload Photos"
                          @cropper-save="saveGalleryImage"
                          @remove-image="removeGalleryImage"
                          :removeLoadingUi="removeLoadingUi"
                          :progressLoading="progressBar"
                          :images="ticket.images"
                  ></cropper-images>
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

import mainService from '@/services/main'
import { core } from '@/config/pluginInit'
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
        details: '',
        price_egp: '',
        price_euro: '',
        price_dollar: '',
        discount_price_egp: null,
        discount_price_euro: null,
        discount_price_dollar: null,
        conditions: '',
        images: [],
        status: 'active',
        duration: '',
        duration_list_id: ''
      },
      foreignerPrice: 'None',
      selectedEGP: false,
      selectedEUR: false,
      selectedDollar: false,
      removeLoadingUi: false,
      progressBar: 0,
      type: '',
      allDurationList: []
    }
  },
  methods: {
    saveGalleryImage (file) {
      this.removeLoadingUi = false
      this.requestLoading = true
      const formData = new FormData()
      formData.append('image', file.image)
      formData.append('type', 'ticket')
      formData.append('status', this.ticketDetails ? 'exist' : 'new')
      formData.append('name', file.imageInfo.name)
      if (this.ticketDetails) {
        formData.append('ticket_id', this.ticketDetails.id)
      }
      const options = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent
          const percent = Math.floor((loaded * 100) / total)
          console.log(percent)
          this.progressBar = percent
        }
      }
      mainService.addImage(formData, options).then(res => {
        core.showSnackbar('success', res.data.message)
        this.ticket.images.push(res.data.data)
        this.removeLoadingUi = true
        this.requestLoading = false
      })
    },
    removeGalleryImage (id) {
      mainService.removeImage(id, 'ticket').then(res => {
        core.showSnackbar('success', res.data.message)
        const ind = this.ticket.images.findIndex(image => image.id === id)
        this.ticket.images.splice(ind, 1)
      })
    },
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
        this.$emit('addTicket', {
          ...this.ticket,
          images: this.ticket.images.map(data => data.id)
        })
      } else {
        this.$emit('editTicket', { ...this.ticket, _method: 'put', images: this.ticket.images.map(data => data.id) })
      }
    },
    getDurationList () {
      settingsService.getDurationList().then(res => {
        this.allDurationList = res.data.data
        this.type = this.allDurationList.find((item) => item.id === this.ticketDetails.duration_list_id).name
      })
    }
  },
  watch: {},
  computed: {},
  created () {
    this.getDurationList()
    if (this.ticketDetails) {
      this.ticket = {
        name: this.ticketDetails.name,
        details: this.ticketDetails.details,
        price_egp: this.ticketDetails.price_egp,
        price_euro: this.ticketDetails.price_euro ? this.ticketDetails.price_euro : '',
        price_dollar: this.ticketDetails.price_dollar ? this.ticketDetails.price_dollar : '',
        discount_price_egp: this.ticketDetails.discount_price_egp || '',
        discount_price_euro: this.ticketDetails.discount_price_euro || '',
        discount_price_dollar: this.ticketDetails.discount_price_dollar || '',
        conditions: this.ticketDetails.conditions,
        status: this.ticketDetails.status,
        images: this.ticketDetails.images,
        duration_list_id: this.ticketDetails.duration
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
