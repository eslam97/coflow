<template>
    <b-row>
      <!-- Start Modals -->
      <b-modal id="delete_package" size="md" title="Delete" hide-footer no-close-on-backdrop>
        <p class="font-size-18 text-black">Are you sure you want to delete this ? </p>
        <div class="d-flex justify-content-end">
          <b-button variant="danger" @click="deletePackage">Delete</b-button>
        </div>
      </b-modal>
      <b-modal id="pricing_details" size="md" title="Pricing" hide-footer no-close-on-backdrop>
        <b-table striped responsive :fields="columnsPrincing" :items="allDetailsPrice" class="mb-0 table-borderless">
          <template v-slot:cell(pivot)="data">
            {{data.item.pivot.price}}
          </template>
        </b-table>
      </b-modal>
      <!-- End Modals -->

      <!-- Start Filter -->
      <b-container fluid class="filter">
        <div class="iq-card p-1">
          <div class="row">
            <div class="col-md-6 my-1">
              <select class="form-control"  v-model="filter.project" @change = 'fillTable'>
                <option selected disabled value="">select Project...</option>
                <option v-for="(i, key) in getUserProjects" :key="key" :value="i.id">
                  <span>{{i.en_title}}</span>
                </option>
              </select>
            </div>
           </div>
        </div>
      </b-container>
      <!-- End Filter -->

      <!-- Start Table -->
      <b-col lg="8">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title"><span @click="(type = 'package') ; fillTable()" :class="[type=='package'? 'active-select': '' , 'cursor-pointer']">Packages</span> / <span @click="(type = 'service') ; fillTable()" :class="[type=='service'? 'active-select': '' , 'cursor-pointer']">Services</span></h4>
          </template>
          <template v-slot:headerAction>
            <router-link :to="{name:'addPackage'}"><b-button variant="primary" class="mr-1">Add Package</b-button></router-link>
            <router-link :to="{name:'addServices'}"><b-button variant="primary">Add Service</b-button></router-link>
          </template>
          <template v-slot:body>
            <div v-if="loadTable" class="text-center">
             <spinner-loading text="Loadnig" />
            </div>
            <b-table v-else striped responsive :fields="columns" :items="allData" class="mb-0 table-borderless">
              <template v-slot:cell(source)="data">
                {{data.item.source.title}}
              </template>
              <template v-slot:cell(is_active)="data3">
                <div class="custom-control custom-switch custom-switch-text custom-control-inline custom-switch-color" >
                  <div class="custom-switch-inner">
                    <input type="checkbox" class="custom-control-input bg-primary" v-model="data3.item.is_active" :id="'customSwitch-11'+data3.item.id"  @change="switchStatusPackage(data3.item.id)" >
                    <label class="custom-control-label" :for="'customSwitch-11'+data3.item.id" data-on-label="on" data-off-label="off">
                    </label>
                  </div>
                </div>
              </template>
              <template v-slot:cell(pivot)="data">
                <b-button variant=" iq-bg-primary" size="sm" @click="showDetailsPricing(data.item.project)"><i class="las la-money-bill"></i></b-button>
              </template>
              <template v-slot:cell(action)="data1">
                <router-link v-if="data1.item.type == 'package'" :to="{name:'addPackage', query:{packageId :data1.item.id, edit: true}}"><b-button variant=" iq-bg-success mr-0 mb-0" size="sm"><i class="las la-eye"></i></b-button></router-link>
                <router-link v-else :to="{name:'addServices', query:{serviceId :data1.item.id, edit: true}}"><b-button variant=" iq-bg-success mr-0 mb-0" size="sm"><i class="las la-eye"></i></b-button></router-link>
                <b-button variant=" iq-bg-danger" size="sm" @click="setDeletePackageId(data1.item.id)"><i class="ri-delete-bin-line m-0"  ></i></b-button>

              </template>
            </b-table>
            <b-pagination v-model="pagination.currentPage"
                          class="mt-3"
                          :total-rows="pagination.total"
                          align="right"
                          :per-page="pagination.per_page"
                          aria-controls="my-table"
                          @input="fillTable"
            ></b-pagination>
          </template>
        </iq-card>
      </b-col>
      <!-- End Table -->

      <!-- Start Reports -->
      <b-col lg="4">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">{{ $t('dashboard2.summary')}}</h4>
          </template>
          <template v-slot:headerAction>
            <b-dropdown id="dropdownMenuButton5" right variant="none" data-toggle="dropdown">
              <template v-slot:button-content>
                <span class="text-primary"><i class="ri-more-2-fill"></i></span>
              </template>
              <b-dropdown-item><i class="ri-eye-fill mr-2"></i>{{ $t('dropdown.view') }}</b-dropdown-item>
              <b-dropdown-item><i class="ri-delete-bin-6-fill mr-2"></i>{{ $t('dropdown.delete') }}</b-dropdown-item>
              <b-dropdown-item><i class="ri-pencil-fill mr-2"></i>{{ $t('dropdown.edit') }}</b-dropdown-item>
              <b-dropdown-item><i class="ri-printer-fill mr-2"></i>{{ $t('dropdown.print') }}</b-dropdown-item>
              <b-dropdown-item><i class="ri-file-download-fill mr-2"></i>{{ $t('dropdown.download') }}</b-dropdown-item>
            </b-dropdown>
          </template>
          <template v-slot:body>
            <p class="mb-0">{{ $t('dashboard2.totalLikeComment')}}</p>
            <div class="m-0 p-0 d-flex flex-wrap align-items-center justify-content-between">
              <div class="col-md-6">
                <div class="d-flex align-items-center  mt-4">
                  <div class="iq-scale-border mr-3 like-block"></div>
                  <div class="iq-scale-content">
                    <h6>2.864</h6>
                    <p class="mb-0">Likes</p>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="d-flex align-items-center  mt-4">
                  <div class="iq-scale-border mr-3 comment-block"></div>
                  <div class="iq-scale-content">
                    <h6>624</h6>
                    <p class="mb-0">Comments</p>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="d-flex align-items-center mt-4">
                  <div class="iq-scale-border mr-3 share-block"></div>
                  <div class="iq-scale-content">
                    <h6>1.75</h6>
                    <p class="mb-0">Share</p>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="d-flex align-items-center mt-4">
                  <div class="iq-scale-border mr-3 repost-block"></div>
                  <div class="iq-scale-content">
                    <h6>345</h6>
                    <p class="mb-0">Repost</p>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="d-flex align-items-center mt-4">
                  <div class="iq-scale-border mr-3 view-block"></div>
                  <div class="iq-scale-content">
                    <h6>845</h6>
                    <p class="mb-0">Views</p>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="d-flex align-items-center mt-4">
                  <div class="iq-scale-border mr-3 post-block"></div>
                  <div class="iq-scale-content">
                    <h6>1200</h6>
                    <p class="mb-0">Posts</p>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </iq-card>
      </b-col>
      <!-- Start Reports -->
    </b-row>
