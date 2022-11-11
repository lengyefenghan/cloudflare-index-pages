
function BodyLoaded(){
    console.log("欢迎使用lengyefenghan的导航")
    loadJson('config.json');
}

function loadJson(json){
    fetch(json,{
        method:'GET',
        mode:'cors',// 允许发送跨域请求
        credentials: 'include'
    }).then(
        function(response){
            if (response.status!=200){
                console.log("failed load json,err: response.status =",response.status);
            }else{
                response.json().then(
                    function(j){
                        // console.log(j)
                        // console.log(j.IndexSiteName)
                        //设置标题
                        setTitle(j.Title)
                        //设置标题
                        setIndexSiteName(j.IndexSiteName)
                        //如果提供了背景图片参数则设置背景图片
                        if (j.Background!=""){
                            setBackground(j.Background)
                        }
                        var li = new String("");
                        var a,b,c,d;
                        // console.log(j.sites.length)
                        for(var i=0,len=j.sites.length;i<len;i++){
                            a = j.sites[i].SiteName;
                            b = j.sites[i].SiteUrl;
                            c = j.sites[i].SiteLogoUrl;
                            d = i;
                            li = li + getLiHtml(a,b,c,d);
                        }
                        // console.log(li)
                        setListUrl(li)
                        

                    }
                );
            }
            
        });
}

function setTitle(title){
    document.title=title;
}

function setIndexSiteName(name){
    document.getElementById("IndexSiteName").innerHTML=name;

}

function setBackground(bg) {
    document.body.style.background=bg;
}

function setListUrl(lis){
    document.getElementById("ListUrl").innerHTML=lis;

}

function getLiHtml(sitename,siteurl,sitelogourl,index) {
    var li = '<li><a class="acard" id="{{SiteID}}" href="{{SiteUrl}}"><div class="ibg" style="background-image: url({{SiteLogoUrl}});"></div><p>{{SiteName}}</p></a></li>\n'
    li = li.replace('{{SiteID}}','#'+index)  
    li = li.replace('{{SiteUrl}}',siteurl)
    li = li.replace('{{SiteLogoUrl}}',sitelogourl)        
    li = li.replace('{{SiteName}}',sitename)
    return li
}