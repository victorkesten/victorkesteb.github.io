var teams = [];
var tournament;
var fetchTeamsDone = false;
var teamNames = [];
var teamsMap = {};
var selected = { team : -1, tournamentID : -1, stage : -1, patch : -1, map : -1, team : -1, hero : -1, player : -1};


// Hero Retrieving
var noHeroes;
var heroes_names = {};
var heroes_names_array = [];
var heroes = [];

// Selected on display
var selected_heroes = [];
var selected_y_var = 0;

// Deprecated
// var matches = [];

// Match variables
var match_collections = [];
var formatted_matches = [];
var involvement_matches = [];
var nationSelected = 0;

// This will be used when switching between tournaments.
var tournaments = [];

// Loads hero images seen on site.
function loadAllHeroImages(){
	for(var i = 0; i < 10; i++){
		tournaments[i] = -1;
	}
	for(var i = 0; i < heroes.length; i++){
			$(".hero_diagram").append("<div class=\"hero\" id=\""+heroes[i].id+"\" onclick=\"pick_hero("+heroes[i].id+")\">\n<img id=\"hero_image_"+heroes[i].id+"\" src=\""+heroes[i].portrait.medium+"\" style=\"opacity:0.5; width:50px; height:75px\"  align=\"left\">\n");
	}
}


function updateHeroList(){
	$(".selected_heroes").html("");
	for(var i = 0; i < noHeroes; i++){
		if(selected_heroes[i] != -1){
			$(".selected_heroes").append(i + " ");
		}
	}
}

//Create an array for matches.
//Each element is for each hero.
function updateGraph(){
	for(var i = 0; i < noHeroes+1; i++){
		if(selected_heroes[i] == 1){
			var temp = getHeroMatch(i);
			if(temp.length != 0){
				match_collections[i] = temp;
			}
		}
	}
	updateGraph2();
}

function updateGraph2(){
	var form = [];
	for(var i = 0; i < noHeroes+1; i++){
		if(selected_heroes[i] != -1 && match_collections[i] != -1){	//match_collections
			parseMatches(i, match_collections[i]);
			if(selected_y_var == 0){
				form.push(formatted_matches[i][0]);
			} else if (selected_y_var == 1){
				form.push(involvement_matches[i][0]);
			}
		}
	}
	fixDate(form);
}


// When a user picks a hero, this function is called.
function pick_hero(i){
	var exists = 0;
	if(selected_heroes[i] == 1){
		exists = 1;
		selected_heroes[i] = -1;
	} else {
		selected_heroes[i] = 1
	}
	if(exists == 0){
		$("#hero_image_"+i).css("opacity", 1);
	} else {
		$("#hero_image_"+i).css("opacity", 0.5);
	}
	updateHeroList();
	updateGraph();
}

function selectAllHeroes(){
	for(var i = 0; i < noHeroes+1; i++){
		selected_heroes[i] = 1;
		$("#hero_image_"+i).css("opacity", 1);
	}

	updateHeroList();
	updateGraph();
}

function selectSupport(){
	for(var i = 0; i < noHeroes; i++){
		if(heroes[i].role == 2){
			selected_heroes[heroes[i].id] = 1;
			$("#hero_image_" + heroes[i].id).css("opacity",1);
		}
	}
	updateHeroList();
	updateGraph();
}

function deselectAllHeroes(){
	for(var i= 0; i < noHeroes+1; i++){
		$("#hero_image_" + i).css("opacity",0.5);
		selected_heroes[i] = -1;
	}
	updateHeroList();
	updateGraph();
}



// Used when picking between a nation.
// tournament ID 43,44,45,46 = EU,NA,KR,CN
function selectNation(nation){
	nationSelected = nation;
	for(var i = 0; i < noHeroes; i++){
		match_collections[i] = -1;
	}

	// match_collections = [];
	formatted_matches = [];
	involvement_matches = [];
	if(tournaments[nation] == -1){
		// tournaments[nation] = ret_all_matches();
		resetAllMatches();
		switch(nationSelected){
			case 0:
				getAllMatches(43,1,1, nation);
				break;
			case 1:
				getAllMatches(44,1,1, nation);
				break;
			case 2:
				getAllMatches(45,1,1, nation);
				break;
			case 3:
				getAllMatches(46,1,1, nation);
				break;
			case 4:
				getAllMatches(42,1,1, nation);
				break;
		}
	} else {
		setAllMatches(tournaments[nation]);
		updateGraph();
	}
}


function setTournamentArray(mat, nat){
	tournaments[nat] = mat;
	// console.log(tournaments[nat]);
}

