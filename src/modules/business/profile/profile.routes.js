// Layout
const VerticleLayout = () => import('@/layouts/VerticleLayout')

const profileList = () => import('./views/list')

// start routes
export default [
  {
    path: '/profile',
    name: 'profile',
    component: VerticleLayout,
    meta: { auth: true },
    children: [{
      path: '',
      name: 'profile',
      component: profileList,
      meta: { name: 'profile', userType: 'provider', serviceTypes: 'all' }
    }]
  }
]
