// Layout
const VerticleLayout = () => import('@/layouts/VerticleLayout')

const ticketsList = () => import('./views/list')

// start routes
export default [
  {
    path: '/tickets',
    name: 'tickets',
    component: VerticleLayout,
    meta: { auth: true },
    children: [{
      path: '',
      name: 'tickets',
      meta: { auth: true, name: 'tickets' },
      component: ticketsList
    }]
  }
]
