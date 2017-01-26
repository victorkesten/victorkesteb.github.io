
////////////////////////////////////////////////////////////// 
////////////////////////// Data ////////////////////////////// 
////////////////////////////////////////////////////////////// 
//IVIS
//Stats
//Math
//Art
//User
//Prog
//Graphics
//HCI
//UX
var nullElement =  [//iPhone
			{axis:"IVIS",value:0},
			{axis:"Stats",value:0},
			{axis:"Math",value:0},
			{axis:"Art",value:0},
			{axis:"User",value:0},
			{axis:"Prog",value:0},
			{axis:"Graphics",value:0},
			{axis:"HCI",value:0},
			{axis:"UX",value:0}				
		  ];
// var data = [
// 			[
// 		 	 [
// 				{axis:"IVIS",value:0},
// 				{axis:"Stats",value:0},
// 				{axis:"Math",value:0},
// 				{axis:"Art",value:0},
// 				{axis:"User",value:0},
// 				{axis:"Prog",value:0},
// 				{axis:"Graphics",value:0},
// 				{axis:"HCI",value:0},
// 				{axis:"UX",value:0}				
// 		  	]
// 		  ]
// 		];
var data;
var statsForEveryone = [];
var radarRowList = [[]];
var radarNameList = [[]];


var groupSelected = 0;
var groupSizes = [0,0,0,0,0,0,0,0,0,0];
var groupColors = ["#ff7373","#ffc0cb","d3ffce","#e6e6fa","#7fffd4","#ffa500","#b0e0e6","#008080","#00ff00", "#ff00ff"];
var initChecks;


function tableFix(){
	data = new Array(10);
	radarRowList = new Array(10);
	radarNameList = new Array(10);
	initChecks = new Array(10);
	for (var t = 0; t < 10; t++) {
		initChecks[t] = true;
	  data[t] = new Array(1);
	  radarNameList[t] = [];
	  radarRowList[t] = new Array(1);
	  data[t][0] = nullElement;
	}

	//console.log(data);
	//console.log(data[groupSelected]);
	var str = document.getElementById("tableData").innerHTML.trim();
	var ret = '';
	var a = 0;
	var name = '';
	while(a < 73){
		var sta = str.substring(0, str.indexOf("\n")).trim();
		var ind = sta.substring(14); 
		name = sta.substring(ind.indexOf("<td>")+18, ind.indexOf("</td>")+14);

		ret += "<tr id=\"p"+(a+1)+"\" onclick=\"showPerson(\'"+ name +"\', " + (a+1) + ")\">"+sta.substring(4);
		str = str.substring(str.indexOf("\n")).trim();
		var statString = [];

		var tempStr = sta.substring(ind.indexOf("<td>")+18);
		tempStr = tempStr.substring(tempStr.indexOf("<td>"));
		var x = parseInt(tempStr.substring(4,tempStr.indexOf("</td>")));
		statString.push(x);
		for(var b = 0; b < 8; b++){
			tempStr = tempStr.substring(tempStr.indexOf("</td>"));
			tempStr = tempStr.substring(tempStr.indexOf("<td>"));
			x = parseInt(tempStr.substring(4,tempStr.indexOf("</td>")));
			statString.push(x);
		}
		statsForEveryone.push(statString);
		a++;
	}
	statsForEveryone.push([5,8,7,7,9,9,8,7,7]);
	//console.log(statsForEveryone);
	ret+=" <tr onclick=\"showPerson(\'Uruk\', 74)\"><td>74</td><td>Uruk</td><td>5</td><td>8</td><td>7</td><td>7</td><td>9</td><td>9</td><td>8</td><td>7</td><td>7</td></tr>";
	document.getElementById("tableData").innerHTML = ret;
	startTheRadar();
	//console.log(document.getElementById("left").offsetWidth);
	//console.log(document.getElementById("middle").offsetWidth);
	//console.log(document.getElementById("right").offsetWidth);
	setGroup(1);
	setCol(1);

}



