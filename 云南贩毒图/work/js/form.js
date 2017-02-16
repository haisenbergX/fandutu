/**
 * Created by user on 16-12-1.
 */
var t = $('#example').DataTable({
    "data": [
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
    ],
    //每页显示三条数据
    pageLength: 6,
    columns: [{
        "data": null //此列不绑定数据源，用来显示序号
    },
        {
            "data": "id"
        },
        {
            "data": "title"
        },
        {
            "data": "url"
        }],
    "columnDefs": [{
        // "visible": false,
        //"targets": 0
    },
        {
            "render": function(data, type, row, meta) {
                //渲染 把数据源中的标题和url组成超链接
                return '<a href="' + data + '" target="_blank">' + row.title + '</a>';
            },
            //指定是第三列
            "targets": 2
        }]

});

//前台添加序号
t.on('order.dt search.dt',
    function() {
        t.column(0, {
            "search": 'applied',
            "order": 'applied'
        }).nodes().each(function(cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();

//更换数据源（相同格式，但是数据内容不同）
/*
$("#redraw").click(function() {
    var url = table.api().ajax.url("http://www.gbtags.com/gb/networks/uploads/a7bdea3c-feaf-4bb5-a3bd-f6184c19ec09/newData.txt");
    url.load();
});*/
