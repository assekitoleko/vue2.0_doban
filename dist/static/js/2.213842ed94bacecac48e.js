webpackJsonp([2],{211:function(n,t,o){o(226);var i=o(0)(o(218),o(236),"data-v-4d1fd5f1",null);n.exports=i.exports},218:function(n,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"login",data:function(){return{user:{username:"",password:""}}},methods:{submit:function(){var n=this;this.$store.dispatch({type:"login",username:this.user.username,password:this.user.password}).then(function(t){var o=decodeURIComponent(n.$route.query.redirect||"/user/"+t.data[0].id);n.$router.push(o)})}}}},222:function(n,t,o){t=n.exports=o(207)(!0),t.push([n.i,"#login[data-v-4d1fd5f1]{min-height:400px}#login h1[data-v-4d1fd5f1]{font-size:25px;padding:0 0 30px;margin-top:20px;color:#494949}#login p[data-v-4d1fd5f1]{line-height:45px}#login input[data-v-4d1fd5f1]{width:200px;padding:5px;border-radius:3px;border:1px solid #c9c9c9;margin-left:10px}#login .submit[data-v-4d1fd5f1]{color:#fff;background:#3fa156;border:1px solid #528641;padding:6px 26px;width:auto;cursor:pointer;transition:background .5s ease;font-size:14px}#login .submit[data-v-4d1fd5f1]:hover{background:#4fc16c;border-color:#6aad54}#login .sideInfo[data-v-4d1fd5f1]{font-size:12px;color:#666;cursor:pointer}#login .sideInfo input[data-v-4d1fd5f1]{width:auto;vertical-align:middle;margin-right:5px}#login .sideInfo span[data-v-4d1fd5f1]{color:#669;margin-left:3px}#login .sideInfo label[data-v-4d1fd5f1]{margin-right:3px;cursor:pointer}#login .login_right[data-v-4d1fd5f1]{float:right;width:310px;font-size:12px;color:#666}#login .login_right a[data-v-4d1fd5f1]{color:#669;cursor:pointer}#login .login_right p[data-v-4d1fd5f1]{margin:0 0 10px;line-height:20px}#login form[data-v-4d1fd5f1]{float:left}","",{version:3,sources:["G:/项目/vuetest/vuedouban/src/pages/Login.vue"],names:[],mappings:"AACA,wBACE,gBAAkB,CACnB,AACD,2BACI,eAAgB,AAChB,iBAAkB,AAClB,gBAAiB,AACjB,aAAe,CAClB,AACD,0BACI,gBAAkB,CACrB,AACD,8BACI,YAAa,AACb,YAAa,AACb,kBAAmB,AACnB,yBAA0B,AAC1B,gBAAkB,CACrB,AACD,gCACI,WAAY,AACZ,mBAAoB,AACpB,yBAA0B,AAC1B,iBAAkB,AAClB,WAAY,AACZ,eAAgB,AAChB,+BAAiC,AACjC,cAAgB,CACnB,AACD,sCACI,mBAAoB,AACpB,oBAAsB,CACzB,AACD,kCACI,eAAgB,AAChB,WAAY,AACZ,cAAgB,CACnB,AACD,wCACM,WAAY,AACZ,sBAAuB,AACvB,gBAAkB,CACvB,AACD,uCACM,WAAY,AACZ,eAAiB,CACtB,AACD,wCACM,iBAAkB,AAClB,cAAgB,CACrB,AACD,qCACI,YAAa,AACb,YAAa,AACb,eAAgB,AAChB,UAAY,CACf,AACD,uCACM,WAAY,AACZ,cAAgB,CACrB,AACD,uCACM,gBAAiB,AACjB,gBAAkB,CACvB,AACD,6BACI,UAAY,CACf",file:"Login.vue",sourcesContent:["\n#login[data-v-4d1fd5f1] {\n  min-height: 400px;\n}\n#login h1[data-v-4d1fd5f1] {\n    font-size: 25px;\n    padding: 0 0 30px;\n    margin-top: 20px;\n    color: #494949;\n}\n#login p[data-v-4d1fd5f1] {\n    line-height: 45px;\n}\n#login input[data-v-4d1fd5f1] {\n    width: 200px;\n    padding: 5px;\n    border-radius: 3px;\n    border: 1px solid #c9c9c9;\n    margin-left: 10px;\n}\n#login .submit[data-v-4d1fd5f1] {\n    color: #fff;\n    background: #3fa156;\n    border: 1px solid #528641;\n    padding: 6px 26px;\n    width: auto;\n    cursor: pointer;\n    transition: background 0.5s ease;\n    font-size: 14px;\n}\n#login .submit[data-v-4d1fd5f1]:hover {\n    background: #4fc16c;\n    border-color: #6aad54;\n}\n#login .sideInfo[data-v-4d1fd5f1] {\n    font-size: 12px;\n    color: #666;\n    cursor: pointer;\n}\n#login .sideInfo input[data-v-4d1fd5f1] {\n      width: auto;\n      vertical-align: middle;\n      margin-right: 5px;\n}\n#login .sideInfo span[data-v-4d1fd5f1] {\n      color: #669;\n      margin-left: 3px;\n}\n#login .sideInfo label[data-v-4d1fd5f1] {\n      margin-right: 3px;\n      cursor: pointer;\n}\n#login .login_right[data-v-4d1fd5f1] {\n    float: right;\n    width: 310px;\n    font-size: 12px;\n    color: #666;\n}\n#login .login_right a[data-v-4d1fd5f1] {\n      color: #669;\n      cursor: pointer;\n}\n#login .login_right p[data-v-4d1fd5f1] {\n      margin: 0 0 10px;\n      line-height: 20px;\n}\n#login form[data-v-4d1fd5f1] {\n    float: left;\n}\n"],sourceRoot:""}])},226:function(n,t,o){var i=o(222);"string"==typeof i&&(i=[[n.i,i,""]]),i.locals&&(n.exports=i.locals);o(208)("55835aa5",i,!0)},236:function(n,t){n.exports={render:function(){var n=this,t=n.$createElement,o=n._self._c||t;return o("div",{staticClass:"main",attrs:{id:"login"}},[o("h1",[n._v("登陆豆瓣")]),n._v(" "),o("form",{on:{submit:function(t){return t.preventDefault(),n.submit(t)}}},[o("p",[o("label",{attrs:{for:"username"}},[n._v("账号")]),o("input",{directives:[{name:"model",rawName:"v-model",value:n.user.username,expression:"user.username"}],attrs:{type:"text",id:"username",name:"username"},domProps:{value:n.user.username},on:{input:function(t){t.target.composing||n.$set(n.user,"username",t.target.value)}}})]),n._v(" "),o("p",[o("label",{attrs:{for:"password"}},[n._v("密码")]),o("input",{directives:[{name:"model",rawName:"v-model",value:n.user.password,expression:"user.password"}],attrs:{type:"password",id:"password",name:"password"},domProps:{value:n.user.password},on:{input:function(t){t.target.composing||n.$set(n.user,"password",t.target.value)}}})]),n._v(" "),n._m(0),n._v(" "),o("input",{staticClass:"submit",attrs:{type:"submit",name:"submit",value:"登陆"}})]),n._v(" "),o("div",{staticClass:"login_right"},[o("p",[n._v(">还没有豆瓣账号？"),o("router-link",{attrs:{to:"/register"}},[n._v("立即注册")])],1),n._v(" "),n._m(1)])])},staticRenderFns:[function(){var n=this,t=n.$createElement,o=n._self._c||t;return o("p",{staticClass:"sideInfo"},[o("input",{attrs:{type:"checkbox",name:"autologin",id:"autologin"}}),o("label",{attrs:{for:"autologin"}},[n._v("下次自动登录")]),n._v(" |\n    "),o("span",[n._v("忘记密码")])])},function(){var n=this,t=n.$createElement,o=n._self._c||t;return o("p",[o("a",{attrs:{href:"https://www.douban.com/mobile/"}},[n._v(">点击下载豆瓣移动应用")])])}]}}});
//# sourceMappingURL=2.213842ed94bacecac48e.js.map