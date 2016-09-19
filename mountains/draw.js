console.log('Hi.');

d3.json('../data-sets/norton_after1820.json', function(data){
  console.log(data);

  var svg = d3.select('svg'),
      w = +svg.attr('width'),
      h = +svg.attr('height'),
      hRow = 300;

  svg = svg.append('g').attr('class', 'buddies');

  _.forEach(data, function(volume){
    var id = volume.pub_date;
    
    var data = _.map(volume.contents, function(o){
      var periodArr = o.period.split('-');
      o.start = +periodArr[0];
      o.end = +periodArr[1];
      return o;
    });

    console.log(data);

    var xScale = d3.scaleLinear()
          .domain([1820, 2012])
          .range([20, w]),
        yScale = d3.scaleLinear()
          .domain([0.1, 2000])
          .range([hRow, 0]),
        aScale = d3.scaleLinear()
          .domain([0, 50])
          .range([0, hRow/2]);


    var mPoints = function(d) {
      var end = xScale(d.end) - 20;
      var arr = [[xScale(d.start), hRow], 
                  [xScale(d.start), yScale(d.authors.male.total_pages)], 
                  [end, hRow], 
                  [xScale(d.start), hRow]];
      return arr;
    };

    var fPoints = function(d) {
      var start = xScale(d.start) + 20;
      console.log(start);
      var arr = [[xScale(d.end), hRow], 
                  [xScale(d.end), yScale(d.authors.female.total_pages)], 
                  [start, hRow], 
                  [xScale(d.end), hRow]];
      return arr;
    };

    var tPoints = function(d){
      var half = xScale(d.start) + (xScale(d.end) - xScale(d.start))/2;
      var arr = [[xScale(d.start) + 20, hRow],
                  [half, yScale(d.pages)],
                  [xScale(d.end) - 20, hRow],
                  [xScale(d.start) + 20, hRow]];

      return arr;
    }

    var arc = d3.arc()
          .innerRadius(0)
          .startAngle(Math.PI / 2);

    var arch = function(d){
      var addedAndRemoved = (d.authors.female.added + d.authors.female.removed 
                              + d.authors.male.added + d.authors.male.removed) || 1;

      arc.outerRadius(aScale(addedAndRemoved))
         .endAngle(3 * Math.PI / 2);
      return arc();
    }

    var fArch = function(d){
      var addedAndRemoved = (d.authors.female.added + d.authors.female.removed 
                              + d.authors.male.added + d.authors.male.removed || 1)
          per = (d.authors.female.added + d.authors.female.removed) / 
                    (d.authors.male.added + d.authors.male.removed);

      arc.outerRadius(aScale(addedAndRemoved))
         .endAngle((3 * Math.PI / 2)*per)
      return arc();
    }



    var row = svg.append('g')
        .attr('class', 'row-'+ id);

    row.selectAll('polygon-m')
        .data(data)
        .enter()
        .append('polygon')
        .attr('points', mPoints)
        .attr('class', 'men');

    row.selectAll('polygon-f')
        .data(data)
        .enter()
        .append('polygon')
        .attr('points', fPoints)
        .attr('class', 'women');

    row.selectAll('polygon-t')
        .data(data)
        .enter()
        .append('polygon')
        .attr('points', tPoints)
        .attr('class', 'total');

    row.selectAll('path-s')
      .data(data)
      .enter()
      .append('path')
      .attr('d', arch)
      .style('transform-origin', '0 0')
      .style('transform', function(d, i) { 
        var addedAndRemoved = (d.authors.female.added + d.authors.female.removed 
                                    + d.authors.male.added + d.authors.male.removed) || 1;
        return 'translate(' + (xScale(d.start) + aScale(addedAndRemoved)) + 'px, ' + 300 + 'px)'})
      .attr('class', 'arcs');

    row.selectAll('path-d')
          .data(data)
          .enter()
          .append('path')
          .attr('d', fArch)
          .style('transform-origin', '0 0')
          .style('transform', function(d, i) { 
            var addedAndRemoved = (d.authors.female.added + d.authors.female.removed 
                                        + d.authors.male.added + d.authors.male.removed) || 1;
            return 'translate(' + (xScale(d.start) + aScale(addedAndRemoved)) + 'px, ' + 300 + 'px)'})
          .attr('class', 'dot-arcs');


  }); // ends _.forEach

}); // ends d3.json