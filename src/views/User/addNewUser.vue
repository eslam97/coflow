<template>
  <b-container fluid>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)">
        <b-row>
          <b-col lg="12">
            <iq-card>
              <template v-slot:body>
                <div v-if="!next" class="new-user-info">
                  <b-row>
                    <b-form-group class="col-md-6" label="User Name:" label-for="user_name">
                      <ValidationProvider name="username" ref="username" :rules="
                      {
                        regex: /^[a-zA-Z-_.\s]*$/,
                        required:true
                      }"
                                          v-slot="{ errors }">
                        <b-form-input v-model="user.username" type="text" placeholder="First Name" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="Full Name:" label-for="full_name">
                      <ValidationProvider name="name" ref="name" :rules="
                      {
                        regex: /^[a-zA-Z\s]*$/,
                        required:true
                      }" v-slot="{ errors }">
                        <b-form-input v-model="user.name" type="text" placeholder="Full Name" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="Email:" label-for="uname">
                      <ValidationProvider name="email" ref="email" rules="required|email" v-slot="{ errors }">
                        <b-form-input v-model="user.email" type="text" placeholder="Email" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="Phone Number:" label-for="number">
                      <ValidationProvider name="number" ref="phone" rules="required|length:11" v-slot="{ errors }">
                        <b-form-input v-model="user.phone" type="number" placeholder="phone number" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="Login Device Number:" label-for="user_name">
                      <ValidationProvider name="Device" ref="device" rules="required" v-slot="{ errors }">
                        <b-form-input v-model="user.device" type="number" placeholder="Device" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-6" label="Departments:" label-for="project">
                      <select  :disabled="edit && getSpacificUser.user.roles[0].display_name=='custom-role'?true : false " class="form-control" id="department" v-model="user.depId" required @change="changeDep($event)">
                        <option selected disabled value="">Choose...</option>
                        <option v-for="(department, key) in getUserDepartments" :key="key" :value="department.id">{{department.title}}</option>
                      </select>
                    </b-form-group>
                    <b-form-group class="col-md-6"
                                  label="Choose Projects:"
                                  label-for="project"
                    >
                      <div>
                        <v-select :options="getUserProjectsPlusAll" multiple v-model="user.projects_ids"
                                  label="en_title"
                                  :selectable="projects => !user.projects_ids.includes(projects.id)"
                                  :reduce="projects => projects.id">
                        </v-select>
                      </div>
                    </b-form-group>
                    <b-form-group class="col-md-6"
                                  label="Choose Roles:"
                                  label-for="role"
                                  v-if="renderComponent"
                    >
                      <div>
                        <v-select :options="roles" :disabled="edit && getSpacificUser.user.roles[0].display_name=='custom-role'" multiple v-model="user.roles_ids" label="display_name" :reduce="roles => roles.id" :rules="rules.select">
                        </v-select>
                        <span v-if="edit && getSpacificUser.user.roles[0].name=='custom_role'" class="text-primary cursor-pointer" @click="resetRole">return to default</span>
                      </div>
                    </b-form-group>
                    <div class="col-md-6 align-items-center d-flex flex-wrap" v-if="edit && getSpacificUser.user.roles[0].display_name=='custom role'">
                      <span v-for="(data, key) in getSpacificUser.user.reference_role.name_roles" :key="key" class="ml-1">
                        {{data.display_name}},
                      </span>
                    </div>
                  </b-row>
                 <b-form-group class="col-md-12" label="default project:" label-for="Default Project" v-if="user.projects_ids.length > 1">
                    <select  class="form-control" id="freezing" v-model="user.default_project" required>
                      <option selected disabled value="">Choose freez...</option>
                      <option v-for="(project, key) in filterProject" :key="key" :value="project.id">{{project.en_title}}</option>
                    </select>
                  </b-form-group>
                  <div class="d-flex  mt-4 align-items-center justify-content-between">
                    <b-form-checkbox v-model="user.is_active">Is Active</b-form-checkbox>
                    <div class="d-flex justify-content-end">
                      <b-button  v-if="edit" variant="primary" type="submit">Save</b-button>
                      <b-button v-else variant="primary" type="submit" >Add New User</b-button>
                      <b-button variant="primary" class="ml-2"  v-if="edit" @click="next = true">Permissions</b-button>
                    </div>
                  </div>
