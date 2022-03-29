// Layout
const VerticleLayout = () => import('@/layouts/VerticleLayout')

const Adminlist = () => import('./views/list')

// start Routes
export default [
  {
    path: '/admin',
    name: 'admin',
    component: VerticleLayout,
    meta: { auth: true },
    children: [{
      path: '',
      name: 'admin',
      meta: { auth: true, name: 'admin' },
      component: Adminlist
    }
    ]
  }
]
