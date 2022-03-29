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
                    <b-form-group class="col-md-12" label="Clone From:" label-for="user">
                      <v-select label="user" :options="allUsers" :filterable="false" :reduce="option => option.id" @search="onSearch"
                                @option:selecting="getDetailsOfClonefrom"  @option:deselecting="userFrom = {}">
                        <template slot="no-options">
                          type to search about users...
                        </template>
                        <template slot="option" slot-scope="option">
                          <div class="d-center">
                            {{ option.user.name }}
                          </div>
                        </template>
                        <template slot="selected-option" slot-scope="option">
                          <div class="selected d-center">
                            {{ option.user.name }}
                          </div>
                        </template>
                      </v-select>
                    </b-form-group>
                    <b-form-group class="col-md-12" label="Clone To:" label-for="user">
                      <v-select label="user" :options="allUsers" :filterable="false" :reduce="option => option.id" @search="onSearch"
                                @option:selecting="getDetailsOfCloneTo"  @option:deselecting="userTo = {}">
                        <template slot="no-options">
                          type to search about users...
                        </template>
                        <template slot="option" slot-scope="option">
                          <div class="d-center">
                            {{ option.user.name }}
                          </div>
                        </template>
                        <template slot="selected-option" slot-scope="option">
                          <div class="selected d-center">
                            {{ option.user.name }}
                          </div>
                        </template>
                      </v-select>
                    </b-form-group>
                    <b-form-group class="col-md-12" label="List Of Branches:"  label-for="amount" v-if="userTo.targets && userFrom.targets">
                        <div class="periodNumbers flex-wrap">
                        <span v-for="(i, key) in getAllCompineProject" :class="[{ 'shadow selectedNumber' : isSelected(i.id)}, 'd-flex justify-content-center align-items-center py-2 my-1']"  :key="key" @click="selectProject(i.id)">
                          {{i.en_title}}
                        </span>
                        </div>
                    </b-form-group>
                  </b-row>
                  <div class="d-flex  mt-4 align-items-center justify-content-end">
                    <b-button variant="primary" type="submit" v-if="!loadingSaveButton">Clone Target</b-button>
                    <b-button v-else class="btn btn-primary float-right" variant="primary" disabled>
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
  name: 'cloneAgent',
  props: {
    edit: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    getAllCompineProject () {
      var arr = []
      this.userTo.targets.map(i => {
        this.userFrom.targets.find(x => {
          // eslint-disable-next-line eqeqeq
          if (x.id == i.id && !arr.find(f => f.id === i.id)) {
            arr.push(i)
          }
        })
      })
      return arr
    }
  },
  mounted () {
    core.index()
  },
  data () {
    return {
      userId: '',
      allUsers: [],
      userFrom: {},
      userTo: {},
      projectsSelected: [],
      loadingSaveButton: false
    }
  },
  methods: {
    isSelected (i) {
      if (this.projectsSelected.includes(i)) {
        return true
      } else {
        return false
      }
    },
    selectProject (data) {
      const index = this.projectsSelected.findIndex(i => i === data)
      if (index > -1) {
        this.projectsSelected.splice(index, 1)
      } else {
        this.projectsSelected.push(data)
      }
    },
    saveTarget () {
      this.loadingSaveButton = true
      this.$store.dispatch('cloneUser', {
        userTo: this.userTo.user.id,
        payload: {
          sales_form_id: this.userFrom.user.id,
          projects: this.projectsSelected
        }
      }).then(res => {
        core.showSnackbar('success', res.data.message)
        this.$bvModal.hide('clone_agent-target')
      }).catch((err) => {
        core.showSnackbar('error', err.response.message)
      }).finally(() => {
        this.loadingSaveButton = false
      })
    },
    onSearch (search, loading) {
      if (search.length) {
        loading(true)
        this.$store.dispatch('getAllAgentAndmanagesHaveTarget', { name: search, type: 'agent' }).then(res => {
          this.allUsers = res.data.data
          loading(false)
        }).catch(() => {
          loading(false)
        })
      }
    },
    getDetailsOfCloneTo (userTo) {
      this.userTo = false
      this.allUsers = []
      this.userTo = userTo
    },
    getDetailsOfClonefrom (userFrom) {
      this.userTo = false
      this.allUsers = []
      this.userFrom = userFrom
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
.selectedBranches .details_selected_branch{}
.periodNumbers span {
  cursor: pointer;
  background: #ececec;
  padding: 5px 15px;
  border-radius: 10px;
  margin-right: 10px;
  color: #5b5b5b;
}
.selectedNumber{
  color: var(--iq-white) !important;
  background: linear-gradient(to right, var(--iq-primary) 0%, var(--iq-primary-light) 100%) !important;
}
</style>
