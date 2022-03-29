// Layout
const VerticleLayout = () => import('@/layouts/VerticleLayout')

const promostionslist = () => import('./views/list')

// start Routes
export default [
  {
    path: '/all-promotions',
    name: 'promostionslist',
    component: VerticleLayout,
    meta: { auth: true },
    children: [{
      path: '',
      name: 'promostionslist',
      meta: { auth: true, name: 'promostionslist' },
      component: promostionslist
    }
    ]
  }
]
