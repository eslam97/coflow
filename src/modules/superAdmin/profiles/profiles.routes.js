// Layout
const VerticalLayout = () => import('@/layouts/VerticalLayout')

const profileslist = () => import('./views/list')

// start Routes
export default [
  {
    path: '/profiles',
    name: 'profiles',
    component: VerticalLayout,
    meta: { auth: true },
    children: [{
      path: '',
      name: 'profiles',
      meta: { name: 'profiles', userType: 'admin', permission: 'profile.list' },
      component: profileslist
    }
    ]
  }
]
