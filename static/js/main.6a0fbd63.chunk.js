(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{164:function(e,t,a){e.exports=a(389)},169:function(e,t,a){},389:function(e,t,a){"use strict";a.r(t);var l=a(0),n=a.n(l),i=a(17),r=a.n(i),c=a(93),o=a(153),s=a(154),d=a(162),m=a(155),u=a(39),b=a(163),g=(a(169),a(41)),y=a.n(g),p=a(40),h=a(158),k=a(92),v=(a(370),a(159)),f=(a(371),a(160)),D={apiKey:"AIzaSyCzenI1WpO2JBbltc3ARFKTCJyUumY-zkk",authDomain:"rbtrack-ab0e9.firebaseapp.com",databaseURL:"https://rbtrack-ab0e9.firebaseio.com",projectId:"rbtrack-ab0e9",storageBucket:"rbtrack-ab0e9.appspot.com",messagingSenderId:"381452575978",appId:"1:381452575978:web:9999b9c4b6d38967"},S=[{label:"",value:null},{label:"Stay",value:"stay"},{label:"Walk",value:"walk"},{label:"Car",value:"car"},{label:"Bike",value:"bike"},{label:"e-Bike",value:"e-bike"},{label:"Scooter",value:"scooter"},{label:"e-Scooter",value:"e-scooter"},{label:"e-Board",value:"rb"},{label:"e-Board Bad Road",value:"rb-bad"}],x=[{label:"id",key:"id"},{label:"x1",key:"x1"},{label:"x2",key:"x2"},{label:"x3",key:"x3"},{label:"x4",key:"x4"},{label:"x5",key:"x5"},{label:"x6",key:"x6"},{label:"x7",key:"x7"},{label:"x8",key:"x8"},{label:"x9",key:"x9"},{label:"x10",key:"x10"},{label:"x11",key:"x11"},{label:"x12",key:"x12"},{label:"x13",key:"x13"},{label:"x14",key:"x14"},{label:"x15",key:"x15"},{label:"y1",key:"y1"},{label:"y2",key:"y2"},{label:"y3",key:"y3"},{label:"y4",key:"y4"},{label:"y5",key:"y5"},{label:"y6",key:"y6"},{label:"y7",key:"y7"},{label:"y8",key:"y8"},{label:"y9",key:"y9"},{label:"y10",key:"y10"},{label:"y11",key:"y11"},{label:"y12",key:"y12"},{label:"y13",key:"y13"},{label:"y14",key:"y14"},{label:"y15",key:"y15"},{label:"z1",key:"z1"},{label:"z2",key:"z2"},{label:"z3",key:"z3"},{label:"z4",key:"z4"},{label:"z5",key:"z5"},{label:"z6",key:"z6"},{label:"z7",key:"z7"},{label:"z8",key:"z8"},{label:"z9",key:"z9"},{label:"z10",key:"z10"},{label:"z11",key:"z11"},{label:"z12",key:"z12"},{label:"z13",key:"z13"},{label:"z14",key:"z14"},{label:"z15",key:"z15"},{label:"label",key:"label"}],z=Object(p.withScriptjs)(Object(p.withGoogleMap)(function(e){return n.a.createElement(p.GoogleMap,{defaultZoom:16,defaultCenter:{lat:45.757855,lng:21.228995}},e.isMarkerShown&&e.markers)})),E=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(d.a)(this,Object(m.a)(t).call(this,e))).state={locations:[],loading:!1,selectedActionAtPoint:null,csvData:null,drawMap:!1,selectedList:[]},a.csvFileName="RBStats.csv",a._updatePoints=a._updatePoints.bind(Object(u.a)(a)),a._deletePoints=a._deletePoints.bind(Object(u.a)(a)),a}return Object(b.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){this.db=f.initializeApp(D);var e=new Date,t=e.getDate()+"-"+(e.getMonth()+1)+"-"+e.getFullYear();this.csvFileName="RBStats-"+t+".csv",this._reloadFirebaseData()}},{key:"_reloadFirebaseData",value:function(){var e=this;this.setState({loading:!0}),this.db.firestore().collection("geo_points").get().then(function(t){var a=t.docs.map(function(e){return Object(c.a)({},e.data(),{id:e.id})});e.setState({loading:!1,locations:a,drawMap:!0}),e._createCSVData(a)}).catch(function(t){e.setState({loading:!1,locations:[],drawMap:!0}),console.log("error:",t)})}},{key:"_createCSVData",value:function(e){var t=[];e.forEach(function(e){e.label&&t.push({id:String(e.accelerometerData[0].id),x1:String(e.accelerometerData[0].x),x2:String(e.accelerometerData[1].x),x3:String(e.accelerometerData[2].x),x4:String(e.accelerometerData[3].x),x5:String(e.accelerometerData[4].x),x6:String(e.accelerometerData[5].x),x7:String(e.accelerometerData[6].x),x8:String(e.accelerometerData[7].x),x9:String(e.accelerometerData[8].x),x10:String(e.accelerometerData[9].x),x11:String(e.accelerometerData[10].x),x12:String(e.accelerometerData[11].x),x13:String(e.accelerometerData[12].x),x14:String(e.accelerometerData[13].x),x15:String(e.accelerometerData[14].x),y1:String(e.accelerometerData[0].y),y2:String(e.accelerometerData[1].y),y3:String(e.accelerometerData[2].y),y4:String(e.accelerometerData[3].y),y5:String(e.accelerometerData[4].y),y6:String(e.accelerometerData[5].y),y7:String(e.accelerometerData[6].y),y8:String(e.accelerometerData[7].y),y9:String(e.accelerometerData[8].y),y10:String(e.accelerometerData[9].y),y11:String(e.accelerometerData[10].y),y12:String(e.accelerometerData[11].y),y13:String(e.accelerometerData[12].y),y14:String(e.accelerometerData[13].y),y15:String(e.accelerometerData[14].y),z1:String(e.accelerometerData[0].z),z2:String(e.accelerometerData[1].z),z3:String(e.accelerometerData[2].z),z4:String(e.accelerometerData[3].z),z5:String(e.accelerometerData[4].z),z6:String(e.accelerometerData[5].z),z7:String(e.accelerometerData[6].z),z8:String(e.accelerometerData[7].z),z9:String(e.accelerometerData[8].z),z10:String(e.accelerometerData[9].z),z11:String(e.accelerometerData[10].z),z12:String(e.accelerometerData[11].z),z13:String(e.accelerometerData[12].z),z14:String(e.accelerometerData[13].z),z15:String(e.accelerometerData[14].z),label:e.label})}),this.setState({csvData:t})}},{key:"_deletePoints",value:function(){var e=this;Object(v.confirmAlert)({title:"Are you sure?",message:"This will remove all the points that have been assigned labels. Please make sure you have downloaded a .cvs file before deleting points.",buttons:[{label:"Yes",onClick:function(){var t=[];e.state.locations.forEach(function(a){if(a.label){var l=e.db.firestore().collection("geo_points").doc(a.id);t.push(l.delete())}}),Promise.all(t).then(function(){e.setState({selectedList:[],selectedActionAtPoint:null,locations:[]}),e._reloadFirebaseData()})}},{label:"No"}]})}},{key:"_updatePoints",value:function(){var e=this;if(this.state.selectedActionAtPoint){this.setState({loading:!0});var t=[];this.state.selectedList.forEach(function(a){var l=e.state.locations.find(function(e){return e.id===a}),n=e.db.firestore().collection("geo_points").doc(l.id),i=Object(c.a)({},l,{label:e.state.selectedActionAtPoint.value});t.push(n.update(i))}),Promise.all(t).then(function(){e.setState({selectedList:[],selectedActionAtPoint:null,locations:[]}),e._reloadFirebaseData()})}else alert(" Please select an action did at a location. ")}},{key:"_selectDeselectMarker",value:function(e){var t=this.state.locations.find(function(t){return t.id===e.id}),a=[];if(t.label)a.push(t.id);else if(this.state.selectedList.includes(e.id)){var l=this.state.selectedList.indexOf(e.id);l>-1&&this.state.selectedList.splice(l,1),a=this.state.selectedList}else this.state.selectedList.push(e.id),a=this.state.selectedList;this.setState({drawMap:!0,selectedList:a})}},{key:"_renderDownloadCSVButton",value:function(){return this.state.csvData?n.a.createElement("div",{id:"downloadDiv"},n.a.createElement(h.CSVLink,{style:{margin:12},data:this.state.csvData,filename:this.csvFileName,headers:x},"Download .CSV"),n.a.createElement("p",null,"After the download please upload the file to Reactive Boards Google Drive."),n.a.createElement(y.a,{variant:"danger",onClick:this._deletePoints,style:{hight:60,width:200,marginTop:16,marginBottom:16,marginRight:32}},"Delete Points")):null}},{key:"_renderPoints",value:function(){var e=this;return this.state.locations.map(function(t){var a;switch(t.label){case"stay":a="http://maps.google.com/mapfiles/kml/paddle/wht-square-lv.png";break;case"walk":a="http://maps.google.com/mapfiles/kml/paddle/wht-blank-lv.png";break;case"car":a="http://maps.google.com/mapfiles/kml/paddle/wht-circle-lv.png";break;case"bike":a="http://maps.google.com/mapfiles/kml/paddle/purple-circle-lv.png";break;case"e-bike":a="http://maps.google.com/mapfiles/kml/paddle/purple-square-lv.png";break;case"scooter":a="http://maps.google.com/mapfiles/kml/paddle/blu-circle-lv.png";break;case"e-scooter":a="http://maps.google.com/mapfiles/kml/paddle/blu-stars-lv.png";break;case"rn":a="http://maps.google.com/mapfiles/kml/paddle/grn-diamond-lv.png";break;case"rb-bad":a="http://maps.google.com/mapfiles/kml/paddle/red-diamond-lv.png";break;default:a=null}return null===a&&(a="http://maps.google.com/mapfiles/ms/icons/red-dot.png",e.state.selectedList.includes(t.id)&&(a="http://maps.google.com/mapfiles/kml/paddle/orange-circle.png")),n.a.createElement(p.Marker,{position:{lat:t.latitude,lng:t.longitude},onClick:function(){e._selectDeselectMarker(t)},name:"Test",title:"Test marker",key:t.id,icon:{url:a}})})}},{key:"_renderSelectedPoint",value:function(){var e=this;if(1===this.state.selectedList.length){var t=this.state.locations.find(function(t){return t.id===e.state.selectedList[0]});return t.label?n.a.createElement("div",{style:{display:"flex",flex:1,flexDirection:"column",margin:12}},n.a.createElement("label",null,"Latitude: ",t.latitude," "),n.a.createElement("label",null,"Longitude: ",t.longitude," "),n.a.createElement("label",null,"Accuracy: ",t.accuracy," "),n.a.createElement("br",null),n.a.createElement("label",null,"UniqueId: ",t.uniqueId," "),n.a.createElement("label",null,"Manufacturer: ".concat(t.manufacturer)),n.a.createElement("label",null,"Action did at location: ",n.a.createElement("b",null,t.label))):n.a.createElement("div",{style:{display:"flex",flex:1,flexDirection:"column",margin:12}},n.a.createElement("label",null,"Latitude: ",t.latitude," "),n.a.createElement("label",null,"Longitude: ",t.longitude," "),n.a.createElement("label",null,"Accuracy: ",t.accuracy," "),n.a.createElement("br",null),n.a.createElement("label",null,"UniqueId: ",t.uniqueId," "),n.a.createElement("label",null,"Manufacturer: ".concat(t.manufacturer)),n.a.createElement("label",null,"Select action did at location : "),n.a.createElement(k.a,{options:S,onChange:function(t){console.log("  value:",t),e.setState({selectedActionAtPoint:t})}}),n.a.createElement(y.a,{variant:"primary",onClick:this._updatePoints,style:{hight:60,width:200,display:"flex",flex:1,marginTop:16,marginBottom:16}},"Update"))}return this.state.selectedList.length>1?n.a.createElement("div",{style:{display:"flex",flex:1,flexDirection:"column",margin:12}},n.a.createElement("label",null,"Select ",this.state.selectedList.length," points"),n.a.createElement("label",null,"Select action did at locations : "),n.a.createElement(k.a,{options:S,onChange:function(t){console.log("  value:",t),e.setState({selectedActionAtPoint:t})}}),n.a.createElement(y.a,{variant:"primary",onClick:this._updatePoints,style:{hight:60,width:200,display:"flex",flex:1,marginTop:16,marginBottom:16}},"Update All")):null}},{key:"_renderMap",value:function(){return!0===this.state.drawMap?n.a.createElement(z,{isMarkerShown:!0,googleMapURL:"https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",loadingElement:n.a.createElement("div",{style:{height:"100%"}}),containerElement:n.a.createElement("div",{style:{height:"100%"}}),mapElement:n.a.createElement("div",{style:{height:"100%"}}),markers:this._renderPoints()}):null}},{key:"render",value:function(){var e=this;return n.a.createElement("div",{id:"mainDiv"},n.a.createElement("div",{id:"headerDiv"}),n.a.createElement("div",{id:"rowDiv"},n.a.createElement("div",{id:"mapDiv"},this._renderMap()),n.a.createElement("div",{id:"statsDiv"},n.a.createElement("h3",{align:"center"}," Selected Point "),this._renderSelectedPoint())),n.a.createElement("div",{id:"reloadDiv"},n.a.createElement(y.a,{variant:"secondary",disabled:this.state.loading,onClick:function(){e._reloadFirebaseData()},style:{margin:12}},"Reload"),n.a.createElement("label",null,this.state.loading?"loading...":"not loading")),this._renderDownloadCSVButton())}}]),t}(l.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(n.a.createElement(E,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[164,1,2]]]);
//# sourceMappingURL=main.6a0fbd63.chunk.js.map