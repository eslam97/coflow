const index = () => import('./views/index')
// start Routes
export default [
  {
    path: '',
    name: 'mobileAppLandingPage',
    component: index,
    meta: { auth: false, userType: 'both' }
  }
]
