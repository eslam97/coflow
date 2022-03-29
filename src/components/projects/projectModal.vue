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
                    <b-form-group class="col-md-6" label="Branch Code:" label-for="code">
                      <ValidationProvider name="code" ref="code" rules="required" v-slot="{ errors }">
                        <b-form-input v-model="project.code" type="text" placeholder="Branch Code" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="Projects:" label-for="code">
                      <ValidationProvider name="enterprise" ref="enterprise" rules="required" v-slot="{ errors }">
                        <select  class="form-control" id="enterprise" v-model="project.enterprise">
                        <option selected disabled value="">Choose enterprise...</option>
                          <option v-for="(i, key) in allEnterprises" :key="key" :value="i.id">
                            <span class="w-20 h-20 d-inline-block" :style="[{ backgroundColor:i.color }]"></span> <span>{{i.title}}</span>
                          </option>
                      </select>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="English Title:" label-for="english_title">
                      <ValidationProvider name="Een_title" ref="en_title" rules="required|max:20" v-slot="{ errors }">
                        <b-form-input v-model="project.en_title" type="text" placeholder="English Title" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="Arabic Title:" label-for="arabic_title">
                      <ValidationProvider name="ar_title" ref="ar_title" rules="required" v-slot="{ errors }">
                        <b-form-input v-model="project.ar_title" type="text" placeholder="Arabic Title" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group
                        label-for="exampleInputcolor"
                        label="branch color"
                        class="col-md-6">
                      <ValidationProvider name="Color" rules="required" ref="color" v-slot="{ errors }">
                        <b-form-input type="color" id="exampleInputcolor" v-model="project.color" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group
                        label-for="Sort"
                        class="col-md-6"
                        label="Sort:">
                      <ValidationProvider name="Sort" ref="sort" v-slot="{ errors }" >
                       <b-form-input type="number" id="Sort" placeholder="Ex:1" v-model="project.sort" :class="(errors.length > 0 ? ' is-invalid' : '')" data-vv-validate-on="change|custom"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                          <br>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group label="Description" label-for="projectDesc" class="col-md-12">
                      <b-form-textarea id="projectDesc" rows="2" v-model="project.description"></b-form-textarea>
                    </b-form-group>
                  </b-row>
                  <div class="d-flex  mt-4 align-items-center justify-content-between">
                    <b-form-checkbox v-model="project.is_active">Is Active</b-form-checkbox>
                    <b-button  v-if="edit" variant="primary" type="submit">Edit Branch</b-button>
                    <b-button v-else variant="primary" type="submit" >Add New Branch</b-button>
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
  name: 'addProject',
  props: {
    edit: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    ...mapGetters(['getSpacificProject'])
  },
  mounted () {
    core.index()
    if (this.edit) {
      this.project = {
        code: this.getSpacificProject.code,
        ar_title: this.getSpacificProject.ar_title,
        en_title: this.getSpacificProject.en_title,
        color: this.getSpacificProject.color,
        is_active: this.getSpacificProject.is_active === 1,
        sort: this.getSpacificProject.sort,
        description: this.getSpacificProject.description,
        enterprise: this.getSpacificProject.enterprise_id
      }
    } else {
      this.resetData()
    }
  },
  data () {
    return {
      project: {
        code: '',
        ar_title: '',
        en_title: '',
        color: '#3291a8',
        is_active: true,
        sort: '',
        description: '',
        enterprise: ''
      },
      allEnterprises: [],
      errors: []
    }
  },
  methods: {
    resetData () {
      this.project = {
        ar_title: '',
        en_title: '',
        color: '#3291a8',
        is_active: true,
        sort: '',
        description: '',
        enterprise: ''
      }
    },
    onSubmit () {
      /*      this.user.name = this.fullName
      db.collection('users').add(this.user) */
      // eslint-disable-next-line no-undef
      if (this.edit) {
        this.$store.dispatch('editProject', {
          projectId: this.getSpacificProject.id,
          newData: this.project
        }).then(() => {
          core.showSnackbar('success', 'project has been Edit successfully.')
          this.$bvModal.hide('modal-4')
        }).catch(err => {
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            this.$refs[key].setErrors(value)
          }
        })
      } else {
        this.$store.dispatch('createNewProject', this.project).then(data => {
          core.showSnackbar('success', 'project has been create successfully.')
          this.$bvModal.hide('modal-4')
        }).catch(err => {
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            this.$refs[key].setErrors(value)
          }
        })
      }
    }
  },
  created () {
    this.$store.dispatch('getAllEnterPrisesListingForSelect').then(res => {
      this.allEnterprises = res.data.data.enterprise
    })
  }
}
</script>
