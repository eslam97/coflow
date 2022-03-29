<template>
  <div class="container-fluid">
    <b-modal id="modal-alert" size="md" title="Alert" hide-footer no-close-on-backdrop>
      <p class="font-size-18 text-black">Are you sure to {{ title }} {{data.amount}} {{data.currency}} ? </p>
      <div class="d-flex justify-content-end">
        <b-button variant="primary"  @click.prevent="approve">Yes</b-button>
      </div>
    </b-modal>
    <div class="iq-card p-1">
      <b-tabs content-class="" align="left" v-if="allTabs">
        <b-tab v-for="(tab, key) in allTabs" :key="key" :title="tab.charAt(0).toUpperCase()+ tab.slice(1)" @click="changePageContent(tab)" :active="key==0">
        </b-tab>
        <b-tab title="Refund" @click="changePageContent('refund')">
        </b-tab>
      </b-tabs>
    </div>
    <div v-if="title != 'refund'">
      <div v-if="title != 'transfer'">
      <ValidationObserver v-slot="{ handleSubmit }" ref="observer">
        <form @submit.prevent="handleSubmit(onSubmit)">
          <b-row>
            <b-col lg="12">
              <iq-card>
                <template v-slot:body>
                  <div class="new-user-info">
                    <b-row>
                      <b-form-group class="col-md-12" label="child Categories">
                        <ValidationProvider name="sub" ref="sub" rules="required" v-slot="{ errors }">
                          <v-select :options="subOfSubCategories" aria-required single v-model="data.category_id"
                                    label="title"
                                    :reduce="option => option.id"
                                   >
                          </v-select>
                          <div class="invalid-feedback">
                            <span>{{ errors[0] }}</span>
                          </div>
                        </ValidationProvider>
                      </b-form-group>
                      <b-form-group class="col-md-6" label="Amount" :label-for="title">
                        <ValidationProvider name="amount" ref="amount" rules="required" v-slot="{ errors }">
                          <b-form-input v-model="data.amount" type="text" placeholder="Ex: 1000" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                          <div class="invalid-feedback">
                            <span>{{ errors[0] }}</span>
                          </div>
                        </ValidationProvider>
                      </b-form-group>
                      <b-form-group class="col-md-6" label="Currency:" label-for="period">
                        <div class="periodNumbers">

                        <span :class="[{ 'shadow selectedNumber' : isSelected('EGP')}]" @click="data.currency = 'EGP'">
                          EGP
                        </span>
                        </div>
                      </b-form-group>
                      <b-form-group v-if="title == 'income'" class="col-md-6" label="Payment Type:" label-for="period">
                        <div class="periodNumbers">

                        <span :class="[{ 'shadow selectedNumber' : isSelectedPayment('cash')}]" @click="data.payment_method = 'cash'">
                          Cash
                        </span>
                          <span :class="[{ 'shadow selectedNumber' : isSelectedPayment('visa')}]" @click="data.payment_method = 'visa'">
                          Visa
                        </span>
                          <span :class="[{ 'shadow selectedNumber' : isSelectedPayment('vodafone_cash')}]" @click="data.payment_method = 'vodafone_cash'">
                          Vodafone Cash
                        </span>
                        </div>
                      </b-form-group>
                      <b-form-group class="col-md-6" label="Comment" :label-for="title">
                        <ValidationProvider name="comment"   rules="required"  ref="comment" v-slot="{ errors }">
                          <b-form-textarea
                              required
                              id="textarea-rows"
                              placeholder="Comments..."
                              rows="2"
                              v-model="data.comment"
                          ></b-form-textarea>
                          <div class="invalid-feedback">
                            <span>{{ errors[0] }}</span>
                          </div>
                        </ValidationProvider>
                      </b-form-group>
