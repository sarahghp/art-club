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

  // draw backgrounds
  _.forEach(_.range(50), function(n){
    var path =  "M2,17 C119.722656,-33.5664063 -8.26171875,96.8414964 34.9960938,78 C78.2539062,59.1585036 144.65625,74.4921875 87.6484375,122.640625",
        transformX = _.random(w),
        transformY = _.random(h),
        transformTX = _.random(w),
        transformTY = _.random(h),
        rotate     = _.random(360);

    // console.log(randomPath, transformX, transformY, rotate);

    if (n % 7 === 0){
      svg.append('polygon')
          .attr('points','78.4955579 85.7169475 104.724336 100.632348 73.9997538 115.567203')
          .attr('fill', '#FF0048')
          .style('transform', 'translate(' + transformX + 'px, ' + transformY + 'px) rotate(' + rotate + 'deg) scale(2.5)');
    }
    
    svg.append('path')
        .attr('d', path)
        .attr('fill', 'none')
        .attr('stroke', "#FF0048")
        .attr('stroke-width', '18')
        .style('transform', 'translate(' + transformX + 'px, ' + transformY + 'px) rotate(' + rotate + 'deg) scale(1)');
  });

  // Now draw elements

  svg.selectAll('b-circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', 100)
    .attr('cy', 100)
    .attr('r', function(d) { return rScale(d.total_length) / Math.PI; })
    // .attr('fill', 'hsla(343, 100%, 50%, .9)')
    .attr('fill', 'url(#pink-circles-9) #fff')
    .attr('class', function(d) { return 'pages-' + d.pub_date });

  svg.selectAll('r-circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', 100)
    .attr('cy', 100)
    .attr('r', function(d) { return rScale(d.total_read) / Math.PI; })
    .attr('fill', 'url(#db-circles-8) #fff')
    .attr('class', function(d) { return 'read-' + d.pub_date });

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