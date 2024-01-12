import numpy as np


def convert(x): #点击数转化为点击率
    total = 0
    for v in x.values():
        total = total + v
    x['A'] = x['A']/total
    x['B'] = x['B'] / total
    x['C'] = x['C'] / total
    x['D'] = x['D'] / total
    x['E'] = x['E'] / total
    x['F'] = x['F'] / total
    x['G'] = x['G'] / total
    return x

def pearson(x,y): #pearson系数
    # 提取数据点和计算均值
    X = np.array(list(x.values()))
    Y = np.array(list(y.values()))
    mean_X = np.mean(X)
    mean_Y = np.mean(Y)

    # 计算Pearson系数
    numerator = np.sum((X - mean_X) * (Y - mean_Y))
    denominator = np.sqrt(np.sum((X - mean_X) ** 2) * np.sum((Y - mean_Y) ** 2))

    pearson_coefficient = numerator / denominator
    return pearson_coefficient

def R(list):   #R
    while True:
        x = list
        if len(x) == 7:
            break
        else:
            print("输入有误")
    X = {"A": x[0], "B": x[1], "C": x[2], "D": x[3], "E": x[4], "F": x[5], "G": x[6]}
    A = {"A": 4, "B": 1, "C": 3, "D": 5, "E": 5, "F": 6, "G": 5}
    B = {"A": 1, "B": 5, "C": 4, "D": 9, "E": 5, "F": 6, "G": 5}
    C = {"A": 5, "B": 4, "C": 2, "D": 2, "E": 5, "F": 6, "G": 5}
    D = {"A": 2, "B": 4, "C": 2, "D": 3, "E": 5, "F": 6, "G": 5}
    E = {"A": 3, "B": 4, "C": 5, "D": 2, "E": 5, "F": 6, "G": 5}

    X = convert(X)
    A = convert(A)
    B = convert(B)
    C = convert(C)
    D = convert(D)
    E = convert(E)
    pearson_values = {"A":pearson(X,A),"B":pearson(X,B),"C":pearson(X,C),"D":pearson(X,D),"E":pearson(X,E)}
    print(pearson_values)

    # 找到最大值的键值对
    max_pair = max(pearson_values.items(), key=lambda x: x[1])

    # 输出结果
    return max_pair

