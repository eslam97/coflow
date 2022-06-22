(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-43b0b8ca"],{de76:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("main-modal",{attrs:{id:"nationality",size:"lg"},scopedSlots:t._u([{key:"header",fn:function(){return[n("h4",{staticClass:"font-weight-bold"},[n("span",{staticClass:"text-warning"},[t._v(" Add: ")]),t._v("Nationality")])]},proxy:!0},{key:"body",fn:function(){return[n("nationality-form",{attrs:{requestLoading:t.requestLoading},on:{addNationality:t.addNationality}})]},proxy:!0}])}),n("div",{staticClass:"d-flex justify-content-end"},[n("b-button",{directives:[{name:"b-modal",rawName:"v-b-modal:nationality",arg:"nationality"}],staticClass:"add_button text-white",attrs:{variant:"warning"}},[t._v(" Add Nationality"),n("i",{staticClass:"las la-plus ml-3"})])],1),n("main-table",{staticClass:"mb-0 table-borderless",attrs:{fields:t.columns,list_url:"nationalities",reloadData:t.reloadTable}})],1)},i=[],o=(n("d3b7"),n("bcae")),s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("ValidationObserver",{scopedSlots:t._u([{key:"default",fn:function(e){var a=e.handleSubmit;return[n("b-form",{on:{submit:function(e){return e.preventDefault(),a(t.submit)}}},[n("b-row",[n("b-col",{staticClass:"mb-3",attrs:{md:"12"}},[n("input-form",{attrs:{placeholder:"",validate:"required",name:"Nationality",label:"Nationality"},model:{value:t.nationality.name,callback:function(e){t.$set(t.nationality,"name",e)},expression:"nationality.name"}})],1)],1),n("b-row",[n("b-col",{staticClass:"mt-4",attrs:{md:"12"}},[t.requestLoading?n("div",{staticClass:"text-center"},[n("b-button",{staticClass:"container_button_blue ml-2"},[n("spinner-loading",{attrs:{text:"Loading"}})],1)],1):n("div",{staticClass:"d-flex justify-content-center"},[n("b-button",{staticClass:"container_button_blue ml-2",attrs:{type:"submit"}},[n("span",[t._v("Save")])])],1)])],1)],1)]}}])})],1)},r=[],c={name:"nationalityForm",props:{requestLoading:{type:Boolean,default:!1}},data:function(){return{nationality:{name:""}}},methods:{submit:function(){this.$emit("addNationality",this.nationality)}},watch:{},computed:{},created:function(){}},l=c,u=n("2877"),d=Object(u["a"])(l,s,r,!1,null,null,null),b=d.exports,f=n("df21"),y={name:"nationalities",components:{nationalityForm:b},data:function(){return{reloadTable:!1,requestLoading:!1,columns:[{label:"Name",key:"name",class:"text-center"},{label:"Actions",key:"actions",class:"text-center",type:"actions",actions:[{icon:"las la-trash-alt",color:"danger",text:"Delete",showAlert:!0,actionHeader:"Delete",titleHeader:"Nationality",textContent:"name"}]}]}},methods:{addNationality:function(t){var e=this;this.requestLoading=!0,this.reloadTable=!1,f["a"].addNewNationality(t).then((function(t){o["c"].showSnackbar("success",t.data.message),e.reloadTable=!0,e.$bvModal.hide("nationality")})).finally((function(){e.requestLoading=!1}))}},mounted:function(){o["c"].index()},created:function(){}},m=y,g=Object(u["a"])(m,a,i,!1,null,null,null);e["default"]=g.exports},df21:function(t,e,n){"use strict";var a=n("bb36");e["a"]={getProfileSettings:function(){return Object(a["a"])().get("settings")},updateProfileSettings:function(t){return Object(a["a"])().post("settings",t)},getAllActivityLine:function(){return Object(a["a"])().get("activityLines")},addNewActivityLine:function(t){return Object(a["a"])().post("activityLines",t)},getAllActivityType:function(){return Object(a["a"])().get("activityTypes")},addNewActivityType:function(t){return Object(a["a"])().post("activityTypes",t)},getDurationList:function(){return Object(a["a"])().get("durationLists")},addNewDurationList:function(t){return Object(a["a"])().post("durationLists",t)},getAllnationalities:function(){return Object(a["a"])().get("nationalities")},addNewNationality:function(t){return Object(a["a"])().post("nationalities",t)},getAllAccommodationTypes:function(){return Object(a["a"])().get("accommodationTypes")},addNewAccommodationType:function(t){return Object(a["a"])().post("accommodationTypes",t)},getAllLinks:function(){return Object(a["a"])().get("links")},addNewLink:function(t){return Object(a["a"])().post("links",t)},getAllLanguages:function(){return Object(a["a"])().get("languages")},addNewLanguage:function(t){return Object(a["a"])().post("languages",t)},getAllCountries:function(){return Object(a["a"])().get("countries")},getCountryCity:function(t){return Object(a["a"])().get("countries/".concat(t))},addNewCountry:function(t){return Object(a["a"])().post("countries",t)},getAllCities:function(){return Object(a["a"])().get("cities")},addNewCity:function(t){return Object(a["a"])().post("cities",t)},getCityArea:function(t){return Object(a["a"])().get("cities/".concat(t))},getAllAreas:function(){return Object(a["a"])().get("areas")},addNewArea:function(t){return Object(a["a"])().post("areas",t)},getAllAmenities:function(){return Object(a["a"])().get("amenities")}}}}]);
//# sourceMappingURL=chunk-43b0b8ca.a3fe7c16.js.map