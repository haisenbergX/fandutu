/**
 * Created by user on 2016/11/28.
 */
var    man=[{name:'ex',image:'account.jpg',x:0,y:2,degree:10},{name:'pp',image:'account.jpg',x:2,y:2,degree:8},{name:'kl',image:'account.jpg',x:4,y:2,degree:7},
           {name:'sd',image:'account.jpg',x:6,y:2,degree:5},{name:'op',image:'account.jpg',x:8,y:2,degree:5},{name:'exb',image:'account.jpg',x:0,y:4,degree:4},{name:'xwx',image:'account.jpg',x:2,y:4,degree:4},{name:'kl',image:'account.jpg',x:4,y:4,degree:3}, {name:'sd',image:'account.jpg',x:6,y:4,degree:2},{name:'op',image:'account.jpg',x:8,y:4,degree:1}];
var    airPath=[[{flight:'k941',source:"清迈",target:'昆明市',time:'14:23'},{flight:'T544',source:"清迈",target:'曲靖市',time:'14:23'}
        ,{flight:'Jxs1',source:"清迈",target:'昭通市',time:'14:23'},{flight:'Jxs1',source:"清迈",target:'普洱市',time:'14:23'}],
    [{flight:'AMN10',source:"清迈",target:'玉溪市',time:'14:23'},{flight:'T544',source:"清迈",target:'丽江市',time:'14:23'}
    ,{flight:'Jxs1',source:"清迈",target:'保山市',time:'14:23'},{flight:'Jxs1',source:"清迈",target:'西双版纳傣族自治州',time:'14:23'}],
    [{flight:'k941',source:"清迈",target:'昆明市',time:'14:23'},{flight:'T544',source:"清迈",target:'曲靖市',time:'14:23'}
        ,{flight:'Jxs1',source:"清迈",target:'昭通市',time:'14:23'},{flight:'Jxs1',source:"清迈",target:'保山市',time:'14:23'}],
    [{flight:'k941',source:"清迈",target:'大理白族自治州',time:'14:23'},{flight:'T544',source:"清迈",target:'曲靖市',time:'14:23'}
        ,{flight:'Jxs1',source:"清迈",target:'昭通市',time:'14:23'},{flight:'Jxs1',source:"清迈",target:'普洱市',time:'14:23'}],
    [{flight:'k941',source:"清迈",target:'昭通市',time:'14:23'},{flight:'T544',source:"清迈",target:'保山市',time:'14:23'}
        ,{flight:'Jxs1',source:"清迈",target:'昭通市',time:'14:23'},{flight:'Jxs1',source:"清迈",target:'普洱市',time:'14:23'}],
    [{flight:'k941',source:"清迈",target:'保山市',time:'14:23'},{flight:'T544',source:"清迈",target:'曲靖市',time:'14:23'}
        ,{flight:'Jxs1',source:"清迈",target:'保山市',time:'14:23'},{flight:'Jxs1',source:"清迈",target:'普洱市',time:'14:23'}],
    [{flight:'k941',source:"清迈",target:'昆明市',time:'14:23'},{flight:'T544',source:"清迈",target:'曲靖市',time:'14:23'}
        ,{flight:'Jxs1',source:"清迈",target:'曲靖市',time:'14:23'},{flight:'Jxs1',source:"清迈",target:'普洱市',time:'14:23'}]]
var c   =[{data:[{hotel:[99.1516, 26.5594],name:'7天连锁酒店',travel:'2',live:'1',username:['ex,pp'],degree:9},{hotel:[98.1299, 24.5874],name:'asd',travel:'4',live:'2',username:'荆X，吴X',degree:8},{hotel:[104.8865, 23.5712],name:'asd',travel:'2',live:'1',username:'黄X，吴X',degree:7}]},{data:[{hotel:[99.1516, 26.5594],name:'asd',travel:'2',live:'1',username:['西X，吴X'],degree:4}]}
    ,{data:[{hotel:[103.0408, 23.6041],name:'asd',travel:'2',live:'1',username:['西X，吴X'],degree:5}]},{data:[{hotel:[104.8865, 23.5712],name:'asd',travel:'2',live:'1',username:['东X，吴X'],degree:3}]},{data:[{hotel:[100.7446, 23.4229],name:'asd',travel:'2',live:'1',username:['朱X，吴X'],degree:3}]}
    ,{data:[{hotel:[104.0955, 27.6031],name:'asd',travel:'2',live:'1',username:['南X，吴X'],degree:1}]},{data:[{hotel:[98.1299, 24.5874],name:'asd',travel:'10',live:'6',username:['狗X，吴X'],degree:2}]}]
