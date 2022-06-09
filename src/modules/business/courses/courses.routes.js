// Layout
const VerticleLayout = () => import('@/layouts/VerticleLayout')

const coursesList = () => import('./views/list')

// start routes
export default [
  {
    path: '/courses',
    name: 'courses',
    component: VerticleLayout,
    children: [{
      path: '',
      name: 'courses',
      component: coursesList,
      meta: { name: 'courses', userType: 'provider', serviceTypes: 'Pro' }
    }]
  }
]
