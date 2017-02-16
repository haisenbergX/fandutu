// 力导图
var hx;
var hy;
var forceNew;
var zoomshow = "noshow";
var scalzgood;
var scalezoom;
var svg_marknNew;
var svg_mpath;
var mousedown_node = null;
var mouseXY = {
    x : 0,
    y : 0
};
// 滚轮禁用
function zoomcontrollershow() {
    if(zoomshow == "show") {
        $("#biggo").css("cssText", "background:rgba(255,255,255,0.1) !important");
        zoomshow = "noshow";
        scalezoom.scaleExtent([scalzgood, scalzgood]);
    } else {
        $("#biggo").css("cssText", "background:rgba(0,255,0,0.4) !important");
        zoomshow = "show";
        scalezoom.scaleExtent([0.8, 8]);
    }
}
function Topology(ele, topoheight) {
    typeof (ele) == 'string';
    d3.select("#" + ele).select("svg").remove();
    ele = document.getElementById(ele);
    d3.select("#topoborder").selectAll(".tooltip").remove();
    // 画布宽、高
    this.width = ele.clientWidth;
    this.height = ele.clientHeight;
    hx = this.width / 2;
    hy = this.height / 2;
    var self = this;
    selfforce = self;
    // 声明一个力导向图
    this.force = d3.layout.force().linkDistance(90).gravity(.05).distance(80).linkStrength(1)
            .charge(-500).size([this.width, this.height]);
    forceNew = this.force;
    
    // 节点
    this.nodes = this.force.nodes();
    // 连线
    this.links = this.force.links();
    // 提示框
    this.tooltip = d3.select("#topoborder").append("div").attr("class", "tooltip");
    // 节点点击事件
    this.clickFn = function() {
    };
    // 声明一个svg画布
    this.container = d3.select(ele).append("svg:svg").attr("width", this.width).attr("height",
            this.height).attr('clip-path', 'url(#cut-off)').attr("pointer-events", "all").append(
            'g').attr('id', 'thumbnail');
    // 连线箭头图形
    this.container.append('svg:defs').append('svg:marker').attr('id', 'end-arrow').attr('viewBox',
            '0 -5 10 10').attr('refX', 6).attr('markerWidth', 3).attr('markerHeight', 3).attr(
            'orient', 'auto').append('svg:path').attr('d', 'M0,-5L10,0L0,5').attr('fill', 'green');
    // 箭头
    drag_line = this.container.append('svg:path').attr('class', 'link dragline hidden').attr('d',
            'M0,0L0,0');
    // 用于监听力导向图的缩放
    this.zoomListener = d3.behavior.zoom().scaleExtent([1, 1]) // 缩放最小和最大值
    .on("zoom", function() {
        self.doZoom();
    });
    scalezoom = this.zoomListener;
    // 专门用于 拖动 / 缩放，为了避免 translate 的共同作用缺陷
    this.zoomVis = this.container.append('g').call(this.zoomListener);
    
    // 专用于存放图表实体
    this.vis = this.container.append('g');
    
    // 用于画布的拖动
    getfocus = this.zoomVis.append('rect').attr({
        width : (hx * 2),
        height : (hy * 2),
        class : 'zoom-background',
        transform : 'translate(0,0)scale(1)'
    });
    
    this.force.on("tick", function(d) {
        /*
         * //箭头移动 svg_marknNew.attr("transform", function(d) { return
         * "translate(" + (d.source.x-15)+ "," +(d.source.y-10)+ ")"; }); //箭头移动
         * svg_mpath.attr("path",function(d){
         * 
         * return "M0,0L"+(d.target.x-d.source.x)+","+ (d.target.y-d.source.y); })
         */

        /*
         * if(tablechange=="limit"){ nodskkk.forEach(function(d,i){ d.x = d.x -
         * 400 < 0 ? 400 : d.x ; d.x = d.x + 40 > (hx*1.2) ? (hx*1.2) : d.x ;
         * d.y = d.y - 30 < 0 ? 30 : d.y ; d.y = d.y + 30 + 20 > hy*1.8 ? hy*1.8 -
         * 30 - 20 : d.y ; }); }
         */

        self.vis.selectAll(".node").attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
        });
        self.vis.selectAll(".link").attr("x1", function(d) {
            return d.source.x;
        }).attr("y1", function(d) {
            return d.source.y;
        }).attr("x2", function(d) {
            return d.target.x;
        }).attr("y2", function(d) {
            return d.target.y;
        });
        
    });
}
// 樹狀圖佈局轉換
var childUp_ip = "";
function treechange() {
    linkstree = linktree// 连线状态
    if(forceopen != "open") {
        forceshow();
    }
    $('#treego').css("cssText", "background:rgba(0,255,0,0.4) !important");
    $('#forcego').css("cssText", "background:rgba(255,255,255,0.1) !important");
    var nodeclone = [];
    var poornode = [];
    $.extend(nodeclone, nodskkk);
    // setObj = new Set();
    setObj = {};
    for( var p = 0; p < linkstree.length; p++) {
        /*
         * setObj.add(linkstree[p].source.ip);
         * setObj.add(linkstree[p].target.ip);
         */
        setObj[linkstree[p].source.id] = linkstree[p].source.ip;
        setObj[linkstree[p].target.id] = linkstree[p].target.ip;
    }
    for( var p = 0; p < nodeclone.length; p++) {
        if(!setObj.hasOwnProperty(nodeclone[p].id)) {
            delete nodeclone[p];
        }
    }
    for( var i = 0; i < nodeclone.length; i++) {
        if(nodeclone[i] != undefined) {
            poornode.push(nodeclone[i]);
        }
    }
    //封装对应任意节点树形连线 
    debugger;
    var obj = {};
    var compare = 1;
    var max;
    for(var i=0; i<linktree.length;i++){ //
    	var startPort = linktree[i].source.ip;
    	var endPort = linktree[i].target.ip;
    	obj[startPort]?obj[startPort]++:(obj[startPort]=1);
    	obj[endPort]?obj[endPort]++:(obj[endPort]=1);
    	if(obj[startPort]>compare){compare=obj[startPort];max = startPort;}
    	if(obj[endPort]>compare){compare=obj[endPort];max = endPort;}
    	//你判断啦个IP是最高权重
    }
//    console.log(obj);
    var treeJson = {};
    treeJson.name=max;
    treeJson.parent="root";
    createJson(treeJson);
    function createJson(par){
    	debugger;
        var children = par.children = [];
        for(var j=0; j<linktree.length;j++){
        	if(!linktree[j].checked){
	        	var startPort = linktree[j].source.ip;
	        	var endPort = linktree[j].target.ip;
	        	if(startPort == par.name){
	            		var child = {};
	            		child.name = endPort;
	            		children.push(child);
	        			child.parent = par.name;
	        			linktree[j].checked = true;
	        	}
	        	else if(endPort == par.name){
	        			var child = {};
	            		child.name = startPort;
	            		children.push(child);
	        			child.parent = par.name;
	        			linktree[j].checked = true;
	        	}
        	}
        }
        children.forEach(function(child){
        	createJson(child);
        });
    }
//    console.log(treeJson);
    
//    var root = stratify().id(function(d) {
//        return d.ip;
//    }).parentId(function(d) {
//        return d.father_ip;
//    })(poornode);
    
    var tree = d3.layout.tree().size([hx * 2, hy * 1]);
//    var treenew = tree.nodes(root);
    var treenew = tree.nodes(treeJson);
    d3.selectAll(".node").transition().duration(2000).attr("transform", function(d, i) {
        for( var i = 0; i < treenew.length; i++) {
            if(d.ip == treenew[i].id) {
                d.fixed = true;
                return "translate(" + treenew[i].x + "," + (treenew[i].y + 100) + ")";
            }
            if(!setObj.hasOwnProperty(d.id)) {
                return "translate(" + d.x + "," + d.y + ")";
            }
        }
        
    });
    d3.selectAll("line").transition().duration(2000).attr("x1", function(d) {
        for( var i = 0; i < treenew.length; i++) {
            if(d.source.ip == treenew[i].id) {
                return treenew[i].x;
            }
        }
    }).attr("y1", function(d) {
        for( var i = 0; i < treenew.length; i++) {
            if(d.source.ip == treenew[i].id) {
                return treenew[i].y + 100;
            }
        }
    }).attr("x2", function(d) {
        for( var i = 0; i < treenew.length; i++) {
            if(d.target.ip == treenew[i].id) {
                return treenew[i].x;
            }
        }
    }).attr("y2", function(d) {
        for( var i = 0; i < treenew.length; i++) {
            if(d.target.ip == treenew[i].id) {
                return treenew[i].y + 100;
            }
        }
    })
    setTimeout(function() {
        nodskkk.forEach(function(d) {
            for( var i = 0; i < treenew.length; i++) {
                if(d.ip == treenew[i].id) {
                    d.px = treenew[i].x;
                    d.py = (treenew[i].y + 100);
                    d.x = treenew[i].x;
                    d.y = (treenew[i].y + 100);
                }
                if(!setObj.hasOwnProperty(d.id)) {
                    d.px = d.x;
                    d.py = d.y;
                }
            }
        });
    }, 2000);
}
// 保存
var save;
function savetopo() {
    var topoSave = [];
    var domainIdNew = $("#single option:selected").attr("id");
    save.forEach(function(d, i) {
        var topoid;
        if(topoSaveDo.length == 0) {
            topoid = null;
        } else {
            if(i >= topoSaveDo.length) {
                topoid = null;
            } else {
                topoid = topoSaveDo[i].id;
            }
            
        }
        
        topoSave.push({
            name : d.name,
            x : d.x,
            y : d.y,
            domain_id : domainIdNew,
            id : topoid
        });
    });
    $.ajax({
        url : "topo/save",
        data : {
            topoSave : JSON.stringify(topoSave)
        },
        dataType : "json",
        type : "post",
        error : function() {
        },
        success : function(data) {
        }
    });
}
var topoSaveDo = null;
// 点击删除连线
Topology.prototype.deleteLink = function(d) {
    linktree.forEach(function(a, i) {
        if(d.source.index == a.source.index && d.target.index == a.target.index) {
            linktree.splice(i, 1)
        } else {
        }
    });
    forceNew.start();
    d3.select('#nodeLine').selectAll("line").data(linktree).exit().remove();
    var targetIds = [];
    linktree.filter(function(f) {
        if(f.source.id == d.source.id) {
            targetIds.push(f.target.id.substr(4))
        }
        
    });
    //清空历史father_ip数据
    for(var i=0;i < d.target.father_ip.length; i++){
    	 d.target.father_ip = [];
    }
    $.ajax({
        url : "topo/links/" + d.source.id.substr(4),
        type : "post",
        data : {
            "targetIds" : function() {
                return targetIds.toString()
            }
        },
    });
    d3.select('#nodeLine').selectAll("line").data(linktree).exit().remove();
}
// 初始化实体排列
Topology.prototype.initNode = function() {
    // 力导初始化位置分配
    var domainIdNew = $("#single option:selected").attr("id");
    $.ajax({
        url : "topo/findByUsrIdAndDomainId",
        data : {
            "domainIdNew" : domainIdNew
        },
        type : "post",
        error : function() {
        },
        async : false,
        success : function(data) {
            topoSaveDo = data;
        }
    });
    var h = Math.round(Math.sqrt(this.force.nodes().length));
    save = this.force.nodes();
    this.force.nodes().forEach(function(d, i) {
        if(topoSaveDo.length >= 1) {
            for( var x = 0; x < topoSaveDo.length; x++) {
                if(d.name == topoSaveDo[x].name) {
                    d.x = topoSaveDo[x].x;
                    d.y = topoSaveDo[x].y;
                    selfforce.setforce(true);
                    break;
                }
            }
        } else {
            d.x = (hx + (i % h * 70)) - (h * 70) / 2;
            d.y = (hy + (i % (h + 1) * 70)) - ((h + 1) * 70) / 2;
        }
    });
    
    // 可视化控件初始化位置分配
    d3.selectAll(".node").transition().duration(2000).attr(
            "transform",
            function(d, i) {
                var p = Math.floor(i / h);
                var l = 0 + p;
                return "translate(" + (hx + (i % h * 70) - (h * 70) / 2) + ","
                        + (hy + (l * 70) - ((h + 1) * 70) / 2) + ")";
            });// 初始化实体位置
    
};
// 缩放切换动画
Topology.prototype.layoutflash = function() {
    var svgself = this;
    scalezoom.scaleExtent([0.1, 20]);
    svgself.vis.transition().duration(1000)
            .call(
                    this.zoomListener.translate([this.width * -9 / 2, this.height * -9 / 2]).scale(
                            20).event).style("opacity", 0).each(
                    "end",
                    function() {// 切换布局动画使用变焦掩盖
                        (function() {
                            this.vis.transition().duration(1000).call(
                                    this.zoomListener.translate(
                                            [this.width / 2 - ((this.width / 2) * 1),
                                                    this.height / 2 - ((this.height / 2) * 1)])
                                            .scale(1).event).style("opacity", 1).each("start",
                                    function() {
                                        scalezoom.scaleExtent([1, 1]);
                                    }).each("end", selfforce.setforce(true));
                        }).call(svgself);
                    });
};
Topology.prototype.doZoom = function() {
    scalzgood = d3.event.scale;
    this.vis.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale
            + ")");
    mouseXY.x = d3.event.translate[0];
    mouseXY.y = d3.event.translate[1];
    /* this.thumbnailbox.attr('transform', "scale(" + 1 / d3.event.scale + ")"); */

};

