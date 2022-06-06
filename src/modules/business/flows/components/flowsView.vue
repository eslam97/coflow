<template>
  <div class="pl-3 pr-3">
    <v-row class="flex-nowrap">
      <v-col md="6">
        <!--          <v-col md="12">-->
        <!--            <p>FLOW PHOTOS</p>-->
        <!--          </v-col>-->
        <slider-thumbs :images="flowsDetails.images"/>
      </v-col>
      <v-col md="6">
        <v-row>
          <v-col md="12">
            <p>FLOW INFORMATION</p>
          </v-col>
        </v-row>
        <b-row class="pl-3 mb-2">
          <b-col md="12" class="infoKey">
            <p>Description</p>
          </b-col>
          <b-col md="12" class="infoValue">
            <p>{{flowsDetails.description}}</p>
          </b-col>
        </b-row>
        <b-row class="pl-3 mb-2">
          <b-col md="12" class="infoKey">
            <p>Requirements</p>
          </b-col>
          <b-col md="12" class="infoValue">
            <p>{{flowsDetails.requirements}}</p>
          </b-col>
        </b-row>
        <b-row class="pl-3 mb-2">
          <b-col md="4" class="infoKey">
            <p>Price</p>
          </b-col>
          <b-col md="8" class="infoKey">
            <p>Discounted price</p>
          </b-col>
          <b-col md="4" class="infoValue">
            <p>EGP {{flowsDetails.price_egp}}</p>
          </b-col>
          <b-col md="8" class="infoValue">
            <p><span v-if="flowsDetails.discount_price_egp">EGP {{flowsDetails.discount_price_egp}}</span>
              <span v-else>N/A</span></p>
          </b-col>
        </b-row>
        <b-row class="pl-3 mb-2">
          <b-col md="12" class="infoKey">
            <p>Instructors</p>
          </b-col>
          <b-col md="4" class="infoValue" v-for="(inst, key) in flowsDetails.instructors" :key="key">
            <p>{{ inst.first_name }} {{ inst.last_name }}</p>
          </b-col>
        </b-row>
      </v-col>
    </v-row>
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
