<template>
  <div>
    <Loader />
<!--    <Customizer @onLogo="changeLogo" @toggle="sidebarMini" @animationChange="routerAnimationChange" />-->
    <div class="wrapper">
      <!-- Sidebar  -->
      <SmallSidebar v-if="$route.name === 'dashboard.home-5'" :logo="SmallSidebarLogo" @toggle="sidebarMini" />
      <Sidebar :items="verticalMenu" :logo="logo" :onlyLogo="onlyLogo" :onlyLogoText="onlyLogoText" @toggle="sidebarMini" :toggleButton="toggleSideIcon" :sidebarGroupTitle="sidebarGroupTitle" />
      <!-- TOP Nav Bar -->
      <DefaultNavBar :ifSearch='ifSearch' title="Dashboard" :homeURL="{ name: 'dashboard.home-2' }" :sidebarGroupTitle="sidebarGroupTitle" @toggle="sidebarMini" :logo="logo">
        <template slot="responsiveRight">
          <ul class="navbar-nav ml-auto navbar-list">
            <li class="" v-nav-toggle>
              <a href="#" class="search-toggle iq-waves-effect d-flex align-items-center rounded pl-0">
                <img :src="userData.logo ? userData.logo : require('@/assets/images/user/default-user-image.png')"
                     class="img-fluid rounded_image" alt="user" style="background-color:#f2f2f2">
              </a>
              <!--              <div class="iq-sub-dropdown iq-user-dropdown">
                              <div class="iq-card shadow-none m-0">
                                <div class="iq-card-body p-0 ">
                                  <div class="bg-primary p-3">
                                    <h5 class="mb-0 text-white line-height">Hello {{ userName.username }}</h5>
                                    <span class="text-white font-size-12">{{getDefaultProject ? getDefaultProject.en_title : defaultProject}}</span>
                                  </div>
                                  <a href="#" class="iq-sub-card iq-bg-primary-hover">
                                    <div class="media align-items-center">
                                      <div class="rounded iq-card-icon iq-bg-primary">
                                        <i class="ri-file-user-line"></i>
                                      </div>
                                      <div class="media-body ml-3">
                                        <h6 class="mb-0 ">{{ $t('nav.user.profileTitle') }}</h6>
                                        <p class="mb-0 font-size-12">{{ $t('nav.user.profileSub') }}</p>
                                      </div>
                                    </div>
                                  </a>
                                  <a href="#" class="iq-sub-card iq-bg-primary-hover">
                                    <div class="media align-items-center">
                                      <div class="rounded iq-card-icon iq-bg-primary">
                                        <i class="ri-profile-line"></i>
                                      </div>
                                      <div class="media-body ml-3">
                                        <h6 class="mb-0 ">{{ $t('nav.user.profileEditTitle') }}</h6>
                                        <p class="mb-0 font-size-12">{{ $t('nav.user.profileEditSub') }}</p>
                                      </div>
                                    </div>
                                  </a>
                                  <router-link :to="{name: 'userSettings'}" href="#" class="iq-sub-card iq-bg-primary-hover">
                                    <div class="media align-items-center">
                                      <div class="rounded iq-card-icon iq-bg-primary">
                                        <i class="ri-account-box-line"></i>
                                      </div>
                                      <div class="media-body ml-3">
                                        <h6 class="mb-0 ">{{ $t('nav.user.accountSettingTitle') }}</h6>
                                        <p class="mb-0 font-size-12">{{ $t('nav.user.accountSettingSub') }}</p>
                                      </div>
                                    </div>
                                  </router-link>
                                  <a href="#" class="iq-sub-card iq-bg-primary-hover">
                                    <div class="media align-items-center">
                                      <div class="rounded iq-card-icon iq-bg-primary">
                                        <i class="ri-lock-line"></i>
                                      </div>
                                      <div class="media-body ml-3">
                                        <h6 class="mb-0 ">{{ $t('nav.user.privacySettingTitle') }}</h6>
                                        <p class="mb-0 font-size-12">{{ $t('nav.user.privacySettingSub')}}</p>
                                      </div>
                                    </div>
                                  </a>
                                  <div class="d-inline-block w-100 text-center p-3">
                                    <a class="bg-primary iq-sign-btn" href="javascript:void(0)" @click="logout" role="button">{{ $t('nav.user.signout') }}<i class="ri-login-box-line ml-2"></i></a>
                                  </div>
                                </div>
                              </div>
                            </div>-->
            </li>
          </ul>
        </template>
        <template slot="right">
          <ul class="navbar-list">
            <li class="" v-nav-toggle>
              <a href="#" class="search-toggle iq-waves-effect d-flex align-items-center rounded pr-1 pt-2">
                <div class="caption mr-3">
                  <h6 class="mb-0 line-height text-primary">{{ userData.name }}</h6>
                  <span class="font-size-12 text-success" >{{ userData.service_types }}</span>
                </div>
              </a>
            </li>
          </ul>
        </template>
      </DefaultNavBar>
      <!-- TOP Nav Bar END -->
    <div id="content-page" class="content-page">
