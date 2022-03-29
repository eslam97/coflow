<template>
  <div>
    <div>
      <ValidationObserver v-slot="{ handleSubmit }" ref="observer">
        <form @submit.prevent="handleSubmit(resetUserPassword)">
          <b-row>
            <b-col lg="12">
              <iq-card>
                <template v-slot:body>
                  <div class="new-user-info">
                    <b-row>
                      <b-form-group class="col-md-12">
                        <ValidationProvider vid="oldPassword" name="oldPassword" rules="required" v-slot="{ errors }">
                          <div class="form-group">
                            <label for="oldPasswordInput">Old Password</label>
                            <input type="password"  :class="'form-control mb-0' +(errors.length > 0 ||resetPassword.old_password.length<8 &&resetPassword.old_password.length>0 ? ' is-invalid' : '')"
                                   id="oldPasswordInput"
                                   v-model="resetPassword.old_password" placeholder="old password" required>
                            <div class="invalid-feedback">
                              <span>{{ errors[0] }}</span>
                              <span v-if="resetPassword.old_password.length">The password must be at least 8 characters. </span>
                            </div>
                          </div>
                        </ValidationProvider>
                        <ValidationProvider vid="newPassword" name="newPassword" ref="newPassword" rules="required" v-slot="{ errors }">
                          <div class="form-group">
                            <label for="newPasswordInput">New Password</label>
                            <input type="password"  :class="'form-control mb-0' +(errors.length > 0 ||resetPassword.password.length<8 &&resetPassword.password.length>0 ? ' is-invalid' : '')"
                                   id="newPasswordInput"
                                   v-model="resetPassword.password" placeholder="new password" required>
                            <div class="invalid-feedback">
                              <span>{{ errors[0] }}</span>
                              <span v-if="resetPassword.password.length">The password must be at least 8 characters. </span>
                            </div>
                          </div>
                        </ValidationProvider>
                        <ValidationProvider vid="confirmPassword" name="confirmPassword" rules="required|confirmed:newPassword" v-slot="{ errors }">
                          <div class="form-group">
                            <label for="confirmPasswordInput">Confirm Password</label>
                            <input type="password"  :class="'form-control mb-0' +(errors.length > 0 ||resetPassword.password_confirm.length<8 &&resetPassword.password_confirm.length>0 ? ' is-invalid' : '')"
                                   id="confirmPasswordInput"
                                   v-model="resetPassword.password_confirm" placeholder="confirm password" required>
                            <div class="invalid-feedback">
                              <span>{{ errors[0] }}</span>
                            </div>
                          </div>
                        </ValidationProvider>
                      </b-form-group>
                    </b-row>
                    <div class="d-flex  mt-2 align-items-center justify-content-end">
                      <b-button v-if='loadingButton' class="btn btn-primary float-right" variant="primary" disabled>
                        <b-spinner small type="grow"></b-spinner>
                        loading...
                      </b-button>
                      <b-button v-else variant="primary" class="btn btn-primary float-right"  type="submit" >Save</b-button>
                    </div>
                  </div>
                </template>
              </iq-card>
            </b-col>
          </b-row>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>
<script>
import { core } from '../../config/pluginInit'

export default {
  name: 'resetPassword',
  mounted () {
    core.index()
  },
  data () {
    return {
      userId: JSON.parse(localStorage.getItem('user_info')).id,
      loadingButton: false,
      resetPassword: {
        old_password: '',
        password: '',
        password_confirm: ''
      }
    }
  },
  methods: {
    resetUserPassword () {
      this.loadingButton = true
      this.$store.dispatch('changePassword', this.resetPassword).then(res => {
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
    }
  }
}
</script>
