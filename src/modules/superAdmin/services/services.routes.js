// Layout
const VerticalLayout = () => import('@/layouts/VerticalLayout')

const serviceslist = () => import('./views/list')
const serviceTickets = () => import('./views/tickets')
const serviceFlows = () => import('./views/flows')
const serviceActivities = () => import('./views/activities')
const serviceCourses = () => import('./views/courses')
const serviceProducts = () => import('./views/products')
const serviceAccommodations = () => import('./views/accommodations')

// start Routes
export default [
  {
    path: '/services',
    name: 'services',
    component: VerticalLayout,
    children: [{
      path: '',
      name: 'services',
      meta: { name: 'services', userType: 'admin', permission: 'services.list' },
      component: serviceslist,
      children: [{
        path: '',
        name: 'services',
        meta: { name: 'services', userType: 'admin', permission: 'services.tickets' },
        component: serviceTickets
      },
      {
        path: 'flows',
        name: 'serviceFlows',
        meta: { name: 'services', userType: 'admin', permission: 'services.flows' },
        component: serviceFlows
      },
      {
        path: 'activities',
        name: 'serviceActivities',
        meta: { name: 'services', userType: 'admin', permission: 'services.activities' },
        component: serviceActivities
      }, {
        path: 'courses',
        name: 'serviceCourses',
        meta: { name: 'services', userType: 'admin', permission: 'services.courses' },
        component: serviceCourses
      }, {
        path: 'products',
        name: 'serviceProducts',
        meta: { name: 'services', userType: 'admin', permission: 'services.products' },
        component: serviceProducts
      }, {
        path: 'accommodations',
        name: 'serviceAccommodations',
        meta: { name: 'services', userType: 'admin', permission: 'services.accommodations' },
        component: serviceAccommodations
      }
      ]
    }
    ]
  }
]
