<template>
  <div class="pl-3 pr-3">
    <p>TICKET INFORMATION</p>
    <b-row class="pl-3 mb-2">
      <b-col md="12" class="infoKey">
        <p>Details</p>
      </b-col>
      <b-col md="12" class="infoValue">
        <p>{{ticketDetails.details}}</p>
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
        <p>EGP {{ticketDetails.price_egp}}</p>
      </b-col>
      <b-col md="8" class="infoValue">
        <p><span v-if="ticketDetails.discount_price_egp">EGP {{ticketDetails.discount_price_egp}}</span>
        <span v-else>N/A</span></p>
      </b-col>
    </b-row>
    <b-row class="pl-3 mb-2" v-if="ticketDetails.price_euro">
      <b-col md="6" class="infoKey">
        <p>Foreigner Price</p>
        <p class="text-black font-weight-bold">€ {{ticketDetails.price_euro}}</p>
      </b-col>
      <b-col md="6" class="infoKey">
        <p>Discounted Price</p>
        <p class="text-black font-weight-bold"><span v-if="ticketDetails.discount_price_euro">€ {{ticketDetails.discount_price_euro}}</span>
          <span v-else>N/A</span></p>
      </b-col>
    </b-row>
    <b-row class="pl-3 mb-2" v-if="ticketDetails.price_dollar">
      <b-col md="6" class="infoKey">
        <p>Foreigner Price</p>
        <p class="text-black font-weight-bold">$ {{ticketDetails.price_dollar}}</p>
      </b-col>
      <b-col md="6" class="infoKey">
        <p>Discounted Price</p>
        <p class="text-black font-weight-bold"><span v-if="ticketDetails.discount_price_dollar">$ {{ticketDetails.discount_price_dollar}}</span>
          <span v-else>N/A</span></p>
      </b-col>
    </b-row>
    <b-row class="pl-3 mb-2">
      <b-col md="12" class="infoKey">
        <p>Conditions</p>
      </b-col>
      <b-col md="12" class="infoValue">
        <p class="font-size-14 font-weight-bold">{{ticketDetails.conditions}}</p>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  props: {
    ticketDetails: {
      type: Object
    }
  }
}

</script>
<style></style>
