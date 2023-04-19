// Layout
const VerticalLayout = () => import('@/layouts/VerticalLayout')

const notificationslist = () => import('./views/list')

// start Routes
export default [
  {
    path: '/notifications',
    name: 'notifications',
    component: VerticalLayout,
    children: [{
      path: '',
      name: 'notifications',
      meta: { name: 'notifications', userType: 'admin', permission: 'notification.list' },
      component: notificationslist
    }
    ]
  }
]
