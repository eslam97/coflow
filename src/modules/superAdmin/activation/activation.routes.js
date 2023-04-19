// Layout
const VerticalLayout = () => import('@/layouts/VerticalLayout')

const activationlist = () => import('./views/list')

// start Routes
export default [
  {
    path: '/activation',
    name: 'activation',
    component: VerticalLayout,
    children: [{
      path: '',
      name: 'activation',
      meta: { name: 'activation', userType: 'admin', permission: 'activation.list' },
      component: activationlist
    }
    ]
  }
]
