const index = () => import('./views/index')
const profileInfo = () => import('./views/informationRequired')
const profileComplete = () => import('./views/completeProfile')
const profileSteps = () => import('./views/profileSteps')

// start Routes
export default [
  {
    path: '',
    name: 'businessLandingPage',
    component: index,
    meta: { auth: false }
  },
  {
    path: '/profile-info',
    name: 'profileInfo',
    component: profileInfo,
    meta: { auth: false }
  },
  {
    path: '/profile-complete',
    name: 'profileComplete',
    component: profileComplete,
    meta: { auth: false }
  },
  {
    path: '/profile-data',
    name: 'profileSteps',
    component: profileSteps,
    meta: { auth: false }
  }
]
