function getQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

function getTimeStamp(){
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    return timestamp;
}

/**获取平台信息 还原到旧版本**/
function getPlatform()
{
    var config = {};
    config.ua = navigator.userAgent.toLowerCase();
    config.isios = false;
    config.isweixin = false;
    config.isqq = false;
    config.isOs8 = false;
    config.ischrome = false;
    config.isUsedIframe = false;
    if (/iphone|ipad|ipod/.test(config.ua)) {
        config.isios = true;
    }
    if (config.ua.match(/MicroMessenger/i) == "micromessenger") {
        config.isweixin = true;
    }
    if (/qq\//.test(config.ua)) {
        config.isqq = true;
    }
    if (/os 8/.test(config.ua)) {
        config.isOs8 = true;
    }

    if (/chrome/.test(config.ua)) {
        config.ischrome = true;
    }
    //华为荣耀
    if(/h60-l01/.test(config.ua)){
        config.isUsedIframe = true;
    }

    return config;
}

var platform;
var isChangeBrowers = false;
var appid;
var roomid;
var msg;
var config;

function checkLink(){
    if(platform.isweixin || platform.isqq){
        //if(!platform.isios || platform.isOs8){
            isChangeBrowers = true;
        //}
    }
}

//打开，跳转，下载
function htmlResponse(showmid, showhint, showdownload){
    document.getElementsByTagName("body")[0].setAttribute("style","width:100%;height:100%;margin:0;padding:0;font-size:5vw;background:#00427a url('share/img/bg.jpg') no-repeat;background-size:cover;color:white;")
    if(showhint == true){
        document.write('<div id="hint"></div>');
    }
    if(showmid == true){
        document.write('<div id="mid"></div>');
    }
    document.write('<figure>');
    document.write('<img src="images/newdownload/'+appConfig[appid].icon+'" id="icon" />');
    document.write('<figcaption id="txtName">'+appConfig[appid].title+'</figcaption>');
    document.write('</figure>');
    if(showmid == true){
        document.write('<a href="#" id="btn" target="_blank"><img id="btnDownload" src="share/img/btn_open.png" /></a>');
    }
    if(showdownload == true){
        document.write('<a href="'+config.download_Adroid+'" id="btn" target="_blank"><img id="btnDownload" src="share/img/btn_download.png" /></a>');
    }
    //document.title = appConfig[appid].title;
}

function openUniversalLinks(){
    //alert(platform.isios);
    if(platform.isios){
        window.open(config.universal_Links, "_blank");
    }else{
        window.location.href = config.scheme_Adroid;
    }
    window.location.href = config.download_IOS;
}

function main(){
    roomid = getQueryString("roomid");
    appid = parseInt(getQueryString("appid"));
    msg = getQueryString("msg");
	if(typeof(roomid)=="undefined"||roomid==null){
		var downloadUrl = appConfig[appid].android_url;
		window.location.href = downloadUrl;
		return;
	}
    config = {
        // nmddaapp://applink?roomid=958954
        universal_Links: appConfig[appid].link_name+"://applink?roomid="+roomid,
        scheme_IOS: appConfig[appid].link_name+"://applink?roomid="+roomid,
        scheme_Adroid: appConfig[appid].link_name+"://applink?roomid="+roomid+"&r="+getTimeStamp,
        download_IOS: appConfig[appid].ios_url,
        download_Adroid: appConfig[appid].android_url,
        autoDownload: true,
        timeout: 3000,
    };
    platform = getPlatform();
	//检测是否在微信或QQ浏览器中
    checkLink();
	//alert(isChangeBrowers);
    if (isChangeBrowers) {
        htmlResponse(false, true, false);//打开，跳转，下载
    }else{
        if(platform.isios && !platform.isOs8){ // ios 非ios 8
			//alert("isios");
            htmlResponse(true, false, false);//打开，跳转，下载
			//点击（进入/下载按钮）
            var btn = document.getElementById("btn");
            //btn.href = config.scheme_IOS;
            btn.onclick = function(){
                window.location.href = config.scheme_IOS;//拉起手机应用
				setTimeout(function(){
					window.location.href=config.download_IOS;//如果超时就跳转到app下载页
				},2000);
            };
        }else{
			//alert("isother");
            htmlResponse(true, false, true);//打开，跳转，下载
            if(platform.ischrome || platform.isios){
                if(!platform.isUsedIframe){
                    if(platform.isios && !config.isweixin){ // ios 不在微信浏览器中
                        window.location.href = config.scheme_IOS;
                    }else{
                        window.location.href = config.scheme_Adroid;
                    }
                }else{
                    var iframe = document.createElement("iframe");
                    iframe.src = config.scheme_Adroid;
                    iframe.style.display = "none";
                    document.body.appendChild(iframe);
                    setTimeout(function(){
                        document.body.removeChild(iframe);
                    },2000);
                }
            }else{
                var iframe = document.createElement("iframe");
                iframe.src = config.scheme_Adroid;
                iframe.style.display = "none";
                document.body.appendChild(iframe);
                setTimeout(function(){
                    document.body.removeChild(iframe);
                },2000);
            }
        }
    }
}
main();