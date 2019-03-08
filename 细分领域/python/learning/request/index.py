import requests
res = requests.get('https://www.douban.com/group/explore/life')
res.raise_for_status()
playFile = open('Romeo.txt', 'wb')
for chunk in res.iter_content(100000):
  playFile.write(chunk)
playFile.close()