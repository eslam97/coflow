// Layout
const VerticleLayout = () => import('@/layouts/VerticleLayout')

const analyticslist = () => import('./views/list')

// start Routes
export default [
  {
    path: '/analytics',
    name: 'analytics',
    component: VerticleLayout,
    children: [{
      path: '',
      name: 'analytics',
      meta: { name: 'analytics', userType: 'admin', permission: 'analytics.list' },
      component: analyticslist
    }
    ]
  }
]