var fetchMatchesDone = false;
//https://stackoverflow.com/questions/894860/set-a-default-parameter-value-for-a-javascript-function
//https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Default_parameters
function getMatchesSpecific(tournamentID, stage_, patch_, map_, team_, hero_, player_, pages, next, match){
	if(match_collections[hero_] != -1){return;}
	team_ = selected.team;
	if(next == null){fetchMatchesDone=true;match_collections[hero_]=match;return;}
	if(tournamentID == -1){console.error("tournamentID: \'" + tournamentID + "\' is undefined or incorrect.");}
	if(stage_ == -1){stage_ = "";}
	if(patch_ == -1){patch_ = "";}
	if(map_ == -1){map_ = "";}
	if(team_ == -1){team_ = "";}
	if(hero_ == -1){hero_ = "";}
	if(player_ == -1){player_ = "";}
	$.get(
	    "https://api.masterleague.net/matches/",
	    {format : 'json', page_size : 25, page : pages, tournament : tournamentID, stage : stage_, patch : patch_, map : map_, team : team_, hero : hero_, player : player_},
	    function(data) {
	    	for(var i = 0; i < data.results.length; i++){
	    		match.push(data.results[i]);
	    	}
				if(data.count == 0){
					match_collections[hero_] = -1;
					return;
				}
	    	getMatchesSpecific(tournamentID, stage_, patch_, map_, team_, hero_, player_, pages+1, data.next, match);
	    }
	);
}

// Merge the following two.
function getHeroes(pages, next){
	if(next == null){
		return;
	}
	$.get(
	    "https://api.masterleague.net/heroes/",
	    {format : 'json', page_size : 100},
	    function(data) {
	    	for(var i = 0; i < data.results.length; i++){
	    		heroes.push(data.results[i]);
	    	}
	    	getHeroes(pages+1, data.next)
	    }
	);

}
function getHero(){
	$.get(
	    "https://api.masterleague.net/heroes/",
	    {format : 'json', page_size : 100 },
	    function(data) {
				 heroes = data.results;
				 noHeroes = data.count;
				//  console.log(heroes);
				//  console.log(noHeroes);
				//  console.log(heroes[0]);
				 for(var i = 0; i < noHeroes; i++){
					 heroes_names[heroes[i].name] = heroes[i];
					 heroes_names_array[heroes[i].id] = heroes[i].name;
				 }

				//  console.log(heroes);
				//  console.log("HE");
				for(var i = 0; i < noHeroes+1; i ++){
					selected_heroes[i] = -1;
					match_collections[i] = -1;
				}
	    }
	);
	window.setTimeout(loadAllHeroImages, 1000)
}


//Match Parsing
// This one is needed for participation and all of that.
function parseMatches(hero_id, match_list){
	// Winrate
	var formatted = [{"id":heroes_names_array[hero_id],"values":[]}];
	var winrate = 0.0;
	var totalWins = 0;
	var totalMatches = 0;

	// Involvement


	// console.log(match_list);
	for(var i = match_list.length-1; 0 <= i; i--){
		// console.log(match_list[i]);
		totalMatches++;
		for(var j = 0; j < 5; j++){
			if(match_list[i].drafts[0].picks[j].hero == hero_id){
				if(match_list[i].drafts[0].is_winner == true){
					totalWins++;
				}
			} else
			if(match_list[i].drafts[1].picks[j].hero == hero_id){
				if(match_list[i].drafts[1].is_winner == true){
					totalWins++;
				}
			}
		}
		winrate = (totalWins / totalMatches) * 100;
		var temp = {"date":match_list[i].date,"winrate":winrate};
		formatted[0].values.push(temp);
	}
	formatted_matches[hero_id] = formatted;
	involvementRate(hero_id);
	// console.log(formatted);
	// fixDate(formatted);
}


// Function can be merged. But this is just to make things clear.
function involvementRate(hero_id){
	var match_list = ret_all_matches();
	// console.log(match_list.length);
	var formatted = [{"id":heroes_names_array[hero_id],"values":[]}];
	var involvement = 0.0;
	var totalInvolvement = 0;
	var totalMatches = 0;
	// console.log(match_list[0]);
	for(var i = match_list.length-1; 0 <= i; i--){

		totalMatches++;
		for(var j = 0; j < 5; j++){
			if(match_list[i].drafts[0].picks[j].hero == hero_id ){
				totalInvolvement++;
			} else
			if(match_list[i].drafts[1].picks[j].hero == hero_id){
				totalInvolvement++;
			}
		}
		if(match_list[i].drafts[1].bans[0] == hero_id || match_list[i].drafts[1].bans[1] == hero_id || match_list[i].drafts[0].bans[0] == hero_id || match_list[i].drafts[0].bans[1] == hero_id){
			totalInvolvement++;
		}
		// console.log(totalInvolvement + " " + totalMatches);
		involvement = (totalInvolvement/totalMatches) * 100;
		var temp = {"date":match_list[i].date,"winrate":involvement};
		formatted[0].values.push(temp);
	}
	involvement_matches[hero_id] = formatted;
}





