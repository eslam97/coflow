// Layout
const VerticleLayout = () => import('@/layouts/VerticleLayout')

const profileslist = () => import('./views/list')

// start Routes
export default [
  {
    path: '/profiles',
    name: 'profiles',
    component: VerticleLayout,
    meta: { auth: true },
    children: [{
      path: '',
      name: 'profiles',
      meta: { auth: true, name: 'profiles' },
      component: profileslist
    }
    ]
  }
]
