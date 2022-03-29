/*
import FB from './require.config'
export function initFacebookSdk () {
  return new Promise(resolve => {
    // wait for facebook sdk to initialize before starting the vue app
    window.fbAsyncInit = function () {
      FB.init({
        appId: '929359427676509',
        cookie: true,
        xfbml: true,
        version: 'v12.0'
      })

      // auto authenticate with the api if already logged in with facebook
      FB.getLoginStatus(({ authResponse }) => {
        if (authResponse) {
          // console.log(authResponse)
          // accountService.apiAuthenticate(authResponse.accessToken).then(resolve)
        } else {
          resolve()
        }
      })
    };

    // load facebook sdk script
    (function (d, s, id) {
      var js; var fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) { return }
      js = d.createElement(s); js.id = id
      js.src = 'https://connect.facebook.net/en_US/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))
  })
}
*/

import Button from './components/button'

export { default as VFBLogin } from './facebook'
export { default as VFBLoginScope } from './scope'
export { default as VFBLoginLoader } from './components/loader'
export { default as VFBLoginButton } from 'components/loader'

export const Install = {
  install (Vue) {
    Vue.component(Button.name, Button)
  }
}

function autoInstall () {
  let GlobalVue
  if (typeof window !== 'undefined') GlobalVue = window.Vue
  else if (typeof global !== 'undefined') GlobalVue = global.Vue
  if (GlobalVue) GlobalVue.use(Install)
}

autoInstall()

export default Button
