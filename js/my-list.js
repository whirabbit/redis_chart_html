var bool=false;
$(
    function () {
        $.get("http://localhost/list",
            function (data) {
                for (var i = 0; i < data.length; i++) {
                   let html=" <div class=\"col-md-4\" style=\"background-color: #dedef8;" +
                        "         box-shadow: inset 1px -1px 1px #444, inset -1px 1px 1px #444;\">" +
                        data.list[i].name +
                        "      </div>" +
                        "      <div  class=\"col-md-8\" style=\"background-color: #dedef8;" +
                        "         box-shadow: inset 1px -1px 1px #444, inset -1px 1px 1px #444;\">" +
                        data.list[i].total+
                        "<button  id="+data.list[i].name+" type=\"button\" class=\"btn btn-default btn-xs\">" +"查看"+
                        "<span class=\"glyphicon glyphicon-chevron-down\"></span>" +
                        "</button>"+
                        "      </div>" +
                        "   </div>"
                    $("#list-dl").append(html);
                    //绑定事件
                    $("button").click(
                        function () {
                            var name = this.id + "-1";
                            var $this = $(this);
                            // $this.val("收回");
                            $this.text("收回")
                            if (bool){
                                $("#"+name).remove();
                                bool=false;
                                $this.text("查看")
                                $this.css("class","glyphicon glyphicon-chevron-down")
                                return;
                            }
                            $("#" + name).remove();
                            bool=true;
                            $.get("http://localhost/form/" + this.id, function (data) {

                                var html = "<table id=\"" + name + "\" class=\"table table-striped table-bordered table-hover table-condensed\"><tr><th>项目</th><th>接口名称</th><th>调用次数</th></tr>";

                                for (var i = 0; i < data.length; i++) {
                                    html = html + "<tr>" +
                                        // "<td>" + data.message[i].projectName + "</td>" +
                                        "<td>" + data.message[i].interfaceName + "</td>" +
                                        "<td>" + data.message[i].total + "</td>" +
                                        "</tr>";
                                }
                                putChart(data);
                                html = html + "</table>";
                                $this.after(html);

                            });
                        }
                    );
                }
            }
        );
        //$.get结束

    }
)