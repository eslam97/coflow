<template>
  <b-container fluid>
    <main-modal id="notificationDetails" size="lg">
      <template v-slot:header>
        <h4 class="font-weight-bold" v-if="typeOfModal === 'add'"><span class="text-warning" >Add: </span> Notification
        </h4>
        <h4 class="font-weight-bold" v-else-if="typeOfModal === 'view'"><span class="text-success-light" >view:
        </span>Notification</h4>
      </template>
      <template v-slot:body>
        <notification-details @addNotification="addNotification"
                          :requestLoading="requestLoading"
                          :notificationDetails="notificationDetails"
                          :typeOfModal="typeOfModal"/>
      </template>
    </main-modal>
    <b-row>
      <b-col lg="12" class="mb-2 d-flex justify-content-between align-items-center">
        <h3>Notifications</h3>
        <div>
          <b-button  variant="warning"  @click="openPopup" class="add_button text-white">Create
            Notification<i class="las la-plus ml-3"></i></b-button>
        </div>
      </b-col>
      <b-col lg="12">
        <main-table
            :fields="columns"
            class="mb-0 table-borderless"
            :list_url="'notifications'"
            :reloadData="reloadTable"
        >
        </main-table>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { core } from '@/config/pluginInit'
import notificationDetails from '@/modules/superAdmin/notifications/components/notificationDetails'
import notificationsServices from '../services/notifications.services'

export default {
  data () {
    return {
      columns: [
        { label: 'Title', key: 'title', class: 'text-left' },
        { label: 'Content', key: 'content', class: 'text-left' },
        {
          label: 'Actions',
          key: 'actions',
          class: 'text-left wt-150',
          type: 'actions',
          actions: [
            {
              icon: 'las la-eye',
              color: 'success-light',
              text: 'View',
              actionName: 'viewProfile',
              actionParams: ['id']
            }
          ]
        }
      ],
      notificationDetails: false,
      profileDetails: false,
      typeOfModal: 'add',
      requestLoading: false,
      reloadTable: false
    }
  },
  methods: {
    addNotification (payload) {
      notificationsServices.filterForSendNotifications(payload).then(res => {
        core.showSnackbar('success', res.data.message)
      })
    },
    openPopup () {
      this.typeOfModal = 'add'
      this.notificationDetails = false
      this.$bvModal.show('notificationDetails')
    }
  },
  components: {
    notificationDetails
  },
  mounted () {
    core.index()
  }
}
</script>
