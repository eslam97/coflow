// Layout
const VerticleLayout = () => import('../../../layouts/VerticleLayout')

const franchise = () => import('../view/list')

// start Routes
export default [
  {
    path: '/franchise',
    name: 'franchise',
    component: VerticleLayout,
    meta: { auth: true },
    children: [{
      path: '',
      name: 'franchise',
      meta: { auth: true, name: 'franchise' },
      component: franchise
    }]
  }
]
