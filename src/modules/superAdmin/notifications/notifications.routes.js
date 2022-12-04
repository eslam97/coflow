// Layout
const VerticleLayout = () => import('@/layouts/VerticleLayout')

const notificationslist = () => import('./views/list')

// start Routes
export default [
  {
    path: '/notifications',
    name: 'notifications',
    component: VerticleLayout,
    children: [{
      path: '',
      name: 'notifications',
      meta: { name: 'notifications', userType: 'admin', permission: 'notification.list' },
      component: notificationslist
    }
    ]
  }
]