</template>
<script>
import { core } from '../../../config/pluginInit'
import { mapGetters } from 'vuex'
import packageService from '../services/package'
export default {
  name: 'package',
  data () {
    return {
      // allData
      allData: [],

      // filter
      filter: {
        project: ''
      },

      // pagination
      pagination: {
        currentPage: 1,
        per_page: 10,
        total: 6
      },

      // Loading
      loadingOpenAdd: false,
      loadTable: true,

      // SetDeleteId
      deletePackageId: '',

      type: 'package',

      // pricing
      allDetailsPrice: [],
      columnsPrincing: [
        { label: 'ID', key: 'id', class: 'left' },
        { label: 'Title', key: 'en_title', class: 'left' },
        { label: 'Price', key: 'pivot', class: 'left' }
      ]
    }
  },
  computed: {
    ...mapGetters(['getUserProjects']),
    columns () {
      const fields = [
        { label: 'Name', key: 'title', class: 'left' },
        { label: 'Period', key: 'period', class: 'left' },
        { label: 'Price', key: 'pivot', class: 'left' },
        { label: 'Active', key: 'is_active', class: 'left' },
        { label: 'Active Member', key: 'active_members', class: 'left' }]
      if (this.hasPer('membership.package.show')) {
        fields.push({ label: 'Actions', key: 'action', class: 'left' })
      }
      return fields
    }
  },
  methods: {
    // Get All Data
    fillTable () {
      this.loadTable = true
      packageService.getAllPackageOrService({
        type: this.type,
        pageNumber: this.pagination.currentPage,
        projectId: this.filter.project
      }).then(res => {
        this.allData = res.data.data
        this.pagination.currentPage = res.data.meta.current_page
        this.pagination.per_page = res.data.meta.per_page
        this.pagination.total = res.data.meta.total
        this.loadTable = false
      })
    },

    // Show Price Package In all Project
    showDetailsPricing (data) {
      this.allDetailsPrice = data
      this.$bvModal.show('pricing_details')
    },

    // Change Status
    switchStatusPackage (id) {
      packageService.switchStatusPackage(id).then((res) => {
        core.showSnackbar('success', res.data.message)
      }).catch(err => {
        core.showSnackbar('error', err.response.data.error)
      })
    },

    // Delete Package
    setDeletePackageId (id) {
      this.deletePackageId = id
      this.$bvModal.show('delete_package')
    },
    deletePackage () {
      packageService.deletePackage(this.deletePackageId).then(res => {
        core.showSnackbar('success', res.data.message)
        this.fillTable()
        this.$bvModal.hide('delete_package')
      }).catch(err => {
        core.showSnackbar('error', err.response.data.error)
      })
    }
  },
  mounted () {
    core.index()
  },
  created () {
    this.fillTable()
  }
}
</script>
<style scoped>
.active-select{
  border-bottom: 1px solid var(--iq-primary);
  color: var(--iq-primary);
}
</style>
