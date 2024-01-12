from AdFunc import similarity
from AdFunc import interest
import pandas as pd

def get_type(list):
    df = interest.interst()
    key, value = similarity.R(list)  # R值
    result = df.loc[key] * value  # R值最大用户对每个广告的喜好预测

    result = pd.to_numeric(result, errors='coerce')
    result = result.round(6)  # 设置小数位数为 6

    max_value_B = result.max()
    max_column_index_B = result.idxmax()

    # 显示结果
    print("和需求用户相似度最高的用户（用户X）", key)
    print("两者之间的相似度系数的值（最终R）", value)
    print("需求用户对每个广告的喜好预测", result.to_list())
    print("需求用户最可能关注的广告类型", max_column_index_B)
    return max_column_index_B
