
//初始化
(function($){
    $.fn.extend({
        initPage:function(){
            quanp();
            function quanp(){
                var single_hh = $(window).height();
                var single_ww = $(window).width();
                $('.num').height(single_hh);
                $('.num').width(single_ww);
            }
            $(window).resize(function(){
                if (typeof indexSlides != 'undefined' && indexSlides.reformat)
                    indexSlides.reformat();
                quanp();
            });
        }
    });
})(jQuery);


//新翻页效果
(function($){
    $.fn.extend({
        turnPage:function(){
            $(".next img").click(function(e){
                e.preventDefault();
                var single_hh = $(window).height();
                var curPosition = parseInt($('.num_box').css("bottom"));
                var maxPosition = ($('.num').length - 1)*single_hh;
                if(curPosition == maxPosition){
                    pageMove("up");
                    return;
                }
                pageMove("down");
            });
            $(document).addTouchListener();
        }
    });
})(jQuery);

//添加触摸监听器
(function($){
    $.fn.extend({
        addTouchListener:function(){
            document.addEventListener('touchstart',touch,false);
            document.addEventListener('touchmove',touch,false);
            document.addEventListener('touchend',touch,false);
        }
    });
})(jQuery);

//删除触摸监听器
(function($){
    $.fn.extend({
        removeTouchListener:function(){
            document.removeEventListener("touchstart", touch);
            document.removeEventListener("touchmove", touch);
            document.removeEventListener("touchend", touch);
        }
    });
})(jQuery);

(function($){
    $.fn.extend({
        clickNav:function(){
            var single_hh = $(window).height();
            var curPosition = parseInt($('.num_box').css("bottom"));
            var maxPosition = ($('.num').length - 1)*single_hh;

            $('.nav ul li').click(function(){
                var pageIndex = $(this).index();
                var nextPosition = pageIndex*single_hh;
                $('.num_box').stop().animate({'bottom': nextPosition + "px"},1000,"easeOutSine",pageAnimation(pageIndex));
                $('.nav ul li').eq(pageIndex).addClass("on").siblings("li").removeClass("on");
                //pageAnimation(pageIndex);
            });
        }
    });
})(jQuery);

