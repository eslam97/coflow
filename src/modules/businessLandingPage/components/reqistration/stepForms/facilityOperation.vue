<template>
  <div>
    <div class="border-bottom my-5">
      <b-container>
        <h4 class="py-4">Facility Operation Days and Hours</h4>
      </b-container>
    </div>
    <b-container>
      <div class="w-75">
        <ValidationObserver v-slot="{ handleSubmit }">
        <b-form @submit.prevent="handleSubmit(saveFacilityOperation)">
          <b-row class="mb-5">
            <b-col md="12">
              <label class="mb-3">Operation</label>
              <div>
                <b-form-radio class="custom-radio-color-checked mr-5" inline v-model="typeOfOperation" color="warning"
                              name="color" value="24 hours" >
                  <span class="text-primary font-size-12">Open 24 Hours</span>
                </b-form-radio>
                <b-form-radio class="custom-radio-color-checked" inline v-model="typeOfOperation" color="warning"
                              name="color" value="specify days" >
                  <span class="text-primary font-size-12">Specify Days(s) and Hours</span>
                </b-form-radio>
              </div>
            </b-col>
          </b-row>
          <b-row v-if="typeOfOperation !== '24 hours'">
            <b-col md="12" class="position-relative mb-3" v-for="(operation, operationKey) in allOperation"
                   :key="operationKey">
              <b-row class="d-flex align-items-center">
                <b-col class="mb-3" md="4" >
                  <main-select labelTitle='Operation Day (s)' :validate="'required'"
                                 :name="`Operation Day ${operationKey + 1}`"  placeholder="Choose" :options="allDays"
                                  label="value"
                               :reduce="data => data.key"
                                 :multiple="true"
                                 v-model="operation.days"></main-select>
                </b-col>
                <b-col class="mb-3" md="4">
                  <input-form
                      placeholder="00:00 AM"
                      :validate="'required'"
                      :name="`From ${operationKey + 1}`"
                      :label="'From'"
                      v-model="operation.from"
                      type="time"
                  />
                </b-col>
                <b-col class="mb-3" md="4">
                  <input-form
                      placeholder="00:00 AM"
                      :validate="'required'"
                      :name="`To ${operationKey + 1}`"
                      :label="'To'"
                      v-model="operation.to"
                      type="time"
                  />
                </b-col>
              </b-row>
              <span class="text-danger deleteLabelButton cursor-pointer" @click="deleteOperationDay(operationKey)">Delete
              </span>
            </b-col>
            <b-col md="12" class="mb-3">
                  <span class="text-warning cursor-pointer" @click="addNewOperation">+ Add another Operation Day
                    (s)</span>
          </b-col>
            <b-col md="12">
              <p class="text-gray">Note: Specify working days & hours only, any day unspecified will automatically be set as
                “closed”.</p>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12" class="mt-3 d-flex justify-content-between align-items-center">
               <span @click="goBack" class="cursor-pointer text-black d-flex justify-content-between align-items-center">
                 <i class="mr-2 las la-arrow-left font-size-18"></i>
                <span class="text-bold">Back</span>
              </span>
              <span>
                <spinner-loading class="gradient-orange-button" text="Saving" v-if="loadingFacilityOperation"/>
                <b-button class="gradient-orange-button" type="submit" v-else>
                <span class="d-flex align-items-center">Done</span>
              </b-button>
              </span>
            </b-col>
          </b-row>
        </b-form>
      </ValidationObserver>
      </div>
    </b-container>
  </div>
</template>
<script>
import registrationServices from '@/modules/businessLandingPage/services/registration.services'
import { core } from '@/config/pluginInit'

export default {
  data () {
    return {
      typeOfOperation: '24 hours',
      allDays: [{
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
      }],
      allOperation: [
        {
          days: [],
          from: '',
          to: ''
        }
      ],
      // loading Steps
      loadingFacilityOperation: false
    }
  },
  methods: {
    saveFacilityOperation () {
      this.loadingFacilityOperation = true
      if (this.typeOfOperation === '24 hours') {
        const obj = {
          operation_type: '24 hours'
        }
        registrationServices.saveStepOperation(obj).then(res => {
          core.showSnackbar('success', res.data.message)
          this.$store.commit('formSteps/setActiveStepForm', 'Complete')
          localStorage.setItem('formStep', 'Complete')
          this.$router.push({ name: 'profileComplete' })
        }).finally(() => {
          this.loadingFacilityOperation = false
        })
      } else {
        const obj = {
          operation_type: 'specify days',
          operation: this.allOperation
        }
        registrationServices.saveStepOperation(obj).then(res => {
          core.showSnackbar('success', res.data.message)
          this.$store.commit('formSteps/setActiveStepForm', 'Complete')
          localStorage.setItem('formStep', 'Complete')
          this.$router.push({ name: 'profileComplete' })
        }).catch((err) => {
          if (err.response.data.errors) {
            for (const [key, value] of Object.entries(err.response.data.errors)) {
              this.$refs[key].setErrors(value)
            }
          }
        }).finally(() => {
          this.loadingFacilityOperation = false
        })
      }
    },
    addNewOperation () {
      this.allOperation.push({
        days: [],
        from: '',
        to: ''
      })
    },
    deleteOperationDay (key) {
      this.allOperation.splice(key, 1)
    },
    goBack () {
      this.$store.commit('formSteps/setActiveStepForm', 3)
    }
  }
}
</script>
