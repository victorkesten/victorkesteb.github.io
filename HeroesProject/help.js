$(document).ready(function () {
	d3.xml("1.xml", function (data){
		// console.log(data.documentElement.getElementsByTagName)";
		// console.log(data.documentElement.getElementsByTagName("game")[0].getElementsByTagName("name"));
		console.log(data.documentElement.getElementsByTagName("tournament")[0].getAttribute("name"));
		var i = 0;
		var j = 0;
		var text = data.documentElement.getElementsByTagName("tournament")[0].getElementsByTagName("player");

		for(i = 0; i < text.length; i++){
			if(text[i].getElementsByTagName("hero")[0].innerHTML == "Greymane" && text[i].getElementsByTagName("pick")[0].innerHTML == 1){
				console.log("HURRA");
			}
		}
	})


	d3.json("2.json", function (data){
		console.log(data.match[0]);

		// data.match[0];

	})
})

//https://www.w3schools.com/xml/xml_parser.asp
//https://www.w3schools.com/xml/dom_intro.asp
//https://www.w3schools.com/jsref/met_element_queryselectorall.asp	
//https://www.w3schools.com/jsref/dom_obj_all.asp