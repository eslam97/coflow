<template>
  <div class="container-fluid">
    <div class="iq-card p-1">
      <b-tabs content-class="" align="left" v-if="allTabs">
        <b-tab v-for="(tab, key) in allTabs" :key="key" :title="tab.charAt(0).toUpperCase()+ tab.slice(1)" @click="changePageContent(tab)" :active="key==0">
        </b-tab>
        <b-tab title="Refund" @click="changePageContent('refund')">
        </b-tab>
      </b-tabs>
    </div>
    <div v-if="title != 'refund'">
      <b-row>
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
        </b-col>
      </b-row>
    </div>
    <div v-else>
      <b-row>
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
      </b-row>
    </div>
  </div>
</template>
<script>
import { core } from '../../config/pluginInit'
import { mapGetters } from 'vuex'

export default {
  name: 'desk',
  mounted () {
    core.index()
  },
  computed: {
    ...mapGetters(['getUserProjects'])
  },
  data () {
    return {
      transfer: {
        from: '',
        to: '',
        comment: '',
        value: ''
      },
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
      message: '',
      allPackagesToChoose: [],
      search: '',
      data: {
        selectedMain: '',
        category_id: '',
        amount: '',
        currency: 'EGP',
        comment: ''
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
    })
  },
  watch: {
    'data.selectedMain' (value) {
      this.showSub(value)
    },
    search () {
      this.fillTable(this.title)
    },
    'refund.phone' (value) {
      if (value.length > 6) {
        this.$store.dispatch('serachByPhoneOrId', value).then(res => {
          this.member_id = res.data.data.id
          this.$store.dispatch('getAllPackageToRefund', res.data.data.id).then(response => {
            this.allPackagesToChoose = response.data.data
          })
        })
      }
    }
  },
  methods: {
    requestTransfer () {
      if (typeof (this.transfer.to) === 'string' || typeof (this.transfer.from) === 'string') {
        if (typeof (this.transfer.to) === 'string' && typeof (this.transfer.from) === 'string') {
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
      this.title = type
      this.currentPage = 1
      this.per_page = 10
      this.total = 6
      this.data.selectedMain = ''
      this.data.selectedSub = ''
      this.mainCategories = []
      this.subCategories = []
      this.data.currency = 'EGP'
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
          amount: '',
          currency: 'EGP',
          comment: ''
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
