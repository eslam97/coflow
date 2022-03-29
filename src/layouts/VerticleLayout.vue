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
                <img :src="userProfile" class="img-fluid rounded_image" alt="user" style="background-color: #f2f2f2">
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
<!--            <li class="nav-item" v-nav-toggle>
              <a class="search-toggle iq-waves-effect language-title" href="#"><img :src="selectedLang.image" alt="img-flaf" class="img-fluid mr-1" style="height: 16px; width: 16px;" /> {{ selectedLang.title }} <i class="ri-arrow-down-s-line"></i></a>
              <div class="iq-sub-dropdown">
                <a class="iq-sub-card" href="javascript:void(0)" v-for="(lang, i) in langsOptions" :key="`Lang${i}`" @click="langChange(lang)">
                  <img :src="lang.image" alt="img-flaf" class="img-fluid mr-2" />{{ lang.title }}
                </a>
              </div>
            </li>-->
<!--            <li class="nav-item" v-nav-toggle>
              <a href="javascript:void(0)" class="iq-waves-effect" :class="cartCount > 0 ? 'search-toggle' : ''">
                <i class="ri-shopping-cart-2-line" />
                <span class="menu-tag ml-2">{{ cartCount }}</span>
              </a>
              <div class="iq-sub-dropdown">
                <div class="iq-card shadow-none m-0">
                  <div class="iq-card-body p-0 ">
                    <div class="bg-primary p-3">
                      <h5 class="mb-0 text-white">{{ $t('nav.allCarts') }}</h5>
                    </div>
                    <div class="iq-sub-card" v-for="(item, index) in cartItems" :key="index">
                      <div class="media align-items-center">
                        <div class="w-20 text-center d-none justify-content-center d-md-block">
                          <img :src="item.image" :alt="item.name" class="w-100 align-self-center mr-3" />
                        </div>
                        <div class="media-body ml-3">
                          <b-button variant=" iq-bg-danger mt-3" size="sm" class="float-right" @click="removeToCart(item)">X</b-button>
                          <h6 class="mb-0 ">{{ item.name.substring(0,20) + '...' }}</h6>
                          <p class="mb-0 font-size-12">{{ item.description.substring(0,20) + '...' }}</p>
                          <p class="mb-0"><b>$ {{ item.price }}</b></p>
                        </div>
                      </div>
                    </div>
                    <router-link :to="{ name: 'app.e-commerce.cart'}"><b-button variant=" iq-bg-primary" block><i class="fas fa-cart-plus"/>{{ $t('nav.viewCarts') }}</b-button></router-link>
                  </div>
                </div>
              </div>
            </li>-->
<!--            <li class="nav-item px-0">
            <a href="#" class="search-toggle px-2 iq-waves-effect">
              <i class="las la-sun font-size-24" v-if="theme == 'light'" @click="themeMode(false)"></i>
              <i class="las la-moon font-size-24" v-else @click="themeMode(true)"></i>
            </a>
          </li>
            <li class="nav-item px-0" @click="ifSearch = !ifSearch">
              <a href="#" class="search-toggle px-2 iq-waves-effect">
                <i v-if="ifSearch === false" class="las la-search font-size-22"></i>
                <i v-else class="las la-times font-size-22"></i>
              </a>
            </li >
            <li class="nav-item px-0" v-nav-toggle>
              <a href="#" class="search-toggle px-2 iq-waves-effect font-size-22">
                <lottie :option="require('../assets/images/small/lottie-bell')" id="lottie-beil" />
                <span class="bg-danger dots" v-if="notification_unread"></span>
              </a>
              <div class="iq-sub-dropdown">
                <div class="iq-card shadow-none m-0">
                  <div class="iq-card-body p-0 ">
                    <div class="bg-primary p-3">
                      <h5 class="mb-0 text-white">{{ $t('nav.allNotifications') }}<small class="badge  badge-light float-right pt-1">{{ notification_unread }}</small></h5>
                    </div>
                    <div class="allNotifications" id="infinite-list">
                      <span v-if="getNotifications.length > 0">
                      <a href="#" class="iq-sub-card" v-for="(item, index) in getNotifications" :key="index" @click="changeStatus(item.id , item)" :class="item.read == 0 ? 'mark' : 'unmark'">
                      <div class="media align-items-center">
