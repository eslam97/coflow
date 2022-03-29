<template>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)">
        <b-row>
          <b-col lg="12">
            <iq-card>
              <template v-slot:headerTitle>
                <h4 class="card-title" v-if="ifEdit">Edit Package</h4>
                <h4 class="card-title" v-else>Add New Package</h4>
              </template>
              <template v-slot:body>
                <div class="new-user-info">
                  <b-row>
                    <b-form-group class="col-md-6" label="Package Name:" label-for="packageName">
                      <ValidationProvider name="title" ref="title" rules="required" v-slot="{ errors }">
                        <b-form-input v-model="newPackage.title" type="text" placeholder="Title" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="Choose Projects:" label-for="project">
                      <div>
                        <v-select :options="getUserProjects" multiple v-model="selectedProjects" label="en_title"
                                  :selectable="option => !selectedProjects.includes(option.id)"
                                  :reduce="projects => projects.id" @option:deselected="removeProject" @option:selecting="addProjects">
                        </v-select>
                      </div>
                    </b-form-group>
                    <b-form-group class="col-md-12" label="Price / Projects:" label-for="project" v-if="newPackage.projects.length > 0">
                      <div class="projectsPrice">
                        <div class="content-price mb-1" v-for="(project, key) in newPackage.projects" :key="key">
                          <p>{{ project.en_title }}</p>
                          <ValidationProvider :name="project.en_title+' Price'" rules="required" v-slot="{ errors }">
                            <b-form-input v-model="project.price" type="number" placeholder="Ex: 100" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                            <div class="invalid-feedback">
                              <span>{{ errors[0] }}</span>
                            </div>
                          </ValidationProvider>
                        </div>
                      </div>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="child Categories">
                      <ValidationProvider name="sub" ref="sub" rules="required" v-slot="{ errors }">
                        <select  class="form-control" id="sub"  v-model="newPackage.payment_category" required>
                          <option selected disabled value="">Choose Sub Category...</option>
                          <option v-for="(i, key) in subOfSubCategories" :key="key" :value="i.id">
                            <span>{{i.title}}</span>
                          </option>
                        </select>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="Period / month:" label-for="period">
                      <div class="periodNumbers flex-wrap">
                        <span v-for="(period, key) in allPeriods" :key="key" :class="[{ 'shadow selectedNumber' : isSelected(period.value)},'d-flex justify-content-center align-items-center  my-1']" @click="newPackage.period = period.value">
                          {{period.value}}
                        </span>
                      </div>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="Count:" label-for="period">
                      <div class="periodNumbers flex-wrap">
                        <span v-for="(count, key) in allCounts" :key="key" :class="[{ 'shadow selectedNumber' : isContSelected(count.value)},'d-flex justify-content-center align-items-center  my-1']" @click="newPackage.count = count.value">
                            {{count.value}}
                        </span>
                      </div>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="Freezing / weeks:" label-for="frezzing">
                      <select  class="form-control" id="freezing" v-model="newPackage.freezing" required>
                        <option selected disabled value="">Choose freez...</option>
                        <option v-for="(freez, key) in allFreezing" :key="key" :value="freez.value">{{freez.value}}</option>
                      </select>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="Invitations:" label-for="invitations">
                      <select  class="form-control" id="invitation" v-model="newPackage.invitation" required>
                        <option selected disabled value="">Choose invitation...</option>
                        <option v-for="(invitation, key) in allInvitations" :key="key" :value="invitation.value">{{invitation.value}}</option>
                      </select>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="Active Times:" label-for="active_time">
                      <select  class="form-control" id="Shift" v-model="newPackage.shift">
                        <option selected disabled value="">Choose Shift...</option>
                        <option v-for="(shift, key) in allShifts" :key="key" :value="shift.id">{{shift.title}}</option>
                      </select>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="Auto_start_after / days :" label-for="auto_start_after">
                      <div class="periodNumbers flex-wrap">
                        <span v-for="(count, key) in allAutoStartAfter" :key="key" :class="[{ 'shadow selectedNumber' : isAutoStartAfter(count.value)},'d-flex justify-content-center align-items-center  my-1']" @click="newPackage.auto_start_after = count.value">
                            {{count.value}}
                        </span>
                      </div>
                    </b-form-group>
                    <b-form-group class="col-md-12" label="Choose Service:" label-for="service">
                      <div>
                        <v-select :options="allServices" multiple v-model="selectedService" label="title"
                                  :selectable="option => !selectedService.includes(option.id)"
                                  :reduce="service => service.id" @option:deselected="removeService" @option:selecting="addServices">
                        </v-select>
                      </div>
                    </b-form-group>
                    <b-form-group class="col-md-12" label="Number Of Services:" label-for="service" v-if="newPackage.services.length > 0">
                      <div class="projectsPrice">
                        <div class="content-price mb-1" v-for="(service, key) in newPackage.services" :key="key">
                          <p>{{ service.title }}</p>
                          <ValidationProvider :name="service.title+' Price'" rules="required" v-slot="{ errors }">
                            <b-form-input v-model="service.count" type="number" placeholder="Ex: 1" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                            <div class="invalid-feedback">
                              <span>{{ errors[0] }}</span>
                            </div>
                          </ValidationProvider>
                        </div>
                      </div>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="Down Payment : ( % )" label-for="serviceName">
                      <ValidationProvider name="Down Payment" ref="down_payment" rules="required" v-slot="{ errors }">
                        <b-form-input v-model="newPackage.down_payment" type="number" placeholder="" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="Default Service Name:" label-for="default_service">
                      <ValidationProvider name="default_service" ref="default_service" rules="required" v-slot="{ errors }">
                        <b-form-input v-model="newPackage.default_service" type="text" placeholder="" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-6" >
                      <div class="custom-control custom-switch custom-switch-text custom-control-inline custom-switch-color" >
                        <div class="d-flex align-items-center">
                          <label class="mr-2 font-size-16">Target:</label>
                          <div class="custom-switch-inner">
                            <input type="checkbox" class="custom-control-input bg-primary"  id='target' v-model="boolTarget">
                            <label class="custom-control-label" for='target' data-on-label="on" data-off-label="off">
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="custom-control custom-switch custom-switch-text custom-control-inline custom-switch-color" >
                        <div class="d-flex align-items-center">
                          <label class="mr-2 font-size-16">Active:</label>
                          <div class="custom-switch-inner">
                            <input type="checkbox" class="custom-control-input bg-primary"  id='active' v-model="boolActive">
                            <label class="custom-control-label" for='active' data-on-label="on" data-off-label="off">
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="custom-control custom-switch custom-switch-text custom-control-inline custom-switch-color" >
                        <div class="d-flex align-items-center">
                          <label class="mr-2 font-size-16">Per_day:</label>
                          <div class="custom-switch-inner">
                            <input type="checkbox" class="custom-control-input bg-primary"  id='Pactive' v-model="boolPer_day">
                            <label class="custom-control-label" for='Pactive' data-on-label="on" data-off-label="off">
                            </label>
                          </div>
                        </div>
                      </div>
                    </b-form-group>
                  </b-row>
                  <div v-if="!loadingButtonSubmit">
                    <b-button variant="primary" class="float-right" type="submit" v-if="ifEdit">Edit Package</b-button>
                    <b-button variant="primary" class="float-right" type="submit" v-else>Add New Package</b-button>
                    <div class="clearfix"></div>
                  </div>
                  <div v-else>
                    <b-button class="btn btn-primary float-right" variant="primary" disabled>
                      <spinner-loading text="Loading"/>
                    </b-button>
                  </div>
                </div>
              </template>
            </iq-card>
          </b-col>
        </b-row>
      </form>
    </ValidationObserver>
