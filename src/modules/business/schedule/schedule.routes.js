// Layout
const VerticleLayout = () => import('@/layouts/VerticleLayout')

const scheduleList = () => import('./views/list')

// start routes
export default [
  {
    path: '/schedule',
    name: 'schedule',
    component: VerticleLayout,
    children: [{
      path: '',
      name: 'schedule',
      component: scheduleList,
      meta: { name: 'schedule', userType: 'provider', serviceTypes: 'Flow' }
    }]
  }
]
