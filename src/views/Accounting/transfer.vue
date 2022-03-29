<template>
  <div>
    <b-modal id="comment" size="md" title="Comment" hide-footer no-close-on-backdrop>
      <p class="font-size-18 text-black">{{ message }}</p>
    </b-modal>
    <div fluid class="filter">
      <div class="iq-card p-1">
        <div class="row">
          <div class="col-md-3 my-1" v-if="!inDisk">
            <select class="form-control" v-model="filter.to" @change="filterTable">
              <option selected disabled value="">To Project...</option>
              <option value="administrator">Administrator</option>
              <option v-for="(i, key) in getUserProjects" :key="key" :value="i.id">
                <span>{{i.en_title}}</span>
              </option>
            </select>
          </div>
          <div class="col-md-3 my-1">
            <select class="form-control" v-model="filter.from" @change="filterTable">
              <option selected disabled value="">From Project...</option>
              <option value="administrator">Administrator</option>
              <option v-for="(i, key) in getUserProjects" :key="key" :value="i.id">
                <span>{{i.en_title}}</span>
              </option>
            </select>
          </div>
          <div class="col-md-3 my-1">
            <select class="form-control" v-model="filter.status" @change="filterTable">
              <option selected disabled value="">select Status...</option>
              <option value="approved">approved</option>
              <option value="rejected">rejected</option>
              <option value="pending">pending</option>
            </select>
          </div>
          <div class="col-md-1 d-flex justify-content-center align-items-center" v-if="filter.to || filter.status || filter.from">
            <span class="text-danger cursor-pointer" @click="resetFilter()">Clear All</span>
          </div>
        </div>
      </div>
    </div>
    <iq-card>
      <template v-slot:headerTitle>
        <h4 class="card-title">Transfer Requests</h4>
      </template>
      <template v-slot:body>
        <div v-if="loadTable" class="text-center">
          <b-spinner small type="grow"></b-spinner>
          Loading...
        </div>
        <div v-else>
          <b-modal id="comment1" size="md" title="Comment" hide-footer no-close-on-backdrop>
            <p class="font-size-18 text-black">{{ comment }}</p>
          </b-modal>
          <b-modal id="rejected" size="md" hide-footer no-close-on-backdrop>
            <p class="font-size-18 text-black">Are you sure you want to Reject this Request? </p>
            <ValidationObserver v-slot="{ handleSubmit }" ref="observer">
              <form @submit.prevent="handleSubmit(rejected)">
                <b-row>
                  <b-col lg="12">
                    <iq-card>
                      <template v-slot:body>
                        <div class="new-user-info">
                          <b-row>
<!--                            <b-form-group class="col-md-12" label="Amount">
                              <ValidationProvider name="amount" ref="amount" rules="required" v-slot="{ errors }">
                                <b-form-input v-model="transferData.actual_value" type="text" placeholder="Ex: 1000" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                                <div class="invalid-feedback">
                                  <span>{{ errors[0] }}</span>
                                </div>
                              </ValidationProvider>
                            </b-form-group>-->
                            <b-form-group class="col-md-12" label="Comment">
                              <ValidationProvider name="comment" ref="comment" v-slot="{ errors }">
                                <b-form-textarea
                                    id="textarea-rows"
                                    placeholder="Comments..."
                                    rows="2"
                                    v-model="transferData.comment"
                                ></b-form-textarea>
                                <div class="invalid-feedback">
                                  <span>{{ errors[0] }}</span>
                                </div>
                              </ValidationProvider>
                            </b-form-group>
<!--                            <b-form-group class="col-md-12" label="Safe Type:" label-for="period">
                              <div class="periodNumbers">

                        <span :class="[{ 'shadow selectedNumber' : isSelectedSafe('accountant')}]" @click="transferData.safe_type = 'accountant'">
                          Accountant
                        </span>
                                <span :class="[{ 'shadow selectedNumber' : isSelectedSafe('branch')}]" @click="transferData.safe_type = 'branch'">
                          Desk
                                </span>
                              </div>
                            </b-form-group>-->
                          </b-row>
                          <div class="d-flex  mt-2 align-items-center justify-content-end">
                            <b-button variant="danger"  type="submit" >Save Request</b-button>
                          </div>
                        </div>
                      </template>
                    </iq-card>
                  </b-col>
                </b-row>
              </form>
            </ValidationObserver>
          </b-modal>
          <b-modal id="addApprove" size="md" hide-footer no-close-on-backdrop @close = 'resetApproveData()'>
            <p class="font-size-18 text-black">Are you sure you want to Approve this Request? </p>
            <ValidationObserver v-slot="{ handleSubmit }" ref="observer">
              <form @submit.prevent="handleSubmit(approve)">
                <b-row>
                  <b-col lg="12">
                    <iq-card>
                      <template v-slot:body>
                        <div class="new-user-info">
                          <b-row>
                            <b-form-group class="col-md-12" label="Amount">
                              <ValidationProvider name="amount" ref="amount" rules="required" v-slot="{ errors }">
                                <b-form-input v-model="transferData.actual_value" type="text" placeholder="Ex: 1000" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                                <div class="invalid-feedback">
                                  <span>{{ errors[0] }}</span>
                                </div>
                              </ValidationProvider>
                            </b-form-group>
                            <b-form-group class="col-md-12" label="Comment">
                              <ValidationProvider name="comment" ref="comment" v-slot="{ errors }">
                                <b-form-textarea
                                    id="textarea-rows"
                                    placeholder="Comments..."
                                    rows="2"
                                    v-model="transferData.comment"
                                ></b-form-textarea>
                                <div class="invalid-feedback">
                                  <span>{{ errors[0] }}</span>
                                </div>
                              </ValidationProvider>
                            </b-form-group>
