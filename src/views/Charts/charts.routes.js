const VerticleLayout = () => import('@/layouts/VerticleLayout')

/* const amChart = () => import('./AmCharts') */
const apexChart = () => import('./ApexCharts')
/*
const HighCharts = () => import('./HighCharts')
*/

export default [
  {
    path: '/amChart',
    name: 'amChart',
    component: VerticleLayout,
    meta: { auth: true },
    children: [{
      path: '',
      name: 'amChart',
      meta: { auth: true, name: 'amChart' },
      component: apexChart
    }
    ]
  }

]
