// Layout
const VerticalLayout = () => import('@/layouts/VerticalLayout')

const flowsList = () => import('./views/list')

// start routes
export default [
  {
    path: '/flows',
    name: 'flows',
    component: VerticalLayout,
    children: [{
      path: '',
      name: 'flows',
      component: flowsList,
      meta: { name: 'flows', userType: 'provider', serviceTypes: 'Flow' }
    }]
  }
]
