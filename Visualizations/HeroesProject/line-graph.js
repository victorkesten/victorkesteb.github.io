var svg = d3.select("svg"),
    margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = svg.attr("width") - margin.left - margin.right,
    height = svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// var parseTime = d3.timeParse("%Y-%m-%dT%H:%M:%SZ");
var parseTime = d3.timeParse("%Y%m%d");
var x = d3.scaleTime().range([0, width]),
    y = d3.scaleLinear().range([height, 0]),
    z = d3.scaleOrdinal(d3.schemeCategory10);

var line = d3.line()
    .curve(d3.curveBasis)
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.winrate); });

var first_time = true;

function fixDate(data){
  for(var i = 0; i < data.length; i++){
    for(var j = 0; j < data[i].values.length; j++){
      data[i].values[j].date = new Date(data[i].values[j].date);
    }
  }
    draw(data);
}

function draw(data){
  if(first_time){
    create_xaxis(data);
    // y.domain([
    //   d3.min(cities, function(c) { return d3.min(c.values, function(d) { return d.winrate; }); }),
    //   d3.max(cities, function(c) { return d3.max(c.values, function(d) { return d.winrate; }); })
    // ]);
    y.domain([0,100]);
    z.domain(data.map(function(c) { return c.id; }));

    // Create the y-axis
    g.append("g")
        .attr("class", "axis axis--y")
        .attr("id", "y-axis1")
        .call(d3.axisLeft(y))
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 3)
        .attr("dy", "0.71em")
        // .attr("dy", "0.71em")
        .attr("id","y-label")
        .attr("fill", "#000")
        .attr("onclick","drop_down_y()")
        .text("Winrate, %")
    first_time = false;
  } else {
    create_xaxis(data);
  }
  g.selectAll(".hero-line").remove();
  var city = g.selectAll(".hero-line")
    .data(data)
    .enter().append("g")
    .attr("class", "hero-line")
    .attr("id", function(d){return "line-"+heroes_names[d.id].id;});
    // city.remove();
  city.append("path")
      .attr("class", "line")
      .attr("d", function(d) {return line(d.values); })
      // .attr("onmouseleave","antiShadeLines("+d+")")
      // .attr("onmouseover","shadeLines("+d+")")
      .attr("onmouseover", function(d){return "shadeLines(\""+heroes_names[d.id].id+"\")";})
      .attr("onmouseleave", function(d){return "antiShadeLines(\""+heroes_names[d.id].id+"\")";})
      .style("stroke", function(d) { return z(d.id); });

  city.append("text")
      .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
      .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.winrate) + ")"; })
      .attr("x", 3)
      .attr("dy", "0.35em")
      .attr("onmouseover", function(d){return "shadeLines(\""+heroes_names[d.id].id+"\")";})
      .attr("onmouseleave", function(d){return "antiShadeLines(\""+heroes_names[d.id].id+"\")";})
      .style("font", "10px sans-serif")
      .text(function(d) { return d.id; });
}

function drop_down_y(){
    var e = e || window.event;
    document.getElementById("myDropdown").classList.toggle("show");
    $('#myDropdown').css({'top':e.pageY,'left':e.pageX, 'position':'absolute'});
}

function changeYAxis(val){
  g.selectAll("#y-axis1").remove();
  // If you change domain - the values also need to be updated.
  // y.domain([20,70]);
  selected_y_var = val;
  console.log("IT WORKS");
  g.append("g")
      .attr("class", "axis axis--y")
      .attr("id", "y-axis1")
      .call(d3.axisLeft(y))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("id","y-label")
      .attr("y", 3)
      .attr("dy", "0.71em")
      .attr("fill", "#000")
      .attr("onclick","drop_down_y()")
      .text(val);
    updateGraph();
}

function update(data) {
  getXDomain(data);
  var svg = d3.selectAll(".hero-line").transition();

  svg.select(".hero-line")
    .duration(750)
    .attr("d",line(data));
}

function create_xaxis(data){
  // console.log(data)
  // Custom version of d3.extent since it didn't work for me
  // This might be transfrmed into a custom function instead.
  // return: object - start : x end : y
  var start = new Date();
  var end = new Date();
  if(data.length > 0){
    end = data[0].values[0].date;
  }
  for(var i = 0; i < data.length; i++){
    for(var j= 0; j < data[i].values.length; j++){
      if(data[i].values[j].date < start){
        start = data[i].values[j].date;
      }
      if(data[i].values[j].date > end){
        end = data[i].values[j].date;
      }
    }
  }
  // Set new domain
  x.domain([start, end]);
  // Remov old domain
  g.selectAll("#x-axis1").remove();
  // Create the x-axis
  g.append("g")
      .attr("class", "axis axis--x")
      .attr("id", "x-axis1")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
}

function type(d, _, columns) {
  // console.log(d);
  d.date = parseTime(d.date);
  for (var i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c];
  return d;
}

function shadeLines(data){
  // console.log(data);
  // var lines = g.selectAll(".hero-line").enter().append('g');
  var lines = g.selectAll(".hero-line").selectAll('.line');

  lines.each(function(d){
    if(heroes_names[d.id].id != data){
      g.selectAll("#line-" +heroes_names[d.id].id).style("opacity",0.3);
    }
  });
}

function antiShadeLines(d){
  var lines = g.selectAll(".hero-line").selectAll(".line");
  lines.each(function(d){
    // if(d.id != data){
      g.selectAll("#line-"+heroes_names[d.id].id).style("opacity",1);
    // }
  });
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  // console.log(event);
  if (!event.target.matches('text')) {

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
