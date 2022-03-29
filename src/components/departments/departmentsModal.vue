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
                        <b-form-input v-model="departments.title" type="text" placeholder="Title" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group
                        label-for="exampleInputcolor"
                        label="color"
                        class="col-md-6">
                      <ValidationProvider name="color" ref="color" rules="required" v-slot="{ errors }">
                        <b-form-input type="color" id="exampleInputcolor"  v-model="departments.color" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-12" label="Projects:" label-for="code">
                      <ValidationProvider name="enterprise" ref="enterprise" rules="required" v-slot="{ errors }">
                        <v-select id="enterprise" multiple v-model="departments.enterprises" :options="allEnterprises" label="title" required
                                  :selectable="option => !allEnterprises.includes(option.id)"
                                  :reduce="option => option.id"
                        >
                        </v-select>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                  </b-row>
                  <div class="d-flex  mt-4 align-items-center justify-content-between">
                    <b-form-checkbox :true-value="1" v-model="departments.is_active">Is Active</b-form-checkbox>
                    <b-button  v-if="edit" variant="primary" type="submit">Edit departments</b-button>
                    <b-button v-else variant="primary" type="submit" >Add New departments</b-button>
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
  name: 'adddepartments',

  created () {
    this.$store.dispatch('getAllEnterPrisesListingForSelect').then(res => {
      this.allEnterprises = res.data.data.enterprise
    })
  },
  props: {
    edit: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    ...mapGetters(['getSpacificdepartments'])
  },
  mounted () {
    core.index()
    if (this.edit) {
      this.departments = {
        title: this.getSpacificdepartments.title,
        color: this.getSpacificdepartments.color,
        enterprises: this.getSpacificdepartments.enterprises,
        // eslint-disable-next-line eqeqeq
        is_active: this.getSpacificdepartments.is_active == 1
      }
    } else {
      this.resetData()
    }
  },
  data () {
    return {
      allEnterprises: [],
      departments: {
        title: '',
        color: '#3291a8',
        enterprises: [],
        is_active: true
      },
      errors: []
    }
  },
  methods: {
    resetData () {
      this.departments = {
        title: '',
        color: '#3291a8',
        enterprises: [],
        is_active: 1
      }
    },
    onSubmit () {
      /*      this.user.name = this.fullName
      db.collection('users').add(this.user) */
      // eslint-disable-next-line no-undef
      if (this.edit) {
        this.$store.dispatch('editdepartments', {
          departmentsId: this.getSpacificdepartments.id,
          newData: this.departments
        }).then(() => {
          core.showSnackbar('success', 'departments has been Edit successfully.')
          this.$bvModal.hide('modal-departments')
        }).catch(err => {
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            this.$refs[key].setErrors(value)
          }
        })
      } else {
        this.$store.dispatch('createNewdepartments', this.departments).then(data => {
          core.showSnackbar('success', 'departments has been create successfully.')
          this.$bvModal.hide('modal-departments')
        }).catch(err => {
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            this.$refs[key].setErrors(value)
          }
        })
      }
    }
  }
}
</script>
