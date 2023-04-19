// Layout
const VerticalLayout = () => import('@/layouts/VerticalLayout')

const analyticslist = () => import('./views/list')

// start Routes
export default [
  {
    path: '/analytics',
    name: 'analytics',
    component: VerticalLayout,
    children: [{
      path: '',
      name: 'analytics',
      meta: { name: 'analytics', userType: 'admin', permission: 'analytics.list' },
      component: analyticslist
    }
    ]
  }
]