//加载地图数据

var    PathLeave=[[{flight:'k941',target:"清迈",source:'昆明市',time:'14:23'},{flight:'T544',target:"清迈",source:'曲靖市',time:'14:23'}
    ,{flight:'Jxs1',target:"清迈",source:'昭通市',time:'14:23'},{flight:'Jxs1',target:"清迈",source:'普洱市',time:'14:23'}],
    [{flight:'AMN10',target:"清迈",source:'玉溪市',time:'14:23'},{flight:'T544',target:"清迈",source:'丽江市',time:'14:23'}
        ,{flight:'Jxs1',target:"清迈",source:'保山市',time:'14:23'},{flight:'Jxs1',target:"清迈",source:'西双版纳傣族自治州',time:'14:23'}],
    [{flight:'k941',target:"清迈",source:'昆明市',time:'14:23'},{flight:'T544',target:"清迈",source:'曲靖市',time:'14:23'}
        ,{flight:'Jxs1',target:"清迈",source:'昭通市',time:'14:23'},{flight:'Jxs1',target:"清迈",source:'保山市',time:'14:23'}],
    [{flight:'k941',target:"清迈",source:'大理白族自治州',time:'14:23'},{flight:'T544',target:"清迈",source:'曲靖市',time:'14:23'}
        ,{flight:'Jxs1',target:"清迈",source:'昭通市',time:'14:23'},{flight:'Jxs1',target:"清迈",source:'普洱市',time:'14:23'}],
    [{flight:'k941',target:"清迈",source:'昭通市',time:'14:23'},{flight:'T544',target:"清迈",source:'保山市',time:'14:23'}
        ,{flight:'Jxs1',target:"清迈",source:'昭通市',time:'14:23'},{flight:'Jxs1',target:"清迈",source:'普洱市',time:'14:23'}],
    [{flight:'k941',target:"清迈",source:'保山市',time:'14:23'},{flight:'T544',target:"清迈",source:'曲靖市',time:'14:23'}
        ,{flight:'Jxs1',target:"清迈",source:'保山市',time:'14:23'},{flight:'Jxs1',target:"清迈",source:'普洱市',time:'14:23'}],
    [{flight:'k941',target:"清迈",source:'昆明市',time:'14:23'},{flight:'T544',target:"清迈",source:'曲靖市',time:'14:23'}
        ,{flight:'Jxs1',target:"清迈",source:'曲靖市',time:'14:23'},{flight:'Jxs1',target:"清迈",source:'普洱市',time:'14:23'}]]
var toporoot=[];
var abnormalityx;
var hotelx;


var  jkx=[{data:[{hotel:[99.1516, 26.5594],name:'7天连锁酒店',travel:'2',live:'1',username:'ex',degree:9},{hotel:[98.1299, 24.5874],name:'asd',travel:'4',live:'2',username:'吴X',degree:8},{hotel:[104.8865, 23.5712],name:'asd',travel:'2',live:'1',username:'黄X',degree:7}]},{data:[{hotel:[99.1516, 26.5594],name:'asd',travel:'2',live:'1',username:'西X',degree:4}]}
    ,{data:[{hotel:[103.0408, 23.6041],name:'asd',travel:'2',live:'1',username:'吴X',degree:5}]},{data:[{hotel:[104.8865, 23.5712],name:'asd',travel:'2',live:'1',username:'吴X',degree:3}]},{data:[{hotel:[100.7446, 23.4229],name:'asd',travel:'2',live:'1',username:'朱X',degree:3}]}
    ,{data:[{hotel:[104.0955, 27.6031],name:'asd',travel:'2',live:'1',username:'南X',degree:1}]},{data:[{hotel:[98.1299, 24.5874],name:'asd',travel:'10',live:'6',username:'吴X',degree:2}]}]



d3.json("data/yunnan.json", function(error, b) {
    toporoot=b;
})


function hue(h,x,handle,hotel,abnormality) {
    abnormalityx=abnormality;
    hotelx=hotel;
    let b=  Math.round(x(h)/(502/6))
    handle.attr("cx", (b)*(502/6));
    console.log((b)*(502/6))
    activitMap=c[(b)].data
    hotel(activitMap)
    abnormality(activitMap)
    change(activitMap)
    p=man.slice(0,(b+1))
    headTop(p,showExitEntry,dbshow)
  //  changeRec(jkx[(b)].data)
    entry(airPath[b],toporoot)
    leave(PathLeave[b],toporoot)
}

