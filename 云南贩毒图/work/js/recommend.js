/**
 * Created by user on 2016/11/25.
 */
{
var myChart = echarts.init((document.getElementsByClassName('F')[0]));
    var xAxisname=['马某','asdas'];
    var travel=[2.0, 4.9];
    var live=[2.6, 5.9];
    let option = {
        backgroundColor: "#344b58",
        title: {
            text: '系统推荐可疑分子',
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
            data: ['可疑分子']
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
                name: '可疑程度',
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
                name: '可疑程度',
                type: 'line',
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

        ]
    };
    myChart.setOption(option);
function sort() {
    data=data.sort()
    myChart.setOption(option)
}
    let username=[];
    let degree=[];
    function changeRec(activitMap) {
        for(let i=0;i<activitMap.length;i++){
            username.push(activitMap[i].username);
            degree.push(activitMap[i].degree)
        }
        option.xAxis[0].data=username

        option.series[0].data=degree


        myChart.setOption(option);
    }


}