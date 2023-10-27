<template>
  <div>
    <main-modal id="bugModal" size="lg">
      <template v-slot:header>
        <h4 class="font-weight-bold"><span class="text-warning">Feedback: </span> Form</h4>
      </template>
      <template v-slot:body>
        <bug-form @addReport="addReport"
                  :requestLoading="requestLoading"
                  :report="report"/>
      </template>
    </main-modal>
    <main-modal id="faqList" size="lg">
      <template v-slot:header>
        <h4 class="font-weight-bold"><span class="text-warning">FAQ's </span></h4>
      </template>
      <template v-slot:body>
        <faq-popup/>
      </template>
    </main-modal>
    <Loader/>
    <!--    <Customizer @onLogo="changeLogo" @toggle="sidebarMini" @animationChange="routerAnimationChange" />-->
    <div class="wrapper">
        <b-sidebar id="sidebar-1" bg-variant="white" right backdrop no-header-close @change="toggleBodyScrollbar">
            <div v-if="getNotifications.length > 0">
                <ul class="notification-list p-0">
                    <li v-for="(item, index) in getNotifications" :key="index" class="border-bottom py-2 px-3">
                        <div class="d-flex align-items-center">
                            <div class="rounded-icon mr-2" v-if="item.title === 'Track Alert'">
                                <img src="@/assets/images/dashboard/Trackers@4x.png" class="w-20px" />
                            </div>
                            <div class="rounded-icon mr-2" v-else>
                                <i class="las la-heart text-danger"></i>
                            </div>
                            <div>
                                <template>
                                    <p class="m-0 text-gray font-size-12">{{ item.title }}</p>
                                    <p class="m-0 text-black font-size-14">{{ item.body }}</p>
                                </template>
                                <span class="m-0 text-gray font-size-10 mt-4">{{ item.created_at ? item.created_at : 'Now' }}</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div v-else class="h-100 d-flex justify-content-center align-items-center flex-column">
                <img src="@/assets/images/notify.png" alt="notify" class="w-250px"/>
                <p class="font-size-18">No Notification</p>
            </div>
        </b-sidebar>
      <!-- Sidebar  -->
      <SmallSidebar v-if="$route.name === 'dashboard.home-5'" :logo="SmallSidebarLogo" @toggle="sidebarMini"/>
      <Sidebar :items="verticalMenu" :logo="logo" :onlyLogo="onlyLogo" :onlyLogoText="onlyLogoText"
               @toggle="sidebarMini" :toggleButton="toggleSideIcon" :sidebarGroupTitle="sidebarGroupTitle"/>
      <!-- TOP Nav Bar -->
      <DefaultNavBar :ifSearch='ifSearch' title="Dashboard" :homeURL="{ name: 'dashboard.home-2' }"
                     :sidebarGroupTitle="sidebarGroupTitle" @toggle="sidebarMini" :logo="logo">
        <template slot="responsiveRight">
          <ul class="navbar-nav ml-auto navbar-list">
            <li class="nav-item px-0 mr-3 list-actions cursor-pointer" @click="openFaqPopup">
              <i class="las la-question-circle" alt="FAQ"></i>
            </li>
            <li class="nav-item px-0 mr-3 list-actions cursor-pointer" @click="openBugPopup">
              <i class="las la-bug"></i>
            </li>
            <li class="nav-item px-0 mr-3 list-actions cursor-pointer" v-b-toggle.sidebar-1 @click="newNotification = false">
                <i class="las la-bell"></i>
                <span class="bg-danger dots" v-if="newNotification"></span>
            </li>
            <li class="" v-nav-toggle>
              <a href="#" class="search-toggle iq-waves-effect d-flex align-items-center rounded pl-0">
                <img :src="userData.logo ? userData.logo : require('@/assets/images/user/default-user-image.png')"
                     class="img-fluid rounded_image" alt="user" style="background-color:#f2f2f2">
              </a>
            </li>
          </ul>
        </template>
        <template slot="right">
          <ul class="navbar-list">
            <li class="" v-nav-toggle>
              <a href="#" class="search-toggle iq-waves-effect d-flex align-items-center rounded pr-1 pt-2">
                <div class="caption mr-3">
                  <h6 class="mb-0 line-height text-primary">{{ userData.name }}</h6>
                  <span class="font-size-12 text-success">{{ userData.service_types }}</span>
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
      <LayoutFixRightSide v-if="$route.name === 'dashboard.home-1' "/>
    </div>
    <LayoutFooter/>
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
import BugForm from '@/layouts/Components/bugForm'
import FaqPopup from '@/layouts/Components/faqPopup'

