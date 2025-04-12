<template>
    <div class="flex-grow-1 mt-5" :style="{color: headerColor.color }">
        <div class="d-flex justify-content-between">
          <div style="width: 100px;" class="d-flex">
            <div>
              <div class="ladies-only" v-if="details.ladies_only">
                LADIES ONLY
              </div>
            </div>
          </div>
          <section style="flex-grow: 1" class="text-center">
            <div>
              <p class="calender-day-modal mb-0">{{ formattedDate(details.date).day }}  <span class="calender-day-month-modal"> {{ formattedDate(details.date).date }}</span></p>
              <p class="calender-time mb-0">{{ formatTime(details.from) }} - {{ formatTime(details.to) }}</p>
            </div>
            <div>
              <p class="mt-2 mb-0 calender-slot-name">{{ details.service.name }}</p>
              <p class="d-flex align-items-center justify-content-center w-100">
                <instractor-icon class="mr-2" :color="headerColor.color"/>
                <span class="calender-instractor">
                    <span v-for="(instractor, key) in details.instructors" :key="key">
                        {{ instractor.first_name }} {{ instractor.last_name }}
                        <span v-if="key !== details.instructors.length - 1"> | </span>
                    </span>
                </span>
              </p>

              <p class="calender-level">{{ details.service.level.name }}</p>
            </div>
          </section>

          <div style="width: 100px; calender-switch">
            <div class="d-flex align-items-center">
                <span class="text-black font-weight-bold font-size-14 mr-2">Private</span>
                <div
                    class="custom-control custom-switch custom-switch-text custom-control-inline custom-switch-color mr-0">
                  <div class="custom-switch-inner">
                    <input type="checkbox" class="custom-control-input bg-info" :id="'status'"
                           v-model="status">
                    <label class="custom-control-label"  :style="{ '--switch-color': headerColor.color }" :for="'status'">
                    </label>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
</template>
<script>
import instractorIcon from './instractorIcon.vue'

export default {
  components: {
    instractorIcon
  },
  props: {
    details: {
      type: Object
    },
    headerColor: {
      type: Object
    }
  },
  data () {
    return {
      status: 1
    }
  },
  methods: {
    formatTime (time) {
      time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time]
      time.splice(4)
      if (time.length > 1) {
        time = time.slice(1)
        time[5] = +time[0] < 12 ? ' AM' : ' PM'
        time[0] = +time[0] % 12 || 12
      }
      return time.join('')
    },
    formattedDate (dateTime) {
      const date = new Date(dateTime)
      const options = { weekday: 'long' }
      const dayName = date.toLocaleDateString('en-US', options)
      return {
        day: dayName,
        date: `${date.getMonth() + 1}/${date.getDate()}`
      }
    }
  }
}
</script>
<style scoped>
.ladies-only {
    font-weight: 500;
    color: #F91C96;
    background: white;
    padding: 4px 12px;
    border-radius: 16px;
    font-size: 12px;
  }
  .calender-day-modal {
    font-weight: 500;
    font-size: 16px;
    text-transform: uppercase;
  }
  .calender-day-month-modal {
    font-weight: 500;
    font-size: 24px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  }
  .calender-time {
    font-weight: 500;
    font-size: 14px;
  }
  .calender-slot-name {
    font-weight: 600;
    font-size: 24px;
  }
  .calender-instractor {
    font-weight: 500;
    font-size: 14px;
  }
  .calender-level {
    font-weight: 500;
    background: white;
    padding: 4px 10px;
    border-radius: 16px;
    font-size: 12px;
    text-transform: uppercase;
    display: inline-block;
  }
  .custom-switch.custom-switch-text .custom-switch-inner .custom-control-label {
    background: white !important;
    border-radius: 20px;
  }
  [dir=ltr][mode=light] .custom-switch .custom-control-input:checked ~ .custom-control-label::after {
    background: var(--switch-color) !important;
  }
</style>