//触摸监听
function touch (event){
    var event = event || window.event;
    a = event;
    switch(event.type){
        case "touchstart":
            startY = event.touches[0].clientY;
            break;
        case "touchend":
            endY = event.changedTouches[0].clientY;
            if(endY - startY > 50){
                pageMove("up");
            }
            else if(endY - startY < -50){
                pageMove("down");
            }
            break;
        case "touchmove":
            event.preventDefault();
            break;
    }
}
pageIndex = 0;
//页面垂直滚动动画
function pageMove (di) {
    var single_hh = $(window).height();
    //var curPosition = parseInt($('.num_box').css("bottom"));
    var curPosition = pageIndex * single_hh;
    var maxPosition = ($('.num').length - 1)*single_hh;
    if(di == "down"){
        if(curPosition >= maxPosition){
            return ;
        }
        var nextPosition = curPosition + single_hh;
        pageIndex += 1;
    }
    if(di == "up"){
        if(curPosition <= 0){
            return;
        }
        var nextPosition = curPosition - single_hh;
        pageIndex -= 1;
    }
    //当前页面序列
    //console.log(pageIndex);
    //console.log(nextPosition);
    $('.num_box').stop();
    $('.num_box').animate({'bottom': nextPosition + "px"},1000,"easeOutSine",pageAnimation(pageIndex));
    $('.nav ul li').eq(pageIndex).addClass("on").siblings("li").removeClass("on");
    //pageAnimation(pageIndex);
}
//页面细部动画
function pageAnimation(index){
    console.log("page:",index);
    switch(index){
        case 0:
            console.log("执行脚本0");
            $("#num0").find(".num0-p1").hide();
            $("#num0").find(".num0-p1").fadeIn(0);
            break;
        case 1:
            console.log("执行脚本1");
            $("#num1").find(".num1-p1").hide();
            $("#num1").find(".num1-p2").hide();
            $("#num1").find(".num1-p3").hide();
            $("#num1").find(".num1-p1").fadeIn(0);
            $("#num1").find(".num1-p2").fadeIn(1);
            $("#num1").find(".num1-p3").fadeIn(2);
            break;
        case 2:
            console.log("执行脚本2");
            $("#num2").find(".num2-p1").hide();
            $("#num2").find(".num2-p2").hide();
            $("#num2").find(".num2-p3").hide();
            $("#num2").find(".num2-p1").fadeIn(0);
            $("#num2").find(".num2-p2").fadeIn(1);
            $("#num2").find(".num2-p3").fadeIn(2);
            break;
        case 3:
            console.log("执行脚本3");
            $("#num3").find(".num3-p1").hide();
            $("#num3").find(".num3-p2").hide();
            $("#num3").find(".num3-p3").hide();
            $("#num3").find(".num3-p1").fadeIn(0);
            $("#num3").find(".num3-p2").fadeIn(1);
            $("#num3").find(".num3-p3").fadeIn(2);
            break;
        case 4:
            console.log("执行脚本4");
            $("#num4").find(".num4-p1").hide();
            $("#num4").find(".num4-p2").hide();
            $("#num4").find(".num4-p3").hide();
            $("#num4").find(".num4-p1").fadeIn(0);
            $("#num4").find(".num4-p2").fadeIn(1);
            $("#num4").find(".num4-p3").fadeIn(2);
            break;
        case 5:
            console.log("执行脚本5");
            $("#num5").find(".num5-p1").hide();
            $("#num5").find(".num5-p2").hide();
            $("#num5").find(".num5-p3").hide();
            $("#num5").find(".num5-p1").fadeIn(0);
            $("#num5").find(".num5-p2").fadeIn(1);
            $("#num5").find(".num5-p3").fadeIn(2);
            break;
        case 6:
            console.log("执行脚本6");
            $("#num6").find(".num6-p1").hide();
            $("#num6").find(".num6-p2").hide();
            $("#num6").find(".num6-p3").hide();
            $("#num6").find(".num6-p1").fadeIn(0);
            $("#num6").find(".num6-p2").fadeIn(1);
            $("#num6").find(".num6-p3").fadeIn(2);
            break;
        case 7:
            console.log("执行脚本7");
            $("#num7").find(".num7-p1").hide();
            $("#num7").find(".num7-p2").hide();
            $("#num7").find(".num7-p3").hide();
            $("#num7").find(".num7-p1").fadeIn(0);
            $("#num7").find(".num7-p2").fadeIn(1);
            $("#num7").find(".num7-p3").fadeIn(2);
            break;
        case 8:
            console.log("执行脚本8");
            $("#num8").find(".num8-p1").hide();
            $("#num8").find(".num8-p2").hide();
            $("#num8").find(".num8-p3").hide();
            $("#num8").find(".num8-p1").fadeIn(0);
            $("#num8").find(".num8-p2").fadeIn(1);
            $("#num8").find(".num8-p3").fadeIn(2);
            break;
        case 9:
            console.log("执行脚本9");
            $("#num9").find(".num9-p1").hide();
            $("#num9").find(".num9-p2").hide();
            $("#num9").find(".num9-p3").hide();
            $("#num9").find(".num9-p1").fadeIn(0);
            $("#num9").find(".num9-p2").fadeIn(1);
            $("#num9").find(".num9-p3").fadeIn(2);
            break;
        case 10:
            console.log("执行脚本10");
            $("#num10").find(".num10-p1").hide();
            $("#num10").find(".num10-p2").hide();
            $("#num10").find(".num10-p3").hide();
            $("#num10").find(".num10-p1").fadeIn(0);
            $("#num10").find(".num10-p2").fadeIn(1);
            $("#num10").find(".num10-p3").fadeIn(2);
            break;
        case 11:
            console.log("执行脚本11");
            $("#num11").find(".num11-p1").hide();
            $("#num11").find(".num11-p2").hide();
            $("#num11").find(".num11-p1").fadeIn(0);
            $("#num11").find(".num11-p2").fadeIn(1);
            break;
        case 12:
            console.log("执行脚本12");
            $("#num12").find(".num12-p1").hide();
            $("#num12").find(".num12-p2").hide();
            $("#num12").find(".num12-p3").hide();
            $("#num12").find(".num12-p1").fadeIn(0);
            $("#num12").find(".num12-p2").fadeIn(1);
            $("#num12").find(".num12-p3").fadeIn(2);
            break;
        case 13:
            console.log("执行脚本13");
            $("#num13").find(".num131-p1").hide();
            $("#num13").find(".num13-p2").hide();
            $("#num13").find(".num13-p3").hide();
            $("#num13").find(".num13-p1").fadeIn(0);
            $("#num13").find(".num13-p2").fadeIn(1);
            $("#num13").find(".num13-p3").fadeIn(2);
            break;
    }

}


