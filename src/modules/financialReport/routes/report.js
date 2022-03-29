// Layout
const VerticleLayout = () => import('../../../layouts/VerticleLayout')

const financialList = () => import('../views/list')

// start Routes
export default [
  {
    path: '/financialReport',
    name: 'financialReport',
    component: VerticleLayout,
    meta: { auth: true },
    children: [{
      path: '',
      name: 'financialReport',
      meta: { auth: true, name: 'financialReport' },
      component: financialList
    }]
  }
]
