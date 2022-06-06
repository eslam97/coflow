<template>
  <div class="pl-3 pr-3">
    <p>QUESTION {{ faqsDetails.id }}</p>
    <b-row class="pl-3 mb-2">
      <b-col md="12" class="infoKey">
        <p>Question</p>
      </b-col>
      <b-col md="12" class="infoValue">
        <p>{{ faqsDetails.question }}</p>
      </b-col>
    </b-row>
    <b-row class="pl-3 mb-2">
      <b-col md="12" class="infoKey">
        <p>Answer</p>
      </b-col>
      <b-col md="12" class="infoValue">
        <p>{{ faqsDetails.answer }}</p>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  props: {
    faqsDetails: {
      type: Object
    }
  }
}

</script>