//团队模块
(function($){
    $.fn.extend({
        num9:function(){
            /*var photoInfo = [
                ["CEO","国内第一代网络营销人，曾任博胜互动CEO，为国内各大品牌客户提供专业网络整合营销服务。","images/c_img_tuandui_ico_big_01.jpg"],
                ["CEO","国内第一代网络营销人，曾任博胜互动CEO，为国内各大品牌客户提供专业网络整合营销服务。","images/c_img_tuandui_ico_big_02.jpg"],
                ["技术总监","10年互联网技术研发经验，曾参与拍拍、微信、互娱等多个行业经典平台的研发工作。","images/c_img_tuandui_ico_big_03.jpg"],
                ["设计总监","8年品牌视觉设计经验，曾任奥美设计总监，曾服务奥美，灵思，省广等大型4a广告公司。","images/c_img_tuandui_ico_big_04.jpg"],
                ["客服总监","2012年涉足报社媒体行业，曾参加过湖南车展、湖南旅博会、湖南教育博览等展会执行工作。","images/c_img_tuandui_ico_big_05.jpg"],
                ["行政总监","10年行政管理及网络营销经验，为企业财务、行政、人力资源、及项目管理的多面手。","images/c_img_tuandui_ico_big_06.jpg"],
                ["商务总监","15年商务管理经验，法学、心理学双学士学位。在各级政府、广大商家拥有广泛的人脉资源。","images/c_img_tuandui_ico_big_07.jpg"]
            ];*/

            var $ico = $(".num9-p3 .p3-box .ico");
            var $box = $(".num9-p4");

            var $cont = $(".num9-p4 .box");
            var $ul = $(".num9-p4 .box ul");
            var $li = $(".num9-p4 .box ul li");
            var dif = $li.eq(0).width();
            $ul.width($li.length*dif);

            var index = 0;
            $ico.on("click", function(e){
                e.preventDefault();
                var ico = $(this);
                index = parseInt(ico.attr("alt"));
                var pwidth = parseInt(index*dif);
                $ul.stop().css({left: -pwidth});
                $box.addClass('is-visible');
                //console.log($cont);
                addTouch();
                $(this).removeTouchListener();
            });
            $box.on("click", function(e){
                //if($(e.target).is($box)) {
                    e.preventDefault();
                    /*$box.find(".box-title").text("");
                    $box.find(".box-des").text("");
                    $box.find(".box-img").attr("src","");*/
                    $box.removeClass('is-visible');
                    removeTouch();
                    $(this).addTouchListener();
                //}
            });

            function addTouch(){
                $cont[0].addEventListener("touchstart", photoMove);
                $cont[0].addEventListener("touchmove", photoMove);
                $cont[0].addEventListener("touchend", photoMove);
            }
            function removeTouch(){
                $cont[0].removeEventListener("touchstart", photoMove);
                $cont[0].removeEventListener("touchmove", photoMove);
                $cont[0].removeEventListener("touchend", photoMove);
            }
            function photoMove (event){
                var event = event || window.event;
                //var startX,endX;
                switch(event.type){
                    case "touchstart":
                        startX = event.touches[0].clientX;
                        break;
                    case "touchend":
                        endX = event.changedTouches[0].clientX;
                        if(endX - startX > 50){
                            if(index == 0)return;
                            index--;
                            var pwidth = parseInt(index*dif);
                            $ul.stop().animate({left: -pwidth}, "slow");
                        }
                        else if(endX - startX < -50){
                            if(index == $li.length-1)return;
                            index++;
                            var pwidth = parseInt(index*dif);
                            $ul.stop().animate({left: -pwidth}, "slow");
                        }
                        break;
                    case "touchmove":
                        event.preventDefault();
                        break;
                }
            }
        }
    });
})(jQuery);



