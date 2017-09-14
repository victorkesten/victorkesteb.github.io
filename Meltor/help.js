
var id_list = ["hawaii2017","summer2017","photoshoot","winter2016","summer2016", "spring2016"];
var loaded_list = [0,0,0,0,0,0];
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
  if(loaded_list[x] == 0){
    load(x);
  }
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
    if(document.getElementById(id_list[i]).innerHTML == ""){
      load(i);
    }
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

//https://stackoverflow.com/questions/298503/how-can-you-check-for-a-hash-in-a-url-using-javascript

function checkHash(){
  var hash =  window.location.hash;
  // console.log(hash);
  if(hash == "#Summer2016"){
    // console.log(1);
    show(4);
    load(4);
    loaded_list[4] =1;
  } else if (hash == "#Hawaii2017_1"){
    show(0);
    load(0);
    loaded_list[0] =1;

  } else if (hash =="#Photoshoot"){
    show(2);
    load(2);
    loaded_list[2] =1;

  } else if (hash == "#Winter2016"){
    show(3);
    load(3);
    loaded_list[3] =1;

  }else if (hash == "#Spring2016"){
    show(5);
    load(5);
    loaded_list[5] =1;

  } else {
    for(var i = 0; i < id_list.length; i++){
      loaded_list[i] =1;
      load(i);
    }
  }

}

function load(x){
  if(x == 4){
    jQuery.get('html_photos/Summer2016.txt', function(data) {
      document.getElementById("summer2016").innerHTML = data;
    });
  } else if(x == 3){
    jQuery.get('html_photos/Winter2016.txt', function(data) {
      document.getElementById("winter2016").innerHTML = data;
    });
  } else if (x == 2){
    jQuery.get('html_photos/Photoshoot.txt', function(data) {
      document.getElementById("photoshoot").innerHTML = data;
    });
  } else if (x == 0){
    jQuery.get('html_photos/Hawaii2017_1.txt', function(data) {
      document.getElementById("hawaii2017").innerHTML = data;
    });
  } else if(x==5){
    jQuery.get('html_photos/Spring2016.txt', function(data) {
      document.getElementById("spring2016").innerHTML = data;
    });
    }else{

  }

}
