(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[1],{"713b":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("q-layout",{attrs:{view:"lHh Lpr lFf"}},[n("q-header",{attrs:{elevated:""}},[n("q-toolbar",[n("q-btn",{attrs:{flat:"",dense:"",round:"",icon:"menu","aria-label":"Menu"},on:{click:function(t){e.leftDrawerOpen=!e.leftDrawerOpen}}}),n("q-toolbar-title",[e._v("\n        Schleier\n      ")]),n("div",[e._v("Quasar v"+e._s(e.$q.version))])],1)],1),n("q-drawer",{attrs:{"show-if-above":"",bordered:"","content-class":"bg-grey-1"},model:{value:e.leftDrawerOpen,callback:function(t){e.leftDrawerOpen=t},expression:"leftDrawerOpen"}},[n("q-list",[n("q-item-label",{staticClass:"text-grey-8",attrs:{header:""}},[e._v("\n        Links\n      ")]),e._l(e.essentialLinks,(function(t){return n("EssentialLink",e._b({key:t.title},"EssentialLink",t,!1))}))],2)],1),n("q-page-container",[n("router-view")],1)],1)},i=[],r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("q-item",{attrs:{clickable:"",tag:"a",target:"_blank",href:e.link}},[e.icon?n("q-item-section",{attrs:{avatar:""}},[n("q-icon",{attrs:{name:e.icon}})],1):e._e(),n("q-item-section",[n("q-item-label",[e._v(e._s(e.title))]),n("q-item-label",{attrs:{caption:""}},[e._v("\n      "+e._s(e.caption)+"\n    ")])],1)],1)},l=[],o={name:"EssentialLink",props:{title:{type:String,required:!0},caption:{type:String,default:""},link:{type:String,default:"#"},icon:{type:String,default:""}}},s=o,c=n("2877"),u=n("66e5"),p=n("4074"),b=n("0016"),f=n("0170"),k=n("eebe"),d=n.n(k),m=Object(c["a"])(s,r,l,!1,null,null,null),v=m.exports;d()(m,"components",{QItem:u["a"],QItemSection:p["a"],QIcon:b["a"],QItemLabel:f["a"]});const _=[{title:"Link 1",caption:"Link 1",icon:"public",link:"#"},{title:"Link 2",caption:"Link 2",icon:"record_voice_over",link:"#"}];var q={name:"MainLayout",components:{EssentialLink:v},data(){return{leftDrawerOpen:!1,essentialLinks:_}}},w=q,L=n("4d5a"),Q=n("e359"),g=n("65c6"),y=n("9c40"),h=n("6ac5"),O=n("9404"),D=n("1c1c"),E=n("09e3"),S=Object(c["a"])(w,a,i,!1,null,null,null);t["default"]=S.exports;d()(S,"components",{QLayout:L["a"],QHeader:Q["a"],QToolbar:g["a"],QBtn:y["a"],QToolbarTitle:h["a"],QDrawer:O["a"],QList:D["a"],QItemLabel:f["a"],QPageContainer:E["a"]})}}]);