var Entry=[{flight:'k941',source:"清迈",target:'昆明市',time:'14:23',name:'ex',show:true},{flight:'T544',source:"清迈",target:'曲靖市',time:'14:23',name:'sd',show:true}
    ,{flight:'Jxs1',source:"清迈",target:'昭通市',time:'14:23',name:'pp',show:true},{flight:'Jxs1',source:"清迈",target:'普洱市',time:'14:23',name:'kl',show:true}];

var Exit=[{flight:'k941',target:"清迈",source:'昆明市',time:'14:23',name:'sd',show:true},{flight:'T544',target:"清迈",source:'曲靖市',time:'14:23',name:'pp',show:true}
    ,{flight:'Jxs1',target:"清迈",source:'昭通市',time:'14:23',name:'kl',show:true},{flight:'Jxs1',target:"清迈",source:'普洱市',time:'14:23',name:'ex',show:true}]


var manActivite=[{hotel:[99.1516, 26.5594],name:'7天连锁酒店',time:'1',user:'ex'},{hotel:[100.1516, 26.0000],name:'德泰酒楼',time:'2',user:'ex'},{hotel:[104.8865, 23.5712],name:'X酒店',time:'3',user:'ex',display:true},{hotel:[99.1516, 26.5594],name:'7天连锁酒店',time:'1',user:'pp'},{hotel:[104.8865, 23.0000],name:'天天酒楼',time:'2',user:'pp'},{hotel:[99.1516, 25.0000],name:'东坡酒店',time:'3',user:'pp',display:true}]


var manNames=[];
var color = d3.schemeCategory20 ;

//人物头像点击事件
function showExitEntry(d){
    var manOne=[];
    var manLost=[];
    var EntryNode=[];
    var leaveNode=[];
    if(manNames.indexOf(d.name)<0){
        manNames.push(d.name)

    }
    for(let i=0;i<manNames.length;i++){
        for(let a=0;a<Entry.length;a++){
            if(Entry[a].name==manNames[i]){
                EntryNode.push(Entry[a])
            }
        }
        for(let c=0;c<Exit.length;c++){
            if(Exit[c].name==manNames[i]){
                leaveNode.push(Exit[c])
            }
        }
    }

    entry(EntryNode,toporoot)
    leave(leaveNode,toporoot)
    d3.selectAll('.headtext').select("."+d.name).style('fill',function(){
        return color[manNames.indexOf(d.name)]
    });

    for(let i=0;i<manNames.length;i++){
        for(let b=0;b<manActivite.length;b++){
            if( manNames[i]==manActivite[b].user){
                manActivite[b].color=color[i]
                manOne.push(manActivite[b])
                if(manActivite[b].display){
                    manLost.push(manActivite[b])
                }
            }
        }
    }

    abnormalityx(manLost) //消失地点图
    hotelx(manOne)        //活动地点图

}

//双击人头事件
function dbshow(d){
    var manOne=[];
    var manLost=[];
    var EntryNode=[];
    var leaveNode=[];
    d3.selectAll('.headtext').select("."+d.name).style('fill','#fff')
    if(manNames.indexOf(d.name)>=0){
       let i= manNames.indexOf(d.name)
        manNames.splice(i,1)
    }
    for(let i=0;i<manNames.length;i++){
        for(let a=0;a<Entry.length;a++){
            if(Entry[a].name==manNames[i]){
                EntryNode.push(Entry[a])
            }
        }
        for(let c=0;c<Exit.length;c++){
            if(Exit[c].name==manNames[i]){
                leaveNode.push(Exit[c])
            }
        }
    }
    for(let i=0;i<manNames.length;i++){
        for(let b=0;b<manActivite.length;b++){
            if( manNames[i]==manActivite[b].user){
                manOne.push(manActivite[b])
                if(manActivite[b].display){
                    manLost.push(manActivite[b])
                }
            }
        }
    }
    abnormalityx(manLost) //消失地点图
    hotelx(manOne)        //活动地点图
    entry(EntryNode,toporoot)
    leave(leaveNode,toporoot)
}

//同行同住图点击事件
myChartLive.on('click',function(param){
    var manUser= param.name[0].split(',');
    for(let i=0;i<manUser.length;i++){
        d3.select('.head.'+manUser[i]).classed('shake',true)
        setTimeout (function () {
            d3.select('.head.'+manUser[i]).classed('shake',false)
        },4000)
    }

})

