// https://www.devbridge.com/sourcery/components/jquery-autocomplete/
$( function() {
    $( "#teams" ).autocomplete({
      source: teamNames,
      select: function(event, ui){
        selected.team = ui.item.value;
        console.log(selected.team);
      }
    });
  }
);

$( function() {
    $( "#heroes_list" ).autocomplete({
      source: heroes_names_array,
      select: function(event, ui){
        // selectedHeroes.push(ui.item.value);
        // console.log(ui.item.value);
        // console.log(heroes_names[ui.item.value]);
        console.log("test");
        pick_hero(heroes_names[ui.item.value].id);
      }
    });
  }
);

function createHeroesWindow(){

}
