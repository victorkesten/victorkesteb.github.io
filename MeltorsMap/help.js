
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
      DEU: { fillKey: "Future"},
      FRA: { fillKey: "Future"},
      JPN: { fillKey: "Future"},
      NZL: { fillKey: "Future"},
      BEL: { fillKey: "Future"},
      GRL: { fillKey: "Future"}
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


   map.svg.selectAll('.datamaps-subunit').on('click', function(d) {
                  // alert(geography.properties.name);
                // goto(d);
                console.log(d);
              });
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
