import Vue from 'vue'
import VueRouter from 'vue-router'

// Import Business Landing
import businessLanding from '@/modules/businessLandingPage/businessLandingPage.routes'

// Import Super Admin Routes
import leads from '@/modules/superAdmin/leads/leads.routes'
import activation from '@/modules/superAdmin/activation/activation.routes'
import profiles from '@/modules/superAdmin/profiles/profiles.routes'
import landmarks from '@/modules/superAdmin/landmarks/landmarks.routes'
import services from '@/modules/superAdmin/services/services.routes'
import promotions from '@/modules/superAdmin/promotions/promotions.routes'
import customers from '@/modules/superAdmin/customers/customers.routes'
import settings from '@/modules/superAdmin/settings/settings.routes'
import notifications from '@/modules/superAdmin/notifications/notifications.routes'
import analytics from '@/modules/superAdmin/analytics/analytics.routes'
import admin from '@/modules/superAdmin/admin/admin.routes'
import welcomePage from '@/components/welcomePage'
import charts from '@/views/Charts/charts.routes'

// Import Business
import tickets from '@/modules/business/tickets/tickets.routes.js'
import bussinessPromotions from '@/modules/business/promotions/promotions.routes'
import faq from '@/modules/business/faqs/faqs.routes.js'
import products from '@/modules/business/products/products.routes'

/* Layouts */
const VerticleLayout = () => import('../layouts/VerticleLayout')
const AuthLayout = () => import('../layouts/AuthLayouts/AuthLayout')

/* Authentic View */
const SignIn1 = () => import('../views/AuthPages/Default/SignIn1')
const SignUp1 = () => import('../views/AuthPages/Default/SignUp1')
const RecoverPassword1 = () => import('../views/AuthPages/Default/RecoverPassword1')
const LockScreen1 = () => import('../views/AuthPages/Default/LockScreen1')
const ConfirmMail1 = () => import('../views/AuthPages/Default/ConfirmMail1')
/* Extra Pages */
const ErrorPage = () => import('../views/Pages/ErrorPage')
/* const ComingSoon = () => import('../views/Pages/ComingSoon')
const Maintenance = () => import('../views/Pages/Maintenance') */

Vue.use(VueRouter)

const authChildRoutes = (prop) => [
  {
    path: 'sign-in1',
    name: prop + '.sign-in1',
    meta: { auth: true },
    component: SignIn1
  },
  {
    path: 'sign-up1',
    name: prop + '.sign-up1',
    meta: { auth: true },
    component: SignUp1
  },
  {
    path: 'password-reset1',
    name: prop + '.password-reset1',
    meta: { auth: true },
    component: RecoverPassword1
  },
  {
    path: 'lock-screen1',
    name: prop + '.lock-screen1',
    meta: { auth: true },
    component: LockScreen1
  },
  {
    path: 'confirm-mail1',
    name: prop + '.confirm-mail1',
    meta: { auth: true },
    component: ConfirmMail1
  }
]

const routes = [
  ...businessLanding,
  ...leads,
  ...activation,
  ...profiles,
  ...landmarks,
  ...services,
  ...promotions,
  ...customers,
  ...settings,
  ...notifications,
  ...analytics,
  ...admin,
  ...charts,
  ...tickets,
  ...bussinessPromotions,
  ...faq,
  ...products,
  {
    path: '/welcome',
    name: 'welcome',
    component: VerticleLayout,
    meta: { auth: true },
    children: [{
      path: '',
      name: 'welcome',
      meta: { auth: true, name: 'welcome' },
      component: welcomePage
    }
    ]
  },
  {
    path: '/auth',
    name: 'auth1',
    component: AuthLayout,
    meta: { auth: true },
    children: authChildRoutes('auth1')
  },
  {
    path: '*',
    name: 'errorPage',
    component: ErrorPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

/* router.beforeEach((to, from, next) => {
  const publicPages = ['/auth/sign-in1', '/auth/sign-up1', '/dark/auth/sign-in1', '/dark/auth/sign-up1']
  if (publicPages.includes(to.path)) {
    localStorage.removeItem('user')
    localStorage.removeItem('access_token')
  }
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('access_token')
  if (to.meta.auth) {
    // console.log(to.meta.auth)
    if (authRequired && loggedIn === null) {
      return next('/auth/sign-in1')
    } else if (to.name === 'dashboard' || to.name === 'mini.dashboard') {
      return next('/index')
    }
  }
  next()
}) */

export default router
