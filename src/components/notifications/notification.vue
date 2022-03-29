<template>
  <b-container>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)">
        <b-row>
          <b-col lg="12">
                <b-row>
                  <b-form-group class="col-md-6" label="Title:" label-for="title">
                    <ValidationProvider name="phone" ref="title" rules="required" v-slot="{ errors }">
                      <b-form-input v-model="notification.title" type="text" placeholder="Title....." :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                      <div class="invalid-feedback">
                        <span>{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
                  </b-form-group>
                  <b-form-group class="col-md-6" label="Body:" label-for="body">
                    <ValidationProvider name="body" ref="body" rules="required" v-slot="{ errors }">
                      <b-form-input v-model="notification.body" type="text" placeholder="Body....." :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                      <div class="invalid-feedback">
                        <span>{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
                  </b-form-group>
                </b-row>
          </b-col>
          <b-col lg="12">
            <h5 class="mb-2">All Words :</h5>
          </b-col>
         <b-col lg="2" class="bg-light m-1 text-center p-2 rounded text-black" v-for="(i, key) in allWords" :key="key" > <span>{{i}}</span> </b-col>
        </b-row>
        <div class="d-flex  mt-4 align-items-center justify-content-end">
          <b-button variant="primary" type="submit" >Save</b-button>
        </div>
      </form>
    </ValidationObserver>
  </b-container>
</template>
<script>
import { core } from '../../config/pluginInit'

export default {
  name: 'editNotification',
  props: {
    details: {
      default: {}
    }
  },
  computed: {
  },
  mounted () {
    core.index()
  },
  data () {
    return {
      notification: {
        title: this.details ? this.details.title : '',
        body: this.details ? this.details.body : '',
        is_active: 1
      },
      allWords: [],
      notificationId: this.details.id
    }
  },
  created () {
    if (this.details && this.details.items) {
      /*      var arrOfWords = Object.entries(this.details.items)
      // console.log('arrOfWords', arrOfWords) */
      for (const property in this.details.items) {
        for (const word in this.details.items[property]) {
          // console.log('word', word)
          this.allWords.push(word)
        }
      }
    }
  },
  methods: {
    onSubmit () {
      this.$store.dispatch('editNotifications', { notificationId: this.notificationId, data: this.notification }).then(res => {
        core.showSnackbar('success', res.data.message)
        this.$bvModal.hide('notification-modal')
        this.$emit('refresh')
      }).catch(err => {
        core.showSnackbar('danger', err.response.data.message)
      })
    }
  }
}
</script>
<style>
.list-group-item.active p, .list-group-item.active h5, .list-group-item.active small.text-muted{
  color: #fff !important;
}
</style>
