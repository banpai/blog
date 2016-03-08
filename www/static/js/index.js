//修改插值表达式
avalon.config({
    interpolate: ["[%","%]"]
});

var fn = {
  s_class:function(x){
    vm.c_note = "bs";
    vm.c_essay = 'bs';
    vm.c_programmer = "bs";
    vm.c_works = "bs";
    vm[x] = "bsi";
  },
  tusi:function(txt,fun){
    $('.tusi').remove();
    var div = $('<div style="background: rgba(87,76,76,0.7);max-width: 85%;min-height: 77px;min-width: 270px;position: absolute;left: -1000px;top: -1000px;text-align: center;border-radius:10px;"><span style="color: #fff;line-height: 77px;font-size: 23px;">'+txt+'</span></div>');
    $('body').append(div);
    div.css('zIndex',9999999);
    div.css('left',parseInt(($(window).width()-div.width())/2));
    var top = parseInt($(window).scrollTop()+($(window).height()-div.height())/2);
    div.css('top',top);
    setTimeout(function(){div.remove();},2000);
  },
  ajax:function(url,data,fun){
    $.ajax({
        url: url,
        dataType: "json",
        async: true,
        data: data,
        type: "POST",
        success: function(data) {
          fun(data);
        }
    });
  }
}

var vm = avalon.define({
  $id:"banpai",text:'',
  c_note:"bsi",c_essay:"bs",c_programmer:"bs",c_works:"bs",
  note_s:"",essay_s:"",programmer_s:"",programmer:"",note_id:1,
  programmer_id:1,title:"",type:"笔记",o_menu:false,data_t:[],
  tm:"glyphicon glyphicon-off",tm_s:"关幕",tm_index:false,
  //弹幕
  tm_x:function(){
    if(vm.tm_index == false){
      vm.tm = "glyphicon glyphicon-play-circle";
      vm.tm_s = "开幕";
      vm.tm_index = true;
    }else{
      vm.tm = "glyphicon glyphicon-off";
      vm.tm_s = "关幕";
      vm.tm_index = false;
    };
    $("#bp_dm").width($("#bp_p").width()+80);
    $("#bp_dm").height($("#bp_p").height()+80);
  },
  //目录内容
  o_menu_f:function(){
    vm.o_menu = !vm.o_menu;
    fn.ajax("home/index/menu",{"name":vm.type},function(data){
      vm.data_t = data;
    });
  },
  //目录点击
  title_xx:function(el){
    if(vm.type == "程序师"){
      vm.programmer_id = el.id;
    }else if(vm.type == "笔记"){
      vm.note_id = el.id;
    };
    fn.ajax("home/index/p",{"name":vm.type,"title":el.title},function(data){
      vm.text = data.text;
      vm.title = data.title;
    });
    vm.o_menu = false;
  },
  //笔记点击
  li_note:function(){
    $('body,html').animate({scrollTop:0},500);
    fn.s_class("c_note");
    vm.note_id = 1;
    fn.ajax("home/index/note",{"id":vm.note_id,"name":"笔记"},function(data){
      vm.text = data.text;
      vm.title = data.title;
    });
    vm.type = "笔记";
    vm.o_menu = false;
  },
  //随笔点击
  li_essay:function(){fn.tusi("开发中……！");vm.o_menu = false;},
  //程序师点击
  li_programmer:function(){
    $('body,html').animate({scrollTop:0},500);
    fn.s_class("c_programmer");
    vm.programmer_id = 1;
    fn.ajax("home/index/note",{"id":vm.programmer_id,"name":"程序师"},function(data){
      vm.text = data.text;
      vm.title = data.title;
    });
    vm.type = "程序师";
    vm.o_menu = false;
  },
  //作品集点击
  li_works:function(){fn.tusi("开发中……！");vm.o_menu = false;},
  //上一篇点击
  text_up:function(){
    var name;
    if(vm.type == "笔记"){
      name = "note_id";
    }else if(vm.type == "程序师"){
      name = "programmer_id";
    };
    if(vm[name] > 1){
      $('body,html').animate({scrollTop:0},500);
      vm[name] = vm[name] - 1;
      fn.ajax("home/index/note",{"id":vm[name],"name":vm.type},function(data){
        vm.text = data.text;
        vm.title = data.title;
      });
    }else {
      fn.tusi("没有了！");
    }
    vm.o_menu = false;
  },
  //下一篇点击
  text_down:function(){
    var xx;
    var name;
    if(vm.type == "笔记"){
      xx = vm.note_s;
      name = "note_id";
    }else if(vm.type == "程序师"){
      xx = vm.programmer_s;
      name = "programmer_id";
    };
    if(vm[name] < xx){
      $('body,html').animate({scrollTop:0},500);
      vm[name] = vm[name] + 1;
      fn.ajax("home/index/note",{"id":vm[name],"name":vm.type},function(data){
        vm.text = data.text;
        vm.title = data.title;
      });
    }else{
      fn.tusi("没有了！");
    }
    vm.o_menu = false;
  }
});

$.getJSON("home/index/start",function(data){
  vm.note_s = data.note;
  vm.programmer_s = data.programmer;
  vm.essay_s = data.essay;
  vm.text = data.text;
  vm.title = data.title;
});

var t1 = window.setTimeout(hello,1000);
var t2 = window.setTimeout("hello()",3000);//使用字符串执行方法
window.clearTimeout(t1);//去掉定时器
