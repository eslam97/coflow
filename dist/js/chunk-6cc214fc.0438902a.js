(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6cc214fc"],{"384f":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-container",{attrs:{fluid:""}},[a("main-modal",{attrs:{id:"productDetailsModal",size:"lg"},scopedSlots:t._u([{key:"header",fn:function(){return["add"==t.typeOfModal?a("h4",{staticClass:"font-weight-bold"},[a("span",{staticClass:"text-warning"},[t._v("Add: ")]),t._v(" Product")]):a("h4",{staticClass:"font-weight-bold"},[a("span",{staticClass:"text-info"},[t._v("Edit: ")]),t._v(" Product")])]},proxy:!0},{key:"body",fn:function(){return[a("product-details",{attrs:{requestLoading:t.requestLoading,productDetails:t.productDetailsInfo,typeOfModal:t.typeOfModal},on:{editProduct:t.editProduct,saveProduct:t.addProduct}})]},proxy:!0}])}),a("main-modal",{attrs:{id:"productDetailsViewModal",size:"lg"},scopedSlots:t._u([{key:"header",fn:function(){return[a("h4",{staticClass:"font-weight-bold"},[a("span",{staticClass:"text-success-light"},[t._v("View: ")]),t._v(" Product")])]},proxy:!0},{key:"borderHeader",fn:function(){return[a("p",{staticClass:"p-4 borderHeaderModal"},[t._v(" "+t._s(t.productDetailsInfo.name)+" ")])]},proxy:!0},{key:"body",fn:function(){return[t.productDetailsInfo.name?a("ProductDetailsView",{attrs:{productDetails:t.productDetailsInfo}}):t._e()]},proxy:!0}])}),a("b-row",[a("b-col",{staticClass:"mb-3 d-flex justify-content-between align-items-center",attrs:{lg:"12"}},[a("h3",[t._v("Products")]),a("div",[a("b-button",{staticClass:"add_button text-white",attrs:{variant:"warning"},on:{click:t.openProductPopup}},[t._v(" Add Product"),a("i",{staticClass:"las la-plus ml-3"})])],1)])],1),t.loadingPage?a("div",[a("b-row",[a("b-col",{attrs:{md:"12"}},[a("b-card",{staticClass:"text-center text-black"},[a("spinner-loading",{attrs:{text:"Loading Products"}})],1)],1)],1)],1):a("div",[t.allProducts.length>0?a("b-row",t._l(t.allProducts,(function(e,i){return a("b-col",{key:i,staticClass:"mb-3",attrs:{md:"3"}},[a("b-card",{staticClass:"iq-product iq-product-list iq-product-item iq-border-radius-10"},[a("div",{staticClass:"pt-3 pr-3 pl-3"},[a("div",{staticClass:"mb-2 w-100 h-170px iq-border-radius-10"},[a("Swiper",{attrs:{id:"post-slider-"+i,options:t.swiperOptions,pagination:!0}},t._l(e.images,(function(t,e){return a("swiperSlide",{key:e},[a("section",{staticClass:"w-100 h-170px pt-5 px-4 pb-2 position-relative iq-border-radius-10",style:{"background-size":"cover","background-image":"url("+t.image+")"}})])})),1)],1),a("div",{staticClass:"mt-2"},[a("div",{staticClass:"text-justify mb-2"},[a("a",{staticClass:"font-weight-bold",attrs:{href:"javascript:void(0)",title:e.name}},[t._v(" "+t._s(e.name.length>30?e.name.substring(0,30)+"...":e.name)+" ")]),a("p",{staticClass:"font-size-12 font-weight-bold text-primary"},[t._v(t._s(e.description.length>35?e.description.substring(0,35)+"...":e.description))])]),a("div",{staticClass:"d-flex justify-content-between align-items-start"},[a("p",{staticClass:"font-size-16 font-weight-bold text-primary"},[t._v("EGP "+t._s(e.price_egp))]),e.discount_price_egp?a("p",{staticClass:"font-size-16 text-danger text-decoration-line-through"},[t._v(" EGP "+t._s(e.discount_price_egp))]):t._e()])])]),a("div",{staticClass:"d-flex justify-content-between align-items-center border-product-price pr-3 pl-3"},[a("div",{staticClass:"d-flex justify-content-between font-size-20 w-50 py-3 pr-3"},[a("i",{staticClass:"cursor-pointer las la-eye text-success-light",on:{click:function(a){return t.viewProduct(e)}}}),a("i",{staticClass:"cursor-pointer las la-pen text-info",on:{click:function(a){return t.viewProductToEdit(e)}}}),a("i",{staticClass:"cursor-pointer las la-trash-alt text-danger",on:{click:function(a){return t.deleteProduct(e)}}})]),a("div",{staticClass:"w-50 pt-3 py-3 pl-2 pr-1 border-actions"},[a("p",{staticClass:"text-primary font-weight-bold font-size-12 mb-2"},[t._v("Product Status:")]),a("div",{staticClass:"d-flex justify-content-between align-items-top"},[a("span",{staticClass:"text-info font-weight-bold font-size-12 font-weight-bold"},[t._v("Available")]),a("div",{staticClass:"custom-control custom-switch custom-switch-text custom-control-inline custom-switch-color mr-0"},[a("div",{staticClass:"custom-switch-inner"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.available,expression:"item.available"}],staticClass:"custom-control-input bg-info",attrs:{type:"checkbox",id:"customSwitch-11"+e.name},domProps:{checked:Array.isArray(e.available)?t._i(e.available,null)>-1:e.available},on:{change:[function(a){var i=e.available,s=a.target,o=!!s.checked;if(Array.isArray(i)){var r=null,c=t._i(i,r);s.checked?c<0&&t.$set(e,"available",i.concat([r])):c>-1&&t.$set(e,"available",i.slice(0,c).concat(i.slice(c+1)))}else t.$set(e,"available",o)},function(a){return t.changeAvailability(e)}]}}),a("label",{staticClass:"custom-control-label",attrs:{for:"customSwitch-11"+e.name}})])])])])])])],1)})),1):a("b-row",[a("b-col",{staticClass:"text-center text-black",attrs:{md:"12"}},[a("b-card",[t._v(" No Available Product")])],1)],1)],1)],1)},s=[],o=(a("d3b7"),a("b0c0"),a("d81d"),a("bcae")),r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("ValidationObserver",{scopedSlots:t._u([{key:"default",fn:function(e){var i=e.handleSubmit;return[a("b-form",{on:{submit:function(e){return e.preventDefault(),i(t.saveProduct)}}},[a("b-row",[a("b-col",{staticClass:"mb-3",attrs:{md:"6"}},[a("input-form",{attrs:{placeholder:"Ex: name",validate:"required",name:"name",label:"Name"},model:{value:t.product.name,callback:function(e){t.$set(t.product,"name",e)},expression:"product.name"}})],1),a("b-col",{staticClass:"mb-3",attrs:{md:"6"}},[a("input-form",{attrs:{placeholder:"Ex: title",validate:"required",name:"title",label:"Title"},model:{value:t.product.title,callback:function(e){t.$set(t.product,"title",e)},expression:"product.title"}})],1)],1),a("b-row",[a("b-col",{staticClass:"mb-3",attrs:{md:"4"}},[a("b-form-group",{staticClass:"position-relative",attrs:{label:"price_egp","label-for":"price_egp"}},[a("b-input-group",{attrs:{append:"EGP"}},[a("validation-provider",{staticClass:"flex-grow-1",attrs:{name:"Price",rules:"required|numeric"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.errors;return[a("b-form-input",{class:[{"is-invalid":i.length>0}],attrs:{id:"mm",placeholder:"0.0"},model:{value:t.product.price_egp,callback:function(e){t.$set(t.product,"price_egp",e)},expression:"product.price_egp"}})]}}],null,!0)})],1)],1)],1),a("b-col",{staticClass:"mb-3 d-flex justify-content-center align-items-center",attrs:{md:"4"}},[a("b-form-checkbox",{staticClass:"custom-checkbox-color-check",attrs:{type:"checkbox",id:"checkbox",label:"Discounted Price",color:"warning"},model:{value:t.selectedEGP,callback:function(e){t.selectedEGP=e},expression:"selectedEGP"}},[a("span",{staticClass:"text-secondary font-size-12"},[t._v("Discounted Price")])])],1),a("b-col",{staticClass:"mb-3",attrs:{md:"4"}},[a("b-form-group",{staticClass:"position-relative",attrs:{label:"Discounted price","label-for":"Discounted price"}},[a("b-input-group",{attrs:{append:"EGP"}},[a("validation-provider",{staticClass:"flex-grow-1",attrs:{name:"price_egp",rules:"numeric"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.errors;return[a("b-form-input",{class:[{"is-invalid":i.length>0}],attrs:{id:"mm",disabled:!t.selectedEGP,placeholder:"0.0"},model:{value:t.product.discount_price_egp,callback:function(e){t.$set(t.product,"discount_price_egp",e)},expression:"product.discount_price_egp"}})]}}],null,!0)})],1)],1)],1)],1),a("b-row",[a("b-col",{staticClass:"mb-3",attrs:{md:"12"}},[a("b-form-group",{attrs:{label:"Description","label-for":"Description"}},[a("ValidationProvider",{ref:"Description",attrs:{name:"description",rules:"required"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.errors;return[a("b-form-textarea",{class:i.length>0?" is-invalid":"",attrs:{placeholder:"Description...",rows:"2"},model:{value:t.product.description,callback:function(e){t.$set(t.product,"description",e)},expression:"product.description"}}),a("div",{staticClass:"invalid-feedback"},[a("span",[t._v(t._s(i[0]))])])]}}],null,!0)})],1)],1)],1),a("b-row",[a("b-col",[a("cropper-images",{attrs:{label:"Upload Product Photos",progressLoading:t.loadingGallery,removeLoadingUi:t.removeLoadingUi,images:t.allImages},on:{"cropper-save":t.saveGalleryImage,"remove-image":t.removeGalleryImage}})],1)],1),a("b-row",[a("b-col",{staticClass:"mt-4",attrs:{md:"12"}},["add"==t.typeOfModal?a("div",{staticClass:"d-flex justify-content-center"},[t.requestLoading?a("b-button",{staticClass:"button-orange-modal"},[a("spinner-loading")],1):a("b-button",{staticClass:"button-orange-modal",attrs:{type:"submit"}},[a("i",{staticClass:"las la-plus"})])],1):a("div",{staticClass:"d-flex justify-content-center"},[t.requestLoading?a("b-button",{staticClass:"button-blue-modal"},[a("spinner-loading")],1):a("b-button",{staticClass:"button-blue-modal",attrs:{type:"submit"}},[a("i",{staticClass:"las la-pen"})])],1)])],1)],1)]}}])})],1)},c=[],l=a("5530"),n=(a("c740"),a("a434"),a("4fadc"),a("a4d3"),a("e01a"),a("5636")),d={props:{requestLoading:{type:Boolean,default:!1},productDetails:{default:!1},typeOfModal:{type:String,default:"add"}},components:{},data:function(){return{loadingGallery:0,removeLoadingUi:!1,product:{name:"",title:"",price_egp:"",price_euro:0,price_dollar:0,discount_price_egp:"",discount_price_dollar:0,discount_price_euro:0,status:"active",available:1,description:"",images:[]},allImages:[],selectedEGP:""}},methods:{saveGalleryImage:function(t){var e=this;this.removeLoadingUi=!1,this.requestLoading=!0;var a=new FormData;a.append("image",t.image),a.append("name",t.imageInfo.name),a.append("type","product"),a.append("status",this.productDetails?"exist":"new"),this.productDetails&&a.append("product_id",this.productDetails.id);var i={onUploadProgress:function(t){var a=t.loaded,i=t.total,s=Math.floor(100*a/i);e.loadingGallery=s}};n["a"].addImage(a,i).then((function(t){o["c"].showSnackbar("success",t.data.message),e.product.images.push(t.data.data.id),e.allImages.push(t.data.data),e.removeLoadingUi=!0,e.requestLoading=!1}))},removeGalleryImage:function(t){var e=this;n["a"].removeImage(t,"product").then((function(a){o["c"].showSnackbar("success",a.data.message);var i=e.images.findIndex((function(e){return e.id===t}));e.images.splice(i,1)}))},saveProduct:function(){this.product.images.length>0?(this.product.discount_price_egp=this.selectedEGP?this.product.discount_price_egp:"",this.productDetails?this.$emit("editProduct",Object(l["a"])(Object(l["a"])({},this.product),{},{_method:"put"})):this.$emit("saveProduct",this.product)):o["c"].showSnackbar("error","You Should Upload At Least One Image")}},computed:{},created:function(){if(0!==Object.entries(this.productDetails).length){this.productDetails.discount_price_egp&&(this.selectedEGP=!0);var t=this.productDetails.images.map((function(t){return t.id}));this.product={name:this.productDetails.name,title:this.productDetails.title,price_egp:this.productDetails.price_egp,price_euro:this.productDetails.price_euro,price_dollar:this.productDetails.price_dollar,discount_price_egp:this.productDetails.discount_price_egp,discount_price_dollar:this.productDetails.discount_price_dollar,discount_price_euro:this.productDetails.discount_price_euro,status:this.productDetails.status,available:this.productDetails.available,description:this.productDetails.description,images:t},this.allImages=this.productDetails.images}}},u=d,p=(a("9bcf"),a("2877")),f=Object(p["a"])(u,r,c,!1,null,"2fbb2afe",null),b=f.exports,m=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"row justify-content-center"},[a("div",{staticClass:"col-md-6"},[a("slider-thumbs",{attrs:{images:t.productDetails.images}})],1),a("div",{staticClass:"col-md-6 iq-item-product-right"},[a("div",{staticClass:"product-additional-details"},[a("div",{staticClass:"product-price"},[a("label",{staticClass:"text-gray font-size-12 mb-2"},[t._v("Product Price")]),a("div",{staticClass:"regular-price font-size-14"},[a("b",{staticClass:"mr-5 font-weight-bold font-siz-14"},[t._v(" EGP "+t._s(t.productDetails.discount_price_egp))]),a("span",{staticClass:"offer-price ml-2 text-danger font-weight-bold font-size-12"},[t._v("EGP "+t._s(t.productDetails.price_egp))])])]),a("label",{staticClass:"text-gray font-size-12 mb-2"},[t._v("Product Information")]),a("div",{staticClass:"product-descriptio"},[a("p",{staticClass:"text-black font-weight-bold font-size-12 text-justify"},[t._v(t._s(t.productDetails.description))])])])])])])},g=[],h={props:["productDetails"],name:"productView",created:function(){},methods:{}},v=h,_=Object(p["a"])(v,m,g,!1,null,null,null),w=_.exports,P=a("bb36"),y={getAllProducts:function(){return Object(P["a"])().get("products")},getProductDetails:function(t){return Object(P["a"])().get("products/".concat(t))},editProduct:function(t,e){return Object(P["a"])().post("products/".concat(t),e)},addProduct:function(t){return Object(P["a"])().post("products",t)}},C=a("0c12"),x={components:{ProductDetails:b,ProductDetailsView:w},data:function(){return{requestLoading:!1,typeOfModal:"add",swiperOptions:{spaceBetween:30,autoplay:!1,slidesPerView:1,pagination:{clickable:!0,el:".swiper-pagination",type:"bullets"}},productDetailsInfo:{},allProducts:[],loadingPage:!0,available:""}},methods:{openProductPopup:function(){this.productDetailsInfo=!1,this.typeOfModal="add",this.$bvModal.show("productDetailsModal")},addProduct:function(t){var e=this;this.productDetailsInfo={},this.requestLoading=!0,y.addProduct(t).then((function(t){o["c"].showSnackbar("success",t.data.message),e.$bvModal.hide("productDetailsModal"),e.getAllProducts()})).finally((function(){e.requestLoading=!1}))},getAllProducts:function(){var t=this;this.loadingPage=!0,y.getAllProducts().then((function(e){t.allProducts=e.data.data.data})).finally((function(){t.loadingPage=!1}))},viewProduct:function(t){this.productDetailsInfo=t,this.$bvModal.show("productDetailsViewModal")},deleteProduct:function(t){C["a"].$emit("openDeleteModal",{actionHeader:"Delete",titleHeader:"Product",textContent:t.name,question:"Are You Sure You Want Delete This Product?",textDeleteButton:"YES, Delete",textCancelButton:"NO, CANCEL",icon:"las la-trash-alt",type:"delete",actionOnAlert:"",text:"Delete",url:"products",rowId:t.id})},viewProductToEdit:function(t){this.typeOfModal="edit",this.productDetailsInfo=t,this.$bvModal.show("productDetailsModal")},editProduct:function(t){var e=this;this.requestLoading=!0,y.editProduct(this.productDetailsInfo.id,t).then((function(t){o["c"].showSnackbar("success",t.data.message),e.$bvModal.hide("productDetailsModal"),e.getAllProducts()})).finally((function(){e.requestLoading=!1}))},changeAvailability:function(t){var e=this;this.requestLoading=!0;var a=t.images.map((function(t){return t.id}));t.available=t.available?1:0,t.images=a,t._method="put",y.editProduct(t.id,t).then((function(t){o["c"].showSnackbar("success",t.data.message),e.getAllProducts()})).finally((function(){e.requestLoading=!1}))}},created:function(){var t=this;this.getAllProducts(),C["a"].$on("reloadTableAfterDelete",(function(e){t.$bvModal.hide("productDetailsModal"),t.getAllProducts(),o["c"].showSnackbar("success","Product deleted successfully")}))},mounted:function(){o["c"].index()}},D=x,k=Object(p["a"])(D,i,s,!1,null,"dafa3760",null);e["default"]=k.exports},9120:function(t,e,a){},"9bcf":function(t,e,a){"use strict";a("9120")}}]);
//# sourceMappingURL=chunk-6cc214fc.0438902a.js.map