<!--                      <b-form-group class="col-md-6" label="Reciver" :label-for="title" v-if="title == 'transfer' || title == 'withdraw'">
                        <ValidationProvider name="reciver"   rules="required"  ref="reciver" v-slot="{ errors }">
                          <b-form-textarea
                              required
                              id="textarea-rows"
                              placeholder="Comments..."
                              rows="2"
                              v-model="data.comment"
                          ></b-form-textarea>
                          <div class="invalid-feedback">
                            <span>{{ errors[0] }}</span>
                          </div>
                        </ValidationProvider>
                      </b-form-group>-->
                    </b-row>
                    <div class="d-flex  mt-2 align-items-center justify-content-end">
                      <b-button variant="primary"  type="submit" >Save</b-button>
                    </div>
                  </div>
                </template>
              </iq-card>
            </b-col>
          </b-row>
        </form>
      </ValidationObserver>
      </div>
      <div v-else>
        <ValidationObserver v-slot="{ handleSubmit }" ref="observer">
          <form @submit.prevent="handleSubmit(requestTransfer)">
            <b-row>
              <b-col lg="12">
                <iq-card>
                  <template v-slot:body>
                    <div class="new-user-info">
                      <b-row>
                        <b-form-group class="col-md-12" :label="title +' To :'"  :label-for="title">
                          <ValidationProvider name="to" ref="to">
                            <div class="form-group">
                              <select  v-model="transfer.to" id="to" required class="form-control">
                                <option selected disabled value="">To Branch...</option>
                                <option value="administrator">Administrator</option>
                                <option v-for="(i, key) in allProjects" :key="key" :value="i.id">
                                  <span>{{i.en_title}}</span>
                                </option>
                              </select>
                            </div>
                          </ValidationProvider>
                        </b-form-group>
                        <b-form-group class="col-md-12" label="Amount" label-for="phone">
                          <ValidationProvider name="value" ref="value" rules="required" v-slot="{ errors }">
                            <b-form-input v-model="transfer.value" type="text" placeholder="Ex: 1000" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                            <div class="invalid-feedback">
                              <span>{{ errors[0] }}</span>
                            </div>
                          </ValidationProvider>
                        </b-form-group>
                        <b-form-group v-if="title == 'income'" class="col-md-6" label="Payment Type:" label-for="period">
                          <div class="periodNumbers">

                        <span :class="[{ 'shadow selectedNumber' : isSelectedPayment('cash')}]" @click="data.payment_method = 'cash'">
                          Cash
                        </span>
                            <span :class="[{ 'shadow selectedNumber' : isSelectedPayment('visa')}]" @click="data.payment_method = 'visa'">
                          Visa
                        </span>
                            <span :class="[{ 'shadow selectedNumber' : isSelectedPayment('vodafone_cash')}]" @click="data.payment_method = 'vodafone_cash'">
                          Vodafone Cash
                        </span>
                          </div>
                        </b-form-group>
                        <b-form-group class="col-md-6" label="Comment" :label-for="title">
                          <ValidationProvider name="comment" ref="comment" v-slot="{ errors }">
                            <b-form-textarea
                                id="textarea-rows"
                                placeholder="Comments..."
                                rows="2"
                                v-model="transfer.comment"
                            ></b-form-textarea>
                            <div class="invalid-feedback">
                              <span>{{ errors[0] }}</span>
                            </div>
                          </ValidationProvider>
                        </b-form-group>