&lt;!&ndash;                        <div class="">
                          <img class="avatar-40 rounded" :src="item.image" alt="img">
                        </div>&ndash;&gt;
                        <div class="media-body ml-3 position-relative">
                          <h6 class="mb-0 "> <i v-if="item.read == 0" class="ri-checkbox-blank-circle-fill text-primary position-absolute unread"></i>{{ item.title }}</h6>
                          <small class="float-right font-size-12">{{ item.published }}</small>
                          <p class="mb-0">{{ item.body ? item.body.substring(0,40) + '...' : 'NO body' }}</p>
                        </div>
                      </div>
                    </a>
                        <infinite-loading :identifier="infiniteId" @infinite="infiniteHandler">
                            <div slot="no-more">No more Notification</div>
                            <div slot="no-results">No Notification</div>
                        </infinite-loading>
                    </span>
                      <span v-else class="d-flex justify-content-center align-items-center h-100 w-100" style="height: 100%">
                        <div class="text-center">
                           <img class="w-75" :src="notFoundImage"/>
                          <p class="font-size-20 text-center">Oops!... no notfications found</p>
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </li>-->
          </ul>
        </template>
        <template slot="right">
          <ul class="navbar-list">
            <li class="nav-item px-0 d-block d-lg-none" v-nav-toggle>
              <a href="#" class="search-toggle px-2 iq-waves-effect font-size-22">
                <i class="las la-building"></i>
              </a>
              <div class="iq-sub-dropdown">
                <a class="iq-sub-card text-primary" href="javascript:void(0)" v-for="(data, key) in allProjects" :key="key" @click="setDefaultProject(data.id)">
                  {{ data.en_title }}
                </a>
              </div>
            </li>
            <li class="" v-nav-toggle>
              <a href="#" class="search-toggle iq-waves-effect d-flex align-items-center rounded pr-1 pt-2">
                <div class="caption mr-3">
                  <h6 class="mb-0 line-height text-primary">{{ userName.username }}</h6>
                  <span class="font-size-12 text-success" >Flow</span>
                </div>
              </a>
              <!--              <div class="iq-sub-dropdown">
                              <a class="iq-sub-card text-primary" href="javascript:void(0)" v-for="(data, key) in allProjects" :key="key" @click="setDefaultProject(data.id)">
                              {{ data.en_title }}
                              </a>
                            </div>-->
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
import channel from '../pusher'
export default {
  name: 'VerticleLayout',
  data () {
    return {
      ifSearch: false,
      projectId: JSON.parse(localStorage.getItem('default_project')).id,
      allProjects: JSON.parse(localStorage.getItem('user_projects')),
      notFoundImage: require('../assets/images/error/search.png'),
      infiniteId: +new Date(),
      getNotifications: [],
      notification_unread: '',
      userName: JSON.parse(localStorage.getItem('user_info')),
      defaultProject: JSON.parse(localStorage.getItem('default_project')).en_title,
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
    this.$store.dispatch('getUserNotification', 1).then(res => {
      this.getNotifications = res.data.data.notification.data
      this.notification_unread = res.data.data.notification_unread
    })
  },
  computed: {
    ...mapGetters({
      cartCount: 'Ecommerce/cartCountState',
      cartItems: 'Ecommerce/cartState',
      selectedLang: 'Setting/langState',
      langsOptions: 'Setting/langOptionState',
      darkMode: 'Setting/darkModeState',
      rtlMode: 'Setting/rtlModeState',
      colors: 'Setting/colorState',
      getDefaultProject: 'getDefaultProject'
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
    setDefaultProject (id) {
      this.$store.dispatch('setDefaultProject', id).then(data => {
        core.showSnackbar('success', data.data.message)
        localStorage.setItem('default_project', JSON.stringify(data.data.data))
        this.$store.commit('changeDefaultProject', data.data.data)
        this.$router.push({ name: 'dashboard.home-2' })
      })
    },
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
      this.$store.dispatch('logout').then(() => {
        localStorage.removeItem('user_info')
        localStorage.removeItem('auth_permissions')
        localStorage.removeItem('access_token')
        localStorage.removeItem('user_permissions')
        localStorage.removeItem('user_roles')
        localStorage.removeItem('user_projects')
        this.$router.push({ name: 'auth1.sign-in1' })
      })
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
      this.$store.dispatch('changeNotificationStatus', id).then(res => {
        this.readNotification = id
        // eslint-disable-next-line eqeqeq
        if (this.notification_unread != 0) {
          this.notification_unread--
        } else {
          this.notification_unread = 0
        }
      })
    },
    loadMore () {
      this.$store.dispatch('getUserNotification', this.currentPage++).then(res => {
        if (res.data.data.notification.data.length > 0) {
          this.getNotifications = this.getNotifications.concat(res.data.data.notification.data)
        }
      })
    },
    infiniteHandler ($state) {
      this.$store.dispatch('getUserNotification', this.currentPage).then(res => {
        if (res.data.data.notification.data.length > 0) {
          this.getNotifications = this.getNotifications.concat(res.data.data.notification.data)
          $state.loaded()
          this.currentPage++
        } else {
          $state.complete()
        }
      })
    }
  },
  created () {
    channel.channel.bind('my-event', (data) => {
      this.getNotifications = data.data
      this.notification_unread = data.notification_unread
      this.currentPage = 2
    })
  }
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
