// Layout
const VerticalLayout = () => import('@/layouts/VerticalLayout')

const ticketsList = () => import('./views/list')

// start routes
export default [
  {
    path: '/tickets',
    name: 'tickets',
    component: VerticalLayout,
    children: [{
      path: '',
      name: 'tickets',
      component: ticketsList,
      meta: { name: 'tickets', userType: 'provider', serviceTypes: 'Go' }
    }]
  }
]
