(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-50c0eedc"],{2009:function(t,e,a){"use strict";var i=a("bb36");e["a"]={saveStepAdmin:function(t){return Object(i["a"])().post("step-admin",t)},saveStepFacility:function(t){return Object(i["a"])().post("step-facility",t)},uploadProviderImage:function(t,e){return Object(i["a"])().post("provider-image",t,e)},removeProviderImage:function(t){return Object(i["a"])().get("remove-provider-image/".concat(t))},saveStepLocationBased:function(t){return Object(i["a"])().post("step-location-based",t)},saveStepLocationRemote:function(t){return Object(i["a"])().post("step-location-remote",t)},saveStepOperation:function(t){return Object(i["a"])().post("step-operation",t)},getProfileDetails:function(t){return Object(i["a"])().get("providers/".concat(t))}}},3548:function(t,e,a){"use strict";var i=a("bb36");e["a"]={getAllPermissions:function(){return Object(i["a"])().get("permissions")},getAllRoles:function(){return Object(i["a"])().get("roles")},getRoleDetails:function(t){return Object(i["a"])().get("roles/".concat(t))},editRole:function(t,e){return Object(i["a"])().post("roles/".concat(t),e)},saveRole:function(t){return Object(i["a"])().post("roles",t)},saveAdmin:function(t){return Object(i["a"])().post("admins",t)},getAdminInfo:function(t){return Object(i["a"])().get("admins/".concat(t))},editAdmin:function(t,e){return Object(i["a"])().post("admins/".concat(t),e)}}},"54b9":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-container",{attrs:{fluid:""}},[a("main-modal",{attrs:{id:"tempCloseModal",size:"md"},on:{unsavedMsg:t.unsavedMsg},scopedSlots:t._u([{key:"header",fn:function(){return[a("h4",{staticClass:"font-weight-bold"},[a("span",{staticClass:"text-danger"},[t._v("Temporary close: ")]),t._v(" Account")])]},proxy:!0},{key:"body",fn:function(){return[a("temp-msg-modal",{attrs:{statusDetails:t.statusDetails},on:{setMsg:t.setTempCloseMsg}})]},proxy:!0}])}),a("b-row",[a("b-col",{staticClass:"mb-2 d-flex justify-content-between align-items-center mb-4",attrs:{md:"12"}},[a("h3",[t._v("Profile")]),a("div",[a("b-form-radio",{staticClass:"custom-radio-color-checked mr-4",attrs:{inline:"",color:"warning",name:"status",value:"visible"},on:{change:function(e){return t.changeStatus(0)}},model:{value:t.oldProfile.status,callback:function(e){t.$set(t.oldProfile,"status",e)},expression:"oldProfile.status"}},[a("span",{staticClass:"text-primary font-size-14"},[t._v("Visible")])]),a("b-form-radio",{staticClass:"custom-radio-color-checked mr-4",attrs:{inline:"",color:"warning",name:"status",value:"invisible"},on:{change:function(e){return t.changeStatus(0)}},model:{value:t.oldProfile.status,callback:function(e){t.$set(t.oldProfile,"status",e)},expression:"oldProfile.status"}},[a("span",{staticClass:"text-primary font-size-14"},[t._v("Invisible")])]),a("b-form-radio",{staticClass:"custom-radio-color-checked mr-4",attrs:{inline:"",color:"warning",name:"status",value:"temp_closed"},on:{change:function(e){return t.changeStatus(1)}},model:{value:t.oldProfile.status,callback:function(e){t.$set(t.oldProfile,"status",e)},expression:"oldProfile.status"}},[a("span",{staticClass:"text-primary font-size-14"},[t._v("Temporary closed")])])],1)]),a("b-col",{attrs:{md:"12"}},[a("tab-nav",{attrs:{tabs:!0,id:"myTab-1"}},[a("tab-nav-items",{attrs:{active:!0,id:"admin-tab",ariaControls:"adminInfo",role:"tab",ariaSelected:!0,title:"Admin information"}}),a("tab-nav-items",{attrs:{active:!1,id:"business-tab",ariaControls:"businessInfo",role:"tab",ariaSelected:!1,title:"Business information"}})],1),a("tab-content",{attrs:{id:"myTabContent"}},[a("tab-content-item",{attrs:{active:!0,id:"adminInfo","aria-labelled-by":"admin-tab"}},[t.loading?a("spinner-loading",{attrs:{text:"Loading"}}):a("admin-tab",{attrs:{oldProfile:t.oldProfile},on:{updateLoginCredential:t.updateLoginCredential,updateContactInfo:t.updateContactInfo}})],1),a("tab-content-item",{attrs:{active:!1,id:"businessInfo","aria-labelled-by":"business-tab"}},[t.loading?a("spinner-loading",{attrs:{text:"Loading"}}):a("business-tab",{attrs:{oldProfile:t.oldProfile},on:{updateFacilityInfo:t.updateFacilityInfo,updateFacilityPhones:t.updateFacilityPhones,updateFacilityOperatingDays:t.updateFacilityOperatingDays}})],1)],1)],1)],1)],1)},n=[],s=a("bcae"),o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("b-row",[a("b-col",{attrs:{md:"9"}},[a("validationObserver",{scopedSlots:t._u([{key:"default",fn:function(e){var i=e.handleSubmit;return[a("b-form",{on:{submit:function(e){return e.preventDefault(),i(t.updateLoginCredential)}}},[a("b-card",{staticClass:"mb-5"},[a("b-card-header",{staticClass:"mb-4"},[a("h4",[t._v("Login")])]),a("b-card-body",[a("b-row",{staticClass:"mb-4"},[a("b-col",{staticClass:"mb-3",attrs:{md:"4"}},[a("input-form",{attrs:{name:"Email address",validate:"required|email",label:"Facility email address"},model:{value:t.profile.email,callback:function(e){t.$set(t.profile,"email",e)},expression:"profile.email"}})],1),a("b-col",{staticClass:"mb-3",attrs:{md:"4"}},[a("input-form",{attrs:{name:"New password",label:"New password"},model:{value:t.newPassword,callback:function(e){t.newPassword=e},expression:"newPassword"}})],1),a("b-col",{staticClass:"mb-3",attrs:{md:"4"}},[a("input-form",{attrs:{name:"Confirm password",label:"Confirm password"},model:{value:t.confirmPassword,callback:function(e){t.confirmPassword=e},expression:"confirmPassword"}})],1)],1),a("button",{staticClass:"btn radio-btn radio-btn-orange save-changes-btn"},[t._v(" Save changes ")])],1)],1)],1)]}}])}),a("validationObserver",{scopedSlots:t._u([{key:"default",fn:function(e){var i=e.handleSubmit;return[a("b-form",{on:{submit:function(e){return e.preventDefault(),i(t.updateContactInfo)}}},[a("b-card",{staticClass:"mb-5"},[a("b-card-header",{staticClass:"mb-5"},[a("h4",{staticClass:"pb-2"},[t._v("Contacts")])]),a("b-card-body",[t._l(t.contacts,(function(e,i){return a("b-row",{key:i,staticClass:"mb-3"},[a("b-col",{attrs:{md:"4"}},[a("input-form",{attrs:{placeholder:"Ex: Eslam Ashraf",validate:"required",name:"Full Name "+(i+1),label:"Full Name"},model:{value:e.name,callback:function(a){t.$set(e,"name",a)},expression:"contact.name"}})],1),a("b-col",{attrs:{md:"4"}},[a("input-form",{attrs:{placeholder:"Ex: Owner",validate:"required",name:"Role or Job "+(i+1),label:"Role or Job"},model:{value:e.job,callback:function(a){t.$set(e,"job",a)},expression:"contact.job"}})],1),a("b-col",{staticClass:"position-relative",attrs:{md:"4"}},[a("input-form",{attrs:{placeholder:"Ex: 01095097908",validate:"required|numeric",name:"Phone Number "+(i+1),label:"Phone Number"},model:{value:e.phone,callback:function(a){t.$set(e,"phone",a)},expression:"contact.phone"}}),0==i?a("span",{staticClass:"text-danger deleteLabelButtonAdmin cursor-pointer",on:{click:function(e){return t.clearFirstContact(i)}}},[t._v("Clear Contact ")]):a("span",{staticClass:"text-danger deleteLabelButtonAdmin cursor-pointer",on:{click:function(e){return t.deleteAdditionalContact(i)}}},[t._v("Delete Contact ")])],1)],1)})),a("b-row",{staticClass:"mb-5"},[a("b-col",{attrs:{md:"12"}},[a("span",{staticClass:"text-warning cursor-pointer mb-2",on:{click:t.addAdditionalContact}},[t._v("+ Add another Contact")])])],1),a("button",{staticClass:"btn radio-btn radio-btn-orange save-changes-btn"},[t._v(" Save changes ")])],2)],1)],1)]}}])})],1)],1)],1)},l=[],r=a("5530"),c=(a("b0c0"),a("a434"),{props:{oldProfile:{type:Object}},data:function(){return{newPassword:"",confirmPassword:"",profile:{name:"",email:"",password:"",role_id:""},contacts:[{name:"",job:"",phone:""}]}},methods:{updateLoginCredential:function(){this.newPassword===this.confirmPassword&&(this.profile.password=this.newPassword,this.$emit("updateLoginCredential",Object(r["a"])(Object(r["a"])({},this.profile),{},{_method:"post"})))},updateContactInfo:function(){this.contacts.length>0?this.$emit("updateContactInfo",{contact:this.contacts}):console.log("You should have at least 1 contact info")},addAdditionalContact:function(){this.contacts.push({name:"",job:"",phone:""})},clearFirstContact:function(t){console.log(this.contacts),this.contacts[t].name="",this.contacts[t].job="",this.contacts[t].phone="",console.log(this.contacts)},deleteAdditionalContact:function(t){this.contacts.splice(t,1)}},created:function(){this.oldProfile&&(this.profile.name=this.oldProfile.name,this.profile.email=this.oldProfile.email,this.profile.role_id=this.oldProfile.role_id,this.contacts=this.oldProfile.contacts)}}),d=c,u=a("2877"),m=Object(u["a"])(d,o,l,!1,null,null,null),f=m.exports,p=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t.loading?a("spinner-loading",{attrs:{text:"Loading"}}):a("div",[a("b-row",[a("b-col",{attrs:{md:"9"}},[a("validationObserver",{scopedSlots:t._u([{key:"default",fn:function(e){var i=e.handleSubmit;return[a("b-form",{on:{submit:function(e){return e.preventDefault(),i(t.saveChangesInfo)}}},[a("b-card",{staticClass:"mb-5"},[a("b-card-header",{staticClass:"mb-4"},[a("h4",[t._v("Facility Information & Details")])]),a("b-card-body",[a("b-row",{attrs:{md:"12"}},[a("b-col",{staticClass:"mb-3",attrs:{md:"2"}},[a("main-select",{attrs:{labelTitle:"Activity Line",validate:"required",name:"activity_line_id",placeholder:"Choose",options:t.allActivityLines,label:"name",disabled:"",reduce:function(t){return t.id}},model:{value:t.info.activity_line_id,callback:function(e){t.$set(t.info,"activity_line_id",e)},expression:"info.activity_line_id"}})],1),a("b-col",{staticClass:"mb-3",attrs:{md:"2"}},[a("main-select",{attrs:{labelTitle:"Activity Type",validate:"required",name:"activity_type_id",placeholder:"Choose",options:t.allActivityTypes,label:"name",disabled:"",reduce:function(t){return t.id}},model:{value:t.info.activity_type_id,callback:function(e){t.$set(t.info,"activity_type_id",e)},expression:"info.activity_type_id"}})],1),a("b-col",{staticClass:"mb-3",attrs:{md:"2"}},[a("input-form",{attrs:{placeholder:"Ex: 2022",validate:"required|numeric",name:"year",disabled:"",label:"Launch Year"},model:{value:t.info.year,callback:function(e){t.$set(t.info,"year",e)},expression:"info.year"}})],1),a("b-col",{staticClass:"mb-3",attrs:{md:"6"}},[a("input-form",{attrs:{placeholder:"Ex: Diving",validate:"required",name:"name",disabled:"",label:"Facility Name"},model:{value:t.info.name,callback:function(e){t.$set(t.info,"name",e)},expression:"info.name"}})],1)],1),a("b-row",[a("b-col",{staticClass:"mb-3",attrs:{md:"6"}},[a("input-form",{attrs:{placeholder:"Ex: The Yoga Studio",validate:"required",name:"title",label:"Facility Title"},model:{value:t.info.title,callback:function(e){t.$set(t.info,"title",e)},expression:"info.title"}})],1),a("b-col",{staticClass:"mb-3",attrs:{md:"6"}},[a("main-select",{attrs:{labelTitle:"Team Languages",validate:"required",multiple:!0,name:"languages",placeholder:"Choose",options:t.allLanguages,label:"name",reduce:function(t){return t.name}},model:{value:t.info.languages,callback:function(e){t.$set(t.info,"languages",e)},expression:"info.languages"}})],1)],1),a("b-row",[a("b-col",{staticClass:"mb-3",attrs:{md:"12"}},[a("main-select",{attrs:{labelTitle:"Facility Tags",validate:"required",taggable:!0,multiple:"",name:"tags",placeholder:"Write Tags",numberOfSelect:3},model:{value:t.info.tags,callback:function(e){t.$set(t.info,"tags",e)},expression:"info.tags"}})],1)],1),a("b-row",[a("b-col",{staticClass:"mb-3",attrs:{md:"12"}},[a("b-form-group",{attrs:{label:"Facility Bio","label-for":"Facility Bio"}},[a("ValidationProvider",{ref:"Facility Bio",attrs:{name:"Facility Bio",rules:"required"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.errors;return[a("b-form-textarea",{class:i.length>0?" is-invalid":"",attrs:{placeholder:"Facility Bio...",rows:"2"},model:{value:t.info.bio,callback:function(e){t.$set(t.info,"bio",e)},expression:"info.bio"}}),a("div",{staticClass:"invalid-feedback"},[a("span",[t._v(t._s(i[0]))])])]}}],null,!0)})],1)],1)],1),a("b-row",[a("label",{staticClass:"w-100 pl-3 mb-2"},[t._v("Amenities")]),t._l(t.allAmenities,(function(e,i){return a("b-col",{key:i,staticClass:"mb-3",attrs:{md:"4",lg:"2"}},[a("b-form-checkbox",{staticClass:"custom-checkbox-color-check",attrs:{color:"warning",value:e.id},model:{value:t.info.amenities,callback:function(e){t.$set(t.info,"amenities",e)},expression:"info.amenities"}},[a("span",{staticClass:"text-primary font-size-12"},[t._v(t._s(e.name))])])],1)}))],2),a("b-row",[t._l(t.info.links,(function(e,i){return a("b-col",{key:i,staticClass:"mb-1",attrs:{md:"6"}},[a("b-form-group",{staticClass:"position-relative",attrs:{label:"URL Links","label-for":"URL Links"}},[a("span",{staticClass:"text-danger deleteLabelButton cursor-pointer",on:{click:function(e){return t.deleteLink(i)}}},[t._v("Delete ")]),a("b-input-group",{scopedSlots:t._u([{key:"prepend",fn:function(){return[a("b-dropdown",{staticClass:"selectWithInput",attrs:{text:e.selectSocial.name?e.selectSocial.name:"Choose"}},t._l(t.filterLinks,(function(i,n){return a("b-dropdown-item",{key:n,on:{click:function(t){e.selectSocial.name=i.name,e.selectSocial.id=i.id}}},[t._v(" "+t._s(i.name)+" ")])})),1)]},proxy:!0}],null,!0)},[a("validation-provider",{staticClass:"flex-grow-1",attrs:{name:"URL Link "+(i+1),rules:"required"},scopedSlots:t._u([{key:"default",fn:function(i){var n=i.errors;return[a("b-form-input",{class:[{"is-invalid":n.length>0}],attrs:{id:"mm",placeholder:"Ex: https://www.google.com",disabled:!e.selectSocial},model:{value:e.link,callback:function(a){t.$set(e,"link",a)},expression:"item.link"}})]}}],null,!0)})],1)],1)],1)})),t.allLinks.length!==t.info.links.length?a("b-col",{staticClass:"mb-3",attrs:{md:"12"}},[a("span",{staticClass:"text-warning cursor-pointer",on:{click:t.addNewLink}},[t._v("+ Add another Link")])]):t._e()],2),a("button",{staticClass:"btn radio-btn radio-btn-orange save-changes-btn"},[t._v(" Save changes ")])],1)],1)],1)]}}])}),a("validationObserver",{scopedSlots:t._u([{key:"default",fn:function(e){var i=e.handleSubmit;return[a("b-form",{on:{submit:function(e){return e.preventDefault(),i(t.saveChangesPhone)}}},[a("b-card",{staticClass:"mb-5"},[a("b-card-header",{staticClass:"mb-4"},[a("h4",[t._v("Facility Contacts and Location Details")])]),a("b-card-body",["based"===t.typeOfLocation?a("b-row",{staticClass:"mb-4"},[a("b-col",{attrs:{md:"3"}},[t._v(" "+t._s(t.formattedBasedLocation)+" ")]),a("b-col",{attrs:{md:"9"}},[t._v(" "+t._s(t.based.location)+" ")]),a("b-col",{attrs:{md:"12"}},[a("span",{staticClass:"text-warning cursor-pointer",on:{click:t.requestAddressChange}},[t._v(" Request to Edit or change Address")])])],1):a("b-row",{staticClass:"mb-4"},[a("b-col",[t._v(" "+t._s(t.formattedRemoteLocation)+" ")])],1),a("b-row",{staticClass:"mb-4"},[t._l(t.phones,(function(e,i){return a("b-col",{key:i,staticClass:"mb-1",attrs:{md:"6"}},[a("b-form-group",{staticClass:"position-relative",attrs:{label:"Contact Number "+(i+1),"label-for":"Contact Number "+(i+1)}},[0!=i?a("span",{staticClass:"text-danger deleteLabelButton cursor-pointer",on:{click:function(e){return t.deleteContact(i)}}},[t._v("Delete ")]):t._e(),a("b-input-group",{scopedSlots:t._u([{key:"prepend",fn:function(){return[a("b-dropdown",{staticClass:"selectWithInput",attrs:{text:e.type?e.type:"Choose"}},t._l(t.contactTypes,(function(i,n){return a("b-dropdown-item",{key:n,on:{click:function(t){e.type=i}}},[t._v(" "+t._s(i)+" ")])})),1)]},proxy:!0}],null,!0)},[a("validation-provider",{staticClass:"flex-grow-1",attrs:{name:"Contact Number "+(i+1),rules:"required"},scopedSlots:t._u([{key:"default",fn:function(i){var n=i.errors;return[a("b-form-input",{class:[{"is-invalid":n.length>0}],attrs:{id:"mm",placeholder:"Ex: 020454684",disabled:!e.type},model:{value:e.number,callback:function(a){t.$set(e,"number",a)},expression:"item.number"}})]}}],null,!0)})],1)],1)],1)})),a("b-col",{staticClass:"mb-3",attrs:{md:"12"}},[a("span",{staticClass:"text-warning cursor-pointer",on:{click:t.addNewContactNumber}},[t._v("+ Add another Contact Number")])])],2),a("button",{staticClass:"btn radio-btn radio-btn-orange save-changes-btn"},[t._v(" Save changes ")])],1)],1)],1)]}}])}),a("validationObserver",{scopedSlots:t._u([{key:"default",fn:function(e){var i=e.handleSubmit;return[a("b-form",{on:{submit:function(e){return e.preventDefault(),i(t.saveChangesOperatingDays)}}},[a("b-card",{staticClass:"mb-5"},[a("b-card-header",{staticClass:"mb-4"},[a("h4",[t._v("Facility Operating Days & Hours")])]),a("b-card-body",[a("b-row",{staticClass:"mb-4"},[a("b-row",{staticClass:"mb-5"},[a("b-col",{attrs:{md:"12"}},[a("label",{staticClass:"mb-3"},[t._v("Operation")]),a("div",[a("b-form-radio",{staticClass:"custom-radio-color-checked mr-5",attrs:{inline:"",color:"warning",name:"typeOfOperation",value:"24 hours"},model:{value:t.typeOfOperation,callback:function(e){t.typeOfOperation=e},expression:"typeOfOperation"}},[a("span",{staticClass:"text-primary font-size-12"},[t._v("Open 24 Hours")])]),a("b-form-radio",{staticClass:"custom-radio-color-checked",attrs:{inline:"",color:"warning",name:"typeOfOperation",value:"specify days"},model:{value:t.typeOfOperation,callback:function(e){t.typeOfOperation=e},expression:"typeOfOperation"}},[a("span",{staticClass:"text-primary font-size-12"},[t._v("Specify Days(s) and Hours")])])],1)])],1),"24 hours"!==t.typeOfOperation?a("b-row",[t._l(t.allOperation,(function(e,i){return a("b-col",{key:i,staticClass:"position-relative mb-3",attrs:{md:"12"}},[a("b-row",{staticClass:"d-flex align-items-center"},[a("b-col",{staticClass:"mb-3",attrs:{md:"4"}},[a("main-select",{attrs:{labelTitle:"Operation Day (s)",validate:"required",name:"Operation Day "+(i+1),placeholder:"Choose",options:t.allDays,multiple:!0,label:"value",reduce:function(t){return t.key}},model:{value:e.days,callback:function(a){t.$set(e,"days",a)},expression:"operation.days"}})],1),a("b-col",{staticClass:"mb-3",attrs:{md:"4"}},[a("input-form",{attrs:{placeholder:"00:00 AM",validate:"required",name:"From "+(i+1),label:"From",type:"time"},model:{value:e.from,callback:function(a){t.$set(e,"from",a)},expression:"operation.from"}})],1),a("b-col",{staticClass:"mb-3",attrs:{md:"4"}},[a("input-form",{attrs:{placeholder:"00:00 AM",validate:"required",name:"To "+(i+1),label:"To",type:"time"},model:{value:e.to,callback:function(a){t.$set(e,"to",a)},expression:"operation.to"}})],1)],1),a("span",{staticClass:"text-danger deleteLabelButton cursor-pointer",on:{click:function(e){return t.deleteOperationDay(i)}}},[t._v("Delete")])],1)})),a("b-col",{staticClass:"mb-3",attrs:{md:"12"}},[a("span",{staticClass:"text-warning cursor-pointer",on:{click:t.addNewOperation}},[t._v("+ Add another Operation Day (s)")])]),a("b-col",{attrs:{md:"12"}},[a("p",{staticClass:"text-gray"},[t._v("Note: Specify working days & hours only, any day unspecified will automatically be set as “closed”.")])])],2):t._e()],1),a("button",{staticClass:"btn radio-btn radio-btn-orange save-changes-btn"},[t._v(" Save changes ")])],1)],1)],1)]}}])})],1),a("b-col",{attrs:{md:"3"}},[a("b-card",{attrs:{"img-src":t.coverImage,"img-top":"",align:"center"}},[a("b-card-img",{staticClass:"card-profile-img mb-5",attrs:{src:t.logoImage}}),a("h3",{staticClass:"border-top border-bottom p-3 mb-3"},[t._v("Facility photos")]),a("b-card-body",[a("b-row",{staticClass:"row flex-nowrap mb-4"},[t.images?a("div",t._l(t.images,(function(t,e){return a("b-col",{key:e,attrs:{md:"3"}},[a("b-img",{staticClass:"img-fluid",attrs:{src:t.image,alt:"img.name"}})],1)})),1):a("div",[a("span",[t._v("No images to show")])])])],1),a("b-card-text",[a("b-row",{staticClass:"border-top mb-2 pt-4"},[a("b-col",[a("span",{staticClass:"text-warning cursor-pointer",on:{click:t.addNewLink}},[t._v("Upload photo")])]),a("b-col",[a("span",{staticClass:"text-secondry cursor-pointer",on:{click:t.addNewLink}},[t._v("Remove")])])],1)],1)],1)],1)],1)],1)],1)},b=[],h=a("2909"),g=(a("d3b7"),a("159b"),a("caad"),a("2532"),a("c740"),a("99af"),a("d81d"),a("2009")),v=a("df21"),y={props:{oldProfile:{type:Object}},data:function(){return{loading:"",info:{activity_line_id:"",activity_type_id:"",year:"",name:"",title:"",languages:[],bio:"",tags:[],amenities:[],links:[{selectSocial:{id:"",name:""},link:""}]},based:{country_id:"",city_id:"",area_id:"",address:"",latitude:"",longitude:"",location:""},contactTypes:["Landline","Mobile"],remote:{location:[{availability_type:null,country_id:null,city_id:null,areas:[]}]},phones:[{type:"",number:""}],typeOfLocation:"",typeOfOperation:"",city:"",country:"",area:"",images:[],logoImage:"",coverImage:"",allDays:[{key:"Sat",value:"Saturday"},{key:"Sun",value:"Sunday"},{key:"Mon",value:"Monday"},{key:"Tue",value:"Tuesday"},{key:"Wed",value:"Wednesday"},{key:"Thu",value:"Thursday"},{key:"Fri",value:"Friday"}],allOperation:[{days:[],from:"",to:""}],allActivityLines:[],allActivityTypes:[],allLanguages:[],allLinks:[],allAmenities:[],formattedBasedLocation:"",formattedRemoteLocation:""}},computed:{filterLinks:function(){var t=Object(h["a"])(this.allLinks);return this.info.links.forEach((function(e){if(t.includes(e.selectSocial)){var a=t.findIndex((function(t){return t===e.selectSocial}));t.splice(a,1)}})),t}},methods:{addNewGeneralAdminInformation:function(){this.adminInformation.push({name:"",job:"",phone:""})},deleteGeneralAdminInformation:function(t){this.adminInformation.splice(t,1)},savelogoImage:function(t){var e=this,a=new FormData;console.log(t),a.append("image",t.image),a.append("name",t.imageInfo.name),a.append("type","logo"),a.append("provider_id",this.providerId);var i={onUploadProgress:function(t){var a=t.loaded,i=t.total,n=Math.floor(100*a/i);e.loadingLogo=n}};g["a"].uploadProviderImage(a,i).then((function(t){s["c"].showSnackbar("success",t.data.message),e.logoImage=""}))},saveCoverImage:function(t){var e=this,a=new FormData;console.log(t),a.append("image",t.image),a.append("name",t.imageInfo.name),a.append("type","cover"),a.append("provider_id",this.providerId);var i={onUploadProgress:function(t){var a=t.loaded,i=t.total,n=Math.floor(100*a/i);e.loadingCover=n}};g["a"].uploadProviderImage(a,i).then((function(t){s["c"].showSnackbar("success",t.data.message),e.coverImage=""}))},saveGalleryImage:function(t){var e=this;this.removeLoadingUi=!1;var a=new FormData;a.append("image",t.image),a.append("name",t.imageInfo.name),a.append("type","gallery"),a.append("provider_id",this.providerId);var i={onUploadProgress:function(t){var a=t.loaded,i=t.total,n=Math.floor(100*a/i);e.loadingGallery=n}};g["a"].uploadProviderImage(a,i).then((function(t){s["c"].showSnackbar("success",t.data.message),e.images.push(t.data.data),e.removeLoadingUi=!0}))},removeGalleryImage:function(t){var e=this;g["a"].removeProviderImage(t).then((function(a){s["c"].showSnackbar("success",a.data.message);var i=e.images.findIndex((function(e){return e.id===t}));e.images.splice(i,1)}))},cropperFile:function(t){console.log("file",t)},addNewLink:function(){this.info.links.push({selectSocial:{id:"",name:""},link:""})},deleteLink:function(t){this.info.links.splice(t,1)},deleteContact:function(t){this.phones.splice(t,1)},addNewContactNumber:function(){this.phones.push({type:"",number:""})},addNewzone:function(){this.remote.location.push({availability_type:null,country_id:null,city_id:null,areas:[]})},deletezone:function(t){this.remote.location.splice(t,1)},addNewOperation:function(){this.allOperation.push({days:[],from:"",to:""})},deleteOperationDay:function(t){this.allOperation.splice(t,1)},getAllActivityLine:function(){var t=this;v["a"].getAllActivityLine().then((function(e){t.allActivityLines=e.data.data}))},getAllActivityType:function(){var t=this;v["a"].getAllActivityType().then((function(e){t.allActivityTypes=e.data.data}))},getAllLanguages:function(){var t=this;v["a"].getAllLanguages().then((function(e){t.allLanguages=e.data.data}))},getAllLinks:function(){var t=this;v["a"].getAllLinks().then((function(e){t.allLinks=e.data.data}))},getAllAmenities:function(){var t=this;v["a"].getAllAmenities().then((function(e){t.allAmenities=e.data.data}))},formatBasedLocation:function(){this.formattedBasedLocation="".concat(this.based.address,",\n                                      ").concat(this.area,",\n                                      ").concat(this.city,",\n                                      ").concat(this.country)},formatRemoteLocation:function(){},fillData:function(){this.oldProfile&&(this.providerId=this.oldProfile.id,this.adminInformation=this.oldProfile.contacts,this.info.activity_line_id=this.oldProfile.activity_line_id,this.info.activity_type_id=this.oldProfile.activity_type_id,this.info.year=this.oldProfile.year,this.info.name=this.oldProfile.name,this.info.title=this.oldProfile.title,this.info.languages=this.oldProfile.languages,this.info.bio=this.oldProfile.bio,this.info.amenities=this.oldProfile.amenities.map((function(t){return t.id})),this.info.links=this.oldProfile.links,this.info.tags=this.oldProfile.tags,this.service_types=this.oldProfile.service_types,this.logoImage=this.oldProfile.logo?this.oldProfile.logo:a("c978"),this.coverImage=this.oldProfile.cover?this.oldProfile.cover:a("c978"),this.images=this.oldProfile.images,this.phones=this.oldProfile.phones,"24 hours"===this.oldProfile.operation_type?this.typeOfOperation="24 hours":(this.typeOfOperation="specify days",this.allOperation=this.oldProfile.operations),"address based"===this.oldProfile.location_type?(this.typeOfLocation="based",this.based=this.oldProfile.address_based,this.city=this.oldProfile.city.name,this.country=this.oldProfile.country.name,this.area=this.oldProfile.area.name,this.formatBasedLocation()):(this.typeOfLocation="remote",this.remote=this.oldProfile.remote,this.formatRemoteLocation()),this.loading=!1)},checkLoading:function(){},saveChangesInfo:function(){var t=Object(r["a"])({_method:"post"},this.info);this.$emit("updateFacilityInfo",t)},saveChangesPhone:function(){var t={};"based"===this.typeOfLocation?(t=Object(r["a"])(Object(r["a"])({phones:this.phones},this.based),{},{location_type:"address based"}),console.log(t)):t=Object(r["a"])(Object(r["a"])({phones:this.phones},this.remote),{},{location_type:"remote location"});var e=Object(r["a"])({_method:"post"},t);this.$emit("updateFacilityPhones",this.typeOfLocation,e)},saveChangesOperatingDays:function(){var t={};t="24 hours"===this.typeOfOperation?{operation_type:"24 hours"}:{operation_type:"specify days",operation:this.allOperation};var e=Object(r["a"])(Object(r["a"])({_method:"put"},t),{},{service_types:this.service_types});this.$emit("updateFacilityOperatingDays",e)},requestAddressChange:function(){}},mounted:function(){this.fillData()},created:function(){this.getAllActivityLine(),this.getAllActivityType(),this.getAllLanguages(),this.getAllLinks(),this.getAllAmenities()}},C=y,_=Object(u["a"])(C,p,b,!1,null,null,null),k=_.exports,O=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("ValidationObserver",{scopedSlots:t._u([{key:"default",fn:function(e){var i=e.handleSubmit;return[a("b-form",{on:{submit:function(e){return e.preventDefault(),i(t.saveStatus)}}},[a("b-row",[a("b-col",{staticClass:"mb-3 p-3",attrs:{md:"12"}},[a("validation-provider",{staticClass:"flex-grow-1",attrs:{name:"Message",rules:"required"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.errors;return[a("b-form-group",{attrs:{label:"Leave a message to your users"}},[a("b-form-textarea",{class:[{"is-invalid":i.length>0}],attrs:{label:"message",placeholder:"Write your temporary close message . .",rows:"1"},model:{value:t.status_msg,callback:function(e){t.status_msg=e},expression:"status_msg"}})],1)]}}],null,!0)})],1),a("b-col",{staticClass:"mt-4",attrs:{md:"12"}},[a("div",{staticClass:"d-flex justify-content-center"},[t.requestLoading?a("b-button",{staticClass:"button-blue-modal"},[a("spinner-loading")],1):a("b-button",{staticClass:"btn p-3",attrs:{variant:"danger",type:"submit"}},[t._v(" Temporary close ")])],1)])],1)],1)]}}])})],1)},w=[],L={props:{requestLoading:{type:Boolean,default:!1,required:!1},statusDetails:{required:!1}},data:function(){return{status:"temp_closed",status_msg:""}},methods:{saveStatus:function(){this.$emit("setMsg",{status:this.status,status_msg:this.status_msg})}},created:function(){console.log(this.statusDetails),this.statusDetails&&(this.status_msg=this.statusDetails.status_msg)}},P=L,A=Object(u["a"])(P,O,w,!1,null,null,null),x=A.exports,S=a("bb36"),j={changeStatus:function(t){return Object(S["a"])().post("update-status",t)}},I=a("3548"),D=a("a740"),T={data:function(){return{loading:!0,oldProfile:"",id:"",statusDetails:{status:"",status_msg:""}}},components:{tempMsgModal:x,adminTab:f,businessTab:k},methods:{changeStatus:function(t){t?this.$bvModal.show("tempCloseModal"):this.setStatus()},setStatus:function(){j.changeStatus({status:this.oldProfile.status}).then((function(t){s["c"].showSnackbar("success",t.data.message)}))},setTempCloseMsg:function(t){var e=this;j.changeStatus(t).then((function(t){e.$bvModal.hide("tempCloseModal"),s["c"].showSnackbar("success",t.data.message)}))},unsavedMsg:function(){this.oldProfile.status=this.statusDetails.status},getOldAdminInfo:function(){var t=this;this.id=JSON.parse(localStorage.getItem("userInfo")).id,D["a"].getActivationDetails(this.id).then((function(e){t.oldProfile=e.data.data,t.statusDetails={status:t.oldProfile.status,status_msg:t.oldProfile.status_msg},console.log(t.statusDetails),t.loading=!1}))},updateLoginCredential:function(t){I["a"].saveAdmin(t).then((function(t){s["c"].showSnackbar("success",t.data.message)}))},updateContactInfo:function(t){g["a"].saveStepAdmin(t).then((function(t){s["c"].showSnackbar("success",t.data.message)}))},updateFacilityInfo:function(t){g["a"].saveStepFacility(t).then((function(t){s["c"].showSnackbar("success",t.data.message)}))},updateFacilityPhones:function(t,e){"based"===this.typeOfLocation?g["a"].saveStepLocationBased(e).then((function(t){s["c"].showSnackbar("success",t.data.message)})):g["a"].saveStepLocationRemote(e).then((function(t){s["c"].showSnackbar("success",t.data.message)}))},updateFacilityOperatingDays:function(t){g["a"].saveStepOperation(t).then((function(t){s["c"].showSnackbar("success",t.data.message)}))}},created:function(){this.getOldAdminInfo()},mounted:function(){s["c"].index()}},F=T,N=Object(u["a"])(F,i,n,!1,null,null,null);e["default"]=N.exports},a740:function(t,e,a){"use strict";var i=a("bb36");e["a"]={getActivationDetails:function(t){return Object(i["a"])().get("activations/".concat(t))},activateProvider:function(t,e){return Object(i["a"])().post("activations/".concat(t),e)}}},df21:function(t,e,a){"use strict";var i=a("bb36");e["a"]={getProfileSettings:function(){return Object(i["a"])().get("settings")},updateProfileSettings:function(t){return Object(i["a"])().post("settings",t)},getAllActivityLine:function(){return Object(i["a"])().get("activityLines")},addNewActivityLine:function(t){return Object(i["a"])().post("activityLines",t)},getAllActivityType:function(){return Object(i["a"])().get("activityTypes")},addNewActivityType:function(t){return Object(i["a"])().post("activityTypes",t)},getDurationList:function(){return Object(i["a"])().get("durationLists")},addNewDurationList:function(t){return Object(i["a"])().post("durationLists",t)},getAllnationalities:function(){return Object(i["a"])().get("nationalities")},addNewNationality:function(t){return Object(i["a"])().post("nationalities",t)},getAllAccommodationTypes:function(){return Object(i["a"])().get("accommodationTypes")},addNewAccommodationType:function(t){return Object(i["a"])().post("accommodationTypes",t)},getAllLinks:function(){return Object(i["a"])().get("links")},addNewLink:function(t){return Object(i["a"])().post("links",t)},getAllLanguages:function(){return Object(i["a"])().get("languages")},addNewLanguage:function(t){return Object(i["a"])().post("languages",t)},getAllCountries:function(){return Object(i["a"])().get("countries")},getCountryCity:function(t){return Object(i["a"])().get("countries/".concat(t))},addNewCountry:function(t){return Object(i["a"])().post("countries",t)},getAllCities:function(){return Object(i["a"])().get("cities")},addNewCity:function(t){return Object(i["a"])().post("cities",t)},getCityArea:function(t){return Object(i["a"])().get("cities/".concat(t))},getAllAreas:function(){return Object(i["a"])().get("areas")},addNewArea:function(t){return Object(i["a"])().post("areas",t)},getAllAmenities:function(){return Object(i["a"])().get("amenities")}}}}]);
//# sourceMappingURL=chunk-50c0eedc.662280fe.js.map