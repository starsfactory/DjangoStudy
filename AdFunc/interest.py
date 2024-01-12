import pandas as pd


df = pd.DataFrame(columns=[1, 2, 3, 4, 5, 6])

# 使用 loc 插入数据,X,Y,Z,B,C,K
df.loc["A1"] = [1, 1, 1, 0.8, 0.5, 0.1]
df.loc["A2"] = [1, 1, 0, 0.2, 0.4, 0.1]
df.loc["A3"] = [1, 0, 1, 0.1, 0.5, 0.6]
df.loc["A4"] = [1, 1, 0, 0.5, 0.5, 0.6]
df.loc["A5"] = [1, 1, 0, 0.5, 0.5, 0.6]
df.loc["A6"] = [1, 1, 0, 0.5, 0.5, 0.6]
df.loc["A7"] = [1, 1, 0, 0.5, 0.5, 0.6]
df.loc["B1"] = [1, 1, 0, 0.8, 0.5, 0.1]
df.loc["B2"] = [1, 0, 1, 0.2, 0.4, 0.1]
df.loc["B3"] = [1, 1, 0, 0.1, 0.5, 0.6]
df.loc["B4"] = [1, 1, 1, 0.3, 0.5, 0.6]
df.loc["B5"] = [1, 1, 0, 0.5, 0.5, 0.6]
df.loc["B6"] = [1, 1, 0, 0.5, 0.5, 0.6]
df.loc["B7"] = [1, 1, 0, 0.5, 0.5, 0.6]
df.loc["C1"] = [1, 1, 0, 0.8, 0.5, 0.1]
df.loc["C2"] = [1, 0, 1, 0.2, 0.4, 0.1]
df.loc["C3"] = [1, 1, 0, 0.1, 0.5, 0.6]
df.loc["C4"] = [1, 0, 1, 0.3, 0.5, 0.6]
df.loc["C5"] = [1, 1, 0, 0.5, 0.5, 0.6]
df.loc["C6"] = [1, 1, 0, 0.5, 0.5, 0.6]
df.loc["C7"] = [1, 1, 0, 0.5, 0.5, 0.6]
df.loc["D1"] = [1, 1, 0, 0.8, 0.5, 0.1]
df.loc["D2"] = [1, 0, 1, 0.2, 0.4, 0.1]
df.loc["D3"] = [1, 1, 0, 0.1, 0.5, 0.6]
df.loc["D4"] = [1, 0, 1, 0.3, 0.5, 0.6]
df.loc["D5"] = [1, 1, 0, 0.5, 0.5, 0.6]
df.loc["D6"] = [1, 1, 0, 0.5, 0.5, 0.6]
df.loc["D7"] = [1, 1, 0, 0.5, 0.5, 0.6]


def interestLevel(l):
    return ((l[1]/(1+l[3]))*0.7)+(l[2]/(1+l[4])*0.25)+(l[0]/(1+l[5])*0.05)

def interst():
    df1 = pd.DataFrame(columns=[1, 2, 3, 4, 5, 6, 7])
    for i in range(1,8):    #兴趣度
        df1.loc["A", i] = interestLevel(df.loc["A" + str(i)].to_list())
        df1.loc["B", i] = interestLevel(df.loc["B" + str(i)].to_list())
        df1.loc["C", i] = interestLevel(df.loc["C" + str(i)].to_list())
        df1.loc["D", i] = interestLevel(df.loc["D" + str(i)].to_list())
    return df1




