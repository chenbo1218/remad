/**
 * Created by Administrator on 2016/3/9.
 */
$(document).ready(function(){

//导航点击效果
    /*var navlist = $("#nav-list").find("li");
    var content = $("#content");
    content.load("home.html");
    if(navlist.length<=0){
        return;
    }
    for(var i=0;i<navlist.length;i++){
        navlist[i].onclick = function(){
            for(var j=0;j<navlist.length;j++){
                navlist[j].className = "";
            }
            this.className = "current";
            var url = this.id;
            //alert(url);
            content.load("./"+url+".html");
        };
    }*/

    //背景自动高度
    /*var parts = $(document).find(".part");
    for(var i=0;i<parts.length;i++){
        if(i==0)continue;
        var part = $(parts[i]);
        //if(part.className.indexOf("title")!=-1)continue;
        setRealHeight(part);
    }
    function setRealHeight(part){
        var scWidth = part.children("img").width();
        alert(scWidth);
        var dif = $(window).width() / 1920;
        //var height = $("#"+divId).height();
        part.height(scHeight);
    }*/

    //禁用当前标签
    $("#nav-list").find(".current").click(function(e){
        e.preventDefault();
    });


    //导航栏自动隐藏/显示
    var prevScroll = 0,
        curDir = 'down',
        prevDir = 'up';
    $(window).scroll(function(){
        if($(this).scrollTop() > prevScroll){
            curDir = 'down';
            if(curDir != prevDir){
                $('#nav').stop();
                $('#nav').animate({ top: '-100px' }, 300);
                prevDir = curDir;
            }
        }else{
            curDir = 'up';
            if(curDir != prevDir){
                $('#nav').stop();
                $('#nav').animate({ top: '0px' }, 300);
                prevDir = curDir;
            }
        }
        prevScroll = $(this).scrollTop();
    });


    //回到顶部
    $("#nav-sheet").onclick = function(){
            $("body,html").animate({scrollTop:0},1000);
            return false;
    };


    //随机动画
    var anis = ["wow bounceInLeft bg-purple","wow bounceInRight bg-yellow",
        "wow fadeInUp","wow slideInUp","wow rollIn bg-red"];
    var parts = $("#content").find(".part");
    for(var k=0;k<parts.length;k++){
        var part = $(parts[k]);
        var ani = anis[Math.floor(Math.random()*5)];
        //alert(ani);
        var cls = part.attr("class");
        part.attr("class",cls+" "+ani);
        part.attr("data-wow-duration","1.5s");
    }


    $("#nav-sheet").on("click",function(){

       //sweetAlert("分享","请转发朋友圈","error");
        sweetAlert({
                title: "分享",
                text: "微信微博分享",
                imageUrl: "images/base/sheet.png",
                confirmButtonText: "确定",
                //showCancelButton:true,
                closeOnConfirm: false
            },
            function(isConfirm){
                if(isConfirm){
                    sweetAlert("分享成功！","", "success");
                }
            }
        )

    });









});