from math import sqrt,pow
import operator


class UserCf:
    # 获得初始化数据,计算每个用户的评分的平均值
    def __init__(self, data):
        self.data = data
        self.ave = {}
        self.max = 0
        for key, value in self.data.items():
            sum1 = 0.0
            for item, score in value.items():
                if int(item) > self.max:
                    self.max = int(item)
                sum1 += score
            self.ave[key] = sum1/len(data[key])


# 计算待预测分数中相关用户中两个用户之间的皮尔逊相关系数
def pearson(self, user1, item_goal):  # 数据格式为：商品，评分  A:{'a': 4.0, 'c': 3.0, 'd': 5.0
    user_goal = self.find_user(item_goal)
    denominator1 = 0.0  # 分母1--待预测用户的分母1
    denominator2 = 0.0  # 分母2--相关用户的分母2
    molecule = 0.0  # 分子
    r = {}  # 皮尔逊系数字典
    try:
        for user2 in user_goal:
            for item_, score_ in self.data[user2].items():
                for item1, score1 in self.data[user1].items():
                    if item_ == item1:
                        molecule += (float(score_) - self.ave[user2]) * (float(score1) - self.ave[user1])
                        denominator1 += pow(float(score1) - self.ave[user1], 2)
                        denominator2 += pow(float(score_) - self.ave[user2], 2)
            r.setdefault(user1, {})
            r[user1].setdefault(user2, 0)
            r[user1][user2] = molecule / sqrt(denominator1 * denominator2)
            molecule = 0.0
            denominator1 = 0.0
            denominator2 = 0.0
    except e:
        print("异常信息:", e.message)
        return None
    return r  # 返回相关用户的皮尔逊系数


