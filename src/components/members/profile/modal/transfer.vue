<template>
  <b-container fluid>
    <ValidationObserver v-slot="{ handleSubmit }" v-if="!next">
      <form @submit.prevent="handleSubmit(onSubmit)">
        <b-row>
          <b-form-group class="col-md-12" label="Phone Number or Member Id:" label-for="phone">
            <ValidationProvider name="search" ref="phone" :rules="'required'" v-slot="{ errors }">
              <b-form-input v-model="search" type="text" @update="searchAboutUser"  placeholder="Search...." :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
              <div class="invalid-feedback">
                <span>{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </b-form-group>
          <div v-if="!finishSearch" class="text-center col-md-12">
            <b-spinner small type="grow"></b-spinner>
            Loading...
          </div>
        </b-row>
        <b-row v-if="showDetails">
          <b-form-group v-if="phoneInput" class="col-md-12" label="Phone Number:" label-for="phone">
            <ValidationProvider name="phone" ref="phone" :rules="'required|digits:11'" v-slot="{ errors }">
              <b-form-input v-model="details.phone" type="number" placeholder="Phone Number" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
              <div class="invalid-feedback">
                <span>{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </b-form-group>
          <b-form-group class="col-md-6" label="User Name:" label-for="user name">
            <ValidationProvider name="user name" ref="name" :rules="'required'" v-slot="{ errors }">
              <b-form-input v-model="details.name" type="text" placeholder="User Name" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
              <div class="invalid-feedback">
                <span>{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </b-form-group>
          <b-form-group class="col-md-12" label="National ID or (Passport):" label-for="National ID:">
            <ValidationProvider name="National ID" ref="national" rules="required|min:6|max:14" v-slot="{ errors }">
              <b-form-input v-model="details.national_id" type="number" placeholder="National ID" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
              <div class="invalid-feedback">
                <span>{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </b-form-group>
        </b-row>
        <div class="d-flex align-items-center justify-content-end">
          <b-button variant="primary" type="submit" >next</b-button>
        </div>
      </form>
    </ValidationObserver>
    <ValidationObserver v-slot="{ handleSubmit }" v-else>
      <form @submit.prevent="handleSubmit(transfer)">
        <b-row>
          <b-form-group class="col-md-6" label="Payment Type:" label-for="period">
            <div class="periodNumbers">
              <span :class="[{ 'shadow selectedNumber' : isSelected('cash')}]" @click="details.payment_method = 'cash'">
                Cash
              </span>
              <span :class="[{ 'shadow selectedNumber' : isSelected('visa')}]" @click="details.payment_method = 'visa'">
                Visa
              </span>
            </div>
          </b-form-group>
          <b-form-group class="col-md-6" label="Fees:" label-for="fees">
            <ValidationProvider name="Fees" ref="fees" :rules="'required'" v-slot="{ errors }">
              <b-form-input v-model="details.fees" type="number" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
              <div class="invalid-feedback">
                <span>{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </b-form-group>
          <b-form-group label="Comment" label-for="Comment" class="col-md-12">
            <b-form-textarea id="Comment" rows="2" v-model="details.comment"></b-form-textarea>
          </b-form-group>
        </b-row>
        <div class="d-flex align-items-center justify-content-end">
          <b-button variant="primary" type="submit">transfer</b-button>
        </div>
      </form>
    </ValidationObserver>
  </b-container>
</template>

<script>
import { core } from '../../../../config/pluginInit'

export default {
  name: 'transfer',
  props: [''],
  watch: {
    search (newValue) {
      // eslint-disable-next-line eqeqeq
      if (newValue[0] == '0' && newValue.length != 0) {
        this.details.phone = newValue
        this.phoneInput = false
      } else {
        this.details.phone = ''
        this.phoneInput = true
      }
    }
  },
  data () {
    return {
      search: '',
      phoneInput: false,
      finishSearch: true,
      showDetails: false,
      newUser: true,
      next: false,
      details: {
        phone: '',
        name: '',
        id: '',
        comment: '',
        membership_id: '',
        national_id: '',
        fees: '',
        payment_method: 'cash',
        member_packages: ''
      }
    }
  },
  mounted () {
    core.index()
  },
  methods: {
    searchAboutUser () {
      this.finishSearch = false
      if (this.search.length > 6) {
        this.$store.dispatch('serachByPhoneOrId', this.search).then(res => {
          // console.log(res.data)
          this.details.name = res.data.data.name
          this.details.national_id = res.data.data.national_id
          this.details.id = res.data.data.id
          this.details.phone = res.data.data.phone
          this.finishSearch = true
          this.showDetails = true
          this.newUser = false
        }).catch(() => {
          this.finishSearch = true
          this.showDetails = true
          this.newUser = true
        })
      }
    },
    isSelected (i) {
      // eslint-disable-next-line eqeqeq
      return i == this.details.payment_method
    },
    onSubmit () {
      if (this.newUser) {
        this.$store.dispatch('storeUser', {
          phone: this.details.phone,
          name: this.details.name,
          national: this.details.name,
          type: 'guest'
        }).then(res => {
          this.next = true
          core.showSnackbar('success', res.data.message)
        }).catch(err => {
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            this.$refs[key].setErrors(value)
          }
        })
      } else {
        this.next = true
      }
    },
    transfer () {
      this.$emit('transfer', this.details)
    }
  }
}
</script>

<style scoped>

</style>
