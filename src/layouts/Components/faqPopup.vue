<template>
  <div>
    <div v-if="!loading" class="accordion" role="tablist">
      <b-card v-for="item in faqList" :key="item.id" no-body class="mb-1">
        <b-card-header header-tag="header" class="p-0 border-0" role="tab">
          <b-button
              class="d-flex justify-content-between align-items-center header-faq"
              block
              v-b-toggle="`accordion-${item.id}`">
            {{ item.question }}
            <i class="las la-angle-down"></i>
          </b-button>
        </b-card-header>
        <b-collapse :id="`accordion-${item.id}`" visible accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-card-text>{{ item.answer }}</b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
    <spinner-loading v-else text="Loading"/>
  </div>
</template>
<script>

import LayoutServices from '../services/layout.services'

export default {
  props: {},
  data () {
    return {
      faqList: {},
      loading: true
    }
  },
  methods: {
    addFaqs () {
      this.$emit('addReport', this.report)
    }
  },
  watch: {},
  computed: {},
  created () {
    LayoutServices.getFaqList().then(res => {
      this.faqList = res.data.data
      this.loading = false
    })
  }
}
</script>

<style scoped>
/*.btn.collapsed,
.btn.not-collapsed {
  text-align: left;
  background-color: transparent !important;
  border: none;
  color: black !important;
}*/

.card-header button {
  text-align: start;
  height: 50px;
  background: rgba(200, 200, 220, 0.2) !important;
  color: var(--iq-dark) !important;
  font-weight: bold;
  border-radius: 0 !important;
  border: none !important;
  outline: 0;
}

.card-header button:focus,
.card-header button:active {
  background: rgba(200, 200, 220, 0.2) !important;
  box-shadow: none !important;
  border: none !important;
  outline: 0 !important;
}

.card-header button.not-collapsed {
  background: #fff !important;
  color: var(--iq-dark);

}

.card-header button.not-collapsed i {
  transform: rotate(180deg);
}

.card-body {
  background: #fff;
  font-size: 1.1rem;
}

.card-body p {
  line-height: 1.7;
}

</style>
