/**
 * Created by user on 2016/11/25.
 */
{
    /* var name = ['马X，吴某', '马X，吴某', '马X，吴某', '马X，吴某', '马X，吴某', '马X，吴某', '马X，吴某', '马X，吴某', '马X，吴某', '马X，吴某', '马X，吴某', '马X，吴某'];
     var travel = [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3];
     var live = [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]*/
    var xAxisname = ['马某', 'asdas'];
    var travel = [2.0, 4.9];
    var live = [2.6, 5.9];
    var myChartLive = echarts.init((document.getElementsByClassName('D')[0]));
    let option = {
        backgroundColor: "#344b58",
        title: {
            text: '同行同住图',
            subtext: '',
            textStyle: {
                color: '#fff',
                fontSize: '22'
            },
            subtextStyle: {
                color: '#90979c',
                fontSize: '16',

            },
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['同行', '同住'],
            textStyle:{
                color:'yellow'
            }
        },
        "dataZoom": [{
            "show": true,
            "height": 20,
            "xAxisIndex": [
                0
            ],
            bottom: 10,
            "start": 0,
            "end": 100,
            handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
            handleSize: '110%',
            handleStyle: {
                color: "#d3dee5",

            },
            textStyle: {
                color: "#fff"
            },
            borderColor: "#90979c"


        }, {
            "type": "inside",
            "show": true,
            "height": 15,
            "start": 1,
            "end": 35
        }],
        toolbox: {
            show: true,
            feature: {
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        calculable: true,
        xAxis: [
            {
                name: '时间',
                type: 'category',
                data: xAxisname,
                "axisLine": {
                    lineStyle: {
                        color: '#90979c'
                    }
                },
            }
        ],
        yAxis: [
            {
                name: '次数',
                type: 'value',
                "axisLine": {
                    lineStyle: {
                        color: '#90979c'
                    }
                },
            }
        ],
        series: [
            {
                name: '同行',
                type: 'bar',
                data: travel,
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
                itemStyle: {
                    normal: {
                        color: 'green'
                    }
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                }
            },
            {
                name: '同住',
                type: 'bar',
                data: live,
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                },
            }
        ]
    };
    myChartLive.setOption(option);


    let username = [];
    let liveb = [];
    let travelb = [];
    function change(activitMap) {

        for (let i = 0; i < activitMap.length; i++) {
            username.push(activitMap[i].username);
            liveb.push(activitMap[i].live);
            travelb.push(activitMap[i].travel)
        }
        option.xAxis[0].data = username
        option.series[0].data = travelb
        option.series[1].data = liveb


        myChartLive.setOption(option);

    }

}