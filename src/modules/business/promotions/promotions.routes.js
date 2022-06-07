// Layout
const VerticleLayout = () => import('@/layouts/VerticleLayout')

const promotionslist = () => import('./views/list')

// start Routes
export default [
  {
    path: '/promotions',
    name: 'promotions',
    component: VerticleLayout,
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