<!--                        <b-form-group class="col-md-6" label="Reciver" :label-for="title" v-if="title == 'transfer' || title == 'withdraw'">
                          <ValidationProvider name="reciver" ref="reciver" v-slot="{ errors }">
                            <b-form-textarea
                                id="textarea-rows"
                                placeholder="Comments..."
                                rows="2"
                                v-model="data.comment"
                            ></b-form-textarea>
                            <div class="invalid-feedback">
                              <span>{{ errors[0] }}</span>
                            </div>
                          </ValidationProvider>
                        </b-form-group>-->
                      </b-row>
                      <div class="d-flex  mt-2 align-items-center justify-content-end">
                        <b-button variant="primary"  type="submit" >Save</b-button>
                      </div>
                    </div>
                  </template>
                </iq-card>
              </b-col>
            </b-row>
          </form>
        </ValidationObserver>
      </div>
      <b-row>
        <b-col lg='12'>
          <iq-card v-if="title != 'transfer'">
            <template v-slot:headerTitle>
              <h4 class="card-title">Daily {{title}}</h4>
            </template>
            <template v-slot:headerAction>
              <input type="text" placeholder="search" class="form-control w-100" v-model="search">
            </template>
            <template v-slot:body>
              <div v-if="loadTable" class="text-center">
                <b-spinner small type="grow"></b-spinner>
                Loading...
              </div>
              <div v-else>
                <div v-if="allTableData.length > 0">
                  <b-table striped responsive :fields="columns" :items="allTableData" class="mb-0 table-borderless">
                    <template v-slot:cell(category)="data">
                      <div class="custom-control custom-switch custom-switch-text custom-control-inline custom-switch-color" >
                        {{data.item.category.main_parent ? data.item.category.main_parent.title : data.item.category.title }}
                      </div>
                    </template>
                    <template v-slot:cell(categories)="data">
                      <div class="custom-control custom-switch custom-switch-text custom-control-inline custom-switch-color" >
                        {{ !data.item.category.main_parent ? '_____': data.item.category.title }}
                      </div>
                    </template>
                    <template v-slot:cell(user)="data">
                      <div class="custom-control custom-switch custom-switch-text custom-control-inline custom-switch-color" >
                        {{data.item.user.name}}
                      </div>
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
          <div v-else>
            <transfer-request :inDisk="true"></transfer-request>
          </div>
        </b-col>
      </b-row>
    </div>
    <div v-else>
      <ValidationObserver v-slot="{ handleSubmit }" ref="observer">
        <form @submit.prevent="handleSubmit(refundRequest)">
          <b-row>
            <b-col lg="12">
              <iq-card>
                <template v-slot:body>
                  <div class="new-user-info">
                    <b-row>
                      <b-form-group class="col-md-6" label="Phone Or MemberId" label-for="phone">
                        <ValidationProvider name="phone" ref="phone" rules="required" v-slot="{ errors }">
                          <b-form-input v-model="refund.phone" type="text" placeholder="phone or memberId" :class="(errors.length > 0 ? ' is-invalid' : '')"></b-form-input>
                          <div class="invalid-feedback">
                            <span>{{ errors[0] }}</span>
                          </div>
                        </ValidationProvider>
                      </b-form-group>
                      <b-form-group class="col-md-6" label="Select Packages" label-for="package">
                        <ValidationProvider name="package" ref="package" rules="required" v-slot="{ errors }">
                         <select  class="form-control" v-model="refund.member_package" id="package" required >
                            <option selected disabled value="">Choose Package...</option>
                           <option v-for="(i, key) in allPackagesToChoose" :value="i.id" :key="key"> {{i.package_title}}</option>
                          </select>
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
                              rows="3"
                              v-model="refund.comment"
                          ></b-form-textarea>
                          <div class="invalid-feedback">
                            <span>{{ errors[0] }}</span>
                          </div>
                        </ValidationProvider>
                      </b-form-group>
                    </b-row>
                    <div class="d-flex  mt-2 align-items-center justify-content-end">
                      <b-button variant="primary"  type="submit" >Request Refund</b-button>
                    </div>
                  </div>
                </template>
              </iq-card>
            </b-col>
          </b-row>
        </form>
      </ValidationObserver>
<!--      <b-row>
        <b-col lg='12'>
          <iq-card>
            <template v-slot:headerTitle>
              <h4 class="card-title">Daily {{title}}</h4>
            </template>
            <template v-slot:body>
              <div v-if="loadTable" class="text-center">
                <b-spinner small type="grow"></b-spinner>
                Loading...
              </div>
              <div v-else>
                <b-modal id="comment" size="md" title="Comment" hide-footer no-close-on-backdrop>
                  <p class="font-size-18 text-black">{{ comment }}</p>
                </b-modal>
                <div v-if="refundTable">
                  <b-table striped responsive :fields="refundColumns" :items="refundTable" class="mb-0 table-borderless">
                    <template v-slot:cell(created_at)="data">
                      {{ data.item.created_at.substring(0 , 10) }} - {{ tConvert(data.item.created_at.substring(11, 19)) }}
                    </template>
                    <template v-slot:cell(comment)="data">
                      <b-button v-if="data.item.comment" variant=" iq-bg-primary mr-0 mb-0" size="sm" @click="showComment(data.item.comment)"><i class="las la-eye"></i></b-button>
                      <span v-else> No Comment</span>
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
      </b-row>-->
    </div>
  </div>
