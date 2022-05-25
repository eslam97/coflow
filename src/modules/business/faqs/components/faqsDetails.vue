<template>
  <div>
    <validationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(addFaqs)">
        <b-row>
          <b-col md="12" class="mb-3">
            <input-form
                v-model="faqs.question"
                placeholder="Write your question"
                :validate="'required'"
                name="question"
                :label="'Question'"
            />
          </b-col>
          <b-col md="12" class="mb-3">
            <input-form
                v-model="faqs.answer"
                placeholder="Write your answer"
                :validate="'required'"
                name="answer"
                :label="'Answer'"
            />
          </b-col>
        </b-row>
        <b-row v-if="typeOfModal != 'view'">
          <b-col md="12" class="mt-4">
            <div class="d-flex justify-content-center" v-if="typeOfModal == 'add'">
              <b-button class="button-orange-modal" type="submit" v-if="!requestLoading">
                <i class="las la-plus"></i>
              </b-button>
              <b-button class="button-orange-modal" v-else>
                <spinner-loading></spinner-loading>
              </b-button>
            </div>
            <div class="d-flex justify-content-center" v-if="typeOfModal == 'edit'">
              <b-button class="button-blue-modal" type="submit" v-if="!requestLoading">
                <i class="las la-pen"></i>
              </b-button>
              <b-button class="button-blue-modal" v-else>
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
    typeOfModal: {
      type: String,
      default: 'add'
    },
    faqsDetails: {
      type: Object
    }
  },
  data () {
    return {
      faqs: {
        question: '',
        answer: ''
      }
    }
  },
  methods: {
    addFaqs () {
      this.$emit('addFaqs', this.faqs)
    }
  },
  watch: {},
  computed: {},
  created () {
    if (this.faqsDetails) {
      this.faqs = {
        question: this.faqsDetails.question,
        answer: this.faqsDetails.answer
      }
    }
  }
}
</script>
