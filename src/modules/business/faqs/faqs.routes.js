// Layout
const VerticleLayout = () => import('@/layouts/VerticleLayout')

const faqsList = () => import('./views/list')

// start routes
export default [
  {
    path: '/faqs',
    name: 'faqs',
    comopnent: VerticleLayout,
    meta: { auth: true },
    children: [{
      path: '',
      name: 'faqs',
      meta: { auth: true, name: 'faqs' },
      comopnent: faqsList
    }]
  }
]
