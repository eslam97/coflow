<template>
  <div>
    <validationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(addSlot)">
        <b-row>
          <b-col md="12" class="mb-3">
            <main-select labelTitle='Flow' :validate="'required'"
                         :name="`Flow`" placeholder="Pick flow" :options="allFlows"
                         label="name"
                         :reduce="data => data.id"
                         v-model="schedule.flow_id"></main-select>
          </b-col>
          <b-col md="12" class="position-relative mb-3" v-for="(slot, slotKey) in schedule.slots"
                 :key="slotKey">
            <b-row class="d-flex align-items-center">
              <b-col md="4" class="mb-4" >
                <main-select labelTitle='Day of the week' :validate="'required'"
                             :name="`Day ${slotKey + 1}`"  placeholder="Choose" :options="allDays"
                             :multiple="true"
                             label="value"
                             :reduce="data => data.key"
                             v-model="schedule.slots.day"></main-select>
              </b-col>
              <b-col md="2" class="mb-4">
                <input-form
                    placeholder="00:00 AM"
                    :validate="'required'"
                    :name="`From ${slotKey + 1}`"
                    :label="'From'"
                    v-model="schedule.slots.from"
                    type="time"
                />
              </b-col>
              <b-col md="2" class="mb-4">
                <input-form
                    placeholder="00:00 AM"
                    :validate="'required'"
                    :name="`To ${slotKey + 1}`"
                    :label="'To'"
                    v-model="schedule.slots.to"
                    type="time"
                />
              </b-col>
              <b-col md="4" class="mb-4">
                <main-select labelTitle='Instructor' :validate="'required'"
                             :name="`Instructor ${slotKey + 1}`"  placeholder="Pick instructor" :options="allDays"
                             :multiple="true"
                             label="value"
                             :reduce="data => data.key"
                             v-model="schedule.slots.instructor"></main-select>
              </b-col>
            </b-row>
            <span v-if="(slotKey != 0)" class="text-danger deleteLabelButton cursor-pointer"
                  @click="deleteSlot(slotKey)">Delete</span>
          </b-col>
          <b-col md="12" class="mb-3">
                  <span class="text-warning cursor-pointer" @click="addNewSlot">
                    +Add another slot</span>
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
    scheduleDetails: {
      type: Object
    },
    allFlows: {
      type: Object
    }
  },
  data () {
    return {
      schedule: {
        slots: [{
          day: '',
          from: '',
          to: '',
          instructor: '',
          ladies_only: ''
        }],
        status: 'active',
        flow_id: '',
        flow_name: ''
      },
      allDays: [
        {
          key: 'Sat',
          value: 'Saturday'
        }, {
          key: 'Sun',
          value: 'Sunday'
        }, {
          key: 'Mon',
          value: 'Monday'
        }, {
          key: 'Tue',
          value: 'Tuesday'
        }, {
          key: 'Wed',
          value: 'Wednesday'
        }, {
          key: 'Thu',
          value: 'Thursday'
        }, {
          key: 'Fri',
          value: 'Friday'
        }
      ]
    }
  },
  methods: {
    addSlots () {
      if (this.typeOfModal === 'add') {
        this.$emit('addSlot', this.slot)
      } else {
        this.$emit('editSlot', { ...this.slot, _method: 'put' })
      }
    },
    addNewSlot () {
      this.schedule.slots.push({
        days: [],
        from: '',
        to: '',
        instructor: '',
        ladies_only: ''
      })
    },
    deleteSlot (ind) {
      this.schedule.slots.splice(ind, 1)
    }
  },
  created () {
    this.getAllFlows()
    if (this.scheduleDetails) {
      this.schedule = {
        day: this.scheduleDetails.day,
        from: this.scheduleDetails.from,
        to: this.scheduleDetails.to,
        instructor: this.scheduleDetails.instructor,
        ladies_only: this.scheduleDetails.ladies_only,
        status: 'active',
        flow_id: this.scheduleDetails.flow_id,
        flow_name: this.scheduleDetails.flow.name
      }
    }
  }
}
</script>
