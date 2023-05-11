import authServices from '../modules/businessLandingPage/services/auth.services'
export default {
  data () {
    return {
      idToken: null,
      getNotifications: [
      ],
      newNotification: false
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
          this.newNotification = true
          this.getNotifications.unshift(payload.notification)
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
        console.log('TOKEN ID FOR this browser', this.idToken)
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
