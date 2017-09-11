
var id_list = ["hawaii2017","summer2017","photoshoot","winter2016","summer2016"];
var previous = -1;

function hide(x){
  for(var i = 0; i < id_list.length; i++){
    console.log(x);
    if(x != i){
      $("#"+id_list[i]).css("display","none");
    }
  }
}
function show(x){
  if(previous == -1){
    for(var i = 0; i < id_list.length; i++){
      $("#"+id_list[i]).css("display","none");
    }
  } else{
    $("#"+id_list[previous]).css("display","none");
  }

  $("#"+id_list[x]).css("display","initial");
  // $("#"+id_list[x]).css("-webkit-animation","fadeEffect 1s linear 1 normal forwards;")
  previous = x;
}

function show_all(){
  for(var i = 0; i < id_list.length; i++){
    $("#"+id_list[i]).css("display","initial");
  }
  previous = -1;
}

function fade(y){
  // x = y;
  // for(var i=0; i < id_list.length; i++){
  //   if(y != i){
  //     $("#"+id_list[i]).css("-webkit-animation","fadeout 1s linear 1 normal forwards");
  //   }
  // }
  // window.setTimeout(show,1000);
  show();
}
