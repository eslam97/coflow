<template>
  <div>
    <div>
      <ValidationObserver v-slot="{ handleSubmit }" ref="observer">
          <form @submit.prevent="handleSubmit(setDefaultProject)">
            <b-row>
              <b-col lg="12">
                <iq-card>
                  <template v-slot:body>
                    <div class="new-user-info">
                      <b-row>
                        <b-form-group class="col-md-12" label="Choose Project">
                          <ValidationProvider name="sub" ref="sub" rules="required" v-slot="{ errors }">
                            <select  class="form-control" id="sub"  v-model="projectId" required>
                              <option selected disabled value="">Choose default branch...</option>
                              <option v-for="(i, key) in allProjects" :key="key" :value="i.id">
                                <span>{{i.en_title}}</span>
                              </option>
                            </select>
                            <div class="invalid-feedback">
                              <span>{{ errors[0] }}</span>
                            </div>
                          </ValidationProvider>
                        </b-form-group>
                      </b-row>
                      <div class="d-flex  mt-2 align-items-center justify-content-end">
                        <b-button variant="primary"  type="submit" >Save</b-button>
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
  name: 'defaultProject',
  mounted () {
    core.index()
  },
  data () {
    return {
      projectId: JSON.parse(localStorage.getItem('default_project')).id,
      allProjects: JSON.parse(localStorage.getItem('user_projects'))
    }
  },
  methods: {
    setDefaultProject () {
      this.$store.dispatch('setDefaultProject', this.projectId).then(data => {
        core.showSnackbar('success', data.data.message)
        localStorage.setItem('default_project', JSON.stringify(data.data.data))
        this.$store.commit('changeDefaultProject', data.data.data)
      })
    }
  }
}
</script>
