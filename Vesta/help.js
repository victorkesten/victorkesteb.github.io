

function tat(){
	console.log($(window).width());
	console.log($(window).height());
}


var quotNumber = Math.floor((Math.random() * 5));
var listOfQuotes = ["\"If you're looking for a home to purchase or need property management, look no further.\"\n\n",
	"\"I was very happy working with this company rather than any other. They were professional, easy to work with, and best yet, no pressure. We had a lot of options on the table, but they worked with us on our time and with what we could afford. I would recommend them often!\"",
	"\"Hands down the best real estate transaction we ever had! Courtney is a top-notch realtor and we could not have been more pleased with the sale of our home...\"",
	"\"They were organized, quick, and efficient... I could not believe how stress free this was. I only wish I could give more than 5 stars. Awesome job, guys!\"",
	"\"Everyone at Vesta has been very helpful and patient!\"\n\n\n",
	"\"Courtney is caring and patient. She actively listened to our needs and what we were looking for...\"",
	"\"By the end, we were saying things like 'let’s go with the one you would use' because we felt Courtney was just as invested as us in the selection of our house.\""
];

var clicked = 0;
function showThis(){
	$(".search-box").css("display","initial");
	$(".inner_box").css("display","initial");
	if(clicked == 0){
		clicked = 1;
	} else {
		clicked = 0 ;
	}
}


$(document).mouseup(function(e)
{
    var container = $(".inner_box");
    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0 && clicked == 1)
    {
        container.hide();
				$(".search-box").hide();
				clicked = 0;
    }
});

function timedEvent(){

	//console.log($("#quote").text());
	console.log(listOfQuotes[quotNumber]);
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


function showdetails(who){
	$("#email_"+who).css("display","initial");
}

function hidedetails(who){
	$("#email_"+who).css("display","none");
}
