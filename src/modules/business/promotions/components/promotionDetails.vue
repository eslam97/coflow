<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(savePromotion)">
        <b-row>
          <b-col md="4" class="mb-3">
            <main-select labelTitle='Promotion Type' :validate="'required'"
                         :name="`promotion_type`" placeholder="Choose" :options="allPromotionTypes"
                         v-model="promotion_type">
            </main-select>
          </b-col>
          <b-col md="8" class="mb-3">
            <input-form
                v-model="info.offer_title"
                placeholder="Ex: offer_title"
                :validate="'required'"
                name="offer_title"
                :label="'Offer Title'"
            />
          </b-col>
          <b-col md="6" class="mb-3" v-if="promotion_type === 'package'">
            <input-form
                v-model="packages.package"
                placeholder="Ex: offer"
                :validate="'required'"
                name="offer"
                :label="'Offer'"
            />
          </b-col>
          <b-col md="6" class="mb-3" v-if="promotion_type === 'discount'">
            <b-form-group
                  :label="`offer`"
                  :label-for="`offer`"
                  class="position-relative"
              >
                <b-input-group append="%">
                  <validation-provider
                      #default="{ errors }"
                      :name="`offer`"
                      :rules="'required|numeric'"
                      class="flex-grow-1"
                  >
                    <b-form-input
                        id="mm"
                        v-model="discount.discount_price_egp"
                        :class="[{ 'is-invalid': errors.length > 0 }]"
                        :placeholder="'0.0'"
                    />
                  </validation-provider>
                </b-input-group>
              </b-form-group>
          </b-col>
          <b-col md="6" class="mb-3" v-if="promotion_type === 'buy_x get_y'">
            <b-form-group
                  :label="`offer 1`"
                  :label-for="`offer 1`"
                  class="position-relative"
              >
                <b-input-group prepend="buy_x">
                  <validation-provider
                      #default="{ errors }"
                      :name="`buy_x`"
                      :rules="'required'"
                      class="flex-grow-1"
                  >
                    <b-form-input
                        id="mm1"
                        v-model="buy2Get1.buy_x"
                        :class="[{ 'is-invalid': errors.length > 0 }]"
                        :placeholder="'x'"
                    />
                  </validation-provider>
                </b-input-group>
                <b-input-group prepend="get_y">
                <validation-provider
                    #default="{ errors }"
                    :name="`buy_y`"
                    :rules="'required'"
                    class="flex-grow-1"
                >
                  <b-form-input
                      id="mm1"
                      v-model="buy2Get1.get_y"
                      :class="[{ 'is-invalid': errors.length > 0 }]"
                      :placeholder="'y'"
                  />
                </validation-provider>
              </b-input-group>
              </b-form-group>
          </b-col>
          <b-col md="3" class="mb-3">
            <b-form-group
                label="start date"
                label-for="start date"
            >
              <validation-provider
                  #default="{ errors }"
                  name="start_date"
                  :rules="'required'"
              >
                <flatPickr
                    :class="['form-control bg-white' , { 'is-invalid': errors.length > 0 }]"
                    v-model="info.start_date"
                    placeholder="start date"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col md="3" class="mb-3">
            <b-form-group
                label="end date"
                label-for="end date"
            >
              <validation-provider
                  #default="{ errors }"
                  name="end_date"
                  :rules="'required'"
              >
                <flatPickr
                    :class="['form-control bg-white' , { 'is-invalid': errors.length > 0 }]"
                    v-model="info.end_date"
                    placeholder="end date"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row v-if="promotion_type === 'package'">
          <b-col md="6" class="mb-3" >
            <input-form
                v-model="packages.price_egp"
                placeholder="Ex: 0.0"
                :validate="{
                        regex: /^\d{1,10}(\.\d{1,10})?$/,
                        required:true
                      }"
                name="price_egp"
                :label="'price_egp'"
            />
          </b-col>
          <b-col md="6" class="mb-3">
            <input-form
                v-model="packages.discount_price_egp"
                placeholder="Ex: 0.0"
                :validate="{
                        regex: /^\d{1,10}(\.\d{1,10})?$/,
                        required:true
                      }"
                name="discount_price_egp"
                :label="'discount_price_egp'"
            />
          </b-col>
          <b-col md="6" class="mb-3" >
            <input-form
                v-model="packages.price_dollar"
                placeholder="Ex: 0.0"
                :validate="{
                        regex: /^\d{1,10}(\.\d{1,10})?$/,
                        required:false
                      }"
                name="price_dollar"
                :label="'price_dollar'"
            />
          </b-col>
          <b-col md="6" class="mb-3">
            <input-form
                v-model="packages.discount_price_dollar"
                placeholder="Ex: 0.0"
                :validate="{
                        regex: /^\d{1,10}(\.\d{1,10})?$/,
                        required:false
                      }"
                name="discount_price_dollar"
                :label="'discount_price_dollar'"
            />
          </b-col>
          <b-col md="6" class="mb-3" >
            <input-form
                v-model="packages.price_auro"
                placeholder="Ex: 0.0"
                :validate="{
                        regex: /^\d{1,10}(\.\d{1,10})?$/,
                        required:false
                      }"
                name="price_euro"
                :label="'price_euro'"
            />
          </b-col>
          <b-col md="6" class="mb-3">
            <input-form
                v-model="packages.discount_price_auro"
                placeholder="Ex: 0.0"
                :validate="{
                        regex: /^\d{1,10}(\.\d{1,10})?$/,
                        required:false
                      }"
                name="discount_price_euro"
                :label="'discount_price_euro'"
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12" class="mb-3">
            <b-form-group
                label="Description"
                label-for="Description"
            >
              <ValidationProvider name="description" ref="Description" rules="required" v-slot="{ errors }">
                <b-form-textarea
                    placeholder="Description..."
                    rows="2"
                    v-model="info.description"
                    :class="(errors.length >
                             0 ? ' is-invalid' : '')"
                ></b-form-textarea>
                <div class="invalid-feedback">
                  <span>{{ errors[0] }}</span>
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
    requestLoading: {
      type: Boolean,
      default: false
    }
  },
  components: {
    flatPickr
  },
  data () {
    return {
      promotion_type: 'package',
      allPromotionTypes: ['package', 'discount', 'buy_x get_y'],
      info: {
        offer_title: '',
        description: '',
        start_date: '',
        end_date: ''
      },
      packages: {
        package: '',
        price_egp: '',
        price_auro: '',
        price_dollar: '',
        discount_price_egp: '',
        discount_price_dollar: '',
        discount_price_auro: ''
      },
      buy2Get1: {
        buy_x: '',
        get_y: ''
      },
      discount: {
        discount_price_egp: ''
      }
    }
  },
  methods: {
    savePromotion () {
      let obj = {}
      if (this.promotion_type === 'package') {
        obj = {
          ...this.info,
          promotion_type: this.promotion_type,
          ...this.packages
        }
      } else if (this.promotion_type === 'discount') {
        obj = {
          ...this.info,
          promotion_type: this.promotion_type,
          ...this.discount
        }
      } else {
        obj = {
          ...this.info,
          promotion_type: this.promotion_type,
          ...this.buy2Get1
        }
      }
      this.$emit('savePromotion', obj)
    }
  },
  computed: {
  },
  created () {
    // this.getAllLinks()
  }
}
</script>
<style lang="scss" scoped>
.input-group .input-group-text {
  background: transparent !important;
  border: 1px solid #d7dbda !important;
}
</style>