<!--        <b-container fluid="" v-if="!notBookmarkRouts.includes($route.name)">
          <b-row>
            <BreadCrumb />
          </b-row>
        </b-container>-->
        <transition name="router-anim" :enter-active-class="`animated ${animated.enter}`" mode="out-in"
                    :leave-active-class="`animated ${animated.exit}`">
          <router-view/>
        </transition>
      </div>
      <LayoutFixRightSide v-if="$route.name === 'dashboard.home-1' " />
    </div>
    <LayoutFooter />
  </div>
</template>
<script>
import { core } from '../config/pluginInit'
import { Users } from '../FackApi/api/chat'
import { mapActions, mapGetters } from 'vuex'
import Loader from '../components/core/loader/Loader'
import Sidebar from '../components/core/sidebars/Sidebar'
import DefaultNavBar from '../components/core/navbars/DefaultNavBar'
import SideBarItems from '../FackApi/json/SideBar'
import profile from '../assets/images/user/user-09.jpg'
// eslint-disable-next-line import/no-duplicates
import loader from '../assets/images/logo.png'
// eslint-disable-next-line import/no-duplicates
import darkLoader from '../assets/images/logo.png'
/*
import Lottie from '../components/core/lottie/Lottie'
*/
// import Customizer from './Components/Customizer'
import LayoutFixRightSide from './Components/LayoutFixRightSide'
// eslint-disable-next-line import/no-duplicates
import WhiteLogo from '../assets/images/logo.png'
import SmallSidebar from '../components/core/sidebars/SmallSidebar'
/*
import BreadCrumb from '../components/core/breadcrumbs/BreadCrumb'
*/
import LayoutFooter from './Components/LayoutFooter'
export default {
  name: 'VerticleLayout',
  data () {
    return {
      userData: JSON.parse(localStorage.getItem('userInfo')),
      ifSearch: false,
      notFoundImage: require('../assets/images/error/search.png'),
      infiniteId: +new Date(),
      getNotifications: [],
      notification_unread: '',
      animated: { enter: 'fadeInUp', exit: 'fadeOut' },
      verticalMenu: SideBarItems,
      userProfile: profile,
      onlyLogo: false,
      onlyLogoText: false,
      sidebarGroupTitle: true,
      logo: loader,
      usersList: Users,
      rtl: false,
      SmallSidebarLogo: WhiteLogo,
      theme: 'dark',
      message: [
        { image: require('../assets/images/user/user-01.jpg'), name: 'Nik Emma Watson', date: '13 jan' },
        { image: require('../assets/images/user/user-02.jpg'), name: 'Greta Life', date: '14 Jun' },
        { image: require('../assets/images/user/user-03.jpg'), name: 'Barb Ackue', date: '16 Aug' },
        { image: require('../assets/images/user/user-04.jpg'), name: 'Anna Sthesia', date: '21 Sept' },
        { image: require('../assets/images/user/user-05.jpg'), name: 'Bob Frapples', date: '29 Sept' }
      ],
      notification: [
        { image: require('../assets/images/user/user-01.jpg'), name: 'Nik Emma Watson', date: '23 hour ago', description: 'Enjoy smart access to videos, games' },
        { image: require('../assets/images/user/user-02.jpg'), name: 'Greta Life', date: '14 hour ago', description: 'Google Chromecast: Enjoy a world of entertainment' },
        { image: require('../assets/images/user/user-03.jpg'), name: 'Barb Ackue', date: '16 hour ago', description: 'Dell Inspiron Laptop: Get speed and performance from' },
        { image: require('../assets/images/user/user-04.jpg'), name: 'Anna Sthesia', date: '21 hour ago', description: 'Deliver your favorite playlist anywhere in your home ' },
        { image: require('../assets/images/user/user-05.jpg'), name: 'Bob Frapples', date: '11 hour ago', description: 'MacBook Air features up to 8GB of memory, a fifth-generation' }
      ],
      notBookmarkRouts: [
        'dashboard.home-1',
        'dashboard.home-2',
        'dashboard.home-3',
        'dashboard.home-4',
        'dashboard.home-5',
        'dashboard.home-6'
      ],
      currentPage: 2,
      readNotification: ''
    }
  },
  components: {
    LayoutFooter,
    LayoutFixRightSide,
    /* Lottie */
    Loader,
    Sidebar,
    DefaultNavBar,
    SmallSidebar
    /*
    BreadCrumb
*/
  },
  mounted () {
    this.layoutSetting(this.$route.name)
    /* this.$store.dispatch('getUserNotification', 1).then(res => {
      this.getNotifications = res.data.data.notification.data
      this.notification_unread = res.data.data.notification_unread
    }) */
  },
  computed: {
    ...mapGetters({
      /* cartCount: 'Ecommerce/cartCountState',
      cartItems: 'Ecommerce/cartState', */
      selectedLang: 'Setting/langState',
      langsOptions: 'Setting/langOptionState',
      darkMode: 'Setting/darkModeState',
      rtlMode: 'Setting/rtlModeState',
      colors: 'Setting/colorState'
      /* getDefaultProject: 'getDefaultProject' */
    }),
    toggleSideIcon () {
      let show = true
      switch (this.$route.name) {
        case 'dashboard.home-3':
        case 'dashboard.home-4':
        case 'dashboard.home-5':
        case 'dashboard.home-6':
          show = false
          break
      }
      return show
    }
  },
  watch: {
    $route: function (to, from) {
      this.layoutSetting(to.name)
    }
  },
  // sidebarTicket
  methods: {
    themeMode (mode) {
      this.dark = mode
      this.modeChange({ rtl: this.rtl, dark: mode })
      if (mode) {
        this.logo = darkLoader
        this.theme = 'light'
      } else {
        this.logo = loader
        this.theme = 'dark'
      }
      this.$emit('onLogo', this.logo)
    },
    layoutSetting (routeName) {
      this.modeChange({ rtl: this.rtlMode, dark: this.darkMode })
      this.onlyLogo = true
      this.onlyLogoText = true
      this.sidebarGroupTitle = true
      switch (routeName) {
        case 'dashboard.home-5':
          this.onlyLogoText = true
          this.onlyLogo = false
          break
        case 'dashboard.home-6':
          this.logo = WhiteLogo
          this.onlyLogo = true
          this.onlyLogoText = false
          this.sidebarGroupTitle = false
          break
        default:
          if (this.darkMode) {
            this.logo = darkLoader
          } else {
            this.logo = loader
          }
          break
      }
    },
    changeLogo (e) {
      this.logo = e
    },
    sidebarMini () {
      core.triggerSet()
      this.$store.dispatch('Setting/miniSidebarAction')
    },
    logout () {
      /* this.$store.dispatch('logout').then(() => {
        localStorage.removeItem('user_info')
        localStorage.removeItem('auth_permissions')
        localStorage.removeItem('access_token')
        localStorage.removeItem('user_permissions')
        localStorage.removeItem('user_roles')
        localStorage.removeItem('user_projects')
        this.$router.push({ name: 'auth1.sign-in1' })
      }) */
    },
    langChange (lang) {
      this.langChangeState(lang)
      this.$i18n.locale = lang.value
      document.getElementsByClassName('iq-show')[0].classList.remove('iq-show')
      if (lang.value === 'ar') {
        this.rtlAdd(lang)
      } else {
        this.rtlRemove(lang)
      }
    },
    routerAnimationChange (e) {
      this.animated = e
    },
    ...mapActions({
      removeToCart: 'Ecommerce/removeToCartAction',
      langChangeState: 'Setting/setLangAction',
      rtlAdd: 'Setting/setRtlAction',
      rtlRemove: 'Setting/removeRtlAction',
      modeChange: 'Setting/layoutModeAction'
    }),
    changeStatus (id, item) {
      item.read = 1
      if (item.setting.key === 'create_discount') {
        this.$router.push({ name: 'accounting', query: { key: item.object_id } })
      } else if (item.setting.key === 'discount_approve') {
        this.$router.push({ name: 'accounting', query: { key: item.object_id } })
      } else if (item.setting.key === 'refund_request') {
        this.$router.push({ name: 'accountingRefund', query: { key: item.object_id } })
      } else if (item.setting.key === 'refund_change_status') {
        this.$router.push({ name: 'accountingRefund', query: { key: item.object_id } })
      } else if (item.setting.key === 'refund_done') {
        this.$router.push({ name: 'accountingRefund', query: { key: item.object_id } })
      } else if (item.setting.key === 'transfer_request') {
        this.$router.push({ name: 'accountingTransfer', query: { key: item.object_id } })
      } else if (item.setting.key === 'transfer_status') {
        this.$router.push({ name: 'accountingTransfer', query: { key: item.object_id } })
      } else if (item.setting.key === 'task_request') {
        this.$router.push({ name: 'task', query: { key: item.object_id } })
      }
      /*      this.$store.dispatch('changeNotificationStatus', id).then(res => {
        this.readNotification = id
        // eslint-disable-next-line eqeqeq
        if (this.notification_unread != 0) {
          this.notification_unread--
        } else {
          this.notification_unread = 0
        }
      }) */
    },
    loadMore () {
      /* this.$store.dispatch('getUserNotification', this.currentPage++).then(res => {
        if (res.data.data.notification.data.length > 0) {
          this.getNotifications = this.getNotifications.concat(res.data.data.notification.data)
        }
      }) */
    },
    infiniteHandler ($state) {
      /*      this.$store.dispatch('getUserNotification', this.currentPage).then(res => {
        if (res.data.data.notification.data.length > 0) {
          this.getNotifications = this.getNotifications.concat(res.data.data.notification.data)
          $state.loaded()
          this.currentPage++
        } else {
          $state.complete()
        }
      }) */
    }
  }
/*  created () {
    channel.channel.bind('my-event', (data) => {
      this.getNotifications = data.data
      this.notification_unread = data.notification_unread
      this.currentPage = 2
    })
  } */
}
</script>
<style>
  @import url("../assets/css/custom.css");
  @import url("../assets/css/PriceSlider.css");
  .unread{
    left: -16px;
    top: 5px;
    font-size: 9px;
  }
  .mark {
    background-color: #e3e5fc !important;
  }
  .allNotifications {
    overflow: auto;
    height: 30rem;
  }
</style>