</template>
<script>
import { core } from '../../../config/pluginInit'
import { mapGetters } from 'vuex'
import packageService from '../services/package'

export default {
  name: 'addPackage',
  data () {
    return {
      // all needs
      allShifts: [],
      allCounts: [],
      allPeriods: [],
      allInvitations: [],
      allFreezing: [],
      allAutoStartAfter: [],

      // Loading
      loadingButtonSubmit: false,
      ifEdit: this.$route.query.edit,
      packageName: '',
      selectedProjects: [],
      selectedService: [],
      allServices: [],
      boolActive: true,
      boolTarget: true,
      boolPer_day: false,
      subCategories: '',
      subOfSubCategories: '',
      parent_category_id: '',
      parent_sub_category_id: '',
      mainCategories: [],
      newPackage: {
        title: '',
        type: 'package',
        default_service: '',
        is_active: true,
        target: true,
        per_day: false,
        projects: [],
        period: '',
        shift: '',
        count: '',
        invitation: '',
        freezing: '',
        auto_start_after: '',
        unit: 'month',
        services: [],
        down_payment: 0,
        payment_category: ''
      }
    }
  },
  computed: {
    ...mapGetters(['getUserProjects']),
    fullName: function () {
      return this.user.fname + ' ' + this.user.lname
    }
  },
  methods: {
    onSubmit () {
      this.loadingButtonSubmit = true
      var newObject = this.clean(this.newPackage)
      this.boolActive === true ? newObject.is_active = 1 : newObject.is_active = 0
      this.boolTarget === true ? newObject.target = 1 : newObject.target = 0
      this.boolPer_day === true ? newObject.per_day = 1 : newObject.per_day = 0
      if (!this.ifEdit) {
        packageService.addNewPackage(newObject).then(() => {
          this.loadingButtonSubmit = false
          core.showSnackbar('success', 'Package has been created successfully.')
          this.$router.push({ name: 'package' })
          this.resetData()
        }).catch(err => {
          this.loadingButtonSubmit = false
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            core.showSnackbar('error', `${key}: ${value}`)
          }
        })
      } else {
        packageService.editPackageOrService(this.$route.query.packageId, newObject).then(res => {
          this.loadingButtonSubmit = false
          core.showSnackbar('success', res.data.message)
          this.resetData()
          this.$router.push({ name: 'package' })
        }).catch(err => {
          this.loadingButtonSubmit = false
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            core.showSnackbar('error', `${key}: ${value}`)
          }
        })
      }
    },
    isSelected (i) {
      // eslint-disable-next-line eqeqeq
      return i == this.newPackage.period
    },
    clean (obj) {
      for (var propName in obj) {
        if (obj[propName] === 'null' || obj[propName] === '' || obj[propName] === undefined) {
          delete obj[propName]
        }
      }
      return obj
    },
    isContSelected (i) {
      // eslint-disable-next-line eqeqeq
      return i == this.newPackage.count
    },
    isAutoStartAfter (i) {
      // eslint-disable-next-line eqeqeq
      return i == this.newPackage.auto_start_after
    },
    addProjects (projectData) {
      projectData.price = ''
      this.newPackage.projects.push(projectData)
    },
    removeProject (projectData) {
      var position = this.newPackage.projects.findIndex(project => project.id === projectData.id)
      this.newPackage.projects.splice(position, 1)
    },
    addServices (serviceData) {
      serviceData.count = ''
      this.newPackage.services.push(serviceData)
    },
    removeService (serviceData) {
      var position = this.newPackage.services.findIndex(service => service.id === serviceData.id)
      this.newPackage.services.splice(position, 1)
    },
    resetData () {
      this.newPackage = {
        title: '',
        type: 'package',
        default_service: '',
        is_active: true,
        target: true,
        per_day: false,
        projects: [],
        period: '',
        shift: '',
        count: '',
        invitation: '',
        freezing: '',
        auto_start_after: '',
        unit: 'month',
        services: [],
        down_payment: 0
      }
      this.selectedProjects = []
      this.selectedService = []
    },
    showSub (parentId) {
      this.$store.dispatch('getAllchildDependsOnParent', parentId).then(response => {
        if (response.data.data.child.length > 0) {
          this.subCategories = response.data.data.child
        } else {
          this.subCategories = []
        }
      })
    },
    showSubOfSubCategories (parentId) {
      this.$store.dispatch('getAllchildDependsOnParent', parentId).then(response => {
        if (response.data.data.child.length > 0) {
          this.subOfSubCategories = response.data.data.child
        } else {
          this.subOfSubCategories = []
        }
      })
    },
    showThirdLevel () {
      this.$store.dispatch('getThirdCategories', 'income').then(res => {
        this.subOfSubCategories = res.data.data
      })
    }
  },
  mounted () {
    core.index()
  },
  created () {
    this.showThirdLevel()
    packageService.membershipsCreate().then(data => {
      this.allShifts = data.data.data.shifts
      this.allPeriods = data.data.data['0'][0].setting
      this.newPackage.period = data.data.data['0'][0].setting[0].id
      this.allCounts = data.data.data['0'][1].setting
      this.allInvitations = data.data.data['0'][2].setting
      this.allFreezing = data.data.data['0'][3].setting
      this.allAutoStartAfter = data.data.data['0'][4].setting
      this.newPackage.auto_start_after = data.data.data['0'][4].setting[0].id
    })
    packageService.getAllServiceToAddPackage().then(data => {
      // console.log(data.data.data)
      this.allServices = data.data.data
    })
    this.$store.dispatch('getAllParentsDependsOnType', 'income').then(res => {
      if (res.data.data.categories.length > 0) {
        this.mainCategories = res.data.data.categories
      } else {
        this.mainCategories = []
      }
    })
    if (this.ifEdit) {
      packageService.getSpacificPackages(this.$route.query.packageId).then(res => {
        this.selectedService = res.data.data.service ? res.data.data.service.map(({ id }) => id) : []
        this.selectedProjects = res.data.data.project ? res.data.data.project.map(({ id }) => id) : []
        // eslint-disable-next-line no-unused-expressions
        res.data.data.service ? res.data.data.service.forEach(item => {
          this.newPackage.services.push({ ...item, count: item.pivot.count })
        }) : []
        // eslint-disable-next-line no-unused-expressions
        res.data.data.project ? res.data.data.project.forEach(project => {
          this.newPackage.projects.push({ ...project, price: project.pivot.price })
        }) : []
        this.newPackage.title = res.data.data.title
        this.newPackage.default_service = res.data.data.default_service
        this.newPackage.is_active = res.data.data.is_active ? this.boolActive = true : this.boolActive = false
        this.newPackage.target = res.data.data.target ? this.boolTarget = true : this.boolTarget = false
        this.newPackage.period = res.data.data.period ? res.data.data.period : ''
        this.newPackage.shift = res.data.data.shift_id ? res.data.data.shift_id : ''
        this.newPackage.count = res.data.data.count ? res.data.data.count : ''
        this.newPackage.invitation = res.data.data.invitation ? res.data.data.invitation : ''
        this.newPackage.freezing = res.data.data.freezing ? res.data.data.freezing : ''
        this.newPackage.auto_start_after = res.data.data.auto_start_after ? res.data.data.auto_start_after : ''
        this.newPackage.per_day = res.data.data.per_day ? this.boolPer_day = true : this.boolPer_day = false
        this.newPackage.down_payment = res.data.data.down_payment ? res.data.data.down_payment : ''
        this.parent_category_id = res.data.data.payment_category.parent
        this.newPackage.payment_category = res.data.data.payment_category.id ? res.data.data.payment_category.id : ''
      })
    } else {
      this.resetData()
    }
  },

  watch: {
    'parent_category_id' (value) {
      if (!this.ifEdit) {
        this.newPackage.payment_category = ''
      }
      this.showSub(value)
    },
    'parent_sub_category_id' (value) {
      if (!this.ifEdit) {
        this.newPackage.payment_category = ''
      }
      this.showSubOfSubCategories(value)
    }
  }
}
</script>
<style scoped>
.periodNumbers , .projectsPrice{
  padding: 5px;
  background: transparent;
  border: 1px solid #d7dbda;
  font-size: 14px;
  color: var(--iq-secondary);
  border-radius: 10px;
  background: #92e8cb00;
  display: flex;
  align-items: center;
  justify-content: start;
}
.projectsPrice{
  background: var(--iq-bg-light-color);
  flex-wrap: wrap;
}
.projectsPrice .content-price{
  background: #fff;
  padding: 5px;
  border-radius: 10px;
  margin-right: 10px;
}
.content-price p {
  margin: 1px 0;
  text-align: center;
  /* color: #202020; */
  color: var(--iq-dark);
}
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
