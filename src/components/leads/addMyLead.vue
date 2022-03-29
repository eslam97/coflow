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
                    <b-form-group class="col-md-12" label="Name:" label-for="name">
                      <ValidationProvider name="name" ref="name" rules="required" v-slot="{ errors }">
                        <b-form-input v-model="lead.name" type="text" placeholder="Lead Name" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-12" label="Project:" label-for="project">
                      <ValidationProvider name="project" ref="project" rules="required" v-slot="{ errors }">
                        <v-select id="enterprise" multiple v-model="selectedProject" :options="projects" label="en_title" required
                                  :selectable="option => !selectedProject.includes(option.id)"
                                  :reduce="option => option.id"
                                  @option:deselected="removeProject" @option:selecting="addProject"
                        >
                        </v-select>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-12" label="Selected Projects:" label-for="project"
                                  v-if="lead.projects && lead.projects.length > 0">
                      <div class="projectsPrice">
                        <div class="content-price mb-1" v-for="(project, parentKey) in lead.projects" :key="parentKey">
                          <p class="text-primary px-2 font-size-18">{{ project.en_title }} *</p>
                          <b-form-group class="col-md-12" label="Inquiry:" label-for="inquiry">
                            <select class="form-control bg-white" id="inquiry" required v-model="project.inquiry">
                              <option selected disabled value="">Choose...</option>
                              <option v-for="(item , key) in inquiry" :key="key" :value="item.id">{{item.title}}</option>
                            </select>
                          </b-form-group>
                          <b-form-group class="col-md-12" label="Note:" label-for="comment">
                            <b-textarea class="bg-white" v-model="project.note"></b-textarea>
                          </b-form-group>
                          <b-row class="d-flex flex-wrap col-md-12">
                            <b-col v-for="(status, childKey) in call_Status" :key="childKey"
                                   class="col-4 text-black text-center mb-3 cursor-pointer">
                                <span
                                    :class="['d-inline-block w-100 p-1 custom-rounded  primary-color bg-white',{
                                      'shadow bg-primary text-white' : isSelected(parentKey,status.id)}]"
                                    @click="project.status = status.id">
                                <i :class="[{ 'las la-check-square' : isSelected(parentKey,status.id)}]"></i> {{status.title }}
                                </span>
                              <span class="d-block w-100 h-10 bg-white"></span>
                              <span :style="[{ backgroundColor:status.color }]" class="d-block w-100 h-10"></span>
                            </b-col>
                          </b-row>
                          <hr class="bg-primary" v-show="lead.projects.length-1 > parentKey"/>
                        </div>
                      </div>
                    </b-form-group>
                    <b-form-group class="col-md-12" label="Source:" label-for="source">
                      <select class="form-control" id="source" required v-model="lead.source">
                        <option selected disabled value="">Choose...</option>
                        <option v-for="(source , key) in source" :key="key" :value="source.id">{{source
                            .title}}</option>
                      </select>
                    </b-form-group>
                    <b-form-group class="col-md-12" label="From:" label-for="from">
                      <select class="form-control" id="from" required v-model="lead.from">
                        <option selected disabled value="">Choose...</option>
                        <option v-for="(from , key) in from" :key="key" :value="from.id">{{from.title}}</option>
                      </select>
                    </b-form-group>
                  </b-row>
                  <div class="d-flex  mt-4 align-items-center justify-content-end">
                    <b-button v-if='loadingAddLead' class="btn btn-primary float-right" variant="primary" disabled>
                      <b-spinner small type="grow"></b-spinner>
                      loading...
                    </b-button>
                    <b-button v-else variant="primary" type="submit" >Add My Lead</b-button>
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

export default {
  name: 'addLead',
  props: {
    allStatus: {
      type: Array
    },
    leads: {
      type: Object
    }
  },
  mounted () {
    core.index()
  },
  data () {
    return {
      statusId: '',
      selectedStatus: '',
      loadingAddLead: false,
      lead_id: '',
      listData: [],
      disabled: 0,
      selected: '',
      errors: [],
      loadingDataFromPhone: false,
      call_Status: [],
      from: [],
      inquiry: [],
      projects: [],
      source: [],
      selectedProject: [],
      lead: {}
    }
  },
  methods: {
    isSelected (projectIndex, id) {
      // console.log(projectIndex, id)
      return id === this.lead.projects[projectIndex].status
    },
    onSubmit () {
      this.loadingAddLead = true
      this.$store.dispatch('createNewLeadWithStatus', this.lead).then(res => {
        core.showSnackbar('success', res.data.message)
        this.$bvModal.hide('addMyLead')
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
    },
    addProject (project) {
      this.lead.projects.push({ ...project, project: project.id, inquiry: '', note: '', status: '' })
    },
    removeProject (project) {
      var position = this.lead.projects.findIndex(i => i.id === project.id)
      this.lead.projects.splice(position, 1)
    }
  },
  created () {
    // console.log('this.leads', this.leads)
    this.lead = { ...this.leads }
    this.lead.projects = []
    this.$store.dispatch('getInfoToCreateLead').then((res) => {
      this.call_Status = res.data.data.call_Status
      this.from = res.data.data.from
      this.inquiry = res.data.data.inquiry
      this.source = res.data.data.source
      this.projects = res.data.data.projects
    })
  }
}
</script>
<style>
.periodNumbers , .projectsPrice{
  padding: 5px;
  background: transparent;
  border: 1px solid #d7dbda;
  font-size: 14px;
  color: var(--iq-secondary);
  border-radius: 10px;
  background: #92e8cb00;
}
.list-group-item.active p, .list-group-item.active h5, .list-group-item.active small.text-muted{
  color: #fff !important;
}
.projectsPrice {
  background: var(--iq-bg-light-color);
  flex-wrap: wrap;
}
</style>
