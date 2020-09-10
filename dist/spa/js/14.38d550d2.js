(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[14],{"7a38":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-page",[e.loggedUser?a("record-details",{attrs:{serviceName:"contacts",sobjectName:"Contact",layoutName:"Employee Layout (App)",sobjectId:e.loggedUser.ContactId},scopedSlots:e._u([{key:"actions",fn:function(){return[a("router-link",{attrs:{to:"/profile/password"}},[a("a",[e._v(e._s(e.passwordLabel))])])]},proxy:!0}],null,!1,3153094144)}):e._e()],1)},l=[],n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return e.ready?a("q-card",{attrs:{flat:"",name:"record-details"}},[a("div",{staticClass:"content-wrapper"},[a("div",{staticClass:"main-content"},[e._l(e.availableSections,(function(t){return a("q-card-section",{key:t.secRank},[a("span",{staticClass:"text-subtitle2"},[e._v(e._s(t.label))]),e._l(t.layoutColumns,(function(t){return a("div",{key:t.colRank},e._l(t.layoutItems,(function(t){return a("div",{key:t.field},[e.isContactName(e.metadata,t.field)?a("div",[a("record-field",{attrs:{record:e.record,metadata:e.metadata,fieldName:"Salutation",mode:e.mode},on:{valueChanged:e.handleValueChanged}}),a("record-field",{attrs:{record:e.record,metadata:e.metadata,fieldName:"FirstName",mode:e.mode},on:{valueChanged:e.handleValueChanged}}),a("record-field",{attrs:{record:e.record,metadata:e.metadata,fieldName:"LastName",mode:e.mode},on:{valueChanged:e.handleValueChanged}})],1):a("record-field",{attrs:{record:e.record,metadata:e.metadata,fieldName:t.field,behavior:t.behavior,mode:e.mode},on:{valueChanged:e.handleValueChanged}})],1)})),0)}))],2)})),"view"==e.mode?a("q-card-section",[e._t("actions")],2):e._e()],2),a("div",{staticClass:"toolbar"},["edit"==e.mode?a("q-btn-group",{staticClass:"full-width q-pa-xs",attrs:{spread:"",flat:""}},[a("q-btn",{staticClass:"q-pa-sm",attrs:{label:this.$t("buttons.save"),color:"primary"},on:{click:e.saveRecord}}),a("q-btn",{staticClass:"q-pa-sm",attrs:{label:this.$t("buttons.cancel"),color:"grey-2","text-color":"primary"},on:{click:e.toggleEditMode}})],1):e._e(),"view"==e.mode?a("q-btn-group",{staticClass:"full-width q-pa-xs",attrs:{spread:"",flat:""}},[a("q-btn",{staticClass:"q-pa-sm",attrs:{label:this.$t("buttons.update"),color:"primary"},on:{click:e.toggleEditMode}})],1):e._e()],1)])]):e._e()},s=[],o=(a("456d"),a("7f7f"),a("7514"),a("ac6a"),a("cadf"),a("06db"),a("5df3"),a("4f7f"),a("2b0e")),d=function(){var e=this,t=e.$createElement,a=e._self._c||t;return e.isCheckbox?a("q-select",{attrs:{id:e.field.name,label:e.field.label,readonly:e.isReadonly,options:e.options},model:{value:e.fieldValue,callback:function(t){e.fieldValue=t},expression:"fieldValue"}}):e.isDate?a("q-input",{attrs:{id:e.field.name,label:e.field.label,required:e.required,readonly:e.isReadonly,rules:["date"],mask:"date"},scopedSlots:e._u([{key:"append",fn:function(){return[a("q-icon",{staticClass:"cursor-pointer",attrs:{name:"event"}},[a("q-popup-proxy",{ref:"qDateProxy",attrs:{"transition-show":"scale","transition-hide":"scale"}},[a("q-date",{on:{input:function(){return e.$refs.qDateProxy.hide()}},model:{value:e.fieldValue,callback:function(t){e.fieldValue=t},expression:"fieldValue"}})],1)],1)]},proxy:!0}]),model:{value:e.fieldValue,callback:function(t){e.fieldValue=t},expression:"fieldValue"}}):e.isTime?a("q-input",{attrs:{id:e.field.name,label:e.field.label,required:e.required,readonly:e.isReadonly,rules:["time"],mask:"time"},scopedSlots:e._u([{key:"append",fn:function(){return[a("q-icon",{staticClass:"cursor-pointer",attrs:{name:"access_time"}},[a("q-popup-proxy",{attrs:{"transition-show":"scale","transition-hide":"scale"}},[a("q-time",{model:{value:e.fieldValue,callback:function(t){e.fieldValue=t},expression:"fieldValue"}})],1)],1)]},proxy:!0}]),model:{value:e.fieldValue,callback:function(t){e.fieldValue=t},expression:"fieldValue"}}):e.isDateTime?a("q-input",{attrs:{id:e.field.name,label:e.field.label,required:e.required,readonly:e.isReadonly},scopedSlots:e._u([{key:"prepend",fn:function(){return[a("q-icon",{staticClass:"cursor-pointer",attrs:{name:"event"}},[a("q-popup-proxy",{attrs:{"transition-show":"scale","transition-hide":"scale"}},[a("q-date",{attrs:{mask:"YYYY-MM-DD HH:mm"},model:{value:e.fieldValue,callback:function(t){e.fieldValue=t},expression:"fieldValue"}})],1)],1)]},proxy:!0},{key:"append",fn:function(){return[a("q-icon",{staticClass:"cursor-pointer",attrs:{name:"access_time"}},[a("q-popup-proxy",{attrs:{"transition-show":"scale","transition-hide":"scale"}},[a("q-time",{attrs:{mask:"YYYY-MM-DD HH:mm",format24h:""},model:{value:e.fieldValue,callback:function(t){e.fieldValue=t},expression:"fieldValue"}})],1)],1)]},proxy:!0}]),model:{value:e.fieldValue,callback:function(t){e.fieldValue=t},expression:"fieldValue"}}):e.isPickList?a("q-select",{attrs:{id:e.field.name,label:e.field.label,required:e.required,readonly:e.isReadonly,options:e.options},model:{value:e.fieldValue,callback:function(t){e.fieldValue=t},expression:"fieldValue"}}):e.isMultiPickList?a("q-select",{attrs:{multiple:"",id:e.field.name,label:e.field.label,required:e.required,readonly:e.isReadonly,options:e.options},model:{value:e.fieldValue,callback:function(t){e.fieldValue=t},expression:"fieldValue"}}):e.isAddress?a("div",[a("q-input",{attrs:{type:"text",label:this.$t("Address.Street"),id:e.field.name+"Street",readonly:e.isReadonly},model:{value:e.fieldValue.street,callback:function(t){e.$set(e.fieldValue,"street",t)},expression:"fieldValue.street"}}),a("q-input",{attrs:{type:"text",label:this.$t("Address.PostalCode"),id:e.field.name+"PostalCode",readonly:e.isReadonly},model:{value:e.fieldValue.postalCode,callback:function(t){e.$set(e.fieldValue,"postalCode",t)},expression:"fieldValue.postalCode"}}),a("q-input",{attrs:{type:"text",label:this.$t("Address.City"),id:e.field.name+"City",readonly:e.isReadonly},model:{value:e.fieldValue.city,callback:function(t){e.$set(e.fieldValue,"city",t)},expression:"fieldValue.city"}})],1):a("q-input",{attrs:{id:e.field.name,label:e.field.label,required:e.required,type:e.inputType,readonly:e.isReadonly},model:{value:e.fieldValue,callback:function(t){e.fieldValue=t},expression:"fieldValue"}})},r=[],u=(a("6762"),a("2fdb"),a("28a5"),{TEXTAREA:"textarea",STRING:"text",BOOLEAN:"checkbox",COMBOBOX:"text",CURRENCY:"text",DATE:"date",DATETIME:"text",DOUBLE:"number",ADRESS:"text",EMAIL:"email",INTEGER:"number",PERCENT:"number",MULTIPICKLIST:"text",PICKLIST:"text",PHONE:"tel",REFERENCE:"search",URL:"url",TIME:"time"}),c={name:"RecordField",props:["metadata","record","fieldName","behavior","mode"],data:function(){return{field:null,fieldType:null,inputType:null,fieldValue:null,initialized:!1}},created:function(){var e=this;if(this.metadata){this.field=this.metadata.fields.find((function(t){return t.name===e.fieldName})),this.fieldType=this.field.type.toUpperCase(),this.inputType=u[this.fieldType];var t=this.record[this.fieldName];if("PICKLIST"===this.fieldType)this.fieldValue=this.options.find((function(e){return e.value===t}));else if("MULTIPICKLIST"===this.fieldType){var a=(t||"").split(";");this.fieldValue=this.options.filter((function(e){return a.includes(e.value)}))}else this.fieldValue=t}},computed:{required:function(){return"Required"===this.field.behavior},isReadonly:function(){return"view"===this.mode||"Readonly"===this.field.behavior},isDate:function(){return"DATE"===this.fieldType},isPickList:function(){return"PICKLIST"===this.fieldType},isMultiPickList:function(){return"MULTIPICKLIST"===this.fieldType},isCheckbox:function(){return"BOOLEAN"===this.fieldType},isTime:function(){return"TIME"===this.fieldType},isDateTime:function(){return"DATETIME"===this.fieldType},isAddress:function(){return"ADDRESS"===this.fieldType},options:function(){return this.isCheckbox?[{value:!0,label:"Oui"},{value:!1,label:"Non"}]:this.field.picklistValues}},watch:{fieldValue:function(e,t){this.initialized?this.$emit("valueChanged",{fieldName:this.field.name,fieldType:this.fieldType,value:this.fieldValue}):this.initialized=!0}}},f=c,p=a("2877"),m=Object(p["a"])(f,d,r,!1,null,null,null),h=m.exports,y={name:"RecordDetails",props:["serviceName","sobjectId","sobjectName","layoutName"],data:function(){return{updatedFields:new Set([]),metadata:null,layout:null,object:null,mode:"view"}},components:{"record-field":h},computed:{ready:function(){return null!=this.layout&&null!=this.metadata&&null!=this.record},availableSections:function(){return this.layout?this.layout.Metadata.layoutSections.filter((function(e){var t="Custom Links"!==e.label;return t=t&&"Contact Information"!==e.label,t})):null}},created:function(){var e=this,t=this.$FeathersVuex.api.SObject,a=this.$FeathersVuex.api.Layout,i=this.$FeathersVuex.api.LayoutInfo,l=this.sobjectName,n=this.layoutName,s=this.serviceName+"/get";this.$store.dispatch(s,this.sobjectId).then((function(t){e.record=t})),t.get(this.sobjectName).then((function(t){e.metadata=t,a.find({query:{$sobject:l,$layout:n},paginate:!1}).then((function(t){t&&1===t.length&&i.get(t[0].Id).then((function(t){if(t&&t.Metadata){var a=0,i=0;t.Metadata.layoutSections.forEach((function(e){e.secRank=a++,e.layoutColumns.forEach((function(e){e.colRank=i++}))})),e.layout=t}}))}))}))},methods:{isContactName:function(e,t){return"Contact"===e.name&&"Name"===t},saveRecord:function(){var e=this;this.$q.loading.show();var t=this.serviceName+"/update",a=Object.keys(this.record).filter((function(t){return e.updatedFields.has(t)})).reduce((function(t,a){return t[a]=e.record[a],t}),{});this.$store.dispatch(t,[this.record.Id,a]).then((function(t){e.$q.loading.hide(),e.$q.notify({color:"positive",textColor:"white",icon:"check_circle_outline",message:e.$i18n.t("notification.recordSaved")}),e.updatedFields=new Set([]),e.mode="view"})).catch((function(t){e.$q.loading.hide(),o["a"].config.errorHandler(t)}))},toggleEditMode:function(){this.updatedFields=new Set([]),this.mode="view"===this.mode?"edit":"view"},handleValueChanged:function(e){var t=e.value;"PICKLIST"===e.fieldType&&t&&(t=t.value),"MULTIPICKLIST"===e.fieldType&&t&&(t=t.map((function(e){return e.value})).join(";")),this.record[e.fieldName]=t,this.updatedFields.add(e.fieldName)}}},b=y,v=Object(p["a"])(b,n,s,!1,null,null,null),q=v.exports,C={name:"Profile",components:{"record-details":q},computed:{loggedUser:function(){return this.$store.state.auth&&this.$store.state.auth.user?this.$store.state.auth.user:null},passwordLabel:function(){return this.$t("buttons.password")}}},V=C,x=Object(p["a"])(V,i,l,!1,null,null,null);t["default"]=x.exports}}]);