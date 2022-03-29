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
                    <b-form-group class="col-md-6" label="Project:" label-for="project">
                      <select class="form-control" id="project" required v-model="lead.project">
                        <option selected disabled value="">Choose...</option>
                        <option v-for="(project , key) in projects" :key="key" :value="project.id">{{project.en_title}}</option>
                      </select>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="Source:" label-for="source">
                      <select class="form-control" id="source" required v-model="lead.source">
                        <option selected disabled value="">Choose...</option>
                        <option v-for="(source , key) in source" :key="key" :value="source.id">{{source.title}}</option>
                      </select>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="From:" label-for="from">
                      <select class="form-control" id="from" required v-model="lead.from">
                        <option selected disabled value="">Choose...</option>
                        <option v-for="(from , key) in from" :key="key" :value="from.id">{{from.title}}</option>
                      </select>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="Inquiry:" label-for="inquiry">
                      <select class="form-control" id="inquiry" required v-model="lead.inquiry">
                        <option selected disabled value="">Choose...</option>
                        <option v-for="(inquiry , key) in inquiry" :key="key" :value="inquiry.id">{{inquiry.title}}</option>
                      </select>
                    </b-form-group>
                  </b-row>
                  <b-row class="d-flex flex-wrap" >
                    <b-col v-for="(status, key) in call_Status" :key="key" class="col-3 text-black text-center mb-3 cursor-pointer" >
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
              </template>
            </iq-card>
          </b-col>
        </b-row>
      </form>
    </ValidationObserver>
  </b-container>
</template>
<script>
import { core } from '@/config/pluginInit'
import leadService from '../services/leads'

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
      lead: {}
    }
  },
  methods: {
    isSelectedStatus (i, id) {
      this.statusId = id
      return i === this.selectedStatus
    },
    isSelected (i) {
      return i === this.selected
    },
    onSubmit () {
      this.loadingAddLead = true
      leadService.addLeadsWithStatus(this.lead).then(res => {
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
    }
  },
  created () {
    this.lead = this.leads
    leadService.getInfoToCreateLead().then((res) => {
      this.call_Status = res.data.data.call_Status
      this.from = res.data.data.from
      this.inquiry = res.data.data.inquiry
      this.projects = res.data.data.projects
      this.source = res.data.data.source
    })
  }
}
</script>
<style>
.list-group-item.active p, .list-group-item.active h5, .list-group-item.active small.text-muted{
  color: #fff !important;
}
</style>
