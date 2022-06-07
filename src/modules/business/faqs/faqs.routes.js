// Layout
const VerticleLayout = () => import('@/layouts/VerticleLayout')

const faqsList = () => import('./views/list')

// start routes
export default [
  {
    path: '/faq',
    name: 'faq',
    component: VerticleLayout,
    children: [{
      path: '',
      name: 'faq',
      component: faqsList,
      meta: { name: 'faq', userType: 'provider', serviceTypes: 'all' }
    }]
  }
]
