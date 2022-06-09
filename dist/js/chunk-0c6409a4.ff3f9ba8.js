(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0c6409a4"],{"2a7b":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("b-container",{attrs:{fluid:""}},[s("main-modal",{attrs:{id:"flowsDetailsModal",size:"xl"},scopedSlots:t._u([{key:"header",fn:function(){return["add"==t.typeOfModal?s("h4",{staticClass:"font-weight-bold"},[s("span",{staticClass:"text-warning"},[t._v("Add: ")]),t._v(" Flow")]):s("h4",{staticClass:"font-weight-bold"},[s("span",{staticClass:"text-info"},[t._v("Edit: ")]),t._v(" Flow")])]},proxy:!0},{key:"body",fn:function(){return[s("flows-details",{attrs:{requestLoading:t.requestLoading,flowsDetails:t.flowsDetails,typeOfModal:t.typeOfModal},on:{addFlows:t.addFlows,editFlows:t.editFlows}})]},proxy:!0}])}),s("main-modal",{attrs:{id:"flowDetailsViewModal",size:"lg",border:"true"},scopedSlots:t._u([{key:"header",fn:function(){return[s("h4",{staticClass:"font-weight-bold"},[s("span",{staticClass:"text-success-light"},[t._v("View: ")]),t._v(" Flow")])]},proxy:!0},{key:"borderHeader",fn:function(){return[s("p",{staticClass:"p-4 borderHeaderModal m-0"},[t._v(" "+t._s(t.flowsDetails.name)+" "),t.optionInd>-1?s("button",{staticClass:"ml-4 p-2 btn radio-btn",class:"radio-btn-"+t.options[t.optionInd].color+" radio-btn-selected-"+t.options[t.optionInd].color,attrs:{active:""}},[t._v(" "+t._s(t.options[t.optionInd].text)+" ")]):t._e()])]},proxy:!0},{key:"body",fn:function(){return[s("flows-view",{attrs:{flowsDetails:t.flowsDetails}})]},proxy:!0}])}),s("b-row",[s("b-col",{staticClass:"mb-2 d-flex justify-content-between align-items-center",attrs:{lg:"12"}},[s("h3",[t._v("Flows")]),s("div",[s("b-button",{staticClass:"add_button text-white",attrs:{variant:"warning"},on:{click:t.openPopup}},[t._v(" Add Flow"),s("i",{staticClass:"las la-plus ml-3"})])],1)]),s("b-col",{attrs:{lg:"12"}},[s("main-table",{staticClass:"mb-0 table-borderless",attrs:{fields:t.columns,list_url:"flows",reloadData:t.reloadTable},on:{sortChanged:t.sortChanged}})],1)],1)],1)},l=[],o=(s("d3b7"),s("c740"),s("bcae")),i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("validationObserver",{scopedSlots:t._u([{key:"default",fn:function(e){var a=e.handleSubmit;return[s("b-form",{on:{submit:function(e){return e.preventDefault(),a(t.addFlows)}}},[s("b-row",[s("b-col",{staticClass:"mb-3",attrs:{lg:"6"}},[s("b-row",[s("b-col",{attrs:{md:"12"}},[s("input-form",{attrs:{placeholder:"Write flow name",validate:"required",name:"Flow name",label:"Flow Name"},model:{value:t.flows.name,callback:function(e){t.$set(t.flows,"name",e)},expression:"flows.name"}})],1)],1),s("b-row",[s("b-col",{staticClass:"mb-3",attrs:{md:"12"}},[s("input-form",{attrs:{placeholder:"Any required experince or equipment for the flow",validate:"required",name:"Flow requirements",label:"Requirements"},model:{value:t.flows.requirements,callback:function(e){t.$set(t.flows,"requirements",e)},expression:"flows.requirements"}})],1)],1),s("b-row",[s("b-col",{staticClass:"mb-3",attrs:{md:"4"}},[s("validation-provider",{staticClass:"flex-grow-1",attrs:{name:"EGP price",rules:"required|numeric"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.errors;return[s("b-form-group",{attrs:{label:"Price"}},[s("b-input-group",{attrs:{append:"EGP"}},[s("b-form-input",{class:[{"is-invalid":a.length>0}],attrs:{placeholder:"000.00"},model:{value:t.flows.price_egp,callback:function(e){t.$set(t.flows,"price_egp",e)},expression:"flows.price_egp"}})],1)],1)]}}],null,!0)})],1),s("b-col",{staticClass:"mb-5 pt-4",attrs:{md:"4"}},[s("b-form-checkbox",{staticClass:"custom-checkbox-color-check mb-2 mr-sm-2 mb-sm-0",attrs:{type:"checkbox",id:"checkbox",label:"Discounted Price",color:"warning"},model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}},[t._v(" Discounted Price ")])],1),s("b-col",{staticClass:"mb-3",attrs:{md:"4"}},[s("validation-provider",{staticClass:"flex-grow-1",attrs:{name:"Discounted EGP price",rules:"numeric"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.errors;return[s("b-form-group",{attrs:{label:"Discounted Price"}},[s("b-input-group",{attrs:{append:"EGP"}},[s("b-form-input",{class:[{"is-invalid":a.length>0}],attrs:{placeholder:"000.00",disabled:!t.selected,validate:t.selected?"required":""},model:{value:t.flows.discount_price_egp,callback:function(e){t.$set(t.flows,"discount_price_egp",e)},expression:"flows.discount_price_egp"}})],1)],1)]}}],null,!0)})],1)],1),s("span",{staticClass:"d-flex"},[s("span",{staticClass:"text-warning cursor-pointer ml-auto p-2",on:{click:t.addInstructor}},[t._v("+ Add another")])]),t._l(t.flows.instructors,(function(e,a){return s("div",{key:a},[s("validation-provider",{staticClass:"flex-grow-1",attrs:{name:"Instructor",rules:"required"},scopedSlots:t._u([{key:"default",fn:function(l){var o=l.errors;return[s("b-form-group",{attrs:{inline:"",label:"Instructor","label-for":"Instructor"}},[s("b-form-row",[s("b-col",{staticClass:"mb-3",attrs:{md:"5"}},[s("b-form-input",{class:[{"is-invalid":o.length>0}],attrs:{placeholder:"First Name",name:"First name "+(a+1)},model:{value:e.first_name,callback:function(s){t.$set(e,"first_name",s)},expression:"instructor.first_name"}})],1),s("b-col",{staticClass:"mb-3",attrs:{md:"5"}},[s("b-form-input",{class:[{"is-invalid":o.length>0}],attrs:{placeholder:"Last Name",name:"Last name "+(a+1)},model:{value:e.last_name,callback:function(s){t.$set(e,"last_name",s)},expression:"instructor.last_name"}})],1),s("b-col",[0!=a?s("span",{staticClass:"deleteLabelButton text-danger cursor-pointer",on:{click:function(e){return t.deleteInstructor(a)}}},[t._v("Delete")]):t._e()])],1)],1)]}}],null,!0)})],1)}))],2),s("b-col",{staticClass:"mb-3",attrs:{lg:"6"}},[s("b-form-group",{attrs:{label:"Pick Level"}},[s("div",{staticClass:"d-flex flex-wrap mb-2 flex-grow-1 justify-content-around"},t._l(t.options,(function(e,a){return s("span",{key:a},[s("button",{staticClass:"btn radio-btn",class:"radio-btn-"+e.color+" "+(t.selectLevel(e.value)?"radio-btn-selected-"+e.color:""),on:{click:function(s){s.preventDefault(),t.flows.level=e.value}}},[t._v(" "+t._s(e.text)+" ")])])})),0)]),s("validation-provider",{staticClass:"flex-grow-1",attrs:{name:"Description",rules:"required"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.errors;return[s("b-form-group",{attrs:{label:"Description"}},[s("b-form-textarea",{class:[{"is-invalid":a.length>0}],attrs:{label:"Description",placeholder:"Write your description about this flow….",rows:"4"},model:{value:t.flows.description,callback:function(e){t.$set(t.flows,"description",e)},expression:"flows.description"}})],1)]}}],null,!0)})],1)],1),s("b-row",[s("b-col",{staticClass:"mb-5",attrs:{md:"12"}},[s("cropper-images",{attrs:{label:"Upload Photos",removeLoadingUi:t.removeLoadingUi,progressLoading:t.progressBar,images:t.flows.images},on:{"cropper-save":t.saveGalleryImage,"remove-image":t.removeGalleryImage}})],1)],1),"view"!=t.typeOfModal?s("b-row",[s("b-col",{staticClass:"mt-4",attrs:{md:"12"}},["add"==t.typeOfModal?s("div",{staticClass:"d-flex justify-content-center"},[t.requestLoading?s("b-button",{staticClass:"button-orange-modal"},[s("spinner-loading")],1):s("b-button",{staticClass:"button-orange-modal",attrs:{type:"submit"}},[s("i",{staticClass:"las la-plus"})])],1):t._e(),"edit"==t.typeOfModal?s("div",{staticClass:"d-flex justify-content-center"},[t.requestLoading?s("b-button",{staticClass:"button-blue-modal"},[s("spinner-loading")],1):s("b-button",{staticClass:"button-blue-modal",attrs:{type:"submit"}},[s("i",{staticClass:"las la-pen"})])],1):t._e()])],1):t._e()],1)]}}])})],1)},r=[],n=s("5530"),c=(s("d81d"),s("a434"),s("b0c0"),s("a4d3"),s("e01a"),s("5636")),d={props:{requestLoading:{type:Boolean,default:!1},typeOfModal:{type:String,default:"add"},flowsDetails:{type:Object}},data:function(){return{flows:{name:"",requirements:"",conditions:"",description:"",price_egp:"",price_euro:0,price_dollar:0,discount_price_egp:"",status:"active",images:[],instructors:[{first_name:"",last_name:""}],level:"all"},selected:"",options:[{text:"ALL LEVELS",value:"all",color:"blue"},{text:"BEGINNER",value:"beginner",color:"cyan"},{text:"INTERMEDIATE",value:"intermediate",color:"orange"},{text:"ADVANCED",value:"advanced",color:"red"}],loadingGallery:0,progressBar:0,removeLoadingUi:!1}},components:{},methods:{addFlows:function(){this.flows.discount_price_egp=this.selected?this.flows.discount_price_egp:"","add"===this.typeOfModal?this.$emit("addFlows",Object(n["a"])(Object(n["a"])({},this.flows),{},{images:this.flows.images.map((function(t){return t.id}))})):this.$emit("editFlows",Object(n["a"])(Object(n["a"])({},this.flows),{},{images:this.flows.images.map((function(t){return t.id})),_method:"put"}))},addInstructor:function(){this.flows.instructors.push({first_name:"",last_name:""})},deleteInstructor:function(t){this.flows.instructors.splice(t,1)},cropperFile:function(t){console.log("file",t)},saveGalleryImage:function(t){var e=this;this.removeLoadingUi=!1,this.requestLoading=!0;var s=new FormData;s.append("image",t.image),s.append("type","flow"),s.append("status",this.flowsDetails?"exist":"new"),s.append("name",t.imageInfo.name),this.flowsDetails&&s.append("flow_id",this.flowsDetails.id);var a={onUploadProgress:function(t){var s=t.loaded,a=t.total,l=Math.floor(100*s/a);console.log(l),e.progressBar=l}};c["a"].addImage(s,a).then((function(t){o["c"].showSnackbar("success",t.data.message),e.flows.images.push(t.data.data),e.removeLoadingUi=!0,e.requestLoading=!1}))},removeGalleryImage:function(t){var e=this;c["a"].removeImage(t,"flow").then((function(s){o["c"].showSnackbar("success",s.data.message);var a=e.flows.images.findIndex((function(e){return e.id===t}));e.flows.images.splice(a,1)}))},selectLevel:function(t){return this.flows.level===t}},watch:{},computed:{},created:function(){this.flowsDetails&&(this.flowsDetails.discount_price_egp&&(this.selected=!0),this.flows={name:this.flowsDetails.name,requirements:this.flowsDetails.requirements,conditions:this.flowsDetails.conditions,description:this.flowsDetails.description,price_egp:this.flowsDetails.price_egp,price_euro:this.flowsDetails.price_euro,price_dollar:this.flowsDetails.price_dollar,discount_price_egp:this.flowsDetails.discount_price_egp,status:this.flowsDetails.status,images:this.flowsDetails.images,instructors:this.flowsDetails.instructors,level:this.flowsDetails.level})}},u=d,f=s("2877"),p=Object(f["a"])(u,i,r,!1,null,null,null),m=p.exports,b=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"px-3"},[s("b-row",[s("b-col",{staticClass:"border-right py-5",attrs:{lg:"6","order-lg":"1",order:"2"}},[s("h5",{staticClass:"mb-4 font-size-14"},[t._v("FLOW INFORMATION")]),s("b-row",{staticClass:"pl-3 mb-3"},[s("b-col",{staticClass:"infoKey",attrs:{md:"12"}},[s("p",[t._v("Description")])]),s("b-col",{staticClass:"infoValue",attrs:{md:"12"}},[s("p",[t._v(t._s(t.flowsDetails.description))])])],1),s("b-row",{staticClass:"pl-3 mb-3"},[s("b-col",{staticClass:"infoKey",attrs:{md:"12"}},[s("p",[t._v("Requirements")])]),s("b-col",{staticClass:"infoValue",attrs:{md:"12"}},[s("p",[t._v(t._s(t.flowsDetails.requirements))])])],1),s("b-row",{staticClass:"pl-3 mb-3"},[s("b-col",{staticClass:"infoKey",attrs:{md:"4"}},[s("p",[t._v("Price")])]),s("b-col",{staticClass:"infoKey",attrs:{md:"8"}},[s("p",[t._v("Discounted price")])]),s("b-col",{staticClass:"infoValue",attrs:{md:"4"}},[s("p",[t._v("EGP "+t._s(t.flowsDetails.price_egp))])]),s("b-col",{staticClass:"infoValue",attrs:{md:"8"}},[s("p",[t.flowsDetails.discount_price_egp?s("span",[t._v("EGP "+t._s(t.flowsDetails.discount_price_egp))]):s("span",[t._v("N/A")])])])],1),s("b-row",{staticClass:"pl-3 mb-3"},[s("b-col",{staticClass:"infoKey",attrs:{md:"12"}},[s("p",[t._v("Instructors")])]),t._l(t.flowsDetails.instructors,(function(e,a){return s("b-col",{key:a,staticClass:"infoValue",attrs:{md:"4"}},[s("p",[t._v(t._s(e.first_name)+" "+t._s(e.last_name))])])}))],2)],1),s("b-col",{staticClass:"py-5",attrs:{lg:"6","order-lg":"2",order:"1"}},[s("h5",{staticClass:"mb-4 font-size-14"},[t._v("FLOW PHOTOS")]),s("slider-thumbs",{attrs:{images:t.flowsDetails.images}})],1)],1)],1)},w=[],h={props:{flowsDetails:{type:Object}}},g=h,v=Object(f["a"])(g,b,w,!1,null,null,null),_=v.exports,y=s("66ba"),D={data:function(){return{reloadTable:!1,requestLoading:!1,columns:[{label:"#",key:"id",class:"text-left"},{label:"Name",key:"name",class:"text-left"},{label:"Description",key:"description",class:"text-left"},{label:"Requirements",key:"requirements",class:"text-left"},{label:"Price EGP",key:"price_egp",class:"text-left",type:"multi-value"},{label:"Discounted Price",key:"discounted_price_egp",class:"text-left",type:"multi-value"},{label:"Level",key:"level",class:"text-left"},{label:"Instructors",key:"instructors",array_keys:["first_name","last_name"],type:"array",class:"text-left"},{label:"Photos",key:"images",class:"text-left",type:"multi_image"},{label:"Actions",key:"actions",class:"text-left",type:"actions",actions:[{icon:"las la-eye",color:"success-light",text:"View",actionName:"showFlows",actionParams:"fullObj"},{icon:"las la-pen",color:"info",text:"Edit",actionName:"showFlowsToEdit",actionParams:"fullObj"},{icon:"las la-trash-alt",color:"danger",text:"Delete",showAlert:!0,actionHeader:"Delete",titleHeader:"Flows",textContent:"name",url:"flows"}]}],options:[{text:"ALL LEVELS",value:"all",color:"blue"},{text:"BEGINNER",value:"beginner",color:"cyan"},{text:"INTERMEDIATE",value:"intermediate",color:"orange"},{text:"ADVANCED",value:"advanced",color:"red"}],optionInd:"",typeOfModal:"add",flowsDetails:{},flowsId:""}},components:{flowsDetails:m,flowsView:_},methods:{sortChanged:function(t){console.log(t)},openPopup:function(){this.flowsId="",this.typeOfModal="add",this.flowsDetails=!1,this.$bvModal.show("flowsDetailsModal")},addFlows:function(t){var e=this;this.requestLoading=!0,this.reloadTable=!1,y["a"].addNewFlow(t).then((function(t){e.reloadTable=!0,o["c"].showSnackbar("success",t.data.message),e.$bvModal.hide("flowsDetailsModal")})).finally((function(){e.requestLoading=!1}))},editFlows:function(t){var e=this;this.requestLoading=!0,this.reloadTable=!1,y["a"].editFlow(this.flowsId,t).then((function(t){e.reloadTable=!0,o["c"].showSnackbar("success",t.data.message),e.$bvModal.hide("flowsDetailsModal")})).finally((function(){e.requestLoading=!1}))},showDetails:function(t){this.flowsId="",this.optionInd=this.options.findIndex((function(e){return e.value===t.level})),this.typeOfModal="view",this.flowsDetails=t,this.$bvModal.show("flowDetailsViewModal")},showFlowsToEdit:function(t){this.typeOfModal="edit",this.flowsId=t.id,this.flowsDetails=t,this.$bvModal.show("flowsDetailsModal")}},created:function(){this.$root.$on("showFlows",this.showDetails),this.$root.$on("showFlowsToEdit",this.showFlowsToEdit)},beforeDestroy:function(){this.$root.$off("showFlows"),this.$root.$off("showFlowsToEdit")},mounted:function(){o["c"].index()}},x=D,C=Object(f["a"])(x,a,l,!1,null,null,null);e["default"]=C.exports},"66ba":function(t,e,s){"use strict";var a=s("bb36");e["a"]={getAllFlows:function(){return Object(a["a"])().get("all-flows")},addNewFlow:function(t){return Object(a["a"])().post("flows",t)},getFlowsDetails:function(t){return Object(a["a"])().get("flows/".concat(t))},editFlow:function(t,e){return Object(a["a"])().post("flows/".concat(t),e)}}}}]);
//# sourceMappingURL=chunk-0c6409a4.ff3f9ba8.js.map