// Layout
const VerticalLayout = () => import('@/layouts/VerticalLayout')

const landmarkslist = () => import('./views/list')

// start Routes
export default [
  {
    path: '/landmarks',
    name: 'landmarks',
    component: VerticalLayout,
    children: [{
      path: '',
      name: 'landmarks',
      meta: { name: 'landmarks', userType: 'admin', permission: 'landmark.list' },
      component: landmarkslist
    }
    ]
  }
]
