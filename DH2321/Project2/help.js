
var test = "1014";
function changeto(a){
	test = a;
	// var parcoords = d3.parcoords()("#example-progressive")
	// 	.queue.clear();
	document.getElementById("example-progressive").innerHTML = "";
	temp();
}

var tes = 0;
function temp(){
	d3.csv('data/'+test + '.csv', function(data) {
	  var colorgen = d3.scale.ordinal()
	    .range(["#a6cee3","#1f78b4","#b2df8a","#33a02c",
	            "#fb9a99","#e31a1c","#fdbf6f","#ff7f00",
	            "#cab2d6","#6a3d9a","#ffff99","#b15928"]);


	  var parcoords = d3.parcoords()("#example-progressive")
	    .data(data)
	    // .hideAxis(["name"])
	    .color(function(d, i){
	    	return colorgen(i);
	  	})
	    .alpha(0.5)
	    .composite("darken")
	    .margin({ top: 24, left: 150, bottom: 12, right: 0 })
	    .mode("queue")
      .nullValueSeparator("bottom")
	    .render()
	    .reorderable()
	    .brushMode("1D-axes");  // enable brushing

	  parcoords.svg.selectAll("text")
	    .style("font", "10px sans-serif");

	     var grid = d3.divgrid();


	  grid.columns(["Country"]);
	  d3.select("#grid")
	    .datum(data.slice(0,10))
	    .call(grid)
	    .selectAll(".row")
	    .on({
	      "mouseover": function(d) { parcoords.highlight([d]) },
	      "mouseout": parcoords.unhighlight
	    });

	  // update data table on brush event
	  parcoords.on("brush", function(d) {
	    d3.select("#grid")
	      .datum(d.slice(0,10))
	      .call(grid)
	      .selectAll(".row")
        .attr("id", function(d,i) { return "country_" + d.Country;})
        .attr("onclick", function(d,i){ return "displayBlob(\"" + d.Country + "\")"})

	      .on({
	        "mouseover": function(d) { parcoords.highlight([d]) },
	        "mouseout": parcoords.unhighlight
	      });
	  });

	  d3.select('#btnReset').on('click', function(d) {parcoords.brushReset();  
	  	d3.select("#grid")
		    .datum(data.slice(0,10))
		    .call(grid)
		    .selectAll(".row")
		    .on({
		      "mouseover": function(d) { parcoords.highlight([d]) },
		      "mouseout": parcoords.unhighlight
		    });
		});
	});
}

var currentlySelectedPieChart = 'weekdays';

function pieChart(){
	   (function(d3) {
        'use strict';

        var width = 360;
        var height = 360;
        var radius = Math.min(width, height) / 2;
        var donutWidth = 75;
        var legendRectSize = 18;
        var legendSpacing = 4;

        var color = d3.scale.category20b();

        var svg = d3.select('#chart')
          .append('svg')
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr('transform', 'translate(' + (width / 2) + 
            ',' + (height / 2) + ')');

        var arc = d3.svg.arc()
          .innerRadius(radius - donutWidth)
          .outerRadius(radius);

        var pie = d3.layout.pie()
          .value(function(d) { return d.count; })
          .sort(null);

        var tooltip = d3.select('#chart')
          .append('div')
          .attr('class', 'tooltip');
        
        tooltip.append('div')
          .attr('class', 'label');

        tooltip.append('div')
          .attr('class', 'count');

        tooltip.append('div')
          .attr('class', 'percent');

        d3.csv(currentlySelectedPieChart + '.csv', function(error, dataset) {
          dataset.forEach(function(d) {
            d.count = +d.count;
            d.enabled = true;                                         // NEW
          });

          var path = svg.selectAll('path')
            .data(pie(dataset))
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', function(d, i) { 
              return color(d.data.label); 
            })                                                        // UPDATED (removed semicolon)
            .each(function(d) { this._current = d; });                // NEW

          path.on('mouseover', function(d) {
            var total = d3.sum(dataset.map(function(d) {
              return (d.enabled) ? d.count : 0;                       // UPDATED
            }));
            var percent = Math.round(1000 * d.data.count / total) / 10;
            tooltip.select('.label').html(d.data.label);
            tooltip.select('.count').html(d.data.count); 
            tooltip.select('.percent').html(percent + '%'); 
            tooltip.style('display', 'block');
          });
          
          path.on('mouseout', function() {
            tooltip.style('display', 'none');
          });

           // OPTIONAL 
          path.on('mousemove', function(d) {
            tooltip.style('top', (d3.event.layerY + 10) + 'px')
              .style('left', (d3.event.layerX + 10) + 'px');
          });
          
            
          var legend = svg.selectAll('.legend')
            .data(color.domain())
            .enter()
            .append('g')
            .attr('class', 'legend')
            .attr('transform', function(d, i) {
              var height = legendRectSize + legendSpacing;
              var offset =  height * color.domain().length / 2;
              var horz = -2 * legendRectSize;
              var vert = i * height - offset;
              return 'translate(' + horz + ',' + vert + ')';
            });

          legend.append('rect')
            .attr('width', legendRectSize)
            .attr('height', legendRectSize)                                   
            .style('fill', color)
            .style('stroke', color)                                   // UPDATED (removed semicolon)
            .on('click', function(label) {                            // NEW
              var rect = d3.select(this);                             // NEW
              var enabled = true;                                     // NEW
              var totalEnabled = d3.sum(dataset.map(function(d) {     // NEW
                return (d.enabled) ? 1 : 0;                           // NEW
              }));                                                    // NEW
              
              if (rect.attr('class') === 'disabled') {                // NEW
                rect.attr('class', '');                               // NEW
              } else {                                                // NEW
                if (totalEnabled < 2) return;                         // NEW
                rect.attr('class', 'disabled');                       // NEW
                enabled = false;                                      // NEW
              }                                                       // NEW

              pie.value(function(d) {                                 // NEW
                if (d.label === label) d.enabled = enabled;           // NEW
                return (d.enabled) ? d.count : 0;                     // NEW
              });                                                     // NEW

              path = path.data(pie(dataset));                         // NEW

              path.transition()                                       // NEW
                .duration(750)                                        // NEW
                .attrTween('d', function(d) {                         // NEW
                  var interpolate = d3.interpolate(this._current, d); // NEW
                  this._current = interpolate(0);                     // NEW
                  return function(t) {                                // NEW
                    return arc(interpolate(t));                       // NEW
                  };                                                  // NEW
                });                                                   // NEW
            });                                                       // NEW
            
          legend.append('text')
            .attr('x', legendRectSize + legendSpacing)
            .attr('y', legendRectSize - legendSpacing)
            .text(function(d) { return d; });

        });

      })(window.d3);
}




