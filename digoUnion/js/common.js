//返回按钮
(function($){
    $.fn.extend({
        back:function(){
            $(".comm-ico-back a").click(function(){
                 window.history.back();
            })
        }
    })
})(jQuery);

//轮循banner控件
(function($){
    $.fn.extend({
        banner:function(){
            var imgs = $(".comm-banner-img");
            var tags = $(".comm-banner-tag");
            var int1 = setInterval(playImg,3000);
            var index = 0;
            function playImg(){
                if(index==3){
                    index = -1;
                }
                index++;
                imgs.find("img").eq(index).fadeIn(300).siblings().fadeOut(300);
                tags.find("li").eq(index).addClass("current").siblings().removeClass("current");
            }
            tags.find("li").click(function(){
                clearInterval(int1);
                var num = $(this).index();
                index = num;
                imgs.find("img").eq(num).fadeIn(300).siblings().fadeOut(300);
                $(this).addClass("current").siblings().removeClass("current");
        //            setTimeout(function(){
        //                int1.call();

        //            },0);
                int1 = setInterval(playImg,3000);
            });

        }
    });
})(jQuery);



//计数器控件
(function($){
    $.fn.extend({
        countbar:function(){
            var txt = $(this).children(".comm-countbar-text");
            var lbtn = $(this).children(".comm-countbar-btnleft");
            var rbtn = $(this).children(".comm-countbar-btnright");
            //框体输入
            txt.keyup(function(){
                if(isNaN($(this).val()) || parseInt($(this).val())<1){
                    $(this).val("1");

                }
            });

            //左右按钮
            lbtn.click(function(){
                var num_dec = parseInt(txt.val())-1;
                if(num_dec<1){
                    //购买数量必须大于或等于1
                    alert("not lt 1");
                }else{
                    txt.val(num_dec);
                }
            });
            rbtn.click(function(){
                var num_add = parseInt(txt.val())+1;
                if(txt.val()==""){
                    num_add = 1;
                }
                txt.val(num_add);
            });

        }
    });
})(jQuery);



//星星评分-展示
(function($){
    $.fn.extend({
        starshow:function(num){
            var stars = $(this).find(".comm-star-single");
            //框体输入
            for(var i=0;i<stars.length;i++){
                var star = stars[i];
                if(i<=num-1){
                    $(star).find("img").attr("src","images/ico_star_32X32.png");
                }else{
                    $(star).find("img").attr("src","images/ico_star_empty_32X32.png");
                }
            }

        }
    });
})(jQuery);

