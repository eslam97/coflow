(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-778ff030"],{"2d08":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("main-modal",{attrs:{id:"city",size:"lg"},scopedSlots:t._u([{key:"header",fn:function(){return[n("h4",{staticClass:"font-weight-bold"},[n("span",{staticClass:"text-warning"},[t._v(" Add: ")]),t._v("City")])]},proxy:!0},{key:"body",fn:function(){return[n("city-form",{attrs:{requestLoading:t.requestLoading},on:{addCity:t.addCity}})]},proxy:!0}])}),n("div",{staticClass:"d-flex justify-content-end"},[n("b-button",{directives:[{name:"b-modal",rawName:"v-b-modal:city",arg:"city"}],staticClass:"add_button text-white",attrs:{variant:"warning"}},[t._v(" Add City "),n("i",{staticClass:"las la-plus ml-3"})])],1),n("main-table",{staticClass:"mb-0 table-borderless",attrs:{fields:t.columns,list_url:"cities",reloadData:t.reloadTable}})],1)},i=[],s=(n("d3b7"),n("bcae")),o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("ValidationObserver",{scopedSlots:t._u([{key:"default",fn:function(e){var a=e.handleSubmit;return[n("b-form",{on:{submit:function(e){return e.preventDefault(),a(t.submit)}}},[n("b-row",[n("b-col",{staticClass:"mb-3",attrs:{md:"12"}},[n("input-form",{attrs:{placeholder:"",validate:"required",name:"City",label:"City"},model:{value:t.city.name,callback:function(e){t.$set(t.city,"name",e)},expression:"city.name"}})],1),n("b-col",{staticClass:"mb-3",attrs:{md:"12"}},[n("main-select",{attrs:{labelTitle:"Country",validate:"required",name:"Country",label:"name",placeholder:"Choose",options:t.allCountries,reduce:function(t){return t.id}},model:{value:t.city.country_id,callback:function(e){t.$set(t.city,"country_id",e)},expression:"city.country_id"}})],1)],1),n("b-row",[n("b-col",{staticClass:"mt-4",attrs:{md:"12"}},[t.requestLoading?n("p",{staticClass:"text-center"},[n("b-button",{staticClass:"container_button_blue ml-2"},[n("spinner-loading",{attrs:{text:"Loading"}})],1)],1):n("div",{staticClass:"d-flex justify-content-center"},[n("b-button",{staticClass:"container_button_blue ml-2",attrs:{type:"submit"}},[n("span",[t._v("Save")])])],1)])],1)],1)]}}])})],1)},c=[],r=n("df21"),u={name:"cityForm",props:{requestLoading:{type:Boolean,default:!1}},data:function(){return{city:{name:"",country_id:""},allCountries:[]}},methods:{submit:function(){this.$emit("addCity",this.city)},getAllCountries:function(){var t=this;r["a"].getAllCountries().then((function(e){t.allCountries=e.data.data}))}},watch:{},computed:{},created:function(){this.getAllCountries()}},l=u,d=n("2877"),b=Object(d["a"])(l,o,c,!1,null,null,null),f=b.exports,y={name:"cities",components:{cityForm:f},data:function(){return{reloadTable:!1,requestLoading:!1,columns:[{label:"Name",key:"name",class:"text-center"},{label:"Country",key:"country.name",class:"text-center"},{label:"Actions",key:"actions",class:"text-center",type:"actions",actions:[{icon:"las la-trash-alt",color:"danger",text:"Delete",showAlert:!0,actionHeader:"Delete",titleHeader:"City",textContnet:"name"}]}]}},methods:{addCity:function(t){var e=this;this.requestLoading=!0,this.reloadTable=!1,r["a"].addNewCity(t).then((function(t){s["c"].showSnackbar("success",t.data.message),e.reloadTable=!0,e.$bvModal.hide("city")})).finally((function(){e.requestLoading=!1}))}},mounted:function(){s["c"].index()},created:function(){}},m=y,g=Object(d["a"])(m,a,i,!1,null,null,null);e["default"]=g.exports},df21:function(t,e,n){"use strict";var a=n("bb36");e["a"]={getProfileSettings:function(){return Object(a["a"])().get("settings")},updateProfileSettings:function(t){return Object(a["a"])().post("settings",t)},getAllActivityLine:function(){return Object(a["a"])().get("activityLines")},addNewActivityLine:function(t){return Object(a["a"])().post("activityLines",t)},getAllActivityType:function(){return Object(a["a"])().get("activityTypes")},addNewActivityType:function(t){return Object(a["a"])().post("activityTypes",t)},getDurationList:function(){return Object(a["a"])().get("durationLists")},addNewDurationList:function(t){return Object(a["a"])().post("durationLists",t)},getAllnationalities:function(){return Object(a["a"])().get("nationalities")},addNewNationality:function(t){return Object(a["a"])().post("nationalities",t)},getAllAccommodationTypes:function(){return Object(a["a"])().get("accommodationTypes")},addNewAccommodationType:function(t){return Object(a["a"])().post("accommodationTypes",t)},getAllLinks:function(){return Object(a["a"])().get("links")},addNewLink:function(t){return Object(a["a"])().post("links",t)},getAllLanguages:function(){return Object(a["a"])().get("languages")},addNewLanguage:function(t){return Object(a["a"])().post("languages",t)},getAllCountries:function(){return Object(a["a"])().get("countries")},getCountryCity:function(t){return Object(a["a"])().get("countries/".concat(t))},addNewCountry:function(t){return Object(a["a"])().post("countries",t)},getAllCities:function(){return Object(a["a"])().get("cities")},addNewCity:function(t){return Object(a["a"])().post("cities",t)},getCityArea:function(t){return Object(a["a"])().get("cities/".concat(t))},getAllAreas:function(){return Object(a["a"])().get("areas")},addNewArea:function(t){return Object(a["a"])().post("areas",t)},getAllAmenities:function(){return Object(a["a"])().get("amenities")}}}}]);
//# sourceMappingURL=chunk-778ff030.4bc55e62.js.map