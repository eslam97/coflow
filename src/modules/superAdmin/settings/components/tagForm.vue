<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(submit)">
        <b-row>
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
      tag: {
        name: ''
      }
    }
  },
  methods: {
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
    if (this.tagDetails) {
      this.tag = this.tagDetails
    }
  }
}
</script>