function showPerson(name, row){
	//console.log(name, row);
	var htm = "";
	var first = document.getElementById("InterestHobby").innerHTML;
	var a = 0;
	while(a < 2+row){
		first = first.substring(first.indexOf("\n")).trim();
		a++;
	}
	first = first.substring(0, first.indexOf("\n")).trim();
	//console.log(first);
	var second = document.getElementById("LearnInfo").innerHTML;
	a = 0;
	while(a < 2 + row){
		second = second.substring(second.indexOf("\n")).trim();
		a++;
	}
	//console.log(second);
	second = second.substring(0, second.indexOf("\n")).trim();
	first = first.substring(8, first.length-8);
	second = second.substring(8, second.length-6);

	var bA = "initial";
	var bR = "none";
	console.log(radarRowList);
	console.log(row);
	for(var b = 0; b < 10; b++){
		for(var t = 0; t < radarRowList[b].length; t++){
			if(radarRowList[b][t] == row){
				bR = "initial";
				bA = "none";
			}
		}
	}

	var dataFormated = "0";
	document.getElementById("person").innerHTML = "<h1>" + row + " " + name + "</h1>" + first + "<br><br><br>" + second + "	<br><br><button id=\"butA"+ row +"\" style=\"display:"+bA+";\" type=\"button\" onclick=\"addData('" + name +"', "+ row +")\">Click to add!</button>" + " <button id=\"butR"+ row +"\" type=\"button\" style=\"display:"+bR+";\" onclick=\"removeData("+ row +")\">Click to remove!</button>";
}

function startTheRadar(){
	////////////////////////////////////////////////////////////// 
			//////////////////////// Set-Up ////////////////////////////// 
			////////////////////////////////////////////////////////////// 
			var margin = {top: 100, right: 100, bottom: 100, left: 100},
				width = Math.min(700, window.innerWidth - 10) - margin.left - margin.right,
				height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);
					
			
			////////////////////////////////////////////////////////////// 
			//////////////////// Draw the Chart ////////////////////////// 
			////////////////////////////////////////////////////////////// 
			var color = d3.scale.ordinal()
				.range(["#EDC951","#CC333F","#00A0B0", "#2CA25F", "#E6550D","#C51B8A", "#2C7FB8", "#636363"]);
				
			var radarChartOptions = {
			  w: width,
			  h: height,
			  margin: margin,
			  maxValue: 10,
			  levels: 5,
			  roundStrokes: true,
			  color: color
			};
			//Call function to draw the Radar chart
			RadarChart(".radarChart", data[groupSelected], radarChartOptions);
}
var clickCheck = false;
var defaultColor = ["","","","","","","","","","",""];

function setGroup(groupNo){
	document.getElementById("g"+(groupSelected+1)).style.backgroundColor = "";
	defaultColor[groupSelected] = "";
	groupSelected = groupNo - 1;
	defaultColor[groupSelected] = groupColors[groupSelected];
	clickCheck = true;
			var legendString = "";
		for(var i = 0; i < radarNameList[groupSelected].length; i++){
			legendString += radarNameList[groupSelected][i] + "<br>";
		}
		document.getElementById("legend").innerHTML = legendString;
	startTheRadar();
}

function setCol(a){
	document.getElementById("g"+a).style.backgroundColor = groupColors[a-1];
}

function unsetCol(a){
	document.getElementById("g"+a).style.backgroundColor = defaultColor[a-1];
}