//案例模块
(function($){
    $.fn.extend({
        num10:function(){
            var $cont = $(".num10-p3 .banner-img");
            var $imgsul = $(".num10-p3 .banner-img ul");
            var $txtsul = $(".num10-p3 .banner-txt ul");
            var $imgs = $('.num10-p3 .banner-img ul li');
            var $txts = $('.num10-p3 .banner-txt ul li');
            //var $tags = $(".num10-p3 .banner-tag");
            var $rbtn = $(".num10-p3 .right-btn");
            var $lbtn = $(".num10-p3 .left-btn");

            var total = $imgs.length;
            var dif1 = $imgs.children("img").width();
            var dif2 = $txts.children("p").width();
            //console.log(dif1,"+",dif2);
            $imgsul.width(total*dif1);
            $txtsul.width(total*dif2);
            $imgs.eq(0).addClass("on");
            $txts.eq(0).addClass("on");

            //图片轮播
            var index = 0;
            var interv = setInterval(playImg,4000);
            //手势滑动
            //console.log($cont);
            addTouch();

            function playImg(){
                if(index==$imgs.length-1){
                    index = -1;
                }
                index++;
                //console.log("<<>>",index);
                var pwidth = parseInt(index*dif1);
                var twidth = parseInt(index*dif2);
                $imgs.eq(index).addClass("on").siblings().removeClass("on");
                $imgsul.stop().animate({left: -pwidth}, "slow");
                $txts.eq(index).addClass("on").siblings().removeClass("on");
                $txtsul.stop().animate({left: -twidth}, "slow");
                //$tags.find("li").eq(index).addClass("current").siblings().removeClass("current");
            }
            /*$tags.find("li").click(function(){
                clearInterval(interv);
                var num = $(this).index();
                index = num;
                console.log("<<>>",index);
                var pwidth = parseInt(index*dif1);
                var twidth = parseInt(index*dif2);
                $imgs.eq(index).addClass('on').siblings().removeClass('on');
                $imgsul.stop().animate({left: -pwidth}, "slow");
                $txts.eq(index).addClass('on').siblings().removeClass('on');
                $txtsul.stop().animate({left: -twidth}, "slow");
                interv = setInterval(playImg,4000);
            });*/
            /*$rbtn.click(function(){
                clearInterval(interv);
                if(index==$imgs.length-1){
                    index = -1;
                }
                index ++;
                var pwidth = parseInt(index*dif1);
                var twidth = parseInt(index*dif2);
                $imgs.eq(index).addClass('on').siblings().removeClass('on');
                $imgsul.stop().animate({left: -pwidth}, "slow");
                $txts.eq(index).addClass('on').siblings().removeClass('on');
                $txtsul.stop().animate({left: -twidth}, "slow");
                interv = setInterval(playImg,4000);
            });
            $lbtn.click(function(){
                clearInterval(interv);
                index --;
                if(index==-1){
                    index = $imgs.length-1;
                }
                var pwidth = parseInt(index*dif1);
                var twidth = parseInt(index*dif2);
                $imgs.eq(index).addClass("on").siblings().removeClass("on");
                $imgsul.stop().animate({left: -pwidth}, "slow");
                $txts.eq(index).addClass("on").siblings().removeClass("on");
                $txtsul.stop().animate({left: -twidth}, "slow");
                interv = setInterval(playImg,4000);
            });*/

            function addTouch(){
                $cont[0].addEventListener("touchstart", photoMove);
                $cont[0].addEventListener("touchmove", photoMove);
                $cont[0].addEventListener("touchend", photoMove);
            }
            function removeTouch(){
                $cont[0].removeEventListener("touchstart", photoMove);
                $cont[0].removeEventListener("touchmove", photoMove);
                $cont[0].removeEventListener("touchend", photoMove);
            }
            function photoMove (event){
                var event = event || window.event;
                //var startX,endX;
                switch(event.type){
                    case "touchstart":
                        startX = event.touches[0].clientX;
                        break;
                    case "touchend":
                        endX = event.changedTouches[0].clientX;
                        if(endX - startX > 50){
                            clearInterval(interv);
                            if(index == 0){
                                interv = setInterval(playImg,4000);
                                return;
                            }
                            index --;
                            var pwidth = parseInt(index*dif1);
                            var twidth = parseInt(index*dif2);
                            $imgs.eq(index).addClass("on").siblings().removeClass("on");
                            $imgsul.stop().animate({left: -pwidth}, "slow");
                            $txts.eq(index).addClass("on").siblings().removeClass("on");
                            $txtsul.stop().animate({left: -twidth}, "slow");
                            interv = setInterval(playImg,4000);
                        }
                        else if(endX - startX < -50){
                            clearInterval(interv);
                            if(index==$imgs.length-1){
                                interv = setInterval(playImg,4000);
                                return;
                            }
                            index ++;
                            var pwidth = parseInt(index*dif1);
                            var twidth = parseInt(index*dif2);
                            $imgs.eq(index).addClass('on').siblings().removeClass('on');
                            $imgsul.stop().animate({left: -pwidth}, "slow");
                            $txts.eq(index).addClass('on').siblings().removeClass('on');
                            $txtsul.stop().animate({left: -twidth}, "slow");
                            interv = setInterval(playImg,4000);
                        }
                        break;
                    case "touchmove":
                        event.preventDefault();
                        break;
                }
            }
        }
    });
})(jQuery);

