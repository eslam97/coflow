// Layout
const VerticleLayout = () => import('@/layouts/VerticleLayout')

const activitiesList = () => import('./views/list')

// start routes
export default [
  {
    path: '/activities',
    name: 'activities',
    component: VerticleLayout,
    children: [{
      path: '',
      name: 'activities',
      component: activitiesList,
      meta: { name: 'activities', userType: 'activities', serviceTypes: 'Pro' }
    }]
  }
]