// Later Functions


//
// function getMatches(tournamentID, pages, next){
// 	if(next == null){
// 		return;
// 	}
// 	$.get(
// 	    "https://api.masterleague.net/matches/",
// 	    {format : 'json', page : pages, page_size : 25, tournament : tournamentID},
// 	    function(data) {
// 	    	for(var i = 0; i < data.results.length; i++){
// 	    		matches.push(data.results[i]);
// 	    	}
// 	    	getMatches(tournamentID, pages+1, data.next);
// 	    }
// 	);
// }
//
// function printMatches(){
// 	var i = 0;
// 	for(i = 0; i < matches.length; i++){
// 		console.log(matches[i]);
// 	}
// }

//
// function getWinRate(hero){
// 	var i = 0;
// 	var pickRate = 0;
// 	var winRate = 0;
// 	console.log(matches.length);
// 	for(i = 0; i < matches.length; i++){
// 		var match = matches[i];
// 		var draft1 = match.drafts[0].picks;
// 		var win = match.drafts[0].is_winner;
// 		var draft2 = match.drafts[1].picks;
// 		for(var j = 0; j < 5; j++){
// 			if(draft1[j].hero == hero){
// 				console.log(match);
// 				if(win == true){
// 					winRate++;
// 				}
// 				pickRate++;
// 			} else if(draft2[j].hero == hero){
// 				console.log(match);
//
// 				if(win == false){
// 					winRate++;
// 				}
// 				pickRate++;
// 			}
// 		}
// 	}
// 	var lossRate = pickRate - winRate;
// 	console.log(lossRate + ' ' + winRate);
// }


function getAllTeams(pages, next) {
	if(next == null){
		return;
	}
	$.get(
	    "https://api.masterleague.net/teams/",
	    {format : 'json', page_size : 100, page : pages},
	    function(data) {
	    	var count = data.results.length;
	    	for(var i = 0; i < count; i++ ){
	       		teams.push(data.results[i]);
	    	}
	       getAllTeams(pages+1, data.next)
	       // Counter measure for things not loading when printing.
	       if(data.next == null){
		       fetchTeamsDone = true;
	       }
	    }
	);
}

function getTeamNames(){
	if(fetchTeamsDone){
		for(var i = 0; i < teams.length; i++){
			teamNames[i] = teams[i].name;
			teamsMap[teams[i].name] = teams[i].id;
		}
		// console.log(teamsMap);
		// return teamNames;
	} else {
		window.setTimeout(getTeamNames, 500);
	}
}
function printTeams(){
	var i = 0;
	if(fetchTeamsDone == true){
		for(i = 0; i < teams.length; i++){
			console.log(teams[i]);
			$("#list").append(teams[i].name + "<br>");
		}
	} else {
		window.setTimeout(printTeams,1000);
	}

}


function getTeamData(name){
	var id = getTeamID(name);
	if(id == -1){
		console.error("No Team with said name.");
	}
	console.log(id);
}


// Deprecated. Use object instead.
function getTeamID(name){
	for(var i = 0; i < teams.length; i++){
		if(teams[i].name.toLowerCase() == name.toLowerCase()){
			return teams[i].id;
		}
	}
	return -1;
}

function getTournament(pages, name, next){
	if(next == null){
		return;
	}
	$.get(
	    "https://api.masterleague.net/tournaments/",
	    {format : 'json', page_size : 100, page : pages},
	    function(data) {
	    	for(var i = 0; i < data.results.length; i++){
	    		if(data.results[i].name.toLowerCase() == name.toLowerCase()){
	    			tournament = data.results[i];
	    		}
	    	}
	    }
	);
}
// function getTeams(pages) {
// 	$.get(
// 	    "https://api.masterleague.net/teams/",
// 	    {format : 'json', page : pages},
// 	    function(data) {
// 	       superCount = data.count;
// 	       var maxCount = data.results.length;

// 	       console.log(data);
// 	       console.log(data.results);
// 	       var count = 0;
// 	       var check = false;
// 	       for(count=0; count < maxCount; count++){
// 	       	if(data.results[count].name == "2ARC Gaming"){
// 	       		console.log("Yes");
// 	       		check = true;
// 	       	}
// 	       	if(check == true){
// 	       		count = maxCount;
// 	       		return data.results[count].id;
// 	       	}
// 	    }
// 	);
// }
