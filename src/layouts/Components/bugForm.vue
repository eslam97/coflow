<template>
  <div>
    <validationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(addFaqs)">
        <b-row>
          <b-col md="12" class="mb-3">
            <validation-provider
                #default="{ errors }"
                :name="`Description`"
                :rules="'required'"
                class="flex-grow-1"
            >
              <b-form-group label="Something doesn't look right? Let us know and we'll fix it!">
                <b-form-textarea
                    v-model="report.description"
                    placeholder="Description"
                    rows="3"
                    :class="[{ 'is-invalid': errors.length > 0 }]"
                ></b-form-textarea>
              </b-form-group>
            </validation-provider>
          </b-col>
          <b-col md="12" class="mb-3">
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12" class="mt-4">
            <div class="d-flex justify-content-center">
              <b-button class="button-orange-modal" type="submit" v-if="!requestLoading">
                <i class="las la-plus"></i>
              </b-button>
              <b-button class="button-orange-modal" v-else>
                <spinner-loading></spinner-loading>
              </b-button>
            </div>
          </b-col>
        </b-row>
      </b-form>
    </validationObserver>
  </div>
</template>
<script>

export default {
  props: {
    requestLoading: {
      type: Boolean,
      default: false
    },
    report: {
      type: Object
    }
  },
  data () {
    return {}
  },
  methods: {
    addFaqs () {
      this.$emit('addReport', this.report)
    }
  },
  watch: {},
  computed: {},
  created () {}
}
</script>
