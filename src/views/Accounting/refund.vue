<template>
  <div>
    <b-modal id="comment" size="md" title="Comment" hide-footer no-close-on-backdrop>
      <p class="font-size-18 text-black">{{ message }}</p>
    </b-modal>
    <iq-card>
      <template v-slot:headerTitle>
        <h4 class="card-title">Requests</h4>
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
          <b-modal id="rejectes" size="md" :title="userName" hide-footer no-close-on-backdrop>
            <p class="font-size-18 text-black">Are you sure you want to Reject this Request? </p>
            <div class="d-flex justify-content-end">
              <b-button variant="danger" @click="rejected">Save Request</b-button>
            </div>
          </b-modal>
          <b-modal id="addApprove" size="md" :title="userName" hide-footer no-close-on-backdrop>
            <ValidationObserver v-slot="{ handleSubmit }">
              <form @submit.prevent="handleSubmit(approve)">
                <b-row>
                  <b-col lg="12">
                    <iq-card>
                      <template v-slot:body>
                        <div class="new-user-info">
                          <b-row>
                            <b-form-group class="col-md-12" label="Amount To Be Refunded:" label-for="amount">
                              <ValidationProvider name="amount" ref="amount" rules="required" v-slot="{ errors }">
                                <b-form-input v-model="details.value
" type="text" placeholder="Ex: 1000" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                                <div class="invalid-feedback">
                                  <span>{{ errors[0] }}</span>
                                </div>
                              </ValidationProvider>
                            </b-form-group>
                            <b-form-group class="col-md-12" label="Comment" :label-for="title">
                              <ValidationProvider name="comment" ref="comment" v-slot="{ errors }">
                                <b-form-textarea
                                    id="textarea-rows"
                                    placeholder="Comments..."
                                    rows="2"
                                    v-model="details.comment"
                                ></b-form-textarea>
                                <div class="invalid-feedback">
                                  <span>{{ errors[0] }}</span>
                                </div>
                              </ValidationProvider>
                            </b-form-group>
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
          <div v-if="refundTable.length > 0">
            <b-table striped responsive :fields="refundColumns" :items="refundTable" class="mb-0 table-borderless">
              <template v-slot:cell(updated_at)="data">
                {{ data.item.created_at.substring(0 , 10) }} - {{ tConvert(data.item.created_at.substring(11, 19)) }}
              </template>
              <template v-slot:cell(comment)="data">
                <b-button v-if="data.item.comment" variant=" iq-bg-primary mr-0 mb-0" size="sm" @click="showComment1(data.item.comment)"><i class="las la-eye"></i></b-button>
                <span v-else> No Comment</span>
              </template>
              <template v-slot:cell(action)="data">
                <span  v-if="data.item.status == 'pending'">
                  <b-button  variant=" iq-bg-success mr-1 mb-0" size="sm" @click="showPopupApprove(data.item.member.name,data.item.id)"><i class="las la-check"></i></b-button>
                  <b-button  variant=" iq-bg-danger mr-0 mb-0" size="sm" @click="showPopupReject(data.item.member.name,data.item.id)"><i class="las la-times"></i></b-button>
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

export default {
  name: 'accountingRefund',
  mounted () {
    core.index()
  },
  data () {
    return {
      loadTable: true,
      notFoundImage: require('../../assets/images/error/search.png'),
      currentPage: 1,
      per_page: 10,
      total: 6,
      message: '',
      userName: '',
      refundId: '',
      comment: '',
      details: {
        value: '',
        comment: '',
        status: ''
      },
      refundColumns: [
        { label: 'Member Name', key: 'member.name', class: 'text-left' },
        { label: 'Package Name', key: 'member_package.package_title', class: 'text-left' },
        { label: 'Cost', key: 'cost', class: 'text-left' },
        { label: 'Status', key: 'status', class: 'text-left' },
        { label: 'Created At', key: 'updated_at', class: 'text-left' },
        { label: 'created By', key: 'user.name', class: 'text-left' },
        { label: 'Done By', key: 'done_by.name', class: 'text-left' },
        { label: 'Done At', key: 'done_at', class: 'text-left' },
        { label: 'Comment', key: 'comment', class: 'text-left' },
        { label: 'Actions', key: 'action', class: 'text-left' }
      ],
      refundTable: []
    }
  },
  created () {
    this.getTableData()
  },
  methods: {
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
      this.$store.dispatch('getAllRefund', { pageNumber: this.currentPage, objectID: this.$route.query.key }).then(res => {
        // console.log('res.data', res.data)
        this.refundTable = res.data.data
        this.currentPage = res.data.meta.current_page
        this.per_page = res.data.meta.per_page
        this.total = res.data.meta.total
        this.loadTable = false
      })
    },
    approve () {
      this.details.status = 'approved'
      this.$store.dispatch('submitStatus', { refundId: this.refundId, data: this.details }).then(res => {
        core.showSnackbar('success', res.data.message)
        this.getTableData()
      }).catch(err => {
        if (err.response.data.errors) {
          // eslint-disable-next-line no-unused-vars
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            // console.log(key)
            core.showSnackbar('error', value)
          }
        } else if (err.response.data.error) {
          core.showSnackbar('error', err.response.data.error)
        }
      })
    },
    rejected () {
      this.details.status = 'rejected'
      this.$store.dispatch('submitStatus', { refundId: this.refundId, data: { status: this.details.status, value: 0 } }).then(res => {
        core.showSnackbar('success', res.data.message)
        this.getTableData()
      }).catch(err => {
        if (err.response.data.errors) {
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            this.$refs[key].setErrors(value)
          }
        } else if (err.response.data.error) {
          core.showSnackbar('error', err.response.data.error)
        }
      })
    },
    showPopupApprove (userName, refundId) {
      this.userName = userName
      this.refundId = refundId
      this.$bvModal.show('addApprove')
    },
    showPopupReject (userName, refundId) {
      this.userName = userName
      this.refundId = refundId
      this.$bvModal.show('rejectes')
    }
  },
  watch: {
    $route () {
      this.getTableData()
    }
  }
}
</script>
