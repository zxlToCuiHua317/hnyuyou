(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ac416f40"],{"0607":function(t,e,i){},"3cdc":function(t,e,i){"use strict";i("55dd");var a=i("5530"),o=(i("96cf"),i("1da1")),s=i("7e1e"),n=i("ed08");e["a"]={data:function(){return{data:[],sort:["id,desc"],page:0,size:10,total:0,url:"",params:{},query:{},time:50,isAdd:!1,downloadLoading:!1,loading:!0,delLoading:!1,delAllLoading:!1,dialog:!1,form:{},resetForm:{},title:""}},methods:{parseTime:n["d"],downloadFile:n["c"],init:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.beforeInit();case 2:if(t.sent){t.next=4;break}return t.abrupt("return");case 4:return t.abrupt("return",new Promise((function(t,i){e.loading=!0,Object(s["b"])(e.url,e.getQueryParame()).then((function(i){e.total=i.totalElements,e.data=i.content,setTimeout((function(){e.loading=!1}),e.time),t(i)})).catch((function(t){e.loading=!1,i(t)}))})));case 5:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),beforeInit:function(){return!0},getQueryParame:function(){return Object(a["a"])(Object(a["a"])({page:this.page,size:this.size,sort:this.sort},this.query),this.params)},pageChange:function(t){this.page=t-1,this.init()},sizeChange:function(t){this.page=0,this.size=t,this.init()},dleChangePage:function(t){void 0===t&&(t=1),this.data.length===t&&0!==this.page&&(this.page=this.page-1)},toQuery:function(){this.page=0,this.init()},submitSuccessNotify:function(){this.$notify({title:"提交成功",type:"success",duration:2500})},addSuccessNotify:function(){this.$notify({title:"新增成功",type:"success",duration:2500})},editSuccessNotify:function(){this.$notify({title:"编辑成功",type:"success",duration:2500})},delSuccessNotify:function(){this.$notify({title:"删除成功",type:"success",duration:2500})},notify:function(t,e){this.$notify({title:t,type:e,duration:2500})},beforeDelMethod:function(){return!0},delMethod:function(t){var e=this;this.beforeDelMethod()&&(this.delLoading=!0,this.crudMethod.del(t).then((function(){e.delLoading=!1,e.$refs[t].doClose(),e.dleChangePage(),e.delSuccessNotify(),e.afterDelMethod(),e.init()})).catch((function(){e.delLoading=!1,e.$refs[t].doClose()})))},afterDelMethod:function(){},beforeDelAllMethod:function(){var t=this;this.$confirm("你确定删除选中的数据吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t.delAllMethod()}))},delAllMethod:function(){var t=this;this.delAllLoading=!0;for(var e=this.$refs.table.selection,i=[],a=0;a<e.length;a++)i.push(e[a].id);this.crudMethod.delAll(i).then((function(){t.delAllLoading=!1,t.dleChangePage(i.length),t.init(),t.$notify({title:"删除成功",type:"success",duration:2500})})).catch((function(){t.delAllLoading=!1}))},beforeShowAddForm:function(){},showAddFormDialog:function(){this.isAdd=!0,this.resetForm=JSON.parse(JSON.stringify(this.form)),this.beforeShowAddForm(),this.dialog=!0},beforeShowEditForm:function(t){},showEditFormDialog:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";this.isAdd=!1,t&&(this.resetForm=JSON.parse(JSON.stringify(this.form)),this.form=JSON.parse(JSON.stringify(t))),this.beforeShowEditForm(t),this.dialog=!0},addMethod:function(){var t=this;this.crudMethod.add(this.form).then((function(){t.addSuccessNotify(),t.loading=!1,t.afterAddMethod(),t.cancel(),t.init()})).catch((function(){t.loading=!1,t.afterAddErrorMethod()}))},afterAddMethod:function(){},afterAddErrorMethod:function(){},editMethod:function(){var t=this;this.crudMethod.edit(this.form).then((function(){t.editSuccessNotify(),t.loading=!1,t.afterEditMethod(),t.cancel(),t.init()})).catch((function(){t.loading=!1}))},afterEditMethod:function(){},beforeSubmitMethod:function(){return!0},submitMethod:function(){var t=this;this.beforeSubmitMethod()&&this.$refs["form"]&&this.$refs["form"].validate((function(e){e&&(t.loading=!0,t.isAdd?t.addMethod():t.editMethod())}))},cancel:function(){this.dialog=!1,this.$refs["form"]&&(this.$refs["form"].clearValidate(),this.form=this.resetForm)},getFormTitle:function(){return this.isAdd?"新增".concat(this.title):"编辑".concat(this.title)},downloadMethod:function(){var t=this;this.beforeInit(),this.downloadLoading=!0,Object(s["a"])(this.url+"/download",this.params).then((function(e){t.downloadFile(e,t.title+"数据","xlsx"),t.downloadLoading=!1})).catch((function(){t.downloadLoading=!1}))}}}},7546:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticStyle:{display:"inline-block"}},[i("el-dialog",{attrs:{visible:t.dialog,"close-on-click-modal":!1,"before-close":t.cancel,title:t.title,"append-to-body":"",width:"500px"},on:{"update:visible":function(e){t.dialog=e},close:t.cancel}},[i("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules,size:"small","label-width":"88px"}},[i("el-form-item",{attrs:{label:"旧密码",prop:"oldPass"}},[i("el-input",{staticStyle:{width:"370px"},attrs:{type:"password","auto-complete":"on"},model:{value:t.form.oldPass,callback:function(e){t.$set(t.form,"oldPass",e)},expression:"form.oldPass"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"新密码",prop:"newPass"}},[i("el-input",{staticStyle:{width:"370px"},attrs:{type:"password","auto-complete":"on"},model:{value:t.form.newPass,callback:function(e){t.$set(t.form,"newPass",e)},expression:"form.newPass"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"确认密码",prop:"confirmPass"}},[i("el-input",{staticStyle:{width:"370px"},attrs:{type:"password","auto-complete":"on"},model:{value:t.form.confirmPass,callback:function(e){t.$set(t.form,"confirmPass",e)},expression:"form.confirmPass"}})],1)],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"text"},on:{click:t.cancel}},[t._v("取消")]),t._v(" "),i("el-button",{attrs:{loading:t.loading,type:"primary"},on:{click:t.doSubmit}},[t._v("确认")])],1)],1)],1)},o=[],s=i("4360"),n=i("c0c7"),r={data:function(){var t=this,e=function(e,i,a){i?t.form.newPass!==i?a(new Error("两次输入的密码不一致")):a():a(new Error("请再次输入密码"))};return{loading:!1,dialog:!1,title:"修改密码",form:{oldPass:"",newPass:"",confirmPass:""},rules:{oldPass:[{required:!0,message:"请输入旧密码",trigger:"blur"}],newPass:[{required:!0,message:"请输入新密码",trigger:"blur"},{min:6,max:20,message:"长度在 6 到 20 个字符",trigger:"blur"}],confirmPass:[{required:!0,validator:e,trigger:"blur"}]}}},methods:{cancel:function(){this.resetForm()},doSubmit:function(){var t=this;this.$refs["form"].validate((function(e){if(!e)return!1;t.loading=!0,Object(n["d"])(t.form).then((function(e){t.resetForm(),t.$notify({title:"密码修改成功，请重新登录",type:"success",duration:1500}),setTimeout((function(){s["a"].dispatch("LogOut").then((function(){location.reload()}))}),1500)})).catch((function(e){t.loading=!1}))}))},resetForm:function(){this.dialog=!1,this.$refs["form"].resetFields(),this.form={oldPass:"",newPass:"",confirmPass:""}}}},l=r,c=i("2877"),d=Object(c["a"])(l,a,o,!1,null,"49371103",null);e["default"]=d.exports},"7e1e":function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"a",(function(){return r}));var a=i("b775"),o=i("4328"),s=i.n(o);function n(t,e){return Object(a["a"])({url:t+"?"+s.a.stringify(e,{indices:!1}),method:"get"})}function r(t,e){return Object(a["a"])({url:t+"?"+s.a.stringify(e,{indices:!1}),method:"get",responseType:"blob"})}},"7e77":function(t,e,i){"use strict";i("0607")},"8de4":function(t,e,i){"use strict";i.d(e,"a",(function(){return n}));var a=i("24e5"),o=i.n(a),s="MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCVCywD/4aEFCpauEF9LQhuo+0ITH+hPA8vaYiUEAjXRRQisQG1IdbrKuBSab7AYq7/Cu8gFWVMEEoeWm3MJShNmm8RsvGb076tm/bK5xi+3eY5ozKLbG8oc60SXwBv10SXrVGlNZgb59tRXYwJFSObefiuuyjtZGPco6zSiu4H5QIDAQAB";function n(t){var e=new o.a;return e.setPublicKey(s),e.encrypt(t)}},ab82:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticStyle:{display:"inline-block"}},[i("el-dialog",{attrs:{visible:t.dialog,"close-on-click-modal":!1,"before-close":t.cancel,title:t.title,"append-to-body":"",width:"475px"},on:{"update:visible":function(e){t.dialog=e},close:t.cancel}},[i("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules,size:"small","label-width":"88px"}},[i("el-form-item",{attrs:{label:"新邮箱",prop:"email"}},[i("el-input",{staticStyle:{width:"200px"},attrs:{"auto-complete":"on"},model:{value:t.form.email,callback:function(e){t.$set(t.form,"email",e)},expression:"form.email"}}),t._v(" "),i("el-button",{attrs:{loading:t.codeLoading,disabled:t.isDisabled,size:"small"},on:{click:t.sendCode}},[t._v(t._s(t.buttonName))])],1),t._v(" "),i("el-form-item",{attrs:{label:"验证码",prop:"code"}},[i("el-input",{staticStyle:{width:"320px"},model:{value:t.form.code,callback:function(e){t.$set(t.form,"code",e)},expression:"form.code"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"当前密码",prop:"pass"}},[i("el-input",{staticStyle:{width:"320px"},attrs:{type:"password"},model:{value:t.form.pass,callback:function(e){t.$set(t.form,"pass",e)},expression:"form.pass"}})],1)],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"text"},on:{click:t.cancel}},[t._v("取消")]),t._v(" "),i("el-button",{attrs:{loading:t.loading,type:"primary"},on:{click:t.doSubmit}},[t._v("确认")])],1)],1)],1)},o=[],s=i("4360"),n=i("61f7"),r=i("c0c7"),l=i("b775");function c(t){return Object(l["a"])({url:"api/code/resetEmail?email="+t,method:"post"})}var d={props:{email:{type:String,required:!0}},data:function(){var t=this,e=function(e,i,a){""===i||null===i?a(new Error("新邮箱不能为空")):i===t.email?a(new Error("新邮箱不能与旧邮箱相同")):Object(n["c"])(i)?a():a(new Error("邮箱格式错误"))};return{loading:!1,dialog:!1,title:"修改邮箱",form:{pass:"",email:"",code:""},user:{email:"",password:""},codeLoading:!1,buttonName:"获取验证码",isDisabled:!1,time:60,rules:{pass:[{required:!0,message:"当前密码不能为空",trigger:"blur"}],email:[{required:!0,validator:e,trigger:"blur"}],code:[{required:!0,message:"验证码不能为空",trigger:"blur"}]}}},methods:{cancel:function(){this.resetForm()},sendCode:function(){var t=this;if(this.form.email&&this.form.email!==this.email){this.codeLoading=!0,this.buttonName="验证码发送中";var e=this;c(this.form.email).then((function(i){t.$message({showClose:!0,message:"发送成功，验证码有效期5分钟",type:"success"}),t.codeLoading=!1,t.isDisabled=!0,t.buttonName=t.time--+"秒后重新发送",t.timer=window.setInterval((function(){e.buttonName=e.time+"秒后重新发送",--e.time,e.time<0&&(e.buttonName="重新发送",e.time=60,e.isDisabled=!1,window.clearInterval(e.timer))}),1e3)})).catch((function(e){t.resetForm(),t.codeLoading=!1}))}},doSubmit:function(){var t=this;this.$refs["form"].validate((function(e){if(!e)return!1;t.loading=!0,Object(r["c"])(t.form).then((function(e){t.loading=!1,t.resetForm(),t.$notify({title:"邮箱修改成功",type:"success",duration:1500}),s["a"].dispatch("GetInfo").then((function(){}))})).catch((function(e){t.loading=!1}))}))},resetForm:function(){this.dialog=!1,this.$refs["form"].resetFields(),window.clearInterval(this.timer),this.time=60,this.buttonName="获取验证码",this.isDisabled=!1,this.form={pass:"",email:"",code:""}}}},u=d,f=i("2877"),m=Object(f["a"])(u,a,o,!1,null,"2cbf6c44",null);e["default"]=m.exports},c0c7:function(t,e,i){"use strict";i.d(e,"b",(function(){return l})),i.d(e,"d",(function(){return c})),i.d(e,"c",(function(){return d}));var a=i("b775"),o=i("8de4");function s(t){return Object(a["a"])({url:"api/users",method:"post",data:t})}function n(t){return Object(a["a"])({url:"api/users",method:"delete",data:t})}function r(t){return Object(a["a"])({url:"api/users",method:"put",data:t})}function l(t){return Object(a["a"])({url:"api/users/center",method:"put",data:t})}function c(t){var e={oldPass:Object(o["a"])(t.oldPass),newPass:Object(o["a"])(t.newPass)};return Object(a["a"])({url:"api/users/updatePass/",method:"post",data:e})}function d(t){var e={password:Object(o["a"])(t.pass),email:t.email};return Object(a["a"])({url:"api/users/updateEmail/"+t.code,method:"post",data:e})}e["a"]={add:s,edit:r,del:n}},f7da:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"app-container"},[i("el-row",{attrs:{gutter:20}},[i("el-col",{staticStyle:{"margin-bottom":"10px"},attrs:{xs:24,sm:24,md:8,lg:6,xl:5}},[i("el-card",{staticClass:"box-card"},[i("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[i("span",[t._v("个人信息")])]),t._v(" "),i("div",[i("div",{staticStyle:{"text-align":"center"}},[i("div",{staticClass:"el-upload"},[i("img",{staticClass:"avatar",attrs:{src:t.user.avatarName?t.baseApi+"/avatar/"+t.user.avatarName:t.Avatar,title:"点击上传头像"},on:{click:t.toggleShow}}),t._v(" "),i("myUpload",{attrs:{headers:t.headers,url:t.updateAvatarApi},on:{"crop-upload-success":t.cropUploadSuccess},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}})],1)]),t._v(" "),i("ul",{staticClass:"user-info"},[i("li",[i("div",{staticStyle:{height:"100%"}},[i("svg-icon",{attrs:{"icon-class":"login"}}),t._v(" 登录账号"),i("div",{staticClass:"user-right"},[t._v(t._s(t.user.username))])],1)]),t._v(" "),i("li",[i("svg-icon",{attrs:{"icon-class":"user1"}}),t._v(" 用户昵称 "),i("div",{staticClass:"user-right"},[t._v(t._s(t.user.nickName))])],1),t._v(" "),i("li",[i("svg-icon",{attrs:{"icon-class":"dept"}}),t._v(" 所属部门 "),i("div",{staticClass:"user-right"},[t._v(" "+t._s(t.user.dept.name))])],1),t._v(" "),i("li",[i("svg-icon",{attrs:{"icon-class":"phone"}}),t._v(" 手机号码 "),i("div",{staticClass:"user-right"},[t._v(t._s(t.user.phone))])],1),t._v(" "),i("li",[i("svg-icon",{attrs:{"icon-class":"email"}}),t._v(" 用户邮箱 "),i("div",{staticClass:"user-right"},[t._v(t._s(t.user.email))])],1),t._v(" "),i("li",[i("svg-icon",{attrs:{"icon-class":"anq"}}),t._v(" 安全设置\n              "),i("div",{staticClass:"user-right"},[i("a",{on:{click:function(e){t.$refs.pass.dialog=!0}}},[t._v("修改密码")]),t._v(" "),i("a",{on:{click:function(e){t.$refs.email.dialog=!0}}},[t._v("修改邮箱")])])],1)])])])],1),t._v(" "),i("el-col",{attrs:{xs:24,sm:24,md:16,lg:18,xl:19}},[i("el-card",{staticClass:"box-card"},[i("el-tabs",{on:{"tab-click":t.handleClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[i("el-tab-pane",{attrs:{label:"用户资料",name:"first"}},[i("el-form",{ref:"form",staticStyle:{"margin-top":"10px"},attrs:{model:t.form,rules:t.rules,size:"small","label-width":"65px"}},[i("el-form-item",{attrs:{label:"昵称",prop:"nickName"}},[i("el-input",{staticStyle:{width:"35%"},model:{value:t.form.nickName,callback:function(e){t.$set(t.form,"nickName",e)},expression:"form.nickName"}}),t._v(" "),i("span",{staticStyle:{color:"#C0C0C0","margin-left":"10px"}},[t._v("用户昵称不作为登录使用")])],1),t._v(" "),i("el-form-item",{attrs:{label:"手机号",prop:"phone"}},[i("el-input",{staticStyle:{width:"35%"},model:{value:t.form.phone,callback:function(e){t.$set(t.form,"phone",e)},expression:"form.phone"}}),t._v(" "),i("span",{staticStyle:{color:"#C0C0C0","margin-left":"10px"}},[t._v("手机号码不能重复")])],1),t._v(" "),i("el-form-item",{attrs:{label:"性别"}},[i("el-radio-group",{staticStyle:{width:"178px"},model:{value:t.form.gender,callback:function(e){t.$set(t.form,"gender",e)},expression:"form.gender"}},[i("el-radio",{attrs:{label:"男"}},[t._v("男")]),t._v(" "),i("el-radio",{attrs:{label:"女"}},[t._v("女")])],1)],1),t._v(" "),i("el-form-item",{attrs:{label:""}},[i("el-button",{attrs:{loading:t.saveLoading,size:"mini",type:"primary"},on:{click:t.doSubmit}},[t._v("保存配置")])],1)],1)],1),t._v(" "),i("el-tab-pane",{attrs:{label:"操作日志",name:"second"}},[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:t.data}},[i("el-table-column",{attrs:{prop:"description",label:"行为"}}),t._v(" "),i("el-table-column",{attrs:{prop:"requestIp",label:"IP"}}),t._v(" "),i("el-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"address",label:"IP来源"}}),t._v(" "),i("el-table-column",{attrs:{prop:"browser",label:"浏览器"}}),t._v(" "),i("el-table-column",{attrs:{prop:"time",label:"请求耗时",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.time<=300?i("el-tag",[t._v(t._s(e.row.time)+"ms")]):e.row.time<=1e3?i("el-tag",{attrs:{type:"warning"}},[t._v(t._s(e.row.time)+"ms")]):i("el-tag",{attrs:{type:"danger"}},[t._v(t._s(e.row.time)+"ms")])]}}])}),t._v(" "),i("el-table-column",{attrs:{align:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.createTime))])]}}])},[i("template",{slot:"header"},[i("div",{staticStyle:{display:"inline-block",float:"right",cursor:"pointer"},on:{click:t.init}},[t._v("创建日期"),i("i",{staticClass:"el-icon-refresh",staticStyle:{"margin-left":"40px"}})])])],2)],1),t._v(" "),i("el-pagination",{staticStyle:{"margin-top":"8px"},attrs:{total:t.total,"current-page":t.page+1,layout:"total, prev, pager, next, sizes"},on:{"size-change":t.sizeChange,"current-change":t.pageChange}})],1)],1)],1)],1)],1),t._v(" "),i("updateEmail",{ref:"email",attrs:{email:t.user.email}}),t._v(" "),i("updatePass",{ref:"pass"})],1)},o=[],s=(i("7f7f"),i("5530")),n=i("0b4d"),r=i("2f62"),l=i("7546"),c=i("ab82"),d=i("5f87"),u=i("4360"),f=i("61f7"),m=i("3cdc"),h=i("c0c7"),p=i("4d41"),g=i.n(p),v={name:"Center",components:{updatePass:l["default"],updateEmail:c["default"],myUpload:n["a"]},mixins:[m["a"]],data:function(){var t=function(t,e,i){e?Object(f["b"])(e)?i():i(new Error("请输入正确的11位手机号码")):i(new Error("请输入电话号码"))};return{show:!1,Avatar:g.a,activeName:"first",saveLoading:!1,headers:{Authorization:Object(d["a"])()},form:{},rules:{nickName:[{required:!0,message:"请输入用户昵称",trigger:"blur"},{min:2,max:20,message:"长度在 2 到 20 个字符",trigger:"blur"}],phone:[{required:!0,trigger:"blur",validator:t}]}}},computed:Object(s["a"])({},Object(r["b"])(["user","updateAvatarApi","baseApi"])),created:function(){this.form={id:this.user.id,nickName:this.user.nickName,gender:this.user.gender,phone:this.user.phone},u["a"].dispatch("GetInfo").then((function(){}))},methods:{toggleShow:function(){this.show=!this.show},handleClick:function(t,e){"second"===t.name&&this.init()},beforeInit:function(){return this.url="api/logs/user",!0},cropUploadSuccess:function(t,e){u["a"].dispatch("GetInfo").then((function(){}))},doSubmit:function(){var t=this;this.$refs["form"]&&this.$refs["form"].validate((function(e){e&&(t.saveLoading=!0,Object(h["b"])(t.form).then((function(){t.editSuccessNotify(),u["a"].dispatch("GetInfo").then((function(){})),t.saveLoading=!1})).catch((function(){t.saveLoading=!1})))}))}}},b=v,w=(i("7e77"),i("2877")),y=Object(w["a"])(b,a,o,!1,null,null,null);e["default"]=y.exports}}]);