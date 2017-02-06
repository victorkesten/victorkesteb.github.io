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


function temp(){
	d3.csv(test + '.csv', function(data) {
	  var colorgen = d3.scale.ordinal()
	    .range(["#a6cee3","#1f78b4","#b2df8a","#33a02c",
	            "#fb9a99","#e31a1c","#fdbf6f","#ff7f00",
	            "#cab2d6","#6a3d9a","#ffff99","#b15928"]);

	  var color = function(d) { return colorgen(d.group); };

	  var parcoords = d3.parcoords()("#example-progressive")
	    .data(data)
	    // .hideAxis(["name"])
	    .color(color)
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
