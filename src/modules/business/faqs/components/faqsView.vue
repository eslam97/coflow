<template>
  <div class="pl-3 pr-3">
<!--    <p class="px-2">QUESTION {{ faqsDetails.id }}</p>-->
    <b-row class="pl-3 mb-2">
      <b-col md="12" class="infoKey">
        <p class="font-weight-bold-500">Question</p>
      </b-col>
      <b-col md="12" class="">
        <p class="text-black font-weight-bold-600">{{ faqsDetails.question }}</p>
      </b-col>
    </b-row>
    <b-row class="pl-3 mb-2">
      <b-col md="12" class="infoKey">
        <p class="font-weight-bold-500">Answer</p>
      </b-col>
      <b-col md="12" class="">
        <p class="text-black font-weight-bold-600">{{ faqsDetails.answer }}</p>
      </b-col>
    </b-row>
  </div>
</template>

<script>
/*   :: TODO get Index Of Table */
export default {
  props: {
    faqsDetails: {
      type: Object
    }
  }
}

</script>