Topology.prototype.setforce = function(flag) {
    if(flag) {
        this.force.stop();
    } else {
        this.force.start();
    }
    this.force.nodes().forEach(function(d, i) {
        d.fixed = flag;
    });
};

var nodskkk;
// 增加节点
Topology.prototype.addNode = function(node) {
    this.nodes.push(node);
    nodskkk = this.nodes;
};
// 增加多个节点
Topology.prototype.addNodes = function(nodes) {
    if(Object.prototype.toString.call(nodes) == '[object Array]') {
        var self = this;
        nodes.forEach(function(node) {
            self.addNode(node);
        });
        
    }
};
var linkstree;
// 增加连线
Topology.prototype.addLink = function(source, target) {
    this.links.push({
        source : this.findNode(source),
        target : this.findNode(target)
    });
    linkstree = this.links;
};

// 增加多个连线
Topology.prototype.addLinks = function(links) {
    if(Object.prototype.toString.call(links) == '[object Array]') {
        var self = this;
        links.forEach(function(link) {
            self.addLink(link['source'], link['target']);
        });
    }
};

// 删除节点
Topology.prototype.removeNode = function(id) {
    var i = 0;
    var n = this.findNode(id);
    var links = this.links;
    while(i < links.length) {
        links[i]['source'] == n || links[i]['target'] == n ? links.splice(i, 1) : ++i;
    }
    
    this.nodes.splice(this.findNodeIndex(id), 1);
};

