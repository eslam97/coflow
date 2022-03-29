// Layout
const VerticleLayout = () => import('@/layouts/VerticleLayout')

const analyticslist = () => import('./views/list')

// start Routes
export default [
  {
    path: '/analytics',
    name: 'analytics',
    component: VerticleLayout,
    meta: { auth: true },
    children: [{
      path: '',
      name: 'analytics',
      meta: { auth: true, name: 'analytics' },
      component: analyticslist
    }
    ]
  }
]
