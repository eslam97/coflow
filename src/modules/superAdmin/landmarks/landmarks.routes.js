// Layout
const VerticleLayout = () => import('@/layouts/VerticleLayout')

const landmarkslist = () => import('./views/list')

// start Routes
export default [
  {
    path: '/landmarks',
    name: 'landmarks',
    component: VerticleLayout,
    meta: { auth: true },
    children: [{
      path: '',
      name: 'landmarks',
      meta: { auth: true, name: 'landmarks' },
      component: landmarkslist
    }
    ]
  }
]
