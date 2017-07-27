

function tat(){
	console.log($(window).width());
	console.log($(window).height());
	setSize($(window).height());
}

function setSize(y){
	var t = y - 80;
	console.log(t);
	if(t > 500){
		$("#about_section").css("height",t+"px");
		$("#midsection_photo").css("height", t+"px");
		$("#section1").css("height", t+"px");
		$("#property_management").css("height", t+"px");

		// $("#photo_reel".css("height", (t-100)+"px"))
		var w = $(window).width();
		$("#photo_reel").css("margin-left", ((w/2)-560)/2 );
		$("#photo_reel").css("margin-top", 10);
		$("#about_right_text").css("margin-top",(y/2)-200);
	}
}

var quotNumber = Math.floor((Math.random() * 5));
var listOfQuotes = ["\"If you're looking for a home to purchase or need property management, look no further.\"",
	"\"I was very happy working with this company rather than any other. They were professional, easy to work with, and best yet, no pressure. We had a lot of options on the table, but they worked with us on our time and with what we could afford. I would recommend them often!\"",
	"\"Hands down the best real estate transaction we ever had! Courtney is a top-notch realtor and we could not have been more pleased with the sale of our home...\"",
	"\"They were organized, quick, and efficient... I could not believe how stress free this was. I only wish I could give more than 5 stars. Awesome job, guys!\"",
	"\"Everyone at Vesta has been very helpful and patient!\"",
	"\"Courtney is caring and patient. She actively listened to our needs and what we were looking for...\"",
	"\"By the end, we were saying things like 'let’s go with the one you would use' because we felt Courtney was just as invested as us in the selection of our house.\""
];


function onLoad(){
	$("#navBar").css("padding-left", "200px");
	console.log(4);
	$("#quote").text(listOfQuotes[quotNumber]);
}

function timedEvent(){

	//console.log($("#quote").text());
	//console.log(listOfQuotes[quotNumber]);
	$("#quote").attr("id","quote_hidden");
	window.setTimeout(timedEvent2,2000);
	//console.log("HEY");
}


function timedEvent2(){
	console.log(listOfQuotes[quotNumber]);
	console.log($("#quote_hidden").text());

	var old = quotNumber;
	while(old == quotNumber){
		quotNumber = Math.floor((Math.random() * 5));
	}
	$("#quote_hidden").text(listOfQuotes[quotNumber]);
	$("#quote_hidden").attr("id","quote");
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

var divNames = ['about_section_head','meet_the_team_head', 'midsection_photo_head','section1_head','property_management_head','contact'];

function getToDiv(divName){
    $('html,body').animate({
        scrollTop: $("#" + divNames[divName]).offset().top},
        'slow');
}


function showdetails(who){
	$("#email_"+who).css("display","initial");
}

function hidedetails(who){
	$("#email_"+who).css("display","none");
}
