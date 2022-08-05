// Layout
const VerticleLayout = () => import('@/layouts/VerticleLayout')

const analyticslist = () => import('./views/list')
const test = () => import('./views/test')

// start Routes
export default [
  {
    path: '/analytics',
    name: 'analytics',
    component: VerticleLayout,
    children: [{
      path: '',
      name: 'analytics',
      meta: { name: 'analytics', userType: 'admin', permission: '' },
      component: analyticslist
    }
    ]
  },
  {
    path: '/analytics-test',
    name: 'analytics-test',
    component: VerticleLayout,
    children: [{
      path: '',
      name: 'analytics',
      meta: { name: 'analytics', userType: 'admin', permission: '' },
      component: test
    }
    ]
  }
]
