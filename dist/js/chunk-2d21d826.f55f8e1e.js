(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21d826"],{d235:function(s,e,r){"use strict";r.r(e);var a=function(){var s=this,e=s.$createElement,r=s._self._c||e;return r("div",[r("h1",{staticClass:"mb-0"},[s._v("Change Password")]),r("p",[s._v("You should change password before enter this system.")]),r("form",{staticClass:"mt-4",on:{submit:function(e){return e.preventDefault(),s.changePassword.apply(null,arguments)}}},[r("div",{staticClass:"form-group"},[r("ValidationProvider",{attrs:{vid:"oldPassword",name:"oldPassword",rules:"required"},scopedSlots:s._u([{key:"default",fn:function(e){var a=e.errors;return[r("div",{staticClass:"form-group"},[r("label",{attrs:{for:"oldPasswordInput"}},[s._v("Old Password")]),r("input",{directives:[{name:"model",rawName:"v-model",value:s.resetPassword.old_password,expression:"resetPassword.old_password"}],class:"form-control mb-0"+(a.length>0||s.resetPassword.old_password.length<8&&s.resetPassword.old_password.length>0?" is-invalid":""),attrs:{type:"password",id:"oldPasswordInput",placeholder:"old password",required:""},domProps:{value:s.resetPassword.old_password},on:{input:function(e){e.target.composing||s.$set(s.resetPassword,"old_password",e.target.value)}}}),r("div",{staticClass:"invalid-feedback"},[r("span",[s._v(s._s(a[0]))]),s.resetPassword.old_password.length?r("span",[s._v("The password must be at least 8 characters. ")]):s._e()])])]}}])}),r("ValidationProvider",{attrs:{vid:"newPassword",name:"newPassword",rules:"required"},scopedSlots:s._u([{key:"default",fn:function(e){var a=e.errors;return[r("div",{staticClass:"form-group"},[r("label",{attrs:{for:"newPasswordInput"}},[s._v("New Password")]),r("input",{directives:[{name:"model",rawName:"v-model",value:s.resetPassword.password,expression:"resetPassword.password"}],class:"form-control mb-0"+(a.length>0||s.resetPassword.password.length<8&&s.resetPassword.password.length>0?" is-invalid":""),attrs:{type:"password",id:"newPasswordInput",placeholder:"new password",required:""},domProps:{value:s.resetPassword.password},on:{input:function(e){e.target.composing||s.$set(s.resetPassword,"password",e.target.value)}}}),r("div",{staticClass:"invalid-feedback"},[r("span",[s._v(s._s(a[0]))]),s.resetPassword.password.length?r("span",[s._v("The password must be at least 8 characters. ")]):s._e()])])]}}])}),r("ValidationProvider",{attrs:{vid:"confirmPassword",name:"confirmPassword",rules:"'required|confirmed:newPassword'"},scopedSlots:s._u([{key:"default",fn:function(e){var a=e.errors;return[r("div",{staticClass:"form-group"},[r("label",{attrs:{for:"confirmPasswordInput"}},[s._v("Confirm Password")]),r("input",{directives:[{name:"model",rawName:"v-model",value:s.resetPassword.password_confirm,expression:"resetPassword.password_confirm"}],class:"form-control mb-0"+(a.length>0||s.resetPassword.password_confirm.length<8&&s.resetPassword.password_confirm.length>0?" is-invalid":""),attrs:{type:"password",id:"confirmPasswordInput",placeholder:"confirm password",required:""},domProps:{value:s.resetPassword.password_confirm},on:{input:function(e){e.target.composing||s.$set(s.resetPassword,"password_confirm",e.target.value)}}}),r("div",{staticClass:"invalid-feedback"},[r("span",[s._v(s._s(a[0]))]),s.resetPassword.password_confirm.length?r("span",[s._v("The password must be at least 8 characters. ")]):s._e()])])]}}])})],1),s._m(0)])])},o=[function(){var s=this,e=s.$createElement,r=s._self._c||e;return r("div",{staticClass:"d-inline-block w-100"},[r("button",{staticClass:"btn btn-primary float-right",attrs:{type:"submit"}},[s._v("Reset Password")])])}],t=r("bcae"),d={name:"RecoverPassword1",data:function(){return{resetPassword:{old_password:"",password:"",password_confirm:""}}},methods:{changePassword:function(){var s=this;this.$store.dispatch("changePassword",this.resetPassword).then((function(e){t["c"].showSnackbar("success","User has been Edit successfully."),s.$store.dispatch("logout").then((function(){localStorage.removeItem("user_info"),localStorage.removeItem("auth_permissions"),localStorage.removeItem("access_token"),localStorage.removeItem("user_permissions"),localStorage.removeItem("user_roles"),localStorage.removeItem("user_projects"),s.$router.push({name:"auth1.sign-in1"})}))})).catch((function(){}))}}},n=d,i=r("2877"),l=Object(i["a"])(n,a,o,!1,null,null,null);e["default"]=l.exports}}]);
//# sourceMappingURL=chunk-2d21d826.f55f8e1e.js.map