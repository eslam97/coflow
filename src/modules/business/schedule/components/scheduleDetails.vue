<template>
  <div>
    <validationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(addSlots)">
        <b-row>
          <b-col md="12" class="mb-3">
            <main-select labelTitle='Flow' :validate="'required'"
                         :name="`Flow`" placeholder="Pick flow" :options="allFlows"
                         label="name" :disabled="typeOfModal === 'edit'"
                         :reduce="data => data.id"
                         v-model="schedule.flow_id"></main-select>
          </b-col>
          <b-col md="12" class="position-relative mb-4 border-bottom"
                 v-for="(slot, slotKey) in schedule.slots" :key="slotKey">
            <b-row class="d-flex align-items-center mb-4">
              <b-col md="4" >
                <main-select labelTitle='Day of the week' :validate="'required'"
                             :name="`Day ${slotKey + 1}`"  placeholder="Choose" :options="allDays"
                             label="key"
                             :multiple="typeOfModal==='add'"
                             :reduce="data => data.value"
                             v-model="slot.day"></main-select>
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
                             :options="!schedule.flow_id ? '':
                             allFlows.find((flow) => flow.id === schedule.flow_id).instructors"
                             label="first_name"
                             :multiple="true"
                             :reduce="data => data.first_name"
                             v-model="slot.instructor"></main-select>
              </b-col>
              <b-col>
                <b-form-checkbox type="checkbox"
                                 value="1"
                                 unchecked-value="0"
                                 v-model="slot.ladies_only" label="Ladies only" :name="`Ladies only ${slotKey + 1}`"
                                 class="custom-checkbox-color-check mb-2 mr-sm-2 mb-sm-0" color="warning">
                  Ladies Only Class
                </b-form-checkbox>
              </b-col>
            </b-row>
            <span v-if="(slotKey != 0)" class="text-danger deleteLabelButton cursor-pointer"
                  @click="deleteSlot(slotKey)">Delete</span>
          </b-col>
          <b-col md="12" class="mb-3">
            <span class="text-warning cursor-pointer deleteLabelButton px-3" v-if="(typeOfModal === 'add')"
                  @click="addNewSlot">+Add another slot(s)</span>
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
          id: '',
          day: [],
          from: '',
          to: '',
          instructor: '',
          ladies_only: +false,
          status: ''
        }],
        status: 'active',
        flow_id: '',
        flow_name: ''
      },
      allDays: [
        {
          key: 'Saturday',
          value: 'saturday'
        }, {
          key: 'Sunday',
          value: 'sunday'
        }, {
          key: 'Monday',
          value: 'monday'
        }, {
          key: 'Tuesday',
          value: 'tuesday'
        }, {
          key: 'Wednesday',
          value: 'wednesday'
        }, {
          key: 'Thursday',
          value: 'thursday'
        }, {
          key: 'Friday',
          value: 'friday'
        }
      ]
    }
  },
  methods: {
    addSlots () {
      if (this.typeOfModal === 'add') {
        this.$emit('addSlots', this.schedule)
      } else {
        this.schedule.slots[0].status = this.scheduleDetails.status
        this.schedule.slots[0].from = this.schedule.slots[0].from.slice(0, 5)
        this.schedule.slots[0].to = this.schedule.slots[0].to.slice(0, 5)
        this.schedule.slots[0].ladies_only = +this.schedule.slots[0].ladies_only
        const obj = {
          flow_id: this.schedule.flow_id,
          ...this.schedule.slots[0],
          _method: 'put'
        }
        this.$emit('editSlot', this.schedule.slots[0].id, obj)
      }
    },
    addNewSlot () {
      this.schedule.slots.push({
        days: [],
        from: '',
        to: '',
        instructor: '',
        ladies_only: +false
      })
    },
    deleteSlot (ind) {
      this.schedule.slots.splice(ind, 1)
    }
  },
  created () {
    if (this.scheduleDetails) {
      this.schedule = {
        slots: [{
          id: this.scheduleDetails.slotId,
          day: this.scheduleDetails.day,
          from: this.scheduleDetails.from,
          to: this.scheduleDetails.to,
          instructor: this.scheduleDetails.instructor,
          ladies_only: +this.scheduleDetails.ladies_only,
          status: this.scheduleDetails.status
        }],
        status: 'active',
        flow_id: this.scheduleDetails.flow_id,
        flow_name: this.scheduleDetails.flow.name
      }
    }
    console.log(this.schedule)
  }

}
</script>