//环境模块
(function($){
    $.fn.extend({
        num12:function(){
            var $cont = $(".num12-p3");
            var $imgsul = $(".num12-p3 ul");
            var $imgs = $('.num12-p3 ul li');
            var $bigImg = $(".num12-p2 img");

            var dif = parseInt($($imgs[0]).css("width"));
            $imgsul.width($imgs.length*dif);
            $imgs.eq(0).addClass("on");

            //图片轮播
            var index = 0;
            var interv = setInterval(playImg,4000);
            //手势滑动
            //console.log($cont);
            addTouch();

            function playImg(){
                if(index==$imgs.length-1){
                    index = -1;
                }
                index++;
                $imgs.eq(index).addClass("on").siblings().removeClass("on");
                $bigImg.attr("src", $imgs.eq(index).find("img").attr("src"));
                if(index < 3){
                    $imgsul.stop().animate({left: 0}, "slow");
                }else{
                    var last = parseInt($imgsul.css("left"));
                    $imgsul.stop().animate({left: last-dif}, "slow");
                }
            }

            //console.log($cont);

            function addTouch(){
                $cont[0].addEventListener("touchstart", photoMove);
                $cont[0].addEventListener("touchmove", photoMove);
                $cont[0].addEventListener("touchend", photoMove);
            }
            function removeTouch(){
                $cont[0].removeEventListener("touchstart", photoMove);
                $cont[0].removeEventListener("touchmove", photoMove);
                $cont[0].removeEventListener("touchend", photoMove);
            }
            function photoMove (event){
                var event = event || window.event;
                //var startX,endX;
                switch(event.type){
                    case "touchstart":
                        startX = event.touches[0].clientX;
                        break;
                    case "touchend":
                        endX = event.changedTouches[0].clientX;
                        if(endX - startX > 50){
                            clearInterval(interv);
                            var last = parseInt($imgsul.css("left"));
                            if(last >= 0){
                                //interv = setInterval(playImg,4000);
                                return;
                            }
                            //console.log(last);
                            $imgsul.stop();
                            $imgsul.animate({left: last+dif}, "fast");
                            //interv = setInterval(playImg,4000);
                        }
                        else if(endX - startX < -50){
                            clearInterval(interv);
                            var last = parseInt($imgsul.css("left"));
                            if(last <= -735){
                                //interv = setInterval(playImg,4000);
                                return;
                            }
                            //console.log(last);
                            $imgsul.stop();
                            $imgsul.animate({left: last-dif}, "fast");
                            //interv = setInterval(playImg,4000);
                        }
                        break;
                    case "touchmove":
                        event.preventDefault();
                        break;
                }
            }

            $imgs.click(function(){
                index = $(this).index();
                $bigImg.attr("src", $(this).find("img").attr("src"));
                $imgs.eq(index).addClass("on").siblings().removeClass("on");
            });


        }
    });
})(jQuery);




