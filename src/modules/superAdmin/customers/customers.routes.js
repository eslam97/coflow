// Layout
const VerticleLayout = () => import('@/layouts/VerticleLayout')

const customerslist = () => import('./views/list')

// start Routes
export default [
  {
    path: '/customers',
    name: 'customers',
    component: VerticleLayout,
    children: [{
      path: '',
      name: 'customers',
      meta: { name: 'customers', userType: 'admin', permission: 'customers.list' },
      component: customerslist
    }
    ]
  }
]
