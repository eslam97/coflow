<template>
  <b-container fluid>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)">
        <b-row>
          <b-form-group class="col-md-12" label="Phone Number:" label-for="phone">
            <ValidationProvider name="phone" ref="phone" :rules="'required|digits:11'" v-slot="{ errors }">
              <b-form-input v-model="phone" type="number" placeholder="Phone Number" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
              <div class="invalid-feedback">
                <span>{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </b-form-group>
          <b-form-group class="col-md-12" label="User Name:" label-for="user name">
            <ValidationProvider name="user name" ref="name" :rules="'required'" v-slot="{ errors }">
              <b-form-input v-model="name" type="text" placeholder="User Name" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
              <div class="invalid-feedback">
                <span>{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </b-form-group>
          <b-form-group class="col-md-12" label="National ID or (Passport):" label-for="National ID:">
            <ValidationProvider name="National ID" ref="national" rules="required|min:6|max:14" v-slot="{ errors }">
              <b-form-input v-model="national" type="number" placeholder="National ID" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
              <div class="invalid-feedback">
                <span>{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </b-form-group>
        </b-row>
        <div class="d-flex align-items-center justify-content-end">
          <b-button variant="primary" type="submit" >invite</b-button>
        </div>
      </form>
    </ValidationObserver>
  </b-container>
</template>

<script>
import { core } from '../../../../config/pluginInit'

export default {
  name: 'invitation',
  props: [''],
  data () {
    return {
      phone: '',
      name: '',
      national: ''
    }
  },
  mounted () {
    core.index()
  },
  methods: {
    onSubmit () {
      this.$emit('invite', { phone: this.phone, name: this.name, national: this.national })
    }
  }
}
</script>

<style scoped>

</style>
