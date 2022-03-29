<!--
<template>
  <div class="container-fluid">
    <b-modal id="notification-modal" size="lg" title="Edit Notification" hide-footer>
      <notification :details = detailsNotification @refresh="fillTable"></notification>
    </b-modal>
    <div>
      <b-row>
        <b-col lg='12'>
          <iq-card>
            <template v-slot:headerTitle>
              <h4 class="card-title">Notifications</h4>
            </template>
            <template v-slot:body>
              <div v-if="loadTable" class="text-center">
                <b-spinner small type="grow"></b-spinner>
                Loading...
              </div>
              <b-table v-else striped responsive :fields="columns" :items="AllNotifications" class="mb-0 table-borderless">
                <template v-slot:cell(actions)="data">
                  <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" @click="getSpacificNotificationSetting(data.item.id)" :class="'input_'+data.item.id"><i class="ri-ball-pen-fill m-0"></i></b-button>
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
            </template>
          </iq-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
import { core } from '../../config/pluginInit'
import notification from '../../components/notifications/notification'
export default {
  name: 'notifications',
  mounted () {
    core.index()
  },
  data () {
    return {
      currentPage: 1,
      per_page: 10,
      total: 6,
      notFoundImage: require('../../assets/images/error/search.png'),
      allTabs: '',
      title: '',
      AllNotifications: [],
      loadTable: false,
      columns: [
        { label: 'Key', key: 'key', class: 'text-left' },
        { label: 'Title', key: 'title', class: 'text-left' },
        { label: 'Body', key: 'body', class: 'text-left' },
        { label: 'User', key: 'user.name', class: 'text-left' },
        { label: 'Action', key: 'actions', class: 'text-left' }
      ],
      detailsNotification: ''
    }
  },
  created () {
    this.fillTable()
  },
  components: {
    notification
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
    changeContent () {
      this.fillTable()
    },
    fillTable () {
      this.loadTable = true
      this.$store.dispatch('getAllNotificationsSetting', { pageNumber: this.currentPage }).then(res => {
        this.currentPage = res.data.data.current_page
        this.per_page = res.data.data.per_page
        this.total = res.data.data.total
        this.AllNotifications = res.data.data.data
        this.loadTable = false
      }).catch(() => {
        this.loadTable = false
      })
    },
    getSpacificNotificationSetting (id) {
      document.getElementsByClassName('input_' + id)[0].innerHTML = '<span class="spinner-grow spinner-grow-sm"></span>'
      // eslint-disable-next-line no-unused-expressions,no-sequences
      this.$store.dispatch('getSpacificNotificationSetting', id).then((res) => {
        this.detailsNotification = res.data.data
        this.$bvModal.show('notification-modal')
        document.getElementsByClassName('input_' + id)[0].innerHTML = ' <i class="ri-ball-pen-fill m-0"></i>'
      })
    }
  }
}
</script>
-->
