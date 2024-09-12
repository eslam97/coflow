const VerticalLayout = () => import('@/layouts/VerticalLayout')

const facility = () => import('./views/index')
const profile = () => import('./views/profile')
const faqs = () => import('./views/faqs')
const payments = () => import('./views/payments')

export default [
  {
    path: '/facility',
    name: 'facility',
    component: VerticalLayout,
    children: [{
      path: '',
      name: 'facility',
      component: facility,
      redirect: { name: 'facility.profile' },
      meta: { name: 'facility', userType: 'provider', serviceTypes: 'all' },
      children: [
        {
          path: 'profile',
          name: 'facility.profile',
          component: profile,
          meta: { name: 'profile', userType: 'provider', serviceTypes: 'all' }
        },
        {
          path: 'faqs',
          name: 'facility.faqs',
          component: faqs,
          meta: { name: 'faqs', userType: 'provider', serviceTypes: 'all' }
        },
        {
          path: 'payments',
          name: 'facility.payments',
          component: payments,
          meta: { name: 'payments', userType: 'provider', serviceTypes: 'all' }
        }
      ]
    }]
  }
]