import firebaseMixins from '@/mixins/firebaseMixins'
import feedbackService from '@/modules/superAdmin/feedback/services/feedback'
export default {
  name: 'VerticalLayout',
  mixins: [firebaseMixins],
  data () {
    return {
      userData: JSON.parse(localStorage.getItem('userInfo')),
      ifSearch: false,
      notFoundImage: require('../assets/images/error/search.png'),
      infiniteId: +new Date(),
      notification_unread: '',
      animated: {
        enter: 'fadeInUp',
        exit: 'fadeOut'
      },
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
        {
          image: require('../assets/images/user/user-01.jpg'),
          name: 'Nik Emma Watson',
          date: '13 jan'
        },
        {
          image: require('../assets/images/user/user-02.jpg'),
          name: 'Greta Life',
          date: '14 Jun'
        },
        {
          image: require('../assets/images/user/user-03.jpg'),
          name: 'Barb Ackue',
          date: '16 Aug'
        },
        {
          image: require('../assets/images/user/user-04.jpg'),
          name: 'Anna Sthesia',
          date: '21 Sept'
        },
        {
          image: require('../assets/images/user/user-05.jpg'),
          name: 'Bob Frapples',
          date: '29 Sept'
        }
      ],
      notification: [
        {
          image: require('../assets/images/user/user-01.jpg'),
          name: 'Nik Emma Watson',
          date: '23 hour ago',
          description: 'Enjoy smart access to videos, games'
        },
        {
          image: require('../assets/images/user/user-02.jpg'),
          name: 'Greta Life',
          date: '14 hour ago',
          description: 'Google Chromecast: Enjoy a world of entertainment'
        },
        {
          image: require('../assets/images/user/user-03.jpg'),
          name: 'Barb Ackue',
          date: '16 hour ago',
          description: 'Dell Inspiron Laptop: Get speed and performance from'
        },
        {
          image: require('../assets/images/user/user-04.jpg'),
          name: 'Anna Sthesia',
          date: '21 hour ago',
          description: 'Deliver your favorite playlist anywhere in your home '
        },
        {
          image: require('../assets/images/user/user-05.jpg'),
          name: 'Bob Frapples',
          date: '11 hour ago',
          description: 'MacBook Air features up to 8GB of memory, a fifth-generation'
        }
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
      readNotification: '',
      requestLoading: false,
      report: {},
      newNotification: true
    }
  },
  components: {
    FaqPopup,
    BugForm,
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
      this.modeChange({
        rtl: this.rtl,
        dark: mode
      })
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
      this.modeChange({
        rtl: this.rtlMode,
        dark: this.darkMode
      })
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
        this.$router.push({
          name: 'accounting',
          query: { key: item.object_id }
        })
      } else if (item.setting.key === 'discount_approve') {
        this.$router.push({
          name: 'accounting',
          query: { key: item.object_id }
        })
      } else if (item.setting.key === 'refund_request') {
        this.$router.push({
          name: 'accountingRefund',
          query: { key: item.object_id }
        })
      } else if (item.setting.key === 'refund_change_status') {
        this.$router.push({
          name: 'accountingRefund',
          query: { key: item.object_id }
        })
      } else if (item.setting.key === 'refund_done') {
        this.$router.push({
          name: 'accountingRefund',
          query: { key: item.object_id }
        })
      } else if (item.setting.key === 'transfer_request') {
        this.$router.push({
          name: 'accountingTransfer',
          query: { key: item.object_id }
        })
      } else if (item.setting.key === 'transfer_status') {
        this.$router.push({
          name: 'accountingTransfer',
          query: { key: item.object_id }
        })
      } else if (item.setting.key === 'task_request') {
        this.$router.push({
          name: 'task',
          query: { key: item.object_id }
        })
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
    },
    openFaqPopup () {
      this.$bvModal.show('faqList')
    },
    openBugPopup () {
      this.$bvModal.show('bugModal')
    },
    addReport (report) {
      this.requestLoading = true
      feedbackService.addFeedBacks(report).then(() => {
        this.$bvModal.hide('bugModal')
      }).finally(() => {
        this.requestLoading = false
      })
    },
    toggleBodyScrollbar (visible) {
      const body = document.getElementsByTagName('body')[0]

      if (visible) { body.classList.add('overflow-hidden') } else { body.classList.remove('overflow-hidden') }
    }
  },
  created () {
    /* channel.channel.bind('my-event', (data) => {
      this.getNotifications = data.data
      this.notification_unread = data.notification_unread
      this.currentPage = 2
    }) */
    // LayoutServices.filterNotification().then(res => {
    //   console.log('allllllll', res.data.data)
    //   this.all = res.data.data
    // })
  }
}
</script>
<style>
@import url("../assets/css/custom.css");
@import url("../assets/css/PriceSlider.css");

.unread {
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

@media (max-width: 479px) {
  .iq-navbar-custom {
    padding-right: 0px !important;
  }

  .menu-icons > li > i {
    font-size: 24px !important;
    margin-left: auto !important;
  }
}

@media (max-width: 1200px) {
  .menu-icons {
    margin-left: auto !important;
  }
}

.menu-icons {
  font-size: 32px;
  margin-left: 300px;
}

.menu-icons li {
  margin-right: 30px;
}

.menu-icons li:hover {
  color: var(--iq-amber);
  cursor: pointer;
}
.list-actions {
  font-size: 27px;
  display: flex;
  align-items: center;
}
.rounded-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #f5f1f1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
}
.b-sidebar-outer {
z-index: 10 !important;
}
.b-sidebar {
    top: 71px;
    height: calc(100vh - 71px) !important;
}
.w-250px {
    width: 250px;
}
.w-20px{
    width: 20px;
}
</style>
