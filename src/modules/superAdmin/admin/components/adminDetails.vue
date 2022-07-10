<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(saveAdmin)">
        <b-row>
          <b-col md="12" class="mb-3">
            <input-form
                v-model="admin.name"
                placeholder="Ex: Admin"
                :validate="'required'"
                name="name"
                :label="'Admin Name'"
            />
          </b-col>
          <b-col md="12" class="mb-3">
            <input-form
                v-model="admin.email"
                placeholder="Ex: Admin@coflow.com"
                :validate="'required|email'"
                name="email"
                :label="'Email'"
            />
          </b-col>
          <b-col md="12" class="mb-3">
            <input-form
                v-model="admin.password"
                placeholder="*********"
                type="password"
                name="password"
                :label="'Password'"
            />
          </b-col>
          <b-col md="12" class="mb-3">
            <main-select labelTitle='Admin' :validate="'required'"
                         :name="`Admin`" placeholder="Choose" :options="allRoles"
                         label="name"
                         :reduce="data => data.id"
                         v-model="admin.role_id"></main-select>
          </b-col>
          <b-col md="12" class="mb-5">
            <cropper-images
                label="Upload Logo"
                nameOfImage="image.jpg"
                @cropper-save="savelogoImage"
                :progressLoading="loadingLogo"
                :showProgress="false"
                :multi="false"
                :imageUrl="logoImage"
            />
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
    adminDetails: {
      type: Object
    }
  },
  data () {
    return {
      admin: {
        name: '',
        email: '',
        password: '',
        role_id: '',
        logo: ''
      },
      allRoles: [],
      loadingLogo: 0,
      logoImage: ''
    }
  },
  methods: {
    savelogoImage (data) {
      this.admin.logo = data.image
      this.logoImage = ''
    },
    getAllPermissions () {
      adminService.getAllRoles().then(res => {
        this.allRoles = res.data.data
      })
    },
    saveAdmin () {
      const formData = new FormData()
      formData.append('name', this.admin.name)
      formData.append('email', this.admin.email)
      formData.append('password', this.admin.password)
      formData.append('role_id', this.admin.role_id)
      formData.append('image', this.admin.logo)
      if (this.adminDetails) {
        formData.append('_method', 'PATCH')
        this.$emit('editAdmin', formData)
      } else {
        this.$emit('saveAdmin', formData)
      }
    }
  },
  watch: {
  },
  computed: {
  },
  created () {
    this.getAllPermissions()
    if (this.adminDetails) {
      this.admin = {
        name: this.adminDetails.name,
        email: this.adminDetails.email,
        password: '',
        role_id: this.adminDetails.role_id
      }
      this.logoImage = this.adminDetails.logo
    }
  }
}
</script>
