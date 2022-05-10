// Layout
const VerticleLayout = () => import('@/layouts/VerticleLayout')

const settingsList = () => import('./views/list')
const profileSetting = () => import('./views/profile')
const activityLines = () => import('./views/activityLines')

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
      component: settingsList,
      children: [{
        path: '',
        name: 'profileSetting',
        meta: {
          auth: true,
          name: 'profileSetting'
        },
        component: profileSetting
      },
      {
        path: 'activity-lines',
        name: 'activityLines',
        meta: {
          auth: true,
          name: 'activityLines'
        },
        component: activityLines
      }]
    }
    ]
  }
]
