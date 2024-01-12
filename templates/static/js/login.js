window.onload = function() {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();

        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;

        $.ajax({
            type:"POST", //请求方式
            url:"http://127.0.0.1:8000/userlogin/", //请求地址
            dataType:"json", //预期返回的数据类型
            data:{'username': username, 'password': password},
            success:function(data){
                console.log(data);
                if (username === data['username'] && password === data['userpassword']) {
                    // 登录成功，重定向到首页
                    console.log("hello");
                    if (!data['isuser']) {
                        window.location.href = 'static/home.html?type=home';
                    } else{
                        window.location.href = 'static/g_ads.html';
                    }
                } else {
                    // 登录失败，显示错误信息或重定向
                    console.log('fail');
                    alert('Invalid username or password');
                }
            }
        })
    })
};
