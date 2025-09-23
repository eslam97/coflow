<template>
  <div class="pl-3 pr-3">
      <b-row>
          <b-col lg="6" class="border-right py-5">
              <h5 class="mb-4 font-size-14 px-2">TICKET INFORMATION</h5>

                 <b-row class="pl-3 mb-2">
                  <b-col md="12" class="infoKey">
                      <p>Price</p>
                  </b-col>
                  <b-col md="12" class="infoValue">
                      <p class="text-black font-weight-bold-600" v-if="ticketDetails.discount_price">
                        <span>{{ticketDetails.discount_price}}{{ticketDetails.currency }}</span>
                        <span class="text-decoration-line-through ml-2 infoKey">{{ticketDetails.price}}{{ticketDetails.currency }}</span>
                    </p>
                      <p class="text-black font-weight-bold-600" v-else>{{ ticketDetails.price }}</p>

                    </b-col>
              </b-row>

              <b-row class="pl-3 mb-2">
                  <b-col md="12" class="infoKey">
                      <p>Validity Days</p>
                  </b-col>
                  <b-col md="12" class="infoValue">
                      <p class="text-black font-weight-bold-600" v-if="!ticketDetails.unlimited">{{ticketDetails.validity_days}}</p>
                      <p class="text-black font-weight-bold-600" v-else>Unlimited</p>

                    </b-col>
              </b-row>

              <b-row class="pl-3 mb-2">
                  <b-col md="12" class="infoKey">
                      <p>Requirements</p>
                  </b-col>
                  <b-col md="12" class="infoValue">
                      <p class="text-black font-weight-bold-600">{{ticketDetails.requirements}}</p>
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
          <b-col lg="6" class="py-5">
            <div class="mb-5">
                <h5 class="mb-4 font-size-14">All Services</h5>
                <div v-for="value in ticketDetails.services" :key="value.id" class="mb-3 d-flex align-items-center">
                    <b-img class="avatar-40 mr-2" style="object-fit: contain; background: #f0f0f0;" rounded="circle" fluid :src="value.image" :alt="value.name" />
                    <p class="m-0">{{ value.name }}</p>
                </div>
            </div>

             <div>
                <h5 class="mb-4 font-size-14">Addons</h5>
                <div v-for="value in ticketDetails.addons" :key="value.id" class="mb-3 d-flex align-items-center">
                    <p class="m-0 mr-2">{{ value.name }}</p>
                    <p class="m-0">{{ value.price }}{{ ticketDetails.currency }}</p>
                </div>
            </div>
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
