const VerticalLayout = () => import('@/layouts/VerticalLayout')

/*
const amChart = () => import('./AmCharts')
const apexChart = () => import('./ApexCharts')
*/

const HighCharts = () => import('./AmCharts')

export default [
  {
    path: '/amChart',
    name: 'amChart',
    component: VerticalLayout,
    meta: { auth: true },
    children: [{
      path: '',
      name: 'amChart',
      meta: { auth: true, name: 'amChart' },
      component: HighCharts
    }
    ]
  }

]