/*
myChart.on('click',function (param) {
    var manUser= param.name
        d3.select('.head.'+manUser).classed('shake',true)
        setTimeout (function () {
            d3.select('.head.'+manUser).classed('shake',false)
        },4000)
    var a= (parseInt(p.length/5)+1)*2;
    if(a>=4){
        var c=(p.length-a*5+1)*2
    }else{
        var c=(p.length)*2
    }
    var b={name: param.name, image: "account.jpg", x: c, y: a, degree: param.value};
    var x=p.push(b)
    headTop(p,showExitEntry,dbshow)
})*/
var opbb="ok"
var formdata=[
    {
        "id": "ex",
        "url": "7",
        "title": "24岁山西人"
    },
    {
        "id": "pp",
        "url": "10",
        "title": "52岁云南人"
    },
    {
        "id": "吴X",
        "url": "7",
        "title": "18岁昆明人"
    },
    {
        "id": "SX",
        "url": "2",
        "title": "29岁重庆人"
    },
    {
        "id": "ex",
        "url": "7",
        "title": "24岁山西人"
    },
    {
        "id": "pp",
        "url": "10",
        "title": "52岁云南人"
    },
    {
        "id": "吴X",
        "url": "7",
        "title": "18岁昆明人"
    },
    {
        "id": "SX",
        "url": "2",
        "title": "29岁重庆人"
    }
]
function but() {


    if(opbb=="ok"){
        d3.selectAll('image').on('click',function (d) {
            d3.select(this).remove()
            d3.select('.headtext.'+d.name).remove()
            dbshow(d)
        })
        $('#but').html("关闭删除")
        opbb="no"
    }else{
        d3.selectAll('image').on('click',showExitEntry)
        $('#but').html("开启删除")
        opbb="ok"
    }
}

t.on('click',function (d) {
    /*debugger;
    d3.selectAll('tr').on('click',function (d) {

        //  var name = d3.select(this).select('td:nth-child(2)')._groups[0][0].innerText

        var manUser= d3.select(this).select('td:nth-child(2)')._groups[0][0].innerText
        var value=d3.select(this).select('td:nth-child(4)')._groups[0][0].innerText
        debugger;
        d3.select('.head.'+manUser).classed('shake',true)
        setTimeout (function () {
            d3.select('.head.'+manUser).classed('shake',false)
        },4000)
        var a= (parseInt(p.length/5)+1)*2;
        if(a>=4){
            var c=(p.length-a*5+1)*2
        }else{
            var c=(p.length)*2
        }
        var b={name: manUser, image: "account.jpg", x: c, y: a, degree: value};
        var x=p.push(b)
        headTop(p,showExitEntry,dbshow)
    })*/


    var manUser= d3.select(d.target.parentElement).select('td:nth-child(2)')._groups[0][0].innerText
    var value= d3.select(d.target.parentElement)
        .select('td:nth-child(4)')._groups[0][0].innerText
    d3.select('.head.'+manUser).classed('shake',true)
    setTimeout (function () {
        d3.select('.head.'+manUser).classed('shake',false)
    },4000)
    var a= (parseInt(p.length/5)+1)*2;
    if(a>=4){
        var c=(p.length-5)*2
    }else{
        var c=(p.length)*2
    }
    var show;
    var b={name: manUser, image: "account.jpg", x: c, y: a, degree: value};
    for(let i=0;i<p.length;i++){
        if(p[i].name==b.name){
            show='ongo'
        }
    }
    if(show!='ongo'){
        p.push(b)
    }
    headTop(p,showExitEntry,dbshow)







})
/*
d3.selectAll('tr').on('click',function (d) {

  //  var name = d3.select(this).select('td:nth-child(2)')._groups[0][0].innerText

    var manUser= d3.select(this).select('td:nth-child(2)')._groups[0][0].innerText
    var value=d3.select(this).select('td:nth-child(4)')._groups[0][0].innerText
    debugger;
    d3.select('.head.'+manUser).classed('shake',true)
    setTimeout (function () {
        d3.select('.head.'+manUser).classed('shake',false)
    },4000)
    var a= (parseInt(p.length/5)+1)*2;
    if(a>=4){
        var c=(p.length-a*5+1)*2
    }else{
        var c=(p.length)*2
    }
    var b={name: manUser, image: "account.jpg", x: c, y: a, degree: value};
    var x=p.push(b)
    headTop(p,showExitEntry,dbshow)
})*/
