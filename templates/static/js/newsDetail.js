// 获取查询参数字符串
// 创建 URLSearchParams 对象来解析查询参数
// 获取特定参数的值
function getNewsIdFromUrl() {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
}

// 从URL参数获取新闻ID
var newsId = getNewsIdFromUrl();

//初始化新闻收藏状态为假
let isCollected = false;

//获取收藏按钮
const button = document.getElementById('collect-news-button');

// 使用AJAX请求从后端获取新闻数据
$.ajax({
    url: "/news/one?newsId=" + newsId,
    method: "GET",
    dataType: "json",
    success: function(data) {
        isCollected = data.is_collected;
        data = $(data.news);
        var news = data[0];

        // 填充页面内容
        document.getElementById("news-title").textContent = news.title;
        document.getElementById("news-author").textContent = "作者：" + news.editor;
        document.getElementById("news-date").textContent = "发布日期：" + news.time;
        document.getElementById("news-content").innerHTML = news.content;

        if (isCollected){

            button.classList.add('collected');
        }
        else {
            button.classList.add('not-collected');
        }
    },
    error: function() {
        console.log("获取新闻详情失败");
    }
});


//从后端拉取广告信息
$(document).ready(function() {
    // 获取广告信息并显示
    fetchAdData();
});

function fetchAdData() {
    $.ajax({
        url: '/news/advertisement', // 替换成实际的后端广告 API 地址
        method: 'GET',
        dataType: 'json',
        success: function(adData) {
            adData = $(adData.advertisement);
            var ad = adData[0];
            // 如果成功获取广告信息
            if (adData) {
                var adContainer = $('#ad-container');
                var adImage = $('<img>').attr('src', ad.img).attr('alt', '广告');
                var adText = $('<p>').text(ad.type);
                // 创建广告链接
                var adLink = $('<a>').attr('href', ad.link).attr('target', '_blank');

                // 插入广告内容到广告容器
                adLink.append(adImage, adText);
                adContainer.append(adLink);

                // const adContainer = document.getElementById('ad-container');
                // const adImage = document.createElement('img');
                // adImage.src = adData.imageUrl;
                // adImage.alt = '广告';
                // const adText = document.createElement('p');
                // adText.textContent = adData.text;

                // // 插入广告内容到广告容器
                // adContainer.appendChild(adImage);
                // adContainer.appendChild(adText);
            }
        },
        error: function() {
            console.error('获取广告信息失败');
        }
    });
}

// 收藏按钮的实现：添加收藏和取消收藏
button.addEventListener('click', function() {
    if (!isCollected) {
        // 当前是未收藏状态，执行收藏操作
        collectNews(newsId, true, this);
    } else {
        // 当前是已收藏状态，执行取消收藏操作
        collectNews(newsId, false, this);
    }
});

function collectNews(newsId, isCollecting, buttonElement) {
    var apiUrl = isCollecting ? '/news/star' : '/news/unstar';
    // var apiUrl = '';  // 后端接口
    $.ajax({
        url: apiUrl + "?newsId=" + newsId,
        type: 'POST',
        contentType: 'application/json',
        success: function(response) {
            if (isCollecting) {
                buttonElement.classList.remove('not-collected');
                buttonElement.classList.add('collected');
            } else {
                buttonElement.classList.remove('collected');
                buttonElement.classList.add('not-collected');
            }
        },
        error: function(xhr, status, error) {
            console.error('收藏操作失败', error);
        }
    });
}



// // 更新浏览数
// function updateViewCount() {
//     // 发送请求到后端以更新浏览数
//     $.ajax({
//         url: "后端提供的更新浏览数的API地址",
//         method: "POST", // 或者适合更新操作的HTTP方法
//         data: { newsId: newsId },
//         dataType: "json",
//         success: function(response) {
//             if (response.success) {
//                 // 更新成功，更新页面上的浏览数
//                 var viewCountElement = document.getElementById("view-count");
//                 viewCountElement.textContent = "浏览数：" + response.viewCount;
//             } else {
//                 console.log("更新浏览数失败");
//             }
//         },
//         error: function() {
//             console.log("更新浏览数失败");
//         }
//     });
// }

// // 调用更新浏览数的函数
// updateViewCount();
