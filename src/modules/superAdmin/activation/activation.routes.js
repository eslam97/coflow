// Layout
const VerticleLayout = () => import('@/layouts/VerticleLayout')

const activationlist = () => import('./views/list')

// start Routes
export default [
  {
    path: '/activation',
    name: 'activation',
    component: VerticleLayout,
    children: [{
      path: '',
      name: 'activation',
      meta: { name: 'activation', userType: 'admin', permission: 'activation.list' },
      component: activationlist
    }
    ]
  }
]
