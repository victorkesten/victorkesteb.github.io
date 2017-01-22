

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

	document.getElementById("person").innerHTML = "<h1>" + row + " " + name + "</h1>" + first + "<br><br><br>" + second;
}