//新闻-左右两个柱状图

document.addEventListener('DOMContentLoaded', function() {

  new Vue({
    el: '#main-content',
        //新闻-左右两个柱状图

    data() {
      return {
          newsData: [],
          values: [],
          chartId: ['myChart11','myChart12','myChart13', 'news-word-cloud1','myChart31', 'myChart32', 'myChart33'],
          chartInstance: null,
        };
      },
    // mounted() {
    //     this.initializeChart();
    // },
    methods: {
        fetchNewsData(event) {
            console.log("nihao");
            event.preventDefault(); // 阻止默认的超链接行为
          fetch('/manage/news_statistics')
              .then(response => response.json())
              .then(data => {
                  console.log(data);
                  if (data) {
                      this.newsData = data;
                      if (this.chartInstance) {
                          this.chartInstance.destroy();
                      }
                      this.oneoneChart();
                      this.onetwoChart();
                      this.onethreeChart();
                      this.wordcloudChart();
                      this.threeoneChart();
                      this.threetwoChart();
                      this.threethreeChart();
                  } else {
                      console.error('Data format is incorrect:', data);
                  }
              })
            .catch(error => console.error('Error:', error));
        },
        oneoneChart(){
            var ctx = document.getElementById(this.chartId[0]).getContext('2d');
            if(myChart11 instanceof Chart) {
                myChart11.destroy();
            }
            var myChart11 = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['国际', '科技', '体育', '文娱', '教育', '财经', '文化'],
                    datasets: [{
                        label: '各类新闻数量',
                        data: this.newsData.statistics,
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        },
        onetwoChart() {
            var ctx = document.getElementById(this.chartId[1]).getContext('2d');
            if(myChart12 instanceof Chart) {
                myChart12.destroy();
            }
            var myChart12 = new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: ['国际', '科技', '体育', '文娱', '教育', '财经', '文化'],
                    datasets: [{
                        label: '各类新闻数量',
                        data: this.newsData.statistics,
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        },
        onethreeChart() {
            var ctx = document.getElementById(this.chartId[2]).getContext('2d');
            if(myChart13 instanceof Chart) {
                myChart13.destroy();
            }
            var myChart13 = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['国际', '科技', '体育', '文娱', '教育', '财经', '文化'],
                    datasets: [{
                        label: '各类新闻数量',
                        data: this.newsData.statistics,
                        borderWidth: 1
                    }]
                },

            });
        },
        wordcloudChart(){
            var words = [
                { text: "国际", size: 10 },
                { text: "科技", size: 15 },
                { text: "体育", size: 20 },
                { text: "文化", size: 25 },
                { text: "财经", size: 11 },
                { text: "文娱", size: 9 },
                { text: "教育", size: 14 },
                { text: "国际1", size: 10 },
                { text: "科技1", size: 17 },
                { text: "体育1", size: 25 },
                { text: "文化1", size: 29 },
                { text: "财经1", size: 16 },
                { text: "文娱1", size: 19 },
                { text: "教育1", size: 20 },
                { text: "国际2", size: 10 },
                { text: "科技2", size: 15 },
                { text: "体育2", size: 20 },
                { text: "文化2", size: 25 },
                { text: "财经2", size: 11 },
                { text: "文娱2", size: 9 },
                { text: "教育2", size: 14 },
            ];
            var layout = d3.layout.cloud()
                .size([500, 500])
                .words(words.map(function(d) {
                   return {text: d.text, size: d.size};
                }))
                .padding(5)
                .rotate(function() { return ~~(Math.random() * 2) * 90; })
                .font("Impact")
                .fontSize(function(d) { return d.size; })
                .on("end", draw);

            layout.start();

            function draw(words) {
                d3.select("#news-word-cloud1").append("svg")
                    .attr("width", layout.size()[0])
                    .attr("height", layout.size()[1])
                    .append("g")
                    .attr("transform", function() {
                        var offsetX = layout.size()[0] / 2;
                        var offsetY = layout.size()[1] / 2;
                        var shiftX = 50; // 您希望向左移动的单位数
                        return "translate(" + (offsetX - shiftX) + "," + offsetY + ")";
                    })
                    .selectAll("text")
                    .data(words)
                    .enter().append("text")
                    .style("font-size", function(d) { return d.size + "px"; })
                    .style("font-family", "Impact")
                    .style("fill", function(d) {
                                        return "hsl(" + Math.random() * 360 + ",100%,50%)"; // 随机颜色
                                    })
                    .attr("text-anchor", "middle")
                    .attr("transform", function(d) {
                        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                    })

                    .text(function(d) { return d.text; });
            }
        },
        threeoneChart() {
            var ctx = document.getElementById(this.chartId[4]).getContext('2d');
            if(myChart31 instanceof Chart) {
                myChart31.destroy();
            }
            var myChart31 = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['国际', '科技', '体育', '文娱', '教育', '财经', '文化'],
                    datasets: [{
                        label: '各类新闻数量',
                        data: this.newsData.statistics,
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        },
        threetwoChart() {
            var ctx = document.getElementById(this.chartId[5]).getContext('2d');
            if (myChart32 instanceof Chart) {
                myChart32.destroy();
            }

            var myChart32 = new Chart(ctx, {
                type: 'polarArea', // 极区图
                data: {
                    labels: ['国际', '科技', '体育', '文娱', '教育', '财经', '文化'],
                    datasets: [{
                        label: '各类新闻数量',
                        data: this.newsData.statistics,
                        borderWidth: 1
                    }]
                },
                options: {
                    indexAxis: 'y',
                    elements: {
                        arc: {
                            borderWidth: 0 // 移除边框
                        }
                    }
                }
            });
        },
        threethreeChart() {
            var ctx = document.getElementById(this.chartId[6]).getContext('2d');
            if(myChart33 instanceof Chart) {
                myChart33.destroy();
            }
            var myChart33 = new Chart(ctx, {
                type: 'doughnut',//空心饼状图
                data: {
                    labels: ['国际', '科技', '体育', '文娱', '教育', '财经', '文化'],
                    datasets: [{
                        label: '各类新闻数量',
                        data: this.newsData.statistics,
                        borderWidth: 1
                    }],
                    backgroundColor: ['rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)', 'rgba(255, 206, 86, 0.8)'],
                    hoverOffset: 4, // 鼠标悬停时的偏移量
                    borderWidth: 5, // 设置边框宽度，创建空心效果
                    borderColor: 'rgba(255, 255, 255, 1)' // 边框颜色
                },
                options: {
                    cutout: '80%' // 设置环形图的内半径，控制空心的大
                },
            });
        },
    },
    })
});


