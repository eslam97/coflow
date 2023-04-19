// Layout
const VerticalLayout = () => import('@/layouts/VerticalLayout')

const promotionslist = () => import('./views/list')

// start Routes
export default [
  {
    path: '/promotions',
    name: 'promotions',
    component: VerticalLayout,
    meta: { auth: true },
    children: [{
      path: '',
      name: 'promotions',
      meta: { name: 'promotions', userType: 'provider', serviceTypes: 'all' },
      component: promotionslist
    }
    ]
  }
]
