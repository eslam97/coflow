<template>
  <div class="pl-3 pr-3">
      <b-row>
          <b-col lg="6" class="border-right py-5"  order-lg="1" order="2">
              <h5 class="mb-4 font-size-14 px-2">TICKET INFORMATION</h5>
              <b-row class="pl-3 mb-2">
                  <b-col md="12" class="infoKey">
                      <p>Details</p>
                  </b-col>
                  <b-col md="12" class="infoValue">
                      <p class="text-black font-weight-bold-600">{{ticketDetails.details}}</p>
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
                      <p class="text-black font-weight-bold-600">EGP {{ticketDetails.price_egp}}</p>
                  </b-col>
                  <b-col md="8" class="infoValue">
                      <p class="text-black font-weight-bold-600"><span v-if="ticketDetails.discount_price_egp">EGP {{ticketDetails.discount_price_egp}}</span>
                          <span v-else>N/A</span></p>
                  </b-col>
              </b-row>
              <b-row class="pl-3 mb-2" v-if="ticketDetails.price_euro">
                  <b-col md="6" class="infoKey">
                      <p>Foreigner Price</p>
                      <p class="text-black font-weight-bold-400">€ {{ticketDetails.price_euro}}</p>
                  </b-col>
                  <b-col md="6" class="infoKey">
                      <p>Discounted Price</p>
                      <p class="text-black font-weight-bold-400"><span v-if="ticketDetails.discount_price_euro">€ {{ticketDetails.discount_price_euro}}</span>
                          <span v-else>N/A</span></p>
                  </b-col>
              </b-row>
              <b-row class="pl-3 mb-2" v-if="ticketDetails.price_dollar">
                  <b-col md="6" class="infoKey">
                      <p>Foreigner Price</p>
                      <p class="text-black font-weight-bold-600">$ {{ticketDetails.price_dollar}}</p>
                  </b-col>
                  <b-col md="6" class="infoKey">
                      <p>Discounted Price</p>
                      <p class="text-black font-weight-bold-600"><span v-if="ticketDetails.discount_price_dollar">$ {{ticketDetails.discount_price_dollar}}</span>
                          <span v-else>N/A</span></p>
                  </b-col>
              </b-row>
              <b-row class="pl-3 mb-2" v-if="ticketDetails.duration">
                  <b-col md="12" class="infoKey">
                      <p>Duration</p>
                  </b-col>
                  <b-col md="12" class="infoValue">
                      <p class="text-black font-weight-bold-600">{{ticketDetails.duration}} {{ticketDetails.duration_list.name}}</p>
                  </b-col>
              </b-row>
              <b-row class="pl-3 mb-2">
                  <b-col md="12" class="infoKey">
                      <p>Conditions</p>
                  </b-col>
                  <b-col md="12" class="infoValue">
                      <p class="text-black font-weight-bold-600">{{ticketDetails.conditions}}</p>
                  </b-col>
              </b-row>
          </b-col>
          <b-col lg="6" class="py-5" order-lg="2" order="1">
              <h5 class="mb-4 font-size-14">TICKET PHOTO</h5>
              <slider-thumbs :images="ticketDetails.images"/>
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
