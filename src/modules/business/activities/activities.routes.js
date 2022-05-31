// Layout
const VerticleLayout = () => import('@/layouts/VerticleLayout')

const activitiesList = () => import('./views/list')

// start routes
export default [
  {
    path: '/activities',
    name: 'activities',
    component: VerticleLayout,
    meta: { auth: true },
    children: [{
      path: '',
      name: 'activities',
      meta: { auth: true, name: 'activities' },
      component: activitiesList
    }]
  }
]
