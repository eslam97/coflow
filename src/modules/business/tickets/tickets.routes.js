// Layout
const VerticleLayout = () => import('@/layouts/VerticleLayout')

const ticketsList = () => import('./views/list')

// start routes
export default [
  {
    path: '/tickets',
    name: 'tickets',
    component: VerticleLayout,
    children: [{
      path: '',
      name: 'tickets',
      component: ticketsList,
      meta: { name: 'tickets', userType: 'provider', serviceTypes: 'GO' }
    }]
  }
]
