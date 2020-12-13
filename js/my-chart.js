// 设置参数

    function putMessageChart (dat,color) {

//数据整合
        var data_labels = new Array();
        var date_number = new Array();
        var data_backgroundColor;
        for (var i=0;i<dat.length;i++){
            data_labels[i]=dat.message[i].interfaceName;
            date_number[i]=dat.message[i].total;
        }
        data_backgroundColor=color;
        var data = {
            labels: data_labels,
            datasets: [
                {
                    data: date_number,
                    backgroundColor: data_backgroundColor,
                    hoverBackgroundColor:data_backgroundColor
                }],
        };
// Get the context of the canvas element we want to select
        var ctx = document.getElementById("myChart").getContext("2d");
        var myBarChart = new Chart(ctx, {
            type: 'pie',
            data: data,
            // options: options
            normal:{
                label:{
                    show: true,
                    formatter: '{b} : {c} ({d}%)'
                },
                labelLine :{show:true}
            }
        });
        return myBarChart;
    }

function putListChart () {

//数据整合
    var data_labels =[];
    var date_number = [];
    var data_backgroundColor=[] ;
   var dat=data_list.data;
    for (var i=0;i<dat.length;i++){
        data_labels[i]=dat.list[i].name;
        date_number[i]=dat.list[i].total;
    }
    data_backgroundColor=data_list.color;
    var data = {
        labels: data_labels,
        datasets: [
            {
                data: date_number,
                backgroundColor: data_backgroundColor,
                hoverBackgroundColor:data_backgroundColor
            }],
    };

    var ctx = document.getElementById("myChart").getContext("2d");
    var myBarChart = new Chart(ctx, {
        type: 'pie',
        data: data,
        // options: options
        normal:{
            label:{
                show: true,
                formatter: '{b} : {c} ({d}%)'
            },
            labelLine :{show:true}
        }
    });
    return myBarChart;
}










    //随机颜色
function randColor() {
    return '#' +
        (function (color) {
            return (color += '0123456789abcdef'[Math.floor(Math.random() * 16)])
            && (color.length == 6) ? color : arguments.callee(color);
        })('')
}
//获取随机颜色数组
function getColor(num) {
    var colorList = [];
    for (var i = 0; i < num; i++) {
        colorList.push(randColor());
    }
    return colorList;
}