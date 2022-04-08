const index = () => import('./views/index')

// start Routes
export default [
  {
    path: '',
    name: 'businessLandingPage',
    component: index,
    meta: { auth: false }
  }
]
