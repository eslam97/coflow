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
    <b-row class="pl-3 mb-2">
      <b-col md="12" class="infoKey">
        <p>Conditions</p>
      </b-col>
      <b-col md="12" class="infoValue">
        <p>{{ticketDetails.conditions}}</p>
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
