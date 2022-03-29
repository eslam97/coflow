// Layout
const VerticleLayout = () => import('../../../layouts/VerticleLayout')

const reminder = () => import('../views/list')

// start Routes
export default [
  {
    path: '/reminder',
    name: 'reminder',
    component: VerticleLayout,
    meta: { auth: true },
    children: [
      {
        path: '',
        name: 'reminder',
        meta: { auth: true, name: 'reminder' },
        component: reminder
      }
    ]
  }
]
