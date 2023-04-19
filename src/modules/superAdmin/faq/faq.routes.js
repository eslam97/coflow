// Layout
const VerticalLayout = () => import('@/layouts/VerticalLayout')

const faqsList = () => import('./views/list')

// start Routes
export default [
  {
    path: '/adminfaq',
    name: 'adminfaq',
    component: VerticalLayout,
    children: [{
      path: '',
      name: 'adminfaq',
      meta: { name: 'adminfaq', userType: 'admin', permission: 'admin.list' },
      component: faqsList
    }
    ]
  }
]
