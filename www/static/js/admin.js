//修改插值表达式
avalon.config({
    interpolate: ["[%","%]"]
});

// var fn = {
//   ajax:function(url,data,fun){
    // $.ajax({
    //     url: url,
    //     dataType: "json",
    //     async: true,
    //     data: data,
    //     type: "POST",
    //     success: function(data) {
    //       fun(data);
    //     }
    // });
// }

var vm = avalon.define({
  $id:"up",
  test:"dsdsdsd",
  text:"",
  dd:function(){
    alert(vm.text);
    $.ajax({
        url: "home/admin/text",
        dataType: "json",
        async: true,
        data: {"text":vm.text},
        type: "POST",
        success: function(data) {
          var xx = JSON.stringify(data);
          alert(xx);
        }
    });
  }
})
