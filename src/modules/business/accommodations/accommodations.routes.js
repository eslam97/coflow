// Layout
const VerticalLayout = () => import('@/layouts/VerticalLayout')

const accommodationsList = () => import('./views/list')

// start routes
export default [
  {
    path: '/accommodations',
    name: 'accommodations',
    component: VerticalLayout,
    children: [{
      path: '',
      name: 'accommodations',
      component: accommodationsList,
      meta: { name: 'accommodations', userType: 'provider', serviceTypes: 'Camp' }
    }]
  }
]
