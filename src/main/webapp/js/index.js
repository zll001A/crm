//登录
function login(){
    /***
     * 1. 获取输入框参数
     * 2. 校验参数
     * 3. 发送ajax请求
     * 4. 处理返回结果
     * */
    var username = $("#username").val();
    var password = $("#password").val();

    if(isEmpty(username)){
        alert("用户名为空");
        return;
    }
    if(isEmpty(password)){
        alert("密码为空");
        return;
    }

    $.ajax({
        url:ctx+"/user/login",
        type:"post",
        data:{
            userName:username,
            userPwd:password
        },
        success:function(data){
            if(data.code==200){
                alert(data.msg);
                //添加cookie
                $.cookie("userIdStr",data.result.userIdStr);
                //跳转到主页
                window.location.href=ctx+'/main';
            }else{
                alert(data.msg);
            }
        }
    })
}