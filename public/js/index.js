$(function () {

    //显示注册
    $('#loginBox').find('a').on('click', function () {
        $('#loginBox').hide();
        $('#regBox').show();
    });

    //显示登录
    $('#regBox').find('a').on('click', function () {
        $('#loginBox').show();
        $('#regBox').hide();
    });

    //注册
    $('#reg').on('click', function () {
        $.ajax({

            type: 'post',
            dataType: 'json',
            url: '/api/user/register',
            data: {
                username: $('#user').val(),
                password: $('#pass').val(),
                cpassword: $('#cpass').val()
            },
            success: function (json) {
                if (json.code === 7) {
                    $('#regBox').find('button').html(json.msg)
                    setTimeout(function () {
                        $('#loginBox').show();
                        $('#regBox').hide();
                    },1000)}
            },
            error: function (err) {
                console.log(err);
            }
        });
    });

    //登录
    $('#login').on('click', function () {
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: '/api/user/login',
            data: {
                username: $('#users').val(),
                password: $('#passs').val(),
            },
            success: function (json) {
                if(json.code===0){
                    $('#login').html(json.msg);
                    setTimeout(function () {
                        window.location.reload();
                        // $('#loginBox').hide();
                        // $('#regBox').hide();
                        // $('#regbox').show();
                    },1000)
                };
                if(json.code===8){
                    alert('用户名或密码错误请重试')
                    setTimeout(function () {
                        // window.location.reload();
                        // $('#loginBox').hide();
                        // $('#regBox').hide();
                        // $('#regbox').show();
                    },1000)
                }

            },
            error: function (err) {
                console.log(err);
            }
        });
    });

    //退出：
    $('#logout').on('click',function () {
        $.ajax({
            url:'/api/user/logout',
            success:function (req) {
                window.location.reload()
            }
        })
    })

    //分类渲染
    $('#nav-cx').find('a').on('click',function () {
        var id=$(this).attr('id')
        $.ajax({
            type:'get',
            url:'/api/article/ione',
            data:{
                id:id
            },
            success:function (res) {
                for (var i=0; i<res.length; i++){
                    var oDiv=html("<div class='col-md-12'><h2>'+res[i].title+'</h2><h4>作者：<span> admin</span> -时间 <span>'+res[i].current+'</span>阅读 <span>'+res[i].reading+'</span> -评论 <span>'+res[i].comments.length+'</span> <input type='hidden' value=''> </h4> <h3>'+res[i]abstract+'</h3> <a   class='btn btn-warning dianji'>阅读全文</a> </div>")
                }
            },
            error:function (err) {

            }
        })
    })

});