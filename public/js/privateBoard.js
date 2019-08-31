function httpPost(url,params){
    var temp = document.createElement('form');
    temp.action = url;
    temp.method = "post";
    temp.style.display = "none";
    var opt = document.createElement('textarea');
    opt.name="messageId";
    opt.value=params;
    temp.appendChild(opt);
    document.body.appendChild(temp);
    temp.submit();
}

function delMessage(){
    var buttonArray  = document.getElementsByTagName('button');
    for(var i=0 ; i<buttonArray.length ; i++){
        buttonArray[i].onclick = function(){
            //alert(this.id);
            messageId = this.id;
            httpPost('/api/messageBoard/delMessage',messageId);
            console.log("del request!");
            window.location.href="/myboard";
        }
    }
   
   
}
function addMessage(){
            var message = document.getElementById('message').value;
            var form = document.createElement('form');
            form.action='/api/messageBoard/addMessage';
            form.method='post';
            form.display='none';
            var opt = document.createElement('textarea');
            opt.name='message';
            opt.value=message;
            form.appendChild(opt);
            document.body.appendChild(form);
            form.submit();
            alert("发表成功！");
            window.location.href="/messageBoard";
}
function Ajax_addMessage(){
    var xmlhttp;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    var message = document.getElementById('message').value;
    xmlhttp.open("POST","localhost:80/addMessageToMyboard",true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send("message=Bill&lname=Gates");
    xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
   // document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
   alert("ok!");
    }
  }
    // var form = document.createElement('form');
    // form.action='/addMessageToMyboard';
    // form.method='post';
    // form.display='none';
    // var opt = document.createElement('textarea');
    // opt.name='message';
    // opt.value=message;
    // form.appendChild(opt);
    // document.body.appendChild(form);
    // form.submit();
    // window.location.href="/myboard";
}
