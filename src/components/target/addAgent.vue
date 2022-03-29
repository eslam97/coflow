<template>
  <b-container fluid>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(saveTarget)">
        <b-row>
          <b-col lg="12">
            <iq-card>
              <template v-slot:body>
                <div class="new-user-info">
                  <b-row>
                    <b-form-group class="col-md-12" label="User:" label-for="user">
                        <v-select label="users" :options="allUsers" :filterable="false" :reduce="option => option.id" @search="onSearch"
                                  @option:selecting="getDetailsOfUser"  @option:deselecting="allProjects = []">
                          <template slot="no-options">
                            type to search about users...
                          </template>
                          <template slot="option" slot-scope="option">
                            <div class="d-center">
                              {{ option.name }}
                            </div>
                          </template>
                          <template slot="selected-option" slot-scope="option">
                            <div class="selected d-center">
                              {{ option.name }}
                            </div>
                          </template>
                        </v-select>
                    </b-form-group>
                    <b-form-group class="col-md-12" label="List Of Branches:"  label-for="amount" v-if="allProjects.length>0">
                      <b-row class="selectedBranches">
                      <b-col lg="6" v-for="(i, key) in allProjects" :key="key">
                        <div class="bg-white mb-2 p-2 rounded details_selected_branch">
                          <h2 class="text-white rounded-circle text-center font-size-18 mb-2 bg-primary ">{{ i.en_title }}</h2>
                          <section class="border-bottom py-1">
                            <div class="d-flex justify-content-between px-2  mx-auto mb-2 text-black font-size-16">
                              <p class="m-0">1st Target</p>
                              <span class="d-inline-block px-2 rounded-circle w-25-40 text-center"
                                    style="background: #ff5f359e !important">
                                <input type="text" v-model="allTarget.data[key].target[0].target" class="w-100 bg-transparent border-0"/>
                              </span>
                            </div>
                            <div class="d-flex justify-content-between px-2 mx-auto mb-2 text-black font-size-16">
                              <p class="m-0">Commission %</p> <span class="d-inline-block px-2 rounded-circle  w-25-40  text-center" style="background: #ff5f359e !important">
                              <input type="text"  v-model="allTarget.data[key].target[0].commission" class="w-100 bg-transparent border-0"/></span>
                            </div>
                            <div class="d-flex justify-content-between px-2 mx-auto mb-2 text-black font-size-16">
                            <p class="m-0">Comm. Amount</p> <span
                                class="d-inline-block px-2 rounded-circle w-25-40 text-center"
                                style="background: #ff5f359e !important">{{(allTarget.data[key].target[0].target * allTarget.data[key].target[0].commission) / 100}}</span>
                          </div>
                          </section>
                          <section class="border-bottom py-1 bg-light">
                            <div class="d-flex justify-content-between px-2  mx-auto mb-2 text-black font-size-16">
                              <p class="m-0">2nd Target</p> <span class="d-inline-block px-2 rounded-circle  w-25-40  text-center" style="background: #ff5f359e !important"><input type="text" v-model="allTarget.data[key].target[1].target" class="w-100 bg-transparent border-0"/></span>
                            </div>
                            <div class="d-flex justify-content-between px-2 mx-auto mb-2 text-black font-size-16">
                              <p class="m-0">Commission %</p> <span class="d-inline-block px-2 rounded-circle  w-25-40  text-center" style="background: #ff5f359e !important"><input type="text"  v-model="allTarget.data[key].target[1].commission" class="w-100 bg-transparent border-0"/></span>
                            </div>
                            <div class="d-flex justify-content-between px-2 mx-auto mb-2 text-black font-size-16">
                              <p class="m-0">Comm. Amount</p> <span class="d-inline-block px-2 rounded-circle  w-25-40  text-center" style="background: #ff5f359e !important">{{(allTarget.data[key].target[1].target * allTarget.data[key].target[1].commission) / 100}}</span>
                            </div>
                          </section>
                          <section class="py-1">
                            <div class="d-flex justify-content-between px-2  mx-auto mb-2 text-black font-size-16">
                              <p class="m-0">3rd Target</p> <span class="d-inline-block px-2 rounded-circle  w-25-40  text-center" style="background: #ff5f359e !important"><input type="text" v-model="allTarget.data[key].target[2].target" class="w-100 bg-transparent border-0"/></span>
                            </div>
                            <div class="d-flex justify-content-between px-2 mx-auto mb-2 text-black font-size-16">
                              <p class="m-0">Commission %</p> <span class="d-inline-block px-2 rounded-circle  w-25-40  text-center" style="background: #ff5f359e !important"><input type="text"  v-model="allTarget.data[key].target[2].commission" class="w-100 bg-transparent border-0"/></span>
                            </div>
                            <div class="d-flex justify-content-between px-2 mx-auto mb-2 text-black font-size-16">
                              <p class="m-0">Comm. Amount</p> <span class="d-inline-block px-2 rounded-circle  w-25-40  text-center" style="background: #ff5f359e !important">{{(allTarget.data[key].target[2].target * allTarget.data[key].target[2].commission) / 100}}</span>
                            </div>
                          </section>
                        </div>
                      </b-col>
                    </b-row>
                    </b-form-group>
                    <b-form-group class="col-md-12" label="Target Details:"  label-for="amount" v-if="allProjects.length>0">
                      <div class="custom-control custom-switch custom-switch-text custom-control-inline custom-switch-color" >
                        <div class="d-flex align-items-center">
                          <label class="mr-2 font-size-16">Target Package:</label>
                          <div class="custom-switch-inner">
                            <input type="checkbox" class="custom-control-input bg-primary"  id='package' v-model="target_package">
                            <label class="custom-control-label" for='package' data-on-label="on" data-off-label="off">
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="custom-control custom-switch custom-switch-text custom-control-inline custom-switch-color" >
                        <div class="d-flex align-items-center">
                          <label class="mr-2 font-size-16">Target Services:</label>
                          <div class="custom-switch-inner">
                            <input type="checkbox" class="custom-control-input bg-primary"  id='service' v-model="target_service">
                            <label class="custom-control-label" for='service' data-on-label="on" data-off-label="off">
                            </label>
                          </div>
                        </div>
                      </div>
                    </b-form-group >
                  </b-row>
                  <div class="d-flex  mt-4 align-items-center justify-content-end">
                    <b-button variant="primary" type="submit" v-if="allProjects.length>0 && !loadingSaveButton">Add Target</b-button>
                    <b-button v-else-if='loadingSaveButton' class="btn btn-primary float-right" variant="primary" disabled>
                      <b-spinner small type="grow"></b-spinner>
                      loading...
                    </b-button>
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
export default {
  name: 'addAgent',
  props: {
    edit: {
      default: false,
      type: Boolean
    }
  },
  computed: {
  },
  mounted () {
    core.index()
  },
  data () {
    return {
      allTarget: {
        data: [],
        target_package: 1,
        target_service: 1,
        sales_type: 'agent'
      },
      userId: '',
      target_package: true,
      target_service: true,
      allUsers: [],
      allProjects: [],
      loadingSaveButton: false
    }
  },
  methods: {
    saveTarget () {
      this.loadingSaveButton = true
      this.target_package ? this.allTarget.target_package = 1 : this.allTarget.target_package = 0
      this.target_service ? this.allTarget.target_service = 1 : this.allTarget.target_service = 0
      this.$store.dispatch('createTargetAgent', { userId: this.userId, data: this.allTarget }).then(res => {
        core.showSnackbar('success', res.data.message)
        this.$bvModal.hide('agent-target')
      }).catch(() => {
        core.showSnackbar('error', 'all fields are required.')
      }).finally(() => {
        this.loadingSaveButton = false
      })
    },
    onSearch (search, loading) {
      if (search.length) {
        this.allProjects = []
        loading(true)
        this.$store.dispatch('getAllAgents', search).then(res => {
          this.allUsers = res.data.data
          loading(false)
        }).catch(() => {
          loading(false)
        })
      }
    },
    getDetailsOfUser: function (user) {
      this.allTarget.data = []
      this.userId = user.id
      for (var x = 0; x < user.project.length; x++) {
        this.allTarget.data.push({
          target: [
            {
              classification: 'first',
              target: '',
              commission: ''
            },
            {
              classification: 'second',
              target: '',
              commission: ''
            },
            {
              classification: 'third',
              target: '',
              commission: ''
            }
          ],
          project: user.project[x].id
        })
      }
      this.allProjects = user.project
    }
  }
}
</script>
<style>
.selectedBranches{
  width: 100%;
  padding: 5px 0 !important;
  background: var(--iq-bg-light-color);
  border: 1px solid #d7dbda;
  font-size: 14px;
  color: var(--iq-secondary);
  border-radius: 10px;
}
.selectedBranches input{
  text-align: center;
}
.w-25-40 {
  width: 40% !important;
}
.selectedBranches .details_selected_branch{}
</style>
