// 获取查询参数字符串
// 创建 URLSearchParams 对象来解析查询参数
// 获取特定参数的值
function getNewsIdFromUrl() {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
}



// 从URL参数获取新闻ID
var newsId = getNewsIdFromUrl();

console.log(newsId);
// 使用AJAX请求从后端获取新闻数据
$(document).ready(function() {
    $.ajax({
    url: "/news/one",
    method: "GET",
    dataType: "json",
    data: {'newsId': newsId},
    success: function(data) {
        // 填充页面内容
        data = $(data.news)
        var news = data[0]
        document.getElementById("news-title").textContent = news.title;
        document.getElementById("news-author").textContent = "作者：" + news.editor;
        document.getElementById("news-date").textContent = "发布日期：" + news.time;
        document.getElementById("news-content").innerHTML = news.content;
    },
    error: function() {
        console.log("获取新闻详情失败");
    }
    });
})


//// 更新浏览数
//function updateViewCount() {
//    // 发送请求到后端以更新浏览数
//    $.ajax({
//        url: "后端提供的更新浏览数的API地址",
//        method: "POST", // 或者适合更新操作的HTTP方法
//        data: { newsId: newsId },
//        dataType: "json",
//        success: function(response) {
//            if (response.success) {
//                // 更新成功，更新页面上的浏览数
//                var viewCountElement = document.getElementById("view-count");
//                viewCountElement.textContent = "浏览数：" + response.viewCount;
//            } else {
//                console.log("更新浏览数失败");
//            }
//        },
//        error: function() {
//            console.log("更新浏览数失败");
//        }
//    });
//}

// 调用更新浏览数的函数
//updateViewCount();
