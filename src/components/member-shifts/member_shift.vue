<template>
  <b-container fluid>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)">
        <b-row>
          <b-col lg="12">
            <iq-card>
              <template v-slot:body>
                <div class="new-user-info">
                  <b-row>
                    <b-form-group class="col-md-6" label="Title:" label-for="title">
                      <ValidationProvider name="title" ref="title" rules="required" v-slot="{ errors }">
                        <b-form-input v-model="shift.title" type="text" placeholder="Title" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="Choose Days:" label-for="day">
                      <div>
                        <v-select :options="days" multiple v-model="shift.days" label="en_title" >
                        </v-select>
                      </div>
                    </b-form-group>
                  </b-row>
                  <b-row>
                    <b-form-group class="col-md-6" label="Start Time" label-for="exampleInputtime">
                      <ValidationProvider name="icon" ref="icon" rules="required" v-slot="{ errors }">
                        <b-form-input id="exampleInputtime" type="time" v-model="shift.start"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="end Time" label-for="exampleInputtime">
                      <ValidationProvider name="icon" ref="icon" rules="required" v-slot="{ errors }">
                        <b-form-input id="exampleInputtime" type="time" v-model="shift.end"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                  </b-row>
                  <div class="d-flex  mt-4 align-items-center justify-content-between">
                    <b-form-checkbox v-model="shift.is_active">Is Active</b-form-checkbox>
                    <b-button  v-if="edit" variant="primary" type="submit">Edit shift</b-button>
                    <b-button v-else variant="primary" type="submit" >Add New shift</b-button>
                  </div>
                </div>
              </template>
            </iq-card>
          </b-col>
        </b-row>
      </form>
    </ValidationObserver>
  </b-container>
</template>
<script>
import { core } from '../../config/pluginInit'
/*
import { db } from '../../config/firebase'
*/
import { mapGetters } from 'vuex'

export default {
  props: {
    edit: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    ...mapGetters(['GetSpacificshift_times'])
  },
  mounted () {
    core.index()
    if (this.edit) {
      this.shift = {
        title: this.GetSpacificshift_times.title,
        start: this.GetSpacificshift_times.start.slice(0, 5),
        end: this.GetSpacificshift_times.end.slice(0, 5),
        days: this.GetSpacificshift_times.days,
        is_active: true
      }
    } else {
      this.resetData()
    }
  },
  data () {
    return {
      shift: {
        title: '',
        start: '13:45',
        end: '13:45',
        days: [],
        is_active: true
      },
      errors: [],
      days: ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday']
    }
  },
  methods: {
    resetData () {
      this.shift = {
        title: '',
        start: '13:45',
        end: '13:45',
        days: [],
        is_active: true
      }
    },
    tConvert (time) {
      time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/)
      if (time.length > 1) {
        time = time.slice(1)
        time[5] = +time[0] < 12 ? 'AM' : 'PM'
        time[0] = +time[0] % 12 || 12
      }
      time.splice(3, 1, ' ')
      return time.join('')// return adjusted time or original string
    },
    onSubmit () {
      /*      this.user.name = this.fullName
      db.collection('users').add(this.user) */
      // eslint-disable-next-line no-undef
      if (this.edit) {
        this.$store.dispatch('editshift_times', {
          shiftTimesId: this.GetSpacificshift_times.id,
          newData: this.shift
        }).then(() => {
          core.showSnackbar('success', 'shift has been Edit successfully.')
          this.$bvModal.hide('modal-shifts')
        }).catch(err => {
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            core.showSnackbar('error', `${key}: ${value}`)
          }
        })
      } else {
        this.$store.dispatch('createNewshift_times', this.shift).then(data => {
          core.showSnackbar('success', 'shift has been create successfully.')
          this.$bvModal.hide('modal-shifts')
        }).catch(err => {
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            core.showSnackbar('error', `${key}: ${value}`)
          }
        })
      }
    }
  }
}
</script>
