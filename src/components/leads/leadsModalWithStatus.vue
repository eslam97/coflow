<template>
  <b-container fluid>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)">
        <b-row>
          <b-col lg="12">
            <iq-card>
              <template v-slot:body>
                <b-row>
                  <b-form-group class="col-md-12" label="Phone Number:" label-for="english_title">
                    <ValidationProvider name="phone" ref="phone" rules="digits:11" v-slot="{ errors }">
                      <b-form-input :disabled="disabled == 1" @update="searchPhoneNumber" v-model="lead.phone" type="number" placeholder="Phone Number" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                      <div class="invalid-feedback">
                        <span>{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
                  </b-form-group>
                </b-row>
                <div class="new-user-info" v-if="finishSearch&&!currentUser">
                  <b-row>
                    <b-form-group class="col-md-12" label="Name:" label-for="name">
                      <ValidationProvider name="name" ref="name" rules="required" v-slot="{ errors }">
                        <b-form-input v-model="lead.name" type="text" placeholder="Lead Name" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="Project:" label-for="project">
                        <select class="form-control" id="project" required v-model="lead.project">
                          <option selected disabled value="">Choose...</option>
                          <option v-for="(project , key) in allFeatures.projects" :key="key" :value="project.id">{{project.en_title}}</option>
                        </select>
                    </b-form-group>

                    <b-form-group class="col-md-6" label="Source:" label-for="source">
                      <select class="form-control" id="source" required v-model="lead.source">
                        <option selected disabled value="">Choose...</option>
                        <option v-for="(source , key) in allFeatures.source" :key="key" :value="source.id">{{source.title}}</option>
                      </select>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="From:" label-for="from">
                      <select class="form-control" id="from" required v-model="lead.from">
                        <option selected disabled value="">Choose...</option>
                        <option v-for="(from , key) in allFeatures.from" :key="key" :value="from.id">{{from.title}}</option>
                      </select>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="Inquiry:" label-for="inquiry">
                      <select class="form-control" id="inquiry" required v-model="lead.inquiry">
                        <option selected disabled value="">Choose...</option>
                        <option v-for="(inquiry , key) in allFeatures.inquiry" :key="key" :value="inquiry.id">{{inquiry.title}}</option>

                      </select>
                    </b-form-group>
                    <b-form-group label="Comment" label-for="Comment" class="col-md-12">
                      <b-form-textarea id="Comment" rows="2" v-model="lead.comment"></b-form-textarea>
                    </b-form-group>
                  </b-row>
                  <b-row class="d-flex flex-wrap" >
                    <b-col v-for="(status, key) in allStatus" :key="key" class="col-3 text-black text-center mb-3 cursor-pointer" >
                      <span :class="[{ 'shadow bg-primary text-white' : isSelectedStatus(key)},'d-inline-block w-100 p-1 custom-rounded  primary-color ']" @click="(selectedStatus = key); (lead.status = status.id)">
                      <i  :class="[{ 'las la-check-square' : isSelectedStatus(key)}]"></i> {{status.title}}
                    </span>
                      <span  class="d-block w-100 h-10 bg-white"></span>
                      <span :style="[{ backgroundColor:status.color }]" class="d-block w-100 h-10">
                    </span>
                    </b-col>
                  </b-row>
                  <div class="d-flex  mt-4 align-items-center justify-content-end">
                    <b-button v-if='loadingAddLead' class="btn btn-primary float-right" variant="primary" disabled>
                      <b-spinner small type="grow"></b-spinner>
                      loading...
                    </b-button>
                    <b-button v-else variant="primary" type="submit" >Add My Lead</b-button>
                  </div>
                </div>

                <div class="user-branch" v-if="finishSearch&&currentUser">
                  <b-list-group>
                    <b-list-group-item v-for="(data, key) in listData" :key="key" href="#" :class="{ 'active' : isSelected(key) }" v-on:click="selected = key" class="flex-column align-items-start">
                      <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">{{ data.data.name }}</h5>
                        <small class="text-muted">{{ data.data.status }}</small>
                      </div>
                      <p class="mb-1">{{ lead.phone }}</p>
                      <small class="text-muted">{{ data.branch }}</small>
                    </b-list-group-item>
                  </b-list-group>
                  <div class="d-flex justify-content-end mt-3">
                    <b-button variant="primary"  class="mr-2" type="submit" @click.prevent="showDetails()" v-if="typeof (selected) == 'number'">Show Details</b-button>
                  </div>
                </div>
                <div v-if="loadingDataFromPhone" class="text-center">
                  <b-spinner small type="grow"></b-spinner>
                  Loading...
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
  name: 'addLead',
  props: {
    edit: {
      default: false,
      type: Boolean
    },
    allFeatures: {
      type: Object
    },
    allStatus: {
      type: Array
    }
  },
  computed: {
    ...mapGetters([''])
  },
  mounted () {
    core.index()
    if (this.edit) {
      /*      this.project = {
        ar_title: this.getSpacificProject.ar_title,
        en_title: this.getSpacificProject.en_title,
        color: this.getSpacificProject.color,
        is_active: this.getSpacificProject.is_active === 1,
        sort: this.getSpacificProject.sort,
        description: this.getSpacificProject.description
      } */
    } else {
      this.resetData()
    }
  },
  data () {
    return {
      statusId: '',
      selectedStatus: '',
      loadingAddLead: false,
      lead: {
        phone: '',
        name: '',
        inquiry: '',
        source: '',
        project: '',
        from: '',
        status: '',
        comment: ''
      },
      lead_id: '',
      listData: [],
      finishSearch: false,
      currentUser: false,
      disabled: 0,
      selected: '',
      errors: [],
      loadingDataFromPhone: false
    }
  },
  methods: {
    isSelectedStatus (i, id) {
      this.statusId = id
      return i === this.selectedStatus
    },
    searchPhoneNumber () {
      this.finishSearch = false
      this.listData = []
      if (this.lead.phone.length === 11) {
        this.loadingDataFromPhone = true
        this.disabled = 1
        this.$store.dispatch('getDataByPhoneNumber', { phone: this.lead.phone }).then((data) => {
          if (data.data.data.id) {
            this.lead_id = data.data.data.id
            this.lead.name = data.data.data.name
            this.lead.project = data.data.data.project ? data.data.data.project.id : ''
            this.lead.inquiry = data.data.data.inquiry.id
            this.lead.source = data.data.data.source.id
            this.lead.from = data.data.data.from.id
            this.currentUser = false
            this.finishSearch = true
            this.loadingDataFromPhone = false
            this.disabled = 0
          } else {
            this.currentUser = false
            for (const [key, value] of Object.entries(data.data.data)) {
              this.finishSearch = true
              if (typeof (value) === 'object') {
                if (value.data != null) {
                  this.listData.push({ branch: key, ...value })
                  this.currentUser = true
                }
              }
            }
            this.disabled = 0
            this.loadingDataFromPhone = false
          }
        }).catch(err => {
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            this.$refs[key].setErrors(value)
            this.loadingDataFromPhone = false
            this.disabled = 0
          }
        })
      }
    },
    resetData () {
      this.lead = {
        phone: '',
        name: '',
        inquiry: '',
        source: '',
        project: '',
        from: '',
        comment: ''
      }
      this.lead_id = ''
    },
    isSelected (i) {
      return i === this.selected
    },
    onSubmit () {
      /*      this.user.name = this.fullName
      db.collection('users').add(this.user) */
      // eslint-disable-next-line no-undef
      if (this.edit) {
        /*        this.$store.dispatch('editProject', {
          projectId: this.getSpacificProject.id,
          newData: this.project
        }).then(() => {
          core.showSnackbar('success', 'project has been Edit successfully.')
          this.$bvModal.hide('modal-4')
        }).catch(err => {
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            core.showSnackbar('error', `${key}: ${value}`)
          }
        }) */
      } else {
        this.loadingAddLead = true
        this.$store.dispatch('createNewLeadWithStatus', this.lead).then(res => {
          this.resetData()
          core.showSnackbar('success', res.data.message)
          this.$bvModal.hide('modal-all-lead')
          this.$emit('addMyLead')
          this.loadingAddLead = false
        }).catch(err => {
          if (err.response.data.error) {
            core.showSnackbar('error', err.response.data.error)
          } else {
            for (const [key, value] of Object.entries(err.response.data.errors)) {
              core.showSnackbar('error', `${key}: ${value}`)
            }
          }
          this.loadingAddLead = false
        })
      }
    },
    showDetails () {
      // eslint-disable-next-line no-unused-expressions
      // console.log(this.listData[this.selected])
      this.lead.name = this.listData[this.selected].data.name
      this.lead.project = this.listData[this.selected].project_id
      this.currentUser = false
    }
  }
}
</script>
<style>
.list-group-item.active p, .list-group-item.active h5, .list-group-item.active small.text-muted{
  color: #fff !important;
}
</style>
