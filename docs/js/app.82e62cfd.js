(function(){var e={1284:function(e,t,s){"use strict";var a=s(144),n=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"app"}},[t("div",{staticClass:"main-wrapper"},[t("router-view")],1)])},r=[],o={data:()=>({drawer:null,links:[["mdi-inbox-arrow-down","Home","/"],["mdi-send","Learning","/learning"],["mdi-delete","Review","/about"],["mdi-delete","Calender","/calender"],["mdi-alert-octagon","Sign Out","/about"]]})},i=o,l=s(1001),c=(0,l.Z)(i,n,r,!1,null,null,null),u=c.exports,d=s(2250);a.ZP.use(d.Z);var m=new d.Z({}),g=s(8345),h=s(1096),f=s(1828),p=s(3058),_=s(5223),v=s(6938),b=s(6904),j=s(3551),y=s(5253),k=s(5234),w=function(){var e=this,t=e._self._c;return t(h.Z,{staticClass:"home"},[t("SideBar"),t(j.Z,[t(p.Z,{staticClass:"form-card",attrs:{elevation:"5",outlined:"",color:"rgb(255, 255, 255, 0.5)"}},[t(_.EB,[t(k.Z),e._v(" 学習を開始する "),t(k.Z)],1),t(b.Z,[t(_.Qq,[e._v(" プロジェクト・課題 ")]),t(v.Z,{staticClass:"form-box",attrs:{id:"task_name",items:e.items,label:"Input Task","hide-details":"",filled:"",outlined:"",solo:""}}),t(_.Qq,[e._v(" 活動内容 ")]),t(y.Z,{staticClass:"form-box",attrs:{"hide-details":"",items:e.activities,label:"Choose Activity",outlined:""},model:{value:e.selectedActivity,callback:function(t){e.selectedActivity=t},expression:"selectedActivity"}}),t(_.Qq,[e._v(" 活動場所 ")]),t(y.Z,{staticClass:"form-box",attrs:{"hide-details":"",items:e.places,label:"Choose Place",outlined:""},model:{value:e.selectedSpace,callback:function(t){e.selectedSpace=t},expression:"selectedSpace"}}),t("br"),t(f.Z,{staticClass:"me-4 submit_btn",attrs:{disabled:e.invalid},on:{click:e.StartLearning}},[e._v(" 学習を開始する ")]),t("div",{staticClass:"after count-time- text",attrs:{id:"writehere"}})],1),t("br")],1)],1)],1)},Z=[],C=(s(7658),s(4192)),S=s(5057),x=s(248),D=s(1908),E=s(2810),T=s(8228),A=s(7537),N=s(9868),O=function(){var e=this,t=e._self._c;return t(A.Z,{attrs:{app:""},model:{value:e.drawer,callback:function(t){e.drawer=t},expression:"drawer"}},[t(N.Z,{staticClass:"pa-4",attrs:{color:"grey lighten-4"}},[t("a",{attrs:{href:"/"}},[t("img",{staticClass:"enhanced_logo",attrs:{alt:"App logo",src:s(5152)}})]),t("div",{staticClass:"username"},[e._v("現在 "+e._s(this.learning_now_count)+" 人学習中")])]),t(C.Z),t(x.Z,[e._l(e.links,(function([s,a,n]){return t(D.Z,{key:s,attrs:{to:n,link:""}},[t(T.Z,[t(S.Z,[e._v(e._s(s))])],1),t(E.km,[t(E.V9,[e._v(e._s(a))])],1)],1)})),t(D.Z,{attrs:{link:""},on:{click:e.signout}},[t(T.Z,[t(S.Z,[e._v(" mdi-logout ")])],1),t(E.km,[t(E.V9,[t("b",[e._v("Logout")])])],1)],1)],2)],1)},z=[],M=s(4866);s(6282),s(2394),s(8542);const $={apiKey:"AIzaSyArNOjdBBUqfj73qSMN60yyEDFsrk4gcfQ",authDomain:"learning-enhancement-app.firebaseapp.com",projectId:"learning-enhancement-app",storageBucket:"learning-enhancement-app.appspot.com",messagingSenderId:"684318946736",appId:"1:684318946736:web:6af3587b55e52eaa079275",measurementId:"G-VLHYESKNN2"};M.Z.initializeApp($);var I,B,P=M.Z,q={created(){JSON.parse(localStorage.getItem("user"))||this.$router.push("/login")},mounted(){const e=P.firestore(),t=e.collection("users");t.where("learning_now","==",!0).get().then((e=>{this.learning_now_count=e.size})).catch((e=>{console.error("エラー:",e)}))},data:()=>({learning_now_count:0,drawer:null,links:[["mdi-home","Home","/"],["mdi-lead-pencil","Learning","/learning"],["mdi-chart-bar","Review","/review"]]}),methods:{signout(){P.auth().signOut().then((()=>{localStorage.removeItem("user"),localStorage.signout_message="サインアウトしました",this.$router.push("/login")})).catch((e=>{console.log("ログアウトに失敗しました",e)}))}}},L=q,V=(0,l.Z)(L,O,z,!1,null,null,null),R=V.exports,J={created(){const e=JSON.parse(localStorage.getItem("user"));console.log("localStrageの内容:",e),console.log("user_id:",e.uid)},mounted(){const e=P.firestore(),t=e.collection("learning_log"),s=JSON.parse(localStorage.getItem("user")),a=s.uid;t.where("uid","==",a).get().then((e=>{const t=new Set;e.forEach((e=>{const s=e.data().task_name;t.add(s)})),this.items=Array.from(t)})).catch((e=>{console.error("エラー:",e)}))},data:()=>({activities:["問う","考動する","カタチにする","見つめ直す","整える","その他"],places:["教室","研究室","フリースペース","図書室","飲食店","自宅","友人宅"],items:[]}),components:{SideBar:R},methods:{StartLearning(){const e=P.firestore(),t=JSON.parse(localStorage.getItem("user")),s=t.uid,a={task_name:document.getElementById("task_name").value,learning_activity:this.selectedActivity,learning_space:this.selectedSpace,start_time:new Date,learning_now:!0};e.collection("users").doc(s).update(a).then((()=>{localStorage.start_message="学習を開始しました",this.$router.push("/learning")})).catch((e=>{console.error("Error updating Firestore document:",e)}))},setCookie(e,t,s){const a=new Date;a.setTime(a.getTime()+24*s*60*60*1e3);const n="expires="+a.toUTCString();document.cookie=e+"="+t+";"+n+";path=/"}}},F=J,Q=(0,l.Z)(F,w,Z,!1,null,"0a30880c",null),U=Q.exports,H=s(3457),W=s(4437),G=s(5294),K=function(){var e=this,t=e._self._c;return t(h.Z,{staticClass:"calender"},[t("SideBar"),t(j.Z,[t(G.Z,[t(W.Z,[t(N.Z,{attrs:{height:"500"}},[t(H.Z,{attrs:{now:e.today,value:e.today,color:"primary"},scopedSlots:e._u([{key:"day",fn:function({past:s,date:a}){return[t(G.Z,{staticClass:"fill-height"},[s&&e.tracked[a]?e._l(e.tracked[a],(function(s,a){return t(N.Z,{key:a,attrs:{title:e.category[a],color:e.colors[a],width:`${s}%`,height:"100%",tile:""}})})):e._e()],2)]}}])})],1)],1)],1)],1)],1)},Y=[],X={data:()=>({today:"2023-03-30",tracked:{"2023-03-09":[23,45,10],"2023-03-08":[10],"2023-03-07":[0,78,5],"2023-03-06":[0,0,50],"2023-03-05":[0,10,23],"2023-03-04":[2,90],"2023-03-03":[10,32],"2023-03-02":[80,10,10],"2023-03-01":[20,25,10]},colors:["#1867c0","#fb8c00","#000000"],category:["Development","Meetings","Slacking"]}),components:{SideBar:R}},ee=X,te=(0,l.Z)(ee,K,Y,!1,null,"68ab0bb3",null),se=te.exports,ae=s(4944),ne=s(5617),re=function(){var e=this,t=e._self._c;return t(h.Z,{staticClass:"home"},[t("SideBar"),t(j.Z,[t(p.Z,{staticClass:"form-card",attrs:{elevation:"5",outlined:"",color:"rgb(255, 255, 255, 0.5)"}},[t("br"),t(ae.Z,{staticClass:"ma-2",attrs:{large:""}},[e._v(" "+e._s(this.display_task)+" ")]),t(ae.Z,{staticClass:"ma-2",attrs:{large:""}},[e._v(" "+e._s(this.display_activity)+" ")]),t(ae.Z,{staticClass:"ma-2",attrs:{large:""}},[e._v(" "+e._s(this.display_space)+" ")]),t("br"),t("div",{staticClass:"count-time"},[t(_.EB,{staticClass:"text-h1"},[t(k.Z),t("div",{staticClass:"after count-time- text",attrs:{id:"writehere"}},[e._v("00:00:00")]),t(k.Z)],1)],1),t("br")],1),t(p.Z,{staticClass:"form-card",attrs:{elevation:"5",outlined:"",color:"rgb(255, 255, 255, 0.5)"}},[t(_.EB,[t(k.Z),e._v(" 学習を終了する "),t(k.Z)],1),t(b.Z,[t(_.Qq,[e._v(" 今回の学習の満足度 ")]),t(y.Z,{staticClass:"form-box",attrs:{"hide-details":"",items:e.satisfactions,label:"Choose Activity",outlined:""},model:{value:e.satisfaction,callback:function(t){e.satisfaction=t},expression:"satisfaction"}}),t(_.Qq,[e._v(" タスクメモ ")]),t(ne.Z,{staticClass:"form-box",attrs:{outlined:"",name:"input-7-4",label:"Task Memo"},model:{value:e.memo,callback:function(t){e.memo=t},expression:"memo"}}),t("br"),t(f.Z,{staticClass:"me-4",attrs:{disabled:e.invalid},on:{click:e.end_learning}},[e._v(" 学習を終了する ")])],1),t("br")],1)],1)],1)},oe=[],ie={beforeCreate(){const e=P.firestore(),t="users",s=JSON.parse(localStorage.getItem("user")),a=s.uid;e.collection(t).doc(a).get().then((e=>{if(e.exists){const t=e.data();t.learning_now?(this.display_space=t.learning_space,this.display_activity=t.learning_activity,this.display_task=t.task_name,console.log("ccccc")):this.$router.push("/")}else console.log("No such document!")})).catch((e=>{console.error("Error getting document:",e)}))},updated(){this.learning_time()},data(){return{display_time_h:"",display_time_m:"",display_time_s:"",satisfactions:["1","2","3","4","5"],places:["教室","研究室","フリースペース","図書室","飲食店","自宅","友人宅"],memo:"",satisfaction:null,display_space:"",display_activity:"",display_task:"",display_time:"",judge_learning:!0,display_form:"",discount_time:0,CalcTime:""}},components:{SideBar:R},methods:{learning_time(){this.CalcTime=setInterval((function(){const e=P.firestore(),t="users",s=JSON.parse(localStorage.getItem("user")),a=s.uid;e.collection(t).doc(a).get().then((e=>{if(e.exists){const o=e.data();if(o.learning_now){if(!this.judge_learning){this.display_time_h="user";const e=new Date;var t=e.getTime()/1e3-o.start_time.seconds;t=Math.trunc(t),console.log("before_2",t);var s=0,a=0,n=0;t>=60?(console.log("all",t),a=Math.trunc(t/60),n=t%60,a>=60?(s=Math.trunc(a/60),a%=60):s=0):t<0?(n=0,a=0,s=0):(n=t,a=0,s=0),1==String(s).length?this.display_time_h="0"+String(s):this.display_time_h=String(s),1==String(a).length?this.display_time_m="0"+String(a):this.display_time_m=String(a),1==String(n).length?this.display_time_s="0"+String(n):this.display_time_s=String(n),console.log(this.display_time_h,":",this.display_time_m,":",this.display_time_s);var r=document.getElementById("writehere");r.innerHTML=this.display_time_h+":"+this.display_time_m+":"+this.display_time_s}}else this.$router.push("/")}else console.log("No such document!")})).catch((e=>{console.error("Error getting document:",e)}))}),1e3)},TimeDiscount(){this.discount_time=this.discount_time+600},end_learning(){console.log("end-learning");const e=P.firestore(),t="users",s=JSON.parse(localStorage.getItem("user")),a=s.uid;e.collection(t).doc(a).get().then((t=>{if(t.exists){const n=t.data();console.log("Document data:",n);const r="learning_log",o={end_time:new Date,learning_activity:n.learning_activity,learning_space:n.learning_space,memo:this.memo,satisfaction:this.satisfaction,start_time:n.start_time,task_name:n.task_name,uid:s.uid};e.collection(r).add(o).then((t=>{console.log("Document written with ID: ",t.id);const s={task_name:"",learning_activity:"",learning_space:"",start_time:"",learning_now:!1};e.collection("users").doc(a).update(s).then((()=>{console.log("Firestore document updated successfully."),this.judge_learning=!1,clearInterval(this.CalcTime),this.$router.push("/")})).catch((e=>{console.error("Error updating Firestore document:",e)}))})).catch((e=>{console.error("Error adding document: ",e)}))}else console.log("No such document!")})).catch((e=>{console.error("Error getting document:",e)}))}}},le=ie,ce=(0,l.Z)(le,re,oe,!1,null,"6e31a470",null),ue=ce.exports,de=s(2202),me=s(5251),ge=function(){var e=this,t=e._self._c;return t(h.Z,{staticClass:"login"},[t("div",{staticClass:"login-box"},[t(p.Z,{staticClass:"login-form"},[t(_.EB,{staticClass:"login-title"},[e._v("Login")]),t(_.Qq,[e._v("ユーザー情報をご入力ください")]),t(f.Z,{attrs:{text:"",color:"light-blue",to:"signup"}},[e._v("新規登録はこちら")]),t(b.Z,{ref:"form",attrs:{"lazy-validation":""},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[t(me.Z,{attrs:{rules:e.emailRules,label:"E-mail",required:""},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}}),t(me.Z,{attrs:{type:"password",label:"Password"},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}}),t(f.Z,{staticClass:"login-btn",attrs:{color:"success",disabled:e.isValid},on:{click:e.submit}},[e._v(" LOGIN ")]),t(f.Z,[e._v(" CLEAR ")]),e.message?t(de.Z,{staticClass:"success-message",attrs:{dense:"",text:"",type:"success"}},[e._v(" "+e._s(e.message)+" ")]):e._e(),e.errorMessage?t(de.Z,{staticClass:"error-message",attrs:{dense:"",outlined:"",type:"error"}},[e._v(" "+e._s(e.errorMessage)+" ")]):e._e(),e.signout_message?t(de.Z,{staticClass:"success-message",attrs:{dense:"",text:"",type:"info"}},[e._v(" "+e._s(e.signout_message)+" ")]):e._e()],1)],1)],1)])},he=[],fe={data:()=>({valid:!0,name:"",nameRules:[e=>!!e||"Name is required",e=>e&&e.length<=10||"Name must be less than 10 characters"],email:"",emailRules:[e=>!!e||"メールアドレスを入力してください",e=>/.+@.+\..+/.test(e)||"メールアドレスが不正です"],password:"",message:"",errorMessage:"",signout_message:""}),mounted(){localStorage.message&&(this.message=localStorage.message,localStorage.message=""),localStorage.signout_message&&(this.signout_message=localStorage.signout_message,localStorage.signout_message="")},computed:{isValid(){return console.log("isValid",this.valid),!this.valid}},methods:{validate(){this.$refs.form.validate()},reset(){this.$refs.form.reset()},resetValidation(){this.$refs.form.resetValidation()},submit(){console.log("submit call"),P.auth().signInWithEmailAndPassword(this.email,this.password).then((async e=>{console.log("success",e),console.log("user",e.user);const t={displayName:e.user.displayName,email:e.user.email,uid:e.user.uid,refreshToken:e.user.refreshToken};localStorage.setItem("user",JSON.stringify(t)),this.$router.push("/")})).catch((e=>{console.log("error",e),this.errorMessage="ログインに失敗しました"}))}}},pe=fe,_e=(0,l.Z)(pe,ge,he,!1,null,"08c5dba2",null),ve=_e.exports,be=function(){var e=this,t=e._self._c;return t(h.Z,{staticClass:"signup"},[t("div",{staticClass:"login-box"},[t(p.Z,{staticClass:"login-form"},[t(_.EB,{staticClass:"login-title"},[e._v("SignUp")]),t(_.Qq,[e._v("ユーザー情報をご入力ください")]),t(f.Z,{attrs:{text:"",color:"light-blue",to:"login"}},[e._v("ログイン画面はこちら")]),t(b.Z,{ref:"form",attrs:{"lazy-validation":""},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[t(me.Z,{attrs:{rules:e.nameRules,label:"UserName",required:""},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),t(me.Z,{attrs:{rules:e.emailRules,label:"E-mail",required:""},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}}),t(me.Z,{attrs:{type:"password",label:"Password"},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}}),t(f.Z,{staticClass:"login-btn",attrs:{color:"success",disabled:e.isValid},on:{click:e.submit}},[e._v(" SIGN UP ")]),t(f.Z,[e._v(" CLEAR ")]),e.errorMessage?t(de.Z,{staticClass:"error-message",attrs:{dense:"",outlined:"",type:"error"}},[e._v(" "+e._s(e.errorMessage)+" ")]):e._e()],1)],1)],1)])},je=[],ye=(s(9828),{data:()=>({valid:!0,name:"",nameRules:[e=>!!e||"名前を入力してください",e=>e&&e.length<=10||"名前は10文字以内で入力してください"],email:"",emailRules:[e=>!!e||"メールアドレスを入力してください",e=>/.+@.+\..+/.test(e)||"メールアドレスが不正です"],password:"",errorMessage:""}),computed:{isValid(){return console.log("isValid",this.valid),!this.valid}},methods:{validate(){this.$refs.form.validate()},reset(){this.$refs.form.reset()},resetValidation(){this.$refs.form.resetValidation()},submit(){console.log("submit call"),P.auth().createUserWithEmailAndPassword(this.email,this.password).then((async e=>{console.log("success",e),await e.user.updateProfile({displayName:this.name}),console.log("update user",e.user),localStorage.message="新規作成に成功しました";const t=e.user.uid,s=P.firestore();s.collection("users").doc(t).set({learning_now:!1,start_time:"",learning_activity:"",learning_space:"",task_name:""}).then((()=>{console.log("success"),this.$router.push("/login")})).catch((e=>{console.log(e)}))})).catch((e=>{console.log("fail",e),this.errorMessage="ユーザーの新規作成に失敗しました。"}))},register_user_id(){const e=P.firebaseConfig;P.initializeApp(e);const t=P.firestore();t.collection("users").add({user_id:"Ada",learning_now:"Lovelace"}).then((e=>{console.log("Document written with ID: ",e.id)})).catch((e=>{console.error("Error adding document: ",e)}))}}}),ke=ye,we=(0,l.Z)(ke,be,je,!1,null,"5a44dbe5",null),Ze=we.exports,Ce=function(){var e=this,t=e._self._c;return t(h.Z,{staticClass:"home"},[t("SideBar"),t(j.Z,[t(p.Z,{staticClass:"form-card",attrs:{elevation:"5",outlined:"",color:"rgb(255, 255, 255, 0.9)"}},[t("br"),t("DisplayTotalTime"),t("br"),t("br")],1),t(p.Z,{staticClass:"form-card",attrs:{elevation:"5",outlined:"",color:"rgb(255, 255, 255, 0.9)"}},[t("div",{staticClass:"graph_area"},[t("BarChart")],1)])],1)],1)},Se=[],xe=s(6663),De={extends:xe.$Q,mixins:[xe.tA.reactiveProp],data(){return{userCount:1,options:{responsive:!0,maintainAspectRatio:!1,scales:{x:{stacked:!0},y:{stacked:!0,beginAtZero:!0},yAxes:[{ticks:{callback:function(e){e=Math.floor(e/1e3);let t=Math.floor(e/3600),s=Math.floor(e%3600/60),a=e%60;return`${t}時間${s}分${a}秒`}}}]},tooltips:{callbacks:{label:function(e){let t=e.value/1e3,s=Math.floor(t/3600),a=Math.floor(t%3600/60),n=Math.floor(t%60);return`${s}時間${a}分${n}秒`}}}}}},mounted(){this.fetchData()},methods:{fetchData(){const e=P.firestore(),t=new Date,s=new Date(t.getTime()-6048e5),a=JSON.parse(localStorage.getItem("user")),n=Array(7).fill(0),r=Array(7).fill(0),o=e.collection("learning_log").where("uid","==",a.uid).where("start_time",">=",s).get().then((e=>(e.forEach((e=>{const s=e.data().start_time.toDate(),a=e.data().end_time.toDate(),r=a.getTime()-s.getTime(),o=Math.floor((t-s)/864e5);n[6-o]+=r})),n)));e.collection("users").get().then((e=>{this.userCount=e.size}));const i=e.collection("learning_log").where("start_time",">=",s).get().then((e=>(e.forEach((e=>{const s=e.data().start_time.toDate(),a=e.data().end_time.toDate(),n=(a.getTime()-s.getTime())/this.userCount,o=Math.floor((t-s)/864e5);r[6-o]+=n})),r)));Promise.all([o,i]).then((([e,t])=>{this.renderChart({labels:this.generateLabels(),datasets:[{label:"ユーザの学習時間",data:e,backgroundColor:"rgba(75, 192, 192, 0.6)",borderWidth:1},{label:"みんなの平均学習時間",data:t,backgroundColor:"rgba(192, 75, 192, 0.6)",borderWidth:1}]},this.options)}))},generateLabels(){const e=[],t=new Date;for(let s=6;s>=0;s--){const a=new Date(t.getTime()-24*s*60*60*1e3),n=`${a.getMonth()+1}/${a.getDate()}`;e.push(n)}return e}}},Ee=De,Te=(0,l.Z)(Ee,I,B,!1,null,null,null),Ae=Te.exports,Ne=function(){var e=this,t=e._self._c;return t("div",[t("h1",[e._v("今週の合計時間")]),t(_.EB,{staticClass:"text-h1"},[t(k.Z),e._v(e._s(e.formattedDuration)),t(k.Z)],1)],1)},Oe=[],ze={data(){return{formattedDuration:""}},mounted(){this.calculateTotalDuration()},methods:{calculateTotalDuration(){const e=P.firestore(),t=JSON.parse(localStorage.getItem("user")),s=new Date,a=new Date(s.getTime()-6048e5);e.collection("learning_log").where("uid","==",t.uid).where("start_time",">=",a).get().then((e=>{let t=0;e.forEach((e=>{const s=e.data().start_time.toDate(),a=e.data().end_time.toDate(),n=a.getTime()-s.getTime();t+=n})),this.formattedDuration=this.formatDuration(t)})).catch((e=>{console.error("検索エラー:",e)}))},formatDuration(e){const t=Math.floor(e/36e5),s=Math.floor(e%36e5/6e4),a=Math.floor(e%6e4/1e3);return`${this.padZero(t)}:${this.padZero(s)}:${this.padZero(a)}`},padZero(e){return e.toString().padStart(2,"0")}}},Me=ze,$e=(0,l.Z)(Me,Ne,Oe,!1,null,null,null),Ie=$e.exports,Be={mounted(){},data:()=>({}),components:{SideBar:R,BarChart:Ae,DisplayTotalTime:Ie},methods:{}},Pe=Be,qe=(0,l.Z)(Pe,Ce,Se,!1,null,"ebc78c44",null),Le=qe.exports;a.ZP.use(g.ZP);const Ve=[{path:"/",name:"home",component:U,meta:{requiresAuth:!1}},{path:"/learning",name:"leaning",component:ue,meta:{requiresAuth:!0}},{path:"/about",name:"about",component:()=>s.e(443).then(s.bind(s,6528))},{path:"/calender",name:"calender",component:se,meta:{requiresAuth:!0}},{path:"/login",name:"login",component:ve},{path:"/signup",name:"signup",component:Ze},{path:"/review",name:"review",component:Le,meta:{requiresAuth:!1}}],Re=new g.ZP({base:"",routes:Ve});var Je=Re;a.ZP.config.productionTip=!1,new a.ZP({vuetify:m,router:Je,render:e=>e(u)}).$mount("#app")},6700:function(e,t,s){var a={"./af":2786,"./af.js":2786,"./ar":867,"./ar-dz":4130,"./ar-dz.js":4130,"./ar-kw":6135,"./ar-kw.js":6135,"./ar-ly":6440,"./ar-ly.js":6440,"./ar-ma":7702,"./ar-ma.js":7702,"./ar-sa":6040,"./ar-sa.js":6040,"./ar-tn":7100,"./ar-tn.js":7100,"./ar.js":867,"./az":1083,"./az.js":1083,"./be":9808,"./be.js":9808,"./bg":8338,"./bg.js":8338,"./bm":7438,"./bm.js":7438,"./bn":8905,"./bn-bd":6225,"./bn-bd.js":6225,"./bn.js":8905,"./bo":1560,"./bo.js":1560,"./br":1278,"./br.js":1278,"./bs":622,"./bs.js":622,"./ca":2468,"./ca.js":2468,"./cs":5822,"./cs.js":5822,"./cv":877,"./cv.js":877,"./cy":7373,"./cy.js":7373,"./da":4780,"./da.js":4780,"./de":9740,"./de-at":217,"./de-at.js":217,"./de-ch":894,"./de-ch.js":894,"./de.js":9740,"./dv":5300,"./dv.js":5300,"./el":837,"./el.js":837,"./en-au":8348,"./en-au.js":8348,"./en-ca":7925,"./en-ca.js":7925,"./en-gb":2243,"./en-gb.js":2243,"./en-ie":6436,"./en-ie.js":6436,"./en-il":941,"./en-il.js":941,"./en-in":4175,"./en-in.js":4175,"./en-nz":6319,"./en-nz.js":6319,"./en-sg":1662,"./en-sg.js":1662,"./eo":2915,"./eo.js":2915,"./es":5655,"./es-do":2088,"./es-do.js":2088,"./es-mx":6112,"./es-mx.js":6112,"./es-us":1146,"./es-us.js":1146,"./es.js":5655,"./et":5603,"./et.js":5603,"./eu":7763,"./eu.js":7763,"./fa":6959,"./fa.js":6959,"./fi":1897,"./fi.js":1897,"./fil":2549,"./fil.js":2549,"./fo":4694,"./fo.js":4694,"./fr":4470,"./fr-ca":3049,"./fr-ca.js":3049,"./fr-ch":2330,"./fr-ch.js":2330,"./fr.js":4470,"./fy":5044,"./fy.js":5044,"./ga":9295,"./ga.js":9295,"./gd":2101,"./gd.js":2101,"./gl":8794,"./gl.js":8794,"./gom-deva":7884,"./gom-deva.js":7884,"./gom-latn":3168,"./gom-latn.js":3168,"./gu":5349,"./gu.js":5349,"./he":4206,"./he.js":4206,"./hi":94,"./hi.js":94,"./hr":316,"./hr.js":316,"./hu":2138,"./hu.js":2138,"./hy-am":1423,"./hy-am.js":1423,"./id":9218,"./id.js":9218,"./is":135,"./is.js":135,"./it":626,"./it-ch":150,"./it-ch.js":150,"./it.js":626,"./ja":9183,"./ja.js":9183,"./jv":4286,"./jv.js":4286,"./ka":2105,"./ka.js":2105,"./kk":7772,"./kk.js":7772,"./km":8758,"./km.js":8758,"./kn":9282,"./kn.js":9282,"./ko":3730,"./ko.js":3730,"./ku":1408,"./ku.js":1408,"./ky":3291,"./ky.js":3291,"./lb":6841,"./lb.js":6841,"./lo":5466,"./lo.js":5466,"./lt":7010,"./lt.js":7010,"./lv":7595,"./lv.js":7595,"./me":9861,"./me.js":9861,"./mi":5493,"./mi.js":5493,"./mk":5966,"./mk.js":5966,"./ml":7341,"./ml.js":7341,"./mn":5115,"./mn.js":5115,"./mr":370,"./mr.js":370,"./ms":9847,"./ms-my":1237,"./ms-my.js":1237,"./ms.js":9847,"./mt":2126,"./mt.js":2126,"./my":6165,"./my.js":6165,"./nb":4924,"./nb.js":4924,"./ne":6744,"./ne.js":6744,"./nl":3901,"./nl-be":9814,"./nl-be.js":9814,"./nl.js":3901,"./nn":3877,"./nn.js":3877,"./oc-lnc":2135,"./oc-lnc.js":2135,"./pa-in":5858,"./pa-in.js":5858,"./pl":4495,"./pl.js":4495,"./pt":9520,"./pt-br":7971,"./pt-br.js":7971,"./pt.js":9520,"./ro":6459,"./ro.js":6459,"./ru":1793,"./ru.js":1793,"./sd":950,"./sd.js":950,"./se":490,"./se.js":490,"./si":124,"./si.js":124,"./sk":4249,"./sk.js":4249,"./sl":4985,"./sl.js":4985,"./sq":1104,"./sq.js":1104,"./sr":9131,"./sr-cyrl":9915,"./sr-cyrl.js":9915,"./sr.js":9131,"./ss":5893,"./ss.js":5893,"./sv":8760,"./sv.js":8760,"./sw":1172,"./sw.js":1172,"./ta":7333,"./ta.js":7333,"./te":3110,"./te.js":3110,"./tet":2095,"./tet.js":2095,"./tg":7321,"./tg.js":7321,"./th":9041,"./th.js":9041,"./tk":9005,"./tk.js":9005,"./tl-ph":5768,"./tl-ph.js":5768,"./tlh":9444,"./tlh.js":9444,"./tr":2397,"./tr.js":2397,"./tzl":8254,"./tzl.js":8254,"./tzm":1106,"./tzm-latn":699,"./tzm-latn.js":699,"./tzm.js":1106,"./ug-cn":9288,"./ug-cn.js":9288,"./uk":7691,"./uk.js":7691,"./ur":3795,"./ur.js":3795,"./uz":6791,"./uz-latn":588,"./uz-latn.js":588,"./uz.js":6791,"./vi":5666,"./vi.js":5666,"./x-pseudo":4378,"./x-pseudo.js":4378,"./yo":5805,"./yo.js":5805,"./zh-cn":3839,"./zh-cn.js":3839,"./zh-hk":5726,"./zh-hk.js":5726,"./zh-mo":9807,"./zh-mo.js":9807,"./zh-tw":4152,"./zh-tw.js":4152};function n(e){var t=r(e);return s(t)}function r(e){if(!s.o(a,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return a[e]}n.keys=function(){return Object.keys(a)},n.resolve=r,e.exports=n,n.id=6700},5152:function(e,t,s){"use strict";e.exports=s.p+"img/Enhanced_logo.4df9e292.png"}},t={};function s(a){var n=t[a];if(void 0!==n)return n.exports;var r=t[a]={id:a,loaded:!1,exports:{}};return e[a].call(r.exports,r,r.exports,s),r.loaded=!0,r.exports}s.m=e,function(){var e=[];s.O=function(t,a,n,r){if(!a){var o=1/0;for(u=0;u<e.length;u++){a=e[u][0],n=e[u][1],r=e[u][2];for(var i=!0,l=0;l<a.length;l++)(!1&r||o>=r)&&Object.keys(s.O).every((function(e){return s.O[e](a[l])}))?a.splice(l--,1):(i=!1,r<o&&(o=r));if(i){e.splice(u--,1);var c=n();void 0!==c&&(t=c)}}return t}r=r||0;for(var u=e.length;u>0&&e[u-1][2]>r;u--)e[u]=e[u-1];e[u]=[a,n,r]}}(),function(){s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,{a:t}),t}}(),function(){s.d=function(e,t){for(var a in t)s.o(t,a)&&!s.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}}(),function(){s.f={},s.e=function(e){return Promise.all(Object.keys(s.f).reduce((function(t,a){return s.f[a](e,t),t}),[]))}}(),function(){s.u=function(e){return"js/about.da21e4ae.js"}}(),function(){s.miniCssF=function(e){return"css/about.290c12f6.css"}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="learning-enhancement-app:";s.l=function(a,n,r,o){if(e[a])e[a].push(n);else{var i,l;if(void 0!==r)for(var c=document.getElementsByTagName("script"),u=0;u<c.length;u++){var d=c[u];if(d.getAttribute("src")==a||d.getAttribute("data-webpack")==t+r){i=d;break}}i||(l=!0,i=document.createElement("script"),i.charset="utf-8",i.timeout=120,s.nc&&i.setAttribute("nonce",s.nc),i.setAttribute("data-webpack",t+r),i.src=a),e[a]=[n];var m=function(t,s){i.onerror=i.onload=null,clearTimeout(g);var n=e[a];if(delete e[a],i.parentNode&&i.parentNode.removeChild(i),n&&n.forEach((function(e){return e(s)})),t)return t(s)},g=setTimeout(m.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=m.bind(null,i.onerror),i.onload=m.bind(null,i.onload),l&&document.head.appendChild(i)}}}(),function(){s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){s.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e}}(),function(){s.p=""}(),function(){if("undefined"!==typeof document){var e=function(e,t,s,a,n){var r=document.createElement("link");r.rel="stylesheet",r.type="text/css";var o=function(s){if(r.onerror=r.onload=null,"load"===s.type)a();else{var o=s&&("load"===s.type?"missing":s.type),i=s&&s.target&&s.target.href||t,l=new Error("Loading CSS chunk "+e+" failed.\n("+i+")");l.code="CSS_CHUNK_LOAD_FAILED",l.type=o,l.request=i,r.parentNode&&r.parentNode.removeChild(r),n(l)}};return r.onerror=r.onload=o,r.href=t,s?s.parentNode.insertBefore(r,s.nextSibling):document.head.appendChild(r),r},t=function(e,t){for(var s=document.getElementsByTagName("link"),a=0;a<s.length;a++){var n=s[a],r=n.getAttribute("data-href")||n.getAttribute("href");if("stylesheet"===n.rel&&(r===e||r===t))return n}var o=document.getElementsByTagName("style");for(a=0;a<o.length;a++){n=o[a],r=n.getAttribute("data-href");if(r===e||r===t)return n}},a=function(a){return new Promise((function(n,r){var o=s.miniCssF(a),i=s.p+o;if(t(o,i))return n();e(a,i,null,n,r)}))},n={143:0};s.f.miniCss=function(e,t){var s={443:1};n[e]?t.push(n[e]):0!==n[e]&&s[e]&&t.push(n[e]=a(e).then((function(){n[e]=0}),(function(t){throw delete n[e],t})))}}}(),function(){var e={143:0};s.f.j=function(t,a){var n=s.o(e,t)?e[t]:void 0;if(0!==n)if(n)a.push(n[2]);else{var r=new Promise((function(s,a){n=e[t]=[s,a]}));a.push(n[2]=r);var o=s.p+s.u(t),i=new Error,l=function(a){if(s.o(e,t)&&(n=e[t],0!==n&&(e[t]=void 0),n)){var r=a&&("load"===a.type?"missing":a.type),o=a&&a.target&&a.target.src;i.message="Loading chunk "+t+" failed.\n("+r+": "+o+")",i.name="ChunkLoadError",i.type=r,i.request=o,n[1](i)}};s.l(o,l,"chunk-"+t,t)}},s.O.j=function(t){return 0===e[t]};var t=function(t,a){var n,r,o=a[0],i=a[1],l=a[2],c=0;if(o.some((function(t){return 0!==e[t]}))){for(n in i)s.o(i,n)&&(s.m[n]=i[n]);if(l)var u=l(s)}for(t&&t(a);c<o.length;c++)r=o[c],s.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return s.O(u)},a=self["webpackChunklearning_enhancement_app"]=self["webpackChunklearning_enhancement_app"]||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))}();var a=s.O(void 0,[998],(function(){return s(1284)}));a=s.O(a)})();
//# sourceMappingURL=app.82e62cfd.js.map