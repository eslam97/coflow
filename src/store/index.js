import Vue from 'vue'
import Vuex from 'vuex'
import revenue from '../services/Revenue/revenue'
import User from './Users/moduleUsers'
import Setting from './Setting/index'
import Ecommerce from './Ecommerce/index'
import Auth from './auth/moduleAuth'
import EnterPrises from './Enterprice/moduleEnterprises'
import Projects from './Projects/moduleProjects'
import Roles from './Roles/moduleRoles'
import Leads from './Leads/moduleLeads'
import Sources from './Sources/moduleSources'
import CallStatus from './CallStatus/moduleCallStatus'
import Inquiries from './Inquiries/moduleInquiries'
import Departments from './Departments/moduleDepartments'
import Permissions from './Permissions/modulePermissions'
import CallCenter from './CallCenter/moduleCallCenter'
import PackageSettings from './packageSetting/modulePackageSetting'
import systemSettings from './systemSettings/moduleSystemSetting'
import AccountsSettings from './AccountsCategories/moduleAccounts'
import MemberShip from './MemberShip/moduleMemberShip'
import Tasks from './Tasks/moduleTaskCategory'
import Complains from './Complains/moduleComplain'
import Tree from './tree/moduleTree'
import Target from './target/moduleTarget'

// eslint-disable-next-line no-unused-vars

import Frezz from './Frezze/moduleFrezze'
import restore from './Restore/moduleRestore'

/* const MemberShip = () => import('./MemberShip/moduleMemberShip') */

import Reports from './Reports/moduleReports'
import Refund from './Refund/moduleRefund'
import Notification from './Notifications/moduleNotification'
import Transfer from './Transfer/moduleTranfer'
import whatsappSettings from './Whatsapp/moduleWhatsapp'
import GroupsAndPermissions from './GroupsAndPermissions/moduleGroupsAndPermission'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    User,
    Setting,
    Ecommerce,
    Auth,
    Projects,
    Roles,
    Leads,
    Sources,
    CallStatus,
    Inquiries,
    Departments,
    Permissions,
    CallCenter,
    PackageSettings,
    systemSettings,
    AccountsSettings,
    MemberShip,
    Frezz,
    EnterPrises,
    Reports,
    Refund,
    Notification,
    Transfer,
    whatsappSettings,
    GroupsAndPermissions,
    restore,
    Tasks,
    Complains,
    Tree,
    Target
  },
  state: {
    shobraBranch: {},
    manialBranch: {},
    nasrcityBranch: {},
    newPassword: '',
    allNotifications: {},
    default_project: ''
  },
  mutations: {
    shobra (state, payload) {
      state.shobraBranch = payload
    },
    nasrCity (state, payload) {
      state.nasrcityBranch = payload
    },
    manial (state, payload) {
      state.manialBranch = payload
    },
    setNotifications (state, payload) {
      state.allNotifications = payload
    },
    changeDefaultProject (state, payload) {
      // console.log(payload)
      state.default_project = payload
    }
  },
  actions: {
    getAllRevenue ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        revenue.shobraBranch(payload.startDate, payload.endDate).then(res => {
          commit('shobra', { branch: 'Shobra', ...res.data.data, netprofitwithdraw: res.data.data.netprofit - res.data.data.withdraw })
          revenue.manialBranch(payload.startDate, payload.endDate).then(res => {
            commit('manial', { branch: 'Manial', ...res.data.data, netprofitwithdraw: res.data.data.netprofit - res.data.data.withdraw })
            revenue.nasrcityBranch(payload.startDate, payload.endDate).then(res => {
              commit('nasrCity', { branch: 'nasrCity', ...res.data.data, netprofitwithdraw: res.data.data.netprofit - res.data.data.withdraw })
              resolve(res)
            })
          })
        }).catch(error => {
          // console.log(error.response)
          reject(error)
        })
      })
    },
    getAllNotificationss ({ commit }, payload) {
      return new Promise(() => {
        commit('setNotifications', payload)
      })
    }
  },
  getters: {
    getDefaultProject: state => {
      return state.default_project
    },
    getAllNotifications: state => {
      return state.allNotifications
    },
    getShobra: state => {
      return state.shobraBranch
    },
    getNasrCity: state => {
      return state.nasrcityBranch
    },
    getManial: state => {
      return state.manialBranch
    },
    getAllRevunue: state => {
      return [state.shobraBranch, state.nasrcityBranch, state.manialBranch, {
        _rowVariant: 'primary',
        branch: 'Total',
        cash: state.manialBranch.cash + state.nasrcityBranch.cash + state.shobraBranch.cash,
        expense: state.manialBranch.expense + state.nasrcityBranch.expense + state.shobraBranch.expense,
        income: state.manialBranch.income + state.nasrcityBranch.income + state.shobraBranch.income,
        visa: state.manialBranch.visa + state.nasrcityBranch.visa + state.shobraBranch.visa,
        withdraw: state.manialBranch.withdraw + state.nasrcityBranch.withdraw + state.shobraBranch.withdraw,
        netprofitwithdraw: state.manialBranch.netprofitwithdraw + state.nasrcityBranch.netprofitwithdraw + state.shobraBranch.netprofitwithdraw
      }]
    }
  },
  strict: debug
})
