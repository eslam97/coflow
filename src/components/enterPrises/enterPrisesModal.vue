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
                      <ValidationProvider name="title" ref="title" rules="required" v-slot="{ errors }">
                        <b-form-input v-model="enterprises.title" type="text" placeholder="Project Title" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="Link:" label-for="arabic_title">
                      <ValidationProvider name="link" ref="link"  v-slot="{ errors }">
                        <b-form-input v-model="enterprises.link" type="text" placeholder="link" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group
                        label-for="exampleInputcolor"
                        label="project color"
                        class="col-md-6">
                      <ValidationProvider name="Color" rules="required" ref="color" v-slot="{ errors }">
                        <b-form-input type="color" id="exampleInputcolor" v-model="enterprises.color" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group label="Description" label-for="enterprisesDesc" class="col-md-12">
                      <b-form-textarea id="enterprisesDesc" rows="2" v-model="enterprises.description"></b-form-textarea>
                    </b-form-group>
                  </b-row>
                  <div class="d-flex  mt-4 align-items-center justify-content-between">
                    <b-form-checkbox v-model="enterprises.is_active">Is Active</b-form-checkbox>
                    <b-button  v-if="edit" variant="primary" type="submit">Edit Project</b-button>
                    <b-button v-else variant="primary" type="submit" >Add New Project</b-button>
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
  name: 'addenterprises',
  props: {
    edit: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    ...mapGetters(['getSpacificenterprises'])
  },
  mounted () {
    core.index()
    if (this.edit) {
      this.enterprises = {
        title: this.getSpacificenterprises.title,
        color: this.getSpacificenterprises.color,
        is_active: this.getSpacificenterprises.is_active === 1,
        link: this.getSpacificenterprises.link,
        sort: this.getSpacificenterprises.sort,
        description: this.getSpacificenterprises.description
      }
    } else {
      this.resetData()
    }
  },
  data () {
    return {
      enterprises: {
        title: '',
        link: '',
        color: '#3291a8',
        is_active: true,
        sort: '',
        description: ''
      },
      errors: []
    }
  },
  methods: {
    resetData () {
      this.enterprises = {
        title: '',
        color: '#3291a8',
        is_active: true,
        sort: '',
        description: ''
      }
    },
    onSubmit () {
      /*      this.user.name = this.fullName
      db.collection('users').add(this.user) */
      // eslint-disable-next-line no-undef
      if (this.edit) {
        // console.log('this.getSpacificenterprises', this.getSpacificenterprises)
        this.$store.dispatch('editenterprises', {
          enterprisesId: this.getSpacificenterprises.id,
          newData: this.enterprises
        }).then(() => {
          core.showSnackbar('success', 'enterprises has been Edit successfully.')
          this.$bvModal.hide('modal-11')
        }).catch(err => {
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            this.$refs[key].setErrors(value)
          }
        /*  for (const [key, value] of Object.entries(err.response.data.errors)) {
            core.showSnackbar('error', `${key}: ${value}`)
          } */
        })
      } else {
        this.$store.dispatch('createNewenterprises', this.enterprises).then(data => {
          core.showSnackbar('success', 'enterprises has been create successfully.')
          this.$bvModal.hide('modal-11')
        }).catch(err => {
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            this.$refs[key].setErrors(value)
          }
          /* for (const [key, value] of Object.entries(err.response.data.errors)) {
            // this.enterprisesNameError = err.response.data.errors[0]
            core.showSnackbar('error', `${key}: ${value}`)
          } */
        })
      }
    }
  }
}
</script>
