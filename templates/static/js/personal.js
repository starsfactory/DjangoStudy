// 获取用户个人信息
// 预期后端返回数据类型:
// avatar : 头像路径，string类型
// nickname：昵称，string类型
// bio： 签名，string类型
// collections：收藏数量，数字类型
$(document).ready(function() {
    $.ajax({
        url: '/personal', // 后端API URL
        type: 'GET',
        success: function(data) {
            var Data = $(data.userinfo);
            console.log(Data)
            // 假设data对象包含avatar, nickname, bio, collections字段
            $('#profile-avatar').attr('src', data.avatar);
            $('.profile-name').text(data.name);
            $('.profile-bio').text(data.bio);
            $('.profile-stat-number').text(data.collections);
            $('#username').text(data.name);
            $('#gender').text(data.gender);
            $('#age').text(data.age);
            $('#location').text(data.location);
            $('#email').text(data.email);
            $('#phone').text(data.phone);
        },
        error: function(error) {
            console.error('获取用户信息失败:', error);
        }
    });
});

//获取个人信息
$('.personal-page').click(function(e) {
    e.preventDefault(); // 阻止默认链接行为

    $.ajax({
        url: '/personal', // 后端提供个人信息的 API
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            var infoContainer = $('.content');

            // 构建并添加账号信息
            infoContainer.append('<h3>账号信息</h3>');
            infoContainer.append('<p>账号名：' + data.name + '</p>');
            infoContainer.append('<p>性别：' + data.gender + '</p>');
            infoContainer.append('<p>年龄：' + data.age + '</p>');
            infoContainer.append('<p>所在地区：' + data.location + '</p>');
            infoContainer.append('<p>邮箱：' + data.email + '</p>');
            infoContainer.append('<p>手机号码：' + data.phone + '</p>');
        },
        error: function(error) {
            console.error("获取个人信息失败", error);
        }
    });
});




// 获取收藏的新闻列表
$('.collections-button').click(function() {
    $.ajax({
        url: '/personal', // 后端API URL
        type: 'GET',
        success: function(collections) {
            displayCollections(collections);
        },
        error: function(error) {
            console.error('获取收藏失败:', error);
        }
    });
});

function displayCollections(collections) {
    var container = $('.content');
    container.empty(); // 清空现有内容
    var collections = $(collections.userstar);
    console.log(collections);

    $.each(collections, function(index, news) {
        // container.append('<div>' + news.title + '</div>'); // 假设新闻数据有标题属性
        var newsSection = $("<section class='news-section'></section>")
        var newsItemElement = $("<article class='news-article'></article>");
        console.log(news);
        // 创建新闻标题和内容元素，并添加到新闻项
        //构建一个带有新闻ID的URL，并使用该URL跳转到新闻详情页
        var titleElement = $("<a href='newsDetail.html?id=" + news.id + "'><h3>" + news.title + "</h3></a>");
        var contentElement = $("<p>" + news.siminfo + "</p>");


        newsItemElement.append(titleElement);
        newsItemElement.append(contentElement);
        newsSection.append(newsItemElement);
        // newsSection.append(titleElement);
        // newsSection.append(contentElement);

        // 将新闻项添加到新闻列表
        container.append(newsSection);
    });

    container.show(); // 显示容器
}

$('.personal-image').click(function(e) {
    e.preventDefault(); // 阻止默认链接行为

    $.ajax({
        url: '/personal', // 后端提供个人信息的 API
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log(data);
            // 获取词云图像的URL
            var wordcloudImageUrl = data.userinfo.userimg; // 词云图像的文件路径
            console.log(wordcloudImageUrl);
            // 获取容器元素
            var wordcloudContainer = $('.content');
            wordcloudContainer.empty();
            // 创建一个<img>元素来显示词云图像
            var wordcloudImage = document.createElement('img');
            wordcloudImage.src = wordcloudImageUrl;
            console.log(wordcloudImage);
            // 将词云图像添加到容器中
            wordcloudContainer.append(wordcloudImage);

        },
        error: function(error) {
            console.error("获取个人信息失败", error);
        }
    });
});
