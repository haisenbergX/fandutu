/**
 * Created by user on 2016/11/25.
 */
function leave(airPath, toporoot){
    d3.select('.A').select('svg').remove();
var width =parseInt( $('.A').css('width')),
    height = parseInt($('.A').css('height'))
    airLine = [];


    if (!d3.select('.A').select('svg')._groups[0][0]) {
        svg = d3.select(".A").append("svg")
            .attr("width", width)
            .attr("height", height);
        svg.append('defs').append('radialGradient').attr('id', 'radial').attr('cx', '50%').attr('cy', '50%')


        d3.select('#radial').selectAll('stop').data([{
            offset: '50%',
            color: ''
        }, {offset: '50%'}, {offset: '50%'}]).enter().append('stop').attr('offset', function (d) {
            // return d
        }).style('stop-color', function (d) {

        })
        //出境标题
        svg.append('text')
            .text('云南离境图')  .style("fill", "#fff")
            .style('font-size', '25').attr('transform',"translate(" + width/3 + "," + 25 + ")")
    }



var projection = d3.geoMercator()
    .center([107, 31])
    .scale(2500)
//.translate([width/2, height/2]);

var path = d3.geoPath()
    .projection(projection);


var color = d3.schemeCategory20 ;


    var groups = svg.append("g").attr('transform',function(d){
        return "translate(" +(-50)+ "," +(-300) + ")"
    });
    groups.selectAll("path")
        .data( toporoot )
        .enter()
        .append("path")
        .attr("class","province")
        .style("fill", function(d,i){
            return '#435180'
        })
        .attr("d", path );
    //市的名称说明
    svg.append('g').attr('transform',function(d){
        return "translate(" +(-50)+ "," +(-300) + ")"
    }).selectAll('.text')
        .data(toporoot)
        .enter()
        .append('text')
        .style("fill","black")
        .text(function(d){
            return d.properties.name
        })
        .style('font-size','5')
        .attr('transform', function (d) {
            return 'translate(' + projection(d.properties.cp) + ')';
        })

    //市位置圆形
    svg.append('g').attr('transform',function(d){
        return "translate(" +(-50)+ "," +(-300) + ")"
    }).selectAll('cicrcle')
        .data(toporoot)
        .enter()
        .append('circle')
        .attr('class',function(d){
            for(let i=0;i<airPath.length;i++){
                if(airPath[i].source==d.properties.name){
                    return 'circlex'
                }
            }
            return
        })
        .attr('r', function(d){
            for (let i = 0; i < airPath.length; i++) {
                if (airPath[i].source == d.properties.name) {
                    airPath[i].targetX = (projection(d.properties.cp)[0] - 50)
                    airPath[i].targetY = (projection(d.properties.cp)[1] - 300);
                    airLine.push('M'+(projection(d.properties.cp)[0]-50)+','+(projection(d.properties.cp)[1]-300)+' Q'+((projection(d.properties.cp)[0]+600)/2-50)+','+(projection(d.properties.cp)[1]+20-300)+','+(600-50)+','+(height/2-i*50-5-300))
                }
            }
            return '5'
        })
        .attr('fill', function(d,i){
            return 'none';
        })
        .attr('transform', function (d) {
            return 'translate(' + projection(d.properties.cp) + ')';
        })



    //飞机路径图
    var air=	svg.append('g').selectAll('.airPath')
        .data(airLine)
        .enter()
        .append('path')
        .attr("class","airPath")
        .attr('d',function(d,h){
          return d
        }).style('fill','none')




    var svg_mark = svg.selectAll("arrows.mark")
        .data(airLine)
        .enter()
        .append('path')
        .attr('d','M2,2 L10,6 L2,10 L6,6 L2,2')
        .attr('class',function(d){
                    return 'airPath'
        })
        .style('stroke','red')
        .style('stroke-width','4px');



    svg_mark.append("animateMotion").attr("path",function(d,h){
       return d
    }).attr("dur","3s").attr("begin","0s").attr("repeatCount","indefinite").attr("rotate","auto");


    //市的名称说明

    svg.append('g').selectAll('.airText')
        .data(airPath)
        .enter()
        .append('text')
        .style("fill","yellow")
        .text(function(d){
            if(d.show){
                return d.flight+"XX天"+d.time
            }else{
                return d.flight
            }
        })
        .style('font-size','20')
        .attr('transform', function (d) {
            return 'translate(' + [d.targetX, d.targetY] + ')';
        })
;}