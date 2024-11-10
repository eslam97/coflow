<template>
  <div>
    <validationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(addSlots)">
        <b-row>
          <b-col md="12" class="mb-3">
            <main-select
              labelTitle='Flow'
              :validate="'required'"
              :name="`Flow`"
              placeholder="Pick flow"
              :options="allServices"
              label="name"
              :disabled="typeOfModal === 'edit'"
              :reduce="data => data.id"
              v-model="calendar.service_id"
            ></main-select>
          </b-col>
          <b-col
            md="12"
            class="position-relative mb-4 border-bottom"
            v-for="(slot, slotKey) in calendar.slots" :key="slotKey"
          >
            <b-row class="d-flex align-items-center mb-4">
              <b-col md="4" >
                <main-select
                  labelTitle='Day of the week'
                  :validate="'required'"
                  :name="`Day ${slotKey + 1}`"
                  placeholder="Choose"
                  :options="allDays"
                  label="key"
                  :reduce="data => data.value"
                  v-model="slot.day"
                ></main-select>
              </b-col>
              <b-col md="4">
                <input-form
                  placeholder="00:00" :validate="'required'"
                  :name="`From ${slotKey + 1}`" :label="'From'"
                  v-model="slot.from" type="time"
                />
              </b-col>
              <b-col md="4">
                <input-form
                  placeholder="00:00" alidate="'required'"
                  :name="`To ${slotKey + 1}`" :label="'To'"
                  v-model="slot.to" type="time"
                />
              </b-col>
              <b-col md="12">
                <main-select labelTitle='Instructor' :validate="'required'"
                  :name="`Instructor ${slotKey + 1}`"  placeholder="Pick instructor"
                  :options="!calendar.service_id ? '':
                  allServices.find((flow) => flow.id === calendar.service_id).instructors"
                  label="first_name"
                  :multiple="true"
                  :reduce="data => data.id"
                  v-model="slot.instructors"
                ></main-select>
              </b-col>
              <b-col class="d-flex justify-content-between align-items-center">
                <template v-if="typeOfModal === 'edit'">
                  <label for="capacity">Capacity</label>

                  <div class="capacity-container">
                    <button @click.prevent="() => slot.capacity = slot.capacity == 0 ? 0 : slot.capacity - 1">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.33325 8H12.6666" stroke="#181935" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </button>
                    <input type="number" name="capacity" id="capacity" v-model="slot.capacity">
                    <button @click.prevent="() => slot.capacity = slot.capacity + 1">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 3.3335V12.6668" stroke="#181935" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M3.33325 8H12.6666" stroke="#181935" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </template>

                <b-form-checkbox type="checkbox"
                  value="1"
                  unchecked-value="0"
                  v-model="slot.ladies_only"
                  label="Ladies only"
                  :name="`Ladies only ${slotKey + 1}`"
                  class="custom-checkbox-color-check mb-2 mr-sm-2 mb-sm-0"
                  color="warning"
                >
                  Ladies Only Class
                </b-form-checkbox>
              </b-col>
            </b-row>
            <span
              v-if="(slotKey != 0)"
              class="text-danger deleteLabelButton cursor-pointer"
              @click="deleteSlot(slotKey)"
            >Delete</span>
          </b-col>
          <!-- <b-col md="12" class="mb-3">
            <span
              v-if="(typeOfModal === 'add')"
              class="text-warning cursor-pointer deleteLabelButton px-3"
              @click="addNewSlot"
            >+Add another slot(s)</span>
          </b-col> -->
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
    requestLoading: { type: Boolean, default: false },
    detailsStatus: { type: Boolean, default: false },
    typeOfModal: { type: String, default: 'add' },
    calendarDetails: { type: Object },
    allServices: { type: Array },
    allDates: { type: Array, default: () => [] }
  },
  data () {
    return {
      calendar: {
        slots: [{
          id: '',
          day: '',
          from: '',
          to: '',
          instructors: [],
          ladies_only: +false,
          status: ''
        }],
        status: 'active',
        service_id: ''
      },
      allDays: [
        { key: 'Saturday', value: 6 },
        { key: 'Sunday', value: 0 },
        { key: 'Monday', value: 1 },
        { key: 'Tuesday', value: 2 },
        { key: 'Wednesday', value: 3 },
        { key: 'Thursday', value: 4 },
        { key: 'Friday', value: 5 }
      ]
    }
  },
  methods: {
    addSlots () {
      if (this.typeOfModal === 'add') {
        this.$emit('addSlots', this.calendar)
      } else {
        const payload = {
          date: this.allDates[this.calendar.slots[0].day],
          from: this.calendar.slots[0].from.slice(0, 5),
          to: this.calendar.slots[0].to.slice(0, 5),
          instructors: this.calendar.slots[0].instructors,
          ladies_only: this.calendar.slots[0].ladies_only,
          capacity: this.calendar.slots[0].capacity,
          _method: 'patch'
        }
        this.$emit('editSlot', this.calendar.slots[0].id, payload)
      }
    },
    addNewSlot () {
      this.calendar.slots.push({
        days: [],
        from: '',
        to: '',
        instructors: [],
        ladies_only: +false
      })
    },
    deleteSlot (ind) {
      this.calendar.slots.splice(ind, 1)
    }
  },
  created () {
    if (this.calendarDetails) {
      this.calendar = {
        slots: [{
          id: this.calendarDetails.id,
          day: new Date(this.calendarDetails.date).getDay(),
          from: this.calendarDetails.from,
          to: this.calendarDetails.to,
          instructors: this.calendarDetails.instructors.map((i) => i.id),
          ladies_only: +this.calendarDetails.ladies_only,
          capacity: +this.calendarDetails.capacity,
          status: this.calendarDetails.status
        }],
        status: 'active',
        service_id: this.calendarDetails.service?.id || null
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.capacity-container {
  button {
    background: var(--co-orange);
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 0 4px 4px 0;
    &:first-of-type {
      border-radius: 4px 0 0 4px;
    }
  }
  input {
    min-width: 40px;
    max-width: 60px;
    height: 40px;
    border: 1px solid #FFE4BE;
    text-align: center;
    font-weight: 700;

    -moz-appearance: textfield;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
}
</style>
