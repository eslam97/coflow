// Layout
const VerticleLayout = () => import('@/layouts/VerticleLayout')

const notificationslist = () => import('./views/list')

// start Routes
export default [
  {
    path: '/notifications',
    name: 'notifications',
    component: VerticleLayout,
    meta: { auth: true },
    children: [{
      path: '',
      name: 'notifications',
      meta: { auth: true, name: 'notifications' },
      component: notificationslist
    }
    ]
  }
]