/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      // console.log(dropdowns[i]);
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}


var yearSelected = 4;
var years = ["","9599", "0004", "0509", "1014"];
var defaultColor = ["","","","","","","","","","",""];
var groupColors = ["#ff7373","#ffc0cb","#d3ffce","#e6e6fa","#7fffd4","#ffa500","#b0e0e6","#008080","#00ff00", "#ff00ff"];

function setYear(year){
  defaultColor[yearSelected-1] = "";
  document.getElementById("ye"+yearSelected).style.backgroundColor = "";
  document.getElementById("ye"+yearSelected).style.color = "white";

  yearSelected = year;

  defaultColor[yearSelected-1] = groupColors[yearSelected-1];
  document.getElementById("ye"+yearSelected).style.color = "black";
  document.getElementById("ye"+yearSelected).style.backgroundColor = defaultColor[yearSelected-1];

  yearSelected = year;
  var filename = "1014";
  if(year == 1){
    filename = "9599"; 
  } else if (year == 2){
    filename = "0004";
  } else if (year == 3){
    filename = "0509";
  }
  changeto(filename);
  generateDropDown();
}

function setCol(a){
  document.getElementById("ye"+a).style.color = "black";
  document.getElementById("ye"+a).style.backgroundColor = groupColors[a-1];
}

function unsetCol(a){
    if(defaultColor[a-1] == ""){
      document.getElementById("ye"+a).style.color = "white";
    }
  document.getElementById("ye"+a).style.backgroundColor = defaultColor[a-1];
}


// Donut Chart Code
var country = "Azerbaijan";
var categoriesYear1 = ["Religious Person","Confidence in Police","Happiness","Having Democracy","Woman earning more than man","Family Importance","Religious Importance","Homosexuality Stance","Men make better Leaders"];
var categoriesYear2 = ["Confidence in Police ","Family Importance","Patriotism","Homosexuality Stance","Men make better leaders","Religious Importance"];
var categoriesYear3 = ["Confidence in Police","Family Importance","Happiness","Patriotism","Homosexuality Stance","Men make better leaders","Religion Importance","Religious Person","Voted in National Election"];
var categoriesYear4 = ["Confidence in Police","Happiness","Patriotism","Woman earning more than men","Family Importance","Religious Importance","Homosexuality Stance","Men make better leaders","Religious Person", "Voted in National Election"];
var currentlySelectedCategory = 0;
var yearStr = ["", "1995-1999", "2000-2004", "2005-2009", "2010-2014"];
function generateDropDown(){
  var title = categoriesYear4;
  var at = "";
  if(yearSelected == 1){
    title = categoriesYear1;
  } else if (yearSelected == 2){
    title = categoriesYear2;
  } else if (yearSelected == 3){
    title = categoriesYear3;
  }

  for(var a = 0; title.length > a; a++){
    at += "<a onclick=\"categoryChoice("+a+")\">"+title[a]+"</a>\n";
  }
  document.getElementById("myDropdown").innerHTML = at;

}
//Take the drop down number
function categoryChoice(a){
  currentlySelectedCategory = a;
  displayBlob(country);
}

function displayBlob(d){
  document.getElementById("titlehead").innerHTML = d;
  country = d;
  setCategory(country + "_" + yearSelected + "_" + currentlySelectedCategory);
}

//country_year_category where filename=d, year=currentlySelectedYear, category=Question asked. 

function setCategory(name){
  var title = categoriesYear4[currentlySelectedCategory];
  if(yearSelected == 1){
    title = categoriesYear1[currentlySelectedCategory];
  } else if (yearSelected == 2){
    title = categoriesYear2[currentlySelectedCategory];
  } else if (yearSelected == 3){
    title = categoriesYear3[currentlySelectedCategory];
  }
  document.getElementById("chart").innerHTML = "<b id=\"titlehead\">" + country + " " + yearStr[yearSelected] + ": " + title + "</b>";
  console.log(name);
  currentlySelectedPieChart = name;
  pieChart();
  //Generate new chart using selected variables.
}
