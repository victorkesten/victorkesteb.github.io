
function showText(a){
	document.getElementById('proj' + a).style.opacity = "0.5";
	// document.getElementById('textDesc'+ a).style.visibility = "visible";
	console.log("test");
}
function hideText(a){
	document.getElementById('proj' + a).style.opacity = "1";
	// document.getElementById('textDesc' + a).style.visibility = "hidden";
	console.log("test1");
}

function screenCheck(){
	console.log($(window).width());
	if($(window).width >= 1850){
		var x = document.getElementsByClassName("projectSpace");
		x.style.marginRight = "15px"
  		x.style.marginLeft = "15px"
	}
}

var oldProj = 0;
function clickMe(a){
	if(oldProj == 0){
		oldProj = a;
	}
	console.log(a);
	var newP = document.getElementById('sub' + a).style;
	var oldP = document.getElementById('sub' + oldProj).style;
	oldP.display = 'none';
	newP.display = 'initial';
	oldProj = a;
}


var velocity = 1;
var oldPos;
var percent = 50;
var sticky = 250;

window.onscroll = function() {myFunction()};

// Get the header
var header = document.getElementById("nav_bar");

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset > sticky) {
    $(".content_sup").css("margin-top","108.5px");
    header.classList.add("fixed-top");
  } else {
    $(".content_sup").css("margin-top","50px");
    header.classList.remove("fixed-top");
  }
}
