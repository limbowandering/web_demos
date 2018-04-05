
//获取DOM对象
function e(str){
  return document.getElementById(str);
}

//动态添加有样式的内容
function appendHtml(obj,str,className){
  obj.innerHTML = str;
  obj.className = className;
}

//验证表单
function checkForm(){
  const ids = ['checkUserName()','checkPwd()','checkRepwd()','checkNikeName()','checkTel()','checkEmail()'];
  let sum = 0;
  for(let i = 0; i < ids.length ; i++){
    if( eval(ids[i])){
      sum+=1;
    }
  }
  return ids.length == sum ? true : false;
}

function focusShow(inputId,msg){
  let odom = e(inputId);
  let omsg = e(inputId+"Id");
  odom.style.borderColor = "red";
  appendHtml(omsg, msg,"import_prompt");
}

//验证用户名输入
function checkUserName(){
  let flag = true;
  let odom = e("userName");
  let omsg = e("userNameId");
  if(odom.value == ''){
    odom.style.borderColor = 'red';
    appendHtml(omsg,'通行证用户名不能为空,请输入通行证用户名','error_prompt');
    flag = false;
  }
  else{
    odom.style.borderColor = 'green';
    appendHtml(omsg,'输入正确','ok_prompt');
    flag = true;
  }
}

//验证密码
function checkPwd(){
  let flag = true;
  let odom = e('pwd');
  let omsg = e('pwdId');
  if(odom.value == ''){
    odom.style.borderColor = 'red';
    appendHtml(omsg,'密码长度为6-16个字符','error_prompt');
    flag = false;
  }else{
    odom.style.borderColor = 'green';
    appendHtml(omsg,'输入正确','ok_prompt');
    flag = true;
  }
}

//验证重复密码
function checkRepwd(){
    let flag = true;
    let odom = e("repwd");//输入框DOM对象
    let omsg = e("repwdId");//信息提示DOM对象
    if(odom.value == ""){
        odom.style.borderColor = "red";
        appendHtml(omsg,"确认密码不能为空","error_prompt");
        flag =  false;
    }else if(odom.value !=  e("pwd").value){
        odom.style.borderColor = "red";
        appendHtml(omsg,"两次输入的密码不一致","error_prompt");
        flag =  false;
    } else{
        odom.style.borderColor = "green";
        appendHtml(omsg,"输入正确","ok_prompt");
        flag =  true;
    }
    return flag;
}

//验证昵称
function checkNikeName(){
    let flag = true;
    let odom = e("nickName");//输入框DOM对象
    let omsg = e("nickNameId");//信息提示DOM对象
    if(odom.value == ""){
        odom.style.borderColor = "red";
        appendHtml(omsg,"昵称不能为空，请输入昵称","error_prompt");
        flag =  false;
    }else{
        odom.style.borderColor = "green";
        appendHtml(omsg,"输入正确","ok_prompt");
        flag =  true;
    }
    return flag;
}

//验证手机
function checkTel(){
    let flag = true;
    let odom = e("tel");//输入框DOM对象
    let omsg = e("telId");//信息提示DOM对象
    if(odom.value == "" || odom.value.length != 11){
        odom.style.borderColor = "red";
        appendHtml(omsg,"关联手机号码不能为空，请输入关联手机号码","error_prompt");
        flag =  false;
    }else{
        odom.style.borderColor = "green";
        appendHtml(omsg,"输入正确","ok_prompt");
        flag =  true;
    }
    return flag;
}
//验证邮箱
function checkEmail(){
    let flag = true;
    let odom = e("email");//输入框DOM对象
    let omsg = e("emailId");//信息提示DOM对象
    if(odom.value == ""){
        odom.style.borderColor = "red";
        appendHtml(omsg,"保密邮箱不能为空，请输入保密邮箱","error_prompt");
        flag =  false;
    }else if( odom.value.indexOf("@")==-1  || odom.value.indexOf(".")==-1 ){
        odom.style.borderColor = "red";
        appendHtml(omsg,"邮件格式必须包含@和.","error_prompt");
        flag =  false;
    }else{
        odom.style.borderColor = "green";
        appendHtml(omsg,"输入正确","ok_prompt");
        flag =  true;
    }
    return flag;
}