// Layout
const VerticleLayout = () => import('@/layouts/VerticleLayout')

const settingsList = () => import('./views/list')

// start Routes
export default [
  {
    path: '/settings',
    name: 'settings',
    component: VerticleLayout,
    meta: { auth: true },
    children: [{
      path: '',
      name: 'settings',
      meta: { auth: true, name: 'settings' },
      component: settingsList
    }
    ]
  }
]
