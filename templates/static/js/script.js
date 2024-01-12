// 主页的轮播图
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

document.addEventListener('DOMContentLoaded', function() {
    showSlide(currentSlide);
    setInterval(nextSlide, 3000); // Change slide every 3 seconds
});

// 获取搜索按钮和输入框的元素
const searchButton = document.querySelector('button');
const searchInput = document.querySelector('input');

// 监听搜索按钮的点击事件
searchButton.addEventListener('click', performSearch);

// 监听输入框的键盘事件（按下Enter键时执行搜索）
searchInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    performSearch();
  }
});

// 定义执行搜索的函数
function performSearch() {
  // 获取输入框中的搜索关键字
  const searchKeyword = searchInput.value;

  // 构建搜索请求的URL，假设服务器端的搜索接口是 '/search'
  const searchUrl = '/news/search?query=' + searchKeyword;
  
  // 发送 Ajax 请求
  $.ajax({
      url: searchUrl,
      method: 'GET',
      dataType: 'json',
      success: function(data) {
          // 请求成功，处理响应数据
          displaySearchResults(data);
      },
      error: function() {
          // 处理错误
          console.log('获取失败');
      }
  });
}

function displaySearchResults(results) {
    const searchResultsContainer = $('#mainContent');
    searchResultsContainer.empty();
    
    if (results.length === 0) {
        searchResultsContainer.html('未找到匹配结果。');
    } else {
        // const ul = $('<ul></ul>');
        results = $(results.newslist);
        results.forEach(function (result) {
			var newsSection = $("<section class='news-section'></section>")
			var newsItemElement = $("<article class='news-article'></article>");
			
			// 创建新闻标题和内容元素，并添加到新闻项
			//构建一个带有新闻ID的URL，并使用该URL跳转到新闻详情页
			var titleElement = $("<a href='newsDetail.html?id=" + result.id + "'><h3>" + result.title + "</h3></a>");
			var contentElement = $("<p>" + result.content + "</p>");
			
			
			newsItemElement.append(titleElement);
			newsItemElement.append(contentElement);
			newsSection.append(newsItemElement);
            // const li = $('<li></li>').text(result);
            // ul.append(li);
			searchResultsContainer.append(newsSection);
        });
        
    }        
}

//点击个人图标时，先判断是否登录，如果未登录，跳转到登陆界面，如果已登录，则跳转到个人主页
// document.addEventListener('DOMContentLoaded', function() {
//     var personalLink = document.querySelector('.personal-link');
//
//     personalLink.addEventListener('click', function(event) {
//         event.preventDefault(); // 阻止链接的默认行为
//
//         // 检查用户是否登录的逻辑
//         var userLoggedIn = checkUserLoggedIn(); // 这应该是一个返回布尔值的函数
//
//         // 根据用户的登录状态决定跳转的页面
//         if (userLoggedIn) {
//             // 如果用户已登录，跳转到个人主页
//             window.location.href = 'personal.html';
//         } else {
//             // 如果用户未登录，跳转到登录页面
//             window.location.href = 'denglu.html';
//         }
//     });
// });
//
// // 这个函数判断用户是否已登录
// function checkUserLoggedIn() {
//     // 可能涉及到检查 cookie、localStorage 或者调用后端接口等
//     return document.cookie.split(';').some((item) => item.trim().startsWith('isLoggedIn='));
//     // return false; // 假设用户未登录
// }
// 根据新闻类型从后端拉取新闻
$(document).ready(function(){
    // 解析 URL 中的查询参数
    var urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams);
    var type = urlParams.get('type'); // 获取 'type' 参数
    console.log(type);
    // 根据新闻类型发送 AJAX 请求
    $.ajax({
        url: '/news/type?type=' + type, // 这里的 URL 指向后端 API
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            // 使用返回的数据更新页面
            displayNews(data);
        },
        error: function(error) {
            // 错误处理
            console.error("新闻获取失败", error);
        }
    });
});

// $(document).ready(function() {
//   // 后端API的URL
//   var apiUrl = "1.json";
//
//   // 使用AJAX从后端获取新闻数据
//   $.ajax({
//     url: apiUrl,
//     method: "GET",
//     dataType: "json",
//     success: function(data) {
//       // 新闻数据获取成功
//       displayNews(data);
//     },
//     error: function() {
//       // 处理错误
//       console.log("获取失败");
//     }
//   });
// });

// 显示新闻数据
function displayNews(newsData) {
    var newsListElement = $("#news-list");

    // 清空先前的内容
    newsListElement.empty();

    //把获取的JavaScript对象转化成jQuery对象
    newsData = $(newsData.newslist);

    // 遍历新闻列表并将其添加到页面
    for (var i = 0; i < newsData.length; i++) {
        var newsItem = newsData[i];
        console.log(newsItem);
        var newsSection = $("<section class='news-section'></section>")
        var newsItemElement = $("<article class='news-article'></article>");

        // 创建新闻标题和内容元素，并添加到新闻项
        //构建一个带有新闻ID的URL，并使用该URL跳转到新闻详情页
        var titleElement = $("<a href='newsDetail.html?id=" + newsItem.id + "'><h3>" + newsItem.title + "</h3></a>");
        var contentElement = $("<p>" + newsItem.siminfo + "</p>");


        newsItemElement.append(titleElement);
        newsItemElement.append(contentElement);
        newsSection.append(newsItemElement);
        // newsSection.append(titleElement);
        // newsSection.append(contentElement);

        // 将新闻项添加到新闻列表
        newsListElement.append(newsSection);
    }
}
