// Layout
const VerticalLayout = () => import('@/layouts/VerticalLayout')

const dashboard = () => import('./views/list')

// start routes
export default [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: VerticalLayout,
    children: [{
      path: '',
      name: 'dashboard',
      component: dashboard,
      meta: { name: 'dashboard', userType: 'both' }
    }]
  }
]
