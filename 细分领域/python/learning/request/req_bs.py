# 爬取豆瓣的某个网页上的所有图片并保存到本地，保存到当前目录下的douban文件夹
import requests, bs4, os

# 创建文件夹
os.makedirs('douban')
res = requests.get('https://www.douban.com/group/explore/life')
res.raise_for_status()

noStarchSoup = bs4.BeautifulSoup(res.text,"html5lib")

elems = noStarchSoup.find_all('div','pic-wrap')
picElems = noStarchSoup.select('.pic-wrap img')
if picElems == []:
  print('Cound not find img')
else:
  for pic in picElems:
    picUrl = pic.get('src')
    res = requests.get(picUrl)
    res.raise_for_status()
    imageFile = open(os.path.join('douban', os.path.basename(picUrl)), 'wb')
    for chunk in res.iter_content(100000):
      imageFile.write(chunk)
    imageFile.close()
