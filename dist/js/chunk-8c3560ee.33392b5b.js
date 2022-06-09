(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8c3560ee"],{5534:function(t,i,e){"use strict";e.r(i);var s=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("b-container",{attrs:{fluid:""}},[e("main-modal",{attrs:{id:"activitiesDetailsModal",size:"xl"},scopedSlots:t._u([{key:"header",fn:function(){return["add"==t.typeOfModal?e("h4",{staticClass:"font-weight-bold"},[e("span",{staticClass:"text-warning"},[t._v("Add: ")]),t._v(" Activity")]):e("h4",{staticClass:"font-weight-bold"},[e("span",{staticClass:"text-info"},[t._v("Edit: ")]),t._v(" Activity")])]},proxy:!0},{key:"body",fn:function(){return[e("activities-details",{attrs:{requestLoading:t.requestLoading,activitiesDetails:t.activitiesDetails,typeOfModal:t.typeOfModal},on:{addActivity:t.addActivity,editActivity:t.editActivity}})]},proxy:!0}])}),e("main-modal",{attrs:{id:"activitiesDetailsViewModal",size:"lg",border:"true"},scopedSlots:t._u([{key:"header",fn:function(){return[e("h4",{staticClass:"font-weight-bold"},[e("span",{staticClass:"text-success-light"},[t._v("View: ")]),t._v(" Activity")])]},proxy:!0},{key:"borderHeader",fn:function(){return[e("p",{staticClass:"p-4 borderHeaderModal m-0"},[t._v(" "+t._s(t.activitiesDetails.name)+" "),e("button",{staticClass:"ml-4 p-2 btn radio-btn",class:"radio-btn-cyan",attrs:{active:""}},[t._v(" "+t._s(t.activitiesDetails.duration)+" "+t._s(t.activitiesDetails.duration_list.name)+" ")])])]},proxy:!0},{key:"body",fn:function(){return[e("activities-view",{attrs:{activitiesDetails:t.activitiesDetails}})]},proxy:!0}])}),e("b-row",[e("b-col",{staticClass:"mb-2 d-flex justify-content-between align-items-center",attrs:{lg:"12"}},[e("h3",[t._v("Activities")]),e("div",[e("b-button",{staticClass:"add_button text-white",attrs:{variant:"warning"},on:{click:t.openPopup}},[t._v(" Add Activity"),e("i",{staticClass:"las la-plus ml-3"})])],1)]),e("b-col",{attrs:{lg:"12"}},[e("main-table",{staticClass:"mb-0 table-borderless",attrs:{fields:t.columns,list_url:"activities",reloadData:t.reloadTable},on:{sortChanged:t.sortChanged}})],1)],1)],1)},a=[],c=(e("d3b7"),e("bcae")),o=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",[e("validationObserver",{scopedSlots:t._u([{key:"default",fn:function(i){var s=i.handleSubmit;return[e("b-form",{on:{submit:function(i){return i.preventDefault(),s(t.addActivities)}}},[e("b-row",[e("b-col",{staticClass:"mb-3",attrs:{lg:"6"}},[e("b-row",[e("b-col",{staticClass:"mb-3",attrs:{md:"6"}},[e("input-form",{attrs:{placeholder:"Write activity name",validate:"required",name:"Activity name",label:"Activity Name"},model:{value:t.activities.name,callback:function(i){t.$set(t.activities,"name",i)},expression:"activities.name"}})],1),e("b-col",{staticClass:"mb-3",attrs:{md:"6"}},[e("label",{attrs:{for:"duration-group"}},[t._v("Duration")]),e("b-input-group",{attrs:{id:"duration-group"},scopedSlots:t._u([{key:"append",fn:function(){return[e("b-dropdown",{staticClass:"selectWithInputAppend",attrs:{text:t.type?t.type:"Pick duration type"}},t._l(t.allDurationList,(function(i,s){return e("b-dropdown-item",{key:s,on:{click:function(e){t.activities.duration_list_id=i.id,t.type=i.name}}},[t._v(" "+t._s(i.name)+" ")])})),1)]},proxy:!0}],null,!0)},[e("b-form-input",{attrs:{label:"Duration",placeholder:"000"},model:{value:t.activities.duration,callback:function(i){t.$set(t.activities,"duration",i)},expression:"activities.duration"}})],1)],1)],1),e("b-row",[e("b-col",{staticClass:"mb-3",attrs:{md:"4"}},[e("validation-provider",{staticClass:"flex-grow-1",attrs:{name:"EGP price",rules:"required|numeric"},scopedSlots:t._u([{key:"default",fn:function(i){var s=i.errors;return[e("b-form-group",{attrs:{label:"Price"}},[e("b-input-group",{attrs:{append:"EGP"}},[e("b-form-input",{class:[{"is-invalid":s.length>0}],attrs:{placeholder:"000.00",validate:"required"},model:{value:t.activities.price_egp,callback:function(i){t.$set(t.activities,"price_egp",i)},expression:"activities.price_egp"}})],1)],1)]}}],null,!0)})],1),e("b-col",{staticClass:"mb-5 pt-4",attrs:{md:"4"}},[e("b-form-checkbox",{staticClass:"custom-checkbox-color-check mb-2 mr-sm-2 mb-sm-0",attrs:{type:"checkbox",color:"warning"},model:{value:t.selectedEGP,callback:function(i){t.selectedEGP=i},expression:"selectedEGP"}},[t._v(" Discounted Price ")])],1),e("b-col",{staticClass:"mb-3",attrs:{md:"4"}},[e("validation-provider",{staticClass:"flex-grow-1",attrs:{name:"Discounted EGP price",rules:"numeric"},scopedSlots:t._u([{key:"default",fn:function(i){var s=i.errors;return[e("b-form-group",{attrs:{label:"Discounted Price"}},[e("b-input-group",{attrs:{append:"EGP"}},[e("b-form-input",{class:[{"is-invalid":s.length>0&&t.selectedEGP}],attrs:{placeholder:"000.00",validate:t.selectedEGP?"required":"",disabled:!t.selectedEGP},model:{value:t.activities.discount_price_egp,callback:function(i){t.$set(t.activities,"discount_price_egp",i)},expression:"activities.discount_price_egp"}})],1)],1)]}}],null,!0)})],1)],1),e("b-row",[e("b-col",{staticClass:"mb-3",attrs:{md:"4"}},[e("validation-provider",{staticClass:"flex-grow-1",attrs:{name:"EURO price",rules:"numeric"},scopedSlots:t._u([{key:"default",fn:function(i){var s=i.errors;return[e("b-form-group",{attrs:{label:"Foreigner Price"}},[e("b-input-group",{attrs:{append:"EUR"}},[e("b-form-input",{class:[{"is-invalid":s.length>0}],attrs:{placeholder:"000.00"},model:{value:t.activities.price_euro,callback:function(i){t.$set(t.activities,"price_euro",i)},expression:"activities.price_euro"}})],1)],1)]}}],null,!0)})],1),e("b-col",{staticClass:"mb-5 pt-4",attrs:{md:"4"}},[e("b-form-checkbox",{staticClass:"custom-checkbox-color-check mb-2 mr-sm-2 mb-sm-0",attrs:{type:"checkbox",color:"warning"},model:{value:t.selectedEUR,callback:function(i){t.selectedEUR=i},expression:"selectedEUR"}},[t._v(" Discounted Price ")])],1),e("b-col",{staticClass:"mb-3",attrs:{md:"4"}},[e("validation-provider",{staticClass:"flex-grow-1",attrs:{name:"Discounted EURO price",rules:"numeric"},scopedSlots:t._u([{key:"default",fn:function(i){var s=i.errors;return[e("b-form-group",{attrs:{label:"Discounted Price"}},[e("b-input-group",{attrs:{append:"EUR"}},[e("b-form-input",{class:[{"is-invalid":s.length>0&&t.selectedEUR}],attrs:{placeholder:"000.00",validate:t.selectedEUR?"required":"",disabled:!t.selectedEUR},model:{value:t.activities.discount_price_euro,callback:function(i){t.$set(t.activities,"discount_price_euro",i)},expression:"activities.discount_price_euro"}})],1)],1)]}}],null,!0)})],1)],1),e("validation-provider",{staticClass:"flex-grow-1",attrs:{name:"Conditions",rules:"required"},scopedSlots:t._u([{key:"default",fn:function(i){var s=i.errors;return[e("b-form-group",{attrs:{label:"Conditions"}},[e("b-form-textarea",{class:[{"is-invalid":s.length>0}],attrs:{placeholder:"Any age, health, or weight requirements to participate",rows:"2"},model:{value:t.activities.conditions,callback:function(i){t.$set(t.activities,"conditions",i)},expression:"activities.conditions"}})],1)]}}],null,!0)})],1),e("b-col",{staticClass:"mb-3",attrs:{lg:"6"}},[e("validation-provider",{staticClass:"flex-grow-1",attrs:{name:"Description",rules:"required"},scopedSlots:t._u([{key:"default",fn:function(i){var s=i.errors;return[e("b-form-group",{attrs:{label:"Description"}},[e("b-form-textarea",{class:[{"is-invalid":s.length>0}],attrs:{label:"activities",placeholder:"Write your description about this activity….",rows:"4"},model:{value:t.activities.description,callback:function(i){t.$set(t.activities,"description",i)},expression:"activities.description"}})],1)]}}],null,!0)})],1)],1),e("b-row",[e("b-col",{staticClass:"mb-5",attrs:{md:"12"}},[e("cropper-images",{attrs:{label:"Upload Photos",removeLoadingUi:t.removeLoadingUi,progressLoading:t.progressBar,images:t.activities.images},on:{"cropper-save":t.saveGalleryImage,"remove-image":t.removeGalleryImage}})],1)],1),"view"!=t.typeOfModal?e("b-row",[e("b-col",{staticClass:"mt-4",attrs:{md:"12"}},["add"==t.typeOfModal?e("div",{staticClass:"d-flex justify-content-center"},[t.requestLoading?e("b-button",{staticClass:"button-orange-modal"},[e("spinner-loading")],1):e("b-button",{staticClass:"button-orange-modal",attrs:{type:"submit"}},[e("i",{staticClass:"las la-plus"})])],1):t._e(),"edit"==t.typeOfModal?e("div",{staticClass:"d-flex justify-content-center"},[t.requestLoading?e("b-button",{staticClass:"button-blue-modal"},[e("spinner-loading")],1):e("b-button",{staticClass:"button-blue-modal",attrs:{type:"submit"}},[e("i",{staticClass:"las la-pen"})])],1):t._e()])],1):t._e()],1)]}}])})],1)},n=[],r=e("5530"),l=(e("d81d"),e("b0c0"),e("c740"),e("a434"),e("a4d3"),e("e01a"),e("5636")),d=e("df21"),u={props:{requestLoading:{type:Boolean,default:!1,required:!1},typeOfModal:{type:String,default:"add",required:!1},activitiesDetails:{required:!1}},data:function(){return{activities:{name:"",duration:"",duration_list_id:"",conditions:"",description:"",price_egp:"",price_euro:"",price_dollar:0,discount_price_egp:"",discount_price_euro:"",discount_price_dollar:0,status:"active",images:[]},type:"",selectedEGP:"",selectedEUR:"",allDurationList:[],loadingGallery:0,progressBar:0,removeLoadingUi:!1}},components:{},methods:{addActivities:function(){this.activities.price_euro=this.activities.price_euro?this.activities.price_euro:0,this.activities.discount_price_euro=this.selectedEUR?this.activities.discount_price_euro:"","add"===this.typeOfModal?this.$emit("addActivity",Object(r["a"])(Object(r["a"])({},this.activities),{},{images:this.activities.images.map((function(t){return t.id}))})):this.$emit("editActivity",Object(r["a"])(Object(r["a"])({},this.activities),{},{images:this.activities.images.map((function(t){return t.id})),_method:"put"}))},saveGalleryImage:function(t){var i=this;this.removeLoadingUi=!1,this.requestLoading=!0;var e=new FormData;e.append("image",t.image),e.append("type","activity"),e.append("status",this.activitiesDetails?"exist":"new"),e.append("name",t.imageInfo.name),this.activitiesDetails&&e.append("activity_id",this.activitiesDetails.id);var s={onUploadProgress:function(t){var e=t.loaded,s=t.total,a=Math.floor(100*e/s);console.log(a),i.progressBar=a}};l["a"].addImage(e,s).then((function(t){c["c"].showSnackbar("success",t.data.message),i.activities.images.push(t.data.data),i.removeLoadingUi=!0,i.requestLoading=!1}))},removeGalleryImage:function(t){var i=this;l["a"].removeImage(t,"activity").then((function(e){c["c"].showSnackbar("success",e.data.message);var s=i.activities.images.findIndex((function(i){return i.id===t}));i.activities.images.splice(s,1)}))},getDurationList:function(){var t=this;d["a"].getDurationList().then((function(i){t.allDurationList=i.data.data}))}},watch:{},computed:{},created:function(){this.getDurationList(),this.activitiesDetails&&(this.activitiesDetails.discount_price_egp&&(this.selectedEGP=!0),this.activitiesDetails.discount_price_euro&&(this.selectedEUR=!0),this.activities={name:this.activitiesDetails.name,duration:this.activitiesDetails.duration,conditions:this.activitiesDetails.conditions,description:this.activitiesDetails.description,price_egp:this.activitiesDetails.price_egp,price_euro:this.activitiesDetails.price_euro?this.activitiesDetails.price_euro:"",price_dollar:this.activitiesDetails.price_dollar?this.activitiesDetails.price_dollar:"",discount_price_egp:this.activitiesDetails.discount_price_egp,discount_price_euro:this.activitiesDetails.discount_price_euro,status:this.activitiesDetails.status,images:this.activitiesDetails.images,duration_list_id:this.activitiesDetails.duration_list_id},console.log(this.activities))}},p=u,v=e("2877"),b=Object(v["a"])(p,o,n,!1,null,null,null),f=b.exports,m=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"pl-3 pr-3"},[e("b-row",[e("b-col",{staticClass:"border-right py-5",attrs:{lg:"6","order-lg":"1",order:"2"}},[e("h5",{staticClass:"mb-4 font-size-14"},[t._v("ACTIVITY INFORMATION")]),e("b-row",{staticClass:"pl-3 mb-2"},[e("b-col",{staticClass:"infoKey",attrs:{md:"12"}},[e("p",[t._v("Description")])]),e("b-col",{staticClass:"infoValue",attrs:{md:"12"}},[e("p",[t._v(t._s(t.activitiesDetails.description))])])],1),e("b-row",{staticClass:"pl-3 mb-2"},[e("b-col",{staticClass:"infoKey",attrs:{md:"6"}},[e("p",[t._v("Price EGP")]),e("p",{staticClass:"text-black font-weight-bold"},[t._v("EGP "+t._s(t.activitiesDetails.price_egp))])]),e("b-col",{staticClass:"infoKey",attrs:{md:"6"}},[e("p",[t._v("Discounted price")]),e("p",{staticClass:"text-black font-weight-bold"},[t.activitiesDetails.discount_price_egp?e("span",[t._v("EGP "+t._s(t.activitiesDetails.discount_price_egp))]):e("span",[t._v("N/A")])])]),e("b-col",{staticClass:"infoKey",attrs:{md:"6"}},[e("p",[t._v("Price EUR")]),e("p",{staticClass:"text-black font-weight-bold"},[t._v("EUR "+t._s(t.activitiesDetails.price_euro))])]),e("b-col",{staticClass:"infoKey",attrs:{md:"6"}},[e("p",[t._v("Discounted price")]),e("p",{staticClass:"text-black  font-weight-bold"},[t.activitiesDetails.discount_price_euro?e("span",[t._v("EUR "+t._s(t.activitiesDetails.discount_price_euro))]):e("span",[t._v("N/A")])])])],1),e("b-row",{staticClass:"pl-3 mb-2"},[e("b-col",{staticClass:"infoKey",attrs:{md:"12"}},[e("p",[t._v("Conditions")])]),e("b-col",{staticClass:"infoValue",attrs:{md:"12"}},[e("p",[t._v(t._s(t.activitiesDetails.conditions))])])],1)],1),e("b-col",{staticClass:"py-5",attrs:{lg:"6","order-lg":"2",order:"1"}},[e("h5",{staticClass:"mb-4 font-size-14"},[t._v("ACTIVITY PHOTOS")]),e("slider-thumbs",{attrs:{images:t.activitiesDetails.images}})],1)],1)],1)},g=[],h={props:{activitiesDetails:{type:Object}}},_=h,y=Object(v["a"])(_,m,g,!1,null,null,null),w=y.exports,D=e("bb36"),C={addNewActivity:function(t){return Object(D["a"])().post("activities",t)},getActivitiesDetails:function(t){return Object(D["a"])().get("activities/".concat(t))},editActivity:function(t,i){return Object(D["a"])().post("activities/".concat(t),i)}},x={data:function(){return{reloadTable:!1,requestLoading:!1,columns:[{label:"#",key:"id",class:"text-left"},{label:"Activity Name",key:"name",class:"text-left"},{label:"Description",key:"description",class:"text-left"},{label:"Price EGP/EUR",key:"price_egp,price_euro",class:"text-left",type:"multi-value",pre:"EGP,EUR"},{label:"Discounted Price",key:"discount_price_egp,discount_price_euro",class:"text-left",type:"multi-value"},{label:"Conditions",key:"conditions",class:"text-left"},{label:"Duration",key:"duration,duration_list.name",class:"text-left",type:"multi-text"},{label:"Photos",key:"images",class:"text-left",type:"multi_image"},{label:"Change Status",key:"change_status",type:"switch",tableType:"activity",idKey:"activity_id",class:"text-left"},{label:"Actions",key:"actions",class:"text-left",type:"actions",actions:[{icon:"las la-eye",color:"success-light",text:"View",actionName:"showActivities",actionParams:"fullObj"},{icon:"las la-pen",color:"info",text:"Edit",actionName:"showActivitiesToEdit",actionParams:"fullObj"},{icon:"las la-trash-alt",color:"danger",text:"Delete",showAlert:!0,actionHeader:"Delete",titleHeader:"Activities",textContnet:"name",url:"activities"}]}],typeOfModal:"add",activitiesDetails:{},activitiesId:""}},components:{activitiesDetails:f,activitiesView:w},methods:{sortChanged:function(t){console.log(t)},openPopup:function(){this.activitiesId="",this.typeOfModal="add",this.activitiesDetails=!1,this.$bvModal.show("activitiesDetailsModal")},addActivity:function(t){var i=this;this.requestLoading=!0,this.reloadTable=!1,C.addNewActivity(t).then((function(t){i.reloadTable=!0,c["c"].showSnackbar("success",t.data.message),i.$bvModal.hide("activitiesDetailsModal")})).finally((function(){i.requestLoading=!1}))},editActivity:function(t){var i=this;this.requestLoading=!0,this.reloadTable=!1,C.editActivity(this.activitiesId,t).then((function(t){i.reloadTable=!0,c["c"].showSnackbar("success",t.data.message),i.$bvModal.hide("activitiesDetailsModal")})).finally((function(){i.requestLoading=!1}))},showDetails:function(t){this.typeOfModal="view",this.activitiesDetails=t,this.$bvModal.show("activitiesDetailsViewModal")},showActivitiesToEdit:function(t){this.typeOfModal="edit",this.activitiesId=t.id,this.activitiesDetails=t,this.$bvModal.show("activitiesDetailsModal")}},created:function(){this.$root.$on("showActivities",this.showDetails),this.$root.$on("showActivitiesToEdit",this.showActivitiesToEdit)},beforeDestroy:function(){this.$root.$off("showActivities"),this.$root.$off("showActivitiesToEdit")},mounted:function(){c["c"].index()}},A=x,k=Object(v["a"])(A,s,a,!1,null,null,null);i["default"]=k.exports},df21:function(t,i,e){"use strict";var s=e("bb36");i["a"]={getProfileSettings:function(){return Object(s["a"])().get("settings")},updateProfileSettings:function(t){return Object(s["a"])().post("settings",t)},getAllActivityLine:function(){return Object(s["a"])().get("activityLines")},addNewActivityLine:function(t){return Object(s["a"])().post("activityLines",t)},getAllActivityType:function(){return Object(s["a"])().get("activityTypes")},addNewActivityType:function(t){return Object(s["a"])().post("activityTypes",t)},getDurationList:function(){return Object(s["a"])().get("durationLists")},addNewDurationList:function(t){return Object(s["a"])().post("durationLists",t)},getAllnationalities:function(){return Object(s["a"])().get("nationalities")},addNewNationality:function(t){return Object(s["a"])().post("nationalities",t)},getAllAccommodationTypes:function(){return Object(s["a"])().get("accommodationTypes")},addNewAccommodationType:function(t){return Object(s["a"])().post("accommodationTypes",t)},getAllLinks:function(){return Object(s["a"])().get("links")},addNewLink:function(t){return Object(s["a"])().post("links",t)},getAllLanguages:function(){return Object(s["a"])().get("languages")},addNewLanguage:function(t){return Object(s["a"])().post("languages",t)},getAllCountries:function(){return Object(s["a"])().get("countries")},getCountryCity:function(t){return Object(s["a"])().get("countries/".concat(t))},addNewCountry:function(t){return Object(s["a"])().post("countries",t)},getAllCities:function(){return Object(s["a"])().get("cities")},addNewCity:function(t){return Object(s["a"])().post("cities",t)},getCityArea:function(t){return Object(s["a"])().get("cities/".concat(t))},getAllAreas:function(){return Object(s["a"])().get("areas")},addNewArea:function(t){return Object(s["a"])().post("areas",t)},getAllAmenities:function(){return Object(s["a"])().get("amenities")}}}}]);
//# sourceMappingURL=chunk-8c3560ee.33392b5b.js.map