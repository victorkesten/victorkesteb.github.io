// The goal of this file is to fetch all tournament JSON data once per session load.
// From there on we can distribute the wanted data locally instead.

var all_matches = [];
function getAllMatches(tournamentID, pages, next, nation){
	if(next == null){console.log("all matches loaded");updateGraph();setTournamentArray(all_matches,nation);return;}
	$.get(
	    "https://api.masterleague.net/matches/",
	    {format : 'json', page_size : 25, page : pages, tournament : tournamentID},
	    function(data) {
	    	for(var i = 0; i < data.results.length; i++){
	    		all_matches.push(data.results[i]);
	    	}
	    	getAllMatches(tournamentID, pages+1, data.next, nation);
	    }
	);
}
//
function resetAllMatches(){
	all_matches = [];
}
//
function setAllMatches(mat){
	all_matches = [];
	all_matches = mat;
}
//
function ret_all_matches(){
	return all_matches;
}

function getHeroMatch(heroID){
  var match_return = [];
  for(var i = 0; i < all_matches.length; i++){
    for(var j = 0; j < 5; j++){
      if(all_matches[i].drafts[0].picks[j].hero == heroID){
        match_return.push(all_matches[i]);
      }
      if(all_matches[i].drafts[1].picks[j].hero == heroID){
        match_return.push(all_matches[i]);
      }
    }
  }
  return match_return;
}
