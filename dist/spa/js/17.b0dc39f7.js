(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[17],{7930:function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",[a("q-card",{attrs:{flat:""}},[a("div",{staticClass:"content-wrapper"},[a("div",{staticClass:"main-content"},[a("q-card-section",[a("q-input",{attrs:{id:"fromDate",label:this.$t("labels.leave_from_date"),error:this.$v.fromDate.$error,rules:["date"],mask:"date",required:""},scopedSlots:t._u([{key:"append",fn:function(){return[a("q-icon",{staticClass:"cursor-pointer",attrs:{name:"event"}},[a("q-popup-proxy",{ref:"fromDateProxy",attrs:{"transition-show":"scale","transition-hide":"scale"}},[a("q-date",{on:{input:t.hideFromDate},model:{value:t.fromDate,callback:function(e){t.fromDate=e},expression:"fromDate"}})],1)],1)]},proxy:!0}]),model:{value:t.fromDate,callback:function(e){t.fromDate=e},expression:"fromDate"}}),a("q-input",{attrs:{id:"toDate",label:this.$t("labels.leave_to_date"),error:this.$v.toDate.$error,rules:["date"],mask:"date",required:""},scopedSlots:t._u([{key:"append",fn:function(){return[a("q-icon",{staticClass:"cursor-pointer",attrs:{name:"event"}},[a("q-popup-proxy",{ref:"toDateProxy",attrs:{"transition-show":"scale","transition-hide":"scale"}},[a("q-date",{on:{input:t.hideToDate},model:{value:t.toDate,callback:function(e){t.toDate=e},expression:"toDate"}})],1)],1)]},proxy:!0}]),model:{value:t.toDate,callback:function(e){t.toDate=e},expression:"toDate"}})],1)],1),a("div",{staticClass:"toolbar q-pa-xs"},[a("q-btn",{staticClass:"full-width",attrs:{color:"primary"},on:{click:t.submitLeave}},[t._v("\n          "+t._s(t.$t("buttons.submit"))+"\n        ")])],1)])])],1)},r=[],i=a("2b0e"),s=a("bd4c"),n=a("b5ae"),c={name:"Leave",data:function(){return{fromDate:"",toDate:""}},methods:{submitLeave:function(){var t=this;if(this.$v.fromDate.$touch(),this.$v.toDate.$touch(),!this.$v.fromDate.$error&&!this.$v.toDate.$error){this.$q.loading.show();var e=this.$store.state.auth.user,a=this.$FeathersVuex.api.Contact,o=new a({Id:e.ContactId,xLeave_From__c:s["b"].extractDate(this.fromDate,"YYYY/MM/DD"),xLeave_To__c:s["b"].extractDate(this.toDate,"YYYY/MM/DD")});o.save().then((function(e){t.$q.loading.hide(),t.$q.notify({color:"positive",textColor:"white",icon:"check_circle_outline",message:t.$i18n.t("notification.leaveSaved")}),t.$router.push("/home")})).catch((function(e){t.$q.loading.hide(),i["a"].config.errorHandler(e)}))}},hideFromDate:function(){this.$refs.fromDateProxy.hide()},hideToDate:function(){this.$refs.toDateProxy.hide()}},validations:{fromDate:{required:n["required"]},toDate:{required:n["required"]}}},l=c,u=a("2877"),d=Object(u["a"])(l,o,r,!1,null,null,null);e["default"]=d.exports}}]);