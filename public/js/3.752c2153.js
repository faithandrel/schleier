(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[3],{"5b34":function(e,t,a){"use strict";a("e6cf");var s=a("bc3a"),r=a.n(s),n=a("5fb0");class l{static async getAllUsers(){const e=await r()({method:"GET",url:n["a"]+"/users"});return e.data}static async saveNewUser(e,t){const a=await r()({method:"POST",url:n["a"]+"/users/add",data:{name:e,email:t}});return a.data}static async getInvite(e){const t=await r()({method:"POST",url:n["a"]+"/invite",data:{token:e}});return t.data}static async saveProfile(e){const t=await r()({method:"POST",url:n["a"]+"/profile",data:{invite:e.invite,email:e.email,name:e.name,password:e.password}});return t.data}static async saveAvatar(e,t){const a=new FormData;a.append("file",e),a.append("email",t);const s=await r()({method:"POST",headers:{"Content-Type":"multipart/form-data"},url:n["a"]+"/avatar",data:a});return s.data}static async disableUsers(e){const t=await r()({method:"POST",url:n["a"]+"/users/disable",data:{users:e}});return t.data}}t["a"]=l},"5fb0":function(e,t,a){"use strict";a.d(t,"b",(function(){return s})),a.d(t,"a",(function(){return r}));const s="http://localhost:8000",r="http://localhost:8000/api"},"8b24":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-page",{staticClass:"flex flex-center"},[a("AdminTable")],1)},r=[],n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"q-pa-md"},[a("div",{staticClass:"q-pa-sm"},[a("q-btn",{attrs:{label:"Add User",color:"primary"},on:{click:function(t){e.prompt=!0}}}),e.selected.length>0?a("q-btn",{attrs:{label:"Disable",color:"red"},on:{click:function(t){return e.disableUsers()}}}):e._e()],1),a("q-dialog",{attrs:{persistent:""},model:{value:e.prompt,callback:function(t){e.prompt=t},expression:"prompt"}},[a("q-card",{staticStyle:{"min-width":"350px"}},[e.formErrors.length>0?a("q-card-section",e._l(e.formErrors,(function(t,s){return a("p",{key:s,staticClass:"text-red"},[e._v("\n\t\t\t\t\t\t"+e._s(t)+"\n\t\t\t\t\t")])})),0):e._e(),a("q-card-section",[a("div",{staticClass:"text-h6"},[e._v("Name")])]),a("q-card-section",{staticClass:"q-pt-none"},[a("q-input",{attrs:{dense:"",autofocus:""},model:{value:e.newUser,callback:function(t){e.newUser=t},expression:"newUser"}})],1),a("q-card-section",[a("div",{staticClass:"text-h6"},[e._v("Email")])]),a("q-card-section",{staticClass:"q-pt-none"},[a("q-input",{attrs:{dense:""},model:{value:e.newEmail,callback:function(t){e.newEmail=t},expression:"newEmail"}})],1),a("q-card-actions",{staticClass:"text-primary",attrs:{align:"right"}},[a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"Cancel"}}),a("q-btn",{attrs:{flat:"",label:"Save"},on:{click:function(t){return e.saveNewUser()}}})],1)],1)],1),a("q-table",{attrs:{title:"Users",data:e.rows,columns:e.columns,"row-key":"email",selection:"multiple",selected:e.selected},on:{"update:selected":function(t){e.selected=t}},scopedSlots:e._u([{key:"body",fn:function(t){return[a("q-tr",{attrs:{props:t},on:{click:function(e){t.selected=!0}}},[a("q-td",[a("q-checkbox",{attrs:{color:"primary"},model:{value:t.selected,callback:function(a){e.$set(t,"selected",a)},expression:"props.selected"}})],1),e._l(t.cols,(function(s){return a("q-td",{key:s.name,attrs:{props:t}},["avatar"!=s.name?a("span",[e._v(e._s(s.value))]):a("span",[a("img",{attrs:{src:s.value}})])])}))],2)]}}])})],1)},l=[],i=(a("baa5"),a("e6cf"),a("bd4c")),o=a("5b34"),c=a("5fb0"),d={data(){return{prompt:!1,newEmail:"",newUser:"",selected:[],formErrors:[],columns:[{name:"avatar",label:"Avatar",align:"left",field:"avatar",format:(e,t)=>{if(!e)return"";const a=e.substr(e.lastIndexOf(".")+1);return c["b"]+"/avatars/"+t.id+"/thumbnail."+a},sortable:!0},{name:"name",label:"Name",align:"left",field:"name",sortable:!0},{name:"email",label:"Email",align:"left",field:"email",sortable:!0},{name:"created_at",label:"Created At",align:"left",field:"created_at",format:(e,t)=>e?i["a"].formatDate(e,"YYYY-MM-DD"):"",sortable:!0},{name:"status",label:"Status",align:"left",field:"status",format:(e,t)=>{let a="";switch(e){case 0:a="pending";break;case 1:a="accepted";break;case 2:a="disabled";break;default:a="pending"}return a},sortable:!0},{name:"signed_up_at",label:"Sign Up Date",align:"left",field:"signed_up_at",format:(e,t)=>e?i["a"].formatDate(e,"YYYY-MM-DD"):"",sortable:!0}],rows:[]}},async mounted(){this.updateUsers()},methods:{async updateUsers(){const e=await o["a"].getAllUsers();this.rows=e},async saveNewUser(){this.formErrors=[];try{await o["a"].saveNewUser(this.newUser,this.newEmail),this.updateUsers(),this.newUser="",this.newEmail="",this.prompt=!1}catch(e){if(422===e.response.status&&e.response.data.errors)for(const t in e.response.data.errors){const a=e.response.data.errors[t];for(const e in a)this.formErrors.push(a[e])}}},async disableUsers(){const e=this.selected.map((e=>e.id));await o["a"].disableUsers(e),this.updateUsers()}}},u=d,p=a("2877"),m=a("9c40"),f=a("24e8"),b=a("f09f"),w=a("a370"),v=a("27f9"),h=a("4b7e"),g=a("eaac"),q=a("bd08"),U=a("db86"),y=a("8f8e"),_=a("7f67"),k=a("eebe"),x=a.n(k),C=Object(p["a"])(u,n,l,!1,null,null,null),E=C.exports;x()(C,"components",{QBtn:m["a"],QDialog:f["a"],QCard:b["a"],QCardSection:w["a"],QInput:v["a"],QCardActions:h["a"],QTable:g["a"],QTr:q["a"],QTd:U["a"],QCheckbox:y["a"]}),x()(C,"directives",{ClosePopup:_["a"]});var T={name:"PageIndex",components:{AdminTable:E}},Q=T,S=a("9989"),D=Object(p["a"])(Q,s,r,!1,null,null,null);t["default"]=D.exports;x()(D,"components",{QPage:S["a"]})}}]);