<!--                  <b-row v-for="(err,key) in errors" :key="key">
                    {{err[0]}}
                  </b-row>-->
                </div>
                <div v-if="next" class="user_permations">
                  <ValidationObserver v-slot="{ handleSubmit }">
                    <form  @submit.prevent="handleSubmit(onSubmit)">
                      <b-row>
                        <b-col lg="12">
                          <iq-card>
                            <template v-slot:body>
                              <div class="new-user-info">
                                <h5 class="display-6 mb-3 ">Permissions :</h5>
                                <b-checkbox class="custom-switch-color" color="danger"  name="check-button" inline v-model="allSelected" @change.native="selectAll">
                                  <p class="text-danger">select All</p>
                                </b-checkbox>
                                <b-row v-for="(i, key) in  Object.keys(getUserPermissions)" :key="key" >
                                  <div class="col-12">
                                    <b-checkbox class="custom-switch-color" color="primary"  name="check-button" inline :value="i" v-model="ids" @change.native="selectAllInObject(i)">
                                      <p class="text-primary">{{ i }}</p>
                                    </b-checkbox>
                                  </div>
                                    <div class="col-lg-4 white-space"  v-for="(m, key) in getUserPermissions[i]" :key="key">
                                      <b-checkbox class="custom-switch-color" color="primary" :value="m.id" @change.native="select(m.id, i)" v-model="role.permissions"  name="check-button" inline >
                                        <span :style="`color: ${m.color}`">{{ m.display_name ? m.display_name : m.name }}</span>
                                      </b-checkbox>
                                    </div>
                                  <div class="col-12">
                                    <hr>
                                  </div>
                                </b-row>
                                <div class="d-flex  mt-4 align-items-center justify-content-end">
                                  <b-button @click="editRole" variant="primary">save</b-button>
                                </div>
                              </div>
                            </template>
                          </iq-card>
                        </b-col>
                      </b-row>
                    </form>
                  </ValidationObserver>
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
import { mapGetters } from 'vuex'
// eslint-disable-next-line no-unused-vars
function getData (arr) {
  var newarr = []
  arr.forEach(element => {
    newarr.push(element.id)
  })
  return newarr
}
export default {
  name: 'AddUser',
  props: {
    edit: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    ...mapGetters(['getUserProjects', 'getUserRoles', 'getSpacificUser', 'getUserDepartments', 'getUserPermissions']),
    getUserProjectsPlusAll () {
      return [{ id: 1000, en_title: 'All Projects' }, ...this.getUserProjects]
    },
    filterProject () {
      // eslint-disable-next-line no-unused-vars
      var arr = []
      var exist = ''
      this.user.projects_ids.forEach(projectid => {
        // eslint-disable-next-line eqeqeq
        exist = this.getUserProjects.findIndex(x => x.id == projectid)
        arr.push(this.getUserProjects[exist])
        return arr
      })
      return arr
    }
  },
  mounted () {
    core.index()
    if (this.edit) {
      this.getData()
    } else {
      this.resetData()
    }
  },
  data () {
    return {
      user: {
        default_project: '',
        depId: '',
        username: '',
        phone: '',
        email: '',
        name: '',
        is_active: true,
        projects_ids: [],
        roles_ids: [],
        device: 1
      },
      resetPassword: {
        old_password: '',
        password: '',
        password_confirm: ''
      },
      renderComponent: true,
      next: false,
      rules: {
        select: [(v) => !!v || 'Item is required']
      },
      roles: [],
      newPassword: '',
      role: {
        // eslint-disable-next-line no-undef
        roles_ids: '',
        classification: '',
        permissions: []
      },
      allSelected: false,
      ids: [],
      errors: []
    }
  },
  watch: {
    'user.projects_ids' (value) {
      if (value.includes(1000)) {
        this.user.projects_ids = this.getUserProjects.map(({ id }) => id)
      } else {
        // console.log('no')
      }
      // this.checkProject()
    }
  },
  methods: {
    setDefaultProject (i) {
      // eslint-disable-next-line eqeqeq
      return i == this.user.default_project
    },
    getData () {
      var roleId = this.getSpacificUser.user.roles.map(x => x.id) // dy 3l4an agyb al roles kolhom
      var rolePermissions = [] // da 3l4an kol al id bta3t al permission al httmly mn al loop al gaya
      for (const [key] of Object.entries(this.getSpacificUser.all_permissions)) {
        for (var s = 0; s < this.getSpacificUser.all_permissions[key].length; s++) {
          // console.log('sdsd', this.getSpacificUser.all_permissions[key][s])
          rolePermissions.push(this.getSpacificUser.all_permissions[key][s].id)
        }
      }
      this.user = {
        username: this.getSpacificUser.user.username,
        phone: this.getSpacificUser.user.phone,
        email: this.getSpacificUser.user.email,
        name: this.getSpacificUser.user.name,
        projects_ids: getData(this.getSpacificUser.user.project),
        roles_ids: getData(this.getSpacificUser.user.roles),
        is_active: this.getSpacificUser.user.is_active === 1,
        depId: this.getSpacificUser.user.roles[0].department_id,
        device: this.getSpacificUser.user.login_num,
        default_project: ''
      }
      this.role.permissions = rolePermissions
      // eslint-disable-next-line eqeqeq
      this.roles = this.getSpacificUser.user.roles[0].display_name == 'custom role' ? this.getSpacificUser.user.roles : this.getDepartmentRole(this.getSpacificUser.user.roles[0].department_id)
      this.role.roles_ids = roleId
    },
    forceRerender () {
      // Remove my-component from the DOM
      this.renderComponent = false
      this.$nextTick(() => {
        // Add the component back in
        this.renderComponent = true
      })
    },
    editRole () {
      this.$store.dispatch('editCustomRole', { userId: this.getSpacificUser.user.id, data: this.role }).then(data => {
        this.$bvModal.hide('userModel')
        core.showSnackbar('success', 'User has been Edit successfully.')
      }).catch(() => {
        // console.log(err)
      })
    },
    resetUser () {
      this.$store.dispatch('resetUser', this.getSpacificUser.user.id).then(data => {
        // console.log(data)
        this.getData()
        core.showSnackbar('success', 'Reset has been successfully.')
      })
    },
    changeDep (event) {
      this.user.roles_ids = []
      // eslint-disable-next-line no-return-assign
      this.getUserDepartments.forEach(element => {
        // eslint-disable-next-line eqeqeq
        if (element.id == event.target.value) {
          this.roles = element.role
        }
      })
    },
    getDepartmentRole (depId) {
      var allDepRole = []
      this.getUserDepartments.forEach(element => {
        // eslint-disable-next-line eqeqeq
        if (element.id == depId) {
          // console.log('element', element.role)
          allDepRole.push(element.role)
        }
      })
      return allDepRole[0]
    },
    resetUserPassword () {
      this.loadingButton = true
      this.$store.dispatch('resetPassword', { userId: this.userId, data: this.resetPassword }).then(res => {
        core.showSnackbar('success', res.data.message)
        this.loadingButton = false
        this.resetPassword = {
          old_password: '',
          password: '',
          password_confirm: ''
        }
      }).catch(err => {
        for (const [key, value] of Object.entries(err.response.data.errors)) {
          this.$refs[key].setErrors(value)
        }
        this.loadingButton = false
      })
    },
    onSubmit () {
      if (this.edit) {
        this.$store.dispatch('editUser', { userID: this.getSpacificUser.user.id, newData: this.user }).then(res => {
          core.showSnackbar('success', res.data.message)
          this.$bvModal.hide('userModel')
          core.showSnackbar('success', 'User has been Edit successfully.')
          this.getData()
        }).catch(err => {
          if (err.response.data.errors) {
            for (const [key, value] of Object.entries(err.response.data.errors)) {
              this.$refs[key].setErrors(value)
            }
          } else if (err.response.data.error) {
            core.showSnackbar('error', err.response.data.error)
          }
        })
      } else {
        this.$store.dispatch('createNewUser', this.user).then(data => {
          // console.log(data.data.data['0'])
          this.$store.state.newPassword = data.data.data['0']
          core.showSnackbar('success', 'User has been added successfully.')
          this.$bvModal.hide('userModel')
          this.$store.dispatch('getAllUser', { pageNumber: 1 })
        }).catch(err => {
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            this.$refs[key].setErrors(value)
          }
        })
      }
    },
    resetData () {
      this.user = {
        username: '',
        phone: '',
        email: '',
        name: '',
        projects_ids: [],
        roles_ids: []
      }
    },
    selectAll () {
      this.role.permissions = []
      this.ids = []
      if (this.allSelected) {
        // eslint-disable-next-line no-undef
        Object.keys(this.getUserPermissions).forEach(headerPermissions => {
          // eslint-disable-next-line no-undef
          this.ids.push(headerPermissions)
          this.selectAllInObject(headerPermissions)
        })
      }
    },
    select (id, objectName) {
      this.ids.splice(objectName, 1)
      this.allSelected = false
      /*   this.allSelected = false */
    },
    selectAllInObject (objectName) {
      // console.log('objectName', objectName)
      if (this.ids.indexOf(objectName) !== -1) {
        // console.log('in ids')
        this.getUserPermissions[objectName].forEach(i => {
          this.role.permissions.push(i.id)
        })
      } else {
        this.allSelected = false
        // console.log('no in ids')
        this.getUserPermissions[objectName].forEach(i => {
          this.role.permissions.splice(this.role.permissions.indexOf(i.id), 1)
        })
      }
    },
    resetRole () {
      this.$store.dispatch('resetRole', this.getSpacificUser.user.id).then(res => {
        this.$store.dispatch('getSpacificUser', this.getSpacificUser.user.id).then(() => {
          core.showSnackbar('success', res.data.message)
          this.getData()
        }).catch(err => {
          core.showSnackbar('error', err.response.data.error)
        })
      }).catch(err => {
        core.showSnackbar('error', err.response.data.error)
      })
    }
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
  }
}
</script>
<style>
.selectedNumber{
  color: var(--iq-white) !important;
  background: linear-gradient(to right, var(--iq-primary) 0%, var(--iq-primary-light) 100%) !important;
}
</style>
