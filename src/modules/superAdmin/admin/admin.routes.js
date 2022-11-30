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
    children: [{
      path: '',
      name: 'admin',
      meta: { name: 'admin', userType: 'admin', permission: 'admin.list' },
      component: Adminlist
    },
    {
      path: 'roles',
      name: 'roles',
      meta: { name: 'roles', userType: 'admin', permission: 'admin.createRole' },
      component: rolelist
    }
    ]
  }
]
