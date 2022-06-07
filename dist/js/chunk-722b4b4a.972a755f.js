(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-722b4b4a"],{2009:function(t,e,a){"use strict";var i=a("bb36");e["a"]={saveStepAdmin:function(t){return Object(i["a"])().post("step-admin",t)},saveStepFacility:function(t){return Object(i["a"])().post("step-facility",t)},uploadProviderImage:function(t,e){return Object(i["a"])().post("provider-image",t,e)},removeProviderImage:function(t){return Object(i["a"])().get("remove-provider-image/".concat(t))},saveStepLocationBased:function(t){return Object(i["a"])().post("step-location-based",t)},saveStepLocationRemote:function(t){return Object(i["a"])().post("step-location-remote",t)},saveStepOperation:function(t){return Object(i["a"])().post("step-operation",t)},getProfileDetails:function(t){return Object(i["a"])().get("providers/".concat(t))}}},a740:function(t,e,a){"use strict";var i=a("bb36");e["a"]={getActivationDetails:function(t){return Object(i["a"])().get("activations/".concat(t))},activateProvider:function(t,e){return Object(i["a"])().post("activations/".concat(t),e)}}},aecc:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-container",{attrs:{fluid:""}},[a("main-modal",{attrs:{id:"activationDetalilsModal",size:"lg"},scopedSlots:t._u([{key:"header",fn:function(){return[a("h4",{staticClass:"font-weight-bold"},[t._v("Business Request")])]},proxy:!0},{key:"body",fn:function(){return[a("activation-details",{attrs:{activationDetails:t.activationDetails,loadingActivation:t.loadingActivation},on:{"activation-provider":t.activate}})]},proxy:!0}])}),a("b-row",[a("b-col",{staticClass:"mb-2",attrs:{lg:"12"}},[a("h3",[t._v("Activation")])]),a("b-col",{attrs:{lg:"12"}},[a("main-table",{staticClass:"mb-0 table-borderless",attrs:{fields:t.columns,list_url:"activations",reloadData:t.reloadTable},on:{sortChanged:t.sortChanged}})],1)],1)],1)},o=[],n=(a("d3b7"),a("bcae")),s=a("a740"),l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("ValidationObserver",{scopedSlots:t._u([{key:"default",fn:function(e){var i=e.handleSubmit;return[a("b-form",{on:{submit:function(e){return e.preventDefault(),i(t.saveChanges)}}},[a("div",{staticClass:"mb-5"},[a("div",{staticClass:"border-bottom mb-2"},[a("h5",{staticClass:"pb-2"},[t._v("General Admin Information: Contacts")])]),t._l(t.adminInformation,(function(e,i){return a("b-row",{key:i},[a("b-col",{staticClass:"mb-3",attrs:{md:"4"}},[a("input-form",{attrs:{placeholder:"Ex: Eslam Ashraf",validate:"required",name:"Full Name "+(i+1),label:"Full Name"},model:{value:e.name,callback:function(a){t.$set(e,"name",a)},expression:"info.name"}})],1),a("b-col",{staticClass:"mb-3",attrs:{md:"4"}},[a("input-form",{attrs:{placeholder:"Ex: Owner",validate:"required",name:"Role or Job "+(i+1),label:"Role or Job"},model:{value:e.job,callback:function(a){t.$set(e,"job",a)},expression:"info.job"}})],1),a("b-col",{staticClass:"mb-3 position-relative",attrs:{md:"4"}},[a("input-form",{attrs:{placeholder:"Ex: 01095097908",validate:"required|numeric",name:"Phone Number "+(i+1),label:"Phone Number"},model:{value:e.phone,callback:function(a){t.$set(e,"phone",a)},expression:"info.phone"}}),0!=i?a("span",{staticClass:"text-danger deleteLabelButtonAdmin cursor-pointer",on:{click:function(e){return t.deleteGeneralAdminInformation(i)}}},[t._v("Delete Contact ")]):t._e()],1)],1)})),a("b-row",[a("b-col",{attrs:{md:"12"}},[a("span",{staticClass:"text-warning cursor-pointer",on:{click:t.addNewGeneralAdminInformation}},[t._v("+ Add another Contact")])])],1)],2),a("div",{staticClass:"mb-5"},[a("div",{staticClass:"border-bottom my-2"},[a("h5",{staticClass:"pb-2"},[t._v("Facility Information & Photos")])]),a("b-row",[a("b-col",{staticClass:"mb-3",attrs:{md:"2"}},[a("main-select",{attrs:{labelTitle:"Activity Line",validate:"required",name:"activity_line_id",placeholder:"Choose",options:t.allActivityLines,label:"name",reduce:function(t){return t.id}},model:{value:t.info.activity_line_id,callback:function(e){t.$set(t.info,"activity_line_id",e)},expression:"info.activity_line_id"}})],1),a("b-col",{staticClass:"mb-3",attrs:{md:"2"}},[a("main-select",{attrs:{labelTitle:"Activity Type",validate:"required",name:"activity_type_id",placeholder:"Choose",options:t.allActivityTypes,label:"name",reduce:function(t){return t.id}},model:{value:t.info.activity_type_id,callback:function(e){t.$set(t.info,"activity_type_id",e)},expression:"info.activity_type_id"}})],1),a("b-col",{staticClass:"mb-3",attrs:{md:"2"}},[a("input-form",{attrs:{placeholder:"Ex: 2022",validate:"required|numeric",name:"year",label:"Launch Year"},model:{value:t.info.year,callback:function(e){t.$set(t.info,"year",e)},expression:"info.year"}})],1),a("b-col",{staticClass:"mb-3",attrs:{md:"6"}},[a("input-form",{attrs:{placeholder:"Ex: Diving",validate:"required",name:"name",label:"Facility Name"},model:{value:t.info.name,callback:function(e){t.$set(t.info,"name",e)},expression:"info.name"}})],1)],1),a("b-row",[a("b-col",{staticClass:"mb-3",attrs:{md:"6"}},[a("input-form",{attrs:{placeholder:"Ex: The Yoga Studio",validate:"required",name:"title",label:"Facility Title"},model:{value:t.info.title,callback:function(e){t.$set(t.info,"title",e)},expression:"info.title"}})],1),a("b-col",{staticClass:"mb-3",attrs:{md:"6"}},[a("main-select",{attrs:{labelTitle:"Team Languages",validate:"required",multiple:!0,name:"languages",placeholder:"Choose",options:t.allLanguages,label:"name",reduce:function(t){return t.name}},model:{value:t.info.languages,callback:function(e){t.$set(t.info,"languages",e)},expression:"info.languages"}})],1)],1),a("b-row",[a("b-col",{staticClass:"mb-3",attrs:{md:"12"}},[a("main-select",{attrs:{labelTitle:"Facility Tags",validate:"required",taggable:!0,multiple:"",name:"tags",placeholder:"Write Tags",numberOfSelect:3},model:{value:t.info.tags,callback:function(e){t.$set(t.info,"tags",e)},expression:"info.tags"}})],1)],1),a("b-row",[a("b-col",{staticClass:"mb-3",attrs:{md:"12"}},[a("b-form-group",{attrs:{label:"Facility Bio","label-for":"Facility Bio"}},[a("ValidationProvider",{ref:"Facility Bio",attrs:{name:"Facility Bio",rules:"required"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.errors;return[a("b-form-textarea",{class:i.length>0?" is-invalid":"",attrs:{placeholder:"Facility Bio...",rows:"2"},model:{value:t.info.bio,callback:function(e){t.$set(t.info,"bio",e)},expression:"info.bio"}}),a("div",{staticClass:"invalid-feedback"},[a("span",[t._v(t._s(i[0]))])])]}}],null,!0)})],1)],1)],1),a("b-row",[a("label",{staticClass:"w-100 pl-3 mb-2"},[t._v("Amenities")]),t._l(t.allAmenities,(function(e,i){return a("b-col",{key:i,staticClass:"mb-3",attrs:{md:"4",lg:"2"}},[a("b-form-checkbox",{staticClass:"custom-checkbox-color-check",attrs:{color:"warning",value:e.id},model:{value:t.info.amenities,callback:function(e){t.$set(t.info,"amenities",e)},expression:"info.amenities"}},[a("span",{staticClass:"text-primary font-size-12"},[t._v(t._s(e.name))])])],1)}))],2),a("b-row",[t._l(t.info.links,(function(e,i){return a("b-col",{key:i,staticClass:"mb-1",attrs:{md:"6"}},[a("b-form-group",{staticClass:"position-relative",attrs:{label:"URL Links","label-for":"URL Links"}},[0!=i?a("span",{staticClass:"text-danger deleteLabelButton cursor-pointer",on:{click:function(e){return t.deleteLink(i)}}},[t._v("Delete ")]):t._e(),a("b-input-group",{scopedSlots:t._u([{key:"prepend",fn:function(){return[a("b-dropdown",{staticClass:"selectWithInput",attrs:{text:e.selectSocial.name?e.selectSocial.name:"Choose"}},t._l(t.filterLinks,(function(i,o){return a("b-dropdown-item",{key:o,on:{click:function(t){e.selectSocial.name=i.name,e.selectSocial.id=i.id}}},[t._v(" "+t._s(i.name)+" ")])})),1)]},proxy:!0}],null,!0)},[a("validation-provider",{staticClass:"flex-grow-1",attrs:{name:"URL Link "+(i+1),rules:"required"},scopedSlots:t._u([{key:"default",fn:function(i){var o=i.errors;return[a("b-form-input",{class:[{"is-invalid":o.length>0}],attrs:{id:"mm",placeholder:"Ex: https://www.google.com",disabled:!e.selectSocial.name},model:{value:e.link,callback:function(a){t.$set(e,"link",a)},expression:"item.link"}})]}}],null,!0)})],1)],1)],1)})),t.allLinks.length!==t.info.links.length?a("b-col",{staticClass:"mb-3",attrs:{md:"12"}},[a("span",{staticClass:"text-warning cursor-pointer",on:{click:t.addNewLink}},[t._v("+ Add another Link")])]):t._e()],2),a("b-row",[a("b-col",{staticClass:"mb-5",attrs:{md:"12"}},[a("cropper-images",{attrs:{label:"Upload Logo",nameOfImage:"logo.jpg",progressLoading:t.loadingLogo,multi:!1,imageUrl:t.logoImage},on:{"cropper-save":t.savelogoImage}})],1)],1),a("b-row",[a("b-col",{staticClass:"mb-5",attrs:{md:"12"}},[a("cropper-images",{attrs:{label:"Upload Cover",nameOfImage:"cover.jpg",progressLoading:t.loadingCover,multi:!1,imageUrl:t.coverImage},on:{"cropper-save":t.saveCoverImage}})],1)],1),a("b-row",[a("b-col",{staticClass:"mb-5",attrs:{md:"12"}},[a("cropper-images",{attrs:{label:"Upload Facility Photos",progressLoading:t.loadingGallery,removeLoadingUi:t.removeLoadingUi,images:t.images},on:{"cropper-save":t.saveGalleryImage,"remove-image":t.removeGalleryImage}})],1)],1)],1),a("div",{staticClass:"mb-5"},[a("div",{staticClass:"border-bottom mb-2"},[a("h5",{staticClass:"pb-2"},[t._v("Facility Location")])]),a("b-row",{staticClass:"mb-5"},[a("b-col",{attrs:{md:"12"}},[a("label",{staticClass:"mb-3"},[t._v("Location")]),a("div",[a("b-form-radio",{staticClass:"custom-radio-color-checked mr-5",attrs:{inline:"",color:"warning",name:"color",value:"based"},model:{value:t.typeOfLocation,callback:function(e){t.typeOfLocation=e},expression:"typeOfLocation"}},[a("span",{staticClass:"text-primary font-size-12"},[t._v("Address Based")])]),a("b-form-radio",{staticClass:"custom-radio-color-checked",attrs:{inline:"",color:"warning",name:"color",value:"remote"},model:{value:t.typeOfLocation,callback:function(e){t.typeOfLocation=e},expression:"typeOfLocation"}},[a("span",{staticClass:"text-primary font-size-12"},[t._v("Remote")])])],1)])],1),"based"===t.typeOfLocation?a("div",[a("b-row",[a("b-col",{staticClass:"mb-3",attrs:{md:"2"}},[a("main-select",{attrs:{labelTitle:"Country",validate:"required",name:"country_id",placeholder:"Choose",options:t.allCountries,label:"name",reduce:function(t){return t.id}},on:{change:function(e){return t.getCityDependOnCountry(t.based.country_id)}},model:{value:t.based.country_id,callback:function(e){t.$set(t.based,"country_id",e)},expression:"based.country_id"}})],1),a("b-col",{staticClass:"mb-3",attrs:{md:"2"}},[a("main-select",{attrs:{labelTitle:"Governorate",validate:"required",name:"Governorate",placeholder:"Choose",options:t.allGovernorates,label:"name",reduce:function(t){return t.id}},on:{change:function(e){return t.getAreasDependOnCity(t.based.city_id)}},model:{value:t.based.city_id,callback:function(e){t.$set(t.based,"city_id",e)},expression:"based.city_id"}})],1),a("b-col",{staticClass:"mb-3",attrs:{md:"4"}},[a("main-select",{attrs:{labelTitle:"Area",validate:"required",name:"Area",placeholder:"Choose",options:t.allArea,label:"name",reduce:function(t){return t.id}},model:{value:t.based.area_id,callback:function(e){t.$set(t.based,"area_id",e)},expression:"based.area_id"}})],1),a("b-col",{staticClass:"mb-3",attrs:{md:"4"}},[a("input-form",{attrs:{placeholder:"Ex: 105 name st.",validate:"required",name:"Address",label:"Address"},model:{value:t.based.address,callback:function(e){t.$set(t.based,"address",e)},expression:"based.address"}})],1)],1),a("b-row",[a("b-col",{staticClass:"mb-4",attrs:{md:"6"}},[a("input-form",{attrs:{placeholder:"Ex: 11.12345",validate:"required",name:"latitude",label:"Latitude"},model:{value:t.based.latitude,callback:function(e){t.$set(t.based,"latitude",e)},expression:"based.latitude"}})],1),a("b-col",{staticClass:"mb-4",attrs:{md:"6"}},[a("input-form",{attrs:{placeholder:"Ex: 11.12345",validate:"required",name:"longitude",label:"Longitude"},model:{value:t.based.longitude,callback:function(e){t.$set(t.based,"longitude",e)},expression:"based.longitude"}})],1)],1),a("b-row",[a("b-col",{staticClass:"mb-3",attrs:{md:"12"}},[a("b-form-group",{attrs:{label:"Location","label-for":"Location"}},[a("ValidationProvider",{ref:"Location",attrs:{name:"Location",rules:"required"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.errors;return[a("b-form-textarea",{class:i.length>0?" is-invalid":"",attrs:{placeholder:"Location...",rows:"2"},model:{value:t.based.location,callback:function(e){t.$set(t.based,"location",e)},expression:"based.location"}}),a("div",{staticClass:"invalid-feedback"},[a("span",[t._v(t._s(i[0]))])])]}}],null,!0)}),a("p",{staticClass:"mt-2"},[t._v("* Note: If location is not set up on Google Maps, you can drop a proximate pin near the location and click on the coordinates (ex: 29.978411, 30.996448). This will provide you with a shareable link to copy and paste here.")])],1)],1)],1)],1):a("div",[a("b-row",{staticClass:"mb-5"},[t._l(t.remote.location,(function(e,i){return a("b-col",{key:i,staticClass:"position-relative mb-3",attrs:{md:"12"}},[a("b-row",{staticClass:"d-flex align-items-center"},[a("b-col",{staticClass:"mb-2",attrs:{md:"3"}},[a("main-select",{attrs:{labelTitle:"Country",validate:"required",name:"Country "+(i+1),placeholder:"Choose",options:t.allCountries,label:"name",reduce:function(t){return t.id}},on:{change:function(a){return t.getCityDependOnCountry(e.country_id)}},model:{value:e.country_id,callback:function(a){t.$set(e,"country_id",a)},expression:"location.country_id"}})],1),a("b-col",{attrs:{md:"1"}},[a("b-form-checkbox",{staticClass:"custom-checkbox-color-check",attrs:{value:"all city",color:"warning"},model:{value:e.availability_type,callback:function(a){t.$set(e,"availability_type",a)},expression:"location.availability_type"}},[a("span",{staticClass:"font-size-12 text-primary"},[t._v(" All ")])])],1),"all city"!==e.availability_type?a("b-col",{staticClass:"mb-2",attrs:{md:"3"}},[a("main-select",{attrs:{labelTitle:"Governorate",validate:"required",name:"Governorate "+(i+1),placeholder:"Choose",options:t.allGovernorates,label:"name",reduce:function(t){return t.id}},model:{value:e.city_id,callback:function(a){t.$set(e,"city_id",a)},expression:"location.city_id"}})],1):t._e(),"all city"!==e.availability_type?a("b-col",{attrs:{md:"1"}},[a("b-form-checkbox",{staticClass:"custom-checkbox-color-check",attrs:{value:"all country",color:"warning"},model:{value:e.availability_type,callback:function(a){t.$set(e,"availability_type",a)},expression:"location.availability_type"}},[a("span",{staticClass:"font-size-12 text-primary"},[t._v(" All ")])])],1):t._e(),"all city"!==e.availability_type?a("b-col",{staticClass:"mb-2",attrs:{md:"4"}},["all country"!==e.availability_type?a("div",[a("main-select",{attrs:{labelTitle:"Area",validate:"required",name:"Area "+(i+1),placeholder:"Choose",options:t.allArea,multiple:!0},model:{value:e.areas,callback:function(a){t.$set(e,"areas",a)},expression:"location.areas"}})],1):t._e()]):t._e()],1),0==!i?a("span",{staticClass:"text-danger deleteLabelButton cursor-pointer",on:{click:function(e){return t.deletezone(i)}}},[t._v("Delete Zone ")]):t._e()],1)})),a("b-col",{attrs:{md:"12"}},[a("span",{staticClass:"text-warning cursor-pointer",on:{click:t.addNewzone}},[t._v("+ Add new zone")])])],2)],1),a("b-row",[t._l(t.phones,(function(e,i){return a("b-col",{key:i,staticClass:"mb-1",attrs:{md:"6"}},[a("b-form-group",{staticClass:"position-relative",attrs:{label:"Contact Number "+(i+1),"label-for":"Contact Number "+(i+1)}},[0!=i?a("span",{staticClass:"text-danger deleteLabelButton cursor-pointer",on:{click:function(e){return t.deleteContact(i)}}},[t._v("Delete ")]):t._e(),a("b-input-group",{scopedSlots:t._u([{key:"prepend",fn:function(){return[a("b-dropdown",{staticClass:"selectWithInput",attrs:{text:e.type?e.type:"Choose"}},t._l(t.contactTypes,(function(i,o){return a("b-dropdown-item",{key:o,on:{click:function(t){e.type=i}}},[t._v(" "+t._s(i)+" ")])})),1)]},proxy:!0}],null,!0)},[a("validation-provider",{staticClass:"flex-grow-1",attrs:{name:"Contact Number "+(i+1),rules:"required"},scopedSlots:t._u([{key:"default",fn:function(i){var o=i.errors;return[a("b-form-input",{class:[{"is-invalid":o.length>0}],attrs:{id:"mm",placeholder:"Ex: 020454684",disabled:!e.type},model:{value:e.number,callback:function(a){t.$set(e,"number",a)},expression:"item.number"}})]}}],null,!0)})],1)],1)],1)})),a("b-col",{staticClass:"mb-3",attrs:{md:"12"}},[a("span",{staticClass:"text-warning cursor-pointer",on:{click:t.addNewContactNumber}},[t._v("+ Add another Contact Number")])])],2)],1),a("div",{staticClass:"mb-5"},[a("div",{staticClass:"border-bottom mb-2"},[a("h5",{staticClass:"pb-2"},[t._v("Facility Operation Days and Hours")])]),a("b-row",{staticClass:"mb-5"},[a("b-col",{attrs:{md:"12"}},[a("label",{staticClass:"mb-3"},[t._v("Operation")]),a("div",[a("b-form-radio",{staticClass:"custom-radio-color-checked mr-5",attrs:{inline:"",color:"warning",name:"typeOfOperation",value:"24 hours"},model:{value:t.typeOfOperation,callback:function(e){t.typeOfOperation=e},expression:"typeOfOperation"}},[a("span",{staticClass:"text-primary font-size-12"},[t._v("Open 24 Hours")])]),a("b-form-radio",{staticClass:"custom-radio-color-checked",attrs:{inline:"",color:"warning",name:"typeOfOperation",value:"specify days"},model:{value:t.typeOfOperation,callback:function(e){t.typeOfOperation=e},expression:"typeOfOperation"}},[a("span",{staticClass:"text-primary font-size-12"},[t._v("Specify Days(s) and Hours")])])],1)])],1),"24 hours"!==t.typeOfOperation?a("b-row",[t._l(t.allOperation,(function(e,i){return a("b-col",{key:i,staticClass:"position-relative mb-3",attrs:{md:"12"}},[a("b-row",{staticClass:"d-flex align-items-center"},[a("b-col",{staticClass:"mb-3",attrs:{md:"4"}},[a("main-select",{attrs:{labelTitle:"Operation Day (s)",validate:"required",name:"Operation Day "+(i+1),placeholder:"Choose",options:t.allDays,multiple:!0,label:"value",reduce:function(t){return t.key}},model:{value:e.days,callback:function(a){t.$set(e,"days",a)},expression:"operation.days"}})],1),a("b-col",{staticClass:"mb-3",attrs:{md:"4"}},[a("input-form",{attrs:{placeholder:"00:00 AM",validate:"required",name:"From "+(i+1),label:"From",type:"time"},model:{value:e.from,callback:function(a){t.$set(e,"from",a)},expression:"operation.from"}})],1),a("b-col",{staticClass:"mb-3",attrs:{md:"4"}},[a("input-form",{attrs:{placeholder:"00:00 AM",validate:"required",name:"To "+(i+1),label:"To",type:"time"},model:{value:e.to,callback:function(a){t.$set(e,"to",a)},expression:"operation.to"}})],1)],1),a("span",{staticClass:"text-danger deleteLabelButton cursor-pointer",on:{click:function(e){return t.deleteOperationDay(i)}}},[t._v("Delete ")])],1)})),a("b-col",{staticClass:"mb-3",attrs:{md:"12"}},[a("span",{staticClass:"text-warning cursor-pointer",on:{click:t.addNewOperation}},[t._v("+ Add another Operation Day (s)")])]),a("b-col",{attrs:{md:"12"}},[a("p",{staticClass:"text-gray"},[t._v("Note: Specify working days & hours only, any day unspecified will automatically be set as “closed”.")])])],2):t._e()],1),a("div",[a("main-select",{attrs:{labelTitle:"Account Type",validate:"required",name:"account_type",placeholder:"Choose",options:["Go","Flow","Pro","Shop","Camp"]},model:{value:t.service_types,callback:function(e){t.service_types=e},expression:"service_types"}})],1),a("b-row",[a("b-col",{staticClass:"mt-3 d-flex justify-content-center",attrs:{md:"12"}},[(t.loadingActivation=!0)?a("b-button",{staticClass:"container_button_blue slideNextArrow",attrs:{type:"submit"}},[t._v(" Activate ")]):a("b-button",{staticClass:"container_button_blue slideNextArrow"},[a("spinner-loading",{attrs:{text:"Saving"}})],1)],1)],1)],1)]}}])})],1)},r=[],c=a("5530"),d=a("2909"),u=(a("159b"),a("b0c0"),a("c740"),a("a434"),a("d81d"),a("2009")),p=a("df21"),m={props:{activationDetails:{type:Object},loadingActivation:{type:Boolean,default:!1}},data:function(){return{service_types:"",progressLogo:0,progressCover:0,providerId:"",adminInformation:[{name:"",job:"",phone:""}],info:{activity_line_id:"",activity_type_id:"",year:"",name:"",title:"",languages:[],bio:"",tags:[],amenities:[],links:[{selectSocial:{id:"",name:""},link:""}]},based:{country_id:"",city_id:"",area_id:"",address:"",latitude:"",longitude:"",location:""},contactTypes:["Landline","Mobile"],remote:{location:[{availability_type:null,country_id:null,city_id:null,areas:[]}]},phones:[{type:"",number:""}],typeOfLocation:"",typeOfOperation:"",images:[],logoImage:"",coverImage:"",allDays:[{key:"Sat",value:"Saturday"},{key:"Sun",value:"Sunday"},{key:"Mon",value:"Monday"},{key:"Tue",value:"Tuesday"},{key:"Wed",value:"Wednesday"},{key:"Thu",value:"Thursday"},{key:"Fri",value:"Friday"}],allOperation:[{days:[],from:"",to:""}],allActivityLines:[],allActivityTypes:[],allLanguages:[],allLinks:[],allAmenities:[],allCountries:[],allGovernorates:[],allArea:[],loadingLogo:0,loadingCover:0,loadingGallery:0,removeLoadingUi:!1}},computed:{filterLinks:function(){var t=Object(d["a"])(this.allLinks);return this.info.links.forEach((function(e){t.forEach((function(a){if(a.name===e.selectSocial.name){var i=t.findIndex((function(t){return t===a}));t.splice(i,1)}}))})),t}},methods:{addNewGeneralAdminInformation:function(){this.adminInformation.push({name:"",job:"",phone:""})},deleteGeneralAdminInformation:function(t){this.adminInformation.splice(t,1)},savelogoImage:function(t){var e=this,a=new FormData;console.log(t),a.append("image",t.image),a.append("name",t.imageInfo.name),a.append("type","logo"),a.append("provider_id",this.providerId);var i={onUploadProgress:function(t){var a=t.loaded,i=t.total,o=Math.floor(100*a/i);e.loadingLogo=o}};u["a"].uploadProviderImage(a,i).then((function(t){n["c"].showSnackbar("success",t.data.message),e.logoImage=""}))},saveCoverImage:function(t){var e=this,a=new FormData;console.log(t),a.append("image",t.image),a.append("name",t.imageInfo.name),a.append("type","cover"),a.append("provider_id",this.providerId);var i={onUploadProgress:function(t){var a=t.loaded,i=t.total,o=Math.floor(100*a/i);e.loadingCover=o}};u["a"].uploadProviderImage(a,i).then((function(t){n["c"].showSnackbar("success",t.data.message),e.coverImage=""}))},saveGalleryImage:function(t){var e=this;this.removeLoadingUi=!1;var a=new FormData;a.append("image",t.image),a.append("name",t.imageInfo.name),a.append("type","gallery"),a.append("provider_id",this.providerId);var i={onUploadProgress:function(t){var a=t.loaded,i=t.total,o=Math.floor(100*a/i);e.loadingGallery=o}};u["a"].uploadProviderImage(a,i).then((function(t){n["c"].showSnackbar("success",t.data.message),e.images.push(t.data.data),e.removeLoadingUi=!0}))},removeGalleryImage:function(t){var e=this;u["a"].removeProviderImage(t).then((function(a){n["c"].showSnackbar("success",a.data.message);var i=e.images.findIndex((function(e){return e.id===t}));e.images.splice(i,1)}))},cropperFile:function(t){console.log("file",t)},addNewLink:function(){this.info.links.push({selectSocial:{id:"",name:""},link:""})},deleteLink:function(t){this.info.links.splice(t,1)},deleteContact:function(t){this.phones.splice(t,1)},deleteRemoteContact:function(t){this.remote.phones.splice(t,1)},addNewContactNumber:function(){this.phones.push({type:"",number:""})},addNewRemoteContactNumber:function(){this.remote.phones.push({type:"",number:""})},addNewzone:function(){this.remote.location.push({availability_type:null,country_id:null,city_id:null,areas:[]})},deletezone:function(t){this.remote.location.splice(t,1)},addNewOperation:function(){this.allOperation.push({days:[],from:"",to:""})},deleteOperationDay:function(t){this.allOperation.splice(t,1)},getAllCountries:function(){var t=this;p["a"].getAllCountries().then((function(e){t.allCountries=e.data.data}))},getCityDependOnCountry:function(t){var e=this;this.allGovernorates=[],p["a"].getCountryCity(t).then((function(t){e.allGovernorates=t.data.data}))},getAreasDependOnCity:function(t){var e=this;this.allArea=[],p["a"].getCityArea(t).then((function(t){e.allArea=t.data.data}))},getAllActivityLine:function(){var t=this;p["a"].getAllActivityLine().then((function(e){t.allActivityLines=e.data.data}))},getAllActivityType:function(){var t=this;p["a"].getAllActivityType().then((function(e){t.allActivityTypes=e.data.data}))},getAllLanguages:function(){var t=this;p["a"].getAllLanguages().then((function(e){t.allLanguages=e.data.data}))},getAllLinks:function(){var t=this;p["a"].getAllLinks().then((function(e){t.allLinks=e.data.data}))},getAllAmenities:function(){var t=this;p["a"].getAllAmenities().then((function(e){t.allAmenities=e.data.data}))},fillData:function(){this.activationDetails&&(console.log("this.activationDetails",this.activationDetails),this.providerId=this.activationDetails.id,this.adminInformation=this.activationDetails.contacts,this.info.activity_line_id=this.activationDetails.activity_line_id,this.info.activity_type_id=this.activationDetails.activity_type_id,this.info.year=this.activationDetails.year,this.info.name=this.activationDetails.name,this.info.title=this.activationDetails.title,this.info.languages=this.activationDetails.languages,this.info.bio=this.activationDetails.bio,this.info.amenities=this.activationDetails.amenities.map((function(t){return t.id})),this.info.links=this.activationDetails.links,this.info.tags=this.activationDetails.tags,this.service_types=this.activationDetails.service_types,this.logoImage=this.activationDetails.logo,this.coverImage=this.activationDetails.cover,this.images=this.activationDetails.images,this.phones=this.activationDetails.phones,"24 hours"===this.activationDetails.operation_type?this.typeOfOperation="24 hours":(this.typeOfOperation="specify days",this.allOperation=this.activationDetails.operations),"address based"===this.activationDetails.location_type?(this.typeOfLocation="based",this.based=this.activationDetails.address_based,this.getCityDependOnCountry(this.activationDetails.address_based.country_id),this.getAreasDependOnCity(this.activationDetails.address_based.city_id)):(this.typeOfLocation="specify days",this.allOperation=this.activationDetails.operations))},saveChanges:function(){var t={},e={};t="based"===this.typeOfLocation?{phones:this.phones,address:this.based,location_type:"address based"}:Object(c["a"])(Object(c["a"])({phones:this.phones},this.remote),{},{location_type:"remote location"}),e="24 hours"===this.typeOfOperation?{operation_type:"24 hours"}:{operation_type:"specify days",operation:this.allOperation};var a=Object(c["a"])(Object(c["a"])(Object(c["a"])(Object(c["a"])({_method:"put",contact:this.adminInformation},this.info),t),e),{},{phones:this.phones,service_types:this.service_types});this.$emit("activation-provider",a)}},mounted:function(){this.fillData()},created:function(){this.getAllActivityLine(),this.getAllActivityType(),this.getAllLanguages(),this.getAllLinks(),this.getAllAmenities(),this.getAllCountries()}},b=m,f=a("2877"),v=Object(f["a"])(b,l,r,!1,null,null,null),y=v.exports,g={components:{activationDetails:y},data:function(){return{columns:[{label:"#",key:"id",class:"text-left"},{label:"Name",key:"name",class:"text-left"},{label:"Profile Type",key:"profile_type",class:"text-left"},{label:"Status",key:"status",class:"text-left"},{label:"Actions",key:"actions",class:"text-left",type:"actions",actions:[{icon:"las la-eye",color:"success-light",text:"View",actionName:"viewProfile",actionParams:["id"]}]}],activationDetails:{},providerId:"",reloadTable:!1,loadingActivation:!1}},methods:{sortChanged:function(t){console.log(t)},viewProfile:function(t){var e=this;s["a"].getActivationDetails(t.id).then((function(a){e.providerId=t.id,e.activationDetails=a.data.data,e.$bvModal.show("activationDetalilsModal")}))},activate:function(t){var e=this;this.loadingActivation=!0,s["a"].activateProvider(this.providerId,t).then((function(t){n["c"].showSnackbar("success",t.data.message),e.reloadTable=!0,e.$bvModal.hide("activationDetalilsModal")})).finally((function(){e.loadingActivation=!1}))}},mounted:function(){n["c"].index()},beforeDestroy:function(){this.$root.$off("viewProfile",this.viewProfile)},created:function(){this.$root.$on("viewProfile",this.viewProfile)}},h=g,C=Object(f["a"])(h,i,o,!1,null,null,null);e["default"]=C.exports},df21:function(t,e,a){"use strict";var i=a("bb36");e["a"]={getProfileSettings:function(){return Object(i["a"])().get("settings")},updateProfileSettings:function(t){return Object(i["a"])().post("settings",t)},getAllActivityLine:function(){return Object(i["a"])().get("activityLines")},addNewActivityLine:function(t){return Object(i["a"])().post("activityLines",t)},getAllActivityType:function(){return Object(i["a"])().get("activityTypes")},addNewActivityType:function(t){return Object(i["a"])().post("activityTypes",t)},getDurationList:function(){return Object(i["a"])().get("durationLists")},addNewDurationList:function(t){return Object(i["a"])().post("durationLists",t)},getAllnationalities:function(){return Object(i["a"])().get("nationalities")},addNewNationality:function(t){return Object(i["a"])().post("nationalities",t)},getAllAccommodationTypes:function(){return Object(i["a"])().get("accommodationTypes")},addNewAccommodationType:function(t){return Object(i["a"])().post("accommodationTypes",t)},getAllLinks:function(){return Object(i["a"])().get("links")},addNewLink:function(t){return Object(i["a"])().post("links",t)},getAllLanguages:function(){return Object(i["a"])().get("languages")},addNewLanguage:function(t){return Object(i["a"])().post("languages",t)},getAllCountries:function(){return Object(i["a"])().get("countries")},getCountryCity:function(t){return Object(i["a"])().get("countries/".concat(t))},addNewCountry:function(t){return Object(i["a"])().post("countries",t)},getAllCities:function(){return Object(i["a"])().get("cities")},addNewCity:function(t){return Object(i["a"])().post("cities",t)},getCityArea:function(t){return Object(i["a"])().get("cities/".concat(t))},getAllAreas:function(){return Object(i["a"])().get("areas")},addNewArea:function(t){return Object(i["a"])().post("areas",t)},getAllAmenities:function(){return Object(i["a"])().get("amenities")}}}}]);
//# sourceMappingURL=chunk-722b4b4a.972a755f.js.map