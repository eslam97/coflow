// Layout
const VerticleLayout = () => import('@/layouts/VerticleLayout')

const customerslist = () => import('./views/list')

// start Routes
export default [
  {
    path: '/customers',
    name: 'customers',
    component: VerticleLayout,
    meta: { auth: true },
    children: [{
      path: '',
      name: 'customers',
      meta: { auth: true, name: 'customers' },
      component: customerslist
    }
    ]
  }
]
