// Layout
const VerticleLayout = () => import('@/layouts/VerticleLayout')

const settingsList = () => import('./views/list')
const profileSetting = () => import('./views/profile')
const activityLines = () => import('./views/activityLines')
const activityTypes = () => import('./views/activityTypes')
const durationList = () => import('./views/durationLists')
const nationalities = () => import('./views/nationalities')
const accommodationTypes = () => import('./views/accommodationTypes')
const links = () => import('./views/links')
const languages = () => import('./views/languages')
const countries = () => import('./views/countries')
const cities = () => import('./views/cities')
const areas = () => import('./views/areas')

// start Routes
export default [
  {
    path: '/settings',
    name: 'settings',
    component: VerticleLayout,
    meta: { auth: true },
    children: [{
      path: '',
      name: 'settings',
      meta: { auth: true, name: 'settings' },
      component: settingsList,
      children: [
        {
          path: '',
          name: 'settings',
          meta: { name: 'settings', userType: 'admin', permission: '' },
          component: profileSetting
        },
        {
          path: 'activity-lines',
          name: 'activityLines',
          meta: { name: 'activityLines', userType: 'admin', permission: '' },
          component: activityLines
        },
        {
          path: 'activity-types',
          name: 'activityTypes',
          meta: { name: 'activityTypes', userType: 'admin', permission: '' },
          component: activityTypes
        },
        {
          path: 'duration-lists',
          name: 'durationLists',
          meta: { name: 'durationLists', userType: 'admin', permission: '' },
          component: durationList
        },
        {
          path: 'nationalities',
          name: 'nationalities',
          meta: { name: 'nationalities', userType: 'admin', permission: '' },
          component: nationalities
        },
        {
          path: 'accommodation-types',
          name: 'accommodationTypes',
          meta: { name: 'accommodationTypes', userType: 'admin', permission: '' },
          component: accommodationTypes
        },
        {
          path: 'links',
          name: 'links',
          meta: { name: 'links', userType: 'admin', permission: '' },
          component: links
        },
        {
          path: 'languages',
          name: 'languages',
          meta: { name: 'languages', userType: 'admin', permission: '' },
          component: languages
        },
        {
          path: 'countries',
          name: 'countries',
          meta: { name: 'countries', userType: 'admin', permission: '' },
          component: countries
        },
        {
          path: 'cities',
          name: 'cities',
          meta: { name: 'cities', userType: 'admin', permission: '' },
          component: cities
        },
        {
          path: 'areas',
          name: 'areas',
          meta: { name: 'areas', userType: 'admin', permission: '' },
          component: areas
        }
      ]
    }
    ]
  }
]
