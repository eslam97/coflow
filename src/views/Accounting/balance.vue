<template>
  <div>
    <b-row>
      <b-col lg='12'>
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">Report Widget</h4>
          </template>
          <template v-slot:body>
            <div v-if="loadWidget" class="text-center">
              <b-spinner small type="grow"></b-spinner>
              Loading...
            </div>
            <b-row v-else>
              <b-col lg="4"  class="mb-2" v-for="(data, key, i) in allWidget" :key="key">
                <div  :class="[`color_${i}`,'text-white p-2 iq-border-radius-5', data < 0 ? 'bg-danger': '']">
                  <h5 class="text-white">{{key | textFormat}}</h5>
                  <span v-if="data">{{data}}</span>
                  <span v-else>0.00</span>
                </div>
              </b-col>
            </b-row>
          </template>
        </iq-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { core } from '../../config/pluginInit'
import accountantServices from '../../services/AccountsCategories/accountsCategories'
export default {
  name: 'accountingBalance',
  mounted () {
    core.index()
  },
  data () {
    return {
      allWidget: '',
      loadWidget: false
    }
  },
  created () {
    this.getAllWidet()
  },
  filters: {
    textFormat (value) {
      return value.replaceAll('_', ' ')
    }
  },
  methods: {
    getAllWidet () {
      this.loadWidget = true
      accountantServices.getReportsFinancialWidget().then(res => {
        // console.log('res', res)
        this.allWidget = res.data.data
        this.loadWidget = false
      })
    }
  },
  watch: {
  }
}
</script>
<style>
.nav-link.router-link-active{
  border-bottom: 2px solid var(--iq-primary) !important;
  color: var(--iq-primary) !important;
}
.colorSpan{
  width: 20px;
  height: 20px;
}
[dir=ltr][mode=light] .nav-tabs {
  background: #fff !important;
  border-radius: 10px !important;
}
.color_0 {
background: green;
}
.color_1 {
  background: #00d0ff;
}
.color_2 {
background: green;
}
.color_3 {
background: #00d0ff;
}
.color_4 {
  background: green;
}
.color_5 {
  background: #00d0ff;
}
</style>
