//右边部分页面跳转
function showSection(sectionId) {
    // 隐藏所有部分
    document.getElementById('news').style.display = 'none';
    document.getElementById('ads').style.display = 'none';
    document.getElementById('users').style.display = 'none';

    // 显示选定的部分
    document.getElementById(sectionId).style.display = 'block';
}

function showMainContent(sectionId) {
    // 隐藏所有内容区域
    document.getElementById('news-management').style.display = 'none';
    document.getElementById('data-visualization').style.display = 'none';

    // 显示选定的内容区域
    document.getElementById(sectionId).style.display = 'block';
}


//添加新闻
function addNews() {
    const newTitle = document.getElementById('new-title').value;
    const newAuthor = document.getElementById('new-author').value;
    const newDate = document.getElementById('new-date').value;
    const newContent = document.getElementById('new-content').value;

    fetch('/api/news', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: newTitle,
            author: newAuthor,
            date: newDate,
            content: newContent,
        }),
    })
    .then(response => response.json())
    .then(data => {
        updateNewsTable(); // 更新新闻列表
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


//删除新闻
function deleteNews(newsId) {
    fetch(`/api/news/${newsId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        fetchNewsData(); // 重新加载新闻数据
    })
    .catch(error => console.error('Error:', error));
}

//加载新闻数据
function fetchNewsData() {
    fetch('/api/news')
    .then(response => response.json())
    .then(data => {
        populateNewsTable(data);
    })
    .catch(error => console.error('Error:', error));
}
function updateNewsTable() {
    fetch('/api/news') // 这个 URL 应该返回所有新闻的 JSON 数据
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById('news-table').getElementsByTagName('tbody')[0];
            tbody.innerHTML = ''; // 清空现有的新闻列表

            data.forEach(news => {
                const row = tbody.insertRow();
                row.insertCell(0).innerText = news.id;
                row.insertCell(1).innerText = news.title;
                row.insertCell(2).innerText = news.author;
                row.insertCell(3).innerText = news.date;
                row.insertCell(4).innerText = news.content;
                const actionCell = row.insertCell(5);
                actionCell.innerHTML = `<button onclick="editNews(${news.id})">编辑</button> <button onclick="deleteNews(${news.id})">删除</button>`;
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


//编辑新闻
function editNews(newsId) {
    // 填充编辑表单的数据
    // 这里假设您从某处获取了新闻的详细信息
	console.log("编辑新闻，ID:", newsId); // 调试输出
    const newsDetails = getNewsDetails(newsId);

    document.getElementById('edit-title').value = newsDetails.title;
    document.getElementById('edit-author').value = newsDetails.author;
    document.getElementById('edit-date').value = newsDetails.date;
    document.getElementById('edit-content').value = newsDetails.content;

    // 显示模态窗口
    document.getElementById('edit-news-modal').style.display = 'block';
}

//关闭弹窗
function closeModal() {
    document.getElementById('edit-news-modal').style.display = 'none';
}

//保存编辑内容
function saveNews() {
    // 实现保存编辑内容的逻辑
    // 可能涉及发送 AJAX 请求到后端

    // 关闭模态窗口
    closeModal();
}

/*检验可视化的示例数据*/
const newsTypeData = {
    labels: ['国际', '政治', '科技', '娱乐', '体育'],
    datasets: [{
        label: '新闻类型数量',
        data: [50, 120, 70, 200, 90],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
    }]
};
new Vue({
    el: '#app',
    data: {
            // 示例新闻数据
            newsItem: {
                id: '12345',             // 示例新闻的ID
                title: 'Vue.js使用指南', // 示例新闻标题
                author: '张三',          // 作者
                date: '2024-01-02',      // 日期
                content: 'Vue.js是一套构建用户界面的渐进式框架。与其他重量级框架不同，Vue采用自底向上增量开发的设计。Vue的核心库只关注视图层，易于上手，且与其他库或已有项目整合非常方便。' // 内容
            }
        },
    methods: {
        // ...您的其他方法
        initializeChart() {
            var ctx = document.getElementById('myChart').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'bar', // 指定图表的类型
                data: {
                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'], // X轴标签
                    datasets: [{
                        label: '# of Votes', // 数据集标签
                        data: [12, 19, 3, 5, 2, 3], // 数据集数据
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true // Y轴起始于0
                        }
                    }
                }
            });
        }
    },
    mounted() {
        this.initializeChart();
    }
});

