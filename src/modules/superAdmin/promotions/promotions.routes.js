// Layout
const VerticalLayout = () => import('@/layouts/VerticalLayout')

const promostionslist = () => import('./views/list')

// start Routes
export default [
  {
    path: '/all-promotions',
    name: 'promostionslist',
    component: VerticalLayout,
    children: [{
      path: '',
      name: 'promostionslist',
      meta: { name: 'promostionslist', userType: 'admin', permission: 'promotions.list' },
      component: promostionslist
    }
    ]
  }
]
