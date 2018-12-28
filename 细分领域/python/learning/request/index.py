import requests
r = requests.get('http://ife.sankuai.com/ms06/activity/list?pageSize=99&pageIndex=0&createUser=zhuyunhe')

print(r.json())