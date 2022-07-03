const index = () => import('./views/index')
const profileInfo = () => import('./views/informationRequired')
const profileComplete = () => import('./views/completeProfile')
const profileSteps = () => import('./views/profileSteps')

// start Routes
export default [
  {
    path: '/business',
    name: 'businessLandingPage',
    component: index,
    meta: { auth: false, userType: 'both' }
  },
  {
    path: '/profile-info',
    name: 'profileInfo',
    component: profileInfo,
    meta: { auth: false, userType: 'provider', serviceTypes: 'all' }
  },
  {
    path: '/profile-complete',
    name: 'profileComplete',
    component: profileComplete,
    meta: { auth: false, userType: 'provider', serviceTypes: 'all' }
  },
  {
    path: '/profile-data',
    name: 'profileSteps',
    component: profileSteps,
    meta: { auth: false, userType: 'provider', serviceTypes: 'all' }
  }
]
