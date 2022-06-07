// Layout
const VerticleLayout = () => import('@/layouts/VerticleLayout')

const leadslist = () => import('./views/list')

// start Routes
export default [
  {
    path: '/leads',
    name: 'leads',
    component: VerticleLayout,
    children: [{
      path: '',
      name: 'leads',
      component: leadslist,
      meta: { name: 'leads', userType: 'admin', permission: '' }
    }
    ]
  }
]
