<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(saveRole)">
        <b-row>
          <b-col md="12" class="mb-3">
            <input-form
                v-model="role.name"
                placeholder="Ex: Admin"
                :validate="'required'"
                name="name"
                :label="'Role Name'"
            />
          </b-col>
          <b-col md="12" class="mb-3" >
            <h5> Choose Permission</h5>
          </b-col>
          <b-col md="2" class="mb-3" v-for="(permission, key) in allPermissions" :key="key">
            <b-form-checkbox :value="permission.id" v-model="role.permissions" class="custom-checkbox-color-check"
                             color="warning">
              <span class="font-size-12 text-primary"> {{ permission.name }} </span>
            </b-form-checkbox>
          </b-col>
        </b-row>
        <b-row v-if="typeOfModal != 'view'">
          <b-col md="12" class="mt-4">
            <div class="d-flex justify-content-center" v-if="typeOfModal == 'add'">
              <b-button class="button-orange-modal" type="submit" v-if="!requestLoading">
                <i class="las la-plus"></i>
              </b-button>
              <b-button class="button-orange-modal" v-else>
                <spinner-loading ></spinner-loading>
              </b-button>
            </div>
            <div class="d-flex justify-content-center" v-if="typeOfModal == 'edit'">
              <b-button class="button-blue-modal" type="submit" v-if="!requestLoading">
                <i class="las la-pen"></i>
              </b-button>
              <b-button class="button-blue-modal" v-else>
                <spinner-loading ></spinner-loading>
              </b-button>
            </div>
          </b-col>
        </b-row>
      </b-form>
    </ValidationObserver>
  </div>
</template>
<script>
import adminService from '../services/admins.services'
/* import { core } from '@/config/pluginInit' */
export default {
  props: {
    typeOfModal: {
      type: String
    },
    requestLoading: {
      type: Boolean
    },
    roleDetails: {
      type: Object
    }
  },
  data () {
    return {
      role: {
        name: '',
        permissions: []
      },
      allPermissions: []
    }
  },
  methods: {
    getAllPermissions () {
      adminService.getAllPermissions().then(res => {
        this.allPermissions = res.data.data
      })
    },
    saveRole () {
      if (this.roleDetails) {
        this.$emit('editRole', { ...this.role, _method: 'PATCH' })
      } else {
        this.$emit('saveRole', this.role)
      }
    }
  },
  watch: {
  },
  computed: {
  },
  mounted () {
    if (this.roleDetails) {
      this.role.name = this.roleDetails?.name
      this.role.permissions = this.roleDetails?.permissions.map(data => data.id)
    }
  },
  created () {
    this.getAllPermissions()
  }
}
</script>
