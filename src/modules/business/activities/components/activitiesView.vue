<template>
  <div class="pl-3 pr-3">
    <b-row>
      <b-col lg="6" class="border-right py-5"  order-lg="1" order="2">
        <h5 class="mb-4 font-size-14">ACTIVITY INFORMATION</h5>
        <b-row class="pl-3 mb-2">
          <b-col md="12" class="infoKey">
            <p>Description</p>
          </b-col>
          <b-col md="12" class="infoValue">
            <p>{{activitiesDetails.description}}</p>
          </b-col>
        </b-row>
        <b-row class="pl-3 mb-2">
          <b-col md="6" class="infoKey">
            <p>Price EGP</p>
            <p class="text-black font-weight-bold">EGP {{activitiesDetails.price_egp}}</p>
          </b-col>
          <b-col md="6" class="infoKey">
            <p>Discounted price</p>
            <p class="text-black font-weight-bold"><span v-if="activitiesDetails.discount_price_egp">EGP
              {{activitiesDetails.discount_price_egp}}</span>
              <span v-else>N/A</span></p>
          </b-col>
        </b-row>
        <b-row class="pl-3 mb-2" v-if="activitiesDetails.price_euro">
          <b-col md="6" class="infoKey">
            <p>Foreigner Price</p>
            <p class="text-black font-weight-bold">€ {{activitiesDetails.price_euro}}</p>
          </b-col>
          <b-col md="6" class="infoKey">
            <p>Discounted Price</p>
            <p class="text-black font-weight-bold">
              <span v-if="activitiesDetails.discount_price_euro">€ {{activitiesDetails.discount_price_euro}}</span>
              <span v-else>N/A</span></p>
          </b-col>
        </b-row>
        <b-row class="pl-3 mb-2" v-if="activitiesDetails.price_dollar">
          <b-col md="6" class="infoKey">
            <p>Foreigner Price</p>
            <p class="text-black font-weight-bold">$ {{activitiesDetails.price_dollar}}</p>
          </b-col>
          <b-col md="6" class="infoKey">
            <p>Discounted Price</p>
            <p class="text-black font-weight-bold">
              <span v-if="activitiesDetails.discount_price_dollar">$ {{activitiesDetails.discount_price_dollar}}</span>
              <span v-else>N/A</span></p>
          </b-col>
        </b-row>

        <b-row class="pl-3 mb-2">
          <b-col md="12" class="infoKey">
            <p>Conditions</p>
          </b-col>
          <b-col md="12" class="infoValue">
            <p>{{activitiesDetails.conditions}}</p>
          </b-col>
        </b-row>
      </b-col>
      <b-col lg="6" class="py-5" order-lg="2" order="1">
        <h5 class="mb-4 font-size-14">ACTIVITY PHOTOS</h5>
        <slider-thumbs :images="activitiesDetails.images"/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  props: {
    activitiesDetails: {
      type: Object
    }
  }
}

</script>
