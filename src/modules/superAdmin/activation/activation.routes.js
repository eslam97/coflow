// Layout
const VerticleLayout = () => import('@/layouts/VerticleLayout')

const activationlist = () => import('./views/list')

// start Routes
export default [
  {
    path: '/activation',
    name: 'activation',
    component: VerticleLayout,
    meta: { auth: true },
    children: [{
      path: '',
      name: 'activation',
      meta: { auth: true, name: 'activation' },
      component: activationlist
    }
    ]
  }
]
