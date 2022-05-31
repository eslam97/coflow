// Layout
const VerticleLayout = () => import('@/layouts/VerticleLayout')

const flowsList = () => import('./views/list')

// start routes
export default [
  {
    path: '/flows',
    name: 'flows',
    component: VerticleLayout,
    meta: { auth: true },
    children: [{
      path: '',
      name: 'flows',
      meta: { auth: true, name: 'flows' },
      component: flowsList
    }]
  }
]
