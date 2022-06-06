<template>
  <div class="pl-3 pr-3">
    <v-row class="flex-nowrap">
      <v-col md="6">
        <!--          <v-col md="12">-->
        <!--            <p>COURSE PHOTOS</p>-->
        <!--          </v-col>-->
        <slider-thumbs :images="coursesDetails.images"/>
      </v-col>
      <v-col md="6">
        <v-row>
          <v-col md="12">
            <p>COURSE INFORMATION</p>
          </v-col>
        </v-row>
        <b-row class="pl-3 mb-2">
          <b-col md="12" class="infoKey">
            <p>Description</p>
          </b-col>
          <b-col md="12" class="infoValue">
            <p>{{coursesDetails.description}}</p>
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
            <p>EGP {{coursesDetails.price_egp}}</p>
          </b-col>
          <b-col md="8" class="infoValue">
            <p><span v-if="coursesDetails.discount_price_egp">EGP {{coursesDetails.discount_price_egp}}</span>
              <span v-else>N/A</span></p>
          </b-col>
        </b-row>
        <b-row class="pl-3 mb-2">
          <b-col md="12" class="infoKey">
            <p>Requirements</p>
          </b-col>
          <b-col md="12" class="infoValue">
            <p>{{coursesDetails.requirements}}</p>
          </b-col>
        </b-row>
        <b-row class="pl-3 mb-2">
          <b-col md="12" class="infoKey">
            <p>Conditions</p>
          </b-col>
          <b-col md="12" class="infoValue">
            <p>{{coursesDetails.conditions}}</p>
          </b-col>
        </b-row>
        <b-row class="pl-3 mb-2">
          <b-col md="12" class="infoKey">
            <p>Locations</p>
          </b-col>
          <b-col md="4" class="infoValue" v-for="(location, key) in coursesDetails.locations" :key="key">
            <p>{{ location }}</p>
          </b-col>
        </b-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    coursesDetails: {
      type: Object
    }
  }
}

</script>
