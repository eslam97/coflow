// Layout
const VerticleLayout = () => import('@/layouts/VerticleLayout')

const dashboard = () => import('./views/list')

// start routes
export default [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: VerticleLayout,
    children: [{
      path: '',
      name: 'dashboard',
      component: dashboard,
      meta: { name: 'dashboard', userType: 'both' }
    }]
  }
]
