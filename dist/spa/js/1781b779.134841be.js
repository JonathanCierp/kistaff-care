(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["1781b779"],{"37d1":function(t,e,s){"use strict";s.r(e);var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("q-page",[s("q-card",{attrs:{flat:""}},[s("q-tab-panels",{attrs:{animated:""},model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},[s("q-tab-panel",{attrs:{name:"newjobs"}},[s("q-list",t._l(t.newRequests,(function(t){return s("request-item",{key:t.Id,staticClass:"list-item",attrs:{request:t}})})),1)],1),s("q-tab-panel",{attrs:{name:"assignments"}},[s("q-list",t._l(t.assignedRequests,(function(t){return s("request-item",{key:t.Id,staticClass:"request-item",attrs:{request:t}})})),1)],1)],1),s("q-tabs",{staticClass:"bg-primary text-white fixed-bottom full-width",attrs:{dense:"",align:"justify","narrow-indicator":""},model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},[s("q-tab",{attrs:{name:"newjobs",label:this.$t("workspace.newjobs")+" ("+t.newRequests.length+")"}}),s("q-tab",{attrs:{name:"assignments",label:this.$t("workspace.assignments")+" ("+t.assignedRequests.length+")"}})],1)],1)],1)},a=[],r=s("9e62f"),i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("q-item",{attrs:{to:t.link,exact:""}},[s("q-item-section",{attrs:{avatar:""}},[s("q-avatar",{attrs:{size:"56px","font-size":"32px","text-color":"white",color:t.request.iconColor,icon:t.request.icon}})],1),s("q-item-section",[s("q-item-label",[t._v("\n      "+t._s(t.request.label)+"\n    ")]),s("q-item-label",{attrs:{caption:""}},[t._v("\n      "+t._s(t.request.message)+"\n    ")])],1)],1)},u=[],l={name:"RequestItem",props:["request"],computed:{link:function(){return"/requests/"+this.request.Id}}},c=l,o=(s("e3e1"),s("2877")),q=Object(o["a"])(c,i,u,!1,null,null,null),b=q.exports,m={name:"Requests",components:{"request-item":b},mixins:[Object(r["b"])({service:"requests"})],computed:{requestsParams:function(){return{query:{xStatus__c:{$in:["Requested","Selected"]},xIs_Available__c:!0},paginate:!1}},newRequests:function(){return this.requests.filter((function(t){return"Requested"===t.xStatus__c}))},assignedRequests:function(){return this.requests.filter((function(t){return"Requested"!==t.xStatus__c}))}},data:function(){return{tab:"newjobs"}}},f=m,d=Object(o["a"])(f,n,a,!1,null,null,null);e["default"]=d.exports},"6a95":function(t,e,s){},e3e1:function(t,e,s){"use strict";var n=s("6a95"),a=s.n(n);a.a}}]);