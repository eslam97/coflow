// Layout
const VerticleLayout = () => import('@/layouts/VerticleLayout')

const serviceslist = () => import('./views/list')

// start Routes
export default [
  {
    path: '/services',
    name: 'services',
    component: VerticleLayout,
    meta: { auth: true },
    children: [{
      path: '',
      name: 'services',
      meta: { auth: true, name: 'services' },
      component: serviceslist
    }
    ]
  }
]
