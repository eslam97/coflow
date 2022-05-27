// Layout
const VerticleLayout = () => import('@/layouts/VerticleLayout')

const faqsList = () => import('./views/list')

// start routes
export default [
  {
    path: '/faq',
    name: 'faq',
    component: VerticleLayout,
    meta: { auth: true },
    children: [{
      path: '',
      name: 'faq',
      meta: { auth: true, name: 'faq' },
      component: faqsList
    }]
  }
]
