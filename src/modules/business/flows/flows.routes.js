// Layout
const VerticleLayout = () => import('@/layouts/VerticleLayout')

const flowsList = () => import('./views/list')

// start routes
export default [
  {
    path: '/flows',
    name: 'flows',
    component: VerticleLayout,
    children: [{
      path: '',
      name: 'flows',
      component: flowsList,
      meta: { name: 'flows', userType: 'provider', serviceTypes: 'Flow' }
    }]
  }
]
