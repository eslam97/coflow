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
                        <b-form-input v-model="periods.title" type="text" placeholder="Title" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="Icon:" label-for="arabic_title">
                      <ValidationProvider name="icon" ref="icon" rules="required" v-slot="{ errors }">
                        <b-form-input v-model="periods.icon" type="text" placeholder="Icon" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                  </b-row>
                  <div class="d-flex  mt-4 align-items-center justify-content-between">
                    <b-form-checkbox v-model="periods.is_active">Is Active</b-form-checkbox>
                    <b-button  v-if="edit" variant="primary" type="submit">Edit periods</b-button>
                    <b-button v-else variant="primary" type="submit" >Add New periods</b-button>
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
  name: 'addperiods',
  props: {
    edit: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    ...mapGetters(['getSpacificperiods'])
  },
  mounted () {
    core.index()
    if (this.edit) {
      this.periods = {
        title: this.getSpacificperiods.title,
        icon: this.getSpacificperiods.icon,
        // eslint-disable-next-line eqeqeq
        is_active: this.getSpacificperiods.is_active == 1
      }
    } else {
      this.resetData()
    }
  },
  data () {
    return {
      periods: {
        title: '',
        icon: '',
        is_active: true
      },
      errors: []
    }
  },
  methods: {
    resetData () {
      this.periods = {
        title: '',
        icon: '',
        is_active: true
      }
    },
    onSubmit () {
      /*      this.user.name = this.fullName
      db.collection('users').add(this.user) */
      // eslint-disable-next-line no-undef
      if (this.edit) {
        this.$store.dispatch('editperiods', {
          periodsId: this.getSpacificperiods.id,
          newData: this.periods
        }).then(() => {
          core.showSnackbar('success', 'periods has been Edit successfully.')
          this.$bvModal.hide('modal-source')
        }).catch(err => {
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            core.showSnackbar('error', `${key}: ${value}`)
          }
        })
      } else {
        this.$store.dispatch('createNewperiods', this.periods).then(data => {
          core.showSnackbar('success', 'periods has been create successfully.')
          this.$bvModal.hide('modal-source')
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
