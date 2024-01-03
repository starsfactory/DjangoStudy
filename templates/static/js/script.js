// script.js
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

$(document).ready(function() {
  // 后端API的URL
  var apiUrl = "/news";

  // 使用AJAX从后端获取新闻数据
  $.ajax({
    url: apiUrl,
    method: "GET",
    dataType: "json",
    success: function(data) {
      // 新闻数据获取成功
      displayNews(data);
    },
    error: function() {
      // 处理错误
      console.log("获取失败");
    }
  });

  // 显示新闻数据
  function displayNews(newsData) {
    var newsListElement = $("#news-list");

    // 清空先前的内容
    newsListElement.empty();
    console.log(newsData)
	//把获取的JavaScript对象转化成jQuery对象
	newsData = $(newsData.newslist);
	console.log(newsData.length);
    // 遍历新闻列表并将其添加到页面
    for (var i = 0; i < newsData.length; i++) {
      var newsItem = newsData[i];
	  console.log(newsItem.id);
	  var newsSection = $("<section class='news-section'></section>")
      var newsItemElement = $("<article class='news-article'></article>");

      // 创建新闻标题和内容元素，并添加到新闻项
	  //构建一个带有新闻ID的URL，并使用该URL跳转到新闻详情页
      var titleElement = $("<a href='/static/newsDetail.html?id=" + newsItem.id + "'>'><h3>" + newsItem.title + "</h3>");
//        var titleElement = $("<h3>" + newsItem.title + "</h3>");
      var contentElement = $("<p>" + newsItem.content + "</p>");
	  

      newsItemElement.append(titleElement);
      newsItemElement.append(contentElement);
	  newsSection.append(newsItemElement);
	  // newsSection.append(titleElement);
	  // newsSection.append(contentElement);
	  
      // 将新闻项添加到新闻列表
      newsListElement.append(newsSection);
    }
  }
});
