import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import SideBarItems from '../../FackApi/json/GlobalSearch'

const state = {
  horizontalMenu: false,
  miniSidebarMenu: false,
  lang: { title: 'English', value: 'en', image: require('../../assets/images/small/flag-01.png') },
  langOption: [
    { title: 'English', value: 'en', image: require('../../assets/images/small/flag-01.png') },
    { title: 'Arabic', value: 'ar', image: require('../../assets/images/small/flag-500.png') },
    { title: 'Chinese', value: 'chi', image: require('../../assets/images/small/flag-300.png') },
    { title: 'Hindi', value: 'hi', image: require('../../assets/images/small/flag-100.png') },
    { title: 'Greek', value: 'gr', image: require('../../assets/images/small/flag-400.png') },
    { title: 'Franch', value: 'fr', image: require('../../assets/images/small/flag-200.png') }
  ],
  colors: [
    { primary: '#827af3', primaryLight: '#b47af3', bodyBgLight: '#efeefd', bodyBgDark: '#1d203f' },
    { primary: '#e07af3', primaryLight: '#f37ab7', bodyBgLight: '#f7eefd', bodyBgDark: '#1d203f' },
    { primary: '#6475c7', primaryLight: '#7abbf3', bodyBgLight: '#eaf5ff', bodyBgDark: '#1d203f' },
    { primary: '#c76464', primaryLight: '#f3c37a', bodyBgLight: '#fff8ea', bodyBgDark: '#1d203f' },
    { primary: '#c764ad', primaryLight: '#de8ba9', bodyBgLight: '#ffeaf5', bodyBgDark: '#1d203f' },
    { primary: '#64c7ac', primaryLight: '#a3f37a', bodyBgLight: '#f0ffea', bodyBgDark: '#1d203f' },
    { primary: '#8ac764', primaryLight: '#dbf37a', bodyBgLight: '#f7ffea', bodyBgDark: '#1d203f' }
  ],
  authUser: {
    auth: false,
    authType: false,
    user: {}
  },
  users: [
    {
      id: 'sh46s546sdg564sdffs4hsd6fh',
      name: 'Admin Demo',
      mobileNo: null,
      email: 'admin@demo.com',
      profileImage: null,
      password: 'admin123'
    }
  ],
  globalSearch: SideBarItems,
  bookmark: [
    {
      title: 'Dashboard',
      link: { name: 'dashboard.home-2' },
      is_icon_class: true,
      icon: 'las la-home'
    },
    {
      title: 'leads',
      link: { name: 'leads' },
      is_icon_class: true,
      icon: 'las la-shield-alt'
    },
    {
      title: 'Reports',
      link: { name: 'reports' },
      is_icon_class: true,
      icon: 'las la-file'
    },
    {
      title: 'Desk',
      link: { name: 'desk' },
      is_icon_class: true,
      icon: 'las la-desktop'
    },
    {
      title: 'Members',
      link: { name: 'checkInOut' },
      is_icon_class: true,
      icon: 'las la-users'
    }

  ],
  activePage: {
    name: 'Dashboard',
    breadCrumb: [
      {
        html: '<i class="ri-home-4-line mr-1 float-left"></i>Home',
        to: { name: 'dashboard.home-2' }
      },
      {
        text: '',
        href: '#'
      }
    ]
  },
  layoutMode: {
    dark: false,
    rtl: false,
    sidebar: ''
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
