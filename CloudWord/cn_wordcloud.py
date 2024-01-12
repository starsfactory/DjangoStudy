import string
import wordcloud
import jieba
from PIL import Image
import numpy as np

WIDTH = 800
HEIGHT = 600
maxsize = 200
minsize = 5
fontstep = 1
maxword = 50
background = 'white'
Mask = np.array(Image.open('CloudWord\\wordcloud photo\\cat.jpg'))
forbidword = {}
fontpath = 'CloudWord\\myfont.ttc'


def get_word(txtlist):
    count = {}
    for txt in txtlist:
        txt = jieba.lcut(txt)
        for word in txt:
            if len(word) <= 1:
                continue
            else:
                count[word] = count.get(word, 0) + 1
    wordlist = list(count.items())
    wordlist.sort(key=lambda x: x[1], reverse=True)
    for i in range(15):
        print("{0}:{1}".format(wordlist[i][0], wordlist[i][1]))
    return txt


def generate(txtlist, name):
    txt = get_word(txtlist)
    mywordcloud = wordcloud.WordCloud(
        width=WIDTH,
        height=HEIGHT,
        max_font_size=maxsize,
        min_font_size=minsize,
        max_words=maxword,
        stopwords=forbidword,
        mask=Mask,
        background_color=background,
        font_path=fontpath)
    mywordcloud.generate(''.join(txt))
    mywordcloud.to_file('D:\\code\\djangoproject\\NewsAdSystem\\media\\UserCloudWord' + '\\' + name + '.jpg')
