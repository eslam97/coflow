<template>
  <b-container fluid>
    <b-row>
          <b-col lg="12">
            <iq-card>
              <template v-slot:body>
                <div class="new-user-info">
                  <b-row>
                    <b-form-group class="col-md-12" label="User Name :" label-for="user">
                      <h4 class="text-black">{{targetInfo.name}}</h4>
                    </b-form-group>
                    <b-form-group class="col-md-12" label="Compare Target:"  label-for="amount" >
                      <b-row class="selectedBranches">
                        <b-col lg="6">
                          <div class="bg-white mb-2 p-2 rounded details_selected_branch">
                            <h2 class="text-white rounded-circle text-center font-size-18 mb-2 bg-primary ">{{ getProjectTargetStructure[0].en_title }}</h2>
                            <section class="border-bottom py-1" v-for="(i, key) in getProjectTargetStructure" :key="key" :class="key % 2 != 0?'bg-light': ''">
                              <div class="d-flex justify-content-between px-2  mx-auto mb-2 text-black font-size-16">
                                <p class="m-0">1st Target</p> <span class="d-inline-block px-2 rounded-circle w-25 text-center" style="background: #ff5f359e !important">{{i.pivot.target}}</span>
                              </div>
                              <div class="d-flex justify-content-between px-2 mx-auto mb-2 text-black font-size-16">
                                <p class="m-0">Commission %</p> <span class="d-inline-block px-2 rounded-circle w-25 text-center" style="background: #ff5f359e !important">{{i.pivot.commission}}</span>
                              </div>
                              <div class="d-flex justify-content-between px-2 mx-auto mb-2 text-black font-size-16">
                                <p class="m-0">Comm. Amount</p> <span class="d-inline-block px-2 rounded-circle w-25 text-center" style="background: #ff5f359e !important">{{(i.pivot.target * i.pivot.commission) / 100}}</span>
                              </div>
                            </section>
                          </div>
                        </b-col>
                        <b-col lg="6" >
                          <div class="bg-white mb-2 p-2 rounded details_selected_branch">
                            <h2 class="text-white rounded-circle text-center font-size-18 mb-2 bg-primary ">{{ getProjectTargetStructure[0].en_title }}</h2>
                            <section class="py-1">
                              <div class="d-flex justify-content-between px-2  mx-auto mb-2 text-black font-size-16">
                                <p class="m-0">Achieved Amount</p> <span class="d-inline-block px-2 rounded-circle w-50 text-center" style="background: #ff5f359e !important">{{ targetInfo.commission_on.sales_details.sales_achieved_amount }}</span>
                              </div>
<!--                              <div class="d-flex justify-content-between px-2 mx-auto mb-2 text-black font-size-16">
                                <p class="m-0">Classification</p> <span class="d-inline-block px-2 rounded-circle w-50  text-center" style="background: #ff5f359e !important">{{ targetInfo.commission_on.sales_details.classification }}</span>
                              </div>-->
                              <div class="d-flex justify-content-between px-2 mx-auto mb-2 text-black font-size-16">
                                <p class="m-0">Appreciation</p> <span class="d-inline-block px-2 rounded-circle w-50  text-center" style="background: #ff5f359e !important">{{ targetInfo.commission_on.sales_details.appreciation }}</span>
                              </div>
                              <div class="d-flex justify-content-between px-2 mx-auto mb-2 text-black font-size-16">
                                <p class="m-0">Commission</p> <span class="d-inline-block px-2 rounded-circle w-50  text-center" style="background: #ff5f359e !important">{{ targetInfo.commission_on.sales_details.commission }}</span>
                              </div>
                              <div class="d-flex justify-content-between px-2 mx-auto mb-2 text-black font-size-16">
                                <p class="m-0">Comm. Amount</p> <span class="d-inline-block px-2 rounded-circle w-50  text-center" style="background: #ff5f359e !important">{{ targetInfo.commission_on.sales_details.financial_dues }}</span>
                              </div>
                            </section>
                          </div>
                        </b-col>
                      </b-row>
                    </b-form-group>
                  </b-row>
                </div>
              </template>
            </iq-card>
          </b-col>
        </b-row>
  </b-container>
</template>
<script>
import { core } from '../../config/pluginInit'
export default {
  name: 'showUserTargetDetails',
  props: {
    targetInfo: {
      required: true,
      type: Object
    },
    projectId: {
      required: true
    }
  },
  computed: {
    getProjectTargetStructure () {
      var arr = []
      this.targetInfo.targets.map(obj => {
        if (this.projectId === obj.id) {
          arr.push(obj)
        }
      })
      return arr
    }
  },
  mounted () {
    core.index()
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
<style>
.selectedBranches{
  width: 100%;
  padding: 5px 0 !important;
  background: var(--iq-bg-light-color);
  border: 1px solid #d7dbda;
  font-size: 14px;
  color: var(--iq-secondary);
  border-radius: 10px;
}
.selectedBranches input{
  text-align: center;
}
</style>
