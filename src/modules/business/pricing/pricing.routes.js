const VerticalLayout = () => import('@/layouts/VerticalLayout')

const pricing = () => import('./views/index')
const ticketsList = () => import('./views/tickets')
const promotionslist = () => import('./views/promotions')
const couponsList = () => import('./views/coupons')

export default [
  {
    path: '/pricing',
    name: 'pricing',
    component: VerticalLayout,
    children: [{
      path: '',
      name: 'pricing',
      component: pricing,
      redirect: { name: 'pricing.tickets' },
      meta: { name: 'pricing', userType: 'provider', serviceTypes: 'all' },
      children: [
        {
          path: 'tickets',
          name: 'pricing.tickets',
          component: ticketsList,
          meta: { name: 'tickets', userType: 'provider', serviceTypes: 'all' }
        },
        {
          path: 'promotions',
          name: 'pricing.promotions',
          component: promotionslist,
          meta: { name: 'promotions', userType: 'provider', serviceTypes: 'all' }
        },
        {
          path: 'coupons',
          name: 'pricing.coupons',
          component: couponsList,
          meta: { name: 'coupons', userType: 'provider', serviceTypes: 'all' }
        }
      ]
    }]
  }
]
