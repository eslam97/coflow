// Layout
const VerticleLayout = () => import('@/layouts/VerticleLayout')

const serviceslist = () => import('./views/list')

// start Routes
export default [
  {
    path: '/services',
    name: 'services',
    component: VerticleLayout,
    children: [{
      path: '',
      name: 'services',
      meta: { name: 'services', userType: 'admin', permission: '' },
      component: serviceslist
    }
    ]
  }
]
