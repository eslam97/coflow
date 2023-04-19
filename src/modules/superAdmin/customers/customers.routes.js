// Layout
const VerticalLayout = () => import('@/layouts/VerticalLayout')

const customerslist = () => import('./views/list')

// start Routes
export default [
  {
    path: '/customers',
    name: 'customers',
    component: VerticalLayout,
    children: [{
      path: '',
      name: 'customers',
      meta: { name: 'customers', userType: 'admin', permission: 'customers.list' },
      component: customerslist
    }
    ]
  }
]
