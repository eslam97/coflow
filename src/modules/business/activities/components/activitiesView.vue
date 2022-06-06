<template>
  <div class="pl-3 pr-3">
    <v-row class="flex-nowrap">
      <v-col md="6">
        <!--          <v-col md="12">-->
        <!--            <p>Activities PHOTOS</p>-->
        <!--          </v-col>-->
        <slider-thumbs :images="activitiesDetails.images"/>
      </v-col>
      <v-col md="6">
        <v-row>
          <v-col md="12">
            <p>ACTIVITY INFORMATION</p>
          </v-col>
        </v-row>
        <b-row class="pl-3 mb-2">
          <b-col md="12" class="infoKey">
            <p>Description</p>
          </b-col>
          <b-col md="12" class="infoValue">
            <p>{{activitiesDetails.description}}</p>
          </b-col>
        </b-row>
        <b-row class="pl-3 mb-2">
          <b-col md="3" class="infoKey">
            <p>Price EGP</p>
          </b-col>
          <b-col md="3" class="infoKey">
            <p>Discounted price</p>
          </b-col>
          <b-col md="3" class="infoKey">
            <p>Price EUR</p>
          </b-col>
          <b-col md="3" class="infoKey">
            <p>Discounted price</p>
          </b-col>
          <b-col md="3" class="infoValue">
            <p>EGP {{activitiesDetails.price_egp}}</p>
          </b-col>
          <b-col md="3" class="infoValue">
            <p><span v-if="activitiesDetails.discount_price_egp">EGP {{activitiesDetails.discount_price_egp}}</span>
              <span v-else>N/A</span></p>
          </b-col>
          <b-col md="3" class="infoValue">
            <p>EUR {{activitiesDetails.price_euro}}</p>
          </b-col>
          <b-col md="3" class="infoValue">
            <p><span v-if="activitiesDetails.discount_price_euro">EUR {{activitiesDetails.discount_price_euro}}</span>
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
      </v-col>
    </v-row>
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
