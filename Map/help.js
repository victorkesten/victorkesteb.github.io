
var to_visit = [];
var pos = 0;
var rendered = true;

function load_map(){
  var basic_choropleth = new Datamap({
    element: document.getElementById("basic_choropleth"),
    projection: 'mercator',
    fills: {
      defaultFill: "#ABDDA4",
      "Traveled To": "blue",
      "Future" : "Purple"
    },
    data: {
      USA: { fillKey: "Traveled To" },
      SWE: { fillKey: "Traveled To" },
      CHN: { fillKey: "Traveled To" },
      DNK: { fillKey: "Traveled To" },
      GBR: { fillKey: "Traveled To" },
      DEU: { fillKey: "Traveled To"},
      FRA: { fillKey: "Traveled To"},
      JPN: { fillKey: "Traveled To"},
      NZL: { fillKey: "Future"},
      BEL: { fillKey: "Traveled To"},
      GRL: { fillKey: "Future"},
      NLD: { fillKey: "Traveled To"},
      CZE: { fillKey: "Traveled To"},
      AUT: { fillKey: "Traveled To"},
      THA: { fillKey: "Traveled To"},
      SGP: { fillKey: "Traveled To"},
      IDN: { fillKey: "Traveled To"},
      MYS: { fillKey: "Traveled To"},
      FIN: { fillKey: "Traveled To"},
      NOR: { fillKey: "Traveled To"},
      KOR: { fillKey: "Future"},
      ITA: { fillKey: "Future"}

      // : { fillKey: "authorHasTraveledTo" },
    }

  });

  basic_choropleth.arc([{
         origin: {
           latitude: 59.3293,
           longitude: 18.0868
         },
         destination: {
           latitude: 21.3069,
           longitude: -157.8583
         }
       }
      //  ,{
      //    origin: {
      //      latitude: 59.3293,
      //      longitude: 18.0868
      //    },
      //    destination: {
      //      latitude: 39.9042,
      //      longitude: 116.40712
      //    }
      //  },{
      //    origin: {
      //      latitude: 55.9533,
      //      longitude: -3.1883
      //    },
      //    destination: {
      //      latitude: 59.3293,
      //      longitude: 18.0868
      //    }
      //  }
     ], {
        //  greatArc: true,
         animationSpeed: 2000
       });

  basic_choropleth.svg.selectAll('.datamaps-subunit')
    .attr("id", function(d){return d.id;})
    .on('click', function(d) {
                 // alert(geography.properties.name);
                //  console.log(d.id);
                 var name = d.properties.name;
                 var id = d.id;
                 to_visit[pos] = id;
                 pos++;
                 console.log(to_visit);
                //  console.log(obj);
                //  console.log({CAN:"purple"});
                //  basic_choropleth.updateChoropleth(obj);
                //  basic_choropleth.updateChoropleth({CAN:"purple"});
                // basic_choropleth.updateChoropleth({CAN: "purple"});
                // $("#"+id).css("fill","purple");

                //
                // $("body").append("<div class=\""+id+"_MAP\" style=\"position: relative; border: 1px solid green; width: 500px; height: 500px;\"></div>");
                createMap(id);

                //

                 if(name == "United States of America"){
                   $("#basic_choropleth").css("display","none");
                   $("#back_button").css("display","initial");
                   if(rendered){

                     click_us();
                     rendered = false;
                   } else {
                     $("#USA_MAP").css("display","initial");
                   }
                 }
             });
      // .on('mouseout',function(d){console.log("Ok");});
             basic_choropleth.legend();
}




function back(){
  $("#basic_choropleth").css("display","initial");
  $("#back_button").css("display","none");
  $("#USA_MAP").css("display","none");
}

var colors = d3.scale.category10();

function click_us(){
  var map = new Datamap({
       element: document.getElementById('USA_MAP'),
       scope : 'usa',
       fills: {
           VISITED: 'Blue',
           FUTURE: 'Purple',
          //  UNKNOWN: 'rgb(0,0,0)',
           defaultFill: 'green'
       },
       data: {
           CT : {
             fillKey : "VISITED"
           },
           HI : {
             fillKey : "VISITED"
           },
           NY : {
             fillKey : "VISITED"
           },
           NJ : {
             fillKey : "VISITED"
           },
           MD : {
             fillKey : "VISITED"
           },
           VA : {
             fillKey : "VISITED"
           },
           DE : {
             fillKey : "VISITED"
           },
           PA : {
             fillKey : "VISITED"
           },
           FL : {
             fillKey : "FUTURE"
           },
           OR : {
             fillKey : "FUTURE"
           },
           CA : {
             fillKey : "FUTURE"
           },
           WA : {
             fillKey : "FUTURE"
           }
       }
   });
  //  console.log("H");
   // Draw a legend for this map
   map.legend();
   map.labels();


   map.svg.selectAll('.datamaps-subunit').on('click', function(d) {
                  // alert(geography.properties.name);
                // goto(d);
                console.log(d);
              });
}

function createMap(id){
  document.getElementById('country_map').src = id.toLowerCase()+".html";

  //
  // console.log(id.toLowerCase());
  // var map = new Datamap({
  //      element: document.getElementsByClassName(id+'_MAP')[0],
  //      scope : 'bra',
  //
  //      fills: {
  //          VISITED: 'Blue',
  //          FUTURE: 'Purple',
  //         //  UNKNOWN: 'rgb(0,0,0)',
  //          defaultFill: 'green'
  //      },
  //      data: {
  //
  //      }
  //  });
  //  map.legend();
  //  map.labels();
}
//
// function goto(d){
//   var map = new Datamap({
//        element: document.getElementById('USA'),
//        scope : 'florida',
//
//        fills: {
//            defaultFill: 'green'
//        }
//    });
// }
//
// function redraw() {
//      datamap.svg.selectAll("g").attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
// }
