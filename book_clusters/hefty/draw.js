console.log('Hi.');

d3.json('../../data-sets/norton_after1820.json', function(data){

  data = _.map(data, function(d) { return d });
  var alike = _.map(data, function(d){
    return _.reduce(d.contents, function(res, obj){
      return res + obj.authors.female.total_nonwhite;
    }, 0);
  });

  // console.log(data);

  var svg = d3.select('svg'),
      w = +svg.attr('width'),
      h = +svg.attr('height');

  svg = svg.append('g').attr('class', 'buddies');

  var rScale = d3.scaleLinear()
        .domain([0, 5600])
        .range([0, w - 200]),
      hScale = d3.scaleLinear()
        .domain([0, 35])
        .range([10, 140]);

  svg.selectAll('b-circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', 100)
    .attr('cy', 100)
    .attr('r', function(d) { return rScale(d.total_length) / Math.PI; })
    .attr('fill', 'hsla(360, 100%, 100%, .7)')
    .attr('class', function(d) { return 'pages-' + d.pub_date });

  svg.selectAll('r-circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', 100)
    .attr('cy', 100)
    .attr('r', function(d) { return rScale(d.total_read) / Math.PI; })
    .attr('fill', 'url(#dg-circles-2) #fff')
    .attr('class', function(d) { return 'loved-' + d.pub_date });

  svg.selectAll('s-circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', 100)
    .attr('cy', 100)
    .attr('r', function(d) { return rScale(d.total_liked) / Math.PI; })
    .attr('fill', 'url(#dg-circles-5) #fff')
    .attr('class', function(d) { return 'loved-' + d.pub_date });

  svg.selectAll('rect')
    .data(alike)
    .enter()
    .append('rect')
    .attr('x', 100)
    .attr('y', 100)
    .attr('width', w/2)
    .attr('height', function(d){return hScale(d)})
    .attr('fill', 'url(#dg-diagonal-stripe-3) #fff')
    .attr('class', function(d, i) { return 'peeps-' + i });


}); // ends d3.json