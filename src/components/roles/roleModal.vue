<template>
  <b-container fluid>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form   @submit.prevent="handleSubmit(onSubmit)">
        <b-row>
          <b-col lg="12">
            <iq-card>
              <template v-slot:body>
                <div class="new-user-info">
                  <b-row>
                    <b-form-group class="col-md-6" label="Role Name:" label-for="role_name">
                      <ValidationProvider name="Role Name" rules="required" v-slot="{ errors }">
                        <b-form-input v-model="role.name" type="text" placeholder="Role Name" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group class="col-md-6"
                  >
                    <label for="validationTooltip04">Classifications</label>
                    <select class="form-control" id="validationTooltip04" v-model="role.classification" required>
                      <option selected disabled value="">Choose...</option>
                      <option v-for="(i, key) in getRoleToCreate.classification" :key="key" :value="i">{{i}}</option>
                    </select>
                  </b-form-group>
                    <b-form-group class="col-md-6"
                    >
                      <label for="validationTooltip04">Departments</label>
                      <select class="form-control" id="validationTooltip045" v-model="role.department" required >
                        <option selected disabled value="">Choose...</option>
                        <option v-for="(i, key) in getRoleToCreate.department" :key="key" :value="i.id">{{i.title}}</option>
                      </select>
                    </b-form-group>
                  </b-row>
                  <h5 class="display-6 mb-3 ">Permissions :</h5>
                  <b-checkbox class="custom-switch-color" color="danger"  name="check-button" inline v-model="allSelected" @change.native="selectAll">
                    <p class="text-danger">select All</p>
                  </b-checkbox>
                    <b-row v-for="(i, key) in  Object.keys(getRoleToCreate.permissions)" :key="key" >
                    <div class="col-12">
                      <b-checkbox class="custom-switch-color" color="primary"  name="check-button" inline :value="i" v-model="ids" @change.native="selectAllInObject(i)">
                        <p class="text-primary">{{ i }}</p>
                      </b-checkbox>
                    </div>
                    <div class="col-12 ml-5 mt-2">
                      <b-checkbox class="custom-switch-color" color="primary" v-for="(m, key) in getRoleToCreate.permissions[i]" :key="key" :value="m.id" @change.native="select(m.id, i)" v-model="role.permissions"  name="check-button" inline >
                       <span :style="`color: ${m.color}`">{{ m.display_name ? m.display_name : m.name }}</span>
                      </b-checkbox>

                    </div>
                      <div class="col-12">
                      <hr>
                      </div>
                    </b-row>
                  <div class="d-flex  mt-4 align-items-center justify-content-between">
                    <b-form-checkbox v-model="role.is_active">Is Active</b-form-checkbox>
                    <b-button  v-if="edit" variant="primary" type="submit">Edit Role</b-button>
                    <b-button v-else variant="primary" type="submit" >Add New Role</b-button>
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
    ...mapGetters(['getSpecialRole', 'getRoleToCreate'])
  },
  mounted () {
    core.index()
    if (this.edit) {
      var rolePermissions = this.getSpecialRole.permissions.map(x => x.id)
      var department = this.getSpecialRole.department ? this.getSpecialRole.department.id : ''
      this.role = {
        name: this.getSpecialRole.name,
        is_active: this.getSpecialRole.is_active,
        classification: this.getSpecialRole.classification,
        permissions: rolePermissions,
        department: department
      }
    } else {
      this.resetData()
    }
  },
  data () {
    return {
      role: {
        name: '',
        is_active: 0,
        classification: '',
        department: '',
        permissions: []
      },
      allSelected: false,
      errors: [],
      ids: []
    }
  },
  methods: {

    selectAll () {
      // console.log('hello select all', this.allSelected)
      this.role.permissions = []
      this.ids = []
      if (this.allSelected) {
        // eslint-disable-next-line no-undef
        Object.keys(this.getRoleToCreate.permissions).forEach(headerPermissions => {
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
        this.getRoleToCreate.permissions[objectName].forEach(i => {
          this.role.permissions.push(i.id)
        })
      } else {
        this.allSelected = false
        // console.log('no in ids')
        this.getRoleToCreate.permissions[objectName].forEach(i => {
          this.role.permissions.splice(this.role.permissions.indexOf(i.id), 1)
        })
      }
    },
    resetData () {
      this.role = {
        name: '',
        is_active: '',
        department: '',
        classification: '',
        permissions: []
      }
    },
    onSubmit () {
      /*      this.user.name = this.fullName
      db.collection('users').add(this.user) */
      // eslint-disable-next-line no-undef
      if (this.edit) {
        this.$store.dispatch('editRole', {
          roleId: this.getSpecialRole.id,
          newData: this.role
        }).then(() => {
          core.showSnackbar('success', 'Role has been Edit successfully.')
          this.$bvModal.hide('modal-role')
        }).catch(err => {
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            this.$refs[key].setErrors(value)
          }
        })
      } else {
        this.$store.dispatch('createNewRole', this.role).then(data => {
          core.showSnackbar('success', 'role has been create successfully.')
          this.$bvModal.hide('modal-role')
        }).catch(err => {
          if (err.response.data.message) { core.showSnackbar('error', `${err.response.data.message}`) } else {
            for (const [key, value] of Object.entries(err.response.data.errors)) {
              this.$refs[key].setErrors(value)
            }
          }
        })
      }
    }
  }
}
</script>
<style scoped>
[dir=ltr][mode=light] hr{
  border-top: 1px solid rgb(136 79 165 / 42%) !important;
}
</style>
