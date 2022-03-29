<template>
  <div>
    <div class="filter">
      <div class="iq-card p-1">
        <div class="row">
          <div class="col-md-3 my-1">
            <select class="form-control" v-model="filter.status"  @change="filterTable">
              <option selected disabled value="">select Status...</option>
              <option value="">All</option>
              <option value="approve">Approved</option>
              <option value="notapprove">Not Approved</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <b-row>
    <b-col lg='12'>
      <iq-card>
        <template v-slot:headerTitle>
          <h4 class="card-title">All Discounts</h4>
        </template>
        <template v-slot:body>
          <div v-if="loadTable" class="text-center">
            <b-spinner small type="grow"></b-spinner>
            Loading...
          </div>
          <div v-else>
            <div v-if="allDiscountTableData.length > 0">
              <b-table striped responsive :fields="columns" :items="allDiscountTableData" class="mb-0 table-borderless">
                <template v-slot:cell(member)="data">
                  <div class="custom-control custom-switch custom-switch-text custom-control-inline custom-switch-color" >
                    {{data.item.member.name}}
                  </div>
                </template>
                <template v-slot:cell(user)="data">
                  <div class="custom-control custom-switch custom-switch-text custom-control-inline custom-switch-color" >
                    {{data.item.user.name}}
                  </div>
                </template>
                <template v-slot:cell(package)="data">
                  <div class="custom-control custom-switch custom-switch-text custom-control-inline custom-switch-color" >
                    {{data.item.package ? data.item.package.package_title : '-----------'}}
                  </div>
                </template>
                <template v-slot:cell(project)="data">
                  <div class="custom-control custom-switch custom-switch-text custom-control-inline custom-switch-color" >
                    <span :style={color:data.item.package.project.color}>{{data.item.package.project.en_title}}</span>
                  </div>
                </template>
                <template v-slot:cell(actions)="data">
                  <span v-if="data.item.approve"> {{data.item.approve.name}} </span>
                  <b-button v-else variant=" iq-bg-success mr-1 mb-1" size="sm" @click="approveDiscount(data.item.id)"><i class="las la-check"></i></b-button>
                </template>
              </b-table>
              <b-pagination v-model="currentPage"
                            class="mt-3"
                            :total-rows="total"
                            align="right"
                            :per-page="per_page"
                            aria-controls="my-table"
                            @input="changeContentDesk"
              ></b-pagination>
            </div>
            <div v-else>
              <div class="text-center">
                <img :src="notFoundImage"  class="avatar-200"/>
                <p class="font-size-22">Oops!... no results found</p>
              </div>
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
  name: 'desk',
  mounted () {
    core.index()
  },
  data () {
    return {
      currentPage: 1,
      per_page: 10,
      total: 6,
      notFoundImage: require('../../assets/images/error/search.png'),
      loadTable: true,
      allDiscountTableData: [],
      columns: [
        { label: 'Member Name', key: 'member', class: 'text-left' },
        { label: 'By', key: 'user', class: 'text-left' },
        { label: 'Package Name', key: 'package', class: 'text-left' },
        { label: 'Cost', key: 'cost', class: 'text-left' },
        { label: 'Project', key: 'project', class: 'text-left' },
        { label: 'Ratio', key: 'ratio', class: 'text-left' },
        { label: 'Discount', key: 'discount', class: 'text-left' },
        { label: 'Approve', key: 'actions', class: 'text-left' }
      ],
      filter: { status: '' }
    }
  },
  created () {
    this.fillTable()
  },
  methods: {
    fillTable () {
      this.loadTable = true
      this.$store.dispatch('getAllDiscounts', { pageNumber: this.currentPage, status: this.filter.status, objectID: this.$route.query.key }).then(response => {
        this.allDiscountTableData = response.data.data
        this.currentPage = response.data.meta.current_page
        this.per_page = response.data.meta.per_page
        this.total = response.data.meta.total
        this.loadTable = false
      }).catch(() => {
        this.loadTable = false
      })
    },
    filterTable () {
      this.fillTable()
    },
    changeContentDesk () {
      this.fillTable(this.title)
    },
    approveDiscount (memberId) {
      this.$store.dispatch('approveDiscount', memberId).then(response => {
        core.showSnackbar('success', response.data.message)
        this.fillTable()
      }).catch(err => {
        if (err.response.data.errors) {
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            this.$refs[key].setErrors(value)
          }
        } else if (err.response.data.error) {
          core.showSnackbar('error', err.response.data.error)
        }
      })
    }
  },
  watch: {
    $route () {
      this.fillTable()
    }
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
</style>
