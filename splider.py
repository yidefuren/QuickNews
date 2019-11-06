import requests
from lxml import etree
import pymongo

cilent = pymongo.MongoClient(host='localhost', port=27017)
db = cilent.kuaixun
collection = db.news



def main():
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36",
        'Host': 'www.dyhjw.com',
    }
    url = 'http://www.dyhjw.com/kuaixun/'
    resp = requests.get(url, headers=headers)
    htmlElement = etree.HTML(resp.text)
    list = htmlElement.xpath("//div[@class='kx_left_box']/ul/li")
    list = list[:10]
    list.reverse()
    i = 0
    for item in list:
        i = i + 1
        if (i == 11):
            break
        temp = {
            'id': item.xpath("@id")[0],
            'title': item.xpath(".//table/tbody/tr/td[@align='left']/p[@class='kx_title']/text()")[0].replace(' ',
                                                                                                              '').replace(
                '\n', ""),
            'time': item.xpath(".//table/tbody/tr/td[@class='time']/text()")[0].replace(' ', '').replace('\n', "")
        }
        res = collection.find_one({"id": item.xpath("@id")[0]})
        print({"id": item.xpath("@id")[0]})
        if res:
            continue
        else:
            collection.insert_one(temp)
            print(i)


if __name__ == '__main__':
    main()

