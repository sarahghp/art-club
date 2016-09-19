console.log('Hi.');

d3.json('../data-sets/norton.json', function(data){
  console.log(data);

  var svg = d3.select('svg'),
      w = +svg.attr('width'),
      h = +svg.attr('height'),
      hRow = 275
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
          .domain([1400, 2012])
          .range([0, w]),
        yScale = d3.scaleLinear()
          .domain([0, 1900])
          .range([0, hRow]);

    var points = function(d) {
      return [[xScale(d.start), hRow], [xScale(d.start), hRow - yScale(d.authors.male.total_pages)], [xScale(d.end), hRow], [xScale(d.start), hRow]]
    }

    var row = svg.append('g')
        .attr('class', 'row-'+ id);

    row.selectAll('polygon')
        .data(data)
        .enter()
        .append('polygon')
        .attr('points', points);




  }); // ends _.forEach

}); // ends d3.json