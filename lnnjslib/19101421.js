/*
dateformat.js
*/
var LNN_DATE_FORMAT={
yyyy:"zeroizeLNN(this.getFullYear(),4)",
yy:"zeroizeLNN(this.getFullYear())",
M:"this.getMonth()+1",
MM:"zeroizeLNN(this.getMonth()+1)",
MMM:"['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][this.getMonth()]",
MMMM:"['January','February','March','April','May','June','July','August','September','October','November','December'][this.getMonth()]",
d:"this.getDate()",
dd:"zeroizeLNN(this.getDate())",
ddd:"['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][this.getDay()]",
dddd:"['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][this.getDay()]",
h:"this.getHours()%12||12",
hh:"zeroizeLNN(this.getHours()%12||12)",
H:"this.getHours()",
HH:"zeroizeLNN(this.getHours())",
t:"this.getHours()<12?'a':'p'",
tt:"this.getHours()<12?'am':'pm'",
T:"this.getHours()<12?'A':'P'",
TT:"this.getHours()<12?'AM':'PM'",
m:"this.getMinutes()",
mm:"zeroizeLNN(this.getMinutes())",
s:"this.getSeconds()",
ss:"zeroizeLNN(this.getSeconds())",
l:"this.getMilliseconds()",
L:"zeroizeLNN(this.getMilliseconds(),3).substr(0,1)",
LL:"zeroizeLNN(this.getMilliseconds(),3).substr(0,2)",
LLL:"zeroizeLNN(this.getMilliseconds(),3).substr(0,3)",
ZZ:"zeroizeLNN(-Math.floor(this.getTimezoneOffset()/60),false,true)",
ZZZ:"zeroizeLNN(-Math.floor(this.getTimezoneOffset()/60),2,true)",
zz:"zeroizeLNN(-this.getTimezoneOffset()%60)"
},
zeroizeLNN=function(num,len,sign){
if(!len)len=2;
num=Math.floor(num);
var str=Math.abs(num).toString();
if(len!==false){
if(str.length>len)str=str.substr(-len);
else while(str.length<len)str="0"+str;
}
if(sign)str=(num<0?"-":"+")+str;
return str;
};

Date.prototype.formatLNN=function(fmt){
var c=0,s="",ls="",ss="",out="";
for(;c<=fmt.length;c++){
ls=s,s=fmt[c];
if(s=="\\")c++;
else if(s==ls||!ss){
ss+=s;
continue;
}
if(ss in LNN_DATE_FORMAT)out+=eval(LNN_DATE_FORMAT[ss]);
else out+=ss;
if(s=="\\")out+=fmt[c],ss="";
else ss=s;
}
return out;
}




/*
getelement.js
*/
function getElementsLNN(){return Array.prototype.map.call(document.querySelectorAll("*[id]"),function(e){return window[e.id]=e})}
function $$$(id){return window[id]=document.getElementById(id)}
function $$(arg){return Array.prototype.map.call(typeof arg.length=="number"?arg:arguments,$$$)}





/*
random.js
*/
function randLNN(){
return Math.random();
}
function randBetweenLNN(from,to){
return Math.floor(Math.random()*(to-from))+from;
}

Object.defineProperty(Array.prototype,"randItemLNN",{value:function(){
return this[randBetweenLNN(0,this.length)];
},enumerable: false});

Object.defineProperty(Array.prototype,"randSortLNN",{value:function(){
var arr=[],i=0;
for(;i<this.length;i++){
arr.push({r:randLNN(),v:this[i]});
}
arr.sort(Array.prototype.randSortLNN.sortFunc);
for(i=0;i<this.length;i++){
this[i]=arr[i].v;
}
},enumerable: false});

Array.prototype.randSortLNN.sortFunc=function(a,b){
return a.r-b.r;
};




/*
xhrutil.js
*/
var XHRUtilLNN={
get:function(url,query,noCache,callback){
if(callback===null)callback=Function.prototype;
var xhr=new XMLHttpRequest();
if(query)url+=(url.match("\\?")?"&":"?")+query;
if(noCache)url+=(url.match("\\?")?"&":"?")+"xhrutillnntime="+Date.now();
var hcb=typeof callback=="function";
xhr.open("get",url,hcb);
if(hcb){
xhr.onload=function(event){
callback(true,event,xhr);
},
xhr.onerror=function(event){
callback(false,event,xhr);
};
}
xhr.send();
return xhr;
},
post:function(url,data,callback){
if(callback===null)callback=Function.prototype;
var xhr=new XMLHttpRequest(),
hcb=typeof callback=="function",d=null;
if(data instanceof FormData)d=data;
else{
d=new FormData();
for(var i in data){
d.append(i,data[i]);
}
}
xhr.open("post",url,hcb);
if(hcb){
xhr.onload=function(event){
callback(true,event,xhr);
},
xhr.onerror=function(event){
callback(false,event,xhr);
};
}
xhr.send(d);
return xhr;
}
};
