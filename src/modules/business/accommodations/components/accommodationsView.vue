<template>
  <div class="pl-3 pr-3">
    <b-row>
      <b-col lg="6" class="border-right py-5"  order-lg="1" order="2">
        <h5 class="mb-4 font-size-14 px-3">ACCOMMODATION INFORMATION</h5>
        <b-row class="pl-3 mb-2">
          <b-col md="12" class="infoKey">
            <p>Description</p>
          </b-col>
          <b-col md="12" class="infoValue">
            <p class="text-black font-weight-bold-600">{{accommodationsDetails.description}}</p>
          </b-col>
        </b-row>
        <b-row class="pl-3 mb-2">
          <b-col md="6" col="6" class="infoKey">
            <p>Price</p>
            <p class="text-black font-weight-bold-600">EGP {{accommodationsDetails.price_egp}}</p>
          </b-col>
          <b-col md="6" col="6" class="infoKey">
            <p>Discounted price</p>
            <p class="text-black font-weight-bold-600"><span v-if="accommodationsDetails.discount_price_egp">
              EGP {{accommodationsDetails.discount_price_egp}}</span>
              <span v-else>N/A</span></p>
          </b-col>
        </b-row>
        <b-row class="pl-3 mb-2" v-if="accommodationsDetails.price_euro">
          <b-col md="6" col="6" class="infoKey">
            <p>Foreigner Price</p>
            <p class="text-black font-weight-bold-600">€ {{accommodationsDetails.price_euro}}</p>
          </b-col>
          <b-col md="6" col="6" class="infoKey">
            <p>Discounted Price</p>
            <p class="text-black font-weight-bold-600">
              <span v-if="accommodationsDetails.discount_price_euro">€ {{accommodationsDetails.discount_price_euro}}</span>
              <span v-else>N/A</span></p>
          </b-col>
        </b-row>
        <b-row class="pl-3 mb-2" v-if="accommodationsDetails.price_dollar">
          <b-col md="6" col="6" class="infoKey">
            <p>Foreigner Price</p>
            <p class="text-black font-weight-bold-600">$ {{accommodationsDetails.price_dollar}}</p>
          </b-col>
          <b-col md="6" col="6" class="infoKey">
            <p>Discounted Price</p>
            <p class="text-black font-weight-bold-600">
              <span v-if="accommodationsDetails.discount_price_dollar">$ {{accommodationsDetails.discount_price_dollar}}</span>
              <span v-else>N/A</span></p>
          </b-col>
        </b-row>
        <b-row class="pl-3 mb-2">
          <b-col md="12" class="infoKey">
            <p>Conditions</p>
          </b-col>
          <b-col md="12" class="infoValue">
            <p class="text-black font-weight-bold-600">{{accommodationsDetails.conditions}}</p>
          </b-col>
        </b-row>
      </b-col>
      <b-col lg="6" class="py-5" order-lg="2" order="1">
        <h5 class="mb-4 font-size-14">ACCOMMODATION PHOTOS</h5>
        <slider-thumbs :images="accommodationsDetails.images"/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  props: {
    accommodationsDetails: {
      type: Object
    }
  }
}

</script>
