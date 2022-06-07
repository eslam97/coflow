// Layout
const VerticleLayout = () => import('@/layouts/VerticleLayout')

const accommodationsList = () => import('./views/list')

// start routes
export default [
  {
    path: '/accommodations',
    name: 'accommodations',
    component: VerticleLayout,
    children: [{
      path: '',
      name: 'accommodations',
      component: accommodationsList,
      meta: { name: 'accommodations', userType: 'provider', serviceTypes: 'CAMP' }
    }]
  }
]
