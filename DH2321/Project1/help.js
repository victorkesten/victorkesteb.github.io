
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
var data = [
		  [//iPhone
			{axis:"IVIS",value:0},
			{axis:"Stats",value:0},
			{axis:"Math",value:0},
			{axis:"Art",value:0},
			{axis:"User",value:0},
			{axis:"Prog",value:0},
			{axis:"Graphics",value:0},
			{axis:"HCI",value:0},
			{axis:"UX",value:0}				
		  ]
		];
var statsForEveryone = [];
var radarRowList = [];
var radarNameList = [];
function tableFix(){

	var str = document.getElementById("tableData").innerHTML.trim();
	var ret = '';
	var a = 0;
	var name = '';
	while(a < 73){
		var sta = str.substring(0, str.indexOf("\n")).trim();
		var ind = sta.substring(14); 
		name = sta.substring(ind.indexOf("<td>")+18, ind.indexOf("</td>")+14);

		ret += "<tr onclick=\"showPerson(\'"+ name +"\', " + (a+1) + ")\">"+sta.substring(4);
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
}


function showPerson(name, row){
	console.log(name, row);
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


	var dataFormated = "0";
	document.getElementById("person").innerHTML = "<h1>" + row + " " + name + "</h1>" + first + "<br><br><br>" + second + "	<br><button type=\"button\" onclick=\"addData('" + name +"', "+ row +")\">Click to add!</button>" + " <br><button type=\"button\" onclick=\"removeData("+ row +")\">Click to remove!</button>";
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
			RadarChart(".radarChart", data, radarChartOptions);
}
var initCheck = true;
function addData(name, row){
	var tempAr = statsForEveryone[row-1];
	console.log(tempAr);
	if(initCheck){
		data.pop();
		initCheck = false;
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
	data.push(a);
	radarRowList.push(row);
	radarNameList.push(name);
	var legendString = "";
	for(var i = 0; i < radarNameList.length; i++){
		legendString += radarNameList[i] + "<br>";
	}
	document.getElementById("legend").innerHTML = legendString;
	startTheRadar();
}

function removeData(row){
	var index = radarRowList.indexOf(row);
	if(index > -1){
		data.splice(index, 1);
		index = radarRowList.indexOf(row);
		radarRowList.splice(index, 1);
		radarNameList.splice(index, 1);
		if(data.length == 0){
			data.push(nullElement);
			initCheck = true;
		}

		var legendString = "";
		for(var i = 0; i < radarNameList.length; i++){
			legendString += radarNameList[i] + "<br>";
		}
		document.getElementById("legend").innerHTML = legendString;
		startTheRadar();
	}
}