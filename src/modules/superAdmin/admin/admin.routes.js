// Layout
const VerticleLayout = () => import('@/layouts/VerticleLayout')

const Adminlist = () => import('./views/list')
const rolelist = () => import('./views/role')

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
    },
    {
      path: 'roles',
      name: 'roles',
      meta: { auth: true, name: 'roles' },
      component: rolelist
    }
    ]
  }
]
