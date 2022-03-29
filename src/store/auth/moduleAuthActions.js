import authServices from '@/services/auth'
/*
import router from '@/router/index';
*/
export default {
  login ({ commit }, form) {
    return new Promise((resolve, reject) => {
      authServices.login(form).then(res => {
        localStorage.setItem('access_token', res.data.data.access_token)
        localStorage.setItem('user_info', JSON.stringify(res.data.data.user))
        commit('SAVE_TOKEN', res.data.data.access_token)
        commit('SAVE_USER_DATA', res.data.data.user)
        resolve(res)
      }).catch(error => {
        localStorage.removeItem('access_token')
        reject(error)
      })
    })
  },
  changePassword ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      authServices.changePassword(payload).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  create ({ commit }) {
    return new Promise((resolve, reject) => {
      authServices.create().then(res => {
        localStorage.setItem('user_projects', JSON.stringify(res.data.data.projects))
        /*
        const newArray = res.data.data.all_permissions.map(element => element.name)
*/
        const newPerm = []
        var merged
        for (var key in res.data.data.all_permissions) {
          var p = res.data.data.all_permissions[key].map(element => element.name)
          newPerm.push(p)
          merged = [].concat.apply([], newPerm)
        }
        localStorage.setItem('user_permissions', JSON.stringify(res.data.data.all_permissions))
        localStorage.setItem('auth_permissions', merged)
        // console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh', res.data.data)
        localStorage.setItem('user_roles', JSON.stringify(res.data.data.roles))
        localStorage.setItem('default_project', JSON.stringify(res.data.data.default_project))
        commit('getUserProjects', res.data.data.projects)
        commit('getUserRoles', res.data.data.roles)
        commit('getUserDepartments', res.data.data.departments)
        commit('getUserPermissions', res.data.data.all_permissions)
        commit('getUserAuthPermissions', merged)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  logout () {
    return new Promise((resolve, reject) => {
      authServices.logout().then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  resetPassword (_, { userId, data }) {
    return new Promise((resolve, reject) => {
      authServices.resetPassword(userId, data).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
  // forgetPassword({ commit, state }, payload) {
  //     return new Promise((resolve, reject) => {
  //         authServices.forgetPassword(payload).then(res => {
  //             resolve(res);
  //         }).catch(error => {
  //             reject(error);
  //         });
  //     });

  // },
  // verificationCode({ commit }, code) {
  //     return new Promise((resolve, reject) => {
  //         authServices.verificationCode(code).then(res => {
  //             commit("SAVE_TOKEN", res)
  //             resolve(res);
  //         }).catch(error => {
  //             reject(error);
  //         });
  //     });
  // },
  // setNewPassword({ state }, data) {
  //     data.email = state.tokenInfo.email
  //     data.token = state.tokenInfo.token
  //     return new Promise((resolve, reject) => {
  //         authServices.setNewPassword(data).then(res => {
  //             resolve(res);
  //         }).catch(error => {
  //             reject(error);
  //         });
  //     });
  // },

  // resetPassword({ commit }, payload) {
  //     return new Promise((resolve, reject) => {
  //         authServices.resetPassword(payload).then(res => {
  //             router.push({
  //                 name: 'dashboard'
  //             });

  //             resolve(res);
  //         }).catch(error => {
  //             reject(error);
  //         });
  //     });
  // },
}
