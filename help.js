ProjectNames = {
    THEA : 0,
    TEXT_CPP : 1,
    GL_ENGINE : 2,
    SMALL_GAMES : 3,
    RAY_TRACE : 4,
    MINECRAFT : 5,
    INFO_VIS : 6,
    WEB_DESIGN : 7,
    ANTI_ALIASING : 8,
    IV_P1 : 9,
    IV_P2 : 10,
    HEROES_VIS : 11,
    FOOD_ADVISOR : 12,
    VESTA_HAWAII : 13,
    MT_MAP : 14
}

function go(a) {
	var locat = "portfolio";
	switch(a){
		case ProjectNames.THEA:
			locat = "thea";
			break;
		case ProjectNames.TEXT_CPP:
			locat = "text_cpp";
			break;
		case ProjectNames.RAY_TRACE:
			locat = "raytrace";
			break;
		case ProjectNames.SMALL_GAMES:
			locat = "small_games";
			break;
		case ProjectNames.GL_ENGINE:
			locat = "gl_engine";
			break;
		case ProjectNames.MINECRAFT:
			locat = "minecraft_mod";
      break;
    case ProjectNames.INFO_VIS:
      locat = "info_vis";
      break;
    case ProjectNames.WEB_DESIGN:
      locat= "web_design";
      break;
    case ProjectNames.ANTI_ALIASING:
      locat = "anti_aliasing"
      break;
    case ProjectNames.IV_P1:
      locat = "../DH2321/Project1/index.html";
      break;
    case ProjectNames.IV_P2:
      locat = "../DH2321/Project2/index.html";
      break;
    case ProjectNames.FOOD_ADVISOR:
      locat = "https://foodadvisor10.github.io/FoodAdvisor/";
      break;
    case ProjectNames.HEROES_VIS:
      locat = "../HeroesProject/index.html";
      break;
    case ProjectNames.VESTA_HAWAII:
      locat = "../Meltor/Vesta";
      break;
    case ProjectNames.MT_MAP:
      locat = "../Map/index.html";
      break;
		default:
			break;
	}
	location.replace(locat);
}
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
$(window).bind('scroll', function() {
	    var pos = $(window).scrollTop();
	    // console.log("TEST");
	    $('#backgroundPic').each(function() {
	        var $element = $(this);
	        // subtract some from the height b/c of the padding
	        var height = $element.height();//-18;
	        $(this).css('backgroundPosition', '50% ' + ((Math.round((height - pos) * velocity))/250)*percent + '%'); // + 50+20 + '%');
	    });

	    var element = $('#bannerTop');
	    var element2 = $('#backgroundPic');

	    if(pos >= 200){
	    	element.css('position', 'fixed');
	    	var x = screen.width;
	    	// element.css('width', ''+x);
        element.css("width","100%");
	    	element.css('top', '50px');
	    	element2.css('margin-bottom', '63px');
	    } else {
	    	element.css('position', 'relative');
	    	element.css('top', '0px');
	    	element2.css('margin-bottom', '0px');
	    }
	}
);