function addData(name, row){
	//console.log(groupColors);
	if(data[groupSelected].length >=8){
		console.log("Max Number of people in group");
		return;
	}
	for(var i = 0; i < radarNameList.length; i++){
		if(name == radarNameList[i]){
			return;
		}
	}
	var tempAr = statsForEveryone[row-1];
	//console.log(tempAr);
	if(initChecks[groupSelected]){
		data[groupSelected].pop();
		initChecks[groupSelected] = false;
	}
	var a = [//Nokia Smartphone
						{axis:"IVIS",value:tempAr[0]},
						{axis:"Stats",value:tempAr[1]},
						{axis:"Math",value:tempAr[2]},
						{axis:"Art",value:tempAr[3]},
						{axis:"User",value:tempAr[4]},
						{axis:"Prog",value:tempAr[5]},
						{axis:"Graphics",value:tempAr[6]},
						{axis:"HCI",value:tempAr[7]},
						{axis:"UX",value:tempAr[8]}
					  ];
					  //console.log("TEsT"+data[groupSelected]);

	data[groupSelected].push(a);

	if(radarNameList[groupSelected] == null){
		radarNameList[groupSelected][0] = name;
	} else {
		radarNameList[groupSelected].push(name);
	}

	if(radarRowList[groupSelected][0] == 0){
		radarRowList[groupSelected][0] = row;
	} else {
		radarRowList[groupSelected].push(row);
	}
	//console.log(radarNameList[groupSelected]);
	//radarRowList[groupSelected].push(row);
	//radarNameList[groupSelected].push(name);
	var legendString = "";
	for(var i = 0; i < radarNameList[groupSelected].length; i++){
		legendString += radarNameList[groupSelected][i] + "<br>";
	}
	document.getElementById("legend").innerHTML = legendString;
	document.getElementById("p" + row).style.backgroundColor = groupColors[groupSelected];
	startTheRadar();
	document.getElementById("butA" + row).style.display = "none";
	document.getElementById("butR" + row).style.display = "initial";
	console.log(radarRowList[groupSelected]);
}

function removeData(row){
	var index = radarRowList[groupSelected].indexOf(row);
	if(index > -1){
		// console.log(data[groupSelected]);
		// console.log(data[groupSelected].length);
		console.log(index);
		if(data[groupSelected].length == 1){
			initChecks[groupSelected] = true;
		}
		data[groupSelected].splice(index-1, 1);
		
		console.log(data[groupSelected].length);

		index = radarRowList[groupSelected].indexOf(row);
		// console.log("CHECK");
		// console.log(radarRowList[groupSelected]);
		radarRowList[groupSelected].splice(index, 1);
		radarNameList[groupSelected].splice(index, 1);
		// console.log(radarRowList[groupSelected]);
		// console.log("afa");
		// console.log(data[groupSelected]);
		if(radarNameList[groupSelected].length == 1){
			radarNameList[groupSelected][0] = "";
		}
		if(radarRowList[groupSelected].length == 0){
			radarRowList[groupSelected][0] = 0;
		}
		// console.log(data[groupSelected].length);
		// console.log(data[groupSelected]);
		if(data[groupSelected].length == 0){
			//console.log(true);
			data[groupSelected].push(nullElement);
			initChecks[groupSelected] = true;
		}

		var legendString ="";
		for(var i = 0; i < radarNameList[groupSelected].length; i++){
			legendString += radarNameList[groupSelected][i] + "<br>";
		}
		document.getElementById("legend").innerHTML = legendString;
		document.getElementById("p" + row).style.backgroundColor = "";
		document.getElementById("butA" + row).style.display = "initial";
		document.getElementById("butR" + row).style.display = "none";
		startTheRadar();
	}
}

var bar = false;
var radar = true;
function showBar(){
	if(!bar){
		document.getElementById("bar").style.display = "initial";
		document.getElementById("rad").style.display = "none";
		bar = true;
		radar = false;
	}
}

function showRadar(){
	if(!radar){
		document.getElementById("rad").style.display = "initial";
		document.getElementById("bar").style.display = "none";
		bar = false;
		radar = true;
	}
}

function clearData(){
	radarRowList[groupSelected] = [];
	radarNameList[groupSelected] = [];
	data[groupSelected] = [];
	data[groupSelected].push(nullElement);
	initChecks[groupSelected] = true;
	document.getElementById("legend").innerHTML = "";
	startTheRadar();

}