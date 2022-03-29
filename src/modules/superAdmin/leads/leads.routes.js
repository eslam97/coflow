// Layout
const VerticleLayout = () => import('@/layouts/VerticleLayout')

const leadslist = () => import('./views/list')

// start Routes
export default [
  {
    path: '/leads',
    name: 'leads',
    component: VerticleLayout,
    meta: { auth: true },
    children: [{
      path: '',
      name: 'leads',
      meta: { auth: true, name: 'leads' },
      component: leadslist
    }
    ]
  }
]
