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
          meta: {
            auth: true,
            name: 'profileSetting'
          },
          component: profileSetting
        },
        {
          path: 'activity-lines',
          name: 'activityLines',
          meta: {
            auth: true,
            name: 'activityLines'
          },
          component: activityLines
        },
        {
          path: 'activity-types',
          name: 'activityTypes',
          meta: {
            auth: true,
            name: 'activityTypes'
          },
          component: activityTypes
        },
        {
          path: 'duration-lists',
          name: 'durationLists',
          meta: {
            auth: true,
            name: 'durationLists'
          },
          component: durationList
        },
        {
          path: 'nationalities',
          name: 'nationalities',
          meta: {
            auth: true,
            name: 'nationalities'
          },
          component: nationalities
        },
        {
          path: 'accommodation-types',
          name: 'accommodationTypes',
          meta: {
            auth: true,
            name: 'accommodationTypes'
          },
          component: accommodationTypes
        },
        {
          path: 'links',
          name: 'links',
          meta: {
            auth: true,
            name: 'links'
          },
          component: links
        },
        {
          path: 'languages',
          name: 'languages',
          meta: {
            auth: true,
            name: 'languages'
          },
          component: languages
        },
        {
          path: 'countries',
          name: 'countries',
          meta: {
            auth: true,
            name: 'countries'
          },
          component: countries
        },
        {
          path: 'cities',
          name: 'cities',
          meta: {
            auth: true,
            name: 'cities'
          },
          component: cities
        },
        {
          path: 'areas',
          name: 'areas',
          meta: {
            auth: true,
            name: 'areas'
          },
          component: areas
        }
      ]
    }
    ]
  }
]
