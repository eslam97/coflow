<template>
  <div class="pl-3 pr-3">
    <b-row>
      <b-col lg="6" class="border-right py-5"  order-lg="1" order="2">
        <h5 class="mb-4 font-size-14">COURSE INFORMATION</h5>
        <b-row class="pl-3 mb-2">
          <b-col md="12" class="infoKey">
            <p>Description</p>
          </b-col>
          <b-col md="12" class="infoValue">
            <p>{{coursesDetails.description}}</p>
          </b-col>
        </b-row>
        <b-row class="pl-3 mb-2">
          <b-col md="6" col="6" class="infoKey">
            <p>Price EGP</p>
            <p class="text-black font-weight-bold">EGP {{coursesDetails.price_egp}}</p>
          </b-col>
          <b-col md="6" col="6" class="infoKey">
            <p>Discounted price</p>
            <p class="text-black font-weight-bold"><span v-if="coursesDetails.discount_price_egp">EGP
              {{coursesDetails.discount_price_egp}}</span>
              <span v-else>N/A</span></p>
          </b-col>
        </b-row>
        <b-row class="pl-3 mb-2" v-if="coursesDetails.price_euro">
          <b-col md="6" col="6" class="infoKey">
            <p>Foreigner Price</p>
            <p class="text-black font-weight-bold">€ {{coursesDetails.price_euro}}</p>
          </b-col>
          <b-col md="6" col="6" class="infoKey">
            <p>Discounted Price</p>
            <p class="text-black font-weight-bold">
              <span v-if="coursesDetails.discount_price_euro">€ {{coursesDetails.discount_price_euro}}</span>
              <span v-else>N/A</span></p>
          </b-col>
        </b-row>
        <b-row class="pl-3 mb-2" v-if="coursesDetails.price_dollar">
          <b-col md="6" col="6" class="infoKey">
            <p>Foreigner Price</p>
            <p class="text-black font-weight-bold">$ {{coursesDetails.price_dollar}}</p>
          </b-col>
          <b-col md="6" col="6" class="infoKey">
            <p>Discounted Price</p>
            <p class="text-black font-weight-bold">
              <span v-if="coursesDetails.discount_price_dollar">$ {{coursesDetails.discount_price_dollar}}</span>
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
          <b-col md="4" class="infoValue" v-for="(location, key) in coursesDetails.location" :key="key">
            <p>{{ location }}</p>
          </b-col>
        </b-row>
      </b-col>
      <b-col lg="6" class="py-5" order-lg="2" order="1">
        <h5 class="mb-4 font-size-14">COURSE PHOTOS</h5>
        <slider-thumbs :images="coursesDetails.images"/>
      </b-col>
    </b-row>
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
