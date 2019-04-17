/**
 * 工具方法 -- 依赖jQuery
 * Created by chenbo on 2019/3/14.
 */


/*弹出基于bootstrap的模态框
* @param msg 消息文本
* @param title 标题
* */
(function($){
    $.extend({
        smAlert:function(msg,title){
            try{
                /*var str = ['<div id="alertModal" class="modal fade" style="z-index: 1000000;" data-backdrop="false" data-show="false" data-keyboard="false">',
                    '    <div class="modal-dialog">',
                    '        <div class="modal-content">',
                    '            <div class="modal-header">',
                    '                <h4 class="modal-title"></h4>',
                    '            </div>',
                    '            <div class="modal-body"></div>',
                    '            <div class="modal-footer"><a id="confirm-sure" class="btn btn-success" data-dismiss="modal">确定</a></div>',
                    '        </div>',
                    '    </div>',
                    '</div>'].join("");
                var $body = $(document.body);
                $body.append(str);*/

                var $modal = $("#alertModal");
                if(msg){
                    $("#alertModal .modal-body").text(msg);
                }
                if(title){
                    $("#alertModal .modal-title").text(title);
                }else{
                    $("#alertModal .modal-title").text('提示');
                }
                $modal.modal();
                return $modal;
            }catch(e){
                console.log(e.name+":"+ e.message);
            }

        }
    });
})(jQuery);


/*页面遮罩
* @param msg 文本
* @param maskDivClass 遮罩类型
* */
(function(){
    $.extend({
        mask: function(msg,maskDivClass){
            this.unmask();
            // 参数
            var op = {
                opacity: 0.8,
                z: 10000,
                bgcolor: '#ccc'
            };
            var original = $(document.body);
            var position = {top:0,left:0};
            if(this[0] && this[0] !== window.document){
                original = this;
                position = original.position();
            }
            // 创建一个 mask 层，追加到对象中
            var maskDiv = $('<div class="maskdivgen">&nbsp;</div>');
            maskDiv.appendTo(original);
            var maskWidth = original.outerWidth();
            if(!maskWidth){
                maskWidth = original.width();
            }
            var maskHeight = original.outerHeight();
            if(!maskHeight){
                maskHeight = original.height();
            }
            maskDiv.css({
                position: 'absolute',
                //top: position.top,
                //left: position.left,
                left: 0,
                'z-index': op.z,
                width: maskWidth,
                height:maskHeight,
                'background-color': op.bgcolor,
                opacity: 0
            });
            if(maskDivClass){
                maskDiv.addClass(maskDivClass);
            }
            if(msg){
                var msgDiv=$('<div style="position:absolute;border:#6593cf 1px solid; padding:2px;background:#ccca"><div style="line-height:24px;border:#a3bad9 1px solid;background:white;padding:2px 10px 2px 10px">'+msg+'</div></div>');
                msgDiv.appendTo(maskDiv);
                var widthspace = (maskDiv.width()-msgDiv.width());
                var heightspace = (maskDiv.height()-msgDiv.height());
                msgDiv.css({
                    cursor:'wait',
                    top:(heightspace/2-2),
                    left:(widthspace/2-2)
                });
            }
            maskDiv.fadeIn('fast', function(){
                // 淡入淡出效果
                $(this).fadeTo('slow', op.opacity);
            })
            return maskDiv;
        },
        unmask: function(){
            var original = $(document.body);
            if(this[0] && this[0] !== window.document){
                original = $(this[0]);
            }
            original.find("> div.maskdivgen").fadeOut('slow',0,function(){
                $(this).remove();
            });
        }
    });
})(jQuery);


/*ajax封装
* @param url 请求地址（除开公共部分）
* @param data 传送数据对象
* @param success 请求成功回调
* @param error 请求失败回调
* */
(function ($){
    $.extend({
        smAjax:function(url,data,success,error){
            var funUrl = "192.168.1.225:8080/imageConsultation/"   // 每个请求地址相同的部分
            url = funUrl + url;// 拼接请求地址
            var success = arguments[2]?arguments[2]:function(){};// 成功执行的函数
            var error = arguments[3]?arguments[3]:function(){};// 失败执行的函数
            $.ajax({
                url:url,
                type:"post",
                dataType:"json",
                data:data,//参数
                success: function (res) {
                    if(res.success==true){
                        success(res.data.data);
                    }
                },
                error: function (res) {
                    error(res);
                }
            })
        }

    });
})(jQuery);

