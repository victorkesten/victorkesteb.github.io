function displayBlob(d){
	console.log(d);
}
var test = "data/test";
function changeto(a){
	test = a;
	// var parcoords = d3.parcoords()("#example-progressive")
	// 	.queue.clear();
	document.getElementById("example-progressive").innerHTML = "";
	temp();
}

var tes = 0;
function temp(){
	d3.csv(test + '.csv', function(data) {
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

        d3.csv('weekdays.csv', function(error, dataset) {
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

          /* OPTIONAL 
          path.on('mousemove', function(d) {
            tooltip.style('top', (d3.event.layerY + 10) + 'px')
              .style('left', (d3.event.layerX + 10) + 'px');
          });
          */
            
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
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function test(){
	console.log("yes");
}