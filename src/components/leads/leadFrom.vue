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
                        <b-form-input v-model="leadFrom.title" type="text" placeholder="Title" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group
                        label-for="exampleInputcolor"
                        label="project color"
                        class="col-md-6">
                      <ValidationProvider name="color" ref="color" rules="required" v-slot="{ errors }">
                        <b-form-input type="color" id="exampleInputcolor" v-model="leadFrom.color" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                  </b-row>
                  <div class="d-flex  mt-4 align-items-center justify-content-between">
                    <b-form-checkbox v-model="leadFrom.is_active">Is Active</b-form-checkbox>
                    <b-button  v-if="edit" variant="primary" type="submit">Edit leadFrom</b-button>
                    <b-button v-else variant="primary" type="submit" >Add leadFrom</b-button>
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
  name: 'addFrom',
  props: {
    edit: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    ...mapGetters(['getSpacificFrom'])
  },
  mounted () {
    core.index()
    if (this.edit) {
      this.leadFrom = {
        title: this.getSpacificFrom.title,
        color: this.getSpacificFrom.color,
        is_active: this.getSpacificFrom.is_active === 1
      }
    } else {
      this.resetData()
    }
  },
  data () {
    return {
      leadFrom: {
        title: '',
        color: '#3291a8',
        is_active: true
      },
      errors: []
    }
  },
  methods: {
    resetData () {
      this.leadFrom = {
        title: '',
        color: '#3291a8',
        is_active: true
      }
    },
    onSubmit () {
      /*      this.user.name = this.fullName
      db.collection('users').add(this.user) */
      // eslint-disable-next-line no-undef
      if (this.edit) {
        // eslint-disable-next-line eqeqeq
        this.$store.dispatch('editLeadFrom', {
          leadId: this.getSpacificFrom.id,
          newData: this.leadFrom
        }).then(() => {
          core.showSnackbar('success', 'leadFrom has been Edit successfully.')
          this.$bvModal.hide('modal-leadfrom')
        }).catch(err => {
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            this.$refs[key].setErrors(value)
          }
        })
      } else {
        this.$store.dispatch('createNewLeadFrom', this.leadFrom).then(data => {
          core.showSnackbar('success', 'leadFrom has been create successfully.')
          this.$bvModal.hide('modal-leadfrom')
        }).catch(err => {
          // console.log(err.response)
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            this.$refs[key].setErrors(value)
          }
        })
      }
    }
  }
}
</script>
