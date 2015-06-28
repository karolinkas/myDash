'use strict';

angular.module('myDashApp').directive('barchart', ["d3Service", function(d3Service){
	// Runs during compile
	return {		
		restrict: 'A', 
		link: function($scope, element) {

			d3Service.d3().then(function(d3) {

				element.append('<svg></svg><div id="slider"></div>');
	//
				var data = [{
				    'time': 'monday',
				        'int-verbal': 10,
				        'int_math': 25,
				        'int_social': 65
				}, {
				    'time': 'tuesday',
				        'int-verbal': 5,
				        'int_math': 10,
				        'int_social': 85
				}, {
				    'time': 'wednesday',
				        'int-verbal': 10,
				        'int_math': 60,
				        'int_social': 30
				}, {
				    'time': 'thursday',
				        'int-verbal': 20,
				        'int_math': 10,
				        'int_social': 70
				}, {
				    'time': 'friday',
				        'int-verbal': 10,
				        'int_math': 15,
				        'int_social': 75
				}];


				var times = data.map(function (d) {
				    return d.time;
				});
				var intelligence = d3.keys(data[0])
				    .filter(function (key) {
				    return key !== 'time';
				});

				data.forEach(function (d) {

				    d.progress = intelligence.map(function (name) {
				        return {
				            'intelligence': name,
				                'progressNum': d[name]
				        };
				    });
				    d.totalProgress = d3.sum(d.progress, function (d) {
				        return d.progressNum;
				    });
				});

				var margin = {
				    top: 40,
				    right: 10,
				    bottom: 50,
				    left: 50
				},
				width = 560 - margin.left - margin.right,
				    height = 300 - margin.top - margin.bottom;

				var lineScaleX = d3.scale.ordinal()
				    .domain(times)
				    .rangeBands([0, width], 0.5);

				var lineScaleY = d3.scale.linear()
				    .domain([0, 100])
				    .range([height, 0]);

				var x = d3.scale.ordinal()
				    .domain(times)
				    .rangeRoundBands([0, width], 0.5);


				var y = d3.scale.linear()
				    .domain([0, d3.max(data, function (d) {
				    return d.totalProgress;
				})])
				    .range([height, 0]);

				var color = d3.scale.ordinal()
				    .domain(intelligence)
				    .range(['#ffd75f', '#f8a83a', '#0157A0']);

				var colorFill = d3.scale.ordinal()
				    .domain(intelligence)
				    .range(['#fef2ce', '#fce4c3', '#b2cce2']);

				var xAxis = d3.svg.axis()
				    .scale(x)
				    .orient('bottom');


				var yAxis = d3.svg.axis()
				    .scale(y)
				    .orient('left');


				var line = d3.svg.line()
				    .interpolate('cardinal')
				    .x(function (d, i) {
				    return lineScaleX(d.x) + x.rangeBand() / 2;
				})
				    .y(function (d, i) {
				    return lineScaleY(d.y0);
				});


				var svg = d3.select('svg')
				    .attr('width', width + margin.left + margin.right)
				    .attr('height', height + margin.top + margin.bottom)
				    .append('g')
				    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


				var layers = intelligence.map(function (name) {
				    return data.map(function (d) {
				        return {
				            'x': d.time,
				                'y': d[name],
				                'intelligence': name
				        };
				    });
				});


				var stack = d3.layout.stack();

				stack(layers);

				svg.append('g')
				    .attr('class', 'grid')
				    .attr('transform', 'translate(' + x.rangeBand() + ',' + height + ')')
				    .call(makeGrid()
				    .tickSize(-height, 0, 0)
				    .tickFormat(''));

				var layer = svg.selectAll('.layer')
				    .data(layers)
				    .enter().append('g')
				    .attr('class', 'layer')
				    .style('fill', function (d, i) {
				    return colorFill(i);
				});


				var bars = layer.selectAll('rect')
				    .data(function (d) {
				    return d;
				})
				    .enter().append('rect')
				    .attr('class', 'bars')
				    .attr('height', 0)
				    .attr('y', height)
				    .transition()
				    .duration(2000)
				    .attr('y', function (d) {
				    return y(d.y + d.y0);
				})
				    .attr('x', function (d, i) {
				    return x(d.x);
				})
				    .attr('height', function (d) {
				    return height - y(d.y);
				})
				    .attr('width', x.rangeBand());



				var groupOfLines = svg.selectAll('path')
				    .data(layers)
				    .enter().append('path')
				    .attr('class', 'lines')
				    .attr('d', line)
				    .attr('opacity', 0)
				    .transition()
				    .delay(2000)
				    .duration(2000)
				    .attr('fill', 'none')
				    .style('stroke', function (d, i) {
				    return color(i);
				})
				    .attr('stroke-width', '2px')
				    .attr('opacity', 1);


				function makeGrid() {
				    return d3.svg.axis()
				        .scale(x)
				        .orient('bottom')
				        .ticks(5);
				}


				svg.append('g')
				    .attr('class', 'x axis')
				    .attr('transform', 'translate(0,' + height + ')')
				    .call(xAxis);

				//AXIS LABELS
				svg.append('text')
				    .attr('transform', 'translate(' + (width - 30) + ' ,' + (height + margin.bottom * 0.75) + ')')
				    .style('text-anchor', 'middle')
				    .text('Day of the week');

				svg.append('text')
				    .attr('transform', 'rotate(-90)')
				    .attr('y', 0 - margin.left)
				    .attr('x', 0 - (height / 2))
				    .attr('dy', '1em')
				    .style('text-anchor', 'middle')
				    .text('Success');

				svg.append('g')
				    .attr('class', 'y axis')
				    .call(yAxis);


				$(function () {
				    $('#slider').slider({
				        range: true,
				        min: 0,
				        max: times.length - 1,
				        values: [0, times.length - 1],
				        slide: function (event, ui) {
				            var maxv = d3.min([ui.values[1], times.length]);
				            var minv = d3.max([ui.values[0], 0]);

				            //update domain
				            var newtimes = times.slice(minv, maxv + 1);
				            x.domain(newtimes);
				            lineScaleX.domain(newtimes);

				            console.log(newtimes.length);
				            //change Data
				            var slicedData = layers.map(function (layer) {
				                return layer.slice(minv, maxv + 1);
				            });

				            //create new axis
				            svg.transition().duration(750)
				                .select('.x.axis').call(xAxis);

				            // add new Data
				            var addNew = svg.selectAll('.layer')
				                .data(slicedData);


				            // add new rect
				            addNew.selectAll('rect')
				                .data(function (d) {
				                return d;
				            })
				                .attr('class', 'bars');


				            //update exisiting one       
				            svg.selectAll('.bars')
				                .transition().duration(750)
				                .attr('class', 'bars updatedBars')
				                .attr('y', function (d) {
				                return y(d.y + d.y0);
				            })
				                .attr('x', function (d, i) {
				                return x(d.x);
				            })
				                .attr('height', function (d) {
				                return height - y(d.y);
				            })
				                .attr('width', x.rangeBand());

				            if (newtimes.length < 5) {
				                $('.bars:nth-child(5)').hide();
				            } else {
				                $('.bars:nth-child(5)').show();
				            }
				            if (newtimes.length < 4) {
				                $('.bars:nth-child(4)').hide();
				            } else {
				                $('.bars:nth-child(4)').show();
				            }
				            if (newtimes.length < 3) {
				                $('.bars:nth-child(3)').hide();
				            } else {
				                $('.bars:nth-child(3)').show();
				            }


				            svg.selectAll('path')
				                .data(slicedData)
				                .transition().duration(750)
				                .attr('class', 'lines newLines')
				                .attr('d', line)
				                .attr('fill', 'none')
				                .style('stroke', function (d, i) {
				                return color(i);
				            })
				                .attr('stroke-width', '2px')
				                .attr('opacity', 1);

			           }
			        }
			    });
			});

//			
		}
	};
}]);