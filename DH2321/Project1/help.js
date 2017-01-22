
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
			var data = [
					  [//iPhone
						{axis:"IVIS",value:7},
						{axis:"Stats",value:3},
						{axis:"Math",value:3},
						{axis:"Art",value:9},
						{axis:"User",value:6},
						{axis:"Prog",value:2},
						{axis:"Graphics",value:1},
						{axis:"HCI",value:4},
						{axis:"UX",value:8}				
					  ],[//Samsung
						{axis:"IVIS",value:5},
						{axis:"Stats",value:4},
						{axis:"Math",value:3},
						{axis:"Art",value:6},
						{axis:"User",value:7},
						{axis:"Prog",value:3},
						{axis:"Graphics",value:1},
						{axis:"HCI",value:4},
						{axis:"UX",value:8}
					  ],[//Nokia Smartphone
						{axis:"IVIS",value:3},
						{axis:"Stats",value:3},
						{axis:"Math",value:3},
						{axis:"Art",value:3},
						{axis:"User",value:8},
						{axis:"Prog",value:8},
						{axis:"Graphics",value:3},
						{axis:"HCI",value:3},
						{axis:"UX",value:3}
					  ]
					];
var radarNameList;
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
		a++;
	}
	ret+=" <tr onclick=\"showPerson(\'Uruk\', 74)\"><td>74</td><td>Uruk</td><td>5</td><td>8</td><td>7</td><td>7</td><td>9</td><td>9</td><td>8</td><td>7</td><td>7</td></tr>";
	document.getElementById("tableData").innerHTML = ret;
	startTheRadar()
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
	document.getElementById("person").innerHTML = "<h1>" + row + " " + name + "</h1>" + first + "<br><br><br>" + second + "		<br><button type=\"button\" onclick=\"addData(\'a\', "+ dataFormated +")\">Click to add!</button>"
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
				.range(["#EDC951","#CC333F","#00A0B0"]);
				
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

function addData(name, da){
	console.log(1);
	var a = [//Nokia Smartphone
						{axis:"IVIS",value:1},
						{axis:"Stats",value:7},
						{axis:"Math",value:5},
						{axis:"Art",value:10},
						{axis:"User",value:4},
						{axis:"Prog",value:7},
						{axis:"Graphics",value:5},
						{axis:"HCI",value:1},
						{axis:"UX",value:10}
					  ];
	data.push(a);
	startTheRadar();
}

function removeData(name){
	var index = radarNameList.indexOf(name);
	if(index > -1){
		data.splice(index, 1);
		startTheRadar();
	}
}