/**
 * Created by user on 2016/11/25.
 */

function headTop(man) {

    /*   d3.selectAll('.head').remove();
     d3.selectAll('tspan').remove();*/
    //  d3.select('.C').select('svg').remove()
    var width = $('.C').css('width');
    var height = $('.C').css('height');
    if (!d3.select('.C').select('svg')._groups[0][0]) {

        svg = d3.select('.C').append('svg').attr('width', width).attr('height', height);
        svg.append('text').text('可疑分子').attr('x', 360).attr('y', 50).style('font-size', '44px').style('fill','#fff');
        headimage=svg.append('g')
        headtext =svg.append('g')
    }
    svg_head = headimage.selectAll(".head")
        .data(man);
    svg_head
        .enter()
        .append("image")
        .attr('class', function (d) {
            return 'head '+d.name
        })
        .attr("width", 50)
        .attr("height", 50)

        .attr("xlink:href", function (d) {
            return "image/" + d.image;
        }).on('click',showExitEntry)
        .on('dblclick',dbshow).transition()
        .duration(2000).attr('x', function (d) {
        return d.x * 50 + 200
       }).attr('y', function (d) {
        return d.y * 50
       });
    svg_head.exit().transition()
        .duration(2000).style('opacity', 0).remove();
    var svg_text = headtext.selectAll(".headtext")
        .data(man);
    svg_text
        .enter()
        .append('text')
        .attr('class', function (d) {
            return 'headtext '+d.name
        })
        .attr('transform', function (d) {
            return 'translate(' + (d.x * 50 + 180) + ',' + (d.y * 50 - 35) + ')'
        })
        .append('tspan')
        .attr('x', '0')
        .attr("dy", "1em")
        .attr('class',function(d){
            return d.name
        })
        .text(function (d) {
            return '姓名' + d.name;
        }).style('fill','#fff')
        .append('tspan')
        .attr('x', '0')
        .attr("dy", "1em")
        .text(function (d) {
            return '可疑程度' + d.degree;
        }).style('fill','#fff')
    svg_text.exit().transition()
        .duration(2000).style('opacity', 0).remove()
}