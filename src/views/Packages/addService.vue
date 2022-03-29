<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(onSubmit)">
      <b-row>
        <b-col lg="12">
          <iq-card>
            <template v-slot:headerTitle>
              <h4 class="card-title" v-if="ifEdit">Edit Service</h4>
              <h4 class="card-title" v-else>Add New Service</h4>
            </template>
            <template v-slot:body>
              <div class="new-user-info">
                <b-row>
                  <b-form-group class="col-md-12" label="service Name:" label-for="serviceName">
                    <ValidationProvider name="title" ref="title" rules="required" v-slot="{ errors }">
                      <b-form-input v-model="newservice.title" type="text" placeholder="Title" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
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
                        <template v-slot:prepend>
                          <v-icon color="red">ss</v-icon>
                        </template>
                      </v-select>
                    </div>
                  </b-form-group>
                  <b-form-group class="col-md-12" label="Price / Projects:" label-for="project" v-if="newservice.projects.length > 0">
                    <div class="projectsPrice">
                      <div class="content-price mb-1" v-for="(project, key) in newservice.projects" :key="key">
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
                  <b-form-group class="col-md-6" label="Main Categories">
                    <ValidationProvider name="main" ref="main" rules="required" v-slot="{ errors }">
                      <select  class="form-control" v-model="parent_category_id" id="main" required>
                        <option selected disabled value="">Choose Main Category...</option>
                        <option v-for="(i, key) in mainCategories" :key="key" :value="i.id">
                          <span>{{i.title}}</span>
                        </option>
                      </select>
                      <div class="invalid-feedback">
                        <span>{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
                  </b-form-group>
                  <b-form-group class="col-md-6" label="Sub Categories">
                    <ValidationProvider name="sub" ref="sub" rules="required" v-slot="{ errors }">
                      <select  class="form-control" id="sub"  v-model="parent_sub_category_id" required>
                        <option selected disabled value="">Choose Sub Category...</option>
                        <option v-for="(i, key) in subCategories" :key="key" :value="i.id">
                          <span>{{i.title}}</span>
                        </option>
                      </select>
                      <div class="invalid-feedback">
                        <span>{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
                  </b-form-group>
                  <b-form-group class="col-md-6" label="child Categories">
                    <ValidationProvider name="sub" ref="sub" rules="required" v-slot="{ errors }">
                      <select  class="form-control" id="sub"  v-model="newservice.payment_category" required>
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
                        <span v-for="(period, key) in allPeriods" :key="key" :class="[{ 'shadow selectedNumber' : isSelected(period.value)}, 'd-flex justify-content-center align-items-center  my-1']" @click="newservice.period = period.value">
                          {{period.value}}
                        </span>
                    </div>
                  </b-form-group>
                  <b-form-group class="col-md-6" label="Unit:" label-for="period">
                    <div class="periodNumbers flex-wrap">
                        <span v-for="(unit, key) in units" :key="key"  :class="[{ 'shadow selectedNumber' : isUnitSelected(unit)}, 'd-flex justify-content-center align-items-center  my-1']" @click="newservice.unit = unit">
                            {{unit}}
                        </span>
                    </div>
                  </b-form-group>
                  <b-form-group class="col-md-6" label="Count:" label-for="period">
                    <div class="periodNumbers flex-wrap">
                        <span v-for="(count, key) in allCounts" :key="key" :class="[{ 'shadow selectedNumber' : isContSelected(count.value)}, 'd-flex justify-content-center align-items-center my-1']" @click="newservice.count = count.value">
                            {{count.value}}
                        </span>
                    </div>
                  </b-form-group>
                  <b-form-group class="col-md-6" label="Freezing / weeks:" label-for="frezzing">
                    <select  class="form-control" id="freezing" v-model="newservice.freezing">
                      <option selected disabled value="">Choose freez...</option>
                      <option v-for="(freez, key) in allFreezing" :key="key" :value="freez.value">{{freez.value}}</option>
                    </select>
                  </b-form-group>
                  <b-form-group class="col-md-6" label="Invitations:" label-for="invitations">
                    <select  class="form-control" id="invitation" v-model="newservice.invitation">
                      <option selected disabled value="">Choose invitation...</option>
                      <option v-for="(invitation, key) in allInvitations" :key="key" :value="invitation.value">{{invitation.value}}</option>
                    </select>
                  </b-form-group>
                  <b-form-group class="col-md-6" label="Active Times:" label-for="active_time">
                    <select  class="form-control" id="Shift" v-model="newservice.shift">
                      <option selected disabled value="">Choose Shift...</option>
                      <option v-for="(shift, key) in allShifts" :key="key" :value="shift.id">{{shift.title}}</option>
                    </select>
                  </b-form-group>
                  <b-form-group class="col-md-6" label="Auto_start_after / days:" label-for="auto_start_after">
                    <div class="periodNumbers flex-wrap">
                        <span v-for="(count, key) in allAutoStartAfter" :key="key" :class="[{ 'shadow selectedNumber' : isAutoStartAfter(count.value)},'d-flex justify-content-center align-items-center']" @click="newservice.auto_start_after = count.value">
                            {{count.value}}
                        </span>
                    </div>
                  </b-form-group>
                  <b-form-group class="col-md-12" label="Down Payment : ( % )" label-for="serviceName">
                    <ValidationProvider name="Down Payment" ref="down_payment" rules="required" v-slot="{ errors }">
                      <b-form-input v-model="newservice.down_payment" type="number" placeholder="" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
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
                <b-button variant="primary" class="float-right" type="submit" v-if="ifEdit">Edit Service</b-button>
                <b-button variant="primary" class="float-right" type="submit" v-else>Add New service</b-button>
                <div class="clearfix"></div>
              </div>
            </template>
          </iq-card>
        </b-col>
      </b-row>
    </form>
  </ValidationObserver>
</template>
<script>
import { core } from '../../config/pluginInit'
import { mapGetters } from 'vuex'

export default {
  name: 'Addservice',
  mounted () {
    core.index()
  },
  created () {
    this.$store.dispatch('getAllParentsDependsOnType', 'income').then(res => {
      if (res.data.data.categories.length > 0) {
        this.mainCategories = res.data.data.categories
      } else {
        this.mainCategories = []
      }
    })
    this.$store.dispatch('membershipsCreate').then(data => {
      // console.log(data)
      this.allShifts = data.data.data.shifts
      this.allPeriods = data.data.data['0'][0].setting
      this.newservice.period = data.data.data['0'][0].setting[0].id
      this.allCounts = data.data.data['0'][1].setting
      this.allInvitations = data.data.data['0'][2].setting
      this.allFreezing = data.data.data['0'][3].setting
      this.allAutoStartAfter = data.data.data['0'][4].setting
      this.newservice.auto_start_after = data.data.data['0'][4].setting[0].id
      this.newservice.unit = this.units[0]
    })
    if (this.ifEdit) {
      this.$store.dispatch('getSpacificPackages', this.$route.query.serviceId).then(res => {
        this.selectedService = res.data.data.service ? res.data.data.service.map(({ id }) => id) : []
        this.selectedProjects = res.data.data.project ? res.data.data.project.map(({ id }) => id) : []
        // eslint-disable-next-line no-unused-expressions
        res.data.data.service ? res.data.data.service.forEach(item => {
          this.newservice.services.push({ ...item, count: item.pivot.count })
        }) : []
        // eslint-disable-next-line no-unused-expressions
        res.data.data.project ? res.data.data.project.forEach(project => {
          this.newservice.projects.push({ ...project, price: project.pivot.price })
        }) : []
        this.newservice.title = res.data.data.title
        this.newservice.is_active = res.data.data.is_active ? this.boolActive = true : this.boolActive = false
        this.newservice.target = res.data.data.target ? this.boolTarget = true : this.boolTarget = false
        this.newservice.period = res.data.data.period ? res.data.data.period : ''
        this.newservice.shift = res.data.data.shift_id ? res.data.data.shift_id : ''
        this.newservice.count = res.data.data.count ? res.data.data.count : ''
        this.newservice.unit = res.data.data.unit ? res.data.data.unit : 'day'
        this.newservice.invitation = res.data.data.invitation ? res.data.data.invitation : ''
        this.newservice.freezing = res.data.data.freezing ? res.data.data.freezing : ''
        this.newservice.auto_start_after = res.data.data.auto_start_after ? res.data.data.auto_start_after : ''
        this.newservice.per_day = res.data.data.per_day ? this.boolPer_day = true : this.boolPer_day = false
        this.newservice.down_payment = res.data.data.down_payment ? res.data.data.down_payment : ''
        this.parent_category_id = res.data.data.payment_category.parent
        this.newservice.payment_category = res.data.data.payment_category.id ? res.data.data.payment_category.id : ''
      })
    } else {
      this.resetData()
    }
  },
  data () {
    return {
      users: [],
      serviceName: '',
      ifEdit: this.$route.query.edit,
      allShifts: [],
      allCounts: [],
      allPeriods: [],
      allInvitations: [],
      allFreezing: [],
      allAutoStartAfter: [],
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
      newservice: {
        title: '',
        type: 'service',
        is_active: true,
        target: true,
        per_day: false,
        projects: [],
        period: '',
        shift: '',
        count: '',
        unit: 'day',
        invitation: '',
        freezing: '',
        auto_start_after: '',
        down_payment: 0,
        payment_category: ''
      },
      units: ['day', 'week', 'month']
    }
  },
  watch: {
    'parent_category_id' (value) {
      if (!this.ifEdit) {
        this.newservice.payment_category = ''
      }
      this.newservice.payment_category = ''
      this.showSub(value)
    },
    'parent_sub_category_id' (value) {
      if (!this.ifEdit) {
        this.newservice.payment_category = ''
      }
      this.showSubOfSubCategories(value)
    }
  },
  computed: {
    ...mapGetters(['getUserProjects']),
    fullName: function () {
      return this.user.fname + ' ' + this.user.lname
    }
  },
  methods: {
    showSub (parentId) {
      this.$store.dispatch('getAllchildDependsOnParent', parentId).then(response => {
        if (response.data.data.child.length > 0) {
          this.subCategories = response.data.data.child
        } else {
          this.subCategories = []
        }
      })
    },
    onSubmit () {
      var newObject = this.clean(this.newservice)
      this.boolActive === true ? newObject.is_active = 1 : newObject.is_active = 0
      this.boolTarget === true ? newObject.target = 1 : newObject.target = 0
      this.boolPer_day === true ? newObject.per_day = 1 : newObject.per_day = 0
      if (!this.ifEdit) {
        this.$store.dispatch('addNewPackage', newObject).then(() => {
          core.showSnackbar('success', 'service has been created successfully.')
          this.$router.go(0)
          this.resetData()
        }).catch(err => {
          // console.log(err.response.data)
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            core.showSnackbar('error', `${key}: ${value}`)
          }
        })
      } else {
        this.$store.dispatch('editPackageOrService', { packageId: this.$route.query.serviceId, newData: newObject }).then(() => {
          core.showSnackbar('success', 'Service has been updated successfully.')
          this.resetData()
        }).catch(err => {
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            core.showSnackbar('error', `${key}: ${value}`)
          }
        })
      }
    },
    isSelected (i) {
      // eslint-disable-next-line eqeqeq
      return i == this.newservice.period
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
      return i == this.newservice.count
    },
    isUnitSelected (i) {
      // eslint-disable-next-line eqeqeq
      return i == this.newservice.unit
    },
    isAutoStartAfter (i) {
      // eslint-disable-next-line eqeqeq
      return i == this.newservice.auto_start_after
    },
    addProjects (projectData) {
      projectData.price = ''
      this.newservice.projects.push(projectData)
    },
    removeProject (projectData) {
      var position = this.newservice.projects.findIndex(project => project.id === projectData.id)
      this.newservice.projects.splice(position, 1)
    },
    addServices (serviceData) {
      serviceData.count = ''
      this.newservice.services.push(serviceData)
    },
    removeService (serviceData) {
      var position = this.newservice.services.findIndex(service => service.id === serviceData.id)
      this.newservice.services.splice(position, 1)
    },
    resetData () {
      this.newservice = {
        title: '',
        type: 'service',
        is_active: true,
        target: true,
        per_day: false,
        projects: [],
        period: this.allPeriods[0].id,
        shift: '',
        count: '',
        unit: 'day',
        invitation: '',
        freezing: '',
        auto_start_after: '',
        services: [],
        down_payment: 0
      }
      this.selectedProjects = []
      this.selectedService = []
    },
    showSubOfSubCategories (parentId) {
      this.$store.dispatch('getAllchildDependsOnParent', parentId).then(response => {
        if (response.data.data.child.length > 0) {
          this.subOfSubCategories = response.data.data.child
        } else {
          this.subOfSubCategories = []
        }
      })
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
