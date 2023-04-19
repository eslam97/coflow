// Layout
const VerticalLayout = () => import('@/layouts/VerticalLayout')

const feedbackList = () => import('./views/list')

// start Routes
export default [
  {
    path: '/feedback',
    name: 'feedback',
    component: VerticalLayout,
    children: [{
      path: '',
      name: 'feedback',
      meta: { name: 'feedback', userType: 'admin', permission: 'admin.list' },
      component: feedbackList
    }
    ]
  }
]