// 删除节点下的子节点，同时清除link信息
Topology.prototype.removeChildNodes = function(id) {
    var node = this.findNode(id);
    var nodes = this.nodes;
    var links = this.links;
    var self = this;
    
    var linksToDelete = [];
    var childNodes = [];
    
    links.forEach(function(link, index) {
        link['source'] == node && linksToDelete.push(index) && childNodes.push(link['target']);
    });
    
    linksToDelete.reverse().forEach(function(index) {
        links.splice(index, 1);
    });
    
    var remove = function(node) {
        var length = links.length;
        for( var i = length - 1; i >= 0; i--) {
            if(links[i]['source'] == node) {
                var target = links[i]['target'];
                links.splice(i, 1);
                nodes.splice(self.findNodeIndex(node.id), 1);
                remove(target);
                
            }
        }
    };
    
    childNodes.forEach(function(node) {
        remove(node);
    });
    
    // 清除没有连线的节点
    for( var i = nodes.length - 1; i >= 0; i--) {
        var haveFoundNode = false;
        for( var j = 0, l = links.length; j < l; j++) {
            (links[j]['source'] == nodes[i] || links[j]['target'] == nodes[i])
                    && (haveFoundNode = true);
        }
        !haveFoundNode && nodes.splice(i, 1);
    }
};

