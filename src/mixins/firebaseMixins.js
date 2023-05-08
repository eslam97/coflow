import authServices from '../modules/businessLandingPage/services/auth.services'
export default {
  data () {
    return {
      idToken: null,
      getNotifications: [
        {
          id: 50958,
          project_id: 2,
          object_id: 1994,
          title: 'Member Discount',
          body: ' ds',
          file: null,
          read: 0,
          notification_setting_id: 4,
          user_id: 104,
          is_active: 1,
          deleted_at: null,
          created_at: '2023-04-24T20:30:58.000000Z',
          updated_at: '2023-04-24T20:30:58.000000Z',
          published: '17 hours ago',
          user: {
            id: 104,
            name: 'islam ashraf',
            is_online: true
          },
          setting: {
            id: 4,
            key: 'create_discount'
          }
        },
        {
          id: 50944,
          project_id: 2,
          object_id: 423,
          title: 'Member Refund done',
          body: ' ',
          file: null,
          read: 0,
          notification_setting_id: 3,
          user_id: 104,
          is_active: 1,
          deleted_at: null,
          created_at: '2023-04-24T20:26:11.000000Z',
          updated_at: '2023-04-24T20:26:11.000000Z',
          published: '17 hours ago',
          user: {
            id: 104,
            name: 'islam ashraf',
            is_online: true
          },
          setting: {
            id: 3,
            key: 'refund_done'
          }
        },
        {
          id: 50931,
          project_id: 2,
          object_id: 423,
          title: 'Member Refund Status',
          body: ' ',
          file: null,
          read: 0,
          notification_setting_id: 2,
          user_id: 104,
          is_active: 1,
          deleted_at: null,
          created_at: '2023-04-24T20:21:26.000000Z',
          updated_at: '2023-04-24T20:21:26.000000Z',
          published: '17 hours ago',
          user: {
            id: 104,
            name: 'islam ashraf',
            is_online: true
          },
          setting: {
            id: 2,
            key: 'refund_change_status'
          }
        },
        {
          id: 50918,
          project_id: 2,
          object_id: 423,
          title: 'Member Refund Request',
          body: ' ',
          file: null,
          read: 0,
          notification_setting_id: 1,
          user_id: 104,
          is_active: 1,
          deleted_at: null,
          created_at: '2023-04-24T20:21:01.000000Z',
          updated_at: '2023-04-24T20:21:01.000000Z',
          published: '17 hours ago',
          user: {
            id: 104,
            name: 'islam ashraf',
            is_online: true
          },
          setting: {
            id: 1,
            key: 'refund_request'
          }
        },
        {
          id: 50905,
          project_id: 2,
          object_id: 422,
          title: 'Member Refund done',
          body: ' ',
          file: null,
          read: 0,
          notification_setting_id: 3,
          user_id: 104,
          is_active: 1,
          deleted_at: null,
          created_at: '2023-04-24T19:59:51.000000Z',
          updated_at: '2023-04-24T19:59:51.000000Z',
          published: '17 hours ago',
          user: {
            id: 104,
            name: 'islam ashraf',
            is_online: true
          },
          setting: {
            id: 3,
            key: 'refund_done'
          }
        },
        {
          id: 50892,
          project_id: 2,
          object_id: 422,
          title: 'Member Refund Status',
          body: ' ',
          file: null,
          read: 0,
          notification_setting_id: 2,
          user_id: 104,
          is_active: 1,
          deleted_at: null,
          created_at: '2023-04-24T19:04:19.000000Z',
          updated_at: '2023-04-24T19:04:19.000000Z',
          published: '18 hours ago',
          user: {
            id: 104,
            name: 'islam ashraf',
            is_online: true
          },
          setting: {
            id: 2,
            key: 'refund_change_status'
          }
        },
        {
          id: 50867,
          project_id: 2,
          object_id: 422,
          title: 'Member Refund Status',
          body: ' ',
          file: null,
          read: 0,
          notification_setting_id: 2,
          user_id: 104,
          is_active: 1,
          deleted_at: null,
          created_at: '2023-04-24T19:02:48.000000Z',
          updated_at: '2023-04-24T19:02:48.000000Z',
          published: '18 hours ago',
          user: {
            id: 104,
            name: 'islam ashraf',
            is_online: true
          },
          setting: {
            id: 2,
            key: 'refund_change_status'
          }
        },
        {
          id: 50854,
          project_id: 2,
          object_id: 422,
          title: 'Member Refund Status',
          body: ' ',
          file: null,
          read: 0,
          notification_setting_id: 2,
          user_id: 104,
          is_active: 1,
          deleted_at: null,
          created_at: '2023-04-24T19:02:23.000000Z',
          updated_at: '2023-04-24T19:02:23.000000Z',
          published: '18 hours ago',
          user: {
            id: 104,
            name: 'islam ashraf',
            is_online: true
          },
          setting: {
            id: 2,
            key: 'refund_change_status'
          }
        }
      ]
    }
  },
  methods: {
    async startListeners () {
      await this.startOnMessageListener()
      await this.startTokenRefreshListener()
      await this.requestPermission()
      await this.getIdToken()
    },
    startOnMessageListener () {
      try {
        this.$messaging.onMessage((payload) => {
          console.info('Message received : ', payload)
          console.log(payload.notification.body)
          this.getNotifications.unshift(payload.notification.body)
        })
      } catch (e) {
        console.error('Error : ', e)
      }
    },
    startTokenRefreshListener () {
      try {
        this.$messaging.onTokenRefresh(async () => {
          try {
            this.idToken = await this.$messaging.getToken()
            console.log('TOKEN ID FOR this browser')
            localStorage.setItem('fcmToken', this.idToken)
            var res = await authServices.sendFirebase(this.idToken)
            console.log(res)
          } catch (e) {
            console.error('Error : ', e)
          }
        })
      } catch (e) {
        console.error('Error : ', e)
      }
    },
    async requestPermission () {
      try {
        const permission = await Notification.requestPermission()
        console.log('GIVEN notify perms')
        console.log(permission)
      } catch (e) {
        console.error('Error : ', e)
      }
    },
    async getIdToken () {
      try {
        this.idToken = await this.$messaging.getToken()
        console.log('TOKEN ID FOR this browser')
        var res = await authServices.sendFirebase(this.idToken)
        localStorage.setItem('fcmToken', res.data)
      } catch (e) {
        console.error('Error : ', e)
      }
    }
  },
  mounted () {
    this.startListeners()
  }
}
