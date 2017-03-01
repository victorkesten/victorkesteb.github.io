function onLoad(){
	$("#navBar").css("padding-left", "200px");
	console.log(4);
}

function tat(){
	console.log($(window).width());
}

function ensureWidth(){
	if($(window).width() >= 1520){
		// console.log(Y);
		// $("#main_box").css("margin", "auto 0");
		// $("#main_box").css("width", "50%");
		// $("#main_box").css("margin-left", ($(window).width() - 1520)/2);
		// $("#main_box").css("margin-right", ($(window).width() - 1520)/2);
	} else {
		// var t = $("#navBar").css("padding-left");
		// $("#navBar").css("padding-left", t+1);
	}

}

function setCol(test){
	// console.log("hey");
	document.getElementById("g"+test).style.backgroundColor = "#DCE4F2";
	$("#g" + test).css( "cursor", "pointer" );
	$("#g" + test).css( "color", "#0D094F" );



}

function unsetCol(a){
	document.getElementById("g"+a).style.backgroundColor = "";
	$("#g" + a).css( "cursor", "initial" );
	$("#g" + a).css( "color", "white" );


}
