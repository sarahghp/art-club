console.log('Hi.');

d3.json('../data-sets/norton_after1820.json', function(data){
  console.log(data);

  var svg = d3.select('svg'),
      w = +svg.attr('width'),
      h = +svg.attr('height'),
      hRow = 500
      margin = {
        top: 200,
        left: 200
      },
      padding = {
        top: 200
      };

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
          .range([0, w]),
        yScale = d3.scaleLinear()
          .domain([0.1, 2000])
          .range([hRow, 0]);

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
      var arr = [[xScale(d.end), hRow], 
                  [xScale(d.end), yScale(d.authors.female.total_pages)], 
                  [start, hRow], 
                  [xScale(d.end), hRow]];
      return arr;
    };

    var tPoints = function(d){
      var half = xScale(d.start) + (xScale(d.end) - xScale(d.start))/2;
      var arr = [[xScale(d.start), hRow],
                  [half, yScale(d.pages)],
                  [xScale(d.end), hRow],
                  [xScale(d.start), hRow]];

      return arr;
    }

    var row = svg.append('g')
        .attr('class', 'row-'+ id);

    row.selectAll('polygon-m')
        .data(data)
        .enter()
        .append('polygon')
        .attr('points', mPoints);

    row.selectAll('polygon-f')
        .data(data)
        .enter()
        .append('polygon')
        .attr('points', fPoints);

    row.selectAll('polygon-t')
        .data(data)
        .enter()
        .append('polygon')
        .attr('points', tPoints);




  }); // ends _.forEach

}); // ends d3.json