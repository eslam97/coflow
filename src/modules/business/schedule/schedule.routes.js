// Layout
const VerticleLayout = () => import('@/layouts/VerticleLayout')

const scheduleList = () => import('./views/list')

// start routes
export default [
  {
    path: '/schedule',
    name: 'schedule',
    component: VerticleLayout,
    meta: { auth: true },
    children: [{
      path: '',
      name: 'schedule',
      meta: { auth: true, name: 'schedule' },
      component: scheduleList
    }]
  }
]
