window.onload = function(){
    var buttonArray = document.getElementsByTagName('button');
    for(var i=0 ; i<buttonArray.length ; i++){
        buttonArray[i].onclick = function(){
            var val = this.id;
            var txt;
            if(confirm("完成点击‘确定’ & 删除点击（取消）!")){
              httpPost("/done",val);
              window.location.href="/todo";

            }else{
            httpPost("/del",val);
            window.location.href="/todo";
            }
        }
    }
}

function httpPost(url,params){
    var temp = document.createElement('form');
    temp.action = url;
    temp.method = "post";
    temp.style.display = "none";
    var opt = document.createElement('textarea');
    opt.name="item";
    opt.value=params;
    temp.appendChild(opt);
    document.body.appendChild(temp);
    temp.submit();
}