</template>
<script>
import { core } from '../../config/pluginInit'
import { mapGetters } from 'vuex'
import TransferRequest from '../Accounting/transfer'
export default {
  name: 'desk',
  mounted () {
    core.index()
  },
  computed: {
    ...mapGetters(['getUserProjects'])
  },
  components: {
    TransferRequest
  },
  data () {
    return {
      transfer: {
        method: 'cash',
        safe_type: 'branch',
        from: '',
        to: '',
        comment: '',
        value: ''
      },
      allProjects: [],
      currentPage: 1,
      per_page: 10,
      total: 6,
      notFoundImage: require('../../assets/images/error/search.png'),
      allTabs: '',
      title: '',
      loadTable: true,
      mainCategories: [],
      subCategories: [],
      allTableData: [],
      subOfSubCategories: [],
      message: '',
      allPackagesToChoose: [],
      search: '',
      data: {
        selectedMain: '',
        category_id: '',
        selectedSub: '',
        amount: '',
        currency: 'EGP',
        comment: '',
        safe_type: 'branch',
        payment_method: 'cash'
      },
      columns: [
        { label: 'Main Category', key: 'category', class: 'text-left' },
        { label: 'Sub Category', key: 'categories', class: 'text-left' },
        { label: 'User Name', key: 'user', class: 'text-left' },
        { label: 'Amount', key: 'amount', class: 'text-left' }
      ],
      refundColumns: [
        { label: 'Member Name', key: 'member.name', class: 'text-left' },
        { label: 'Package Name', key: 'member_package.package_title', class: 'text-left' },
        { label: 'Refundable', key: 'value', class: 'text-left' },
        { label: 'Status', key: 'status', class: 'text-left' },
        { label: 'Created At', key: 'created_at', class: 'text-left' },
        { label: 'By', key: 'user.name', class: 'text-left' },
        { label: 'Comment', key: 'comment', class: 'text-left' }
      ],
      refundTable: [],
      comment: '',
      refund: {
        phone: '',
        comment: '',
        member_package: ''
      },
      member_id: ''
    }
  },
  created () {
    this.$store.dispatch('getAllCategories').then(res => {
      this.allTabs = res.data.data.type
      this.changePageContent(res.data.data.type[0])
      this.fillTable(res.data.data.type[0])
      this.showThirdLevel(res.data.data.type[0])
    })
    this.$store.dispatch('getAllProjectsWithOutPermissions').then(res => {
      this.allProjects = res.data.data
    })
  },
  watch: {
    'data.selectedMain' (value) {
      this.showSub(value)
    },
    search () {
      this.fillTable(this.title)
    },
    'data.selectedSub' (value) {
      this.showSubOfSubCategories(value)
    },
    'refund.phone' (value) {
      if (value.length > 6) {
        this.$store.dispatch('serachByPhoneOrId', value).then(res => {
          this.$store.dispatch('getAllPackageToRefund', res.data.data.id).then(response => {
            this.allPackagesToChoose = response.data.data
            this.member_id = res.data.data.id
          })
        })
      }
    }
  },
  methods: {
    isSelectedPayment (i) {
      // eslint-disable-next-line eqeqeq
      return i == this.data.payment_method
    },
    isSelectedMethod (i) {
      // eslint-disable-next-line eqeqeq
      return i == this.transfer.method
    },
    /* showSubOfSubCategories (parentId) {
      this.$store.dispatch('getAllchildDependsOnParent', parentId).then(response => {
        if (response.data.data.child.length > 0) {
          this.subOfSubCategories = response.data.data.child
        } else {
          this.subOfSubCategories = []
        }
      })
    }, */

    showThirdLevel (type) {
      this.$store.dispatch('getThirdCategories', type).then(res => {
        this.subOfSubCategories = res.data.data
      })
    },
    requestTransfer () {
      if (typeof (this.transfer.to) === 'string') {
        if (typeof (this.transfer.to) === 'string') {
          this.$store.dispatch('requestTransfer', {
            comment: this.transfer.comment,
            value: this.transfer.value
          }).then(res => {
            core.showSnackbar('success', res.data.message)
          }).catch(err => {
            if (err.response.data.errors) {
              // eslint-disable-next-line no-unused-vars
              for (const [key, value] of Object.entries(err.response.data.errors)) {
                core.showSnackbar('error', value)
              }
            } else if (err.response.data.error) {
              core.showSnackbar('error', err.response.data.error)
            }
          })
        } else if (typeof (this.transfer.to) === 'string') {
          this.$store.dispatch('requestTransfer', {
            from: this.transfer.from,
            comment: this.transfer.comment,
            value: this.transfer.value
          }).then(res => {
            core.showSnackbar('success', res.data.message)
          }).catch(err => {
            if (err.response.data.errors) {
              // eslint-disable-next-line no-unused-vars
              for (const [key, value] of Object.entries(err.response.data.errors)) {
                core.showSnackbar('error', value)
              }
            } else if (err.response.data.error) {
              core.showSnackbar('error', err.response.data.error)
            }
          })
        } else {
          this.$store.dispatch('requestTransfer', {
            to: this.transfer.to,
            comment: this.transfer.comment,
            value: this.transfer.value
          }).then(res => {
            core.showSnackbar('success', res.data.message)
          }).catch(err => {
            if (err.response.data.errors) {
              // eslint-disable-next-line no-unused-vars
              for (const [key, value] of Object.entries(err.response.data.errors)) {
                core.showSnackbar('error', value)
              }
            } else if (err.response.data.error) {
              core.showSnackbar('error', err.response.data.error)
            }
          })
        }
      } else {
        this.$store.dispatch('requestTransfer', this.transfer).then(res => {
          core.showSnackbar('success', res.data.message)
        }).catch(err => {
          if (err.response.data.errors) {
          // eslint-disable-next-line no-unused-vars
            for (const [key, value] of Object.entries(err.response.data.errors)) {
              core.showSnackbar('error', value)
            }
          } else if (err.response.data.error) {
            core.showSnackbar('error', err.response.data.error)
          }
        })
      }
    },
    refundRequest () {
      this.$store.dispatch('refundRequest', { userId: this.member_id, data: this.refund }).then(res => {
        core.showSnackbar('success', res.data.message)
        this.loadTable = true
        this.$store.dispatch('getAllRefund', { pageNumber: 1 }).then(res => {
          this.refundTable = res.data.data
          this.currentPage = res.data.current_page
          this.per_page = res.data.per_page
          this.total = res.data.total
          this.loadTable = false
        })
      }).catch(err => {
        if (err.response.data.errors) {
          // eslint-disable-next-line no-unused-vars
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            core.showSnackbar('error', value)
          }
        } else if (err.response.data.error) {
          core.showSnackbar('error', err.response.data.error)
        }
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
    showComment (comment) {
      this.comment = comment
      this.$bvModal.show('comment')
    },
    onSubmit () {
      this.$bvModal.show('modal-alert')
    },
    fillTable (data) {
      this.loadTable = true
      this.$store.dispatch('getCategoryTypes', { type: data, search: this.search, pageNumber: this.currentPage }).then(response => {
        // console.log(response)
        this.allTableData = response.data.data.data
        this.currentPage = response.data.data.current_page
        this.per_page = response.data.data.per_page
        this.total = response.data.data.total
        this.loadTable = false
      }).catch(() => {
        this.loadTable = false
      })
    },
    isSelected (i) {
      // eslint-disable-next-line eqeqeq
      return i == this.data.currency
    },
    changeContentDesk () {
      this.fillTable(this.title)
    },
    changePageContent (type) {
      this.showThirdLevel(type)
      this.title = type
      this.currentPage = 1
      this.per_page = 10
      this.total = 6
      this.data.selectedMain = ''
      this.data.selectedSub = ''
      this.data.category_id = ''
      this.mainCategories = []
      this.subCategories = []
      this.subOfSubCategories = []
      this.data.currency = 'EGP'
      // this.showThirdLevel(type)
      if (type !== 'refund') {
        this.$store.dispatch('getAllParentsDependsOnType', type).then(res => {
          if (res.data.data.categories.length > 0) {
            this.mainCategories = res.data.data.categories
          } else {
            this.mainCategories = []
          }
        })
        this.fillTable(type)
      } else {
        this.loadTable = true
        this.$store.dispatch('getAllRefund', { pageNumber: this.currentPage }).then(res => {
          // console.log(res.data)
          this.refundTable = res.data.data
          this.currentPage = res.data.current_page
          this.per_page = res.data.per_page
          this.total = res.data.total
          this.loadTable = false
        })
      }
    },
    showSub (parentId) {
      this.$store.dispatch('getAllchildDependsOnParent', parentId).then(response => {
        if (response.data.data.child.length > 0) {
          this.subCategories = response.data.data.child
        } else {
          this.subCategories = []
        }
      })
    },
    approve () {
      this.$store.dispatch('amountCategories', this.data).then(res => {
        core.showSnackbar('success', res.data.message)
        this.$bvModal.hide('modal-alert')
        this.data = {
          selectedMain: '',
          category_id: '',
          selectedSub: '',
          amount: '',
          currency: 'EGP',
          comment: '',
          safe_type: 'branch'
        }
        this.$refs.observer.reset()
        this.fillTable(this.title)
        this.loadTable = false
      }).catch(err => {
        if (err.response.data.errors) {
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            this.$refs[key].setErrors(value)
          }
        } else if (err.response.data.error) {
          core.showSnackbar('error', err.response.data.error)
        }
        this.$bvModal.hide('modal-alert')
      })
    }
  }
}
</script>