<!--                            <b-form-group class="col-md-12" label="Safe Type:" label-for="period">
                              <div class="periodNumbers">

                        <span :class="[{ 'shadow selectedNumber' : isSelectedSafe('accountant')}]" @click="transferData.safe_type = 'accountant'">
                          Accountant
                        </span>
                                <span :class="[{ 'shadow selectedNumber' : isSelectedSafe('branch')}]" @click="transferData.safe_type = 'branch'">
                          Desk
                                </span>
                              </div>
                            </b-form-group>-->
                          </b-row>
                          <div class="d-flex  mt-2 align-items-center justify-content-end">
                            <b-button variant="primary"  type="submit" >Save Request</b-button>
                          </div>
                        </div>
                      </template>
                    </iq-card>
                  </b-col>
                </b-row>
              </form>
            </ValidationObserver>
          </b-modal>
          <b-modal id="restore" size="md" title="Restore" hide-footer no-close-on-backdrop>
            <ValidationObserver ref="observer">
              <form>
                <b-row>
                  <b-col lg="12">
                    <iq-card>
                      <template v-slot:body>
                        <div class="new-user-info">
                          <b-row>
                            Are you sure to restore ?
                          </b-row>
                          <div class="d-flex  mt-2 align-items-center justify-content-end">
                            <b-button v-if='restoreLoading' variant="primary" disabled>  <spinner-loading text="Loading" /></b-button>
                            <b-button v-else variant="primary"  type="submit" @click ="requestRestore">Save</b-button>
                          </div>
                        </div>
                      </template>
                    </iq-card>
                  </b-col>
                </b-row>
              </form>
            </ValidationObserver>
          </b-modal>
          <div v-if="refundTable.length > 0">
            <b-table striped responsive :fields="refundColumns" :items="refundTable" class="mb-0 table-borderless">
              <template v-slot:cell(updated_at)="data">
                {{ data.item.created_at.substring(0 , 10) }} - {{ tConvert(data.item.created_at.substring(11, 19)) }}
              </template>
              <template v-slot:cell(comment)="data">
                <b-button v-if="data.item.user_comment" variant=" iq-bg-primary mr-0 mb-0" size="sm" @click="showComment1(data.item.user_comment)"><i class="las la-eye"></i></b-button>
                <span v-else> No Comment</span>
              </template>
              <template v-slot:cell(action)="data">
                <span  v-if="data.item.status == 'pending'">
                  <b-button  variant=" iq-bg-success mr-1 mb-0" size="sm" @click="showPopupApprove(data.item.id, data.item.value)"><i class="las la-check"></i></b-button>
                  <b-button  variant=" iq-bg-danger mr-0 mb-0" size="sm" @click="showPopupReject(data.item.id, data.item.value)"><i class="las la-times"></i></b-button>
                </span>
                <span  v-else-if="data.item.hold != 0.00">
                   <b-button  variant=" iq-bg-warning mr-1 mb-0" size="sm" @click="showPopupRestore(data.item.id)"><i class="las la-undo-alt"></i></b-button>
                </span>
                <p v-else>
                  {{data.item.status}}
                </p>
              </template>
            </b-table>
            <b-pagination v-model="currentPage"
                          class="mt-3"
                          :total-rows="total"
                          align="right"
                          :per-page="per_page"
                          aria-controls="my-table"
                          @input="changeContent"
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
  </div>
</template>
<script>
import { core } from '../../config/pluginInit'
import { mapGetters } from 'vuex'

