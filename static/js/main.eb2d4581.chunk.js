(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{19:function(e,t,a){"use strict";var n=function(e,t){if(t<=Math.min.apply(null,e))return 0;if(t>Math.max.apply(null,e))return e.length;for(var a=0,n=0,r=e.length;n<r;n++)if(e[n]>=t){a=n;break}return a},r=a(25),c=a(36);function o(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:12,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,c=arguments.length>4&&void 0!==arguments[4]?arguments[4]:5e3,o=+(+e*a).toFixed(2),i=+((+t+r+c)*a).toFixed(2),s=+(+t*a).toFixed(2),l=o-i,u=n([0,36e3,144e3,3e5,42e4,66e4,96e4],l),d=[0,3,10,20,25,30,35,45][u],m=[0,0,2520,16920,31920,52920,85920,181920][u],h=+(l*d/100-m).toFixed(2);return{taxRate:d,quickDeduction:m,tax:h,afterTax:+((+e-+t)*a-h).toFixed(2),income:o,totalDeduction:i,totalInsurance:s}}function i(e,t,a){var n=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],o=arguments.length>4?arguments[4]:void 0,i=r.c[a],s=i.MIBases,l=i.EIBases,u=i.UIBases,d=i.EIRates,m=i.MIRates,h=i.UIRates,p=i.addMI;return+(Object(c.a)(e,s)*m[0]+p+Object(c.a)(e,l)*d[0]+Object(c.a)(e,u)*h[0]+t*o*Number(n)).toFixed(2)}function s(e){var t=[0,3e3,12e3,25e3,35e3,55e3,8e4],a=[0,3,10,20,25,30,35,45],r=[0,0,210,1410,2660,4410,7160,15160];if(!(arguments.length>1&&void 0!==arguments[1])||arguments[1]){var c=n(t,e/12),o=a[c],i=r[c],s=+(e*o/100-i).toFixed(2);return{tax:s,income:e,taxRate:o,quickDeduction:i,afterTax:e-s}}for(var l,u,d,m=0,h=0,p=a.length;m<p;m++){var I=+((e-r[m])/(1-a[m]/100)/12).toFixed(2);if(n(t,I)===m){h=m;break}}return{taxRate:u=a[h],quickDeduction:d=r[h],afterTax:e,income:l=+((e-d)/(1-u/100)).toFixed(2),tax:+(l-e).toFixed(2)}}a.d(t,"b",function(){return o}),a.d(t,"c",function(){return i}),a.d(t,"a",function(){return s})},25:function(e,t,a){"use strict";a.d(t,"e",function(){return c}),a.d(t,"d",function(){return o}),a.d(t,"b",function(){return i}),a.d(t,"c",function(){return s}),a.d(t,"a",function(){return l});var n=0;function r(e,t,a,r){var c;return n+=1,c=e?t?"\u8d85\u8fc7".concat(e,",000\u81f3").concat(t,",000\u7684\u90e8\u5206"):"\u4e0d\u8d85\u8fc7".concat(e,",000\u7684\u90e8\u5206"):"\u8d85\u8fc7".concat(t,",000\u7684\u90e8\u5206"),{id:n,income:c,taxRate:a,deduction:r}}var c=[r(36,0,3,0),r(36,144,10,2520),r(144,300,20,16920),r(300,420,25,31920),r(420,660,30,52920),r(660,960,35,85920),r(0,960,45,181920)],o=[r(3,0,3,0),r(3,12,10,210),r(12,25,20,1410),r(25,35,25,2660),r(35,55,30,4410),r(55,80,35,7160),r(0,80,45,15160)],i=[[.05,"5%"],[.06,"6%"],[.07,"7%"],[.08,"8%"],[.09,"9%"],[.1,"10%"],[.11,"11%"],[.12,"12%"]],s=[{city:"\u5317\u4eac",IBases:[5360,28221],MIBases:[5360,28221],EIBases:[5360,28221],UIBases:[5360,28221],CIBase:[5360,28221],WIIBase:[5360,28221],HACBases:[5360,28221],addMI:3,HACRates:[.12,.12],EIRates:[.08,.16],MIRates:[.02,.1],UIRates:[.002,.008],WIIRates:[0,.004],CIRates:[0,.008]},{city:"\u676d\u5dde",IBases:[3321.6,16608],MIBases:[3321.6,16608],EIBases:[3321.6,16608],UIBases:[3321.6,16608],CIBase:[3321.6,16608],WIIBase:[3321.6,16608],HACBases:[2010,25950],addMI:0,HACRates:[.12,.12],EIRates:[.08,.14],MIRates:[.02,.105],UIRates:[.005,.005],WIIRates:[0,.002],CIRates:[0,.012]},{city:"\u4e0a\u6d77",IBases:[4699,23496],MIBases:[4699,23496],EIBases:[4699,23496],UIBases:[4699,23496],CIBase:[4699,23496],WIIBase:[4699,23496],HACBases:[2420,23496],addMI:0,HACRates:[.07,.07],EIRates:[.08,.2],MIRates:[.02,.095],UIRates:[.005,.005],WIIRates:[0,.001],CIRates:[0,.01]},{city:"\u5e7f\u5dde",IBases:[2100,27960],MIBases:[5592,27960],EIBases:[3803,19014],UIBases:[2100,27960],HACBases:[2100,27960],addMI:0,HACRates:[.07,.07],EIRates:[.08,.14],MIRates:[.02,.055],UIRates:[.002,.0064]},{city:"\u6df1\u5733",IBases:[2200,27927],MIBases:[5585,27927],EIBases:[2200,19014],UIBases:[2200,2200],CIBase:[2200,27927],WIIBase:[2200,19014],HACBases:[2200,27927],addMI:0,HACRates:[.05,.05],EIRates:[.08,.14],MIRates:[.02,.062],UIRates:[.003,.007],WIIRates:[0,.0014],CIRates:[0,.0045]},{city:"\u5b81\u6ce2",IBases:[3539,17694],MIBases:[3539,17694],EIBases:[3539,17694],UIBases:[3539,17694],CIBase:[3539,17694],WIIBase:[3539,17694],HACBases:[2010,27237],addMI:0,HACRates:[.08,.08],EIRates:[.08,.14],MIRates:[.02,.08],UIRates:[.005,.005],WIIRates:[0,.0014],CIRates:[0,.0067]},{city:"\u82cf\u5dde",IBases:[3368,16842],MIBases:[3368,16842],EIBases:[3368,16842],UIBases:[3368,16842],HACBases:[3030,23700],addMI:5,HACRates:[.08,.08],EIRates:[.08,.16],MIRates:[.02,.07],UIRates:[.005,.005]},{city:"\u65e0\u9521",IBases:[2788,18171],MIBases:[2788,18171],EIBases:[2788,18171],UIBases:[2788,18171],HACBases:[2020,23100],addMI:0,HACRates:[.08,.08],EIRates:[.08,.19],MIRates:[.02,.079],UIRates:[.005,.005]},{city:"\u897f\u5b89",IBases:[3121,20955],MIBases:[4191,20955],EIBases:[3121,15603],UIBases:[4191,20955],HACBases:[1800,20955],addMI:1.6,HACRates:[.1,.1],EIRates:[.08,.16],MIRates:[.02,.07],UIRates:[.003,.007]},{city:"\u6210\u90fd",IBases:[2697,16179],MIBases:[3236,16179],EIBases:[2697,16179],UIBases:[3236,16179],HACBases:[1780,21498],addMI:0,HACRates:[.06,.06],EIRates:[.08,.16],MIRates:[.02,.065],UIRates:[.004,.006]},{city:"\u5357\u4eac",IBases:[3368,16842],MIBases:[3368,16842],EIBases:[3368,16842],UIBases:[3368,16842],HACBases:[2020,27700],addMI:0,HACRates:[.06,.06],EIRates:[.08,.16],MIRates:[.02,.09],UIRates:[.005,.005]}],l=["\u5317\u4eac","\u676d\u5dde","\u4e0a\u6d77","\u5e7f\u5dde","\u6df1\u5733","\u5b81\u6ce2","\u82cf\u5dde","\u65e0\u9521","\u897f\u5b89","\u6210\u90fd","\u5357\u4eac"]},36:function(e,t,a){"use strict";function n(e,t){var a=+e,n=t[0],r=t[1];return a>=n?a<=r?a:r:n}a.d(t,"a",function(){return n})},5448:function(e,t,a){e.exports=a(5630)},5629:function(e,t,a){},5630:function(e,t,a){"use strict";a.r(t);var n,r,c=a(0),o=a.n(c),i=a(22),s=a.n(i),l=a(172),u=a(17),d=a(72),m=a.n(d),h=a(71),p=a.n(h),I=a(173),f=a.n(I),b=a(106),v=a.n(b),g=a(107),C=a.n(g),y=a(5636),E=a(5633),B=a(5634),O=a(44),x=a(30),j=a(31),R=a(33),A=a(32),w=a(34),H=a(16),T=a(5),M=a(168),k=a.n(M),S=a(21),W=a(5635),U=a(109),P=a(114),N=a.n(P),F=a(5632),_=a(36),D=a(19),L=a(25),q=function(e){var t=e.classes,a=e.label,n=e.value,r=e.city;return o.a.createElement("span",null,o.a.createElement("span",{className:t.span},r),a,o.a.createElement("span",{className:t.span},n))},J=function(e){return o.a.createElement(F.a,Object.assign({to:"/city"},e))},Y=function(e){function t(){var e,a;Object(x.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(R.a)(this,(e=Object(A.a)(t)).call.apply(e,[this].concat(r)))).handleClick=function(e){var t=a.props,n=t.monthIncome,r=t.insurance,c=t.additional;if(n&&r){e.preventDefault();var o=Object(D.b)(n,r,12,+c),i=new Array(12).fill(1).map(function(e,t){if(!t){var a=Object(D.b)(n,r,1,+c);return{tax:a.tax,income:a.income,afterTax:a.afterTax}}var o=Object(D.b)(n,r,t+1,+c),i=Object(D.b)(n,r,t,+c),s=+(o.tax-i.tax).toFixed(2),l=+n;return{tax:s,income:l,afterTax:+(l-s-+r).toFixed(2)}});a.props.history.push("/result"),a.props.switchType(1),a.props.compute(Object(S.a)({},o,{aMonthTax:i,insurance:r,additional:12*+c}))}},a.handleMonthCal=function(e){var t=a.props,n=t.monthInput,r=n.month,c=n.data,o=t.compute,i=c[r],s=i.monthIncome,l=i.insurance,u=i.additional,d=[];if(!r){var m=Object(D.b)(s,l,1,+u),h=m.tax,p=m.income,I=m.afterTax;return d=[{tax:h,income:p,afterTax:I}],o(Object(S.a)({},m,{aMonthTax:d,insurance:l,additional:u})),a.props.history.push("/result"),void a.props.switchType(1)}var f=0,b=0,v=0;c.some(function(e,t){return t===r+1||(f+=+e.monthIncome,b+=+e.insurance,v+=+e.additional,!1)});for(var g=function(e){if(0===e){var t=Object(D.b)(c[0].monthIncome,c[0].insurance,1,+c[0].additional),a=t.tax,n=t.income,r=t.afterTax,o=t.totalInsurance;return d.push({tax:a,income:n,afterTax:r,insurance:o}),"continue"}var i=0,s=0,l=0,u=0,m=0,h=0;c.some(function(t,a){return a===e+1||(i+=+t.monthIncome,s+=+t.insurance,l+=+t.additional,!1)}),c.some(function(t,a){return a===e||(u+=+t.monthIncome,m+=+t.insurance,h+=+t.additional,!1)});var p=Object(D.b)(i,s,1,l,5e3*(e+1)),I=Object(D.b)(u,m,1,h,5e3*e),f=+c[e].monthIncome?+(p.tax-I.tax).toFixed(2):0,b=+c[e].monthIncome,v=+(b-f-+c[e].insurance).toFixed(2);d.push({tax:f,income:b,afterTax:v,insurance:c[e].insurance})},C=0;C<r+1;C++)g(C);var y=Object(D.b)(f,b,1,v,5e3*(r+1));o(Object(S.a)({},y,{aMonthTax:d,insurance:b,additional:v})),a.props.history.push("/result"),a.props.switchType(1)},a.handleChange=function(e){return function(t){var n,r=a.props,c=r.cityIdx,o=r.writeInput,i=r.writeMonthInput,s=r.selectMonth,l=r.IBase,u=r.HACBase,d=r.HACRate,m=r.checkProvident,h=r.mode,p=r.monthInput,I=p.month,f=p.data[I],b=f.IBase,v=f.HACBase,g=f.checkProvident,C=f.HACRate,y=L.c[c],E=y.IBases,B=y.HACBases;if("checkProvident"===e){var O=t.target.checked;return n=Object(D.c)(h?b:l,h?v:u,c,O,h?C:d),void(h?i({checkProvident:O,insurance:n}):o({checkProvident:O,insurance:n}))}if("mode"!==e){var x=t.target.value;if("month"!==e){if("monthIncome"===e){var j=Object(_.a)(x,E),R=Object(_.a)(x,B);return n=Object(D.c)(j,R,c,m,d),void(h?i(Object(H.a)({IBase:j,HACBase:R,insurance:n},e,x)):o(Object(H.a)({IBase:j,HACBase:R,insurance:n},e,x)))}if("HACRate"===e)return n=Object(D.c)(h?b:l,h?v:u,c,h?g:m,x),void(h?i(Object(H.a)({insurance:n},e,x)):o(Object(H.a)({insurance:n},e,x)));h?i(Object(H.a)({},e,x)):o(Object(H.a)({},e,x))}else s(x)}else{var A=t.target.checked;o(Object(H.a)({},e,A))}}},a.handleBlur=function(e){return function(t){var n,r,c=a.props,o=c.cityIdx,i=c.HACBase,s=c.checkProvident,l=c.HACRate,u=c.IBase,d=c.writeInput,m=c.writeMonthInput,h=c.mode,p=c.monthInput,I=p.month,f=p.data,b=L.c[o],v=b.IBases,g=b.HACBases,C=f[I],y=C.IBase,E=C.HACBase,B=C.checkProvident,O=C.HACRate,x=Object(_.a)(h?"IBase"===e?y:E:a.props[e],"IBase"===e?v:g),j="IBase"===e?Object(D.c)(x,h?E:i,o,h?B:s,h?O:l):Object(D.c)(h?y:u,x,o,h?B:s,h?O:l);h?m((n={},Object(H.a)(n,e,x),Object(H.a)(n,"insurance",j),n)):d((r={},Object(H.a)(r,e,x),Object(H.a)(r,"insurance",j),r))}},a}return Object(w.a)(t,e),Object(j.a)(t,[{key:"render",value:function(){var e=this.props,t=e.classes,a=e.mode,n=e.cityIdx,r=e.monthIncome,c=e.insurance,i=e.IBase,s=e.HACBase,l=e.additional,u=e.checkProvident,d=e.HACRate,m=e.monthInput,h=m.month,p=m.data,I=e.nextMonth,f=e.copy,b=p[h],v=b.monthIncome,g=b.insurance,C=b.IBase,y=b.HACBase,E=b.checkProvident,B=b.HACRate,O=b.additional,x=L.c[n],j=x.city,R=x.IBases,A=x.HACBases;return o.a.createElement(T.i,{container:!0,spacing:24,component:"form",onSubmit:this.handleClick},o.a.createElement(T.i,{item:!0,xs:12},o.a.createElement(T.b,{size:"small",variant:"contained",fullWidth:!0,classes:{label:t.btnLabel},component:J},o.a.createElement(U.d,{color:"inherit"}),j)),o.a.createElement(T.i,{item:!0,xs:12,md:6},o.a.createElement(T.h,{control:o.a.createElement(T.u,{color:"primary",checked:a,onChange:this.handleChange("mode")}),label:"\u6708\u5ea6\u6a21\u5f0f",labelPlacement:"start"})),a&&o.a.createElement(T.i,{item:!0,xs:12,md:6},o.a.createElement(T.g,{fullWidth:!0},o.a.createElement(T.k,{htmlFor:"month"},"\u9009\u62e9\u6708\u4efd"),o.a.createElement(T.s,{inputProps:{name:"month",id:"month"},value:h,onChange:this.handleChange("month")},new Array(12).fill("").map(function(e,t){return o.a.createElement(T.o,{value:t,key:t},"".concat(t+1,"\u6708"))})))),o.a.createElement(T.i,{item:!0,xs:12,md:6},o.a.createElement(T.C,{required:!0,id:"monthIncome",label:"\u6708\u6536\u5165(\u5143)",fullWidth:!0,type:"tel",value:a?v:r,onChange:this.handleChange("monthIncome")})),o.a.createElement(T.i,{item:!0,xs:12,md:6},o.a.createElement(T.C,{required:!0,id:"insurance",label:"\u4e94\u9669\u4e00\u91d1(\u5143)",fullWidth:!0,helperText:"*\u6839\u636e\u7f34\u7eb3\u57fa\u6570\u8ba1\u7b97\uff0c\u53ef\u624b\u52a8\u4fee\u6539",type:"tel",value:a?g:c,onChange:this.handleChange("insurance")})),o.a.createElement(T.i,{item:!0,xs:12,md:6},o.a.createElement(T.C,{id:"IBase",label:"\u793e\u4fdd\u7f34\u7eb3\u57fa\u6570(\u5143)",value:a?C:i,fullWidth:!0,helperText:o.a.createElement(q,{classes:t,city:j,label:"\u793e\u4fdd\u7f34\u7eb3\u57fa\u6570\u8303\u56f4\uff1a",value:"".concat(R[0],"-").concat(R[1])}),type:"tel",onChange:this.handleChange("IBase"),onBlur:this.handleBlur("IBase")})),o.a.createElement(T.i,{item:!0,xs:12,md:6},o.a.createElement(T.C,{id:"HACBase",label:"\u516c\u79ef\u91d1\u7f34\u7eb3\u57fa\u6570(\u5143)",value:a?y:s,onChange:this.handleChange("HACBase"),onBlur:this.handleBlur("HACBase"),fullWidth:!0,disabled:a?!E:!u,helperText:o.a.createElement(q,{classes:t,city:j,label:"\u516c\u79ef\u91d1\u7f34\u7eb3\u57fa\u6570\u8303\u56f4\uff1a",value:"".concat(A[0],"-").concat(A[1])}),type:"tel"})),o.a.createElement(T.i,{item:!0,xs:12,md:6},o.a.createElement(T.C,{id:"additional",label:"\u4e13\u9879\u9644\u52a0\u6263\u9664(\u5143/\u6708)",value:a?O:l,onChange:this.handleChange("additional"),fullWidth:!0,type:"tel",helperText:"*\u4e13\u9879\u9644\u52a0\u6263\u9664\u8bf7\u5728\u4e2a\u4eba\u6240\u5f97\u7a0eAPP\u4e2d\u7533\u62a5\u67e5\u770b"})),o.a.createElement(T.i,{item:!0,xs:12,md:6},o.a.createElement(T.h,{control:o.a.createElement(T.c,{value:"checkProvident",checked:a?E:u,onChange:this.handleChange("checkProvident")}),label:"\u6c47\u7f34\u4f4f\u623f\u516c\u79ef\u91d1"}),o.a.createElement(T.g,{className:t.formControl,disabled:!u},o.a.createElement(T.k,{htmlFor:"HACRate"},"\u6bd4\u4f8b"),o.a.createElement(T.s,{value:a?B:d,onChange:this.handleChange("HACRate"),inputProps:{name:"HACRate",id:"HACRate"}},L.b.map(function(e){return o.a.createElement(T.o,{value:e[0],key:e[1]},e[1])})))),a&&o.a.createElement(o.a.Fragment,null,!!h&&o.a.createElement(T.i,{item:!0,xs:12,md:4},o.a.createElement(T.b,{variant:"contained",fullWidth:!0,onClick:f},"\u590d\u5236\u4e0a\u6708\u6570\u636e")),11!==h&&o.a.createElement(T.i,{item:!0,xs:12,md:4},o.a.createElement(T.b,{variant:"contained",fullWidth:!0,color:"secondary",onClick:I},"\u4e0b\u4e2a\u6708")),o.a.createElement(T.i,{item:!0,xs:12,md:4},o.a.createElement(T.b,{variant:"contained",fullWidth:!0,color:"primary",onClick:this.handleMonthCal},"\u67e5\u770b\u672c\u6708\u4e2a\u7a0e"))),!a&&o.a.createElement(T.i,{item:!0,xs:12,md:4},o.a.createElement(T.b,{variant:"contained",fullWidth:!0,color:"primary",type:"submit"},"\u8ba1\u7b97")))}}]),t}(c.Component),$=Object(u.withStyles)(function(e){return{span:{color:N.a[500]},btnLabel:{justifyContent:"flex-start"},formControl:{marginLeft:e.spacing.unit}}})(Y),z=function(e){return function(t){t({type:"COMPUTE",payload:e}),localStorage.setItem("result",JSON.stringify(e))}},X=function(e){return function(t){t({type:"SWITCH_TYPE",payload:e}),localStorage.setItem("type",e)}},G=(n={},Object(H.a)(n,"COMPUTE",function(e,t){return Object(S.a)({},e,{result:t.payload})}),Object(H.a)(n,"SWITCH_TYPE",function(e,t){return Object(S.a)({},e,{type:t.payload})}),n),Q={type:+localStorage.getItem("type")||1,result:JSON.parse(localStorage.getItem("result"))||{aMonthTax:[]}},V=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Q,t=arguments.length>1?arguments[1]:void 0,a=G[t.type];return a?a(e,t):e},K=a(70),Z=a(52),ee=a.n(Z),te=(r={},Object(H.a)(r,"WRITE_MONTH_INPUT",function(e,t){return ee.a.$merge(e,["data",e.month],t.payload)}),Object(H.a)(r,"SELECT_MONTH",function(e,t){return ee.a.$set(e,"month",t.payload)}),Object(H.a)(r,"NEXT_MONTH",function(e){return ee.a.$set(e,"month",e.month+1)}),Object(H.a)(r,"COPY",function(e){return ee.a.$merge(e,["data",e.month],e.data[e.month-1])}),r),ae=+localStorage.getItem("cityIdx")||0,ne={month:+localStorage.getItem("month")||0,data:JSON.parse(localStorage.getItem("data"))||new Array(12).fill({monthIncome:"",insurance:"",IBase:"",HACBase:"",additional:"",checkProvident:!0,HACRate:L.c[ae].HACRates[0]})},re=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ne,t=arguments.length>1?arguments[1]:void 0,a=te[t.type];return a?a(e,t):e},ce={compute:z,switchType:X,writeInput:K.d,writeMonthInput:function(e){return function(t,a){t(function(e){return{type:"WRITE_MONTH_INPUT",payload:e}}(e)),localStorage.setItem("data",JSON.stringify(a().monthInput.data))}},selectMonth:function(e){return function(t){t(function(e){return{type:"SELECT_MONTH",payload:e}}(e)),localStorage.setItem("month",e)}},nextMonth:function(){return function(e,t){e({type:"NEXT_MONTH"}),localStorage.setItem("month",t().monthInput.month)}},copy:function(){return function(e,t){e({type:"COPY"}),localStorage.setItem("data",JSON.stringify(t().monthInput.data))}}},oe=Object(W.a)(Object(O.b)(function(e){return Object(S.a)({},e.input,{monthInput:e.monthInput,result:e.calc.result})},ce)($)),ie={forward:"\u5e94\u53d1\u5e74\u7ec8\u5956(\u5143)",reverse:"\u7a0e\u540e\u6240\u5f97(\u5143)"},se=function(e){function t(){var e,a;Object(x.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(R.a)(this,(e=Object(A.a)(t)).call.apply(e,[this].concat(r)))).state={mode:"forward",bonus:""},a.handleChange=function(e){return function(t){a.setState(Object(H.a)({},e,t.target.value))}},a.handleClick=function(e){var t=a.state,n=t.bonus,r=t.mode;n&&(e.preventDefault(),a.props.history.push("/result"),a.props.switchType(2),a.props.compute(Object(D.a)(+n,"forward"===r)))},a}return Object(w.a)(t,e),Object(j.a)(t,[{key:"render",value:function(){var e=this.state,t=e.mode,a=e.bonus;return o.a.createElement(T.i,{container:!0,spacing:24,component:"form",justify:"flex-end"},o.a.createElement(T.i,{item:!0,xs:12},o.a.createElement(T.r,{name:"mode",value:this.state.mode,onChange:this.handleChange("mode"),row:!0},o.a.createElement(T.h,{value:"forward",control:o.a.createElement(T.q,null),label:"\u6b63\u7b97\u7a0e\u540e"}),o.a.createElement(T.h,{value:"reverse",control:o.a.createElement(T.q,null),label:"\u53cd\u63a8\u7a0e\u524d"}))),o.a.createElement(T.i,{item:!0,xs:12},o.a.createElement(T.C,{required:!0,id:"bonus",label:ie[t],fullWidth:!0,type:"tel",value:a,onChange:this.handleChange("bonus")})),o.a.createElement(T.i,{item:!0,xs:12,md:4},o.a.createElement(T.b,{variant:"contained",fullWidth:!0,color:"primary",type:"submit",onClick:this.handleClick},"\u8ba1\u7b97")))}}]),t}(c.Component),le=Object(u.withStyles)(function(e){return{}})(se),ue={compute:z,switchType:X},de=Object(W.a)(Object(O.b)(function(e){return{}},ue)(le)),me=function(e){function t(){var e,a;Object(x.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(R.a)(this,(e=Object(A.a)(t)).call.apply(e,[this].concat(r)))).state={value:0},a.handleChange=function(e,t){a.setState({value:t})},a.handleChangeIndex=function(e){a.setState({value:e})},a}return Object(w.a)(t,e),Object(j.a)(t,[{key:"render",value:function(){var e=this.props,t=e.classes,a=e.theme,n=e.matchesDwonSm;return o.a.createElement("div",{className:t.root},o.a.createElement(T.a,{position:"static",color:"default"},o.a.createElement(T.B,{value:this.state.value,onChange:this.handleChange,indicatorColor:"primary",textColor:"primary",variant:n?"fullWidth":"standard"},o.a.createElement(T.v,{label:"\u5e74\u5ea6\u4e2a\u7a0e"}),o.a.createElement(T.v,{label:"\u5e74\u7ec8\u5956"}))),o.a.createElement(k.a,{axis:"rtl"===a.direction?"x-reverse":"x",index:this.state.value,onChangeIndex:this.handleChangeIndex},o.a.createElement("main",{className:t.layout},o.a.createElement(T.p,{className:t.paper,elevation:2},o.a.createElement(oe,null))),o.a.createElement("main",{className:t.layout},o.a.createElement(T.p,{className:t.paper,elevation:2},o.a.createElement(de,null)))))}}]),t}(c.Component),he=Object(u.withStyles)(function(e){return{root:{flexGrow:1},layout:Object(H.a)({width:"auto",marginLeft:2*e.spacing.unit,marginRight:2*e.spacing.unit},e.breakpoints.up(600+2*e.spacing.unit*2),{width:600,marginLeft:"auto",marginRight:"auto"}),paper:Object(H.a)({marginTop:3*e.spacing.unit,marginBottom:3*e.spacing.unit,padding:2*e.spacing.unit},e.breakpoints.up(600+3*e.spacing.unit*2),{marginTop:6*e.spacing.unit,marginBottom:6*e.spacing.unit,padding:3*e.spacing.unit})}},{withTheme:!0})(me),pe=function(e){function t(){return Object(x.a)(this,t),Object(R.a)(this,Object(A.a)(t).apply(this,arguments))}return Object(w.a)(t,e),Object(j.a)(t,[{key:"componentDidUpdate",value:function(e){this.props.location!==e.location&&window.scrollTo(0,0)}},{key:"render",value:function(){return this.props.children}}]),t}(c.Component),Ie=Object(W.a)(pe),fe=a(35),be=a(171),ve=function(e){return Object(fe.c)(Object(S.a)({calc:V,input:K.a,monthInput:re},e))},ge=ve,Ce=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=[be.a],a=fe.d;var n=Object(fe.e)(ge(),e,a.apply(void 0,[fe.a.apply(void 0,t)].concat([])));return n.asyncReducers={},n}(),ye=Object(c.lazy)(function(){return a.e(3).then(a.bind(null,5639))}),Ee=Object(c.lazy)(function(){return a.e(4).then(a.bind(null,5640))});var Be=Object(u.withTheme)()(function(e){var t=e.theme,a=Object(l.unstable_useMediaQuery)(t.breakpoints.down("sm"));return o.a.createElement(y.a,null,o.a.createElement(c.Suspense,{fallback:o.a.createElement(p.a,null)},o.a.createElement(E.a,{exact:!0,path:"/",render:function(e){return o.a.createElement(he,Object.assign({},e,{matchesDwonSm:a}))}}),o.a.createElement(E.a,{path:"/result",render:function(e){return o.a.createElement(ye,e)}}),o.a.createElement(E.a,{path:"/city",render:function(e){return o.a.createElement(Ee,e)}})))}),Oe=Object(u.createMuiTheme)({typography:{useNextVariants:!0},palette:{primary:f.a,secondary:v.a,error:C.a,contrastThreshold:3,tonalOffset:.2}});a(5629);var xe=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function je(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var a=e.installing;null!=a&&(a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See http://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}s.a.render(o.a.createElement(function(){return o.a.createElement(u.MuiThemeProvider,{theme:Oe},o.a.createElement(m.a,null),o.a.createElement(O.a,{store:Ce},o.a.createElement(B.a,{basename:"/personal-income-tax-calculator/"},o.a.createElement(Ie,null,o.a.createElement(Be,null)))))},null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/personal-income-tax-calculator",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("/personal-income-tax-calculator","/service-worker.js");xe?(function(e,t){fetch(e).then(function(a){var n=a.headers.get("content-type");404===a.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):je(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit http://bit.ly/CRA-PWA")})):je(t,e)})}}()},70:function(e,t,a){"use strict";a.d(t,"c",function(){return i}),a.d(t,"b",function(){return s}),a.d(t,"d",function(){return l});var n,r=a(16),c=a(21),o=a(25),i=function(e){return{type:"WRITE_INPUT",payload:e}},s=function(e){return function(t,a){t(function(e){return{type:"SWITCH_CITY",payload:e}}(e)),localStorage.setItem("cityIdx",e)}},l=function(e){return function(t,a){t(i(e)),localStorage.setItem("mode",a().input.mode)}},u=(n={},Object(r.a)(n,"WRITE_INPUT",function(e,t){return Object(c.a)({},e,t.payload)}),Object(r.a)(n,"SWITCH_CITY",function(e,t){return Object(c.a)({},e,{cityIdx:t.payload})}),n),d=+localStorage.getItem("cityIdx")||0,m="true"===localStorage.getItem("mode")||!1,h={monthIncome:"",insurance:"",IBase:"",HACBase:"",additional:"",checkProvident:!0,HACRate:o.c[d].HACRates[0],cityIdx:d,mode:m};t.a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h,t=arguments.length>1?arguments[1]:void 0,a=u[t.type];return a?a(e,t):e}}},[[5448,1,2]]]);