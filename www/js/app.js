// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('MGMNTDASHBOARD', [
  'ionic',
  'ion-affix',
  'jett.ionic.filter.bar',
  'MGMNTDASHBOARD.login',
  'MGMNTDASHBOARD.dashboard',
  'MGMNTDASHBOARD.settings',    
  'MGMNTDASHBOARD.profile',    
  'ionic-datepicker',
    'ngMask'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
}).config(function($urlRouterProvider, $ionicConfigProvider ) {
  $urlRouterProvider.otherwise("/login");
  //$ionicConfigProvider.views.maxCache(0);

}).filter('ordinal', function(){
  return function(number){
    if(isNaN(number) || number < 1){
      return number;
    } else {
      var lastDigit = number % 10;
      if(lastDigit === 1){
        return number + 'st'
      } else if(lastDigit === 2){
        return number + 'nd'
      } else if (lastDigit === 3){
        return number + 'rd'
      } else if (lastDigit > 3){
        return number + 'th'
      }else if (lastDigit == 0){
        return number + 'th'
      }
    }
  }
})
/*
 This directive is used to disable the "drag to open" functionality of the Side-Menu
 when you are dragging a Slider component.
 */
  .directive('disableSideMenuDrag', ['$ionicSideMenuDelegate', '$rootScope', function($ionicSideMenuDelegate, $rootScope) {
    return {
      restrict: "A",
      controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {

        function stopDrag(){
          $ionicSideMenuDelegate.canDragContent(false);
        }

        function allowDrag(){
          $ionicSideMenuDelegate.canDragContent(true);
        }

        $rootScope.$on('$ionicSlides.slideChangeEnd', allowDrag);
        $element.on('touchstart', stopDrag);
        $element.on('touchend', allowDrag);
        $element.on('mousedown', stopDrag);
        $element.on('mouseup', allowDrag);

      }]
    };
  }])

  /*
   This directive is used to open regular and dynamic href links inside of inappbrowser.
   */
  .directive('hrefInappbrowser', function() {
    return {
      restrict: 'A',
      replace: false,
      transclude: false,
      link: function(scope, element, attrs) {
        var href = attrs['hrefInappbrowser'];

        attrs.$observe('hrefInappbrowser', function(val){
          href = val;
        });

        element.bind('click', function (event) {

          window.open(href, '_system', 'location=yes');

          event.preventDefault();
          event.stopPropagation();

        });
      }
    };
  }).directive('barGraph', function () {
    return {
        restrict: 'E',
        link: function (scope, element, attr) {
            
            scope.draw = function(updatedData){
                
                var domEle = attr.id,
                    stackKey =["total"],
                    data = updatedData,
                    margin = {top: 20, right: 20, bottom: 30, left: 30},

                    width =  450 - margin.left - margin.right,
                    height = 300 - margin.top - margin.bottom,
                    xScale = d3.scaleBand().range([0, 330]).padding(0),
                    yScale = d3.scaleLinear().range([height, 0]),
                    color =  d3.scaleOrdinal(d3.schemeCategory20),
                    xAxis =  d3.axisBottom(xScale),
                    yAxis =  d3.axisLeft(yScale),

                    svg = d3.select("#"+domEle).append("svg")
                            .attr("class", "svg1")
                            .attr("id",  attr.id+'-svg')
                            .attr("width", width + margin.left + margin.right)
                            .attr("height", height + margin.top + margin.bottom)
                            .append("g")
                            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                    var stack = d3.stack()
                                  .keys(stackKey)
                                  .order(d3.stackOrderNone)
                                  .offset(d3.stackOffsetNone);

                    var layers= stack(data);
                        //xScale.domain(data.map(function(d) { return d.total; }));
                        xScale.domain(data.map(function(d,k) { return k+1; }));
                        yScale.domain([0, d3.max(layers[layers.length - 1], function(d) { return d[0] + d[1]; }) ]).nice();

                    var layer =  svg.selectAll(".layer")
                                    .data(layers)
                                    .enter().append("g")
                                    .attr("class", "layer")
                                    .style("fill", function(d, i) { return color(i); });

                      layer.selectAll("rect")
                           .data(function(d) { return d; })
                           .enter().append("rect")
                           .attr("x", function(d,k) { return k * 12 + 2; })
                           .attr("y", function(d) { return yScale(d[1]); })
                           .attr("height", function(d) { return yScale(d[0]) - yScale(d[1]); })
                           .attr("width", xScale.bandwidth()/2);

                    // code to generate text on graph
                       svg.selectAll(".text")  		
                          .data(data)
                          .enter()
                          .append("text")
                          .attr("class","label")
                          .attr("x", (function(d,k) { return k * 12; }))
                          .attr("y", (function(d) { return yScale(d.total + 0.1)} ))
                          .style("font-size", "45% !important")
                          .text(function(d) { return (d3.format(".0f")(d.total))}); 

                        svg.append("g")
                           .attr("class", "axis axis--x")
                           .attr("transform", "translate(0," + (height+3) + ")")
                           .call(xAxis);

                        svg.append("g")
                           .attr("class", "axis axis--y")
                           .attr("transform", "translate(0,0)")
                           .call(yAxis);
                }
                
                scope.$on('eventName', function(event, data, id){
                        //d3.selectAll("svg").remove();
                        d3.selectAll("#"+attr.id+'-svg').remove();
                        scope.draw(data);
                });
                scope.draw(JSON.parse(attr.data));
                
            }
    };
}).directive('stackGraph', function () {
    return {
        restrict: 'E',
        link: function (scope, element, attr) {
        var domEle = 'stacked-bar',
		stackKey = ["rating", "weightedAvg"],
		data =  JSON.parse(attr.data),
		margin = {top: 20, right: 20, bottom: 30, left: 50},
		parseDate = d3.timeParse("%m/%Y"),
            
		width =  350 - margin.left - margin.right,
		height = 300 - margin.top - margin.bottom,
		xScale = d3.scaleBand().range([0, width]).padding(0.1),
		yScale = d3.scaleLinear().range([height, 0]),
		color =  d3.scaleOrdinal(d3.schemeCategory20),
		xAxis =  d3.axisBottom(xScale).tickFormat(d3.timeFormat("%b")),
		yAxis =  d3.axisLeft(yScale),
		svg = d3.select("#"+domEle).append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		var stack = d3.stack()
					  .keys(stackKey)
					  .order(d3.stackOrderNone)
					  .offset(d3.stackOffsetNone);
            
       var layers= stack(data);
			xScale.domain(data.map(function(d) { return parseDate(d.date); }));
			yScale.domain([0, d3.max(layers[layers.length - 1], function(d) { return d[0] + d[1]; }) ]).nice();

		var layer =  svg.selectAll(".layer")
						.data(layers)
						.enter().append("g")
						.attr("class", "layer")
						.style("fill", function(d, i) { return color(i); });

		  layer.selectAll("rect")
			   .data(function(d) { return d; })
			   .enter().append("rect")
			   .attr("x", function(d) { return xScale(parseDate(d.data.date)); })
			   .attr("y", function(d) { return yScale(d[1]); })
			   .attr("height", function(d) { return yScale(d[0]) - yScale(d[1]); })
               .attr("width", xScale.bandwidth());
            
         // code to generate text on graph
           svg.selectAll(".text")  		
              .data(data)
              .enter()
              .append("text")
              .attr("class","label")
              .attr("x", (function(d) { return (xScale(parseDate(d.date))+10) }  ))
              .attr("y", (function(d) { return yScale(d.rating + d.weightedAvg + 0.1)} ))
              .text(function(d) { return (d3.format(".1f")(d.rating + d.weightedAvg))}); 
        
			svg.append("g")
			   .attr("class", "axis axis--x")
			   .attr("transform", "translate(0," + (height+5) + ")")
			   .call(xAxis);

			svg.append("g")
			   .attr("class", "axis axis--y")
			   .attr("transform", "translate(0,0)")
			   .call(yAxis);	
        
           svg.append("text")
              .attr("x", 60 )
              .attr("y", 8)
              .attr("dy", ".10em")
              .attr("font-size", "12px")
              .style("text-anchor", "end")
              .text(function(d) { return "Rating"; });
       
           svg.append("rect")
              .attr("x",15)
              .attr("y", 0)
              .attr("dy", ".10em")
              .attr("width", 10)
              .attr("height", 10)
              .style("fill", '#aec7e8');
        
        svg.append("text")
              .attr("x", 205 )
              .attr("y", 8)
              .attr("dy", ".10em")
              .attr("font-size", "12px")
              .style("text-anchor", "end")
              .text(function(d) { return "Weighted Average"; });
       
           svg.append("rect")
              .attr("x",95)
              .attr("y", 0)
              .attr("dy", ".10em")
              .attr("width", 10)
              .attr("height", 10)
              .style("fill", '#1f77b4');
        }
    };
}).directive('groupBarGraph', function () {
    return {
        restrict: 'E',
        link: function (scope, element, attr) {
            
                var domEle = attr.id,
                    //stackKey =["total1","total2"],
                    data =  JSON.parse(attr.data),
                    margin = {top: 20, right: 20, bottom: 30, left: 40},
                    width =  350 - margin.left - margin.right,
                    height = 300 - margin.top - margin.bottom;
                var parseDate = d3.timeParse("%d-%m-%Y");    
                var x0 = d3.scaleBand()
                           .rangeRound([0, width])
                           .padding(0.2);

                var x1 = d3.scaleOrdinal();

                var y = d3.scaleLinear()
                          .range([height, 0]);

                var color = d3.scaleOrdinal()
                              .range(["#01579B", "#00BCD4" , "#9575CD", "#5C6BC0"]);

                var xAxis = d3.axisBottom(x0);

                var yAxis = d3.axisLeft(y)
                              .tickFormat(d3.format(".2s"));

                var svg = d3.select("#"+domEle).append("svg")
                            .attr("class", "svg1")
                            .attr("width", width + margin.left + margin.right)
                            .attr("height", height + margin.top + margin.bottom)
                            .append("g")
                            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            
                var ageNames = d3.keys(data[0]).filter(function(key) { return (key !== "month" && key !== "total") ; });

                    data.forEach(function(d) {
                        d.ages = ageNames.map(function(name) {
                            return {name: name, value: +d[name]}; 
                        });
                    });
            
              //  var MA =["JAN","FEB"];
                
                x0.domain(data.map(function(d) { return d.month; }));
               // x2.domain(data.map(function(d) { return MA[d.month] }));
                //x0.domain(data.map(function(d) { return "JAN" }));
                //x1.domain(ageNames).range([0, x0.bandwidth()]);    
                x1.domain(ageNames).range([0, (40/data.length)]);
                y.domain([0, d3.max(data, function(d) { return d3.max(d.ages, function(d) { return d.value; }); })]);
            
                svg.append("g")
                   .attr("class", "x axis")
                   .attr("transform", "translate(0," + height + ")")
                   .call(xAxis);

                svg.append("g")
                   .attr("class", "y axis")
                   .call(yAxis)
                   .append("text")
                   .attr("transform", "rotate(-90)")
                   .attr("y", 6)
                   .attr("dy", ".71em")
                   .style("text-anchor", "end")
                   .text("Population");

                var state;
                if( attr.id == 'yearly-bar-info'){
                    
                   state = svg.selectAll(".Month")
                               .data(data)
                               .enter().append("g")
                               .attr("class", "Month")
                               .attr("transform", function(d) { return "translate(" + (x0(d.month)+(58/data.length)) + ",0)"; });
                    
                    state.selectAll("rect")
                         .data(function(d) {
                             return d.ages; 
                         })
                         .enter()
                         .append("rect")
                         .attr("width", (40/data.length))
                         .attr("x", function(d) { return x1(d.name); })
                         .attr("y", function(d) { return y(d.value); })
                         .attr("height", function(d) { return height - y(d.value); })
                         .style("fill", function(d) { return color(d.name); }) 
                    
                }else{
                   state = svg.selectAll(".Month")
                               .data(data)
                               .enter().append("g")
                               .attr("class", "Month")
                               .attr("transform", function(d) { return "translate(" + (x0(d.month)+(68/data.length)) + ",0)"; });
                    
                    state.selectAll("rect")
                         .data(function(d) {
                             return d.ages; 
                         })
                         .enter()
                         .append("rect")
                         .attr("width", (40/data.length))
                         .attr("x", function(d) { return x1(d.name); })
                         .attr("y", function(d) { return y(d.value); })
                         .attr("height", function(d) { return height - y(d.value); })
                         .style("fill", function(d) { return color(d.name); }) 
                    
                } 

                var legend = svg.selectAll(".legend")
                                .data(ageNames.slice().reverse())
                                .enter().append("g")
                                .attr("class", "legend")
                                .attr("transform", function(d, i) { return "translate(0," + i * 15 + ")"; });
                          
                    legend.append("rect")
                          .attr("x", width+10)
                          .attr("width", 9)
                          .attr("height", 9)
                          .style("fill", color);
                         
                    legend.append("text")
                          .attr("x", width)
                          .attr("y", 3)
                          .attr("dy", ".35em")
                          .attr("font-size", "10px")
                          .style("text-anchor", "end")
                          .text(function(d) { return d; });
            
        }
      }
});
