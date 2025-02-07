<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(submit)">
        <b-row>
          <b-col md="12" class="mb-3">
            <input-form
                v-model="level.name"
                placeholder=""
                :validate="'required'"
                name="name"
                :label="'name'"
            />
          </b-col>
          <b-col md="12" class="mb-3">
            <input-form
                v-model="level.color"
                placeholder=""
                :validate="'required'"
                name="color"
                :label="'color'"
                type="color"
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
  name: 'levelForm',
  props: {
    requestLoading: {
      type: Boolean,
      default: false
    },
    typeOfModal: {
      type: String,
      default: 'add'
    },
    levelDetails: {
      type: Object
    }
  },
  data () {
    return {
      level: {
        name: '',
        color: ''
      }
    }
  },
  methods: {
    submit () {
      if (this.typeOfModal === 'add') {
        this.$emit('addLevel', this.level)
      } else {
        this.$emit('editLevel', this.level)
      }
    }
  },
  watch: {
  },
  computed: {
  },
  created () {
    if (this.levelDetails) {
      this.level = this.levelDetails
    }
  }
}
</script>
