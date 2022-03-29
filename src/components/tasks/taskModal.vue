<template>
  <b-container fluid>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)">
        <b-row>
          <b-col lg="12">
            <iq-card>
              <template v-slot:body>
                <div class="new-user-info">
                  <b-row>
                    <b-form-group class="col-md-6" label="Title:" label-for="title">
                      <ValidationProvider name="title" ref="title" rules="required|max:20" v-slot="{ errors }">
                        <b-form-input v-model="task.title" type="text" placeholder="title" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                    <b-form-group
                        label-for="exampleInputcolor"
                        label="project color"
                        class="col-md-6">
                      <ValidationProvider name="Color" rules="required" ref="color" v-slot="{ errors }">
                        <b-form-input type="color" id="exampleInputcolor" v-model="task.color" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                        <div class="invalid-feedback">
                          <span>{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </b-form-group>
                  </b-row>
                  <div class="d-flex  mt-4 align-items-center justify-content-between">
                    <b-form-checkbox v-model="task.is_active">Is Active</b-form-checkbox>
                    <b-button  v-if="edit" variant="primary" type="submit">Edit Category</b-button>
                    <b-button v-else variant="primary" type="submit" >Add New Category</b-button>
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
    ...mapGetters(['getSpacificTaskCategory'])
  },
  mounted () {
    core.index()
    if (this.edit) {
      this.task = {
        title: this.getSpacificTaskCategory.title,
        color: this.getSpacificTaskCategory.color,
        is_active: this.getSpacificTaskCategory.is_active === 1
      }
    } else {
      this.resetData()
    }
  },
  data () {
    return {
      task: {
        title: '',
        color: '#3291a8',
        is_active: true
      },
      errors: []
    }
  },
  methods: {
    resetData () {
      this.task = {
        title: '',
        color: '#3291a8',
        is_active: true
      }
    },
    onSubmit () {
      /*      this.user.name = this.fullName
      db.collection('users').add(this.user) */
      // eslint-disable-next-line no-undef
      if (this.edit) {
        this.$store.dispatch('editTaskCategory', {
          categoryId: this.getSpacificTaskCategory.id,
          newData: this.task
        }).then(res => {
          core.showSnackbar('success', res.data.message)
          this.$bvModal.hide('modal-4')
        }).catch(err => {
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            this.$refs[key].setErrors(value)
          }
        })
      } else {
        this.$store.dispatch('addTaskCategory', this.task).then(res => {
          core.showSnackbar('success', res.data.message)
          this.$bvModal.hide('modal-4')
        }).catch(err => {
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            this.$refs[key].setErrors(value)
          }
        })
      }
    }
  }
}
</script>
