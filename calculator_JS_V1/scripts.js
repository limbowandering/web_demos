window.onload = function(){


  let way_res = [];
  //获取按钮对象
  let btn_txt = document.getElementsByClassName("btn");
  //获取屏幕元素
  let txt = document.getElementsByClassName("txt")[0];

  let btn_way = document.getElementsByClassName("btn_click");

  for(let i = 0; i < btn_way.length; i++){
    btn_way[i].onclick = function(){
      //AC按钮与DEL按钮
      if(this.value == 'AC'){
        way_res = [];
        txt.value = '';
      }else{
        txt.value = txt.value.substr(0, txt.value.length - 1);
      }
    }
  }

  for(let i = 0; i < btn_txt.length; i++){
    //给btn这个数组添加onclick事件
    btn_txt[i].onclick = function(){
      //小数事件
      if(txt.value == '' && this.value == '.'){
        txt.value == '0.';
      }else{
        //如果输入的是数字或者是点
        if(!isNaN(this.value) || this.value == '.'){
          if(txt.value.indexOf('.') != -1){
            //indexOf查找点字符 如果有返回当前位置 如果没有 返回-1
            //目的是.不能重复输入
            //如果不是点 就直接拼接
            if(this.value != '.'){
              txt.value += this.value;
            }
          }else{
            //如果没有点 就直接拼接
            txt.value += this.value;
          }
        }
        else{
          //下面是输入是符号的情况
          if(this.value != '='){
            //那么就是运算符了
            //存数值
            way_res[way_res.length] = txt.value;
            //存符号
            way_res[way_res.length] = this.value;
            //清屏
            txt.value = '';
          }
          else{
            //存数值
            way_res[way_res.length] = txt.value;
            //计算结果
            txt.value = eval(way_res.join(''));
            //清空数组
            way_res = [];
          }
        }
      }
    }
  }
}