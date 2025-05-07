<template>
  <div>
    <validationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(saveSettings)">
        <b-row class="d-flex align-items-center mb-4">
          <b-col md="8">
            <input-form
              label="Slot Capacity"
              name="calendar_capacity"
              v-model="settings.calendar_capacity"
              placeholder="5"
              :validate="'required|max:50'"
              :limit="50"
            />
          </b-col>
          <b-col md="4">
            <input-form
              label="Customers"
              name="customers"
              placeholder="customers"
              :validate="'max:50'"
              :limit="50"
              :disabled="true"
            />
          </b-col>

          <b-col md="8">
            <input-form
              label="Customer Cancellation"
              name="calendar_cancellation"
              v-model="settings.calendar_cancellation"
              placeholder="2"
              :validate="'required|max:50'"
              :limit="50"
            />
          </b-col>
          <b-col md="4">
            <input-form
              label="Hour (s)"
              name="hours"
              placeholder="Hour (s)"
              :validate="'max:50'"
              :limit="50"
              :disabled="true"
            />
          </b-col>

          <b-col md="12">
            <b-form-group label="Customer Reservations" v-slot="{ ariaDescribedby }">
              <b-form-radio class="custom-radio-color-checked" v-model="settings.calendar_show_reservations" :aria-describedby="ariaDescribedby" name="calendar_show_reservations" value="visible">Visible</b-form-radio>
              <b-form-radio class="custom-radio-color-checked" v-model="settings.calendar_show_reservations" :aria-describedby="ariaDescribedby" name="calendar_show_reservations" value="private">Private</b-form-radio>
            </b-form-group>
          </b-col>

          <b-col md="12">
            <b-form-group label="Calendar Visibility" v-slot="{ ariaDescribedby }">
              <b-form-radio class="custom-radio-color-checked" v-model="settings.calendar_status" :aria-describedby="ariaDescribedby" name="calendar_status" value="public">Public</b-form-radio>
              <b-form-radio class="custom-radio-color-checked" v-model="settings.calendar_status" :aria-describedby="ariaDescribedby" name="calendar_status" value="customers">Customers</b-form-radio>
              <b-form-radio class="custom-radio-color-checked" v-model="settings.calendar_status" :aria-describedby="ariaDescribedby" name="calendar_status" value="private">Private</b-form-radio>
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
import calendarServices from '../services/calendar.sevices'
export default {
  props: {
    requestLoading: { type: Boolean, default: false }
  },
  data () {
    return {
      settings: {
        calendar_capacity: '',
        // customers: '',
        calendar_cancellation: '',
        // hours: '',
        calendar_show_reservations: 'visible',
        calendar_status: 'public'
      }
    }
  },
  methods: {
    saveSettings () {
      this.$emit('saveSettings', this.settings)
    }
  },
  created () {
    calendarServices.getSettings().then(res => {
      this.settings = res.data.data
    })
  }

}
</script>
