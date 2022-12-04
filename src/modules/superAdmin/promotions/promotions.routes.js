// Layout
const VerticleLayout = () => import('@/layouts/VerticleLayout')

const promostionslist = () => import('./views/list')

// start Routes
export default [
  {
    path: '/all-promotions',
    name: 'promostionslist',
    component: VerticleLayout,
    children: [{
      path: '',
      name: 'promostionslist',
      meta: { name: 'promostionslist', userType: 'admin', permission: 'promotions.list' },
      component: promostionslist
    }
    ]
  }
]
