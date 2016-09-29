ProjectNames = {
    THEA : 0,
    TEXT_CPP : 1,
    GL_ENGINE : 2,
    SMALL_GAMES : 3,
    RAY_TRACE : 4,
    MINECRAFT: 5
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
		x.style.marginRight = "15"
  		x.style.marginLeft = "15"
	}
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
	    	element.css('width', ''+x);
	    	element.css('top', '50px');
	    	element2.css('margin-bottom', '63px');
	    } else {
	    	element.css('position', 'relative');
	    	element.css('top', '0px');
	    	element2.css('margin-bottom', '0px');
	    }
	}
);
