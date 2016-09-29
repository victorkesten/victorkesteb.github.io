var ships = [];
var shipSizes = [2, 3, 3, 4, 5];

var collumn = 9;
var row = 9;

function start(){
var str = "";
for (var i = 1; i <= row; i++){
	for (var j = 1; j <= collumn; j++){
		var curr = i + "" + j;
		str = str + '<div class="cell" id=' + curr+ ' onclick="showPosition('+ curr+')"></div>';
	}
}
document.getElementById("grid").innerHTML = str;
placeShips();
}

function placeShips(){
	for(var i = 0; i < shipSizes.length; i ++){
		checkPos = true;
		var temp1 = [];
		while(checkPos){
			var dir = Math.floor((Math.random() * 2) + 1);
			var x = Math.floor((Math.random() * 9) + 1);
			var y = Math.floor((Math.random() * 9) + 1);
			if(dir == 1){
				if(shipSizes[i]<=getRows(x,y)){
					for(var j = 0; j < shipSizes[i]; j++){
						var temp = temp = (x+j)+""+y;
						ships.push(temp);
					}
					checkPos = false;
					}
			}else {
				if(shipSizes[i]<=getCollumns(x,y)){
					for(var j = 0; j < shipSizes[i]; j++){
						var temp = temp = x +""+(y+j);
						ships.push(temp);
					}
					checkPos = false;
					}	
			}	
		}
		console.log(ships);
}
}

function getCollumns(x,y){
	var counter = 0;
	var contain = false;
	for(var i = y; i <= collumn; i++){
		temp = x+""+(y+(i-y));
		for(var j = 0; j < ships.length; j++){
			if(temp == ships[j]){
				contain = true;
				}
			}
			if(!contain){
				counter++;
			} else {
			return counter;
				}
		}

		return counter;
	}

function getRows(x, y){
	var counter = 0;
	var contain = false;
	for(var i = x; i <= row; i++){
		temp = (x+(i-x))+""+y;
		for(var j = 0; j < ships.length; j++){

			if(temp == ships[j]){

				contain = true;
				}
			}
			if(!contain){
				counter++;
			} else {
				return counter;
				}
		}
		return counter;
	}
var clicks = 0;
var hits = 0;
function showPosition(id){
			for(var i = 0; i<ships.length; i++){
				if(id == ships[i]){
					document.getElementById(id).style.background = "red";
					hits++;
					break;
				} else{
					document.getElementById(id).style.background = "black";
				}
				
			}
		clicks++;
		document.getElementById("update").innerHTML = "position =" + id;
		document.getElementById("shots").innerHTML = "shots =" + clicks;
		document.getElementById("hits").innerHTML = "hits =" + hits;
		if(hits == 17){
			window.alert("Congratulations, You have Won, press restart to play again.\n You shot " + clicks + " times and hit " + hits);
			}
	} 
	
function restart(){
	for (var i = 1; i <= row; i++){
		for (var j = 1; j <= collumn; j++){
			var curr = i + "" + j;
		document.getElementById(curr).style.background = "cyan";
			}
		}
		
		ships.length = 0;
		placeShips();
		switches = true;
}