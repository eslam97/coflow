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
                    <b-form-group class="col-md-12" label="Title:" label-for="title">
                      <ValidationProvider name="title" ref="title" rules="required" v-slot="{ errors, title }">
                        {{title}}
                        <b-form-input v-model="callStatus.title" type="text" placeholder="Title" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="Reserve Period:" label-for="title">
                      <ValidationProvider name="Days" rules="required" v-slot="{ errors }">
                        <b-form-input v-model="callStatus.days" type="number" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="Rerturn Period:" label-for="title">
                      <ValidationProvider name="Days" rules="required" v-slot="{ errors }">
                        <b-form-input v-model="callStatus.return" type="number"  :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group
                        label-for="exampleInputcolor"
                        label="Status color"
                        class="col-md-6">
                      <ValidationProvider name="color" ref="color" rules="required" v-slot="{ errors }">
                        <b-form-input type="color" id="exampleInputcolor" v-model="callStatus.color" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="Hold Period:" label-for="title">
                        <b-form-input v-model="callStatus.hold" type="number"></b-form-input>
                    </b-form-group>
                  </b-row>
                  <div class="d-flex  mt-4 align-items-center justify-content-between">
                    <b-form-checkbox v-model="callStatus.is_active">Is Active</b-form-checkbox>
                    <b-button  v-if="edit" variant="primary" type="submit">Edit callStatus</b-button>
                    <b-button v-else variant="primary" type="submit" >Add New callStatus</b-button>
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
  name: 'addcallStatus',
  props: {
    edit: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    ...mapGetters(['getSpacificcallStatus'])
  },
  mounted () {
    core.index()
    if (this.edit) {
      this.callStatus = {
        title: this.getSpacificcallStatus.title,
        color: this.getSpacificcallStatus.color,
        days: this.getSpacificcallStatus.days,
        hold: this.getSpacificcallStatus.hold,
        return: this.getSpacificcallStatus.return,
        // eslint-disable-next-line eqeqeq
        is_active: this.getSpacificcallStatus.is_active == 1
      }
    } else {
      this.resetData()
    }
  },
  data () {
    return {
      callStatus: {
        title: '',
        color: '#3291a8',
        days: '',
        hold: '',
        return: '',
        is_active: true
      },
      errors: []
    }
  },
  methods: {
    resetData () {
      this.callStatus = {
        title: '',
        color: '#3291a8',
        days: '',
        is_active: true
      }
    },
    onSubmit () {
      /*      this.user.name = this.fullName
      db.collection('users').add(this.user) */
      // eslint-disable-next-line no-undef
      if (this.edit) {
        this.$store.dispatch('editcallStatus', {
          callStatusId: this.getSpacificcallStatus.id,
          newData: this.callStatus
        }).then(() => {
          core.showSnackbar('success', 'callStatus has been Edit successfully.')
          this.$bvModal.hide('modal-callStatus')
        }).catch(err => {
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            this.$refs[key].setErrors(value)
          }
          /*
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            core.showSnackbar('error', `${key}: ${value}`)
          } */
        })
      } else {
        this.$store.dispatch('createNewcallStatus', this.callStatus).then(data => {
          core.showSnackbar('danger', 'callStatus has been create successfully.')
          this.$bvModal.hide('modal-callStatus')
        }).catch(err => {
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            this.$refs[key].setErrors(value)
          }
          /*          for (const [key, value] of Object.entries(err.response.data.errors)) {
                      core.showSnackbar('error', `${key}: ${value}`)
                    } */
        })
      }
    }
  }
}
</script>