export default {
  name: 'accountingTransfer',
  mounted () {
    core.index()
  },
  props: {
    inDisk: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      filter: {
        status: '',
        from: '',
        to: this.inDisk ? JSON.parse(localStorage.getItem('default_project')).id : ''
      },
      allProjects: [],
      transferData: {
        actual_value: '',
        safe_type: this.inDisk ? 'branch' : 'accountant',
        comment: '',
        status: ''
      },
      restore: {
        transferId: ''
      },
      restoreLoading: false,
      notFoundImage: require('../../assets/images/error/search.png'),
      loadTable: true,
      currentPage: 1,
      per_page: 10,
      total: 6,
      message: '',
      userName: '',
      refundId: '',
      comment: '',
      refundColumns: [
        { label: 'Project From', key: 'project_from.en_title', class: 'text-left' },
        { label: 'Project To', key: 'project_to.en_title', class: 'text-left' },
        { label: 'Safe From', key: 'safe_type_from', class: 'text-left' },
        { label: 'Safe To', key: 'safe_type_to', class: 'text-left' },
        { label: 'Cost', key: 'value', class: 'text-left' },
        { label: 'ِActual Value', key: 'actual_value', class: 'text-left' },
        { label: 'Hold', key: 'hold', class: 'text-left' },
        { label: 'Status', key: 'status', class: 'text-left' },
        { label: 'Created At', key: 'updated_at', class: 'text-left' },
        { label: 'By', key: 'user.name', class: 'text-left' },
        { label: 'Actions', key: 'action', class: 'text-left' },
        { label: 'Action Comment', key: 'action_comment', class: 'text-left' },
        { label: 'Comment', key: 'comment', class: 'text-left' }
      ],
      refundTable: []
    }
  },
  created () {
    this.getTableData()
    this.$store.dispatch('getAllProjectsWithOutPermissions').then(res => {
      this.allProjects = res.data.data
    })
  },
  methods: {
    resetApproveData () {
      this.transferData = {
        actual_value: '',
        safe_type: this.inDisk ? 'branch' : 'accountant',
        comment: '',
        status: 'approved'
      }
    },
    showPopupRestore (id) {
      this.restore.transferId = id
      this.$bvModal.show('restore')
    },
    requestRestore () {
      this.restoreLoading = true
      this.$store.dispatch('requestRestore', this.restore).then(res => {
        core.showSnackbar('success', res.data.message)
      }).finally(() => {
        this.restoreLoading = false
        this.$bvModal.hide('restore')
        this.getTableData()
      })
    },
    tConvert (time) {
      time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/)
      if (time.length > 1) {
        time = time.slice(1)
        time[5] = +time[0] < 12 ? 'AM' : 'PM'
        time[0] = +time[0] % 12 || 12
      }
      time.splice(3, 1, ' ')
      return time.join('')// return adjusted time or original string
    },
    showComment1 (comment) {
      this.comment = comment
      this.$bvModal.show('comment1')
    },
    getTableData () {
      this.loadTable = true
      this.$store.dispatch('getAllTransfer', { pageNumber: this.currentPage, status: this.filter.status, to: this.filter.to, from: this.filter.from, objectID: this.$route.query.key, safeType: 'accountant' }).then(res => {
        this.refundTable = res.data.data
        this.currentPage = res.data.meta.current_page
        this.per_page = res.data.meta.per_page
        this.total = res.data.meta.total
        this.loadTable = false
      })
    },
    approve () {
      this.$store.dispatch('approveOrRejectTransfre', { transferId: this.refundId, data: { ...this.transferData } }).then(res => {
        core.showSnackbar('success', res.data.message)
        this.getTableData()
      }).catch(err => {
        if (err.response.data.errors) {
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            core.showSnackbar('error', `${key} : ${value}`)
          }
        } else if (err.response.data.error) {
          core.showSnackbar('error', err.response.data.error)
        }
      })
    },
    rejected () {
      this.$store.dispatch('approveOrRejectTransfre', { transferId: this.refundId, data: { ...this.transferData } }).then(res => {
        core.showSnackbar('success', res.data.message)
        this.getTableData()
      }).catch(err => {
        if (err.response.data.errors) {
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            core.showSnackbar('error', `${key} : ${value}`)
          }
        } else if (err.response.data.error) {
          core.showSnackbar('error', err.response.data.error)
        }
      })
    },
    showPopupApprove (refundId, value) {
      this.refundId = refundId
      this.transferData.actual_value = parseFloat(value)
      this.transferData.status = 'approved'
      this.$bvModal.show('addApprove')
    },
    showPopupReject (refundId, value) {
      this.refundId = refundId
      this.transferData.actual_value = parseFloat(value)
      this.transferData.status = 'rejected'
      this.$bvModal.show('rejected')
    },
    changeContent () {
      this.getTableData()
    },
    resetFilter () {
      this.filter = {
        status: '',
        from: '',
        to: this.inDisk ? JSON.parse(localStorage.getItem('default_project')).id : ''
      }
      this.filterTable()
    },
    filterTable () {
      this.getTableData()
    },
    isSelectedSafe (i) {
      // eslint-disable-next-line eqeqeq
      return i == this.transferData.safe_type
    },
    isSelectedMethod (i) {
      // eslint-disable-next-line eqeqeq
      return i == this.restore.method
    }
  },
  computed: {
    ...mapGetters(['getUserProjects'])
  },
  watch: {
    $route () {
      this.getTableData()
    }
  }
}
</script>
