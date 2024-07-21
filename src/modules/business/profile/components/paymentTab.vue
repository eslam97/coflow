<template>
  <b-container fluid>
    <main-modal id="historyModal" size="lg">
      <template v-slot:header class="p-2">
        <h4 class="font-weight-bolder">
          <span class="text-warning">Dashboard Subscription: </span> History
        </h4>
      </template>
      <template v-slot:body>
        <history-details />
      </template>
    </main-modal>
    <main-modal id="transfersModal" size="lg">
      <template v-slot:header class="p-2">
        <h4 class="font-weight-bolder">
          <span class="text-warning">Customer Purchases: </span> Transfers
        </h4>
      </template>
      <template v-slot:body>
        <transfers-details />
      </template>
    </main-modal>
    <b-row class="mt-4">
      <b-col md="12"
        ><b-card class="mb-5 d-flex flex-column gap-20">
          <b-card-header
            class="mb-4 p-0 pb-3 p-8 d-flex justify-content-between align-items-center"
          >
            <p
              class="font-size-12 m-0 d-flex justify-content-center align-items-center"
            >
              <span class="text-dark font-weight-bold font-size-18 mr-3">
                Dashboard Subscription
              </span>
              Use this section to manage your subscription to our premium
              dashboard.
            </p>
            <b-button variant="outline-secondary" class="secondary_btn" @click="openHistory">
              History
            </b-button>
          </b-card-header>

          <b-card-body class="p-0">
            <div>
              <!-- <h3 class="text-dark font-weight-bold font-size-16">
                Basic Dashboard <span class="status free">Free</span>
              </h3> -->

              <!-- <h3 class="text-dark font-weight-bold font-size-16">
                Trail Dashboard <span class="status trial">Trial</span>
              </h3> -->

              <h3 class="text-dark font-weight-bold font-size-16">
                Premium Dashboard <span class="status pending">Pending</span>
              </h3>

              <!-- <p class="mt-1">
                Enjoy a month of premium features, with our free 30 day trial.
              </p> -->

              <!-- <p class="mt-1">
                Your premium features are active, trial ends on: <strong class="text-dark">1-3-2025</strong>.
              </p> -->

              <p class="mt-1">
                Subscription payment required, to keep premium features active
              </p>

              <!-- <b-button
                class="btn add_button text-white btn-warning shadow-drop"
              >
                Upgrade to Premium Dashboard
              </b-button> -->

              <b-button
                class="btn add_button text-white btn-warning shadow-drop"
              >
                Pay Now
              </b-button>
            </div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>

    <b-row class="mt-4 mb-5">
      <b-col md="12"
        ><b-card class="mb-5 d-flex flex-column gap-20">
          <b-card-header
            class="mb-4 p-0 pb-3 p-8 d-flex justify-content-between align-items-center"
          >
            <p
              class="font-size-12 m-0 d-flex justify-content-center align-items-center"
            >
              <span class="text-dark font-weight-bold font-size-18 mr-3">
                Customer Purchases
              </span>
              Use this section to manage your preferred purchase method for
              customers In-App.
            </p>
            <b-button variant="outline-secondary" class="secondary_btn" @click="openTransfers">
              Transfers
            </b-button>
          </b-card-header>

          <b-card-body class="p-0 d-flex flex-column gap-20">
            <validationObserver v-slot="{ handleSubmit }">
              <b-form @submit.prevent="handleSubmit()">
                <b-row>
                  <b-col md="4">
                    <main-select
                      labelTitle="Method"
                      placeholder="Choose"
                      :options="[
                        'Contact Link',
                        'Direct Purchase',
                        'Full Online Payment',
                        'Deposit Online Payment'
                      ]"
                    ></main-select>
                  </b-col>
                </b-row>

                <b-row>
                  <b-col md="3">
                    <b-form-group label="Deposit Percentage">
                      <b-input-group append="%">
                        <b-form-input placeholder="Enter Number" />
                      </b-input-group>
                    </b-form-group>

                    <button
                      class="btn radio-btn radio-btn-orange save-changes-btn mt-3"
                    >
                      Save changes
                    </button>
                  </b-col>
                </b-row>
              </b-form>
            </validationObserver>

            <b-row class="mt-3">
              <b-col md="12">
                <label class="text-dark font-weight-medium font-size-14"
                  >Receivable Account:</label
                >
                <table
                  id="bank-info"
                  style="border-spacing: 0; border-collapse: collapse"
                >
                  <tr>
                    <th>Bank Name</th>
                    <td>Bank</td>
                  </tr>
                  <tr>
                    <th>Branch Address</th>
                    <td>Address</td>
                  </tr>
                  <tr>
                    <th>Bank Code</th>
                    <td>465465123456</td>
                  </tr>
                  <tr>
                    <th>Account Number/IBAN</th>
                    <td>456124568</td>
                  </tr>
                </table>
              </b-col>
            </b-row>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import historyDetails from './historyDetails.vue'
import transfersDetails from './transfersDetails.vue'

export default {
  components: {
    historyDetails,
    transfersDetails
  },
  data () {
    return {
    }
  },
  methods: {
    openHistory () {
      this.$bvModal.show('historyModal')
    },
    openTransfers () {
      this.$bvModal.show('transfersModal')
    }
  }
}
</script>

<style>
.heading-title {
  font-size: 28px !important;
  font-weight: bold !important;
  color: rgba(24, 25, 53, 1) !important;
}

.heading-title > span {
  color: rgba(40, 199, 180, 1);
}

.back-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  border: 1px solid rgba(160, 165, 188, 1);
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15) !important;
}

.shadow-drop {
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15);
}

.secondary_btn {
  border: 1px solid rgba(116, 121, 140, 1);
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15);
  color: rgba(116, 121, 140, 1);
  font-weight: 500 !important;
  font-size: 16px !important;
  border-radius: 4px !important;
  padding: 0 12px;
}

.font-size-16 {
  font-size: 16px;
}

.status {
  border-radius: 16px;
  padding: 4px 12px;
  font-size: 14px;
  font-weight: 500;
}

.free {
  background-color: rgba(242, 242, 249, 1);
  color: rgba(60, 71, 133, 1);
}

.trial {
  background-color: rgba(239, 248, 255, 1);
  color: rgba(23, 92, 211, 1);
}

.pending {
  background-color: rgba(255, 246, 237, 1);
  color: rgba(235, 141, 1, 1);
}

table#bank-info {
  width: 100%;
  border-collapse: collapse !important;
  border-spacing: 0 !important;
}

#bank-info th,
#bank-info td {
  padding: 8px;
  border-left: 1px solid #dee2e6;
  text-align: left;
}

#bank-info td {
  width: 100%;
  border-right: 1px solid #dee2e6;
}

#bank-info > tr:first-child,
#bank-info td:first-child {
  border-top: 1px solid #dee2e6;
}

#bank-info > tr:last-child th,
#bank-info > tr:last-child td {
  border-bottom: 1px solid #dee2e6;
}

#bank-info th {
  font-weight: bold;
  color: rgba(63, 65, 77, 1);
}
</style>
