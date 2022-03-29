<template>
  <div>
    <b-row>
      <b-col lg="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">Target Structure</h4>
          </template>
          <template v-slot:headerAction>
            <b-button variant="primary">
              Edit Structure
            </b-button>
          </template>
          <template v-slot:body>
            <div class="container">
              <div class="structureRow">
                <b-row>
                  <b-col lg="4">
                    <p class="d-flex align-items-center p-0 m-0"><span class="bg-danger colorStructure"></span> <span class="ml-2 font-weight-bold text-black">Good</span></p>
                  </b-col>
                  <b-col lg="4">
                    <span class="ml-2 font-weight-bold text-black">Amount</span> <span class="font-weight-bold text-primary d-inline-block mx-2">90 %</span> <span class="font-weight-bold text-black">to</span> <span class="font-weight-bold text-primary d-inline-block mx-2">100 %</span>
                  </b-col>
                  <b-col lg="4">
                    <span class="ml-2 font-weight-bold text-black">Commission</span> <span class="font-weight-bold text-primary">2 %</span>
                  </b-col>
                </b-row>
              </div>
              <div class="structureRow">
                <b-row>
                  <b-col lg="4">
                    <p class="d-flex align-items-center p-0 m-0"><span class="bg-primary colorStructure"></span> <span class="ml-2 font-weight-bold text-black">Good</span></p>
                  </b-col>
                  <b-col lg="4">
                    <span class="ml-2 font-weight-bold text-black">Amount</span> <span class="font-weight-bold text-primary d-inline-block mx-2">90 %</span> <span class="font-weight-bold text-black">to</span> <span class="font-weight-bold text-primary d-inline-block mx-2">100 %</span>
                  </b-col>
                  <b-col lg="4">
                    <span class="ml-2 font-weight-bold text-black">Commission</span> <span class="font-weight-bold text-primary">2 %</span>
                  </b-col>
                </b-row>
              </div>
              <div class="structureRow">
                <b-row>
                  <b-col lg="4">
                    <p class="d-flex align-items-center p-0 m-0"><span class="bg-success colorStructure"></span> <span class="ml-2 font-weight-bold text-black">Good</span></p>
                  </b-col>
                  <b-col lg="4">
                    <span class="ml-2 font-weight-bold text-black">Amount</span> <span class="font-weight-bold text-primary d-inline-block mx-2">90 %</span> <span class="font-weight-bold text-black">to</span> <span class="font-weight-bold text-primary d-inline-block mx-2">100 %</span>
                  </b-col>
                  <b-col lg="4">
                    <span class="ml-2 font-weight-bold text-black">Commission</span> <span class="font-weight-bold text-primary">2 %</span>
                  </b-col>
                </b-row>
              </div>
            </div>
          </template>
        </iq-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { core } from '../../config/pluginInit'
export default {
  name: 'targetStructure',
  data () {
    return {}
  },
  computed: {
  },
  methods: {
  },
  components: {
  },
  mounted () {
    core.index()
  },
  created () {
  }
}
</script>
<style scoped>
.structureRow:first-of-type{
  margin-top: 0;
}
.structureRow{
  background: var(--iq-bg-light-color);
  margin-top: 10px;
  padding: 10px 10px;
  border-radius: 4px;
}
.colorStructure{
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: inline-block;
}
/*.structureRow::before{
  content: "";
  position: absolute;
  width: 20px;
  height: 1px;
  background: black;
  top:50%;
  left: -20px;
}*/
</style>
