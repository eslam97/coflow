<template>
  <div class="px-3">
    <b-row>
      <b-col lg="6" class="border-right py-5"  order-lg="1" order="2">
        <h5 class="mb-4 font-size-14 px-3">FLOW INFORMATION</h5>
        <b-row class="pl-3 mb-3">
          <b-col md="12" class="infoKey">
            <p>Description</p>
          </b-col>
          <b-col md="12" class="infoValue">
            <p class="text-black font-weight-bold-600">{{flowsDetails.description}}</p>
          </b-col>
        </b-row>
        <b-row class="pl-3 mb-3">
          <b-col md="12" class="infoKey">
            <p>Requirements</p>
          </b-col>
          <b-col md="12" class="infoValue">
            <p class="text-black font-weight-bold-600">{{flowsDetails.requirements}}</p>
          </b-col>
        </b-row>
        <b-row class="pl-3 mb-3">
          <b-col md="4" class="infoKey">
            <p>Price</p>
          </b-col>
          <b-col md="8" class="infoKey">
            <p>Discounted price</p>
          </b-col>
          <b-col md="4" class="infoValue">
            <p class="text-black font-weight-bold-600">EGP {{flowsDetails.price_egp}}</p>
          </b-col>
          <b-col md="8" class="infoValue">
            <p class="font-weight-bold-400"><span v-if="flowsDetails.discount_price_egp">EGP {{flowsDetails.discount_price_egp}}</span>
              <span v-else>N/A</span></p>
          </b-col>
        </b-row>
        <b-row class="pl-3 mb-3">
          <b-col md="12" class="infoKey">
            <p>Instructors</p>
          </b-col>
          <b-col md="4" class="infoValue" v-for="(inst, key) in flowsDetails.instructors" :key="key">
            <p class="text-black font-weight-bold-600">{{ inst.first_name }} {{ inst.last_name }}</p>
          </b-col>
        </b-row>
      </b-col>
      <b-col lg="6" class="py-5" order-lg="2" order="1">
        <h5 class="mb-4 font-size-14">FLOW PHOTOS</h5>
        <slider-thumbs :images="flowsDetails.images"/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  props: {
    flowsDetails: {
      type: Object
    }
  }
}

</script>
<style>
.font-weight-bold-400 {
  font-weight: 400;
}
</style>
