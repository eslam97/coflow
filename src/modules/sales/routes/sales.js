// Layout
const VerticleLayout = () => import('../../../layouts/VerticleLayout')

const sales = () => import('../views/list')

// start Routes
export default [
  {
    path: '/sales',
    name: 'sales',
    component: VerticleLayout,
    meta: { auth: true },
    children: [{
      path: '',
      name: 'sales',
      meta: { auth: true, name: 'sales' },
      component: sales
    }]
  }
]
