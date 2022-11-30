// Layout
const VerticleLayout = () => import('@/layouts/VerticleLayout')

const landmarkslist = () => import('./views/list')

// start Routes
export default [
  {
    path: '/landmarks',
    name: 'landmarks',
    component: VerticleLayout,
    children: [{
      path: '',
      name: 'landmarks',
      meta: { name: 'landmarks', userType: 'admin', permission: 'landmark.list' },
      component: landmarkslist
    }
    ]
  }
]
