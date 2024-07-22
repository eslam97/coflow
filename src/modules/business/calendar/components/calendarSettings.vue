<template>
  <div>
    <validationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(saveSettings)">
        <b-row class="d-flex align-items-center mb-4">
          <b-col md="8">
            <input-form
              label="Slot Capacity"
              name="slotCapacity"
              v-model="settings.slotCapacity"
              placeholder="5"
              :validate="'required|max:50'"
              :limit="50"
            />
          </b-col>
          <b-col md="4">
            <input-form
              label="Customers"
              name="customers"
              v-model="settings.customers"
              placeholder="customers"
              :validate="'max:50'"
              :limit="50"
              :disabled="true"
            />
          </b-col>

          <b-col md="8">
            <input-form
              label="Customer Cancellation"
              name="customerCancellation"
              v-model="settings.customerCancellation"
              placeholder="2"
              :validate="'required|max:50'"
              :limit="50"
            />
          </b-col>
          <b-col md="4">
            <input-form
              label="Hour (s)"
              name="hours"
              v-model="settings.hours"
              placeholder="Hour (s)"
              :validate="'max:50'"
              :limit="50"
              :disabled="true"
            />
          </b-col>

          <b-col>
            <b-form-group label="Customer Reservations" v-slot="{ ariaDescribedby }">
              <b-form-radio class="custom-radio-color-checked" v-model="settings.customerReservations" :aria-describedby="ariaDescribedby" name="customerReservations" value="Visible">Visible</b-form-radio>
              <b-form-radio class="custom-radio-color-checked" v-model="settings.customerReservations" :aria-describedby="ariaDescribedby" name="customerReservations" value="Private">Private</b-form-radio>
            </b-form-group>
          </b-col>

          <b-col md="12" class="mt-4">
            <div class="d-flex justify-content-center">
              <b-button type="submit" variant="warning" class="add_button text-white" :disabled="requestLoading">
                <span>Save</span>
                <spinner-loading v-if="requestLoading" class="d-inline"></spinner-loading>
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
    requestLoading: { type: Boolean, default: false }
  },
  data () {
    return {
      settings: {
        slotCapacity: '',
        customers: '',
        customerCancellation: '',
        hours: '',
        customerReservations: 'Visible'
      }
    }
  },
  methods: {
    saveSettings () {
      this.$emit('saveSettings', this.settings)
    }
  },
  created () {
  }

}
</script>
