
var host="http://39.100.238.97:8001";
//画布
var van;
//数据保存
    //项目数据
var data_list={};
    //项目接口数据
var data_message={};
data_message.list=[];
//
$(
    function () {

        $.get(host+"/list",
            function (data) {

            //展示列表信息
                for (var i = 0; i < data.length; i++) {
                   let html=" <div class=\"col-md-4\" style=\"background-color: #dedef8;" +
                        "         box-shadow: inset 1px -1px 1px #444, inset -1px 1px 1px #444;\">" +
                        data.list[i].name +
                        " </div>" +
                        " <div  class=\"col-md-8\" style=\"background-color: #dedef8;" +
                        " box-shadow: inset 1px -1px 1px #444, inset -1px 1px 1px #444;\">" +
                        data.list[i].total+
                        "<button  id="+data.list[i].name+" type=\"button\" class=\"btn btn-default btn-xs\">" +"查看"+
                        "<span class=\"glyphicon glyphicon-chevron-down\"></span>" +
                        "</button>"+
                        "      </div>" +
                        "   </div>";
                    $("#list-dl").append(html);

                    //存放项目列表信息
                    data_list.color=getColor(data.length);
                    data_list.data=data;
                    van=putListChart();
                   //将所有数据请求到本地存储
                   var json={};
                   //设置Ajax同步请求
                    $.ajaxSettings.async=false;
                   $.get(host+"/form/"+data.list[i].name,"",function (data){
                       json.data=data;
                       json.color=getColor(data.length);
                   });
                   // json.data=data;
                   json.name=data.list[i].name;
                   data_message.list[i] =json;
                }
                    //绑定按钮点击事件
                    $("button").click(
                        function () {
                            var name = this.id + "-1";
                            var $this = $(this);
                            $this.text("收回");
                            van.destroy();
                            if ($("#"+name).length==0){
                                //删除表格
                                $("#" + name).remove();
                                showTable($(this),this.id);

                            }else {
                                $("#"+name).remove();
                                //画布摧毁,重画项目图
                                // van.destroy();
                                putListChart(data_list);
                                $this.text("查看");


                            }
                        }
                    );

        }
        );
        //$.get结束

    }
)
//生成图表arr:元素 id:项目名
function showTable(arr,id){

    for (var i=0;i<data_message.list.length;i++ ){
        if (data_message.list[i].name==id){
            var data=data_message.list[i].data;
            console.log(data_message.list);
            id+="-1";
            var html = "<table id=\"" + id+ "\" class=\"table table-striped table-bordered table-hover table-condensed\"><tr><th>接口名称</th><th>调用次数</th></tr>";
            for (var j = 0; j < data.length; j++) {
                html = html + "<tr>" +
                    "<td>" + data.message[j].interfaceName + "</td>" +
                    "<td>" + data.message[j].total + "</td>" +
                    "</tr>";
            }
            van= putMessageChart(data,data_message.list[i].color);
            html = html + "</table>";
            arr.after(html);
        }
    }


}