// 查找节点
Topology.prototype.findNode = function(id) {
    var nodes = this.nodes;
    for( var i in nodes) {
        if(nodes[i]['id'] == id)
            return nodes[i];
    }
    return null;
};

// 查找节点所在索引号
Topology.prototype.findNodeIndex = function(id) {
    var nodes = this.nodes;
    for( var i in nodes) {
        if(nodes[i]['id'] == id)
            return i;
    }
    return -1;
};

// 节点点击事件
Topology.prototype.setNodeClickFn = function(callback) {
    this.clickFn = callback;
};
var nodeNew;
var h = 1;
var nodeShowType = "name";
// 更新拓扑图状态信息
function changeShowType() {
    if(nodeShowType == "name") {
        nodeShowType = "ip";
        nodeNew.text(function(d) {
            if(d3.select(this).attr('id') == 'iptext') {
                return d.ip == null ? "未知" : d.ip;
            }
        });
    } else {
        nodeShowType = "name";
        nodeNew.text(function(d) {
            if(d3.select(this).attr('id') == 'iptext') {
                return d.name == null ? "未知" : d.name;
            }
        });
    }
}
var forceopen = "open";
var selfforce;
function forceshow() {
    if(forceopen == "open") {
        $('#forcego').css("cssText", "background:rgba(0,255,0,0.4) !important");
        $('#treego').css("cssText", "background:rgba(255,255,255,0.1) !important");
        forceopen = "noopen";
        selfforce.setforce(false);
    } else {
        $('#forcego').css("cssText", "background:rgba(255,255,255,0.1) !important");
        forceopen = "open";
        selfforce.setforce(true);
    }
}
var timeSet;
Topology.prototype.update = function() {
    /*
     * //箭头移动，指向 svg_marknNew=this.vis.selectAll("circle.mark")
     * .data(this.links) .enter() .append("image") .attr("width",30)
     * .attr("height",30) .attr("xlink:href",function(d){ return
     * "resources/img/topo/" + d.source.type + ".png"; }) .attr("class","mark");
     * //箭头移动，指向
     * svg_mpath=svg_marknNew.append("animateMotion").attr("path",function(d){
     * 
     * return "M0,0L"+(d.target.x-d.source.x)+","+ (d.target.y-d.source.y); //
     * return "M"+d.source.x+","+ d.source.y+"L"+d.target.x+","+ d.target.y;
     * }).attr("dur","3s").attr("begin","0s").attr("repeatCount","indefinite");
     */
    linktree = this.links;
    var link = this.vis.append('g').attr('id', 'nodeLine').selectAll("line.link").data(linktree,
            function(d) {
                return d.source.id + "-" + d.target.id;
            }).attr("class", function(d) {
        return d['source']['status'] && d['target']['status'] ? 'link' : 'link link_error';
        
    });
    link.enter().insert("svg:line", "g.node").attr("class", function(d) {
        return d['source']['status'] && d['target']['status'] ? 'link' : 'link link_error';
    }); // 连线删除函数调用
    // 箭头指向
    // .style("marker-end", "url(#licensing)");
    
    link.exit().remove();
    var drag = forceNew.drag().on("drag", function(d, i) {
        
    }).on("dragstart", function(d) {
        d.fixed = true;
    });
    var node = this.vis.selectAll(".node").data(this.nodes, function(d) {
        return d.id;
    });
    // 拖动
    var nodeEnter = node.enter().append("svg:g").attr("class", "node");/* this.force.drag */
    // 增加图片，可以根据需要来修改
    var self = this;
    var widthchange;
    nodeEnter.append("svg:image").attr("xlink:href", function(d) {
        return "resources/img/topo/" + d.type + ".png";
    }).attr("class","cr-test").attr("x", "-19px").attr("y", "-19px").attr("width", "32px").attr("height", "35px").on(
            'click', function(d) {
                d.expand && self.clickFn(d);
            }).on('dblclick', function(d) {
        baseData.ajaxParam.objectId = d.id.substring(4, 10);
        baseData.ajaxParam.objectType = d.type;
        baseData.ajaxParam.objectSubType = d.subType;
        /* pageNext(getMonitorUrl(d.type, d.subType)); */
        pageNext(getMonitorUrl(d.type, d.subType), null, d.name + " 监控视图");
    }).on(
            "mouseover",
            function(d, x) {
                // 鼠标移动到一个节点上时，将其及与其邻接的节点突出显示
                /*
                 * link.style("stroke", function(edge) { if(edge.source == d ||
                 * edge.target == d) { return "#000FFF"; } });
                 */
                /*
                 * 标移入时， （1）通过 selection.html() 来更改提示框的文字 （2）通过更改样式 left 和 top
                 * 来设定提示框的位置 （3）设定提示框的透明度为1.0（完全不透明）
                 */
                var ipInfo = "";
                if(d.ip) {
                    if(d.ip.length > 0) {
                        /*
                         * $.each(d.ip, function(index, info) { ipInfo += "<br/>IP地址：" +
                         * info.ipAddr + "<br/>子网掩码：" + info.subnetMask; });
                         */
                        ipInfo += "<br/>IP地址：" + d.ip;
                    }
                }
                
                var alarmInfo = "";
                if(d.alarmInfo.length > 0) {
                    alarmInfo = "告警信息";
                    $.each(d.alarmInfo, function(index, info) {
                        alarmInfo += "<br/>" + info.alarmLevel + "：\t" + info.alarmCount;
                    });
                }
                widthchange = parseInt($("#menu_1").css("width"));
                self.tooltip.style("visibility", "visible");
                var tooltip = "设备名称：" + d.name + "<br>设备信息" + ipInfo + "<br/>" + alarmInfo;
                if(d.description) {
                    tooltip = tooltip + "<br/>备注：" + d.description;
                }
                self.tooltip.html(tooltip).style("left", (d3.event.pageX) + "px").style("top",
                        (d3.event.pageY + 20) + "px").style({
                    "opacity" : 1.0,
                    "text-align" : "left",
                    "border" : "1px solid #000000",
                    "background-color" : "#000000",
                    "color" : "#ECEBEF",
                    "font-family" : "微软雅黑"
                });
            }).on(
            "mousemove",
            function(d) {
                // 鼠标移动时，更改样式 left 和 top 来改变提示框的位置
                self.tooltip.style("left", (d3.event.pageX - widthchange) + "px").style("top",
                        (d3.event.pageY - 80) + "px");
            }).on("mouseout", function(d, i) {
        // 鼠标离开时还原
        link.style("stroke", function(edge) {
            if(edge.source == d || edge.target == d) {
                return "#24FF00";
            }
        });
        // 鼠标移出时，将透明度设定为0.0（完全透明）
        /* tooltip.style("opacity", 0.0); */
        self.tooltip.style("visibility", "hidden");
        
    });
    nodeEnter.append("svg:image").attr("class", "circle cr-test").attr("xlink:href", function(d) {
        return "resources/img/topo/" + d.status + ".gif";
    }).attr("x", "-2px").attr("y", "-13px").attr("width", "25px").attr("height", "25px");
    // node绑定添加连线
    nodeEnter.on('mouseup', function(d) {
        if(!mousedown_node)
            return;
        // needed by FF
        drag_line.classed('hidden', true).style('marker-end', '');
        mouseup_node = d;
        if(mouseup_node === mousedown_node) {
            resetMouseVars();
            return;
        }
        var linkgo;
        linktree.filter(function(d) {
            if(d.source.index == mousedown_node.index && d.target.index == mouseup_node.index) {
                return linkgo = 'has';
            }
            if(d.source.index == mouseup_node.index && d.target.index == mousedown_node.index) {
                return linkgo = 'has';
            }
        });
        if(linkgo != 'has') {
            linktree.push({
                source : mousedown_node.index,
                target : mouseup_node.index
            })
        }
        forceNew.start();
        //debugger;
        linktree[linktree.length - 1].target.father_ip = [];
        linktree[linktree.length - 1].target.father_ip
                .push(linktree[linktree.length - 1].source.ip);
        var targetIds = [];
        linktree.filter(function(d) {
            if(d.source.id == mousedown_node.id) {
                targetIds.push(d.target.id.substr(4))
            }
        });
        d3.select('#nodeLine').selectAll("line").data(linktree).enter().append("line").attr(
                'class', 'link').on('click', selfforce.deleteLink);
        $.ajax({
            url : "topo/links/" + mousedown_node.id.substr(4),
            type : "post",
            data : {
                "targetIds" : function() {
                    return targetIds.toString()
                }
            },
        });
        
    })
    // 画布监听事件
    this.container.on('mousemove', mousemove).on('mouseup', mouseup)
    function mousemove() {
        if(!mousedown_node)
            return;
        // update drag line
        drag_line.attr('d', 'M' + mousedown_node.newx + ',' + mousedown_node.newy + 'L'
                + d3.mouse(this)[0] + ',' + d3.mouse(this)[1]);
        
    }
    function mouseup() {
        if(mousedown_node) {
            // hide drag line
            drag_line.classed('hidden', true).style('marker-end', '');
        }
        
        // because :active only works in WebKit?
        d3.select('svg').classed('active', false);
        
        // clear mouse event vars
        resetMouseVars();
    }
    function resetMouseVars() {
        mousedown_node = null;
        mouseup_node = null;
        mousedown_link = null;
    }
    // 文字添加
    nodeNew = nodeEnter.append("text").attr('id', 'iptext').attr("class", "nodetext").attr("dx",
            -15).attr("dy", 20).text(function(d) {
        return d.name;
    });
    /* this.zoomVis.call(this.drag); */
    node.exit().remove();
    this.initNode();
    // 布局进度条时间
    if(timeSet != undefined) {
        clearTimeout(timeSet);
    }
    timeSet = setTimeout(function() {
        nodeEnter.call(drag);
        // self.layoutflash();
        forceNew.start();
        $("#toposee").hide();
        setTimeout(function() {
            selfforce.setforce(true);
        }, 150);
        timeSet = undefined;
    }, 3200);
    // 力导图效果停止
    /*
     * this.force.on("end", function() { if(forceopen == "open") {
     * self.setforce(false); } else { self.setforce(true); } });
     */
    vissvg = this.vis;
    // 箭头效果
    /*
     * this.vis.append("defs").selectAll("marker").data(["suit", "licensing",
     * "resolved"]).enter() .append("marker").attr("id", function(d) { return d;
     * }).attr("viewBox", "0 -5 10 10").attr("refX", 18).attr("refY",
     * 0).attr("markerWidth", 10).attr("markerHeight", 10).attr("orient",
     * "auto").append("path").attr("d", "M0,-5L10,0L0,5 L10,0 L0,
     * -5").style("stroke", "red").style("opacity", "0.6");
     */

    this.thumbnailbox = d3.select('.thumbnailbox').style('left', hx * 2 + "px").append('svg').attr(
            'width', hx * 2).attr('height', hy * 2).append('use').attr('xlink:href', "#thumbnail")
            .attr('opacity', 1);
    
    // self.shuffle();
    d3.selectAll("input").on("change", change);
    function change() {
        var value = this.value;
        var selected = vissvg.selectAll(".node");
        var selectline = vissvg.selectAll(".link");
        var selectlink = selectline.filter(function(d) {
            if(d.source.type == value || d.target.type == value) {
                return true;
            }
        });
        selectline.transition().duration(2000).style('opacity', '1');
        selected.transition().duration(2000).style('opacity', '1').style("display", "block");
        var selectednode = selected.filter(function(d) {
            if(d.type == value) {
                return true;
            } else {
                return false;
            }
        });
        selectlink.transition().duration(2000).style('opacity', '0');
        selectednode.transition().duration(2000).style('opacity', '0');
        setTimeout(function(d) {
            selectednode.style("display", "none");
        }, 2000);
    }
};

