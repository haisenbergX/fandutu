/**
 * Created by user on 2016/11/25.
 */
(function () {
        var width = parseInt($('.G').css('width')),
            height = parseInt($('.G').css('height'));

        var activitMap = [];


        var svg = d3.select(".G").append("svg")
            .attr("width", width)
            .attr("height", height);
        svg.append('defs').append('radialGradient').attr('id', 'radial').attr('cx', '50%').attr('cy', '50%')


        d3.select('#radial').selectAll('stop').data([{
            offset: '50%',
            color: ''
        }, {offset: '50%'}, {offset: '50%'}]).enter().append('stop').attr('offset', function (d) {
        }).style('stop-color', function (d) {

        })

//活动地图
        svg.append('text').attr('id','xs')
            .text('可疑人员活动地区图')  .style("fill", "#fff")
            .style('font-size', '25').attr('transform',"translate(" + 100 + "," + 25 + ")");

//消失分子图
      svg.append('text').attr('id','xs')
        .text('消失地点图')  .style("fill", "#fff")
          .style('font-size', '25').attr('transform',"translate(" + 700 + "," + 25 + ")")


        var projection = d3.geoMercator()
            .center([107, 31])
            .scale(2500)
//.translate([width/2, height/2]);

        var path = d3.geoPath()
            .projection(projection);


        var color = d3.schemeCategory20;


        d3.json("data/yunnan.json", function (error, toporoot) {
            if (error)
                return console.error(error);
            var groups = svg.append("g").attr('transform', function (d) {
                return "translate(" + 0 + "," + (-300) + ")"
            });

            groups.selectAll("path")
                .data(toporoot)
                .enter()
                .append("path")
                .attr("class", "province")
                .style("fill", function (d, i) {
                    return '#435180'
                })
                .attr("d", path);

            svg.append('g').attr('id', 'xx').attr('transform', function (d) {
                return "translate(" + width / 2 + "," + (-300) + ")"
            }).selectAll(".path")
                .data(toporoot)
                .enter()
                .append("path")
                .attr("class", "province")
                .style("fill", function (d, i) {
                    return '#435180'
                })
                .attr("d", path)
            ;
            //市的名称说明
            svg.append('g').attr('transform', function (d) {
                return "translate(" + 0 + "," + (-300) + ")"
            }).selectAll('.text')
                .data(toporoot)
                .enter()
                .append('text')
                .style("fill", "black")
                .text(function (d) {
                    return d.properties.name
                })
                .style('font-size', '5')
                .attr('transform', function (d) {
                    return 'translate(' + projection(d.properties.cp) + ')';
                })

            //消失的名称说明
            svg.append('g').attr('transform', function (d) {
                return "translate(" + 0 + "," + (-300) + ")"
            }).selectAll('.textN')
                .data(toporoot)
                .enter()
                .append('text')
                .style("fill", "black")
                .text(function (d) {
                    return d.properties.name
                })
                .style('font-size', '5')
                .attr('transform', function (d) {
                    return 'translate(' + [projection(d.properties.cp)[0] + width / 2, projection(d.properties.cp)[1]] + ')';
                })
            circleB = svg.append('g').attr('transform', function (d) {
                return "translate(" + 0 + "," + (-300) + ")"
            })
            circleC = svg.append('g').attr('id', 'Cx').attr('transform', function (d) {
                return "translate(" + width / 2 + "," + (-300) + ")"
            })
            activitMap = [{hotel: [99.1516, 26.5594], name: '7天连锁酒店'}, {
                hotel: [98.1299, 24.5874],
                name: 'asd'
            }, {hotel: [104.8865, 23.5712], name: 'asd'}]
            hotel(activitMap)
            slider.transition() // Gratuitous intro!
                .duration(50)
                .tween("hue", function () {
                    // var i = d3.interpolate(0, 0.1);
                    return function (t) {
                        hue(0, x, handle, hotel, abnormality);
                    };
                });
        });

        var x = d3.scaleLinear()
            .domain([1, 7])
            .range([0, width / 2])
            .clamp(true);
        var slider = svg.append("g")
            .attr("class", "slider")
            .attr("transform", "translate(" + 250 + "," + (height - 100) + ")");

        slider.append("line")
            .attr("class", "track")
            .attr("x1", x.range()[0])
            .attr("x2", x.range()[1])
            .select(function () {
                return this.parentNode.appendChild(this.cloneNode(true));
            })
            .attr("class", "track-inset")
            .select(function () {
                return this.parentNode.appendChild(this.cloneNode(true));
            })
            .attr("class", "track-overlay")
            .call(d3.drag()
                .on("start.interrupt", function () {
                    slider.interrupt();
                })
                .on("start drag", function () {
                    hue(x.invert(d3.event.x), x, handle, hotel, abnormality);
                })
            );
        slider.insert("g", ".track-overlay")
            .attr("class", "ticks")
            .attr("transform", "translate(0," + 18 + ")")
            .selectAll("text")
            .data(x.ticks(8))
            .enter().append("text")
            .attr("x", x)
            .attr("text-anchor", "middle")
            .text(function (d) {
                return d + "天";
            });

        var handle = slider.insert("circle", ".track-overlay")
            .attr("class", "handle")
            .attr("r", 9);

        function hotel(activitMap) {
            //酒店位置圆形
            d3.selectAll('.circlec').remove();
            d3.selectAll('.activityText').remove();
            circleB.selectAll('.cicrcle')
                .data(activitMap)
                .enter()
                .append('circle')
                .attr('class', function (d) {

                    return 'circlec'
                })
                .attr('r', '6')
                .attr('fill', function (d, i) {
                    return 'url(#radial)';
                })
                .attr('transform', function (d) {
                    return 'translate(' + projection(d.hotel) + ')';
                })
                .style('fill', function (d) {
                    if (d.color) {
                        return d.color
                    }
                })
            circleB.selectAll('.activityText')
                .data(activitMap)
                .enter()
                .append('text')
                .attr('class', 'activityText')
                .style("fill", "red")
                .text(function (d) {
                    return d.name
                })
                .style('font-size', '15')
                .attr('transform', function (d) {
                    return 'translate(' + [projection(d.hotel)[0] - 25, projection(d.hotel)[1] - 20] + ')';
                })

        }

        function abnormality(activitMap) {
            d3.selectAll('.circleb').remove();
            d3.selectAll('.vanishText').remove();
            circleC.selectAll('.cicrcleC')
                .data(activitMap)
                .enter()
                .append('circle')
                .attr('class', function (d) {

                    return 'circleb'
                })
                .attr('r', '6')
                .attr('fill', function (d, i) {
                    return 'url(#radial)';
                })
                .style('fill', function (d) {
                    if (d.color) {
                        return d.color
                    }
                })
                .attr('transform', function (d) {
                    return 'translate(' + projection(d.hotel) + ')';
                })
            circleC.selectAll('.vanishText')
                .data(activitMap)
                .enter()
                .append('text')
                .attr('class', 'vanishText')
                .style("fill", "red")
                .text(function (d) {
                    return d.name
                })
                .style('font-size', '15')
                .attr('transform', function (d) {
                    return 'translate(' + [projection(d.hotel)[0] - 25, projection(d.hotel)[1] - 20] + ')';
                })
        }


        /*function hue(h) {
         // let b=Math.ceil(x(h)/(600/6))
         let b=  Math.round(x(h)/(502/6))

         handle.attr("cx", (b)*(502/6));
         console.log((b)*(502/6))
         //   svg.style("background-color", d3.hsl(h, 1, 0.8));


         var c   =[{data:[{hotel:[99.1516, 26.5594],name:'7天连锁酒店'},{hotel:[98.1299, 24.5874],name:'asd'},{hotel:[104.8865, 23.5712],name:'asd'}]},{data:[{hotel:[99.1516, 26.5594],name:'asd'}]}
         ,{data:[{hotel:[103.0408, 23.6041],name:'asd'}]},{data:[{hotel:[104.8865, 23.5712],name:'asd'}]},{data:[{hotel:[100.7446, 23.4229],name:'asd'}]}
         ,{data:[{hotel:[104.0955, 27.6031],name:'asd'}]},{data:[{hotel:[98.1299, 24.5874],name:'asd'}]}]
         activitMap=c[(b)].data
         hotel()
         abnormality()
         }*/
    })()