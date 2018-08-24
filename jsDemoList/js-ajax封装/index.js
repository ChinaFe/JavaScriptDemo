//随机因子的封装以及url参数的拼接处理
function toStr(data){
    data.t=Math.random();
    var arr=[];
    for(var name in data){
        arr.push(name+'='+data[name])
    }
    return arr.join('&');
}


//传参json去定义ajax请求url,type,data等等
function ajax(json){
    json=json||{}   //必须是对象形式
    if(!json.url)return;    //在没有连接url的情况下，就在这一步就终止请求
    json.type=json.type||'GET'; //请求类型默认get
    json.data=json.data||{};    //数据类型也是对象形式
    json.time=json.time||3000;  //请求时间

    var timer=null;

    //1：创建核心对象xhr
    if(window.XMLHttpRequest){
        var oAjax=new XMLHttpRequest();
    }else{
        var oAjax=new ActiveXObject('Microsoft.XMLHTTP')//IE下的兼容方法
    }    

    //2：建立连接    *需要做一个请求方式的大小写判断，统一转换成一种
    switch(json.type.toUpperCase()){
        case 'GET':
            oAjax.open('GET',json.url+'?'+toStr(json.data),true);    //因为是异步无刷新读取数据，所在URL上加个随机因子
            //3:发送
            oAjax.send();
            break;
        case 'POST':
            oAjax.open('POST',JSON.url);
            oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');//post需要设置请求头
            oAjax.send(toStr(json.data));
    }

    json.loading && json.loading();

    // 4：响应
    oAjax.onreadystatechange=function(){
        // ajax状态码
        if(oAjax.readyState==4){
            //http响应码
            if(oAjax.status>=200 && oAjax.status <300 || oAjax.status==304){
                // 成功之后返回的数据的方法
                json.scuess = json.scuess(oAjax.responseText);
                clearTimeout(timer)
            }else{
                //失败的方法
                json.error = json.error(oAjax.status);
                clearTimeout(timer)
            }
        }
    }

    // 请求时间
    timer=setTimeout(function(){
        alert('网络请求超时');
        oAjax.onreadystatechange=null;
    },json.time*1000)
}