var vissvg;
// 拓扑图查询功能
function searchNode() {
    // find the node
    var selectedVal = document.getElementById('search').value;
    var node = vissvg.selectAll(".node");
    var open;
    node.forEach(function(d) {
        for( var l = 0; l < d.length; l++) {
            if(d[l].textContent == selectedVal) {
                open = "open";
            }
        }
    });
    if(open == "open") {
        var dline;
        if(selectedVal == "none") {
            node.style("stroke", "white").style("stroke-width", "1");
        } else {
            var selected = node.filter(function(d, i) {
                var SHOW = true;
                if(d.name == selectedVal || d.ip == selectedVal) {
                    SHOW = false;
                    dline = d;
                    d3.selectAll('image').transition().duration(2000).attr("transform",
                            'translate(' + (hx - d.x) + ',' + (hy - d.y) + ')');
                    d3.selectAll('text').transition().duration(2000).attr("transform",
                            'translate(' + (hx - d.x) + ',' + (hy - d.y) + ')');
                }
                return SHOW;
            });
            selected.style("opacity", "0");
            var link = vissvg.selectAll(".link");
            link.attr("transform", 'translate(' + (hx - dline.x) + ',' + (hy - dline.y) + ')');
            link.style("opacity", "0");
            d3.selectAll(".node, .link").transition().duration(5000).style("opacity", 1);
            $("#topoprompt").html("");
            
        }
    } else {
        $("#topoprompt").fadeIn("slow");
        $("#topoprompt").html("未知的资源名称").fadeOut(4000);
    }
}
// 鼠标移动世界
function monusedown(d) {
    mousedown_node = d;
    mousedown_node.newx = mousedown_node.x + mouseXY.x;
    mousedown_node.newy = mousedown_node.y + mouseXY.y;
    drag_line.style('marker-end', 'url(#end-arrow)').classed('hidden', false).attr(
            'd',
            'M' + mousedown_node.newx + ',' + mousedown_node.newy + 'L' + mousedown_node.newx + ','
                    + mousedown_node.newy);
}
// 编辑连线功能
function editorLink() {
    if(linkopen == null) {
        $('#linkChange').css("cssText", "background:rgba(0,255,0,0.4) !important");
        d3.selectAll('.node').on('mousedown.drag', null).on('touchstart.drag', null).on(
                'mousedown', monusedown)
        d3.selectAll('line').on('click', selfforce.deleteLink)
        linkopen = 'open';
    } else {
        $('#linkChange').css("cssText", "background:rgba(255,255,255,0.1) !important");
        d3.selectAll('.node').call(forceNew.drag).on('mousedown', null);
        d3.selectAll('line').on('click', null);
        linkopen = null;
    }
    for(var i=0;i < $(".cr-test").length;i++){//在火狐浏览器下禁止拖动图片时打开新页面
    	$(".cr-test")[i].ondragstart = imgdragstart;
    }
}
