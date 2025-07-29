<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(submit)">
        <b-row>
           <b-col md="12" class="mb-3">
            <main-select
                labelTitle='Activity Line'
                :validate="'required'"
                :name="`Activity Line`"
                label="name"
                placeholder="Choose" :options="activityLines"
                v-model="tag.activity_line_id"
                :reduce="data=> data.id"
            ></main-select>
          </b-col>
          <b-col md="12" class="mb-3">
            <input-form
                v-model="tag.name"
                placeholder=""
                :validate="'required'"
                name="name"
                :label="'name'"
            />
          </b-col>
        </b-row>
        <b-row>
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
import settingsService from '../services/settings.services'
import { core } from '@/config/pluginInit'
export default {
  name: 'tagForm',
  props: {
    requestLoading: {
      type: Boolean,
      default: false
    },
    typeOfModal: {
      type: String,
      default: 'add'
    },
    tagDetails: {
      type: Object
    }
  },
  data () {
    return {
      activityLines: [],
      tag: {
        name: '',
        activity_line_id: null
      }
    }
  },
  methods: {
    getAllActivityLine () {
      settingsService.getAllActivityLine().then((response) => {
        this.activityLines = response.data.data
      }).catch((error) => {
        core.handleError(error)
      })
    },
    submit () {
      if (this.typeOfModal === 'add') {
        this.$emit('addTag', this.tag)
      } else {
        this.$emit('editTag', this.tag)
      }
    }
  },
  watch: {
  },
  computed: {
  },
  created () {
    this.getAllActivityLine()

    if (this.tagDetails) {
      this.tag = this.tagDetails
    }
  }
}
</script>
